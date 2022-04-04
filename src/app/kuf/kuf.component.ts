import {Component, OnInit} from '@angular/core';
import {Faktura, Preduzece} from "../../model/model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FakturaService} from "../faktura.service";

@Component({
  selector: 'app-kuf',
  templateUrl: './kuf.component.html',
  styleUrls: ['./kuf.component.css']
})
export class KufComponent implements OnInit {

  filterGroup: FormGroup;
  updateGroup: FormGroup;
  vrednost: string = '';

  constructor(private formBuilder: FormBuilder, private service: FakturaService) {
    this.filterGroup = this.formBuilder.group({
      pretraga: ['', [Validators.required]],
      vrednost: ['', [Validators.required]]
    });
    this.updateGroup = this.formBuilder.group({
      brojFakture: [this.selektovanaFaktura.brojFakture],
      datumIzdavanja: [this.selektovanaFaktura.datumIzdavanja],
      komitent: [this.selektovanaFaktura.preduzece.naziv, [Validators.required]],
      datumPlacanja: [this.selektovanaFaktura.datumPlacanja],
      prodajnaVrednost: [this.selektovanaFaktura.prodajnaVrednost,],
      rabatProcenat: [this.selektovanaFaktura.rabatProcenat,],
      porezProcenat: [this.selektovanaFaktura.porezProcenat,],
      valuta: [this.selektovanaFaktura.valuta, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      kurs: [this.selektovanaFaktura.kurs],
      naplata: [this.selektovanaFaktura.naplata, [Validators.required]],
      komentar: [this.selektovanaFaktura.komentar],
    });
  }

  inputAsDate: string = 'text';
  input: string = '';


  preduzece1: Preduzece = new Preduzece("test1");
  preduzece2: Preduzece = new Preduzece("test2");

  preduzeca: Preduzece[] = [this.preduzece1, this.preduzece2];


  faktura1: Faktura = new Faktura(1,"3", "22/03/2222", new Preduzece("NEBITNO"),"20/03/2000", 10000, 0,
    5, 500, 10500, 10500, "DIN", 1, 10500, "Komentar", "ULAZNA_FAKTURA", 2, "FAKTURA");

  faktura2: Faktura = new Faktura(2,"4", "22/03/2222", new Preduzece("NEBITNO"), "20/03/2000", 10000, 0,
    5, 500, 10500, 10500, "DIN", 1, 10500, "Komentar", "ULAZNA_FAKTURA", 2, "FAKTURA");

  kuf: Faktura[] = [this.faktura1, this.faktura2];


  selektovanaFaktura: Faktura = this.kuf[0];


  edit: boolean = false;

  ngOnInit(): void {
    this.service.svaPreduzeca().subscribe((preduzeca) =>{
      this.preduzeca = preduzeca;
    });
    this.edit = false;
    this.service.sveFakture().subscribe((response) =>{
      this.kuf = response.content.filter( e => (e.tipFakture=='ULAZNA_FAKTURA'));
    });
  }


  setInputAsDate() {
    if (this.input.startsWith('datum')) {
      this.inputAsDate = 'date';
    } else if(this.input.startsWith('preduzece')){
      this.inputAsDate = 'number';
    } else {
      this.inputAsDate = 'text';
      this.vrednost = '';
    }
  }

  ukupnaProdajnaVrednost() {
    let totalSum = 0;
    this.kuf.forEach(function (value) {
      totalSum += value.prodajnaVrednost;
    });
    return totalSum;
  }

  ukupanRabat() {
    let totalSum = 0;
    this.kuf.forEach(function (value) {
      let rabatAct = value.rabat * value.kurs;
      totalSum += rabatAct;
    });
    return totalSum;
  }

  ukupanPorez() {
    let totalSum = 0;
    this.kuf.forEach(function (value) {
      totalSum += value.porez;
    });
    return totalSum;
  }

  ukupnoNaplata() {
    let totalSum = 0;
    this.kuf.forEach(function (value) {
      totalSum += value.naplata;
    });
    return totalSum;
  }

  getAsDate(date: string) {
    let newDate = new Date(date);
    return newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear();
  }

  filterOfNull(procenat : number){
    if(procenat === null) {
      return 0;
    }
    return procenat;
  }

  setEditable(faktura: Faktura) {
    this.selektovanaFaktura = faktura;
    this.updateGroup = this.formBuilder.group({
      brojFakture: [this.selektovanaFaktura.brojFakture],
      datumIzdavanja: [new Date(this.selektovanaFaktura.datumIzdavanja)],
      komitent: [this.selektovanaFaktura.preduzece.naziv, [Validators.required]],
      datumPlacanja: [new Date(this.selektovanaFaktura.datumIzdavanja)],
      prodajnaVrednost: [this.selektovanaFaktura.prodajnaVrednost, [Validators.required]],
      rabatProcenat: [this.selektovanaFaktura.rabatProcenat,],
      porezProcenat: [this.selektovanaFaktura.porezProcenat,],
      valuta: [this.selektovanaFaktura.valuta, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      kurs: [this.selektovanaFaktura.kurs, [Validators.required]],
      naplata: [this.selektovanaFaktura.naplata, [Validators.required]],
      komentar: [this.selektovanaFaktura.komentar],
    });
    if (faktura.editable) {
      faktura.editable = false;
      this.edit = false;
    } else {
      faktura.editable = true;
      this.edit = true;
      this.kuf.forEach(function (value) {
        if (value !== faktura)
          value.editable = false;
      });
    }
  }

  filterKUF() {
    let filter = this.filterGroup.get('pretraga')?.value;
    let vrednost = this.filterGroup.get('vrednost')?.value;
    console.log(filter)
    console.log(vrednost)
    //provera unosa
    if (filter === 'preduzece') {
      let proveraVrednosti = parseInt(vrednost);
      if (isNaN(proveraVrednosti)) {
        alert("Morate uneti broj kako bi pretrazili po komitentu")
        return;
      }
    } else if (filter.startsWith('datum')) {
      let proveraVrednosti = new Date(vrednost);
      vrednost = proveraVrednosti.getTime();
      if (isNaN(proveraVrednosti.getDate())) {
        alert("Morate uneti pravilan datum");
        return;
      }
    } else if (filter === 'valuta') {
      if (vrednost.length != 3) {
        alert("Valuta mora sadrzati tacno 3 karaktera");
        return;
      }
      if(!this.alphaOnly(vrednost)){
        alert("Valuta se moze sastojati samo od karaktera");
        return;
      }
    }
    this.service.filterKUF(filter, vrednost).subscribe((response) =>{
      if(response.ok) {
        this.kuf = response.body;
      }
    }, error => {
      alert("Ne postoji nijedan rezultat za trazenu pretragu!");
    });
  }


  alphaOnly(valuta : string) {
    var regex = new RegExp("^[A-Z]+$");
    if(regex.test(valuta.charAt(0))){
      return true;
    }
    if(regex.test(valuta.charAt(1))){
      return true;
    }
    if(regex.test(valuta.charAt(2))){
      return true;
    }
    return false;
  }

  sacuvaj(){
    let brojFakture = this.updateGroup.get('brojFakture')?.value;
    let datumIzdavanja = this.updateGroup.get('datumIzdavanja')?.value;
    let komitent = this.updateGroup.get('komitent')?.value;
    let datumPlacanja = this.updateGroup.get('datumPlacanja')?.value;
    let prodajnaVrednost = this.updateGroup.get('prodajnaVrednost')?.value;
    let rabatProcenat = this.updateGroup.get('rabatProcenat')?.value;
    let porezProcenat = this.updateGroup.get('porezProcenat')?.value;
    let valuta = this.updateGroup.get('valuta')?.value;
    let kurs = this.updateGroup.get('kurs')?.value;
    let naplata = this.updateGroup.get('naplata')?.value;
    let komentar = this.updateGroup.get('komentar')?.value;
    //provera
    if(brojFakture.length != 0){
      this.selektovanaFaktura.brojFakture = brojFakture;
    }
    this.selektovanaFaktura.datumIzdavanja = datumIzdavanja;
    console.log(komitent)
    if(komitent !== this.selektovanaFaktura.preduzece.naziv){
      this.preduzeca.forEach((value) => {
        if(komitent === value.naziv){
          this.selektovanaFaktura.preduzece = value;
        }
      })
    }
    this.selektovanaFaktura.datumPlacanja = datumPlacanja;
    this.selektovanaFaktura.prodajnaVrednost = prodajnaVrednost;

    if(rabatProcenat !== undefined && rabatProcenat !== 0){
      this.selektovanaFaktura.rabatProcenat = rabatProcenat;
    }else{
      this.selektovanaFaktura.rabatProcenat = 0;
    }

    if(porezProcenat != 0){
      this.selektovanaFaktura.porezProcenat = porezProcenat;
    }else{
      this.selektovanaFaktura.porezProcenat = 0;
    }

    if(!this.alphaOnly(valuta)){
      alert('Valuta ne moze sadrzti brojeve!');
      return;
    }
    this.selektovanaFaktura.valuta = valuta;
    this.selektovanaFaktura.kurs = parseFloat(kurs.toFixed(2));
    this.selektovanaFaktura.naplata = naplata;
    this.selektovanaFaktura.komentar = komentar;

    this.service.izmeniFakturu(this.selektovanaFaktura).subscribe( (response) => {
      if(response.ok){
        alert('Uspesno ste izmenili fakturu');
        this.ngOnInit();
      }
    }, error => {
      alert('Nemate potrebnu autorizaciju');
    })
  }

  delete(faktura : Faktura){
    this.service.obrisiFakturu(faktura.dokumentId).subscribe( (response) => {
      if(response.ok){
        alert('Uspesno ste obrisali fakturu');
        this.ngOnInit();
      }
    }, error => {
      alert('Nemate potrebnu autorizaciju');
    })
  }




}


import { PrenotazioneService } from 'src/app/service/prenotazione.service';
import { Component, OnInit } from '@angular/core';
import { Icity } from 'src/app/interfaces/Icity';
import { Iprenota } from 'src/app/interfaces/Iprenota';
import { ComuniService } from 'src/app/service/comuni.service';

@Component({
  selector: 'app-comuni',
  templateUrl: './comuni.component.html',
  styleUrls: ['./comuni.component.scss']
})
export class ComuniComponent implements OnInit {
  comuni : Icity[]=[];
  prenotazioni: Iprenota[] = [];

  error: undefined | string;

  constructor(private comuniSvc: ComuniService , private prSvc: PrenotazioneService) { }

  ngOnInit(): void {
    this.getAll();
    this.getAllP();

  }

  getAll() {
    this.comuniSvc.getAll().subscribe((data) => {
      this.comuni = data;
      console.log(this.comuni);
    });
  }

  getAllP(){
    this.prSvc.getAllP().subscribe((data) => {
      this.prenotazioni = data;
      console.log(this.prenotazioni);
    });
  }

  getIdC(id:any) {
    this.comuniSvc.getByIdC(id).subscribe((data) => {
     console.log(data); })
  }


  put(idC:any ): void {

    this.comuniSvc.addPutC(this.prSvc.prenotazioneInCorso.idPrenotazione,idC).subscribe(resp => {
      console.log(resp);
      this.error = undefined;
    }, err => {
      console.log(err.error.message);
      this.error = err.error.message;
    });

  }

  prenota(): void {

    this.prSvc.addPrenota().subscribe(resp => {
      // console.log(resp);
      this.prSvc.setPrenota( resp );
      this.error = undefined;
    }, err => {
      // console.log(err.error.message);
      this.error = err.error.message;
    });
  }

}

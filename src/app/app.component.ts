import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { defer, from, concatMap, concatAll, catchError } from 'rxjs';
import { of } from 'rxjs';
import {      retryWhen, delay, takeWhile } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numeroSO: string='';
  numero: string= '';
  respuesta: any;

  constructor(private apiService: ApiService) {}

  onSubmit() {
    this.apiService.getImage(this.numero).subscribe(
      (data: any) => {
        this.respuesta = data;
        this.respuesta.forEach((item: { id_trkgimg: string; id_tracking: string;   photography: string; }) => {
          console.log('before');
          this.apiService.CompleteItem(item.id_trkgimg).subscribe((datap: any) =>  {
            setTimeout(() => {
              console.log(datap+' dentro');
              // actualizar los valores correspondientes de item con la respuesta
              item.id_trkgimg = datap[0].id_trkgimg;
              item.id_tracking = datap[0].id_tracking;
              item.photography = datap[0].photography;
            }, 10000);
          });
          console.log(data+' dentro');
        });
      },
      error => {
        console.log(error);
      }
    );
  }


  

  

   async onSubmitSO() {
    this.apiService.CompleteSO(this.numeroSO).subscribe(
      (data: any) => {
        this.respuesta = data;
        console.log(data);
        this.respuesta.forEach(async (item: { id_trkgimg: string; id_tracking: string; photography: string; source: number, img:string}) => {
          if(item.source == 1) {
            this.apiService.CompleteItem(item.img).subscribe((data2: any) => {
              setTimeout(() => {
                item.id_trkgimg = data2[0].id_trkgimg;
                item.id_tracking = data2[0].id_tracking;
                item.photography = data2[0].photography;
              }, 5000); 
            });
          } else {
            const url = `https://43b3nq0ov9.execute-api.us-west-2.amazonaws.com/Prod/getdetails/${item.img}`;
            const timeoutValue = 90000;
          
            try {
              const response = await fetch(url, {  });
              if (response.ok) {
                const data3 = await response.json();
                item.id_trkgimg = data3[0].id_trkgimg;
                item.id_tracking = data3[0].id_tracking;
                item.photography = data3[0].image;
                console.log('GetInspection response:', data);
                return data;
              } else {
                console.log('GetInspection error:', response.status);
                throw new Error(`GetInspection request failed with status ${response.status}`);
              }
            } catch (error) {
              console.log('GetInspection error:', error);
              throw error;
            }
           /*  this.apiService.GetInspection(item.img).subscribe((data3: any) => {
              setTimeout(() => {
                console.log(data3);
                item.id_trkgimg = data3[0].id_trkgimg;
                item.id_tracking = data3[0].id_tracking;
                item.photography = data3[0].image;
              }, 5000);
            }); */
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }  
}

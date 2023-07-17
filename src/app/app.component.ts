import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { defer, from, concatMap, concatAll, catchError } from 'rxjs';
import { of } from 'rxjs';


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
  
  onSubmitSO() {
    this.apiService.CompleteSO(this.numeroSO).subscribe(
      (data: any) => {
        this.respuesta = data;
        console.log(data);
        this.respuesta.forEach((item: { id_trkgimg: string; id_tracking: string; photography: string; source: number, img:string}) => {
          if(item.source == 1) {
            this.apiService.CompleteItem(item.img).subscribe((data2: any) => {
              setTimeout(() => {
                item.id_trkgimg = data2[0].id_trkgimg;
                item.id_tracking = data2[0].id_tracking;
                item.photography = data2[0].photography;
              }, 5000); 
            });
          } else {
            this.apiService.GetInspection(item.img).subscribe((data3: any) => {
              setTimeout(() => {
                console.log(data3);
                item.id_trkgimg = data3[0].id_trkgimg;
                item.id_tracking = data3[0].id_tracking;
                item.photography = data3[0].image;
              }, 5000);
            });
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  } 
}

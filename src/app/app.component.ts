import { Component } from '@angular/core';
import { ApiService } from './api.service';

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
          this.apiService.CompleteItem(item.id_trkgimg).subscribe((data: any) =>  {
            // actualizar los valores correspondientes de item con la respuesta
            item.id_trkgimg = data[0].id_trkgimg;
            item.id_tracking = data[0].id_tracking;
            item.photography = data[0].photography;

          });
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
        this.respuesta.forEach((item: { id_trkgimg: string; id_tracking: string;   photography: string; source: number, img:string}) => {
          if(item.source ==1){
            this.apiService.CompleteItem(item.img).subscribe((data2: any) =>  {
              item.id_trkgimg = data2[0].id_trkgimg;
              item.id_tracking = data2[0].id_tracking;
              item.photography = data2[0].photography;
            });
          }else{          
            this.apiService.GetInspection(item.img).subscribe((data3: any) =>  {
              console.log(data3)
            item.id_trkgimg = data3[0].id_trkgimg;
            item.id_tracking = data3[0].id_tracking;
            item.photography = data3[0].image;
          });}
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}

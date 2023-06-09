import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getImage(numero: string) {
    const url = `https://43b3nq0ov9.execute-api.us-west-2.amazonaws.com/Prod/GetImages/${numero}`;
    return this.http.get(url);
  }
  CompleteItem(numero: string){
    const url = `https://43b3nq0ov9.execute-api.us-west-2.amazonaws.com/Prod/getbyid/${numero}`;
    return this.http.get(url);
  }
  CompleteSO(numero: string){
    console.log('CompleteSO');
    const url = `https://43b3nq0ov9.execute-api.us-west-2.amazonaws.com/Prod/getidOrder/${numero}`;
    return this.http.get(url);
  }
  GetInspection(numero: string){
    const url = `https://43b3nq0ov9.execute-api.us-west-2.amazonaws.com/Prod/getdetails/${numero}`;
    return this.http.get(url);
  }
}
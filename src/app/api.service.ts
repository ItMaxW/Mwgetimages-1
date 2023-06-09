import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getImage(numero: string) {
    const url = `https://v9oy12jy2l.execute-api.us-west-2.amazonaws.com/GetImages/${numero}`;
    return this.http.get(url);
  }
  CompleteItem(numero: string){
    const url = `https://v9oy12jy2l.execute-api.us-west-2.amazonaws.com/getbyid/${numero}`;
    return this.http.get(url);
  }
  CompleteSO(numero: string){
    console.log('CompleteSO');
    const url = `https://v9oy12jy2l.execute-api.us-west-2.amazonaws.com/getidOrder/${numero}`;
    return this.http.get(url);
  }
  GetInspection(numero: string){
    const url = `https://v9oy12jy2l.execute-api.us-west-2.amazonaws.com/getdetails/${numero}`;
    return this.http.get(url);
  }
}
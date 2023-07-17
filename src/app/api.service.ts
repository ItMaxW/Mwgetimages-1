import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, timeout } from 'rxjs';
import { defer, from, concatMap, concatAll, catchError, retry, takeWhile } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getImage(numero: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `https://43b3nq0ov9.execute-api.us-west-2.amazonaws.com/Prod/GetImages/${numero}`;
    return this.http.get(url).pipe(delay(1500));
  }
  CompleteItem(numero: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const url = `https://43b3nq0ov9.execute-api.us-west-2.amazonaws.com/Prod/getbyid/${numero}`;
    return this.http.get(url).pipe(delay(1500));
  }
  CompleteSO(numero: string){
    console.log('CompleteSO');
    const url = `https://43b3nq0ov9.execute-api.us-west-2.amazonaws.com/Prod/getidOrder/${numero}`;
    return this.http.get(url).pipe(delay(1500));
  }
  GetInspection(numero: string){
    const url = `https://43b3nq0ov9.execute-api.us-west-2.amazonaws.com/Prod/getdetails/${numero}`;
    const timeoutValue = 90000;
  
    return this.http.get(url).pipe(
      retry(3),
      delay(1500),
      timeout(timeoutValue),
      takeWhile((response: any) => response?.status !== 200),
      catchError((error: any) => {
        console.log('GetInspection error:', error);
        throw error; // O cualquier otro manejo del error deseado
      })
      );
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from "../../common/constants"

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private http: HttpClient) { }

  createOrder(data: any):Observable<any> {
    return this.http.post<any>(API + "OrderInfo/insert", data);
  }
}

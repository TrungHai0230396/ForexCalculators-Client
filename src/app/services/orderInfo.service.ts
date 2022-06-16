import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderInfo } from '../models/orderInfo';
import { PipValuePerLot } from '../models/pipValuePerLot';

import { API } from "../common/constants"
@Injectable({
  providedIn: 'root'
})
export class OrderInfoService {

  constructor(private http: HttpClient) { }

  getOrderInfos(): Observable<Array<OrderInfo>> {
    return this.http.get<Array<OrderInfo>>(API + "OrderInfo");
  }

  getPipValuePerLots(): Observable<Array<PipValuePerLot>>{
    return this.http.get<Array<PipValuePerLot>>(API + "PipValuePerLot");
  }

  findByIdOrderinfo(id: number): Observable<any> {
    return this.http.get<any>(API + "OrderInfo/"+ id);
  }

  updateResult(id: number, result: number): Observable<any> {
    return this.http.put<any>(API + "OrderInfo/updateResult/"+ id + "?result="+ result, null);
  }
}

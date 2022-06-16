import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API } from "../../common/constants"

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient) { }
  deleteOrder(id: number):Observable<any> {
    return this.http.delete<any>(API + "OrderInfo/" + id);
  }
}

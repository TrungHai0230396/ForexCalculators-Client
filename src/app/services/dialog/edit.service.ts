import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from "../../common/constants"
@Injectable({
  providedIn: 'root'
})
export class EditService {

  constructor(private http: HttpClient) { }
  updateOrder(id: number, data: any):Observable<any> {
    return this.http.put<any>(API + "OrderInfo/" + id , data);
  }
}

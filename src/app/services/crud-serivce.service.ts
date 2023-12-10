import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudSerivceService {
  apiUrl="http://localhost:8000";

  constructor(private http:HttpClient) { }

  registerUserData(Data:object,url:string):Observable<any>{
    return  this.http.post<any>(this.apiUrl+url,Data);
  }

  getRegisterUserData(url:string):Observable<any>{
    return  this.http.get<any>(this.apiUrl+url);
  }

  getUserById(urlById):Observable<any>{
    return this.http.get<any>(this.apiUrl+urlById)
  }

  putRegisterUserData(Data:object,url:string):Observable<any>{
    return  this.http.patch<any>(this.apiUrl+url,Data);
  }

  deleteUserById(urlById):Observable<any>{
    return this.http.delete<any>(this.apiUrl+urlById)
  }
}

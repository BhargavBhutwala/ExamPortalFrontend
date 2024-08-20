import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //login user: Set token in browser
  public loginUser(token: any){
    localStorage.setItem('token', token);
    return true;
  }

  //is logged in: User is logged in or not
  public isLoggedIn(){
    // let tokenStr = localStorage.getItem('token');
    // if(tokenStr === undefined || tokenStr === '' || tokenStr === null){
    //   return false;
    // }else{
    //   return true;
    // }
    if (typeof window !== 'undefined' && localStorage) {
      let tokenStr = localStorage.getItem('token');
      return !(tokenStr === undefined || tokenStr === '' || tokenStr === null);
    }
    return false;
  }

  //get token
  public getToken(){
    return localStorage.getItem('token');
  }

  //logout user: Remove token from browser
  public logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //set user details
  public setUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get user details
  public getUser(){
    if (typeof window !== 'undefined' && localStorage) {
      let userStr = localStorage.getItem('user');
      if(userStr!=null){
        return JSON.parse(userStr);
      }else{
        this.logoutUser();
        return null;
      }
    }
    return null;
  }

  //get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}

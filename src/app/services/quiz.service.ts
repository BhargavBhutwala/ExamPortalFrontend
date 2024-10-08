import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  public getAllQuizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz: any){
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  public deleteQuiz(qId: any){
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  public getQuiz(qId: any){
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  public updateQuiz(quiz: any){
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }

  public getQuizzesByCategory(cId: any){
    return this._http.get(`${baseUrl}/quiz/category/${cId}`);
  }

  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  public getActiveQuizzesByCategory(cId: any){
    return this._http.get(`${baseUrl}/quiz/category/active/${cId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  public getQuestionsOfQuiz(qId: any){
    return this.http.get(`${baseUrl}/question/quiz/all/${qId}`);
  }

  public getQuestionsOfQuizStudents(qId: any){
    return this.http.get(`${baseUrl}/question/quiz/${qId}`);
  }

  public addQuestion(question: any){
    return this.http.post(`${baseUrl}/question/`, question);
  }

  public deleteQuestion(questionId: any){
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  public evalQuiz(question: any){
    return this.http.post(`${baseUrl}/question/eval-quiz`, question);
  }
}

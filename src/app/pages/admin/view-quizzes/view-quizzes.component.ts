import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit{

  quizzes: any = [];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

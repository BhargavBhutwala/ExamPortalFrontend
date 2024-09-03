import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit{

  qId: any = 0;

  quiz: any = {};

  constructor(private route:ActivatedRoute, private quizService: QuizService){}

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qId'];

    this.quizService.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}

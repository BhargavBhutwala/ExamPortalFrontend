import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit{

  cId: any = 0;

  quizzes: any = [];

  constructor(private route:ActivatedRoute, private quizService: QuizService){}

  ngOnInit(): void {
    this.cId = this.route.snapshot.params['cId'];

    if(this.cId == 0){
      //console.log('works');
      this.quizService.getAllQuizzes().subscribe(
        (data:  any) => {
          this.quizzes = data;
          console.log(this.quizzes);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else{

    }
  }

}

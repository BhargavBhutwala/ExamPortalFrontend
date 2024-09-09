import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { error } from 'console';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrl: './start-quiz.component.css'
})
export class StartQuizComponent implements OnInit{

  qId: any = 0;

  questions: any = [];

  constructor(private locationStrategy: LocationStrategy, private route: ActivatedRoute, private questionService: QuestionService){}

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this.route.snapshot.params['qId'];
    this.questionService.getQuestionsOfQuizStudents(this.qId).subscribe(
      (data: any) =>{
        this.questions = data;
        console.log(this.questions);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  preventBackButton(){
    history.pushState(null, '');
    this.locationStrategy.onPopState(()=> {
      history.pushState(null, '');
    });
  }

}

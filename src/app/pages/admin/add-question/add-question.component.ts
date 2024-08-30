import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{

  qId: any = 0;

  title: any = '';

  question: any = {
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {}
  };

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qId'];
    this.title = this.route.snapshot.params['title'];
    this.question.quiz['qId'] = this.qId;
  }

}

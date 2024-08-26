import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{

  categories: any = [
    {
      cId: 1,
      title: 'Programming Language'
    },
    {
      cId: 2,
      title: 'Aptitude Test'
    }
  ];

  constructor(){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

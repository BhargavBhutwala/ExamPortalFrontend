import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit{

  qId: any = 0;

  title: any = '';

  questions: any = [];

  constructor(private route: ActivatedRoute, private questionService: QuestionService){}

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qId'];
    this.title = this.route.snapshot.params['title'];
    this.questionService.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any)=>{
        this.questions = data;
        console.log(this.questions);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  deleteQuestion(questionId: any){

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      showConfirmButton: true,
      confirmButtonColor: '#ff3f33',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((response: any)=>{

      if(response.isConfirmed){
        this.questionService.deleteQuestion(questionId).subscribe(
          (data: any)=>{
            this.questions = this.questions.filter((question: any) => question.questionId !== questionId);
            Swal.fire({
              title: 'Success!',
              text: 'Question deleted successfully',
              icon:'success'
            });
          },
          (error)=>{
            console.log(error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete question',
              icon: 'error'
            });
          }
        );
      }
    });

  }

}

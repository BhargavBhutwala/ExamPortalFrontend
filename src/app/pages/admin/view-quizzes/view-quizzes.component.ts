import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { title } from 'process';
import { text } from 'stream/consumers';

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

  deleteQuiz(qId: any){

    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      showConfirmButton: true,
      confirmButtonColor: '#ff3f33',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((response: any) => {
      if(response.isConfirmed){

        //delete
        this.quizService.deleteQuiz(qId).subscribe(
          (data)=>{
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId !== qId);
            Swal.fire(
              {
                title: 'Success!',
                text: 'Quiz deleted successfully',
                icon:'success'
              }
            );
          },
          (error) => {
            console.log(error);
            Swal.fire({
              title: 'Error!',
              text: 'Failed to delete quiz',
              icon: 'error'
            });
          }
        );
      }
    });

  }

}

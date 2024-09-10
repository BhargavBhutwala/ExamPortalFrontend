import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})
export class InstructionsComponent implements OnInit{

  qId: any = 0;

  quiz: any = {};

  constructor(private route:ActivatedRoute, private quizService: QuizService, private router: Router){}

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

  startQuiz(){
    Swal.fire({
      title: "Do you want to start the quiz?",
      showCancelButton: true,
      confirmButtonText: "Start",
      icon: 'warning'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate(['/startQuiz/', this.qId]);
      }
    });
  }

}

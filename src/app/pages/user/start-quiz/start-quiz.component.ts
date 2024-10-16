import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrl: './start-quiz.component.css'
})
export class StartQuizComponent implements OnInit{

  qId: any = 0;

  questions: any = [];

  marksObtained: any = 0;

  correctAnswers: any = 0;

  attempted: any = 0;

  isSubmit: boolean = false;

  timer: any;

  constructor(private locationStrategy: LocationStrategy, private route: ActivatedRoute, private questionService: QuestionService){}

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this.route.snapshot.params['qId'];
    this.questionService.getQuestionsOfQuizStudents(this.qId).subscribe(
      (data: any) =>{
        this.questions = data;
        this.timer = this.questions.length*2*60;
        this.questions.forEach((question: any) => {
          question['selectedAnswer'] = '';
        });
        console.log(this.questions);
        this.startTimer();
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

  submitQuiz(){
    Swal.fire({
      title: "Do you want to submit the quiz?",
      showCancelButton: true,
      confirmButtonText: "Yes, submit the quiz",
      confirmButtonColor: "green",
      icon: 'question'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      this.isSubmit = true;
      if (result.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  evalQuiz(){
    this.questions.forEach((question: any) => {

      if(question.selectedAnswer == question.answer){
        this.correctAnswers++;
        // let singleMark = question.quiz.maxMarks/this.questions.length;
        // this.marksObtained += singleMark;
      }
      if(question.selectedAnswer.trim() != ''){
        this.attempted++;
      }
    });
    let singleMark = this.questions[0].quiz.maxMarks/this.questions.length;
    this.marksObtained = this.correctAnswers*singleMark;
    console.log(this.correctAnswers);
    console.log(this.marksObtained);
    console.log(this.attempted);
  }

  startTimer(){
    let t = setInterval(()=>{
      if(this.timer>0){
        this.timer--;
      }
      else{
        this.isSubmit = true;
        this.evalQuiz();
        clearInterval(t);
      }
    },1000);
  }

  getFormattedTime(){
    let minutes = Math.floor(this.timer/60);
    let seconds = this.timer - minutes  * 60;
    return `${minutes} min : ${seconds} sec`
  }

}

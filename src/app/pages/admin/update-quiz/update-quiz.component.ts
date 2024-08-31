import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit{

  qId: any = 0;

  quizData: any = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cId: 0
    }
  };

  categories: any = [];

  constructor(private route:ActivatedRoute, private quizService: QuizService, private categoryService: CategoryService, private snackBar: MatSnackBar, private router: Router){}

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qId'];
    this.quizService.getQuiz(this.qId).subscribe(
    (data: any)=>{
      this.quizData = data;
    },
    (error)=>{
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Server error',
        icon: 'error'
      })
    });
    this.categoryService.getAllCategories().subscribe(
      (data: any)=>{
        this.categories = data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  updateQuiz(){
    if(this.quizData.title==='' || this.quizData.title===null){
      this.snackBar.open('Please enter title','cancel',{duration: 3000});
      return;
    }

    if(this.quizData.description==='' || this.quizData.description===null){
      this.snackBar.open('Please enter description','cancel',{duration: 3000});
      return;
    }

    if(this.quizData.maxMarks==='' || this.quizData.maxMarks===null || isNaN(this.quizData.maxMarks)){
      this.snackBar.open('Please enter total marks','cancel',{duration: 3000});
      return;
    }

    if(this.quizData.numberOfQuestions==='' || this.quizData.numberOfQuestions===null || isNaN(this.quizData.numberOfQuestions)){
      this.snackBar.open('Please enter total questions','cancel',{duration: 3000});
      return;
    }

    if(this.quizData.category.cId==='' || this.quizData.category.cId===null){
      this.snackBar.open('Please enter a category','cancel',{duration: 3000});
      return;
    }

    this.quizService.updateQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire({
          title: 'Success!',
          text: 'Quiz updated successfully',
          icon: 'success'
        }).then((e)=>{
          this.router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update quiz',
          icon: 'error'
        });
      }
    );
  }

}

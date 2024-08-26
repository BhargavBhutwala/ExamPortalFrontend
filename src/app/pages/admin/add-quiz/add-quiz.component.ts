import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{

  categories: any = [];

  quizData: any = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cId: ''
    }
  };

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar, private quizService: QuizService){}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: any)=>{
        this.categories = data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  addQuiz(){
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
    //console.log(this.quizData);
    this.quizService.addQuiz(this.quizData).subscribe(
      (data)=>{
        console.log(data);
        Swal.fire({
          title: 'Success!',
          text: 'Quiz added successfully',
          icon: 'success'
        });
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cId: ''
          }
        }
      },
      (error)=>{
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Server error',
          icon: 'error'
        });
      }
    );
  }
}

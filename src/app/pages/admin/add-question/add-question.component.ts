import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit{

  //public Editor: any = null;

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

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private questionService: QuestionService, private router: Router){}

  ngOnInit(): void {

    // if (isPlatformBrowser(this.platformId)) {
    //   import('@ckeditor/ckeditor5-build-classic').then((ClassicEditor) => {
    //     this.Editor = ClassicEditor;
    //   }).catch(error => {
    //     console.error('Error loading CKEditor:', error);
    //   });
    // }

    this.qId = this.route.snapshot.params['qId'];
    this.title = this.route.snapshot.params['title'];
    this.question.quiz['qId'] = this.qId;

  }

  addQuestion(){

    if(this.question.content==='' || this.question.content===null){
      this.snackBar.open('Please enter Question','cancel',{duration: 3000});
      return;
    }
    if(this.question.option1==='' || this.question.option1===null){
      this.snackBar.open('Please enter Option 1','cancel',{duration: 3000});
      return;
    }
    if(this.question.option2==='' || this.question.option2===null){
      this.snackBar.open('Please enter Option 2','cancel',{duration: 3000});
      return;
    }
    if(this.question.option3==='' || this.question.option3===null){
      this.snackBar.open('Please enter Option 3','cancel',{duration: 3000});
      return;
    }
    if(this.question.option4==='' || this.question.option4===null){
      this.snackBar.open('Please enter Option 4','cancel',{duration: 3000});
      return;
    }
    if(this.question.answer==='' || this.question.answer===null){
      this.snackBar.open('Please select Answer','cancel',{duration: 3000});
      return;
    }

    this.questionService.addQuestion(this.question).subscribe(
      (data: any)=>{
        Swal.fire({
          title: 'Success!',
          text: 'Question added successfully',
          icon:'success'
        }).then((e)=>{
          this.router.navigate(['/admin/view-questions/',this.qId, this.title]);
        });
      },
      (error)=>{
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add question!',
          icon: 'error'
        });
      }
    );
  }

}

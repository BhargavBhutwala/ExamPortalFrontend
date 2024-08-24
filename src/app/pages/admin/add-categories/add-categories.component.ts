import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrl: './add-categories.component.css'
})
export class AddCategoriesComponent implements OnInit{

  category: any = {
    title: '',
    description: ''
  };

  constructor(private categoryService: CategoryService, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
  }

  formSubmit(){

    if(this.category.title==='' || this.category.title===null){
      this._snackBar.open('Please enter a title','cancel',{duration: 3000});
      return;
    }

    if(this.category.description==='' || this.category.description===null){
      this._snackBar.open('Please enter a description','cancel',{duration: 3000});
      return;
    }

    //addCategory: categoryService
    this.categoryService.addCategory(this.category).subscribe(
      (data: any) => {
        console.log(data);
        this.category = {
          title: '',
          description: ''
        };
        Swal.fire({
          title: 'Success!',
          text: 'Category added successfully!',
          icon:'success'
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add category!',
          icon: 'error'
        });
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit{

  categories:any = [];

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!','Error in loading categories','error');
      }
    );
  }

}

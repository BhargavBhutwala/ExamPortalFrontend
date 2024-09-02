import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent implements OnInit{

  categories: any = [];

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error)=>{
        console.log(error);
      }
    );
  }



}

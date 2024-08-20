import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private userService: UserService, private _snackBar: MatSnackBar){}

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  formSubmit(){
    console.log(this.user);

    if(this.user.username == "" || this.user.username == null){
      //alert("Username is required");
      this._snackBar.open("Username is required!", "cancel", {duration: 2000});
      return;
    }

    //addUser: userService
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        //alert("User added successfully");
        Swal.fire({
          title: "Success!",
          text: "User Registered Successfully!",
          icon: "success"
        });
      },
      error => {
        console.log(error);
        //alert("Error adding user");
        Swal.fire({
          title: "Error!",
          text: "Failed to Register User!",
          icon: "error"
        });
      }
    );
  }

}

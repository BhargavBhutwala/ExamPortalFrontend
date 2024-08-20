import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public loginData = {
    username: '',
    password: ''
  };

  constructor(private _snackBar:MatSnackBar, private loginService: LoginService, private router: Router){}

  formSubmit(){

    if(this.loginData.username === '' || this.loginData.username == null){
      this._snackBar.open('Username is required!','cancel',{duration: 2000});
      return;
    }
    if(this.loginData.password === '' || this.loginData.password == null){
      this._snackBar.open('Password is required!','cancel',{duration: 2000});
      return;
    }

    //request to server for token
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any)=>{
        console.log(data);

        //success: perform login
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe(
          (user: any)=>{
            this.loginService.setUser(user);
            console.log(user);
            //redirect: Admin -> Admin-dashboard
            //redirect: Normal -> Normal-dashboard
            if(this.loginService.getUserRole() === 'Admin'){
              //admin dashboard
              this.router.navigate(['/admin']);
              this.loginService.loginStatusSubject.next(true);
            }
            else if(this.loginService.getUserRole() === 'Normal'){
              //normal dashboard
              this.router.navigate(['/user-dashboard']);
              this.loginService.loginStatusSubject.next(true);
            }
            else{
              this.loginService.logoutUser();
            }
          }
        );
      },
      (error)=>{
        console.log(error);
        this._snackBar.open('Invalid credentials!','cancel',{duration: 3000});
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { User} from '../models/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  user:User=new User();
  constructor(private formBuilder: FormBuilder,private router : Router,private service: UserService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if (this.submitted) {
      // alert("login ya twr p")
      this.service.login(this.user).subscribe(
        responseData => {
          window.localStorage.setItem('userId',responseData.id+"");
          window.localStorage.setItem('userName',responseData.userName);
          window.localStorage.setItem('name',responseData.name);
          window.localStorage.setItem('userEmail',responseData.email);
         // window.localStorage.setItem('createAt',responseData.createAt+"");
          console.log(responseData.email);

        //  window.localStorage.setItem('currentUser', responseData.token);

      // const expireDate = new Date(new Date().getTime() + (1000 * 1000000));
      // localStorage.setItem('dateExpiration', expireDate.toString());
            this.router.navigate(['home']);

          //window.sessionStorage.setItem("loginuser",JSON.stringify(responseData));
        }, error => {
          console.log(error);
          console.log("Invalid Email or Password.");
        });
    }
  }

}

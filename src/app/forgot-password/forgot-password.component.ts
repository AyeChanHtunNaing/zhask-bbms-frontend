import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  user:User=new User();
  constructor(private formBuilder: FormBuilder, private router : Router, private service : UserService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
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
      // alert("email htae tr mhan tl")
      this.service.forgotPsw(this.user).subscribe(
        responseData =>{
          if(responseData == false){
            Swal.fire({
              title: 'Reset Password process Failed',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }else{
            Swal.fire({
              title: 'Reset password link is successfully sent to your mail',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            //
            // this.router.navigate(['reset-password']);
          }
        }
      );
    }
  }

  ngOnInit(): void {
  }

}

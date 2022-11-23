import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  user:User=new User();
  newPassword!:string;
  confirmPassword!:string;

  constructor(private formBuilder: FormBuilder, private router : Router, private service : UserService) {
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required]],
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
      if(this.newPassword==this.confirmPassword){
      this.user.password=this.newPassword;
      console.log(this.user.password)
    }else{
      this.user.password='';
    }
      this.service.resetPsw(this.user).subscribe(
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
              title: 'Password reset successfully',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }
        }
      );
    }
  }

  ngOnInit(): void {
  }

}

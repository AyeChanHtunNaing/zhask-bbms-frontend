import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { user } from '../models/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  user:user=new user();
  constructor(private formBuilder: FormBuilder,private router : Router) {
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
      alert("email htae tr mhan dl")
    }
  }

  ngOnInit(): void {
  }

}

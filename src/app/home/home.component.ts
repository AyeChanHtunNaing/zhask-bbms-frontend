import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Workspace } from '../models/workspace';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnChanges{
  isSideNavCollapsed = false;
  screenWidths = 0;
  workspace : Workspace =new Workspace();
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidths = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
// Validation

  registerForm!: FormGroup;
  submitted = false;
  constructor( private formBuilder: FormBuilder){
    this.registerForm = formBuilder.group({
      email: ['', [Validators.email]],
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      name: ['', [Validators.required]],
      desc: ['', [Validators.required]],
    });
    throw new Error('Method not implemented.');
  }
  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
  //Add user form actions
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
    if(this.submitted)
    {
      alert("Great!!");
    }

  }
  ngOnInit() {
    //Add User form validations

  }

  /* home area pop up form*/
  ngSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      alert("Great!!");
    }
  }
}

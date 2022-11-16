import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isSideNavCollapsed = false;
  screenWidths = 0;
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  names!:string;
  userName!:string;
  email!:string;
  createAt!:string;
  pict :any;
  profile: any = File;
  user:User=new User();
  @ViewChild('name') uname!:ElementRef;
  @ViewChild('username') uusername!:ElementRef;
  @ViewChild('useremail') uemail!:ElementRef;
  @ViewChild('createat') ucreateat!:ElementRef;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidths = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
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
  constructor(private userService:UserService) { }

  ngOnInit(): void {
   this.names=window.localStorage.getItem('name') as string;
   this.userName=window.localStorage.getItem('userName') as string;
   this.email=window.localStorage.getItem('userEmail') as string;
   this.createAt=window.localStorage.getItem('createAt') as string;
  }
  selectpic(e : any){
    if(e.target.files){
      var read = new FileReader();
      this.profile = e.target.files[0];
      console.log(this.profile);
      read.readAsDataURL(e.target.files[0]);
      read.onload=(event : any)=>{
        this.pict = event.target.result;
      }
    }
    
  }

  onSubmit(){

   const value=this.uname.nativeElement.value;
   const value1=this.uusername.nativeElement.value;
   const value2=this.uemail.nativeElement.value;
   const value3=this.ucreateat.nativeElement.value;
   this.user.name=value;
   this.user.userName=value1;
   this.user.email=value2;
   this.user.createAt=value3;
   this.user.profile=this.pict;
   this.user.id=this.getUserId() as number;
   this.userService.updateUserByUserId(this.user).subscribe(data=>
    {
      console.log(data);
      
    }
   )
  }
  getUserId():number | null{
    return window.localStorage.getItem('userId') as number | null;
  
  }
}

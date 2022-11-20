import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import Swal from "sweetalert2";
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
  formdata :any;
  formuser:any;
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
    this.formdata = new FormData();
   this.names=window.localStorage.getItem('name') as string;
   this.userName=window.localStorage.getItem('userName') as string;
   this.email=window.localStorage.getItem('userEmail') as string;
   this.createAt=window.localStorage.getItem('createAt') as string;
   this.userService.getUserNameByUserId(this.getUserId() as number).subscribe(data=>
    {
         this.user=data;
         const b = window.atob(data.profile);
         const c = new ArrayBuffer(b.length);
         const z = new Uint8Array(c);
         for(let i = 0 ; i < b.length ;i++){
           z[i] = b.charCodeAt(i);
         }
         console.log(data)
         console.log(data.pictureName+" "+data.profile);
         const blob = new Blob([z],{type: 'image/jpeg'})
         const file = new File([blob],data.pictureName || '',{type:'image/jpeg'})
         this.profile = file;
         var read = new FileReader();
         read.readAsDataURL(file);
         read.onload=(event : any)=>{
           this.pict = event.target.result;
         }
    })
  }
  selectpic(e : any){
    if(e.target.files){
      var read = new FileReader();
      this.profile = e.target.files[0];
      this.user.pictureName=e.target.files[0].name;
      console.log(this.profile);
      read.readAsDataURL(e.target.files[0]);
      read.onload=(event : any)=>{
        this.pict = event.target.result;
      }
    }
  }

  delete(){
    this.pict = null;
  }
  onSubmit(){

   const value=this.uname.nativeElement.value;
   const value1=this.uusername.nativeElement.value;
   const value2=this.uemail.nativeElement.value;
   const value3=this.ucreateat.nativeElement.value;
   this.user.name=value;
   this.user.userName=value1;
   this.user.email=value2;
  // this.user.createAt=value3;
   this.user.profile=this.pict;
   this.user.id=this.getUserId() as number;
  // this.user.profiles=this.profile;

    this.formdata.append('file',this.profile);
    console.log(this.profile);

    this.userService.uploadProfile(this.formdata).subscribe(data=>
      {
       console.log("this is user photo upload")

      });
      this.formdata.append('username',this.user.userName);
      this.formdata.append('name',this.user.name);
      this.formdata.append('userid',this.user.id);
   this.userService.updateUserByUserId(this.formdata).subscribe(data=>
    {
      console.log(data);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Update Profile successfully',
        showConfirmButton: false,
        timer: 1500
      })

    }
   )
  }
  getUserId():number | null{
    return window.localStorage.getItem('userId') as number | null;

  }
}

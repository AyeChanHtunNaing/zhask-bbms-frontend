import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private router : Router, private service : UserService) { }

  ngOnInit(): void {
    localStorage.removeItem('Authorization');
    this.service.logout().subscribe(
      responseData =>{
        if(responseData == false){
          alert("Failed!")
        }else{
          alert("Success!")
          this.router.navigate(['login']);
        }
      }
    );
  }

}

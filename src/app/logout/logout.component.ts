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

      console.log(this.logout());
      localStorage.removeItem('Authorization');
      alert("Success!")
     this.router.navigate(['login']);

  }

  logout() {
    this.service.logout().subscribe(
      responseData =>{
        console.log(responseData);
      },
      err => {
        console.log(err);
      }
    );
  }

}

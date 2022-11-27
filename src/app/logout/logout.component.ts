import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private router : Router, private service : UserService) { }

  ngOnInit(): void {

      localStorage.removeItem('Authorization');
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Logout Successfully',
      showConfirmButton: false,
      timer: 1500
    });
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

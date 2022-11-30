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
    Swal.fire({
      title: 'Are you sure to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logout!',
          'Logout Successfully.',
          'success'
        )
        localStorage.removeItem('Authorization');
        this.router.navigate(['login']);
      }else{
        //this.router.navigate(['home']);
        window.history.back();
      }
    })


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

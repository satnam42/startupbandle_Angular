import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  isLogin = false;
  constructor(
    private router: Router,
    private userdataservice: UserDataService,
  ) { }
  logo() {
    this.router.navigate(['/search']);
  }
  profile() {

    this.router.navigate(['parent/parent-profile']);
  
  // else {
  //   if (this.user.role === "user") {
  //     this.router.navigate(['/profile']);
  //   }

   
    // }

  // }
}

logout() {
  // this.auth.logout();
  this.userdataservice.logout();
  this.router.navigate(['/login']);
}
  ngOnInit() {
  }

}

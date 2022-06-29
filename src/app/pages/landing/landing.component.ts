import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  isMap: boolean = true;
  isLogin = false;
  userData: any = {};
  pickDate: any;
  pageNo: number = 1;
  pageSize: number;
  forums: any;
  constructor(private router: Router,
    private apiservice: ApiService) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    if (this.userData) {
      this.isLogin = true;
    }
  }

  search() {
    this.router.navigate(['/search']);
  }
 


  ngOnInit() {
    // this.forumList();
    // window.scroll(0, 0);
    if (this.userData) {
      if (this.userData.role === 'superAdmin') {
        this.router.navigate(['login']);
      }
    }

  }

}

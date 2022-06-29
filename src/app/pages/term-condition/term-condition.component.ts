import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-term-condition',
  templateUrl: './term-condition.component.html',
  styleUrls: ['./term-condition.component.css']
})
export class TermConditionComponent implements OnInit {
  userData: any = {};
  isLogin = false;
  constructor() {
    this.userData = JSON.parse(localStorage.getItem('userData'));

    if (this.userData) {
      this.isLogin = true;
    }
  }

  ngOnInit() {
    window.scroll(0, 0);
  }

}

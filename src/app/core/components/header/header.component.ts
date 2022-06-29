import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
import {
  ActivatedRoute,
  Router,
  Event,
  ActivationStart,
  ActivatedRouteSnapshot,
  ActivationEnd,
  NavigationEnd,
  NavigationStart
} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service.service';
import { _getOptionScrollPosition, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import { UserDataService } from '../../services/user-data.service';
import { User } from '../../models/user.model';
declare const $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin = false;
  bcLoadedData;
  bcForDisplay;
  user = new User;
  routeName: string;
  profileClass: string = "active";
  programClass: string = "";
  settingClass: string = "";
  insightClass: string = "";
  helpClass: string = "";
  forumClass: string = "";


  @Input()
  showMenu = false;

  @Output()
  menuClicked: EventEmitter<boolean> = new EventEmitter()
  initialUrl: any;
  _user: any = {};

  userData: any = {};
  profileProgressResponse: any;
  progressBarValue: any;
  profileProgress: string = ''


  message: string = 'Please Login First!';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(
    private router: Router,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private apiservice: ApiService,
    private userdataservice: UserDataService,
    private snack: MatSnackBar

  ) {
    this.user = this.auth.currentUser();
    this.auth.userChanges.subscribe(user => this.user = user)
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.routeName = event.url;
    });
    // this.router.events.filter((event: any) => event instanceof NavigationEnd).subscribe(event => {
    //   this.routeName = event.url;
    // });

    // if (this.user) {
    //   if (this.user.roleId === "5ff5a043c51e0042898fe15e") {
    //     this.isLogin = true;
    //   }
      // else if (this.user.role === "user") {
      //   this.isLogin = false;
      // }
    // }

    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    // this.getProfileProgress()
  }
  logo() {
    this.router.navigate(['/search']);
  }
  addProgram() {
    this.router.navigate(['/program/add']);
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
  // getProfileProgress() {
  //   this.apiservice.getProfileProgress(this.user.id, this.user.role).subscribe((res: any) => {
  //     this.profileProgress = res.profileProgress.toString()
  //     $("#progress").attr("data-percentage", this.profileProgress);
  //   });
  // }
  getUserById() {
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      console.log('user by idddddddd', res);
      this.user = res;
      localStorage.setItem('token', this.user.token);
      localStorage.setItem('userData', JSON.stringify(this.user));


    });
  }
  // gotoChat(){
  //   this.router.navigate(['/chat']);

  // }

  gotoCalender(){
    this.router.navigate(['/calender']);

  }

  ngOnInit() {

    this.getUserById()
    if (this.routeName === 'profile') {
      this.profileClass = 'active';
    }
    if (this.routeName === '/program/list') {
      this.programClass = 'active'
      this.profileClass = '';
    }
    if (this.routeName === '/program/detail') {
      this.programClass = 'active'
      this.profileClass = '';
    }
    if (this.routeName === '/program/add') {
      this.programClass = 'active'
      this.profileClass = '';
    }

    if (this.routeName === 'help') {
      this.helpClass = 'active'
      this.profileClass = '';
    }
    if (this.routeName === '/program/home') {
      this.insightClass = 'active'
      this.profileClass = '';
    }
    if (this.routeName === '/program/setting') {
      this.settingClass = 'active'
      this.profileClass = '';

    }
    if (this.routeName === '/forum/forum-type') {
      this.forumClass = 'active'
      this.profileClass = '';

    }


  }

  logout() {
    // this.auth.logout();
    this.userdataservice.logout();
    this.router.navigate(['/login']);
  }

}

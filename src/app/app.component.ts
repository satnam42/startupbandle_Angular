import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user.model';
import { MessagingService } from './core/services/messaging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  message;
  envName: string;

  currentUser: any = new User;
  isLogin = false;
  constructor(
    private messaging : MessagingService,
    private router: Router,
    private toastyService: ToastyService,
    private auth: AuthService,
    private toastyConfig: ToastyConfig,) {
    this.toastyConfig.theme = 'material';
    this.toastyConfig.timeout = 5000;
    this.toastyConfig.showClose = true;
    this.toastyConfig.limit = 2;
    this.toastyConfig.position = 'top-right';

    if (environment.name && environment.name !== 'prod') {
      this.envName = environment.name;
    }
  }  


  ngOnInit() {
    this.messaging.requestPermission('hey')
    this.messaging.receiveMessage()
    this.message = this.messaging.currentMessage
  }
  ngOnDestroy() {
  }

}

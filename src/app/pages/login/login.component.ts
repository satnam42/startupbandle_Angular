import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service.service';
import { ToastyService } from 'ng2-toasty';
// import { User } from '../../core/models/index'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  credentials = {
    email: '',
    password: ''
  }
  isLoading = false;
  hide: boolean = true;
  response: any;
  message: string = 'Logged In Successfully!';
  action: boolean = true;
  activeDeactiveResponse: any;
  isModal = false;
  image = '';
  images = ['assets/signin.jpg',
    'assets/sign_in_img.jpg',
    'assets/otp_background.png',
    'assets/otp2.jpg',
    'assets/registered_email.jpg',
  ]

  constructor(private router: Router,
    private auth: AuthService,
    private apiservice: ApiService,
    private toastyService: ToastyService,
  ) {
  }

  onPassword() {
    this.hide = !this.hide;
  }

  cancel() {
    this.router.navigate(['/landing']);

  }

  randomImage() {
    const num = Math.floor(Math.random() * this.images.length);
    this.image = this.images[num];
  }
  signin() {
    if (this.credentials.email) {
      let email = this.credentials.email.toLowerCase();
      this.credentials.email = email;
    }
    localStorage.removeItem('userId');
    this.auth.login(this.credentials).subscribe((res: any) => {
      console.log('resssssss', res)
      if (res.isSuccess === true) {
        this.toastyService.success({ title: 'Success', msg: this.message })
        this.router.navigate(['search']);
      }

      else {
        this.toastyService.error({ title: 'Error', msg: res.error })
      }
    });

  }
  // activeDeactiveUser() {
  //   var booleanValue = true;
  //   // this.ngxLoader.start();
  //   this.apiservice.activeDeactiveUser(this.response.data.id, booleanValue).subscribe((activeDeactiveResponse: any) => {
  //     // this.ngxLoader.stop();
  //     if (activeDeactiveResponse) {
  //       return this.signin();
  //     } else {
  //       this.toastyService.error({ title: 'Error', msg: activeDeactiveResponse.error })
  //     }
  //   });
  //   // this.ngxLoader.stop();
  // }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }


  ngOnInit() {
    window.scroll(0, 0);
    this.randomImage();
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(1)]),
      // rememberMe: new FormControl(false)
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastyService } from 'ng2-toasty';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  otpSendForm: FormGroup;
  otpVerifyForm: FormGroup;
  passwordResetForm: FormGroup;
  isForgot = true;
  isOTP = false;
  isNewPassword = false;
  isConfirmPassword = false;
  credentials = {
    email: '',
    newPassword: '',
    confirmPassword: '',
    otp: '',
    otpToken: '',
  }
  image = '';
  images = ['assets/signin.jpg',
    'assets/sign_in_img.jpg',
    'assets/otp_background.png',
    'assets/otp2.jpg',
    'assets/registered_email.jpg',
  ]

  constructor(private router: Router,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
    private toastyService: ToastyService,
  ) {
  }
  otpRequest() {
    window.scroll(0, 0);
    var email: any = {
      email: ''
    }
    email.email = this.credentials.email.toLowerCase();
    this.apiservice.forgotPassword(email).subscribe((res: any) => {
      console.log('resss>>>>>>>>', res);
      if (res.isSuccess) {
        this.credentials.otpToken = res.data.token
        this.isOTP = true;
        this.isNewPassword = false;
        this.isForgot = false;
        this.credentials.otpToken = res.data.token,
          this.toastyService.success({ title: '', msg: res.message })
      }
      else {
        this.isForgot = true;
        this.isOTP = false;
        this.isNewPassword = false;
        this.toastyService.error({ title: '', msg: res.error })
      }
    });
  }

  resetPassword() {
    var resetPassword: any = {
      otp: this.credentials.otp,
      newPassword: this.credentials.newPassword
    }
    this.apiservice.otpVerify(resetPassword, this.credentials.otpToken).subscribe((res: any) => {
      console.log('resss@@@@@@@@@@@', res);
      if (res.isSuccess) {
        this.router.navigate(['/login'])
        this.toastyService.success({ title: '', msg: res.message })
      }
      else {
        this.ngxLoader.stop();
        this.isOTP = true;
        this.isNewPassword = false;
        this.isForgot = false;
        let msg = 'Something went Wrong!';
        this.toastyService.error({ title: '', msg: res.error })
        // this.snack.open(msg, 'OK', { duration: 5000 });
      }
    });
  }

  cancel() {
    this.router.navigate(['/login']);
  }
  randomImage() {
    const num = Math.floor(Math.random() * this.images.length);
    this.image = this.images[num];
  }
  ngOnInit() {
    this.randomImage();
    window.scroll(0, 0);
    this.otpSendForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    let newPassword = new FormControl('', [Validators.required]);
    let confirmPassword = new FormControl('', [Validators.required,
    CustomValidators.equalTo(newPassword)]);
    this.otpVerifyForm = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.minLength(4)]),
      newPassword: newPassword,
      confirmPassword: confirmPassword
    });


  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  parentForm: FormGroup;
  providerForm: FormGroup;

  userData: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleId: '5ff5a043c51e0042898fe15e',
  }

  message: string = 'Registered Successfully!';
  categoryResponse: any;
  response: any;
  hide: boolean = true;
  image = '';
  images = ['assets/signin.jpg',
    'assets/sign_in_img.jpg',
    'assets/otp_background.png',
    'assets/otp2.jpg',
    'assets/registered_email.jpg',
  ]

  constructor(
    private router: Router,
    private apiservice: ApiService,
    private toastyService: ToastyService,) {

  }

  onPassword() {
    this.hide = !this.hide;
  }



  randomImage() {
    const num = Math.floor(Math.random() * this.images.length);
    this.image = this.images[num];
  }


  signup() {
    let email = this.userData.email.toLowerCase();
    this.userData.email = email;
    this.apiservice.addUser(this.userData).subscribe((res: any) => {
      console.log('resssssss', res)
      if (res.isSuccess === true) {
        this.toastyService.success({ title: 'Success', msg: this.message });
        this.router.navigate(['/login']);
      } else {
        this.toastyService.error({ title: '!', msg: res.error })
      }
    });

  }

  ngOnInit() {
    this.randomImage();
    window.scroll(0, 0);

    this.parentForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      // rememberMe: new FormControl(false)
    });

  }

}


import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service.service';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig, MatSnackBar, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CustomValidators } from 'ng2-validation';
import { User } from '../../../core/models/user.model';
import { HeaderComponent } from 'src/app/core/components/header/header.component';
import { ToastyService } from 'ng2-toasty';
import * as moment from 'moment';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppConfirmService } from 'src/app/core/services/app-confirm/app-confirm.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.css']
})
export class ParentProfileComponent implements OnInit {
  updateForm: FormGroup;
  resetPasswordForm: FormGroup;
  addChildForm: FormGroup;
  editChildForm: FormGroup;
  addGuardianForm: FormGroup;
  tellFriendForm: FormGroup;
  giveFeedbackForm: FormGroup;
  id: any;
  user = new User;
  guardianData = new User;
  isSideBar: Boolean = true;
  msg: string;
  guardianResponse: any;
  favourites: any = [];
  profileProgress: 0;
  fileData: File = null;
  imagePath;
  parentImgURL: any;
  formData = new FormData();
  imgURLS: any = [];
  images: File = null
  data: any = new User;
  gallery: string;
  selectedImg: any
  closeResult: string;


  isProfile = true; profile = 'active';
  isSetting = false; setting = '';
  isNotification = false; notification = '';
  isPhotos = false; photos = '';

  // ---------------autucomplete-------------  
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  addGuardianData: any = {
    firstName: '',
    email: '',
    personalNote: '',
    parentId: '',
  };
  categoryIds: [] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild(HeaderComponent, { static: true }) headerComponent: HeaderComponent;

  message: string = 'Updated Successfully';
  action: boolean = true;
  userData: any = {};
  editChild: any;
  keyword = 'name';
  SelectedCategories: any = [];
  childImageURl: '';
  resetPasswordData: any = {
    oldPassword: '',
    newPassword: '',
  };

  // ------------------------------------
  isLoading: Boolean = false;
  tags: any = [];
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private auth: AuthService,
    private toastyService: ToastyService,
    private confirmService: AppConfirmService,
    private modalService: NgbModal
  ) {
    this.user = this.auth.currentUser();
    var retrievedObject = localStorage.getItem('userData');
    this.userData = JSON.parse(retrievedObject);

  }
  sideBar() {
    this.isSideBar = !this.isSideBar;
  }
  back() {
    this.router.navigate(['/search']);
  }
  onFocused(e) {
    // do something when input is focused
  }

  onProfile() {
    window.scroll(0, 0);
    this.isProfile = true; this.profile = 'active';
    this.isSetting = false; this.setting = '';
    this.isNotification = false; this.notification = '';
    this.isPhotos = false; this.photos = '';
    return this.getUserById();

  }

  onSetting() {
    window.scroll(0, 0);
    this.isProfile = false; this.profile = '';
    this.isSetting = true; this.setting = 'active';
    this.isPhotos = false; this.photos = '';
    this.isNotification = false; this.notification = '';
  }
  onGallery() {
    window.scroll(0, 0);
    this.isProfile = false; this.profile = '';
    this.isSetting = false; this.setting = '';
    this.isPhotos = true; this.photos = 'active';
    this.isNotification = false; this.notification = '';
  }

  // remove(indx): void {

  //   this.kid.interestInfo.splice(indx, 1);

  // }

  fileSelect(event) {
    console.log('userID', this.user.id)
    this.fileData = event.target.files[0];
    this.formData.append('file', this.fileData);
    this.formData.append('id', this.userData.id);
    this.formData.append('imageFor', 'user');

    // --------------------preview image before upload ------------------------

    if (event.target.files.length === 0)
      return;
    var reader = new FileReader();
    this.imagePath = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.parentImgURL = reader.result;
    };
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = " only images are supported";
      return;
    }
    // -------------------------------------------------------------------------------

    this.apiservice.uploadImage(this.formData).subscribe((res: any) => {
      if (res) {
        // this.toastyService.success({ title: 'Success', msg: this.message });
        this.user.avatar = res.avatar;
        this.getUserById();
        this.headerComponent.getUserById();

      } else {
        // this.toastyService.error({ title: 'Error', msg: 'something went wrong, please try again Later!' });
      }
    });
  }

  uploadMultipleImages() {
    this.isLoading = true;
    let formData = new FormData();
    console.log('images', this.images)
    for (let i in this.images) {
      console.log(i)
      formData.append('file', this.images[i]);
    }
    formData.append('id', this.user.id);
    formData.append('imageFor', 'user');
    // this.data.id = this.user.id;
    this.apiservice.uploadMultipleImages(formData).subscribe(res => {
      this.data = res;
      console.log('responsesssss', this.data)
      if (this.data.isSuccess === true) {
        this.toastyService.success({ title: 'Success', msg: this.message });
        this.getUserById();
        // this.router.navigate(['tables/user']);
        // location.reload();
        // this.route.navigateByUrl('/profile', { skipLocationChange: true }).then(() => {
        // this.route.navigate(['profile/settings']);
        //   this.isLoading = false;
        // })
      } else {

        this.toastyService.error({ title: 'Error', msg: 'something went wrong, please try again Later!' });
        this.isLoading = false;
      }
    });

  };
  /* test commit */
  multiImgSelect = async (event) => {

    this.images = event.target.files
    if (event.target.files.length === 0)
      return;
    var reader = new FileReader();
    let images = event.target.files;
    for (let image of images) {
      let imageUrl = await this.handleUpload(image)
      this.imgURLS.push(imageUrl)
      // reader.readAsDataURL(image);
      // reader.onload = (_event) => {
      //   
      // }
    }
    // event.target.files.forEach(file => {

    // });


    // var mimeType = event.target.files[0].type;
    // if (mimeType.match(/image\/*/) == null) {
    //   this.msg = " only images are supported";
    //   return;
    // }

  }

  readUploadedFile = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        console.log("Problem parsing input file.")
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

  handleUpload = async (file) => {
    let fileContents = await this.readUploadedFile(file)
    return fileContents
  }

  open(imgId,image) {
    this.selectedImg =image
    this.modalService.open(imgId, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



  deleteImage(id, imgId, imgName) {
    var imageName = imgName.split("/").pop();
    console.log('imagenmae', imageName)
    this.confirmService.confirm({ message: `Delete ${imageName}?` }).subscribe(res => {
    if (res){
    
    this.apiservice.deleteImage(id, imgId, imageName).subscribe((res: any) => {

      if (res) {
        this.toastyService.success({ title: 'Success', msg: "Image deleted! " });
        this.getUserById();
      }

    });
  }
 })
  }

  updateProfile(user) {
    this.user.avatarImages;
    this.apiservice.updateProfile(user.id, user).subscribe((res: any) => {
      // this.getProfileProgress();
      // this.headerComponent.getProfileProgress();
      this.headerComponent.getUserById();
      if (res) {
        this.toastyService.success({ title: 'Success', msg: this.message });
      } else {
        if (this.userData === null || this.userData === undefined) {
          this.router.navigate(['/login']);
          let msg = 'Please Login First!';
          this.toastyService.info({ title: 'Info', msg: msg });
        }
        else {
          let msg = 'Something Went Wrong!';
          this.toastyService.error({ title: 'Error', msg: msg });
        }
      }
    });

  }

  resetPassword() {
    // this.id = this.userData._id;
    this.apiservice.resetPassword(this.user.id, this.resetPasswordData).subscribe((res: any) => {
      if (res.isSuccess === true) {
        this.toastyService.success({ title: 'Success', msg: this.message });
        // this.router.navigate(['/login']);
      }
      else {
        if (res.error === 'Old Password Not Match') {
          this.toastyService.error({ title: 'Info', msg: res.error });
        }
        else {
          let msg = 'Something Went Wrong!';
          this.toastyService.error({ title: 'Error', msg: msg });
        }
      }
    });
  }

  getUserById() {
    this.apiservice.getUserById(this.user.id).subscribe((res: any) => {
      console.log('user by id on profile', res);
      this.user = res;

    });
  }


  ngOnInit() {
    window.scroll(0, 0);
    if (this.userData === null || this.userData === undefined) {
      this.router.navigate(['/login']);
    }

    this.headerComponent.getUserById();
    this.getUserById();
    this.user.avatar = this.userData.avatar

    this.updateForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
    });

    this.resetPasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    });


  }
}

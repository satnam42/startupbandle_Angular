import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LocalStorageService } from '.';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { ToastyService } from 'ng2-toasty';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    root = environment.apiUrl.reports;
    userResponse: any;
    token = ''
    header = {}

    constructor(
        private http: HttpClient,
        private store: LocalStorageService,
        private toasty: ToastyService,
        private ngxLoader: NgxUiLoaderService) {
    }

    //-------------------- get header -------------------------------->

    getHeader() {
        this.token = this.store.getItem('token')
        if (this.token) {
            let header = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'x-access-token': this.token,
                })
            };
            return header
        } else {
            let header = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                })
            }
            return header
        }
    }


    //------------------------------- forgot password ---------------------->

    forgotPassword(model): Observable<User> {
        const subject = new Subject<User>();
        this.ngxLoader.start();
        this.http.post(`${this.root}/users/forgotPassword`, model).subscribe((responseData: any) => {
            this.ngxLoader.stop();
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    //----------------------------- otp verify ----------------------------->

    otpVerify(model, token): Observable<User> {
        const subject = new Subject<User>();
        let header = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'x-access-token': token,
            })
        };
        this.ngxLoader.start();
        this.http.post(`${this.root}/users/otpVerifyAndChangePassword`, model, header).subscribe((responseData: any) => {
            this.ngxLoader.stop();
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            // this.toasty.error(dataModel.error);
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }


    //--------------------------- reset password --------------------------->

    resetPassword(id, model): Observable<User> {
        const subject = new Subject<User>();
        this.ngxLoader.start();
        this.http.put(`${this.root}/users/changePassword/${id}`, model, this.getHeader()).subscribe((responseData: any) => {
            this.ngxLoader.stop();
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

    //---------------------------- upload user Image ------------------------>

    uploadImage(model): Observable<any> {
        const subject = new Subject<any>();
        this.ngxLoader.start();
        this.http.post(`${this.root}/images/uploadSingle`, model, {
            headers: null
        }).subscribe((responseData: any) => {
            console.log('res from server', responseData);
            this.ngxLoader.stop();
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    this.toasty.success(dataModel.message);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();

    }

    uploadMultipleImages(model): Observable<any> {
        const subject = new Subject<any>();
        this.ngxLoader.start();
        this.http.post(`${this.root}/images/uploadMultiple`, model, {
            headers: null
        }).subscribe((response) => {
            this.ngxLoader.stop();
            // this.tagResponse = response;
            subject.next(response);
            // console.log('add category response', this.tagResponse);
            console.log('response', response)
        }, (error) => {
            console.log('error', error)
            subject.next(error.error);
        }
        );
        return subject.asObservable();

    }
    //--------------------------- get Admins------------------------>


    getAdmins(): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.ngxLoader.start();
        this.http.get(`${this.root}/admins/getAdmins`, this.getHeader()).subscribe((responseData) => {
            this.ngxLoader.stop();
            this.userResponse = responseData;
            subject.next(this.userResponse);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    getUsers(): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.ngxLoader.start();
        this.http.get(`${this.root}/users/getUsers`, this.getHeader()).subscribe((responseData: any) => {
            this.ngxLoader.stop();
            this.userResponse = responseData.data;
            subject.next(responseData.data);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }



    //------------------------- add user --------------------------------->

    addUser(data): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.ngxLoader.start();
        this.http.post(`${this.root}/users/create`, data, { headers: null }).subscribe((responseData: any) => {
            this.ngxLoader.stop();
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            subject.next(error.error);
        });
        return subject.asObservable();
    }


    //------------------------------- update user -------------------------->

    updateProfile(id, data): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.ngxLoader.start();
        this.http.put(`${this.root}/users/update/${id}`, data, this.getHeader()).subscribe((responseData: any) => {
            this.ngxLoader.stop();
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);

        });
        return subject.asObservable();
    }

    // -------------------------- get user by Id ------------------------->

    getUserById(id): Observable<User> {
        const subject = new Subject<User>();

        this.http.get(`${this.root}/users/currentUser/${id}`, this.getHeader()).subscribe((responseData: any) => {
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData.data);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }


    deleteImage(id, imageId, image): Observable<User[]> {
        const subject = new Subject<User[]>();
        this.ngxLoader.start();
        this.http.put(`${this.root}/images/remove/?id=${id}&imageId=${imageId}&image=${image}`, { headers: null }).subscribe((responseData: any) => {
            this.ngxLoader.stop();
            if (responseData.statusCode !== 200) {
                throw new Error('This request has failed ' + responseData.status);
            }
            const dataModel = responseData;
            if (!dataModel.isSuccess) {
                if (responseData.status === 200) {
                    // this.toasty.error(dataModel.error);
                    throw new Error(dataModel.code || dataModel.message || 'failed');
                } else {
                    throw new Error(responseData.status + '');
                }
            }
            subject.next(responseData);
        }, (error) => {
            const dataModel = error;
            subject.next(dataModel.error);
        });
        return subject.asObservable();
    }

}

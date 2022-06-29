import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastyService } from 'ng2-toasty';
// import { LocalStorageService } from '.';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class AuthService {
  root = environment.apiUrl.reports;
  private _user: User;
  private _currentUserSubject = new Subject<User>()
  userChanges = this._currentUserSubject.asObservable()

  constructor(
    private http: HttpClient,
    private toasty: ToastyService,
    private store: LocalStorageService,
    private ngxLoader: NgxUiLoaderService
  ) {
  }

  private setUser(user: User) {
    if (user) {
      this.store.setObject('userData', user);
      this.store.setItem('token', user.token);
    } else {
      this.store.clear();
    }
    this._user = user;
    this._currentUserSubject.next(user);
  }

  currentUser(): User {
    // if (this._user) {
    //   this._user = this.store.getObject('userData') as User;

    //   return this._user
    // }

    this._user = this.store.getObject('userData') as User;

    return this._user;
  }


  login(model): Observable<User[]> {
    const subject = new Subject<User[]>();
    this.ngxLoader.start();
    this.http.post(`${this.root}/users/login`, model, { headers: null }).subscribe((responseData: any) => {
      this.ngxLoader.stop();
      if (responseData.statusCode !== 200) {
        throw new Error('This request has failed ' + responseData.status);
      }
      const dataModel = responseData
      if (!dataModel.isSuccess) {
        if (responseData.status === 200) {
          this.toasty.error(dataModel.error);
          throw new Error(dataModel.code || dataModel.message || 'failed');
        } else {
          throw new Error(responseData.status + '');
        }
      }
      this.setUser(dataModel.data)
      subject.next(dataModel);
    },
      (error) => {
        subject.next(error.error);
      });
    return subject.asObservable();
  }


  logout() {
    localStorage.removeItem('token');
    this.setUser(null)
  }
}

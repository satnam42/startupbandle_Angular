import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component'
import { MatIconModule } from '@angular/material';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

const routes: Routes = [
  {
    path: '', component: LoginComponent, children: [

    ]
  }
]
@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxUiLoaderModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule {

}

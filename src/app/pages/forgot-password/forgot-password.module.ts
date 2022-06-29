import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

const routes: Routes = [
  {
    path: '', component: ForgotPasswordComponent,
  }
]
@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotPasswordModule { }

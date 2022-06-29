import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { SignUpComponent } from './sign-up.component'
import { ReactiveFormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

const routes: Routes = [
  {
    path: '', component: SignUpComponent,
  }
]
@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    NgxUiLoaderModule,
    RouterModule.forChild(routes)
  ]
})
export class SignUpModule { }

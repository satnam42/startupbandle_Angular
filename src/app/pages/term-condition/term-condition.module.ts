import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermConditionComponent } from './term-condition.component'
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {
    path: '', component: TermConditionComponent,
  }
]
@NgModule({
  declarations: [TermConditionComponent],
  imports: [
    CoreModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TermConditionModule { }

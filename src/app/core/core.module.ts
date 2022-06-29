import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ToastyModule } from 'ng2-toasty';

import {
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatSnackBarModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSidenavModule,
  MatExpansionModule,
  MatListModule
} from '@angular/material';

import { FooterComponent } from '../../app/core/components/footer/footer.component';
import { HeaderComponent } from '../../app/core/components/header/header.component';
import { AuthService } from './services/auth.service';
import { UserGuard } from './guards/user.guard';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { Header2Component } from './components/header2/header2.component';
import { Footer2Component } from './components/footer2/footer2.component';
const components = [
  HeaderComponent,
  FooterComponent,
  BreadcrumbComponent,
  DragDropComponent,
  Header2Component,
  Footer2Component,
  
]

const thirdPartyModules = [
  ToastyModule,
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatSnackBarModule,
  MatIconModule,
  MatCheckboxModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSidenavModule,
  MatExpansionModule,
  MatListModule,
  NgxFileDropModule,
  OwlDateTimeModule,
  OwlNativeDateTimeModule
];
const services = [
  AuthService,

];
const guards = [
  UserGuard,
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    ...thirdPartyModules,
  ],
  declarations: [...components, BreadcrumbComponent,  DragDropComponent, Footer2Component ],
  exports: [...thirdPartyModules, ...components],
  entryComponents: [],
  providers: [
    ...services, ...guards
  ]
})
export class CoreModule { }

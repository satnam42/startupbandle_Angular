import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from '../app/app.component';
import { LocalStorageService } from '../app/core/services';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatFormFieldModule, MatCheckboxModule, MatMenuModule, MatSidenavModule, MatSidenav, } from '@angular/material';
import { ParentComponent } from './pages/parent/parent.component';
import { Ng5SliderModule } from 'ng5-slider';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatCarouselModule } from '@ngmodule/material-carousel';


// import { ProgramDetailComponent } from './pages/program-detail/program-detail.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LandingComponent } from './pages/landing/landing.component';
// import { ChatComponent } from './pages/chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { AppConfirmService } from './core/services/app-confirm/app-confirm.service';
import { AppComfirmComponent } from './core/services/app-confirm/app-confirm.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './core/services/messaging.service';
import { AsyncPipe } from '@angular/common';
import { AboutComponent } from './pages/about/about.component';
import { TeamComponent } from './pages/team/team.component';
import { TestimonialComponent } from './pages/testimonial/testimonial.component';
import { WorkComponent } from './pages/work/work.component';
import { BlogComponent } from './pages/blog/blog.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { HeaderNewComponent } from './pages/header-new/header-new.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterNewComponent } from './pages/footer-new/footer-new.component';
import { SearchComponent } from './pages/search/search.component';
import { AgmCoreModule } from '@agm/core';
const config: SocketIoConfig = { url: environment.socketUrl, options: {} };
const components = [
  AppComponent,
];
// guards
@NgModule({
  declarations: [
    ...components,
    LandingComponent,
    ParentComponent,
    AppComfirmComponent,
    AboutComponent,
    TeamComponent,
    TestimonialComponent,
    WorkComponent,
    FeaturesComponent,
    PricingComponent,
    HeaderNewComponent,
    HomeComponent,
    FooterNewComponent,
    SearchComponent,
    BlogComponent
  ],
  entryComponents: [
    ...components,
    AppComfirmComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatCheckboxModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxUiLoaderModule,
    CoreModule,
    Ng2SearchPipeModule,
    PerfectScrollbarModule,
    MatCarouselModule,
    // SearchModule,
    Ng5SliderModule,
    AutocompleteLibModule,
    MatMenuModule,
    NgbModalModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SocketIoModule.forRoot(config),
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCayIBisLl_xmSOmS3g524FAzEI-ZhT1sc'
    }),
  ],

  providers: [
    LocalStorageService,
    AppConfirmService,
    MessagingService,
    AsyncPipe
    // ...services
  ],

  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }

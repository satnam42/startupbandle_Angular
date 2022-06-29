//module
import { NgModule } from '@angular/core';
import { ParentRoutingModule } from './parent.routing';
import { CoreModule } from '../../core/core.module';
import { CommonModule } from '@angular/common';
import { MatSliderModule, MatIconModule, MatStepperModule, MatAutocompleteModule, MatChipsModule, MatTooltipModule } from '@angular/material';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CustomFormsModule } from 'ng2-validation';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
// import { AgmCoreModule } from '@agm/core';

// components
import { ParentProfileComponent } from './parent-profile/parent-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComfirmComponent } from 'src/app/core/services/app-confirm/app-confirm.component';


@NgModule({

    declarations: [
     ParentProfileComponent, 
    //  AppComfirmComponent

    ],
    entryComponents: [
        // AppComfirmComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        CustomFormsModule,
        ReactiveFormsModule,
        CoreModule,
        MatSliderModule,
        MatChipsModule,
        MatAutocompleteModule,
        NgxUiLoaderModule,
        MatIconModule,
        MatTooltipModule,
        MatStepperModule,
        ParentRoutingModule,
        AutocompleteLibModule,
        
        // AgmCoreModule.forRoot({
        //     apiKey: 'AIzaSyCayIBisLl_xmSOmS3g524FAzEI-ZhT1sc'
        // }),

    ],
    exports: [
        ParentProfileComponent
    ],
    // entryComponents: [
    //    AppComfirmComponent
    //   ]
})
export class ParentModule { }

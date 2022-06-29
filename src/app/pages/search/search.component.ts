import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { MapService } from 'src/app/services/map.service';
// import { Marker } from 'src/app/models/google-map-marker.model';
import { ApiService } from 'src/app/core/services/api.service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Options } from 'ng5-slider';
import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  slides = [
    {'image':'./assets/zz.jpg' },
    {'image':'./assets/ab.jpg' },
    {'image':'./assets/activity1.png' },    
    {'image':'./assets/cup.jpg' },   
    
    ];

  isDateFilter: boolean = false;
  isTimeFilter: boolean = false;
  isAgeFilter: boolean = false;
  isChildFilter: boolean = false;
  isPriceFilter: boolean = false;
  isOpenFilter: boolean = false;
  isSavedFilter: boolean = false;
  isCategoryFilter: boolean = false
  isDateModal: boolean = false;
  isTimeModal: boolean = false;
  isAgeModal: boolean = false;
  isChildModal: boolean = false;
  isPriceModal: boolean = false;
  isCategoryModal: boolean = false;
  isFav: boolean = false;
  categoryId: any = ''
  favPrograms: any;
  isMap: boolean = true;
  userData: any = {};
  programList: any;
  // totalPages: number;
  filterClass: boolean = false;

  markerUrl = 'assets/location.svg';
  pageNo: number = 1;
  pageSize: number = 20;
  programs: any;
  isLogin: Boolean = false;
  key: string = '';
  providerRole: boolean = false;
  parentRole: boolean = false;
  favProgramRes: any;
  keyword = 'name';
  searchKey = '';
  isSearched = false;
  isScrol
   = true;
  fav: any = {
    userId: '',
    programId: '',
  };
  searchedPrograms: any = [];
  searchedProgram: any = [];
  loaderPostion = 'center-center';
  loaderType = 'ball-spin-clockwise';
  fromDate: any;
  toDate: any;
  fromTime: any;
  toTime: any;
  minPrice: any = 10;
  maxPrice: any = 20;
  pickDate: any;
  favourites: any = [];

  //  ng5slider start age group
  minAge: number = 3;
  maxAge: number = 10;
  ageOption: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number): string => {
      return value + ' YRS';
    }
  };
  // ng5slider end

  showReset = false;
  deleteProgramRes: any;


  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search', { static: true })
  public searchElementRef: ElementRef;



  constructor(
    private router: Router,
    private apiservice: ApiService,
    private ngxLoader: NgxUiLoaderService,
    private mapsAPILoader: MapsAPILoader,
  ) {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.latitude = +pos.coords.longitude;
        this.longitude = +pos.coords.latitude;
      });
    }
    var retrievedObject = localStorage.getItem('userData');
    this.userData = JSON.parse(retrievedObject);
    if (this.userData) {
      this.isLogin = true;
      if (this.userData.role === 'provider') {
        this.providerRole = true;
        this.parentRole = false;
      }
      if (this.userData.role === 'parent') {
        this.parentRole = true;
        this.providerRole = false;
        // this.getChildren()
      }
    }

  }
  
  
  ngOnInit() {
    window.scroll(0, 0);
    
    // this.getChildren();


    // this.getpublishProgram();

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      // tslint:disable-next-line:new-parens
      this.geoCoder = new google.maps.Geocoder;

    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 4;

        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          // this.zoom = 20;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


}


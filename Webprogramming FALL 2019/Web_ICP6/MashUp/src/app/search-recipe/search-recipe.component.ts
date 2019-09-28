import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList = [];
  formattedAddress = [];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  recepieApi = 'https://api.edamam.com/search?q=';
  recepieAppid = '&app_id=a1270639';
  recepieKey = '&app_key=21734bea08a7a16287c741e62cfa794c';

  placesApi = 'https://api.foursquare.com/v2/venues/search?';
  clientdId = 'client_id=HWTSQDW20B41HSWM0UISXWRYD0PGU3IZ3EEHUL3GGXWYJF50';
  clientSecret = '&client_secret=YIXQFCY50DNFUPMRIUEI3YNYRAEPWM5BWOAGRHCEN4STDNV0';
  version = '&v=20180323';
  near = '&near=';
  query = '&query=';
  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {

    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;

    if (this.recipeValue !== null) {
      this._http.get( this.recepieApi + this.recipeValue + this.recepieAppid + this.recepieKey).subscribe((res: any) => {
        console.log(res.hits);
        this.recipeList = Object.keys(res.hits).map(function (k) {
          const i = res.hits[k].recipe;
          return {name: i.label, icon: i.image, url: i.url};
        });

      });

    }

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      this._http.get( this.placesApi  + this.clientdId + this.clientSecret + this.version
        + this.near + this.placeValue).subscribe((res: any) => {
        console.log(res);
        this.venueList = Object.keys(res.response.venues).map(function (k) {
          const i = res.response.venues[k];
          return {name: i.name, formattedAddress: i.location.formattedAddress};
        });
      });

      /**
       * Write code to get place
       */
    }
  }
}

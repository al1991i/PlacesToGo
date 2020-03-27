import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs';
import { LoadingController, IonToggle } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

  text = 'It\'s Not Correct!';
  loadedPlaces: Place[];
  bool = true;
  listedLoadedPlaces: Place[];
  private placesSub: Subscription;

  constructor(private placesService: PlacesService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // Query for the toggle that is used to change between themes
    const toggle = document.querySelector('#themeToggle');

    // Listen for the toggle check/uncheck to toggle the dark class on the <body>
    toggle.addEventListener('ionChange', (ev) => {
      this.bool = !this.bool;
      if (this.bool) {
        // Android fix for enabling dark mode, see native implementation in MainActivity.java
        if (window.navigator.userAgent.includes('AndroidDarkMode')) {
          this.text = 'AndroidDarkMode';
        }
      }
      document.body.classList.toggle('dark', this.bool);
    });

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (e) => checkToggle(e.matches));

    // Called when the app loads
    function loadApp() {
      checkToggle(prefersDark.matches);
    }

    // Called by the media query to check/uncheck the toggle
    function checkToggle(shouldCheck) {
      this.bool = shouldCheck;
    }
    this.placesSub = this.placesService.places.subscribe(places => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
  }

  ionViewWillEnter() {
    this.loadingCtrl
      .create({ message: 'Loading places...' })
      .then(loadingEl => {
        loadingEl.present();
        this.placesService.fetchPlaces().subscribe(() => {
          loadingEl.dismiss();
        });
      });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../place.model';
import { NavController, LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {

  form: FormGroup;
  place: Place;
  private placesSub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placeService: PlacesService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('offerId')) {
        this.navCtrl.navigateBack('places/tabs/offers');
        return;
      }
      this.placesSub = this.placeService.getPlace(paramMap.get('offerId')).subscribe(place => {
        this.place = place;
      });
      this.form = new FormGroup({
        title: new FormControl(this.place.title, {
          validators: [Validators.required]
        }),
        description: new FormControl(this.place.description, {
          validators: [Validators.required, Validators.maxLength(180)]
        }),
      });
    });
  }

  onEditOffer() {
    this.loadingCtrl
      .create({ message: 'Updating...' })
      .then(loadingEl => {
        loadingEl.present();
        this.placeService.updatePlace(
          this.place.id,
          this.form.value.title,
          this.form.value.description,
          this.place.placeLocation
        ).subscribe(() => {
          loadingEl.dismiss();
          this.navCtrl.navigateBack('/places/tabs/offers');
        });
      });

  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}

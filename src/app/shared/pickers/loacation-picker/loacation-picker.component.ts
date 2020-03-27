import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapModalComponent } from '../../map-modal/map-modal.component';
import { PlaceLocation } from 'src/app/places/place-location.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loacation-picker',
  templateUrl: './loacation-picker.component.html',
  styleUrls: ['./loacation-picker.component.scss'],
})
export class LoacationPickerComponent implements OnInit {

  @Output() locationPick: EventEmitter<PlaceLocation> = new EventEmitter<PlaceLocation>();
  slectedLocationImage: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  onPickLocation() {
    this.modalCtrl
      .create({ component: MapModalComponent })
      .then(modalEl => {
        modalEl.onDidDismiss().then(modalData => {
          if (!modalData.data) {
            return;
          }
          const pickedLocation: PlaceLocation = {
            lng: modalData.data.lng,
            lat: modalData.data.lat,
            address: null,
            staticImageUrl: null
          };
          this.slectedLocationImage = this.getMapImgSrc(pickedLocation.lng, pickedLocation.lat, 13);
          pickedLocation.staticImageUrl = this.slectedLocationImage;
          this.locationPick.emit(pickedLocation);
        });
        modalEl.present();
      });
  }

  private getMapImgSrc(lng: number, lat: number, zoom: number): string {
    return `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${lng},${lat},${zoom}/500x300?access_token=${environment.mapboxAccessToken}`;
  }
}

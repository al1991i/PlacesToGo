import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LngLat, Map } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit {

  map: mapboxgl.Map;
  private style = 'mapbox://styles/mapbox/outdoors-v9';

  constructor(private modalCtrl: ModalController) {
    mapboxgl.accessToken = environment.mapboxAccessToken;
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13
    });

    this.map.on('click', e => {
      const selectedCoords = {
        lng: e.lngLat.lng,
        lat: e.lngLat.lat
      };
      this.modalCtrl.dismiss(selectedCoords);
    });
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }
}

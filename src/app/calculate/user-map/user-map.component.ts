import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.scss']
})
export class UserMapComponent implements OnInit {

  // Default/Starting coordinates on Google Maps.
  lat: number = -37.7027525;
  lng: number = 145.0294733;

  // Initialising Google Maps mapTypeId.
  mapTypeId: string = "roadmap";

  // Maps gesture type.
  // gestureType: string = 'greedy';
  gestureType: string = 'auto';

  constructor() { }

  ngOnInit() {
  }

  onRoadMapViewClicked(bool: boolean) {
    this.mapTypeId = "roadmap";
    console.log('Received event in user-map: roadmap');
  }

  onSatelliteViewClicked(bool: boolean) {
    this.mapTypeId = "satellite";
    console.log('Received event in user-map: satellite');
  }

  onShowOnMapClicked(coordinates: {lat: number, lng: number}) {
    this.lat = coordinates.lat;
    this.lng = coordinates.lng;
  }

  getCoordinates(coordinates: {coords: {lat: number, lng: number}}) {
    /**
     * Get Google Maps latitutde/longitude coordinates from mouse click
     * event on the map.
     * Change marker location to new coordinates from mouse click event.
     * Change map center to new coordinates from mouse click event.
     */
    console.log('Map clicked');
    console.log(coordinates.coords.lat);
    console.log(coordinates.coords.lng);
    this.lat = coordinates.coords.lat;
    this.lng = coordinates.coords.lng;
  }

}

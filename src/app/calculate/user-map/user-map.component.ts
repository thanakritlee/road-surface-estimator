import { Component, OnInit } from '@angular/core';
import { MapTypeStyle } from '@agm/core';

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
  mapTypeIdBool: boolean = false;

  // Maps gesture type.
  // gestureType: string = 'greedy';
  gestureType: string = 'auto';


  // Style variables for AGM Angular Google Maps styles @agm/core input.
  styleDefaultBool: boolean = true;
  style: MapTypeStyle[] = [];
  styleRoad: MapTypeStyle[] = 
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ];

  constructor() { }

  ngOnInit() {
  }

  onMapViewClicked(bool: boolean) {
    /**
     * Change between map view type of road map view and satellite view.
     */
    this.mapTypeId = this.mapTypeIdBool ? "roadmap" : "satellite";
    this.mapTypeIdBool = !this.mapTypeIdBool;
  }
  
  onChangeStyleClicked(bool: boolean) {
    /**
     * Change the style of the map from normal defualt style to a style
     * in which only roads are shown in dark colour and everything else is
     * of light colour with no labels.
     */
    this.style = this.styleDefaultBool ? this.styleRoad : [];
    this.styleDefaultBool = !this.styleDefaultBool;
  }

  onShowOnMapClicked(coordinates: {lat: number, lng: number}) {
    /**
     * Change the current marker coordinates to user form input coordinates.
     * 
     * Take the user form inputs of latitude and longitude coordinates
     * and assign it to the marker coordinates.
     */
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
    this.lat = coordinates.coords.lat;
    this.lng = coordinates.coords.lng;
  }

  makerDragEnd($event: any) {
    /**
     * When user finished dragging a marker on the map this method is called
     * with $event being a mouse event.
     * 
     * Get the coordinates of the mouse event location on the map and assign it
     * to the current marker coordinates so that the marker new coordinates is
     * where the mouse is when it stop dragging the marker.
     */
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

}

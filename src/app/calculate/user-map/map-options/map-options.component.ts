import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { AreaCalculationService } from '../../../app-services/area-calculation/area-calculation.service';

@Component({
  selector: 'app-map-options',
  templateUrl: './map-options.component.html',
  styleUrls: ['./map-options.component.scss']
})
export class MapOptionsComponent implements OnInit {

  // Using Output decorator to emit the event from this component to parent component.
  @Output() mapViewClicked = new EventEmitter < boolean > ();
  @Output() showOnMapClicked = new EventEmitter < {lat: number, lng: number} > ();
  @Output() changeStyleClicked = new EventEmitter < boolean > ();
  
  // boolean for displaying or hidding the coordinate input options.
  useCoordinates: boolean = false;

  coordinatesButtonText: string = "Use Coordinates";

  longitudeInput: number;
  latitudeInput: number;

  totalSurfaceArea: number;
  elapsedTime: number;

  calculated: boolean = false;

  // Map change view button text.
  // "Road View" or "Satellite View".
  mapViewButtonText: string = "Satellite View";
  mapViewButtonTextBool: boolean = false;

  // Map change style button text.
  styleButtonTextBool: boolean = false;
  styleButtonText: string = "Road Only";
  
  // Using Input decorator to get data pass from parent component when
  // this when component selector is called.
  @Input() latitudeMarker: number;
  @Input() longitudeMarker: number;

  constructor(
    private areaCalculationService: AreaCalculationService
  ) {}

  ngOnInit() {}

  onClickMapView() {
    /**
     * Change Google Maps type to roadmap or satellite view.
     * 
     * Emits a boolean true to indicate button activation and
     * let the parent component who recieve the emitted event
     * decide if roadmap or satellite view change.
     */
    this.mapViewButtonText = this.mapViewButtonTextBool ? "Satellite View" : "Road View";
    this.mapViewButtonTextBool = !this.mapViewButtonTextBool;
    this.mapViewClicked.emit(true);
  }
  
  onClickChangeStyle() {
    /**
     * Change the style of the map from default style to show only the roads.
     */
    this.changeStyleClicked.emit(true);

    // Change the button's text;
    this.styleButtonText = this.styleButtonTextBool ? "Road Only" : "Default Style";
    this.styleButtonTextBool = !this.styleButtonTextBool;
  }

  onClickCalculate() {
    /**
     * Check what coordinates input method to use for the calculation.
     * Call a sub method that takes the coordinates and use it for
     * calculation.
     */
    this.calculated = false;
    if (this.useCoordinates) {
      this.onClickShowOnMap();
      this.calculateSurfaceArea(this.latitudeInput, this.longitudeInput);
    } else {
      this.calculateSurfaceArea(this.latitudeMarker, this.longitudeMarker);
    }
  }

  calculateSurfaceArea(lat: number, lng: number) {
    /**
     * Calls the calculation service which post the lat and lng data to the
     * Express server API and get a return response of elapsed time and the
     * surface area result.
     */
    this.areaCalculationService.getTotalSurfaceArea(lat, lng).subscribe(
      res => {
        // Round the total surface area result to 5 decimal precision point.
        // Convert it back to number.
        this.totalSurfaceArea = Number(Number.parseFloat("" + res.area).toPrecision(5));
        this.elapsedTime = Number(Number.parseFloat("" + (res.time / 1000)).toPrecision(5));
        this.calculated = true;
      },
    );
  }

  onClickUseCoordinates() {
    /**
     * Change "calculation" buttton visibility.
     * Change button text.
     */
    this.useCoordinates = !this.useCoordinates;
    this.coordinatesButtonText = this.useCoordinates ? "Use Map Marker" : "Use Coordinates";
  }

  onClickClearCoordinates() {
    /**
     * Clear the form input field.
     */
    this.latitudeInput = undefined;
    this.longitudeInput = undefined;
  }

  onClickShowOnMap() {
    /**
     * Emit the latitudeInput and longitudeInput data to the parent component, eg. app-user-map.
     */
    this.showOnMapClicked.emit({lat: this.latitudeInput, lng: this.longitudeInput});
  }
}

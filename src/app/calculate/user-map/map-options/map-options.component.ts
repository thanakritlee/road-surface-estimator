import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { AreaCalculationService } from '../../../app-services/area-calculation/area-calculation.service';

@Component({
  selector: 'app-map-options',
  templateUrl: './map-options.component.html',
  styleUrls: ['./map-options.component.scss']
})
export class MapOptionsComponent implements OnInit {

  @Output() roadMapViewClicked = new EventEmitter < boolean > ();
  @Output() satelliteViewClicked = new EventEmitter < boolean > ();

  // boolean for displaying or hidding the coordinate input options.
  useCoordinates: boolean = false;

  coordinatesButtonText: string = "Use Coordinates";

  longitudeInput: number;
  latitudeInput: number;

  totalSurfaceArea: number;
  
  @Input() latitudeMarker: number;
  @Input() longitudeMarker: number;

  constructor(
    private areaCalculationService: AreaCalculationService
  ) {}

  ngOnInit() {}

  onClickRoadMapView() {
    /**
     * Change Google Maps type to roadmap view.
     * 
     * Emits the roadmap event.
     */
    this.roadMapViewClicked.emit(true);
    console.log('Event Emit from map-option: roadmap');
  }

  onClickSatelliteView() {
    /**
     * Change Google Maps type to sattelite view.
     * 
     * Emits the satellite event.
     */
    this.satelliteViewClicked.emit(true);
    console.log('Event Emit from map-option: satellite');
  }

  onClickCalculate() {
    if (this.useCoordinates) {
      console.log(this.latitudeInput);
      console.log(this.longitudeInput);
      this.calculateSurfaceArea(this.latitudeInput, this.longitudeInput);
    } else {
      console.log(this.latitudeMarker);
      console.log(this.longitudeMarker);
      this.calculateSurfaceArea(this.latitudeMarker, this.longitudeMarker);
    }
  }

  calculateSurfaceArea(lat: number, lng: number) {
    this.areaCalculationService.getTotalSurfaceArea(lat, lng).subscribe(
      res => {
        this.totalSurfaceArea = res;
        console.log(this.totalSurfaceArea);
      },
    );
  }

  onClickUseCoordinates() {
    this.useCoordinates = !this.useCoordinates;
    this.coordinatesButtonText = this.useCoordinates ? "Use Map Marker" : "Use Coordinates";
  }

  onClickClearCoordinates() {
    console.log('Clear coordinates');
    this.latitudeInput = undefined;
    this.longitudeInput = undefined;
  }

  onClickShowOnMap() {
    /**
     * Emit the latitudeInput and longitudeInput data to the parent component, eg. app-user-map.
     */
    console.log('Show on map');
  }
}

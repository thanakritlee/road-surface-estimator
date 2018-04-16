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

  coordinatesButtonText: string = "Use Coordinates instead";

  longitudeInput: number;
  latitudeInput: number;
  
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
    console.log('Calculate Area...');
    if (this.useCoordinates) {
      console.log(this.latitudeInput);
      console.log(this.longitudeInput);
    } else {
      console.log(this.latitudeMarker);
      console.log(this.longitudeMarker);

      this.areaCalculationService.getConnectionToServer().subscribe(
        res => {
          console.log('inside subscribe');
          console.log(res.text);
        },
      );
      console.log('after http.get');

    }
  }

  onClickUseCoordinates() {
    this.useCoordinates = !this.useCoordinates;
    this.coordinatesButtonText = this.useCoordinates ? "Use Map Marker instead" : "Use Coordinates instead";
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

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';


@Injectable()
export class AreaCalculationService {

  constructor(
    private http: Http
  ) { }

  /**
   * Comment one of server api below out.
   * 
   * Uncomment development serverApi when working on the project in the 
   * development phase.
   * 
   * Uncomment production serverApi when deploying the project on a hosting 
   * service.
   */

  // ======================================================================
  // ======================================================================
  // develop server api:
  // private serverApi = 'http://localhost:8080/api/area_calculation/';
  
  // production server api:
  private serverApi = 'api/area_calculation/';
  // ======================================================================
  // ======================================================================

  public getConnectionToServer(): Observable<{text: string}> {
    /**
     * This method was use for testing the Express API server.
     */
    let URI = this.serverApi;
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <{text: string}>res);
  }

  public getTotalSurfaceArea(lat: number, lng: number): Observable<{area: number, time: number}> {
    /**
     * This method calls RESTful POST on the Express server API.
     * This method is use to get the total surface area of road in a 1 square kilometre area.
     * This method also return an elapsed time it took to calculate the surface area.
     * 
     * @returns {area: number, time: number}
     * where area is the surface area of road,
     * and time is the elapsed time taken to do the calculation.
     */
    let URI = this.serverApi;
    let data = {lat, lng};
    return this.http.post(URI, data)
      .map(res => res.json())
      .map(res => <{area: number, time: number}>res);
  }

}

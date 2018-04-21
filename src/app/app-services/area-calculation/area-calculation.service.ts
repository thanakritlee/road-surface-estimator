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
    let URI = this.serverApi;
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <{text: string}>res);
  }

  public getTotalSurfaceArea(lat: number, lng: number): Observable<number> {
    let URI = this.serverApi;
    let data = {lat, lng};
    return this.http.post(URI, data)
      .map(res => res.json())
      .map(res => <number>res);
  }

}

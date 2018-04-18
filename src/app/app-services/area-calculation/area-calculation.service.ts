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
   * Uncomment developmentServerApi when working on the project in the 
   * development phase.
   * 
   * Uncomment deploymentServerApi when deploying the project on a hosting 
   * service.
   */
  // private developmentServerApi = 'http://localhost:8080/api/area_calculation/';
  private deploymentServerApi = 'api/area_calculation/';

  public getConnectionToServer(): Observable<{text: string}> {
    let URI = this.developmentServerApi;
    return this.http.get(URI)
      .map(res => res.json())
      .map(res => <{text: string}>res);
  }

  public getTotalSurfaceArea(lat: number, lng: number): Observable<number> {
    let URI = this.developmentServerApi;
    let data = {lat, lng};
    return this.http.post(URI, data)
      .map(res => res.json())
      .map(res => <number>res);
  }

}

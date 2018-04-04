import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-map',
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.scss']
})
export class UserMapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  lat: number = 51.678418;
  lng: number = 7.809007;

}

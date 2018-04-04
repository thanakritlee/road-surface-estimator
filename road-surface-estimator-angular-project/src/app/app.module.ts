import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { UserMapComponent } from './user-map/user-map.component';
import { ServerMapComponent } from './server-map/server-map.component';
import { MapOptionsComponent } from './user-map/map-options/map-options.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    UserMapComponent,
    ServerMapComponent,
    MapOptionsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

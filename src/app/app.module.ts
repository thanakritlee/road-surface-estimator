import { BrowserModule } from '@angular/platform-browser';
// NO_ERRORS_SCHEMA tells the compiler to not error based on unknown elements
// , which are used bu MdBootstrap.
import { NgModule, NO_ERRORS_SCHEMA, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';

// Angular components
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ServerMapComponent } from './calculate/server-map/server-map.component';
import { UserMapComponent } from './calculate/user-map/user-map.component';
import { MapOptionsComponent } from './calculate/user-map/map-options/map-options.component';
import { HomeComponent } from './home/home.component';
import { CalculateComponent } from './calculate/calculate.component';
import { ToolsComponent } from './tools/tools.component';
import { ReferencesComponent } from './references/references.component';
import { AboutComponent } from './about/about.component';

// Routing module
import { AppRoutingModule } from './app-routing/app-routing.module';

// Services
import { AreaCalculationService } from './app-services/area-calculation/area-calculation.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ServerMapComponent,
    UserMapComponent,
    MapOptionsComponent,
    HomeComponent,
    CalculateComponent,
    ToolsComponent,
    ReferencesComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD5blFhmJvoOhORIYKX0JjKo5V8Vhbpq2s'
    }),
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    /**
     * Adding a service to the providers array of the root module makes it
     * available throughout the app.
     */
    AreaCalculationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

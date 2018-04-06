import { BrowserModule } from '@angular/platform-browser';
// NO_ERRORS_SCHEMA tells the compiler to not error based on unknown elements
// , which are used bu MdBootstrap.
import { NgModule, NO_ERRORS_SCHEMA, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ServerMapComponent } from './server-map/server-map.component';
import { UserMapComponent } from './user-map/user-map.component';
import { MapOptionsComponent } from './user-map/map-options/map-options.component';
import { HomeComponent } from './home/home.component';
import { CalculateComponent } from './calculate/calculate.component';
import { ToolsComponent } from './tools/tools.component';
import { ReferencesComponent } from './references/references.component';
import { AboutComponent } from './about/about.component';


// Application URL routes.
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calculate', component: CalculateComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'references', component: ReferencesComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


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
    RouterModule.forRoot(appRoutes)
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

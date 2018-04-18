import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


// Angular components
import { AppComponent } from '../app.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { ServerMapComponent } from '../calculate/server-map/server-map.component';
import { UserMapComponent } from '../calculate/user-map/user-map.component';
import { MapOptionsComponent } from '../calculate/user-map/map-options/map-options.component';
import { HomeComponent } from '../home/home.component';
import { CalculateComponent } from '../calculate/calculate.component';
import { ToolsComponent } from '../tools/tools.component';
import { ReferencesComponent } from '../references/references.component';
import { AboutComponent } from '../about/about.component';

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
    imports: [
        CommonModule,
        /**
         * Initialise the router and start it, listening for browser location
         * changes.
         * 
         * The method is called forRoot() because you configure the router at
         * the application's root level. The forRoot() method supplies the
         * service providers and directives needed for routing, and performs
         * the initial navigation based on the current browser URL.
         */
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [],
    exports: [
        /***
         * Exporting RouterModule makes router directives available for use in
         * the AppModule components that will need them.
         */
        RouterModule
    ]
})
export class AppRoutingModule { }
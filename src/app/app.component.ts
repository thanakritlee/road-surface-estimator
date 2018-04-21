import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'app';
  calculated: boolean = false;

  version: string = "1.3.0";

  onActivate(event) {
    /**
     * When a router-outlet is activated, meaning that a link is clicked to another
     * compent through the Angular router, this method is executed.
     * 
     * This method scroll the window back up to the top of the page screen.
     * It is use specifically for when user click a router link at the bottom of the
     * page in the footer bar.
     */
    window.scroll(0,0);
  }
}

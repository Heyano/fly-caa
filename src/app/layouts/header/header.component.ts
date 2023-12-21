import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  currentUrl: string = "";
  constructor(private router: Router) {

    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url;
        console.log("donne", this.currentUrl);
        window.scrollTo(0, 0);
        this.currentUrl = this.router.url.toString().toLowerCase();
      }
    });
  }
  goHoraire() {
    this.router.navigateByUrl("/app").then();
  }

  goFlight() {
    this.router.navigateByUrl("/app/flight").then();
  }
}

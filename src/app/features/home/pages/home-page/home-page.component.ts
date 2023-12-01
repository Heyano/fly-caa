import {Component, OnInit} from '@angular/core';
import {API_FLIGHT_ROOT} from "../../../../core/routes/backend.root";
import {QueryResultsModel} from "../../../../core/models/query-result.model";
import {MainService} from "../../../../core/services/main.service";
import {FlightModel} from "../../../../core/models/flight.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  flights: FlightModel[] = [];
  flightsGrouped: any[] = []
  loaded: boolean = false;
  constructor(private mainService: MainService) {
  }
  ngOnInit() {
    this.getFlight()
  }

  getFlight(): void {
    let params: any = {};

    this.mainService.getAll(params, API_FLIGHT_ROOT+'/web').subscribe({
      next: (res: QueryResultsModel) => {
        if (res.success) {
            this.flightsGrouped = res.data;
        }
      },
    });
  }

  getDayEnglish(label: string): string {
    let day =""
    switch (label) {
      case "Lundi" : day = "Monday"; break;
      case "Mardi" : day = "Tuesday"; break;
      case "Mercredi" : day = "Wednesday"; break;
      case "Jeudi" : day = "Thursday"; break;
      case "Vendredi" : day = "Friday"; break;
      case "Samedi" : day = "Saturday"; break;
      case "Dimanche" : day = "Sunday"; break;
    }
    return day
  }
}

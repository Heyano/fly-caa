import { Component, OnInit } from '@angular/core';
import { CityModel } from 'src/app/core/models/city.model';
import { DayModel } from 'src/app/core/models/day.model';
import { FlightModel } from 'src/app/core/models/flight.model';
import { QueryResultsModel } from 'src/app/core/models/query-result.model';
import {
  API_CITY_ROOT,
  API_DAY_ROOT,
  API_FLIGHT_ROOT,
} from 'src/app/core/routes/backend.root';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cities: CityModel[] = [];
  days: DayModel[] = [];
  flights: FlightModel[] = [];
  params: any = {};
  departure: string = '0';
  arrival: string = '0';
  day: string = '0';
  date: string = '0';
  typeAirplane: string = '';
  constructor(private mainService: MainService) {}
  ngOnInit(): void {
    this.params['status[ne]'] = 'Deleted';
    this.getCities();
    this.getDays();
    this.getFligh();
  }
  getCities() {
    this.mainService.getAll(this.params, API_CITY_ROOT).subscribe({
      next: (res: QueryResultsModel) => {
        if (res.success) {
          this.cities = res.data;
        }
      },
    });
  }
  getDays() {
    this.mainService.getAll(this.params, API_DAY_ROOT).subscribe({
      next: (res: QueryResultsModel) => {
        if (res.success) {
          this.days = res.data;
        }
      },
    });
  }

  getFligh() {
    this.mainService.getAll(this.params, API_FLIGHT_ROOT).subscribe({
      next: (res: QueryResultsModel) => {
        if (res.success) {
          this.flights = res.data;
        }
      },
    });
  }

  //search tender
  search(): void {
    this.params['status[ne]'] = 'Deleted';
    if (this.departure && this.departure != '0') {
      this.params.departure = this.departure;
    }
    if (this.arrival && this.arrival != '0') {
      this.params.arrival = this.arrival;
    }
    if (this.day && this.day != '0') {
      this.params.day = this.day;
    }
    if (this.typeAirplane && this.typeAirplane != '0') {
      this.params.typeAirplane = this.typeAirplane;
    }
    if (this.date && this.date != '0') {
      this.params.date = this.date;
    }

    if (
      this.arrival == '0' &&
      this.departure == '0' &&
      this.day == '0' &&
      this.typeAirplane == '0' &&
      this.date == '0'
    ) {
      delete this.params.typeAirplane;
      delete this.params.day;
      delete this.params.arrival;
      delete this.params.departure;
      delete this.params.date;
    }

    this.getFligh();
  }
}

import { Component, OnInit } from '@angular/core';
import { CityModel } from 'src/app/core/models/city.model';
import { DayModel } from 'src/app/core/models/day.model';
import { FlightModel } from 'src/app/core/models/flight.model';
import { QueryResultsModel } from 'src/app/core/models/query-result.model';
import {
  API_AIRCRAFT_TYPE_ROOT,
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
  dates: Date[] | undefined;
  days: DayModel[] = [];
  flights: FlightModel[] = [];
  typeAircrafts: any[] = [];
  params: any = {};
  typeAircraft: string = '';
  departure: string = '0';
  arrival: string = '0';
  day: string = '0';
  date: string = '0';
  cityDeparture: string = '';
  typeAirplane: string = '';
  loaded: boolean = false;
  constructor(private mainService: MainService) {}
  ngOnInit(): void {
    this.params['status[ne]'] = 'Deleted';
    this.getCities();
    this.getDays();
    this.getFligh();
    this.getTypeAircraft();
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
  getTypeAircraft() {
    this.mainService.getAll(this.params, API_AIRCRAFT_TYPE_ROOT).subscribe({
      next: (res: QueryResultsModel) => {
        if (res.success) {
          this.typeAircrafts = res.data;
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
          this.loaded = true;
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

    if (this.typeAirplane && this.typeAirplane != '0') {
      this.params.typeAirplane = this.typeAirplane;
    }
    if (this.date && this.date != '0') {
      this.params.date = this.date;
    }

    if (this.arrival == '0') delete this.params.arrival;
    if (this.departure == '0') delete this.params.departure;
    if (this.typeAirplane == '0') delete this.params.typeAirplane;
    if (this.date == '0') delete this.params.date;

    this.getFligh();
  }

  getDay(): string {
    const day = this.days.find((el) => (el._id = this.day));
    if (day) return day.label;
    return '';
  }
}

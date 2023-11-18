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
  departure: any;
  arrival: string = '0';
  day: string = '0';
  date: any[] = [];
  cityDeparture: string = '';
  typeAirplane: string = '';
  loaded: boolean = false;
  flightsGrouped: any[] = [];
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
          const flights = res.data;
          this.flightsGrouped = [];

          /*
           [

            {
              label : "20-06-2023",
              filghts : []
            }
           ]

          */

          for (let date of this.date) {
            let dateSelected = new Date(date);
            flights.forEach((el) => {
              let dateFlight = new Date(el.date);

              if (
                dateFlight.getFullYear() == dateSelected.getFullYear() &&
                dateFlight.getMonth() == dateSelected.getMonth() &&
                dateFlight.getDate() == dateSelected.getDate()
              ) {
                const dateFull =
                  dateSelected.getDate() +
                  '-' +
                  dateSelected.getMonth() +
                  '-' +
                  dateSelected.getFullYear();

                console.log('dateFull:', dateFull);

                const flightsGrouped = this.flightsGrouped.some(
                  (ob) => ob.label == dateFull
                );
                console.log('flightsGrouped:', flightsGrouped);
                if (flightsGrouped) {
                  const index = this.flightsGrouped.findIndex(
                    (i) => i.label == dateFull
                  );
                  if (index != 1) this.flightsGrouped[index].flights.push(el);
                } else {
                  let flightG: any = {};
                  flightG.label = dateFull;
                  flightG.flights = [el];
                  this.flightsGrouped.push(flightG);
                }
              }
            });
          }
          console.log(this.flightsGrouped);
          this.sortFlight();
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

    console.log('this.data', this.date);
    if (this.date) {
      this.params['date[in]'] = this.date;
    }
    if (this.arrival == '0') delete this.params.arrival;
    if (this.departure == '0') delete this.params.departure;
    if (this.typeAirplane == '0') delete this.params.typeAirplane;
    if (!this.date) delete this.params.date;
    this.getFligh();
  }

  getDay(): string {
    const day = this.days.find((el) => (el._id = this.day));
    if (day) return day.label;
    return '';
  }

  sortFlight() {
    const processing = (a: any, b: any): number => {
      const objectA = a.label.toString().split('-');
      const objectB = b.label.toString().split('-');
      console.log('objectA', objectA);
      console.log('objectB', objectB);

      const _dateA = objectA[2] + '-' + objectA[1] + '-' + objectA[0];
      const _dateB = objectB[2] + '-' + objectB[1] + '-' + objectB[0];
      console.log('_dateA', _dateA);
      console.log('_dateB', _dateB);
      const dateA = new Date(_dateA);
      const dateB = new Date(_dateB);
      console.log('dateA', dateA);
      console.log('dateB', dateB);

      if (dateA.getTime() < dateB.getTime()) return -1;
      if (dateA.getTime() > dateB.getTime()) return 1;

      return 0;
    };

    this.flightsGrouped.sort(processing);
  }
}

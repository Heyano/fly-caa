import { Component, Input } from '@angular/core';
import { FlightModel } from 'src/app/core/models/flight.model';

@Component({
  selector: 'app-home-flight-table',
  templateUrl: './home-flight-table.component.html',
  styleUrls: ['./home-flight-table.component.scss'],
})
export class HomeFlightTableComponent {
  @Input('flights') flights: FlightModel[] = [];

  getColspan(flights: any[], currentIndex: number): number {
    let count = 1;
    let i = currentIndex - 1;

    while (i >= 0 && flights[currentIndex].typeAirplane.aicraftType === flights[i].typeAirplane.aicraftType) {
      count++;
      i--;
    }

    return count;
  }

  getRowCount(flights: any[], currentIndex: number): number {
    let count = 1;
    let i = currentIndex + 1;
    console.log("lui", flights[currentIndex].typeAirplane.label)

    while (i < flights.length && flights[currentIndex].typeAirplane.label === flights[i].typeAirplane.label) {
      count++;
      i++;
    }
    console.log("count", count)

    return count;
  }
}

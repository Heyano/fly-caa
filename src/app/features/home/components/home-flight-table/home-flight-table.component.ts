import { Component, Input } from '@angular/core';
import { FlightModel } from 'src/app/core/models/flight.model';

@Component({
  selector: 'app-home-flight-table',
  templateUrl: './home-flight-table.component.html',
  styleUrls: ['./home-flight-table.component.scss'],
})
export class HomeFlightTableComponent {
  @Input('flights') flights: FlightModel[] = [];
}

import {Component,  OnInit} from '@angular/core';
import {MainService} from "../../../../core/services/main.service";

import {API_FLIGHT_ROOT, } from "../../../../core/routes/backend.root";
import {FlightModel} from "../../../../core/models/flight.model";

@Component({
  selector: 'app-flight-page',
  templateUrl: './flight-page.component.html',
  styleUrls: ['./flight-page.component.scss']
})
export class FlightPageComponent implements OnInit{

  flights : FlightModel[] = [];
  params: any ={};
  situationFlight: string = "J-J";
  constructor(private mainService: MainService) {
  }

  ngOnInit() {
    this.getFlights();
  }

  getFlights(){
    this.params["status[ne]"] = "Deleted";
    this.mainService.getAll(this.params, API_FLIGHT_ROOT).subscribe(
      {
        next:(res)=>{
          if(res.success){
            this.flights = res.data;
          }
        }
      }
    )
  }

  selectFilter() {
    if(this.situationFlight == "Tout") delete this.params.situationFlight;
    else this.params.situationFlight = this.situationFlight;
    this.getFlights();
  }
}

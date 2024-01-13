import {Component,  OnInit} from '@angular/core';
import {MainService} from "../../../../core/services/main.service";

import {API_FLIGHT_ROOT, API_TIMETABLE_ROOT, URL_API,} from "../../../../core/routes/backend.root";
import {FlightModel} from "../../../../core/models/flight.model";
import {QueryResultsModel} from "../../../../core/models/query-result.model";

@Component({
  selector: 'app-flight-page',
  templateUrl: './flight-page.component.html',
  styleUrls: ['./flight-page.component.scss']
})
export class FlightPageComponent implements OnInit{

  flights : FlightModel[] = [];
  params: any ={};
  situationFlight: string = "J-J";
  loading: boolean = false;
  constructor(private mainService: MainService) {
  }

  ngOnInit() {
    this.params.situationFlight = this.situationFlight;
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
    else this.params.situationFlight = this.situationFlight == 'J+1' ? 'J1' : this.situationFlight;
    this.getFlights();
  }


  async downloadMergedPdf() {
    //const images = await this.generateImages();
    this.loading = true;
    if(this.situationFlight == "Tout") delete this.params.situationFlight;
    else this.params.situationFlight = this.situationFlight == 'J+1' ? 'J1' : this.situationFlight;

    this.mainService.getAll(this.params, API_FLIGHT_ROOT+'/pdf').subscribe({
      next: (res: QueryResultsModel) => {
        if (res.success) {
          console.log("Line", res.data)
          const fileUrl = URL_API.baseUrlPdfs+ res.data;
          const fileName = 'status-vol.pdf';

          this.mainService.downloadFile(fileUrl, fileName);
          this.loading = false;
        }
      },
    });
  }


}

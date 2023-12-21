import {CityModel} from "./city.model";

export class FlightModel {
    flightNumber: string = "";
    aircraftType: any = {};
    departure: CityModel = new CityModel();
    arrival: CityModel = new CityModel();
    departureDate: string = "";
    arrivalDate: string = "";
    departureTime: string = "";
    arrivalTime: string = "";
    statutFlight: string = "";// au sol, à temps, retardé, retardé à j+1, décollé, attéri, annulé


    departureDateReal: any = "";
    arrivalDateReal: any = "";
    departureTimeReal: string = "";
    arrivalTimeReal: string = "";
    situationFlight: string = "";//j+1 , j-1 , j-j

}

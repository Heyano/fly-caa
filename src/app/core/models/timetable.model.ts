import { AircraftTypeModel } from './aircraft-type.model';
import { CityModel } from './city.model';
import { DayModel } from './day.model';
import { MainModel } from './maim.model';

export class TimetableModel extends MainModel {
  departure: CityModel = new CityModel();
  arrival: CityModel = new CityModel();
  departureTime: string = '';
  timeArrived: string = '';
  day: DayModel = new DayModel();
  date: string = '';
  blockTime: string = '';
  typeAirplane: AircraftTypeModel = new AircraftTypeModel();
  allotement: any;
  numberFlay: any;
}

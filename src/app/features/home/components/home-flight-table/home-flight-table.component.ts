import { Component, Input } from '@angular/core';
import { TimetableModel } from 'src/app/core/models/timetable.model';

@Component({
  selector: 'app-home-flight-table',
  templateUrl: './home-flight-table.component.html',
  styleUrls: ['./home-flight-table.component.scss'],
})
export class HomeFlightTableComponent {
  @Input('timetables') timetables: TimetableModel[] = [];

  getColspan(timetables: any[], currentIndex: number): number {
    let count = 1;
    let i = currentIndex - 1;

    while (i >= 0 && timetables[currentIndex].typeAirplane.aicraftType === timetables[i].typeAirplane.aicraftType) {
      count++;
      i--;
    }

    return count;
  }

  getRowCount(timetables: any[], currentIndex: number): number {
    let count = 1;
    let i = currentIndex + 1;
    console.log("lui", timetables[currentIndex].typeAirplane.label)

    while (i < timetables.length && timetables[currentIndex].typeAirplane.label === timetables[i].typeAirplane.label) {
      count++;
      i++;
    }
    console.log("count", count)

    return count;
  }
}

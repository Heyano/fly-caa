import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';
import {HomeFlightTableComponent} from './components/home-flight-table/home-flight-table.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {FlightPageComponent} from "./pages/flight-page/flight-page.component";
import {DropdownModule} from "primeng/dropdown";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'flight',
    component: FlightPageComponent,
  },
];

@NgModule({
  declarations: [HomeFlightTableComponent, HomePageComponent, FlightPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    CalendarModule,
    DropdownModule,
  ],
})
export class HomeModule {}

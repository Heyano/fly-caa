import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {API_TIMETABLE_ROOT, URL_API} from "../../../../core/routes/backend.root";
import {QueryResultsModel} from "../../../../core/models/query-result.model";
import {MainService} from "../../../../core/services/main.service";
import {TimetableModel} from "../../../../core/models/timetable.model";

import domToImage from 'dom-to-image';
//import jsPDF from 'jspdf';
import { jsPDF } from 'jspdf';
import moment from 'moment';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterContentInit {
 // @ViewChild('dataToExport1', { static: false }) public myElements: ElementRef | undefined;
  @ViewChildren('dataToExport1') myElements: QueryList<ElementRef>;

  timetables: TimetableModel[] = [];
  timetablesGrouped: any[] = []
  loaded: boolean = false;
  loading: boolean = false;
  pdfName: any;
  myPrinting : any[] = [];
  pdf : any = {};
  isCover: boolean = false;
  constructor(private mainService: MainService) {
  }
  ngOnInit() {
    this.getTimetable();
    this.pdf = new jsPDF('p', 'mm', 'a4');
    // const width = this.dataToExport.nativeElement.clientWidth;

  }

  ngAfterContentInit() {
    setTimeout(() => {
      console.log("change", this.myElements.toArray());
      this.myElements.toArray().forEach((element, index) => {
        // Faites quelque chose avec chaque élément
        console.log(`Element #${index + 1}:`, element.nativeElement);
      });
    }, 0);
  }

  getTimetable(): void {
    let params: any = {};

    this.mainService.getAll(params, API_TIMETABLE_ROOT+'/web').subscribe({
      next: (res: QueryResultsModel) => {
        if (res.success) {
            this.timetablesGrouped = res.data;
        }
      },
    });
  }

  getDayEnglish(label: string): string {
    let day =""
    switch (label) {
      case "Lundi" : day = "Monday"; break;
      case "Mardi" : day = "Tuesday"; break;
      case "Mercredi" : day = "Wednesday"; break;
      case "Jeudi" : day = "Thursday"; break;
      case "Vendredi" : day = "Friday"; break;
      case "Samedi" : day = "Saturday"; break;
      case "Dimanche" : day = "Sunday"; break;
    }
    return day
  }


  async downloadMergedPdf() {
    //const images = await this.generateImages();
    this.loading = true;
    let params: any = {};

    this.mainService.getAll(params, API_TIMETABLE_ROOT+'/pdf').subscribe({
      next: (res: QueryResultsModel) => {
        if (res.success) {
          console.log("Line", res.data)
          const fileUrl = URL_API.baseUrlPdfs+ 'pdf_fusionne.pdf';
          const fileName = 'horaire.pdf';

          this.mainService.downloadFile(fileUrl, fileName);
          this.loading = false;
        }
      },
    });
  }



}

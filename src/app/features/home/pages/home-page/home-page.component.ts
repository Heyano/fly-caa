import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { API_TIMETABLE_ROOT} from "../../../../core/routes/backend.root";
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
export class HomePageComponent implements OnInit{
  @ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef | undefined;
  timetables: TimetableModel[] = [];
  timetablesGrouped: any[] = []
  loaded: boolean = false;
  loading: boolean = false;
  pdfName: any;
  constructor(private mainService: MainService) {
  }
  ngOnInit() {
    this.getTimetable()
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

  importPdf() {
    this.loading = true;
    // width + 50, height + 220
    const pdf = new jsPDF('p', 'mm', 'a4');
   // const width = this.dataToExport.nativeElement.clientWidth;
    let width = this.dataToExport.nativeElement.clientWidth;
    let height = this.dataToExport.nativeElement.clientHeight + 40;


    width = width + 50;
     height = height + 220;
    const element: any = document.getElementById('dataToExport');

    html2canvas(element, {scale:5} ).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const imgWidth = 190; // largeur en millimètres (A4 portrait par défaut)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Ajouter l'image du tableau au PDF
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

      // Télécharger le PDF
      pdf.save('horaire-vol.pdf');
      this.loading = false;
    });

  }


  public downloadAsPdf(): void {
    const width = this.dataToExport.nativeElement.clientWidth;
    const height = this.dataToExport.nativeElement.clientHeight + 40;

    //width + 50, height + 220
    let orientation = '';
    let imageUnit = 'pt';
    if (width > height) {
      orientation = 'l';
    } else {
      orientation = 'p';
    }

    const element: any = document.getElementById('dataToExport');
    domToImage
      .toPng(element, {
        width: width,
        height: height
      })
      .then(result => {
        let jsPdfOptions = {
          orientation: orientation,
          unit: imageUnit,
          format: [width + 50, height + 220]
        };
        console.log("menage-1", jsPdfOptions)
       // const pdf = new jsPDF();
       // const pdf = new jsPDF(jsPdfOptions);
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFontSize(48);
        pdf.setTextColor('#2585fe');
        pdf.text(this.pdfName.value ? this.pdfName.value.toUpperCase() : 'Untitled dashboard'.toUpperCase(), 25, 75);
        pdf.setFontSize(24);
        pdf.setTextColor('#131523');
        pdf.text('Report date: ' + moment().format('ll'), 25, 115);
        pdf.addImage(result, 'PNG', 25, 185, width, height);
        console.log("menage-1", jsPdfOptions)
        pdf.save('exported-document.pdf');
      })
      .catch(error => {
      });
  }
}

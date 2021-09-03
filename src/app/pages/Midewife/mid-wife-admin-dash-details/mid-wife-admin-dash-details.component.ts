import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mid-wife-admin-dash-details',
  templateUrl: './mid-wife-admin-dash-details.component.html',
  styleUrls: ['./mid-wife-admin-dash-details.component.css']
})
export class MidWifeAdminDashDetailsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public midwifeid: any;
  public languageid: any;
  public id: any;
  public startdate: any;
  public labels: any;
  public enddate: any;
  public appointmentreportlist: any;
  public count: any;
  public term: any;

  ngOnInit() {

    this.activatedroute.params.subscribe(params => {
     

      this.id = params['id']
    }
    )

    this.midwifeid = localStorage.getItem('midwifeid');
    this.languageid = localStorage.getItem('LanguageID');

this.getlanguage()
    this.startdate = localStorage.getItem('startdate');
    this.enddate = localStorage.getItem('enddate');
    this.GetAppointmentReportsList();
  }


  public getlanguage() {
    this.docservice.GetAdmin_PhysiotherapistLoginsAppointmentsReportworkingDetails_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }





  public GetAppointmentReportsList() {
   
    this.docservice.GetBook_Book_Midwives_AppointmentReports(this.midwifeid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       
        if (this.id == 1) {
          this.appointmentreportlist = data;
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 2) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.isVisited == 0 && x.accepted == 0 && x.midwivesCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 3) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.isVisited == 0 && x.accepted == 1 && x.midwivesCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }

        if (this.id == 4) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.isVisited == 1 && x.accepted == 1 && x.midwivesCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 5) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.midwivesCancelled == 1 || x.cancelled == 1);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 6) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.notVisited == 1);
          this.count = this.appointmentreportlist.length;
        }
        if (this.id == 7) {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.isVisited == 1 && x.accepted == 1 && x.midwivesCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
      }, error => {
      }
    )
  }

  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('MidWife'));
    this.exportAsExcelFile(hhh, "MidWife Reports");
  }

  public tableToJson(table) {
   
    var data = []; // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};
      for (var j = 0; j < tableRow.cells.length - 1; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      } data.push(rowData);
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
   
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}

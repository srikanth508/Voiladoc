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
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-physio-dashboard-details',
  templateUrl: './physio-dashboard-details.component.html',
  styleUrls: ['./physio-dashboard-details.component.css']
})
export class PhysioDashboardDetailsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public id: any;
  public languageid: any;
  public physioid: any;
  public startdate: any;
  public enddate: any;
  public appointmentreportlist: any;
  public count: any;
  public labels:any;
  public term:any;
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
     
      this.id = params['id'];
    }
    )
    this.languageid = localStorage.getItem('LanguageID');
    this.physioid = localStorage.getItem('physioid');
    this.startdate = localStorage.getItem('startdate');
    this.enddate = localStorage.getItem('enddate');
    this.GetAppointmentReportsList();
    this.getlanguage();
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
   
    this.docservice.GetBook_Physio_AppointmentReports(this.physioid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       
        if(this.id==1)
        {
          this.appointmentreportlist = data;
          this.count = this.appointmentreportlist.length;
        }
        if(this.id==2)
        {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.isVisited == 0 && x.accepted == 0 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
        if(this.id==3)
        {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.isVisited == 0 && x.accepted == 1 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
 
        if(this.id==4)
        {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.isVisited == 1 && x.accepted == 1 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
        if(this.id==5)
        {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.physioCancelled == 1 || x.cancelled == 1);
          this.count = this.appointmentreportlist.length;
        }
        if(this.id==6)
        {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.notVisited == 1);
          this.count = this.appointmentreportlist.length;
        }
        if(this.id==7)
        {
          this.appointmentreportlist = data;
          this.appointmentreportlist = this.appointmentreportlist.filter(x => x.isVisited == 1 && x.accepted == 1 && x.physioCancelled == 0 && x.notVisited == 0 && x.cancelled == 0);
          this.count = this.appointmentreportlist.length;
        }
      }, error => {
      }
    )
  }
  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Physiotherapist'));
    this.exportAsExcelFile(hhh, "Physiotherapist Reports");
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

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-total-hospital-apointments',
  templateUrl: './total-hospital-apointments.component.html',
  styleUrls: ['./total-hospital-apointments.component.css']
})
export class TotalHospitalApointmentsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }


  public id: any;
  public sdate: any;
  public edate: any;
  public languageid: any;
  public labels: any;
  public hospitalid: any;
  public cancelledlist: any;
  public dummlist: any;
  public count: any;
  public term: any;
  public departmentlist: any;
  TotalAmount: any
  options: any
  ID: any;
  Revenuelist: any;
  dummRevenuelist: any;
  grandtotal: any;
  filterdummrevenuelist; any;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.activatedroute.params.subscribe(params => {

      this.ID = params["id"];
      this.hospitalid = localStorage.getItem('hospitalid');
      this.startdate = localStorage.getItem("StartDate");
      this.enddate = localStorage.getItem("EndDate");

      if (this.ID == 1) {
        this.docservice.GetHospitalAppointmentDetails(this.hospitalid, this.startdate, this.enddate).subscribe(
          data => {

            this.filterdummrevenuelist = data;
            this.Revenuelist = this.filterdummrevenuelist.filter(x => x.isVisited == 1)
            this.count = this.Revenuelist.length;
            // this.grandtotal=0
            this.grandtotal = this.Revenuelist.map(a => a.paidAmount).reduce(function (a, b) {
              return a + b;
            });

          }, error => {
          }
        )
      }
      if (this.ID == 2) {
        this.docservice.GetHospitalAppointmentDetails(this.hospitalid, this.startdate, this.enddate).subscribe(
          data => {

            this.Revenuelist = data;
            this.filterdummrevenuelist = data;
            this.count = this.Revenuelist.length;
          }, error => {
          }
        )
      }

      if (this.ID == 3) {
        this.docservice.GetHospitalAppointmentDetails(this.hospitalid, this.startdate, this.enddate).subscribe(
          data => {

            this.dummRevenuelist = data;

            this.Revenuelist = this.dummRevenuelist.filter(x => x.appointmentTypeID == 5)
            this.count = this.Revenuelist.length;
          }, error => {
          }
        )
      }
      if (this.ID == 4) {
        this.docservice.GetHospitalAppointmentDetails(this.hospitalid, this.startdate, this.enddate).subscribe(
          data => {

            this.dummRevenuelist = data;

            this.Revenuelist = this.dummRevenuelist.filter(x => x.appointmentTypeID == 5)
            this.count = this.Revenuelist.length;
          }, error => {
          }
        )
      }
    });
  }


  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginArticleAppointmentReport_Lable(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  startdate: any
  enddate: any
  value: any


  selectedDate(data) {
    
    
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    // var sdate = data.split('-')
    // this.startdate = sdate[0];
    // this.enddate = sdate[1];
    this.docservice.GetHospitalAppointmentDetails(this.hospitalid, this.startdate, this.enddate).subscribe(
      data => {

        this.filterdummrevenuelist = data;
        this.Revenuelist = this.Revenuelist;
        this.count = this.Revenuelist.length;
        // this.grandtotal=0
        this.grandtotal = this.Revenuelist.map(a => a.paidAmount).reduce(function (a, b) {
          return a + b;
        });

      }, error => {
      }
    )
  }



  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Appointment'));
    this.exportAsExcelFile(hhh, "Appointment Reports");
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


  appointmenttypeid: any;
  public GetAppointmentType(even) {

    this.appointmenttypeid = even.target.value;
    if (even.target.value != 0) {
      this.Revenuelist = this.filterdummrevenuelist.filter(x => x.appointmentTypeID == this.appointmenttypeid)
      this.count = this.Revenuelist.length;

      // this.grandtotal=0
      this.grandtotal = this.Revenuelist.map(a => a.paidAmount).reduce(function (a, b) {
        return a + b;
      });
    }
    else {
      this.docservice.GetHospitalAppointmentDetails(this.hospitalid, this.startdate, this.enddate).subscribe(
        data => {

          this.Revenuelist = data;
          this.filterdummrevenuelist = data;
          this.count = this.Revenuelist.length;


          // this.grandtotal=0
          this.grandtotal = this.Revenuelist.map(a => a.paidAmount).reduce(function (a, b) {
            return a + b;
          });

        }, error => {
        }
      )
    }
  }
}

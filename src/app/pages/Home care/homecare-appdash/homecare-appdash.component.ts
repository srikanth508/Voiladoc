import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-homecare-appdash',
  templateUrl: './homecare-appdash.component.html',
  styleUrls: ['./homecare-appdash.component.css']
})
export class HomecareAppdashComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }


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

  value: any;
  SDate = new Date();
  EDate = new Date();
  public todaydate: any;
  public CurrentTime: any;
  public reasonforcancel: any;

  ngOnInit() {
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 10);
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    this.CurrentTime = hours + ':' + minutes + ' ' + newformat;
    // this.sdate = localStorage.getItem('StartDate');
    // this.edate = localStorage.getItem('EndDate');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getdepartmentmaster();
    this.GetHomecarerevenue();
   
  }

  public GetHomecarerevenue()
  {
    this.docservice.GetHomecareRevenue(this.hospitalid, this.startdate, this.enddate).subscribe(
      data => {

        this.dummlist = data;
        this.cancelledlist = this.dummlist;
        let total1 = 0;
        this.cancelledlist.forEach(element => {
          total1 += element.paidAmount;
        });
        this.TotalAmount = total1
        this.count = this.cancelledlist.length;
      }, error => {
      }
    )
  }


  public getdepartmentmaster() {

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
      }, error => {
      }
    )
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
  selectedDate(data) {
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    // var sdate = data.split('-')
    // this.startdate = sdate[0];
    // this.enddate = sdate[1];
    
    this.docservice.GetHomecareRevenue(this.hospitalid, this.startdate, this.enddate).subscribe(
      data => {

        this.dummlist = data;
        this.cancelledlist = this.dummlist;
        let total1 = 0;
        this.cancelledlist.forEach(element => {
          total1 += element.paidAmount;
        });
        this.TotalAmount = total1
        this.count = this.cancelledlist.length;
      }, error => {
      }
    )
  }

  public GetTypeID(event) {

    if (event.target.value == 'none') {
      this.docservice.GetHomecareRevenue(this.hospitalid, this.startdate, this.enddate).subscribe(
        data => {

          this.dummlist = data;
          this.cancelledlist = this.dummlist;
          let total1 = 0;
          this.cancelledlist.forEach(element => {
            total1 += element.paidAmount;
          });
          this.TotalAmount = total1
          this.count = this.cancelledlist.length;
        }, error => {
        }
      )
    }
    else {
      this.docservice.GetHomecareRevenue(this.hospitalid, this.startdate, this.enddate).subscribe(
        data => {

          this.dummlist = data;
          this.cancelledlist = this.dummlist.filter(x => x.type == event.target.value);
          let total1 = 0;
          this.cancelledlist.forEach(element => {
            total1 += element.paidAmount;
          });
          this.TotalAmount = total1
          this.count = this.cancelledlist.length;
        }, error => {
        }
      )
    }
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

  public appointmentid: any;
  public typeid: any;


  public cancelappoinement(appointmentsid,typeid) {
    this.appointmentid = appointmentsid;
    this.typeid=typeid;
  }

  public cancelledappointment() {
    this.docservice.GetCanacelledHomecareAppointmentsByRecp(this.appointmentid, this.typeid, this.reasonforcancel).subscribe(data => {
      if(this.languageid==1)
      {
        Swal.fire('Appointment Cancelled Successfully');
        this.GetHomecarerevenue();
        this.reasonforcancel=""
      }
      else
     {
      Swal.fire('','Rendez-vous annulé');
      this.GetHomecarerevenue();
      this.reasonforcancel=""
     }
     
    })
  }
}

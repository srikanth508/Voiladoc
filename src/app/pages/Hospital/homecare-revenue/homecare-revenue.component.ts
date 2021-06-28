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
  selector: 'app-homecare-revenue',
  templateUrl: './homecare-revenue.component.html',
  styleUrls: ['./homecare-revenue.component.css']
})
export class HomecareRevenueComponent implements OnInit {

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
  options: any
  value: any
  roleid
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

    this.sdate = localStorage.getItem('StartDate');
    this.edate = localStorage.getItem('EndDate');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');
    this.roleid = localStorage.getItem('roleid');
    this.getlanguage();
    this.getdepartmentmaster();
    this.docservice.GetHomecareRevenueByHospitalID(this.hospitalid, this.sdate, this.edate).subscribe(
      data => {
        
        this.dummlist = data;
        this.cancelledlist = this.dummlist.filter(x => x.isVisited == 1);
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

  public GetTypeID(event) {

    if (event.target.value == 'none') {
      this.docservice.GetHomecareRevenueByHospitalID(this.hospitalid, this.sdate, this.edate).subscribe(
        data => {

          this.dummlist = data;
          this.cancelledlist = this.dummlist.filter(x => x.isVisited == 1);
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
      this.docservice.GetHomecareRevenueByHospitalID(this.hospitalid, this.sdate, this.edate).subscribe(
        data => {

          this.dummlist = data;
          this.cancelledlist = this.dummlist.filter(x => x.type == event.target.value && x.isVisited == 1);
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
  startdate: any
  enddate: any
  selectedDate(data) {
    //
    // var sdate = data.split('-')
    // this.startdate = sdate[0];
    // this.enddate = sdate[1];
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.docservice.GetHomecareRevenueByHospitalID(this.hospitalid, this.startdate, this.enddate).subscribe(
      data => {

        this.dummlist = data;
        this.cancelledlist = this.dummlist.filter(x => x.isVisited == 1);
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
}


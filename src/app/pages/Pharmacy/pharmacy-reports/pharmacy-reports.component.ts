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
@Component({
  selector: 'app-pharmacy-reports',
  templateUrl: './pharmacy-reports.component.html',
  styleUrls: ['./pharmacy-reports.component.css']
})
export class PharmacyReportsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public id: any;

  public deliverlist: any;
  public nondeliverlist:any;
  public cancelllist:any;
  public term:any;
  public todaydate:any;
  public appointmentlist:any;
  public dummlist:any;

  
  SDate=new Date();
  EDate=new Date();

  startdate:any;
  enddate:any;
  value:any;
  ngOnInit() {
    this.id = localStorage.getItem('pharmacyid');


        
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };


    
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
  
    var kkk=this.SDate.setDate(this.SDate.getDate() - 0);
  var lll=this.EDate.setDate(this.EDate.getDate() + 7);

  const format = 'yyyy-MM-dd';
  const myDate = new Date();
  const locale = 'en-US';
  this.todaydate = formatDate(myDate, format, locale);


  this.startdate=formatDate(kkk, format, locale);
  this.enddate=formatDate(lll, format, locale);
  this.getdelivermedicines()
  }


  public getdelivermedicines() {
   
    this.docservice.GetReOrderMedicinesDeliveryReports(this.id, this.startdate, this.enddate).subscribe(
      data => {
       
        this.appointmentlist = data;
        this.dummlist=this.appointmentlist;
      }, error => {
      }
    )
  }

  selectedDate(data){
   
      var sdate=data.split('-')
      var s=sdate[0]
      var e=sdate[1]
      this.docservice.GetReOrderMedicinesDeliveryReports(this.id, s, e).subscribe(
        data => {
         
          this.appointmentlist = data;
          this.dummlist=this.appointmentlist;
        }, error => {
        }
      )
  }







  public getget(even) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;
   
    if (even.target.value == 2) {
     
      let dfsfd = this.dummlist.filter(x => x.delivery == 1);
     
      this.appointmentlist = dfsfd;
    
    }
    if (even.target.value == 3) {
     
      let dfsfd = this.dummlist.filter(x => x.notVisited == 1);
     
      this.appointmentlist = dfsfd;
     
    }
    if (even.target.value == 4) {
     
      let dfsfd = this.dummlist.filter(x => x.cancelled == 1);
     
      this.appointmentlist = dfsfd;
     
    }
  }











  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Pharmacy'));
    this.exportAsExcelFile(hhh, "Phmrmacy Reports");
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



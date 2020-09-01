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
  selector: 'app-prescription-reports',
  templateUrl: './prescription-reports.component.html',
  styleUrls: ['./prescription-reports.component.css']
})
export class PrescriptionReportsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public id: any;

  public deliverlist: any;
  public nondeliverlist: any;
  public cancelllist: any;
  public term: any;
  public todaydate: any;
  public reportlist: any;
  public dummlist: any;
  public list: any;
  public myarray = [];
  public listid: any;
  SDate = new Date();
  EDate = new Date();

  startdate: any;
  enddate: any;
  value: any;
  public languageid: any;
  public labels: any;
  public sdate: any;
  public edate: any;
  public diffid: any;
  public count: any;
  roleid
  ngOnInit() {

    this.id = localStorage.getItem('pharmacyid');

    this.languageid = localStorage.getItem('LanguageID');
    this.roleid = localStorage.getItem('roleid');
    this.getlanguage()

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

    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);




    this.sdate = localStorage.getItem('StartDate');
    this.edate = localStorage.getItem('EndDate');


    this.activatedroute.params.subscribe(params => {
      debugger;

      this.diffid = params['id']
    }
    )
    if (this.diffid == undefined) {
      this.GetReports()
    }
    else {
      this.docservice.GetPatient_TextMedicineDetailsForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {
          debugger
          this.reportlist = data;
          this.dummlist = this.reportlist;
          this.count = this.reportlist.length
        }, error => {
        }
      )
    }


  }
  public getlanguage() {
    this.docservice.GetAdmin_PharmacyLoginDoctorPrescriptionReports_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {
        debugger
        this.labels1 = data;
      }, error => {
      }
    )
  }
  labels1
  totalamount: any;
  public GetReports() {
    debugger
    this.docservice.GetPatient_TextMedicineDetailsReportsWeb(this.id, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        debugger
        this.reportlist = data;
        this.totalamount = this.reportlist.map(a => a.amountToPay).reduce(function (a, b) {
          return a + b;
        });
        this.dummlist = this.reportlist;
        this.count = this.reportlist.length
      }, error => {
      }
    )
  }

  selectedDate(data) {
    debugger
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetReports();
    // this.docservice.GetPatient_TextMedicineDetailsReportsWeb(this.id, s, e,this.languageid).subscribe(
    //   data => {
    //     debugger
    //     this.reportlist = data;
    //     this.dummlist=this.reportlist;
    //   }, error => {
    //   }
    // )
  }
  patientname: any;
  mobilernumber: any;
  address: any;
  doctorname: any;
  docmobile: any;
  email: any;
  docsignatureurl: any;

  public GetMedicines(id) {
    this.myarray.length = 0;
    debugger
    this.listid = id;
    this.list = this.reportlist.filter(x => x.id == this.listid)
    this.patientname = this.list[0].patientName,
      this.mobilernumber = this.list[0].mobileNumber
    this.address = this.list[0].address

    this.doctorname = this.list[0].doctorName,
      this.docmobile = this.list[0].docmobile,
      this.email = this.list[0].emailID,
      this.docsignatureurl = this.list[0].siganatureurl


    debugger
    let meds = this.list[0].allMedicines.split(',');
    let quan = this.list[0].quantity.split(',');
    let mtype = this.list[0].medicineTypeID.split(',');
    for (let i = 0; i < meds.length; i++) {
      var medetty = {
        'medicine': meds[i],
        'quantity': quan[i],
        'Medicinetype': mtype[i]
      }
      this.myarray.push(medetty);
    }
    debugger
  }




  public getget(even) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;
    debugger
    if (even.target.value == 2) {
      debugger
      let dfsfd = this.dummlist.filter(x => x.delivered == 1);
      debugger
      this.reportlist = dfsfd;
      this.count = this.reportlist.length

    }
    if (even.target.value == 3) {
      debugger
      let dfsfd = this.dummlist.filter(x => x.cancelled == 1);
      debugger
      this.reportlist = dfsfd;
      this.count = this.reportlist.length

    }
    if (even.target.value == 1) {
      this.GetReports();
      this.docservice.GetPatient_TextMedicineDetailsForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {
          debugger
          this.reportlist = data;
          this.dummlist = this.reportlist;
          this.count = this.reportlist.length
        }, error => {
        }
      )

    }
  }



  prescriptionurl: any;


  public GetPrescriptionUrl(url) {
    this.prescriptionurl = url;
  }



  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Pharmacy'));
    this.exportAsExcelFile(hhh, "Prescription Reports");
  }

  public tableToJson(table) {
    debugger
    var data = []; // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};
      for (var j = 0; j < tableRow.cells.length - 2; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      } data.push(rowData);
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    debugger;
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

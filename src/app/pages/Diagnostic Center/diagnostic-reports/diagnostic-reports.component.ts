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
  selector: 'app-diagnostic-reports',
  templateUrl: './diagnostic-reports.component.html',
  styleUrls: ['./diagnostic-reports.component.css']
})
export class DiagnosticReportsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public id: any;
  public Approvelist: any;
  public diagnosticid: any;
  public unApprovelist: any;
  public cancellist: any;
  public term: any;
  public term1: any;
  public term2: any;
  public todaydate: any;
  public dummlist; any;
  public packageid: any;
  public packagelist: any;
  public testslist: any;
  public reports: any;
  public reportimage: any;



  SDate = new Date();
  EDate = new Date();

  startdate: any;
  enddate: any;
  value: any;
  public diatestid: any;
  public reportid: any;

  public languageid: any;
  public labels: any;
  public count: any;

  public sdate: any;
  public edate: any;
  public diffid: any;
  public showdrop:any;
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



    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;

    var kkk = this.SDate.setDate(this.SDate.getDate() - 5);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    this.diagnosticid = localStorage.getItem('diagnosticid');
    this.languageid = localStorage.getItem('LanguageID');


    this.sdate = localStorage.getItem('StartDate');
    this.edate = localStorage.getItem('EndDate');

    this.activatedroute.params.subscribe(params => {

      this.diffid = params['id']
      if(this.diffid==undefined)
      {
        this.showdrop=0;
      }
      else
      {
        this.showdrop=1;
      }

      
    }
    )
    if (this.diffid == undefined) {
      this.GetApprovelist()
    }
    else {

      this.docservice.GetDiagnosticAppointmentsByApprovedReportsWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {

          this.Approvelist = data;
          this.dummlist = this.Approvelist
          this.count = this.Approvelist.length
        }, error => {
        }
      )
    }


    this.getlanguage()
    this.getdiagnosticforadmin()
  }

  diagnosticlist: any;

  public getdiagnosticforadmin() {

    this.docservice.GetDiagnosticForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;

      }, error => {
      }
    )
  }
  diagnosticcenterid: any;

  public GetDiagnosticcenterID(even) {
    
    this.diagnosticcenterid = even.target.value;

    this.Approvelist=this.dummlist.filter(x=>x.diagnosticCenterID==this.diagnosticcenterid)
  }

  public getlanguage() {
    this.docservice.GetAdmin_DiagnosticLoginOrdersAndOrderReport_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )
  }
  labels1
  public GetApprovelist() {

    this.docservice.GetDiagnosticAppointmentsByApprovedReports(this.diagnosticid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.Approvelist = data;
        this.dummlist = this.Approvelist
        this.count = this.Approvelist.length
      }, error => {
      }
    )
  }


  selectedDate(data) {

    // var sdate = data.split('-')
    // var s = sdate[0]
    // var e = sdate[1]
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];

    this.docservice.GetDiagnosticAppointmentsByApprovedReports(this.diagnosticid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.Approvelist = data;
        this.dummlist = this.Approvelist
        this.count = this.Approvelist.length
      }, error => {
      }
    )

  }


  // public GetunApprovelist() {
  //  
  //   this.docservice.GetDiagnosticAppointmentsByUnApprovedReports(this.diagnosticid, this.startdate, this.enddate).subscribe(
  //     data => {
  //      
  //       this.unApprovelist = data;
  //     }, error => {
  //     }
  //   )
  // }
  // public Getcancellist() {
  //  
  //   this.docservice.GetDiagnosticAppointmentsByCancelledReports(this.diagnosticid, this.startdate, this.enddate).subscribe(
  //     data => {
  //      
  //       this.cancellist = data;
  //     }, error => {
  //     }
  //   )
  // }







  public getget(even) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;

    if (even.target.value == 2) {

      let dfsfd = this.dummlist.filter(x => x.approved == 1);

      this.Approvelist = dfsfd;
      this.count = this.Approvelist.length

    }
    if (even.target.value == 3) {

      let dfsfd = this.dummlist.filter(x => x.notVisited == 1);

      this.Approvelist = dfsfd;
      this.count = this.Approvelist.length

    }
    if (even.target.value == 4) {

      let dfsfd = this.dummlist.filter(x => x.cancelled == 1 || x.diagnosticCancelled == 1);

      this.Approvelist = dfsfd;
      this.count = this.Approvelist.length

    }
    if (even.target.value == 1) {


      this.GetApprovelist();

      this.docservice.GetDiagnosticAppointmentsByApprovedReportsWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {

          this.Approvelist = data;
          this.dummlist = this.Approvelist
          this.count = this.Approvelist.length
        }, error => {
        }
      )
    }
  }












  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Diagnostic'));
    this.exportAsExcelFile(hhh, "Diagnostic Reports");
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

        if(this.languageid==1)
        {
          document.getElementById('table_rowhtml').innerHTML=rowData['REPORTS'] ? rowData['REPORTS'] :"";
          rowData['REPORTS']=document.getElementById('table_rowhtml').innerText;
          document.getElementById('table_rowhtml').innerHTML=rowData['HOMESAMPLEPICKUP'] ? rowData['HOMESAMPLEPICKUP'] :"";
          rowData['HOMESAMPLEPICKUP']=document.getElementById('table_rowhtml').innerText;
  
          document.getElementById('table_rowhtml').innerHTML=rowData['DETAILS'] ? rowData['DETAILS'] :"";
          rowData['DETAILS']=document.getElementById('table_rowhtml').innerText;   
        }
        else if(this.languageid==6)
        {
          document.getElementById('table_rowhtml').innerHTML=rowData['RAPPORTS'] ? rowData['RAPPORTS'] :"";
          rowData['RAPPORTS']=document.getElementById('table_rowhtml').innerText;
          document.getElementById('table_rowhtml').innerHTML=rowData['COLLECTEPRÉLÈVEMENTSÀDOMICILE'] ? rowData['COLLECTEPRÉLÈVEMENTSÀDOMICILE'] :"";
          rowData['COLLECTEPRÉLÈVEMENTSÀDOMICILE']=document.getElementById('table_rowhtml').innerText;

          document.getElementById('table_rowhtml').innerHTML=rowData['EXAMENS'] ? rowData['EXAMENS'] :"";
          rowData['EXAMENS']=document.getElementById('table_rowhtml').innerText;   
        }
       

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









  public GetTestsID(id) {

    this.diatestid = id;
    this.GetDiaTests()
  }

  public GetDiaTests() {
    this.docservice.GetDiagnosticTestsByAppointmentIDWeb(1, this.diatestid).subscribe(
      data => {

        this.testslist = data;
      }, error => {
      }
    )
  }


  public GetPackageID(id) {

    this.packageid = id;
    this.GetPackageTests();
  }

  public GetPackageTests() {
    this.docservice.GetDiagnosticPackagesByAppointmentIDWeb(1, this.packageid).subscribe(
      data => {

        this.packagelist = data;
      }, error => {
      }
    )
  }


  public GetReportID(id) {

    this.reportid = id;
    this.getreportid()
  }

  public getreportid() {
    this.docservice.GetPatientDiagnosticsReportsByAppointmentID(this.reportid).subscribe(
      data => {

        this.reports = data[0];
        this.reportimage = this.reports.fileURL
        // window.location.href = this.reportimage;
        window.open(this.reportimage, '_blank');
      }, error => {
      }
    )
  }

  public attachments:any;

  
  public GetAttachments(id) {
    this.docservice.GetDiagnosticAppointmentPhotos(id).subscribe(data => {
      
      this.attachments = data;
    })
  }

}

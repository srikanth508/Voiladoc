import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-appointmentsreport',
  templateUrl: './appointmentsreport.component.html',
  styleUrls: ['./appointmentsreport.component.css']
})
export class AppointmentsreportComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public cancelledlist: any;
  public dummlist: any;
  public date: any;
  public doctorid: any;
  public term: any;
  public completedlist: any;
  public notvisitedlist: any;
  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  public count: any;
  kk: any;

  value: any;
  SDate = new Date();
  EDate = new Date();

  public languageid: any;
  public labels: any;
  public sdate: any;
  public edate: any;
  public diffid: any;
  public showreason: any;

  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    var kkk = this.SDate.setDate(this.SDate.getDate() - 5);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);
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
    this.languageid = localStorage.getItem('LanguageID');



    this.sdate = localStorage.getItem('StartDate');
    this.edate = localStorage.getItem('EndDate');



    this.activatedroute.params.subscribe(params => {


      this.diffid = params['id']

    }
    )
    if (this.diffid == undefined) {
      this.getcancelledappoinrtments();
      this.showreason = 1;
    }
    else if (this.diffid == '1') {
      this.docservice.GetCancelledAppointmentReportsForDoctorwEB(this.sdate, this.edate, this.languageid).subscribe(
        data => {

          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
    else if (this.diffid == '2') {
      this.docservice.GetCancelledAppointmentReportsForVideoAppts(this.sdate, this.edate, this.languageid).subscribe(
        data => {

          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
    this.getlanguage();
    this.GetHospitallist()
  }
  hospitalid: any;

  public GetHospitalID(even) {

    if (this.diffid == 1) {

      this.hospitalid = even.target.value;
      this.cancelledlist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalid)
    }
    else if (this.diffid == 2) {
      this.hospitalid = even.target.value;
      this.cancelledlist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalid)
    }
  }



  hospitallist: any;
  public GetHospitallist() {
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        this.hospitallist = data;

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



  selectedDate(data) {

    //   var sdate = data.split('-')
    //   this.startdate= sdate[0]
    //  this.enddate= sdate[1]
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];

    if (this.diffid == undefined) {
      this.getcancelledappoinrtments();
      this.showreason = 1;
    }
    else if (this.diffid == '1') {
      this.docservice.GetCancelledAppointmentReportsForDoctorwEB(this.startdate, this.enddate, this.languageid).subscribe(
        data => {

          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
    else if (this.diffid == '2') {
      this.docservice.GetCancelledAppointmentReportsForVideoAppts(this.startdate, this.enddate, this.languageid).subscribe(
        data => {

          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
  }


  public getcancelledappoinrtments() {

    this.docservice.GetCancelledAppointmentReportsForDoctor(this.doctorid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.dummlist = data;
        this.cancelledlist = this.dummlist.filter(x => x.refundBit == 1);
        this.count = this.cancelledlist.length;

      }, error => {
      }
    )
  }






  // public getcompletedappointments() {
  //  
  //   this.docservice.GetVisitedPatientsReports(this.doctorid,this.startdate,this.enddate).subscribe(
  //     data => {
  //      
  //       this.completedlist = data;
  //     }, error => {
  //     }
  //   )
  // }

  // public GetNotVisitedreport() {
  //  
  //   this.docservice.GetNonVisitedPatientsReports(this.doctorid, this.startdate,this.enddate).subscribe(
  //     data => {
  //      
  //       this.notvisitedlist = data;
  //     }, error => {
  //     }
  //   )
  // }


  public getget(even) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;

    if (even.target.value == 1) {

      let dfsfd = this.dummlist.filter(x => x.isVisited == 1);

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }
    if (even.target.value == 2) {

      let dfsfd = this.dummlist.filter(x => x.noShow == 1);

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }
    if (even.target.value == 3) {

      let dfsfd = this.dummlist.filter(x => x.isVisited == '0' && x.accepted == '0' && x.cancelled == '0' && x.docCancelled == '0');

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }

    if (even.target.value == 4) {

      let dfsfd = this.dummlist.filter(x => x.accepted == '1' && x.isVisited == '0' && x.docCancelled == '0' && x.cancelled == '0' && x.noShow == '0');

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }
    if (even.target.value == 5) {

      let dfsfd = this.dummlist.filter(x => x.cancelled == '1');

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }
    if (even.target.value == 6) {

      let dfsfd = this.dummlist.filter(x => x.docCancelled == '1');

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }

    if (even.target.value == 0) {

      this.getcancelledappoinrtments();
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


  file: File;
  contactdata: any;
  arrayBuffer: any;
  incomingfile(event) {

    this.file = event.target.files[0];
    let a = this.file.name;
    var characters = a.substr(a.length - 5);

    if (characters == ".xlsx") {

      let fileReader = new FileReader();
      fileReader.onload = e => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.contactdata = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      };
      fileReader.readAsArrayBuffer(this.file);

    } else {
      Swal.fire("Imported file format not supported.");
    }
  }

  public Upload_file() {

    this.docservice.InsertDrugNameMaster(this.contactdata).subscribe(data => {

      if (data != undefined || data != null) {
        Swal.fire("Saved Successfully");

      }
    });

    // if (this.contactdata.length == 0) {
    //   Swal.fire("Please Upload a valid excel.");
    // } else {
    //   for (let j = 0; j < this.contactdata.length; j++) {
    //    
    //     var entity = {
    //       IcdCode: this.contactdata[j].IcdCode,
    //       Description: this.contactdata[j].Description,

    //     };
    //     // var entity={
    //     //   City:this.contactdata[j].City,
    //     //   StateID:this.contactdata[j].StateID
    //     // }



    //     this.docservice.InsertICDCodeMaster(entity).subscribe(data => {
    //      
    //       if (data != undefined || data != null) {
    //         Swal.fire("Saved Successfully");

    //       }
    //     });
    //   }
    // }



  }

}

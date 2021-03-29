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
  selector: 'app-doc-reports',
  templateUrl: './doc-reports.component.html',
  styleUrls: ['./doc-reports.component.css']
})
export class DocREportsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public cancelledlist: any;
  public dummlist: any;
  public count: any;
  public doctorid: any;
  public startdate: any;
  public enddate: any;
  public languageid: any;
  public labels: any;
  public term: any;
  public id: any;
  public sdate: any;
  public edate: any;


  value: any;
  SDate = new Date();
  EDate = new Date();

  ngOnInit() {

    this.sdate = localStorage.getItem('StartDate');
    this.edate = localStorage.getItem('EndDate');
    this.activatedroute.params.subscribe(params => {


      this.id = params['id']
    }
    )

    this.languageid = localStorage.getItem('LanguageID');
    this.doctorid = localStorage.getItem('Reportdocid');
    this.startdate = localStorage.getItem('startdate');
    this.enddate = localStorage.getItem('enddate');


    if (this.id == undefined) {

      this.getcancelledappoinrtments();
    }

    else if (this.id == '1') {
      this.docservice.GetAllAppointmentsForHosp(this.sdate, this.edate).subscribe(
        data => {

          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
    else if (this.id == '2') {
      this.docservice.GetAllAppointmentsForClinics(this.sdate, this.edate).subscribe(
        data => {

          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
    this.getlanguage();
    this.gethosptilclinicforadmin();
    this.GetClincsforadmin();
  }
  clinicid:any;

public hospitalid:any;
  public GetHosptalWiseAppointments(even) {

    if (this.id == 1) {
      this.hospitalid = even.target.value;
      
      this.cancelledlist=this.dummlist.filter(x=>x.hospitalClinicID==this.hospitalid)
      // this.docservice.GetAllAppointmentsForHosp(this.sdate, this.edate).subscribe(
      //   data => {

      //     this.cancelledlist = data;
      //     this.dummlist = this.cancelledlist;
      //     this.count = this.cancelledlist.length
      //   }, error => {
      //   }
      // )
      if(this.id==2)
      {
        this.clinicid = even.target.value;
        
        this.cancelledlist=this.dummlist.filter(x=>x.hospitalClinicID==this.clinicid)
      }
    }
  }

  hospitalcliniclist: any;
  hospitalcount: any;
  dummlisthospitalits:any;

  public gethosptilclinicforadmin() {

    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        this.dummlisthospitalits= data;
        this.hospitalcliniclist = this.dummlisthospitalits.filter(x => x.hospital_ClinicID == 1)
        this.hospitalcount = this.hospitalcliniclist.length;
      }, error => {
      }
    )
  }
  dummclinics:any;
  clnicslist:any;

  
  public GetClincsforadmin() {
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        this.dummclinics= data;
        this.clnicslist = this.dummclinics.filter(x => x.hospital_ClinicID == 2)
        this.hospitalcount = this.clnicslist.length;
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
  public getcancelledappoinrtments() {

    this.docservice.GetCancelledAppointmentReportsForDoctor(this.doctorid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.cancelledlist = data;
        this.dummlist = this.cancelledlist;
        this.count = this.cancelledlist.length
      }, error => {
      }
    )
  }


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

      let dfsfd = this.dummlist.filter(x => x.cancelled == 1 || x.docCancelled == 1);

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }
    if (even.target.value == 4) {

      this.getcancelledappoinrtments();
      this.docservice.GetAllAppointmentsForHosp(this.sdate, this.edate).subscribe(
        data => {

          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length
        }, error => {
        }
      )

    }

  }







  public GetAppointmenttype(even) {
    if (even.target.value == '2') {
      let dfsfd = this.dummlist.filter(x => x.appointmentTypeID == 1);

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }
    if (even.target.value == '3') {
      let dfsfd = this.dummlist.filter(x => x.appointmentTypeID == 2);

      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }
    if (even.target.value == '1') {
      if (this.id == undefined) {
        this.getcancelledappoinrtments();
      }
      else if (this.id == '1') {
        this.docservice.GetAllAppointmentsForHosp(this.sdate, this.edate).subscribe(
          data => {

            this.cancelledlist = data;
            this.dummlist = this.cancelledlist;
            this.count = this.cancelledlist.length
          }, error => {
          }
        )
      }
      else if (this.id == '2') {
        this.docservice.GetAllAppointmentsForClinics(this.sdate, this.edate).subscribe(
          data => {

            this.cancelledlist = data;
            this.dummlist = this.cancelledlist;
            this.count = this.cancelledlist.length
          }, error => {
          }
        )
      }

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





  
  selectedDate(data) {

    //   var sdate = data.split('-')
    //   this.startdate= sdate[0]
    //  this.enddate= sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];

    
    if (this.id == undefined) {

      this.getcancelledappoinrtments();
    }

    else if (this.id == '1') {
      this.docservice.GetAllAppointmentsForHosp(this.startdate, this.enddate).subscribe(
        data => {

          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
    else if (this.id == '2') {
      this.docservice.GetAllAppointmentsForClinics(this.startdate, this.enddate).subscribe(
        data => {

          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
  }
}

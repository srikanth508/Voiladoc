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
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { timer } from 'rxjs';

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
  public showdrop: any;
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
    var lll = this.EDate.setDate(this.EDate.getDate() + 10);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);




    this.sdate = localStorage.getItem('StartDate');
    this.edate = localStorage.getItem('EndDate');


    this.activatedroute.params.subscribe(params => {

      this.diffid = params['id']
      if (this.diffid == undefined) {
        this.showdrop = 0;
      }
      else {
        this.showdrop = 1;
      }
    }
    )
    if (this.diffid == undefined) {
      this.GetReports()
    }
    else {
      this.docservice.GetPatient_TextMedicineDetailsForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {

          this.reportlist = data;
          this.dummlist = this.reportlist;
          this.count = this.reportlist.length
        }, error => {
        }
      )
    }

    this.getpharmacyforadmin()
  }

  public pharmacylist: any;

  public getpharmacyforadmin() {

    this.docservice.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.pharmacylist = data;

      }, error => {
      }
    )
  }
  pharmacyid: any;

  public GetPharmacyID(even) {
    if (even.target.value != 0) {
      this.pharmacyid = even.target.value;
      this.reportlist = this.dummlist.filter(x => x.pharmacyID == this.pharmacyid)
      this.count = this.reportlist.length
    }
    else {
      this.docservice.GetPatient_TextMedicineDetailsForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {

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
  totalamount: any;
  public GetReports() {

    this.docservice.GetPatient_TextMedicineDetailsReportsWeb(this.id, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

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

    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.GetReports();
    // this.docservice.GetPatient_TextMedicineDetailsReportsWeb(this.id, s, e,this.languageid).subscribe(
    //   data => {
    //    
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
  hospitalname: any;
  hospitalid: any;
  docaddress: any;
  registrationno: any;
  prescriptiondate: any;
  dateofbirth: any;

  orderlist: any;
  noteetopharmasict: any;
  referencenumber: any;
  showedit: any;
  orderedmedicinelist; any;

  public GetMedicines(id) {
    this.myarray.length = 0;
    
    this.listid = id;
    this.list = this.reportlist.filter(x => x.id == this.listid)

    this.patientname = this.list[0].relationpatentname,
      this.mobilernumber = this.list[0].relationmobileno
    this.address = this.list[0].relatinpaaddess
    this.doctorname = this.list[0].doctorName,
      this.docmobile = this.list[0].docmobile,
      this.email = this.list[0].emailID,
      this.docsignatureurl = this.list[0].siganatureurl,
      this.hospitalname = this.list[0].hospital_ClinicName,
      this.hospitalid = this.list[0].hospitalClinicID,
      this.docaddress = this.list[0].docaddress,
      this.registrationno = this.list[0].registrationNo,
      this.prescriptiondate = this.list[0].prescriptionAddedDate,
      this.dateofbirth = this.list[0].dateofbirth,
      this.noteetopharmasict = this.list[0].notetoopharmacistt,
      this.referencenumber = this.list[0].referenceNumber,
      this.showedit = this.list[0].showUpdate,

      this.docservice.GetPatientOrderedMedicines(this.listid, this.languageid).subscribe(
        data => {

          this.orderedmedicinelist = data;
        }, error => {
        }
      )


    
  }
  // public GetMedicines(id) {
  //   this.myarray.length = 0;

  //   this.listid = id;
  //   this.list = this.reportlist.filter(x => x.id == this.listid)

  //   this.patientname = this.list[0].patientName,
  //     this.mobilernumber = this.list[0].mobileNumber
  //   this.address = this.list[0].address

  //   this.doctorname = this.list[0].doctorName,
  //     this.docmobile = this.list[0].docmobile,
  //     this.email = this.list[0].emailID,
  //     this.docsignatureurl = this.list[0].siganatureurl,
  //     this.hospitalname = this.list[0].hospital_ClinicName,
  //     this.hospitalid = this.list[0].hospitalClinicID,
  //     this.docaddress = this.list[0].docaddress,
  //     this.registrationno = this.list[0].registrationNo,
  //     this.prescriptiondate = this.list[0].prescriptionAddedDate,
  //     this.dateofbirth = this.list[0].dateofbirth

  //   let meds = this.list[0].allMedicines.split(',');
  //   let quan = this.list[0].quantity.split(',');

  //   let sig = this.list[0].sig.split(',');
  //   let notetopharmacist = this.list[0].noteToPharmacist.split(',');
  //   let howmanyrefills = this.list[0].renovolment.split(',');
  //   let issubastaible = this.list[0].isSubatianablenotPermittesd.split(',');
  //   // let mtype = this.list[0].medicineTypeID.split(',');

  //   for (let i = 0; i < meds.length; i++) {
  //     var medetty = {
  //       'medicine': meds[i],
  //       'quantity': quan[i],
  //       'Sig': sig[i],
  //       'NoteToPharmacist': notetopharmacist[i],
  //       'howmanyrefills': howmanyrefills[i],
  //       'issubastaible': issubastaible[i]
  //       // 'Medicinetype': mtype[i]
  //     }
  //     this.myarray.push(medetty);
  //   }

  // }




  public getget(even) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;

    if (even.target.value == 2) {

      let dfsfd = this.dummlist.filter(x => x.delivered == 1);

      this.reportlist = dfsfd;
      this.count = this.reportlist.length

    }
    if (even.target.value == 3) {

      let dfsfd = this.dummlist.filter(x => x.rejected == 1);

      this.reportlist = dfsfd;
      this.count = this.reportlist.length
    }
    if (even.target.value == 1) {
      this.GetReports();
      this.docservice.GetPatient_TextMedicineDetailsForWeb(this.sdate, this.edate, this.languageid).subscribe(
        data => {

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

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }



  public SavePDF() {

    let pdfContent = window.document.getElementById("content");
    var doc = new jsPDF('p', 'mm', "a4");


    html2canvas(pdfContent).then(function (canvas) {


      var imgData = canvas.toDataURL('image/jpeg', 1.0);

      doc.setFontSize(3);

      doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      doc.save('Medicines.pdf');
    });
  }

}

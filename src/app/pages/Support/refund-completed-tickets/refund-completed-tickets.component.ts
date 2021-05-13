import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-refund-completed-tickets',
  templateUrl: './refund-completed-tickets.component.html',
  styleUrls: ['./refund-completed-tickets.component.css']
})
export class RefundCompletedTicketsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }


  options: NgDateRangePickerOptions;
  issuelist: any;
  languageid: any;
  labels: any;
  count: any;
  term: any;
  public startdate: any;
  public enddate: any;

  value: any;
  SDate = new Date();
  EDate = new Date();
  public sdate: any;
  public edate: any;
  public todaydate: any;
  public CurrentTime: any;
  public dummissuelist: any;
  public issuephoto = [];
  public issuephotourl = [];
  dropzonelable: any;
  countrymanaerid: any;
  supportid: any;
  showexportbutton: any;
  refundlist: any;
  comments: any;
  dummrefundlist: any;
  ngOnInit() {
    this.countrymanaerid = localStorage.getItem('countrymanagerid');
    this.supportid = localStorage.getItem('supportid');
    if (this.countrymanaerid != undefined || this.supportid != undefined) {
      this.showexportbutton = 1;
    }

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
    this.GetRefunfSupport()
    this.GetLanguageMaster()

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }
  

  public GetRefunfSupport() {
    this.docservice.GetPatientRefundStatusWeb(this.languageid, this.startdate, this.enddate).subscribe(res => {

      this.dummrefundlist = res;
      this.refundlist = this.dummrefundlist.filter(x => x.completed == 1)
      this.count = this.refundlist.length;
    })
  }
  public GetLanguageMaster() {
    this.docservice.GetAdmin_SupportForWeb_Labels(this.languageid).subscribe(res => {

      this.labels = res;

    })
  }




  selectedDate(data) {

    //   var sdate = data.split('-')
    //   this.startdate= sdate[0]
    //  this.enddate= sdate[1]

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])


    this.GetRefunfSupport();
  }
  typeid: any;

  public id: any;



  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Appointment'));
    this.exportAsExcelFile(hhh, "Refund Reports");
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


  public transctionslip: any;


  public GetTransctiuonSlip(refund) {
    this.transctionslip = refund.transctionPhoto
  }



  
  public GetTransctionPhotodetails(details) {
    this.id = details.id
  }



  
  public UpdatePatientRefundStatusByBankDetails() {
    var entity = {
      'ID': this.id,
      'Comments': this.comments,
      'TransctionPhoto': this.issuephotourl[0],
    }
    this.docservice.UpdatePatientRefundStatusByBankDetails(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        this.GetRefunfSupport();
      }
      else {
        Swal.fire('Mis à jour avec succés');
        this.GetRefunfSupport();
      }
    })
  }



  identityattachmentsurlssss = []
  showidentityproof = [];

  public onattachmentUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.identityattachmentsurlssss = []
    this.issuephoto.push(abcd.addedFiles[0]);
    this.uploadid();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Ajouté avec succès');
      abcd.length = 0;
    }
  }

  public uploadid() {
    this.docservice.pharmacyphoto(this.issuephoto).subscribe(res => {

      this.issuephotourl.push(res);
      this.identityattachmentsurlssss.push(res);
      let a = this.identityattachmentsurlssss[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showidentityproof.push(b)

    })
    // this.sendattachment();
  }

}

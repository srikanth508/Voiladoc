import { Component, OnInit } from '@angular/core'; import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgxSpinnerService } from "ngx-spinner";
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-patient-escalates-tickets',
  templateUrl: './patient-escalates-tickets.component.html',
  styleUrls: ['./patient-escalates-tickets.component.css']
})
export class PatientEscalatesTicketsComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }


  options: NgDateRangePickerOptions;
  public languageid: any;
  public labels: any;

  value: any;
  SDate = new Date();
  EDate = new Date();
  public todaydate: any;
  public startdate: any;
  public enddate: any;
  public CurrentTime: any;
  public supportlist: any;
  public term: any;
  public dummlist: any;
  public count: any;
  public supportid: any;
  public countrymanaerid: any;
  public showexportbutton: any;
  public dropzonelable: any;

  ngOnInit() {

    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 800);

    this.languageid = localStorage.getItem('LanguageID');
    this.supportid = localStorage.getItem('supportid');
    this.countrymanaerid = localStorage.getItem('countrymanagerid');
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
    var kkk = this.SDate.setDate(this.SDate.getDate() - 100);
    var lll = this.EDate.setDate(this.EDate.getDate() + 100);
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

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
    this.getlanguage();
    this.getsupport();

  }




  labels1: any;
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );

    this.docservice.GetAdmin_SupportForWeb_Labels(this.languageid).subscribe(res => {

      this.labels1 = res;

    })
  }

  photourl: any;

  public GetImage(photo) {
    this.photourl = photo;
  }




  public getsupport() {
    this.docservice.GetSupport(this.startdate, this.enddate).subscribe(
      data => {

        this.supportlist = data.filter(x => x.meridionalBit == 1);
        this.dummlist = this.supportlist
        this.count = this.supportlist.length
      }, error => {
      }
    )
  }


  public GetSupportResolvedBit(id) {

    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "This Issue Has Accept!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept!'
      }).then((result) => {
        if (result.value) {
          this.docservice.GetSupportResolvedBit(id).subscribe(res => {
            let test = res;
            this.getsupport();
          })
          Swal.fire(
            'Resolved!',
            'Issue has been Accepted.',
            'success'
          )
        }
        else {
          this.getsupport();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Etes-vous sûr(e) ?',
        // text: "This Issue Has Accept!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Oui, J'accepte",
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.docservice.GetSupportResolvedBit(id).subscribe(res => {
            let test = res;
            this.getsupport();
          })
          // Swal.fire(
          //   'Resolved!',
          //   'Issue has been Accepted.',
          //   'success'
          // )
        }
        else {
          this.getsupport();
        }
      })
    }


  }

  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.getsupport()
  }

  public GetResolvedStatus(even) {
    if (even.target.value == '1') {

      let dfsfd = this.dummlist.filter(x => x.resolve == 1);

      this.supportlist = dfsfd;
      this.count = this.supportlist.length

    }
    if (even.target.value == '2') {

      let dfsfd = this.dummlist.filter(x => x.resolve == 0);

      this.supportlist = dfsfd;
      this.count = this.supportlist.length

    }
    if (even.target.value == '0') {

      this.getsupport();
    }
  }

  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Appointment'));
    this.exportAsExcelFile(hhh, "Support Reports");
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






  identityattachmentsurlssss = []
  showidentityproof = [];
  issuephoto = [];
  issuephotourl = [];

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
      Swal.fire('Photo ajoutée');
      abcd.length = 0;
    }
  }

  public uploadid() {
    this.docservice.pharmacyphoto(this.issuephoto).subscribe(res => {

      this.issuephotourl.push(res);
      this.identityattachmentsurlssss.push(res);
      let a = this.identityattachmentsurlssss[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      if (this.issuephoto[0].type == 'image/jpeg') {

        this.showidentityproof.push(b)
      }
      else if (this.issuephoto[0].type == 'application/pdf') {

        this.showidentityproof.push('assets/Images/pdf.png')
      }
      // this.showidentityproof.push(b)

    })
    // this.sendattachment();
  }


  useremail: any;
  emailattchementurl = []
  cclist = [];
  bcclist = [];
  emailsubject:any;

  public sendmail1() {
    if (this.languageid = 1) {
      this.emailsubject = "Support ticket no. " + this.resolveid + ",  resolution."
    }
    else {
      this.emailsubject = "Ticket d'assistance n° " + this.resolveid + ", résolution"
    }
    var entity = {
      'emailto': this.useremail,
      'emailsubject': this.emailsubject,
      'emailbody': this.description,
      'attachmenturl': this.issuephotourl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }

    this.docservice.sendemail(entity).subscribe(data => {

      if (this.languageid == 1) {
        Swal.fire('Mail sent successfully.');
      }

      else if (this.languageid == 6) {
        Swal.fire('Email envoyé avec succès');
      }
    })
  }

  public removetgdescription: any;
  public description: any;
  public resolveid: any;
  smsmobileno: any;
  typeid: any;

  public GetSupportResolveID(id, email, smsmoibileno, typeid) {
    this.resolveid = id;
    this.useremail = email;
    this.smsmobileno = smsmoibileno;
    this.typeid = typeid;
  }

  public insertdetails() {

    document.getElementById("qwerty").innerHTML = this.description;
    this.removetgdescription = document.getElementById("qwerty").innerText;

    var entity = {
      'ID': this.resolveid,
      'MeridionalComments': this.removetgdescription,
      'MeridionalPhoto': this.issuephotourl[0]
    }
    this.docservice.UpdateMeridionalResolved(entity).subscribe(data => {
      let res = data;
      if (this.languageid == 1) {
        Swal.fire('Issue Resolved Successfully')
        var smsdesc = "We have resolved your issue with reference to support ticket no." + this.resolveid + ". Please check your email for details."
        this.SendTwiliSms(smsdesc, this.smsmobileno)
        this.description = ""
        this.issuephotourl = [];
        this.identityattachmentsurlssss = [];
        this.showidentityproof = [];
        this.getsupport();
        this.sendmail1()
      }
      else {
        Swal.fire('Problème résolu et réponse au patient');
        var smsdesc = "Nous avons résolu votre problème en référence au ticket d'assistance n° " + this.resolveid + ". Veuillez vérifier votre email pour plus de détails."
        this.SendTwiliSms(smsdesc, this.smsmobileno)
        this.description = ""
        this.issuephotourl = [];
        this.identityattachmentsurlssss = [];
        this.showidentityproof = [];
        this.getsupport();
        this.sendmail1()
      }


    })
  }





  public SendTwiliSms(smsdesc, smsmobileno) {
    debugger
    this.docservice.SendTwillioSMS(smsmobileno, smsdesc).subscribe(data => {

    })
  }

}

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
import { concat } from 'rxjs';
@Component({
  selector: 'app-support-web',
  templateUrl: './support-web.component.html',
  styleUrls: ['./support-web.component.css']
})
export class SupportWebComponent implements OnInit {
  public Editor = ClassicEditor;
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
    this.languageid = localStorage.getItem('LanguageID');
    this.GetSupportIssues()
    this.GetLanguageMaster()
    this.getlanguage()

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }
  labels1: any;



  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      },
      error => { }
    );
  }
  // && x.assignMeridional == 0

  public GetSupportIssues() {
    this.docservice.GetSupportForWebForSupportLogin(this.languageid, this.startdate, this.enddate).subscribe(res => {

      this.issuelist = res;
      this.dummissuelist = res;

      this.issuelist = this.dummissuelist.filter(x => x.resolved == 0)
      this.count = this.issuelist.length;

    })
  }
  public GetLanguageMaster() {
    this.docservice.GetAdmin_SupportForWeb_Labels(this.languageid).subscribe(res => {

      this.labels = res;

    })
  }


  photourl: any;

  public GetImageUrl(photoURL) {

    this.photourl = photoURL
  }


  selectedDate(data) {

    //   var sdate = data.split('-')
    //   this.startdate= sdate[0]
    //  this.enddate= sdate[1]

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.GetSupportIssues()

  }
  typeid: any;

  public GetTypeID(even) {
    this.typeid = even.target.value;
    if (even.target.value != 0) {
      this.issuelist = this.dummissuelist.filter(x => x.typeID == this.typeid && x.resolved == 0)
      this.count = this.issuelist.length;
    }
    else {
      this.GetSupportIssues()
    }
  }

  // public UpdateSupportForWebResolvedbit(id) {
  //  
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "This Issue Has Resolved!",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, Resolved!'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.docservice.UpdateSupportForWebResolvedbit(id).subscribe(res => {
  //         let test = res;
  //         this.GetSupportIssues();
  //       })
  //       Swal.fire(
  //         'Resolved!',
  //         'Issue has been Resolved.',
  //         'success'
  //       )
  //     }
  //     else {
  //       this.GetSupportIssues();
  //     }
  //   })
  // }


  public UpdateSupportForWebAcceptedbit(id) {

    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want To Accept This Issue!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept!'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateSupportForWebAcceptedbit(id).subscribe(res => {
            let test = res;
            this.GetSupportIssues();
          })
          Swal.fire(
            'Accepted!',
            'Issue has been Accepted.',
            'success'
          )
        }
        else {
          this.GetSupportIssues();
        }
      })
    }
    else {
      Swal.fire({
        // title: 'Êtes-vous sûr ?',
        // text: "You Want To Accept This Issue!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Oui, J'accepte"
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateSupportForWebAcceptedbit(id).subscribe(res => {
            let test = res;
            this.GetSupportIssues();
          })
          // Swal.fire(
          //   'Accepted!',
          //   'Issue has been Accepted.',
          //   'success'
          // )
        }
        else {
          this.GetSupportIssues();
        }
      })
    }

  }
  resolveid: any;
  useremail: any;
  smsmoibilno: any;

  public GetSupportResolveID(id, useremail, usermobile) {

    this.resolveid = id
    this.useremail = useremail
    this.smsmoibilno = usermobile
    debugger
    this.smsmoibilno = "212" + this.smsmoibilno
    debugger
  }
  description: any;
  removetgdescription: any;

  public insertdetails() {

    document.getElementById("qwerty").innerHTML = this.description;
    this.removetgdescription = document.getElementById("qwerty").innerText;

    var entity = {
      'ID': this.resolveid,
      'ResolvePhotoUrl': this.issuephotourl[0],
      'ResolveDescription': this.removetgdescription
    }
    this.docservice.UpdateSupportForWebResolvedbit(entity).subscribe(data => {
      let res = data;

      if (this.languageid == 1) {
        this.insertazurenotification();
        this.sendmail1()
        var smsdesc = "We have resolved your issue with reference to support ticket no." + this.resolveid + ". Please check your email for details."
        this.SendTwiliSms(smsdesc, this.smsmoibilno)
        Swal.fire('Issue Resolved Successfully')
        this.description = ""
        this.issuephotourl = [];
        this.identityattachmentsurlssss = [];
        this.showidentityproof = [];
        this.GetSupportIssues();
      }
      else {
        this.insertazurenotification()
        this.sendmail1()
        var smsdesc = "Nous avons résolu votre problème en référence au ticket d'assistance n° " + this.resolveid + ". Veuillez vérifier votre email pour plus de détails."
        this.SendTwiliSms(smsdesc, this.smsmoibilno)
        Swal.fire('Problème résolu et réponse au prestataire.')
        this.description = ""
        this.issuephotourl = [];
        this.identityattachmentsurlssss = [];
        this.showidentityproof = [];
        this.GetSupportIssues();
      }
    })
  }




  public SendTwiliSms(smsdesc, smsmobileno) {
    debugger
    this.docservice.SendTwillioSMS(smsmobileno, smsdesc).subscribe(data => {

    })
  }



  emailattchementurl = []
  cclist: any;
  bcclist: any;
  emailsubject: any;

  // this.useremail
  public sendmail1() {
    debugger
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
    debugger
    this.docservice.sendemail(entity).subscribe(data => {

      if (this.languageid == 1) {
        Swal.fire('Mail sent successfully.');
      }

      else if (this.languageid == 6) {
        Swal.fire('Email envoyé avec succès');
      }
    })
  }



  public insertazurenotification() {

    var entity = {
      'Descriptions': "Your issue has Resolved. Please Check",
      'Email': this.useremail,
    }
    this.docservice.DoctorPostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {

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

    })
    // this.sendattachment();
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


  public id: any;

  public assignMeridiobal(id, useremail, usermobile) {
    this.id = id;
    this.useremail = useremail
    this.smsmoibilno = usermobile
    debugger
    this.smsmoibilno = "212" + this.smsmoibilno
  }





  public updateassignmerigional() {
    document.getElementById("qwerty").innerHTML = this.description;
    this.removetgdescription = document.getElementById("qwerty").innerText;

    var entity = {
      'ID': this.id,
      'MeridionalPhotoUrl': this.issuephotourl[0],
      'MerdionalComments': this.removetgdescription
    }
    this.docservice.UpdateSupportForWebMeridionalCommetnts(entity).subscribe(data => {
      let res = data;
      this.insertazurenotification()
      Swal.fire('Issue Assigned Meridional Successfully');
      this.sendmail1()
      var smsdesc = "Your Support Ticket has been Resolved"
      this.SendTwiliSms(smsdesc, this.smsmoibilno)
      this.description = ""
      this.issuephotourl = [];
      this.identityattachmentsurlssss = [];
      this.showidentityproof = [];

      this.GetSupportIssues();
    })
  }
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You Want to Assign Meridional!",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, Assign!'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.docservice.UpdateSupportForWebForAssignMeridional(id).subscribe(res => {
  //         let test = res;
  //         this.GetSupportIssues();
  //       })
  //       Swal.fire(
  //         'Assigned!',
  //         'Issue  has been Assigned Successfully',
  //         'success'
  //       )
  //     }
  //     else {
  //       this.GetSupportIssues();
  //     }
  //   })

  // }
}

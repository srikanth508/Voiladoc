import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

import { formatDate } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-sick-slip-dashboard',
  templateUrl: './sick-slip-dashboard.component.html',
  styleUrls: ['./sick-slip-dashboard.component.css']
})
export class SickSlipDashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  options: NgDateRangePickerOptions;
  public sicksliplist: any;
  public doctorid: any;
  public desc: any;
  public languageid: any;
  public labels: any;
  public attachmentsurl = [];
  public term: any;

  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  value: any;
  public todaydate: any;
  MobileNumber
  Hospital_ClinicName
  user
  ngOnInit() {


    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.MobileNumber = localStorage.getItem('MobileNumber');
    this.Hospital_ClinicName = localStorage.getItem('Hospital_ClinicName');
    this.user = localStorage.getItem('user');

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();

    var kkk = this.SDate.setDate(this.SDate.getDate() - 20);
    var lll = this.EDate.setDate(this.EDate.getDate() + 20);
    debugger



    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    debugger
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;

    this.doctorid = localStorage.getItem('userid');
    this.docservice.GetSickSlipGenaratorByDoctorID(this.doctorid, this.startdate, this.enddate).subscribe(
      data => {
        debugger
        this.sicksliplist = data.filter(x => x.languageID == this.languageid);
      }, error => {
      }
    )
  }

  selectedDate(data) {
    debugger
    var sdate = data.split('-')
    this.startdate = sdate[0]
    this.enddate = sdate[1]

    this.docservice.GetSickSlipGenaratorByDoctorID(this.doctorid, this.startdate, this.enddate).subscribe(
      data => {
        debugger
        this.sicksliplist = data.filter(x => x.languageID == this.languageid);
      }, error => {
      }
    )

  }




  labels1

  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginSickSlipGenerator_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_DoctorLoginSickSlipGenerator_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels1 = data;
      }, error => {
      }
    )
  }
  clickedsickslipid
  sickslipid

  docmobileno: any;
  registrationNo: any;
  hospital_ClinicName: any;


  public getdesc(sickslip) {
    debugger
    this.clickedsickslipid = sickslip.patientID;
    this.sickslipid = sickslip.id;
    //let qwerty = this.sicksliplist.filter(x => x.patientID == this.clickedsickslipid);
    let qwertyq = this.sicksliplist.filter(x => x.id == this.sickslipid);
    this.desc = qwertyq[0].description;
    this.doctorname = qwertyq[0].doctorName;
    this.docmobileno = qwertyq[0].docmobileno;
    this.registrationNo = qwertyq[0].registrationNo;
    this.hospital_ClinicName = qwertyq[0].hospital_ClinicName;
    this.address = qwertyq[0].address;
  }


  leavefor
  public UpdateSickSlip() {
    debugger
    const qwer = 'dd-MMM-yyyy';
    const pljdjf = 'en-US';
    const frdat = this.fromdate;
    this.fromdate = formatDate(frdat, qwer, pljdjf);
    const todat = this.todate;
    this.todate = formatDate(todat, qwer, pljdjf);

    if (this.languageid == 1) {
      var entity = {
        'ID': this.sickslipid,
        'Ailment': this.ailment,
        'FromDate': this.fromdate,
        'ToDate': this.todate,
        'LeaveFor': this.leavefor,
        'Description': '<p>DATE: ' + this.todaydate + '</p><p><b>SUBJECT: ' + this.leavefor + ' Sick Slip / Medical Note</b></p><p>RE: ' + this.patientname + ' </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientname + ' had a telehealth visit with me on ' + this.todate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.fromdate + '<br>End Date: ' + this.todate + '<br>Notes:' + this.ailment + '<br>' + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.user + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>",
      }
      debugger
      this.docservice.UpdateSickSlipGenarator(entity).subscribe(data => {
        debugger;

        if (this.languageid == 1) {
          document.getElementById('close1').click();
          Swal.fire('Updated successfully.');
          this.ngOnInit();
        }
        else {
          document.getElementById('close1').click();
          Swal.fire('Mis à jour avec succés');
          this.ngOnInit();
        }

      })
    }
    else {
      var entity = {
        'ID': this.sickslipid,
        'Ailment': this.ailment,
        'FromDate': this.fromdate,
        'ToDate': this.todate,
        'LeaveFor': this.leavefor,
        'Description': '<p>DATE: ' + this.todaydate + '</p><p><b>Objet: ' + ' Arrêt maladie(' + this.leavefor + ')' + '</b></p><p>Re: ' + this.patientname + ' </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;">' + 'Je soussigné(e), certifie avoir examiné le patient et prescrit un arrêt de travail.<br><br>' + 'Date de commencement :' + this.fromdate + ',<br><br>Date de fin :' + this.todate + ',<br><br>Notes complémentaires  :' + this.ailment + '<br>' + '<br>Meilleures Salutations,<br><u>' + this.user + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>"
        //'Description': '<p>DATE: ' + this.todaydate + '</p><p><b>SUBJECT: ' + this.leavefor + ' Sick Slip / Medical Note</b></p><p>RE: ' + this.patientname + ' </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientname + ' had a telehealth visit with me on ' + this.todate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.fromdate + '<br>End Date: ' + this.todate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.doctorname + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>",
      }
      debugger
      this.docservice.UpdateSickSlipGenarator(entity).subscribe(data => {
        debugger;

        if (this.languageid == 1) {
          Swal.fire('Updated successfully.');
          location.href = "#/SickSlipDashboard";
        }
        else {
          Swal.fire('Mis à jour avec succés');
          location.href = "#/SickSlipDashboard";
        }

      })
    }

  }


  public sendmail(dets) {
    this.attachmentsurl[0] = 'C:/MeridionalWebTestAPI/Images/logo/logo.png'
    var mailentity = {
      'emailto': 'srikanthreddy0905@gmail.com',
      'emailsubject': 'SICK SLIP',
      'emailbody': dets.description,
      'attachmenturl': this.attachmentsurl
    }
    debugger
    this.docservice.SendMail(mailentity).subscribe(data => {
      debugger;

      if (this.languageid == 1) {
        Swal.fire('Mail sent successfully.');

      }
      else {
        Swal.fire('Email envoyé avec succès');

      }


    })
  }
  sickslippatientid
  patientlist: any
  public GetSickSlipID() {
    debugger
    document.getElementById('close').click();
    this.sickslippatientid = this.clickedsickslipid;
    this.docservice.GetDoctorPatients(this.doctorid).subscribe(
      data => {
        debugger
        this.patientlist = data;
        this.getpatientdetail(this.sickslippatientid);
      }
    )
  }
  phonenumber: any
  email: any
  address: any
  patientid
  patientname
  doctorname
  fromdate
  todate
  ailment
  description
  sicksliplist1
  public getpatientdetail(pid) {
    debugger
    if (this.languageid == 6) {
      this.patientid = pid;
      let qwerty = this.patientlist.filter(x => x.patientID == this.patientid);
      this.patientname = qwerty[0].patientName;
      this.phonenumber = qwerty[0].mobileNumber;
      this.email = qwerty[0].emailID;
      this.address = qwerty[0].address;
      this.doctorname = qwerty[0].doctorName;
      this.docservice.GetSickSlipGenaratorByDoctorID(this.doctorid, this.startdate, this.enddate).subscribe(
        data => {
          debugger
          this.sicksliplist1 = data.filter(x => x.languageID == this.languageid);
          let temp: any = this.sicksliplist1.filter(x => x.id == this.sickslipid)
          this.fromdate = temp[0].fromDatee.toLocaleString();
          this.todate = temp[0].toDatee.toLocaleString();
          this.ailment = temp[0].ailment;
          this.leavefor = temp[0].leavefor;
          this.description = temp[0].description;
        }, error => {
        }
      )
    }
    else {
      this.patientid = pid;
      let qwerty = this.patientlist.filter(x => x.patientID == this.patientid);
      this.patientname = qwerty[0].patientName;
      this.phonenumber = qwerty[0].mobileNumber;
      this.email = qwerty[0].emailID;
      this.address = qwerty[0].address;
      this.doctorname = qwerty[0].doctorName;
      this.docservice.GetSickSlipGenaratorByDoctorID(this.doctorid, this.startdate, this.enddate).subscribe(
        data => {
          debugger
          this.sicksliplist1 = data.filter(x => x.languageID == this.languageid);
          let temp: any = this.sicksliplist1.filter(x => x.id == this.sickslipid)
          this.fromdate = temp[0].fromDateee;
          this.todate = temp[0].toDateee;
          this.ailment = temp[0].ailment;
          this.leavefor = temp[0].leavefor;
          this.description = temp[0].description;
        }, error => {
        }
      )
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sick-slip-generator',
  templateUrl: './sick-slip-generator.component.html',
  styleUrls: ['./sick-slip-generator.component.css']
})
export class SickSlipGeneratorComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public patientlist: any;
  public patientid: any;
  public ailment: any;
  public fromdate: any;
  public todate: any;
  public todaydate: any;
  public appointmentid: any;
  public doctorid: any;
  public doctorname: any;
  public patientname: any;
  public phonenumber: any;
  public email: any;
  public address: any;
  public docdd = {}
  public languageid: any;
  public labels: any;
  public leavefor: any;
  public mobiledescription: any;
  public description: any;
  paramid: any
  MobileNumber
  user
  Hospital_ClinicName
  Scholldata:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.user = localStorage.getItem('user');
    this.MobileNumber = localStorage.getItem('MobileNumber');
    this.Hospital_ClinicName = localStorage.getItem('Hospital_ClinicName');
    this.getlanguage();
    const format = 'dd-MMM-yyyy';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.doctorid = localStorage.getItem('userid');
    this.docservice.GetDoctorPatients(this.doctorid).subscribe(
      data => {
        debugger
        this.patientlist = data;
      }
    )
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.paramid = params['patientid']
      this.patientid = params['patientid'];
      this.doctorid = localStorage.getItem('userid');
      this.docservice.GetDoctorPatients(this.doctorid).subscribe(
        data => {
          debugger
          this.patientlist = data;
          this.getpatientdetail(this.patientid);
        }
      )

    }
    )

  }
  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginSickSlipGenerator_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }
  public GetPatientdetails(event) {
    debugger
    this.patientid = event.target.value
    let qwerty = this.patientlist.filter(x => x.patientID == this.patientid);
    this.patientname = qwerty[0].patientName;
    this.phonenumber = qwerty[0].mobileNumber;
    this.email = qwerty[0].emailID;
    this.address = qwerty[0].address;
    this.doctorname = qwerty[0].doctorName;

  }
  public getpatientdetail(pid) {
    debugger

    this.patientid = pid;
    let qwerty = this.patientlist.filter(x => x.patientID == this.patientid);
    this.patientname = qwerty[0].patientName;
    this.phonenumber = qwerty[0].mobileNumber;
    this.email = qwerty[0].emailID;
    this.address = qwerty[0].address;
    this.doctorname = qwerty[0].doctorName;
  }

  description1


  public  Getscholladate()
{
   if (this.languageid == 6) {
     debugger
    if (this.leavefor == 'École') {
      this.Scholldata = 'Arrêt maladie (Ecole)'
    }
    if (this.leavefor == 'Bureau') {
      debugger
      this.Scholldata = 'Arrêt maladie (Arrêt de travail)'
    }
  }
}

  public InsertSickSlipGenarator() {
    debugger
    this.description = '<p>DATE: ' + this.todaydate + '</p><p><b>Objet: ' + this.leavefor + ' Arrêt de travail (Arrêt maladie)</b></p><p>Re: ' + this.patientname + ' </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;">' + ' <p>Je soussigné(e), certifie avoir examiné le patient et prescrit un arrêt de travail</p><br>' + 'Date de commencement :' + this.fromdate + 'Date de fin :' + this.todate + 'Meilleures Salutations,<br><u>Dr. ' + this.doctorname + '</u><br></p>',
      //this.description1='<p>DATE: ' + this.todaydate + '</p><p><b>SUBJECT: ' + this.leavefor + ' Sick Slip / Medical Note</b></p><p>RE: ' + this.patientname + ' </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientname + ' had a telehealth visit with me on ' + this.todate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.fromdate + '<br>End Date: ' + this.todate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.doctorname + '</u><br>VoilaDoc</p>'
      document.getElementById("qwerty").innerHTML = this.description
    this.mobiledescription = document.getElementById("qwerty").innerText;

    const qwer = 'dd-MMM-yyyy';
    const pljdjf = 'en-US';
    const frdat = this.fromdate;
    this.fromdate = formatDate(frdat, qwer, pljdjf);
    const todat = this.todate;
    this.todate = formatDate(todat, qwer, pljdjf);
     if (this.languageid == 6) {
      if (this.leavefor == 'École') {
        this.Scholldata = 'Arrêt maladie (Ecole)'
      }
      if (this.leavefor == 'Bureau') {
        this.Scholldata = 'Arrêt maladie (Arrêt de travail)'
      }
    }
    if (this.languageid == 1) {
      var entity = {
        'PatientID': this.patientid,
        'Ailment': this.ailment,
        'FromDate': this.fromdate,
        'ToDate': this.todate,
        'SickSlipDate': this.todaydate,
        'Description': '<p>DATE: ' + this.todaydate + '</p><p><b>SUBJECT: ' + this.leavefor + ' Sick Slip / Medical Note</b></p><p>RE: ' + this.patientname + ' </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientname + ' had a telehealth visit with me on ' + this.todate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.fromdate + '<br>End Date: ' + this.todate + '<br>Notes:' + this.ailment + '<br>' + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.user + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>",
        //'Description': '<p>DATE: ' + this.todaydate + '</p><p><b>Objet: ' + this.leavefor + ' Arrêt de travail (Arrêt maladie)</b></p><p>Re: ' + this.patientname + ' </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;">' + 'Je soussigné(e), certifie avoir examiné le patient et prescrit un arrêt de travail.<br>' + 'Date de commencement :' + this.fromdate + ',<br>Date de fin :' + this.todate + '<br>Meilleures Salutations,<br><u>Dr. ' + this.doctorname + '</u><br>VoilaDoc</p>',
        'AppointmentID': 0,
        'DoctorID': this.doctorid,
        'LeaveFor': this.leavefor,
        'Mobiledescription': this.mobiledescription,
        'LanguageID': this.languageid
      }
    }
    else {
      var entity = {
        'PatientID': this.patientid,
        'Ailment': this.ailment,
        'FromDate': this.fromdate,
        'ToDate': this.todate,
        'SickSlipDate': this.todaydate,
        // 'Description': '<p>DATE: ' + this.todaydate + '</p><p><b>SUBJECT: ' + this.leavefor + ' Sick Slip / Medical Note</b></p><p>RE: ' + this.patientname + ' </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientname + ' had a telehealth visit with me on ' + this.todate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.fromdate + '<br>End Date: ' + this.todate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.doctorname + '</u><br>VoilaDoc</p>',
        'Description': '<p>DATE: ' + this.todaydate + '</p><p><b>Objet : '+ this.Scholldata + '</b></p><p>Re : ' + this.patientname + ' </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;">' + 'Je soussigné(e), certifie avoir examiné le patient et prescrit un arrêt de travail.<br><br>' + 'Date de commencement : ' + this.fromdate.toLocaleString() + ',<br><br>Date de fin : ' + this.todate.toLocaleString() + ',<br><br>Notes complémentaires  : ' + this.ailment + '<br>' + '<br>Meilleures Salutations,<br><u>' + this.user + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>",
        'AppointmentID': 0,
        'DoctorID': this.doctorid,
        'LeaveFor': this.leavefor,
        'Mobiledescription': this.mobiledescription,
        'LanguageID': this.languageid
      }
    }

    this.docservice.InsertSickSlipGenarator(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Completed', 'Details saved successfully', 'success');
        location.href = "#/SickSlipDashboard"
      }
    })
  }

}
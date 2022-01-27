import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate, NgStyle } from "@angular/common";
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { timer } from 'rxjs';
import { shallowEqualArrays } from '@angular/router/src/utils/collection';
import { NgxSpinnerService } from "ngx-spinner";


import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { debug } from 'console';
@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.component.html',
  styleUrls: ['./myappointments.component.css']
})

export class MyappointmentsComponent implements OnInit {
  unitofmeasure: any;
  dosage: any;
  sig: any;
  duration: any;
  dispensequantity: any;
  notetopharmacist: any;
  diagnosis: any;
  howmanyrefills: any;
  public miscomments: any;
  public Editor = ClassicEditor;
  icddescription: string;
  states: any;
  model: any;
  icddesc: any;
  noti: any;

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  options: NgDateRangePickerOptions;
  public appointmentlist: any;
  public doctorid: any;
  public term: any;
  public attachmentsurl1 = [];
  public attachments1 = [];
  public p: number = 1;
  public appid: any;
  public cancelid: any;
  public reason: any;
  public doctorlist: any;
  public medicinelist: any;
  public orders: any;
  public medicineid: any;
  public consumelist: any;
  public consumeid: any;
  public prescrptionlist: any;
  public medicinename: any;
  public morning: any;
  public afternoon: any;
  public evening: any;
  public night: any;
  public noofdays: any;
  public date: any;
  public patientiddd: any;
  public todaydate: any;
  public CurrentTime: any;
  public patientiddddddd: any;
  public testslist: any;
  public testid: any;
  public diatest: any;
  public qwerty = [];
  public tablecount: any;
  public diagnostictesttypename: any;
  public diapatientid: any;
  public idcount: any;
  public patientid: any;
  public appdatetime: any;
  public slots: any;
  public patientID: any;
  public appointmentID: any;
  public time: any;
  public result: any;
  public serverdate: any;
  public servertime: any;
  public serverdateandtime: any;
  public appointmentid: any;
  public appointmentdatetime: any;
  public plan: any;
  public cheif: any;
  public historyofillness: any;
  public medcondition: any;
  public meditations: any;
  public allergies: any;
  public pastsix: any;
  public socialhx: any;
  public assessment: any;
  public soapid: any;
  public bp: any;
  public hr: any;
  public temp: any;
  public extraoral: any;
  public intraoral: any;
  public radiology: any;
  public treatment: any;
  public apppppp: any;
  public appidddd: any;
  public doctorname: any;
  public slotsname: any;
  public patientidddd: any;
  public hspitalclinicname: any;
  public cancelpatientid: any;
  public canslots: any;
  public candoctorname: any;
  public canhospital_ClinicName: any;
  public vsitpatientid: any;
  public visitslots: any;
  public visidoctorname: any;
  public visithospitannae: any;
  public paemailid: any;
  public canemail: any;
  public visitemail: any;
  public term5: any;
  public subjective: any;
  public phsycialexam: any;
  public genaral: any;
  public ent: any;
  public neck: any;
  public lymphnode: any;
  public cardiovascular: any;
  public lungs: any;
  public skin: any;
  public breast: any;
  public Psychiatry: any;
  public abdomen: any;
  public genitourinary: any;
  public rectal: any;
  public extremities: any;
  public musculoskeletal: any;
  public neurological: any;
  public diagnosiscode: any;
  public sickslip: any;
  public followupplan: any;
  public signature: any;
  public notes: any;
  public imageid: any;
  public showimages: any;
  public showpatientimages: any;
  public diaappointmentID: any;
  public preappointmentid: any;
  public diapatientidddd: any;
  public dialist: any;
  public soapappoitmentid: any;
  public objective: any;
  public fromdate: any;
  public todate: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  value: any;
  public soaplist: any;
  public vedioid: any;
  public showvedioes: any;
  public patientname: any;
  public ailment: any;
  public nophoto: any;
  public novideo: any;
  public qwerty3 = [];
  public tablecuont1: any;
  public qwerty2 = [];
  public medicinenamede: any;
  public consumename: any;
  public appointmentidd: any;
  Date2: any;
  DateChanged2: boolean = false;
  Date: any;
  DateChanged: boolean = false;
  public tablecount2: any;
  public quantity: any;
  //ondemand
  public appointmentlist1: any;
  public showvondemandedioes: any;
  public tsetssslist: any;
  public testssid: any;
  public testsslist: any;
  public diagnostictestname: any;
  public dummlist: any;
  public count: any;
  public languageid: any;
  public labels: any;
  public startdates: any;
  public enddates: any;
  public docname: any;
  public clinicalinfo: any;
  labels2: any
  public misusecomments: any;
  public sigdate: any;
  MobileNumber
  public endorse: any;
  doctorsssid: any
  public apptypeid: any;
  public countryid: any;
  public cityid: any;
  public areaid: any;
  Hospital_ClinicName
  public localdoclist: any;
  public localdocid: any;
  public paidamount: any;
  public walletamount: any;
  public totaladdmoney: any;
  public selectlabel: any;

  public savetemplate: any;
  public templatename: any;

  public medicinetemplate: any;
  public medicinetemplatename: any;
  public icdcodelist: any;
  public docdepartmentid: any;
  public dummprescrptionlist: any;
  dummdialist: any;
  chatIDlist: any;
  manuallydrug: any;
  dropzonelable: any;
  earlycallnotes: any;
  public search2: any;

  public followupvisit: any;
  public todaydatess: any;

  ngOnInit() {
    this.spinner.show();
    this.languageid = localStorage.getItem('LanguageID');
    this.misuse = 0;
    this.departmentid = 0;
    this.savetemplate = 2;
    this.medicinetemplate = 2;
    this.testtemplate = 2;
    this.medicineid = 0
    this.substainable = 1
    this.manuallydrug = 2
    this.followupvisit = 0;

    this.docservice.showvid = 0;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);


    const format1 = 'dd-MM-yyyy';
    const myDate1 = new Date();
    const locale1 = 'en-US';
    this.todaydatess = formatDate(myDate1, format1, locale1);

    const llll = 'dd-MMM-yyyy';
    const sigdate = new Date();
    const locales = 'en-US';
    this.sigdate = formatDate(sigdate, llll, locales);

    this.docname = localStorage.getItem('user');
    this.MobileNumber = localStorage.getItem('MobileNumber');

    this.user = localStorage.getItem('user');


    if (this.languageid == 1) {
      this.earlycallnotes = this.user + " is available at this moment. Do you want to start the call now ?Type : Video call."
    }
    else if (this.languageid == 6) {
      this.earlycallnotes = this.user + " est disponible plus tôt. Voulez-vous commencer l'appel maintenant ? Type : téléconsultation"
    }


    if (this.languageid == 1) {
      this.signature = 'Electronically signed by ' + this.docname + ' ' + this.sigdate;
    }
    else if (this.languageid == 6) {
      this.signature = 'Signature électronique du ' + this.docname + ' ' + this.sigdate;
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
    this.languageid = localStorage.getItem('LanguageID');
    this.docdepartmentid = localStorage.getItem('departmentid')
    this.Hospital_ClinicName = localStorage.getItem('Hospital_ClinicName');
    this.getlanguage();
    this.doctorsssid = localStorage.getItem('userid');
    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);

    this.idcount = 1;


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
    this.tablecount = 0;
    this.doctorid = localStorage.getItem('userid');

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
    this.spinner.show();
    this.Getmedicinetypemaster();
    this.GetWhenConsumemedicals();
    this.getdiagnosticcentertests();
    this.spinner.show();
    this.getserverdateandtime();
    this.getdepartmentmaster();
    this.getdoctorforadmin();
    this.GetCountryMaster();
    this.GetDoctorSoapNotesTemplates()
    this.GetDoctorPrescrptionTemplates()
    this.geticdcode()
    this.GetDrugnamemaster()
    this.oberserableTimerBookDocAppoinment()
    this.observableDoctorAutoCancelledAppointments();
    this.getdiagnostictests();

    // document.getElementById('Scheduled').style.display = "block";
    this.spinner.show();
    document.getElementById("defaultOpen").style.display = "block";

    this.morning = 0;
    this.evening = 0;
    this.afternoon = 0;
    this.night = 0;
    this.quantity = 0
    this.testid = 0;
    this.testssid = 0;


    this.image = 0;

    if (this.languageid == 1) {
      this.ailment = 'No data provided'
    }
    else {
      this.ailment = 'Aucune donnée fournie'
    }

    this.spinner.show();
    this.getbookappointmentbydoctorid();
    this.getbookappointmentbydocid()
  }




  validdate: any;
  DateChange() {

    this.DateChanged = true;
    this.Date.toLocaleDateString();
    var date = this.Date.getFullYear() + '-' + (this.Date.getMonth() + 1) + '-' + this.Date.getDate();
    //this.Date = date;

    this.validdate = date
    console.log(this.validdate)

  }
  labels1: any
  public getlanguage() {
    this.spinner.show();
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.selectlabel = this.labels[0].select,
          this.search2 = this.labels[0].search
      }, error => {
      }
    )

    this.docservice.GetAdmin_DoctorLoginSickSlipGenerator_label(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        ;
        this.labels2 = data;
      },
      error => { }
    );
  }
  validdate1: any;
  DateChange2() {

    this.DateChanged2 = true;
    this.Date2.toLocaleDateString();
    var date2 = this.Date2.getFullYear() + '-' + (this.Date2.getMonth() + 1) + '-' + this.Date2.getDate();
    //this.Date2 = date2;

    this.validdate1 = date2
    console.log(this.validdate1)

  }


  oberserableTimerBookDocAppoinment() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.getbookappointmentbydoctorid();

    });
  }


  observableDoctorAutoCancelledAppointments() {
    const source = timer(1000, 20000);
    const abc = source.subscribe(val => {

      this.getbookappointDoctorNotJoinedAppointments();
    });
  }

  dummappointmentlist: any;

  public getbookappointmentbydoctorid() {

    this.docservice.GetBookAppointmentByDoctorID(this.doctorid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.spinner.hide();
        this.dummappointmentlist = data;
        this.appointmentlist = this.dummappointmentlist.filter(x => x.noShow != 1 && x.docCancelled != 1 && x.cancelled != 1)
        this.count = this.appointmentlist.length
        this.dummlist = this.appointmentlist;
        if (this.appointmentlist.length == 0) {
          this.apppppp = 1;
        }
        else {
          this.apppppp = 0;
        }
      })
  }
  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
  }



  showothertest: any;





  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.getbookappointmentbydocid();
  }
  public getbookappointmentbydocid() {
    this.docservice.GetBookAppointmentByDoctorID(this.doctorid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
        this.dummappointmentlist = data;
        this.appointmentlist = this.dummappointmentlist.filter(x => x.noShow != 1 && x.docCancelled != 1 && x.cancelled != 1)
        this.count = this.appointmentlist.length
        this.dummlist = this.appointmentlist;
        if (this.appointmentlist.length == 0) {
          this.apppppp = 1;
        }
        else {
          this.apppppp = 0;
        }
      })

  }




  public getget(even) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;

    if (even.target.value == 1) {

      let dfsfd = this.dummlist.filter(x => x.isVisited == 1);

      this.appointmentlist = dfsfd;
      this.count = this.appointmentlist.length
    }
    if (even.target.value == 2) {

      let dfsfd = this.dummlist.filter(x => x.noShow == 1);

      this.appointmentlist = dfsfd;
      this.count = this.appointmentlist.length
    }
    if (even.target.value == 3) {

      let dfsfd = this.dummlist.filter(x => x.cancelled == 1);

      this.appointmentlist = dfsfd;
      this.count = this.appointmentlist.length
    }
    if (even.target.value == 6) {

      let dfsfd = this.dummlist.filter(x => x.docCancelled == 1);

      this.appointmentlist = dfsfd;
      this.count = this.appointmentlist.length
    }
    if (even.target.value == 5) {

      let dfsfd = this.dummlist.filter(x => x.accepted == '1' && x.cancelled == '0' && x.docCancelled == '0'
        && x.isVisited == '0' && x.noShow == '0');

      this.appointmentlist = dfsfd;
      this.count = this.appointmentlist.length
    }

    if (even.target.value == 4) {
      this.getbookappointmentbydocid();
    }
  }

  public GetImagesID(id) {

    this.imageid = id;
    this.docservice.GetPatient_Illnessphotos(this.imageid).subscribe(
      data => {

        this.showimages = data;
        if (this.showimages.length == 0) {
          this.nophoto = 1
        }
        else if (this.showimages.length != 0) {
          this.nophoto = 0
        }

      }, error => {
      }
    )
  }




  checktime: any;


  public getserverdateandtime() {
    this.docservice.GetServerDateAndTime().subscribe(
      data => {

        this.serverdateandtime = data;
        this.servertime = this.serverdateandtime.presentTime,
          this.serverdate = this.serverdateandtime.todaydate,
          this.availabletime = this.serverdateandtime.presentTime,
          this.checktime = this.serverdateandtime.presentTime
      }, error => {
      }
    )
  }


  public GetDate(date) {

    this.todaydate = date;
    this.getbookappointmentbydoctorid();
    this.getbookappointmentbydocid();
  }



  public GetMisusecomments(doctorComments) {

    this.misusecomments = doctorComments;
  }
  accappointmentID: any;



  //Accept Appointment

  appointmentTypeText: any;

  public Appointmentstatus(appointmentID, patientID, notificationdate, doctorName, hospital_ClinicName, emailID, smsmobileno, appointmentTypeText) {

    if (this.languageid == 1) {
      this.doctorname = doctorName;
      this.slotsname = notificationdate;
      this.patientidddd = patientID;
      this.hspitalclinicname = hospital_ClinicName;
      this.paemailid = emailID,
        this.accappointmentID = appointmentID;
      this.appointmentTypeText = appointmentTypeText
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to Accept Appointment!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Accept!'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateAcceptedBitByDoctor(appointmentID).subscribe(res => {
            let test = res;
            this.getbookappointmentbydoctorid();
            this.getbookappointmentbydocid();
            this.InsertNotifiaction(this.appointmentTypeText);
            this.Insertnotificatiaccept(this.appointmentTypeText);
            var smsdesc = "Your " + appointmentTypeText + "  appoinment with Dr " + this.doctorname + "On " + this.slotsname + " has been accepted."

            this.SendTwiliSms(smsdesc, smsmobileno)
          })
          if (this.languageid == 1) {
            Swal.fire('Completed', 'Appointment Accepted Successfully'
            )
          }
          else if (this.languageid == 6) {
            Swal.fire('Rendez-vous accepté !.',

            )
          }

        }
        else {
          this.getbookappointmentbydoctorid();
          this.getbookappointmentbydocid();


        }
      })
    }
    else {
      this.doctorname = doctorName;
      this.slotsname = notificationdate;
      this.patientidddd = patientID;
      this.hspitalclinicname = hospital_ClinicName;
      this.paemailid = emailID;
      this.accappointmentID = appointmentID
        ;
      Swal.fire({
        title: 'Êtes-vous sûr(e) ?',
        // text: "Accepté ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'CONFIRMER',
        cancelButtonText: 'RETOUR'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateAcceptedBitByDoctor(appointmentID).subscribe(res => {
            let test = res;
            this.getbookappointmentbydoctorid();
            this.getbookappointmentbydocid();
            this.InsertNotifiaction(this.appointmentTypeText);
            this.Insertnotificatiaccept(this.appointmentTypeText);

            var smsdesc = "Votre RDV " + appointmentTypeText + " avec le Dr " + this.doctorname + " le  " + this.slotsname + " a été confirmé."
            this.SendTwiliSms(smsdesc, smsmobileno)
          })

          Swal.fire('Rendez-vous accepté !')
        }
        else {
          this.getbookappointmentbydoctorid();
          this.getbookappointmentbydocid();


        }
      })
    }
  }




  public Insertnotificatiaccept(appoinmenttypext) {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Your " + appoinmenttypext + "  appoinment with Dr " + this.doctorname + "On " + this.slotsname + " has been accepted.",
        'ToUser': this.paemailid,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre RDV " + appoinmenttypext + " avec le Dr " + this.doctorname + " le  " + this.slotsname + " a été confirmé.",
        'ToUser': this.paemailid,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }

  public InsertNotifiaction(appoinmenttypext) {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.patientidddd,
        'Notification': "Appointment confirmed",
        'Description': "Your " + appoinmenttypext + " Appointment with Dr " + this.doctorname + "On" + this.slotsname + " has been accepted.",
        'NotificationTypeID': 10,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.accappointmentID
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.patientidddd,
        'Notification': "RDV confirmé",
        'Description': "Votre RDV " + appoinmenttypext + "  avec  le Dr" + this.doctorname + " le  " + this.slotsname + "a été confirmé.",
        'NotificationTypeID': 10,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.accappointmentID
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }
  smsdesc: any;

  public SendTwiliSms(smsdesc, smsmobileno) {
    debugger
    this.docservice.SendTwillioSMS(smsmobileno, smsdesc).subscribe(data => {

    })
  }


  // cancel Appointment



  public cancelledappointment() {
    this.docservice.UpdateBookAppointmentByDocCancel(this.appid).subscribe(
      data => {

        this.updatereson();
        this.getbookappointmentbydoctorid();
        this.getbookappointmentbydocid();
        this.SendCancelPatientmail();

        // this.insercancelnotoification();
        // this.Insertnotificatiacceptforcansel();

      }, error => {
      }
    )
  }

  public cancelpatientmobileno: any;



  public canparientname: any;

  public cancelappoinement(appointmentID, patientID, notificationdate, doctorName, hospital_ClinicName, emailID, paidAmount, walletAmount, pmobileNo, details, smsmobileno, appointmentTypeText) {

    this.appid = appointmentID;
    this.cancelpatientid = patientID,
      this.canslots = notificationdate,
      this.candoctorname = doctorName,
      this.canhospital_ClinicName = hospital_ClinicName,
      this.canemail = emailID;
    this.paidamount = paidAmount;
    this.walletamount = walletAmount,
      this.cancelpatientmobileno = pmobileNo;
    this.canparientname = details.pName,
      this.phonenumber = smsmobileno,
      this.appointmentTypeText = appointmentTypeText;

    this.totaladdmoney = Number(this.walletamount) + (this.paidamount)


  }


  public updatedateails() {
    var entity = {
      'PatientID': this.cancelpatientid,
      'WalletAmount': this.totaladdmoney
    }
    this.docservice.UpdatePatientWalletDetails(entity).subscribe(data => {
      let res = data;
      // Swal.fire('Success', 'Wallet Balance Updated Successfully');
    })
  }



  public Insertnotificatiacceptforcansel(appointmenttypetext) {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Your " + appointmenttypetext + " appoinment with Dr " + this.candoctorname + " on " + this.canslots + " has not been confirmed. Please select another time or another doctor.",
        'ToUser': this.canemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {
        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "Votre RDV " + appointmenttypetext + " avec le Dr " + this.candoctorname + " le n'a pas été confirmé. Veuillez choisir un autre créneau horaire ou un autre médecin. ",
        'ToUser': this.canemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }
  public emailattchementurl = [];
  public cclist: any;
  public bcclist: any;
  // "Sorry ,The Doctor " + this.candoctorname + " Has Cancelled Your Appointment " + this.canslots + " at this" + this.canhospital_ClinicName + " has been cancelled.",

  public SendCancelPatientmail() {

    if (this.languageid == 1) {
      var emailsubject = 'Appointment cancelled by doctor'
      var body = 'Dear ' + this.canparientname + ',' + "<br><br>" + this.candoctorname + ' regrets to cancel the appointment on ' + this.canslots + '. Please open the Voiladoc app to reschedule or get a refund. Do contact our support team if you need any help.' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc'
    }
    else {
      var emailsubject = 'RDV est annulé par le médecin'
      var body = 'Dear ' + this.canparientname + ',' + "<br><br>" + this.candoctorname + ' regrette de devoir annuler votre RDV le ' + this.canslots + ". Veuillez ouvrir l'app Voiladoc pour reprogrammer ou obtenir un remboursement. Contactez notre équipe d'assistance si vous avez besoin d'aide." + "<br><br>" + 'Meilleures salutations,' + "<br>" + 'Voiladoc'
    }

    var entity = {
      'emailto': this.canemail,
      'emailsubject': emailsubject,
      'emailbody': body,
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }


  public insercancelnotoification(appointmenttypetest) {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.cancelpatientid,
        'Notification': "Appointment not confirmed",
        'Description': "Your " + appointmenttypetest + " appoinment with Dr " + this.candoctorname + " on " + this.canslots + " has not been confirmed. Please select another time or another doctor.",
        'NotificationTypeID': 11,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.appid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.cancelpatientid,
        'Notification': "RDV non confirmé",
        'Description': "Votre RDV " + appointmenttypetest + " avec le Dr " + this.candoctorname + " le n'a pas été confirmé. Veuillez choisir un autre créneau horaire ou un autre médecin. ",
        'NotificationTypeID': 11,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.appid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }



  public updatereson() {
    var entity = {
      'ID': this.appid,
      'ReasonForCancel': this.reason
    }
    this.docservice.UpdateBookAppointmentReasonForCancel(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        Swal.fire(' Cancelled', 'Appointment cancelled successfully');
        this.reason = "";
        // this.updatedateails()
        this.insercancelnotoification(this.appointmentTypeText);
        this.Insertnotificatiacceptforcansel(this.appointmentTypeText);
        var smsdesc = "Your " + this.appointmentTypeText + " appoinment with Dr " + this.candoctorname + " on " + this.canslots + " has not been confirmed. Please select another time or another doctor."
        this.SendTwiliSms(smsdesc, this.phonenumber)
      }
      else if (this.languageid == 6) {
        Swal.fire('', 'Rendez-vous rejeté');
        // this.updatedateails()
        this.reason = "";
        this.insercancelnotoification(this.appointmentTypeText);
        this.Insertnotificatiacceptforcansel(this.appointmentTypeText);

        var smsdesc = "Votre RDV" + this.appointmentTypeText + " avec le Dr " + this.candoctorname + " le n'a pas été confirmé. Veuillez choisir un autre créneau horaire ou un autre médecin. "

        this.SendTwiliSms(smsdesc, this.phonenumber)
      }

    })
  }

  // public SendTwiliSms(smsdesc,smsmobileno) {
  //   
  //   this.docservice.SendTwillioSMS(smsmobileno,smsdesc).subscribe(data => {
  //     
  //   })
  // }








  public VisitDoctorAppointmentStatus(appointmentID) {

    this.docservice.UpdateVisitedBitByDoctor(appointmentID).subscribe(
      data => {

        // Swal.fire('Completed', 'Visited Successfully');
        this.getbookappointmentbydoctorid();
        this.getbookappointmentbydocid();
        //  this.InservisitNotification()

      }, error => {
      }
    )
  }

  public Insertvisitnotificatiaccept() {

    var entity = {
      'Description': "Your Appointment with " + this.visidoctorname + " scheduled for " + this.visitslots + " at " + this.visithospitannae + " has been Visited.",
      'ToUser': this.visitemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {

      }
    })
  }

  public InservisitNotification() {
    var entity = {
      'PatientID': this.vsitpatientid,
      'Notification': "Patient Visited Successfully.",
      'Description': "Your Appointment with " + this.visidoctorname + " scheduled for " + this.visitslots + " at " + this.visithospitannae + " has been Visited.",
      'NotificationTypeID': 12,
      'Date': this.todaydate,
      'LanguageID': 1,
    }
    this.docservice.InsertNotifications(entity).subscribe(data => {

      if (data != 0) {

      }

    })
  }


  public Getmedicinetypemaster() {

    this.docservice.GetMedicineTypeMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.medicinelist = data;
      }, error => {
      }
    )
  }
  public GetMedicineID(even) {

    this.medicineid = even.target.value;
    for (let i = 0; i < this.medicinelist.length; i++) {
      if (this.medicinelist[i].id == this.medicineid) {
        this.medicinenamede = this.medicinelist[i].name
      }
    }
  }
  public GetConsumeID(even) {

    this.consumeid = even.target.value;
    for (let i = 0; i < this.consumelist.length; i++) {
      if (this.consumelist[i].id == this.consumeid) {
        this.consumename = this.consumelist[i].name
      }
    }
  }


  preslots: any
  appdate: any;
  prepatientemail: any;



  smsmobileno: any;

  public GetEarlyprescription(patientID, appointmentID, appointmentTypeID, countryID, cityID, areaID, slots, appdate, pemail, smsmobileno) {
    this.patientiddd = patientID,
      this.preappointmentid = appointmentID;
    this.apptypeid = appointmentTypeID;
    this.countryid = countryID;
    this.cityid = cityID;
    this.areaid = areaID
    this.preslots = slots
    this.appdate = appdate
    this.prepatientemail = pemail;
    this.smsmobileno = smsmobileno;
    debugger
    this.patientiddd = patientID,
      this.preappointmentid = appointmentID;
    this.apptypeid = appointmentTypeID;
    this.countryid = countryID;
    this.cityid = cityID;
    this.areaid = areaID
    this.preslots = slots
    this.appdate = appdate
    this.medicinename = "";
    this.unitofmeasure = "";
    this.dosage = "";
    this.sig = "";
    this.duration = "";
    this.dispensequantity = "";
    this.notetopharmacist = "";
    this.diagnosis = '';
    this.howmanyrefills = '';
    this.medicinetemplatename = "",
      this.medicinetemplate = 2;
    this.display = "block";
    this.docservice.GetLocalDoctorRegistrationByCityID(0, this.cityid, 0).subscribe(
      data => {

        this.localdoclist = data;

        this.localdocid = this.localdoclist[0].id

      }, error => {
      }
    )
  }





  public GetPatientid(patientID, appointmentID, appointmentTypeID, countryID, cityID, areaID, slots, appdate, pemail, smsmobileno) {

    this.patientiddd = patientID,
      this.preappointmentid = appointmentID;
    this.apptypeid = appointmentTypeID;
    this.countryid = countryID;
    this.cityid = cityID;
    this.areaid = areaID
    this.preslots = slots
    this.appdate = appdate
    this.prepatientemail = pemail;
    this.smsmobileno = smsmobileno;
    debugger
    this.getserverdateandtime();
    if (this.apptypeid == 1) {
      this.patientiddd = patientID,
        this.preappointmentid = appointmentID;
      this.apptypeid = appointmentTypeID;
      this.countryid = countryID;
      this.cityid = cityID;
      this.areaid = areaID
      this.preslots = slots
      this.appdate = appdate
      this.medicinename = "";
      this.unitofmeasure = "";
      this.dosage = "";
      this.sig = "";
      this.duration = "";
      this.dispensequantity = "";
      this.notetopharmacist = "";
      this.diagnosis = '';
      this.howmanyrefills = '';
      this.medicinetemplatename = "",
        this.medicinetemplate = 2;
      this.display = "block";
      this.docservice.GetLocalDoctorRegistrationByCityID(0, this.cityid, 0).subscribe(
        data => {

          this.localdoclist = data;

          this.localdocid = this.localdoclist[0].id
        }, error => {
        }
      )
    }
    else {

      if (this.serverdate == this.appdate) {

        if (this.servertime > this.preslots) {

          this.patientiddd = patientID,
            this.preappointmentid = appointmentID;
          this.apptypeid = appointmentTypeID;
          this.countryid = countryID;
          this.cityid = cityID;
          this.areaid = areaID
          this.preslots = slots
          this.appdate = appdate
          this.medicinename = "";
          this.unitofmeasure = "";
          this.dosage = "";
          this.sig = "";
          this.duration = "";
          this.dispensequantity = "";
          this.notetopharmacist = "";
          this.diagnosis = '';
          this.howmanyrefills = '';
          this.medicinetemplatename = "",
            this.medicinetemplate = 2;
          this.display = "block";
          this.docservice.GetLocalDoctorRegistrationByCityID(0, this.cityid, 0).subscribe(
            data => {

              this.localdoclist = data;

              this.localdocid = this.localdoclist[0].id
            }, error => {
            }
          )
        }
        else {
          if (this.languageid == 1) {
            Swal.fire('Alert', 'It is still not yet time to add a prescription.');
            this.display = "none";
          }
          else if (this.languageid == 6) {
            Swal.fire('Alert', 'Vous ne pouvez pas faire une ordonnance avant la consultation.');
            this.display = "none";
          }
        }
      }
      else {
        if (this.languageid == 1) {
          Swal.fire('Alert', 'This appointment date is Over. you can not add prescription .');
          this.display = "none";
        }
        else if (this.languageid == 6) {
          Swal.fire('Alert', "Vous ne pouvez pas créer d' ordonnance, le rendez-vous n'a pas commencé. ");
          this.display = "none";
        }

      }

    }
  }

  public GetDoctorPatientid(patientID) {

    this.patientiddddddd = patientID;
    this.getdoctorpatinetdetails();
  }

  public GetWhenConsumemedicals() {

    this.docservice.GetWhenToConsumeMasterMedicalsByLanguageID(this.languageid).subscribe(
      data => {

        this.consumelist = data;
      }, error => {
      }
    )
  }



















  // prescription




  docpretemplates: any;
  docprtemplateslist: any;
  docpretempid: any;
  substainable: any;
  drugnamelist: any;
  drugnames: any;
  dummdrugnamelist: any;

  // search1 = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(termsss => termsss.length < 1 ? []
  //       : this.drugnames.filter(z => z.toLowerCase().indexOf(termsss.toLowerCase()) > -1).slice(0, 50))
  //   )


  public GetDrugnamemaster() {

    this.docservice.GetDrugNameMaster(this.languageid).subscribe(
      data => {
        this.dummdrugnamelist = data;
        this.drugnamelist = data;

        // this.drugnames = this.drugnamelist.map(x => x.medicament);

      }, error => {
      }
    )
  }


  SerachOn: any;
  public SerchDrugName(medicinename) {

    if (medicinename == "") {
      this.SerachOn = 0;

    }
    else {
      this.SerachOn = 1;
      //  this.drugnamelist = this.dummdrugnamelist.filter((x) => x.medicinename.contains(medicinename))
      //  this.drugnamelist=this.dummdrugnamelist.filter(x=>x.medicinename)
    }
  }



  SerachtestOn: any;
  testsname: any;
  public SearchTestname(testsname) {

    if (testsname == "") {
      this.SerachtestOn = 0
    }
    else {
      this.SerachtestOn = 1;
      //  this.drugnamelist = this.dummdrugnamelist.filter((x) => x.medicinename.contains(medicinename))
      //  this.drugnamelist=this.dummdrugnamelist.filter(x=>x.medicinename)
    }
  }





  public GetDrugID(medicinename) {

    this.medicinename = medicinename
    this.SerachOn = 0
  }





  public GetDoctorPrescrptionTemplates() {

    this.docservice.GetDoctorPrescrptionTemplates().subscribe(
      data => {

        this.docpretemplates = data;
        this.docprtemplateslist = this.docpretemplates.filter(x => x.doctorID == this.doctorid)
      }, error => {
      }
    )
  }

  icrdescription: any;
  public GetDoctorPrecriptioTemplateID(even) {
    if (even.target.value != 0) {
      this.docpretempid = even.target.value;
      var list = this.docpretemplates.filter(x => x.id == this.docpretempid)
      this.duration = list[0].duration
      this.medicinename = list[0].drugName
      this.unitofmeasure = list[0].unitOfMeasure
      this.dosage = list[0].dosage
      this.sig = list[0].sig
      this.dispensequantity = list[0].dispencequnatity
      this.notetopharmacist = list[0].noteToPharmacist
      this.diagnosis = list[0].diagnosis
      this.howmanyrefills = list[0].howManyRefils
      this.medicineid = list[0].medicineTypeID
      this.icdcode = list[0].icdCode
      this.icrdescription = list[0].icdDescription
      this.icrcodeid = list[0].icdid,
        this.substainable = list[0].substainablenotPermitted
    }
    else {
      this.medicinename = "";
      this.unitofmeasure = "";
      this.dosage = "";
      this.sig = "";
      this.duration = "";
      this.dispensequantity = "";
      this.notetopharmacist = "";
      this.diagnosis = '';
      this.howmanyrefills = '';
      this.medicinetemplatename = "",
        this.medicinetemplate = 2;
      this.substainable = ""
    }
  }


  public AddDoctorPrescriptionTemplates() {
    var entity = {
      'DoctorID': this.doctorid,
      'TemplateName': this.medicinetemplatename,
      'MedicineTypeID': this.medicineid,
      'MedicineName': this.medicinename,
      'SIG': this.sig,
      'DrugName': this.medicinename,
      'UnitOfMeasure': this.unitofmeasure,
      'Dosage': this.dosage,
      'Duration': this.duration,
      'Dispencequnatity': this.dispensequantity,
      'NoteToPharmacist': this.notetopharmacist,
      'Diagnosis': this.diagnosis,
      'HowManyRefils': this.howmanyrefills,
      'ICDCode': this.icdcode,
      'ICDDescription': this.icrdescription,
      'ICDID': this.icrcodeid,
      'SubstainablenotPermitted': this.substainable
    }
    this.docservice.InsertDoctorPrescrptionTemplates(entity).subscribe(data => {

      if (data != 0) {

      }
    })
  }

  public adddetails1() {
    this.tablecuont1 = 1;
    var entity1 = {
      'Sno': this.idcount,
      'MedicineTypeID': this.medicineid,
      'DoctorID': this.doctorid,
      'PateintID': this.patientiddd,
      'LanguageID': this.languageid,
      'Date': new Date(),
      'AppointmentID': this.preappointmentid,
      'MedicineName': this.medicinename,
      'UnitOfMeasure': this.unitofmeasure,
      'Dosage': this.dosage,
      'SIG': this.sig,
      'Duration': this.duration,
      'DispenseQuantity': this.dispensequantity,
      'NoteToPharmasist': this.notetopharmacist,
      'Diagnosis': this.diagnosis,
      'ICDCode': this.icdcode,
      'ICDDescription': this.icrdescription,
      'ICDID': this.icrcodeid,
      'SubstainablenotPermitted': this.substainable,
      'HowmanyRefills': this.howmanyrefills
    }
    this.qwerty2.push(entity1);
    this.idcount = this.idcount + 1;
    if (this.medicinetemplate == 1) {
      this.AddDoctorPrescriptionTemplates()
    }

    this.medicinename = "";
    this.unitofmeasure = "";
    this.dosage = "";
    this.sig = "";
    this.duration = "";
    this.dispensequantity = "";
    this.notetopharmacist = "";
    this.diagnosis = '';
    this.howmanyrefills = '';
    this.medicinetemplatename = "",
      this.medicinetemplate = 2;
    this.icdcode = ""
    this.icrdescription = ""
    this.icrcodeid = ""

  }


  public deleteMedicines(Sno) {

    for (let i = 0; i < this.qwerty2.length; i++) {

      if (Sno == this.qwerty2[i].Sno) {

        this.qwerty2.splice(i, 1);
      }
    }

  }


  public insertdetails() {

    if (this.apptypeid == '1' || this.localdocid == '0') {
      this.endorse = 1;
    }
    if (this.apptypeid == '2' && this.localdocid != '0') {
      this.endorse = 0;
    }
    if (this.apptypeid == '2' && this.localdocid == '0') {
      this.endorse = 1;
    }
    for (let i = 0; this.qwerty2.length; i++) {
      debugger
      var entity = {
        // 'MedicineTypeID': this.qwerty2[i].MedicineTypeID,
        'DoctorID': this.qwerty2[i].DoctorID,
        'PateintID': this.qwerty2[i].PateintID,
        'LanguageID': this.qwerty2[i].LanguageID,
        'Date': new Date(),
        'AppointmentID': this.qwerty2[i].AppointmentID,
        'MedicineName': this.qwerty2[i].MedicineName,
        // 'UnitOfMeasure': this.qwerty2[i].UnitOfMeasure,
        // 'Dosage': this.qwerty2[i].Dosage,
        'SIG': this.qwerty2[i].SIG,
        // 'Duration': this.qwerty2[i].Duration,
        'DispenseQuantity': this.qwerty2[i].DispenseQuantity,
        'NoteToPharmasist': this.qwerty2[i].NoteToPharmasist,
        // 'Diagnosis': this.qwerty2[i].Diagnosis,
        'HowmanyRefills': this.qwerty2[i].HowmanyRefills,
        'LocalDoctorID': this.localdocid,
        'EndorseBit': this.endorse,
        // 'ICDCode': this.qwerty2[i].ICDCode,
        // 'ICDDescription': this.qwerty2[i].ICDDescription,
        // 'ICDID': this.qwerty2[i].ICDID,
        'SubstainablenotPermitted': this.qwerty2[i].SubstainablenotPermitted
      }

      this.docservice.InsertDoctor_PatientPrescription(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire('Completed', 'Prescription saved successfully', 'success');
            this.tablecuont1 = 0;
            this.VisitDoctorAppointmentStatus(this.preappointmentid);
            debugger

            var smsdesc = "Following your consultation with Dr " + this.user + " added prescription for you"


            // this.InsertPrscriptionNotifications()
            // this.InsertNotificationPrescription()
            this.GetDoctorPrescrptionTemplates()
            this.qwerty2 = []
            this.display = "none";
            if (this.followupvisit == 1) {
              this.docservice.UpdateBookAppointmentFollowupVisit(this.preappointmentid).subscribe(data => {
              })
              this.followupvisit = 0;
            }
          }
          else if (this.languageid == 6) {
            Swal.fire('L’ordonnance a bien été sauvegardée');
            this.tablecuont1 = 0;
            this.VisitDoctorAppointmentStatus(this.preappointmentid);
            debugger

            var smsdesc = "Suite à votre consultation avec le Dr " + this.user + "  votre ordonnance pour vos médicaments est maintant disponible dans Accueil"
            this.SendTwiliSms(smsdesc, this.smsmobileno)
            debugger
            debugger

            this.GetDoctorPrescrptionTemplates()
            this.qwerty2 = []
            this.display = "none";
            if (this.followupvisit == 1) {
              this.docservice.UpdateBookAppointmentFollowupVisit(this.preappointmentid).subscribe(data => {

              })
              this.followupvisit = 0;
            }
          }
        }
      })
    }
    this.InsertPrscriptionNotifications()
    this.InsertNotificationPrescription()


  }

  public InsertNotificationPrescription() {
    if (this.languageid == 1) {
      var entity = {
        'Description': this.user + " has added Prescription for you. ",
        'ToUser': this.prepatientemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == 6) {
      var entity = {
        'Description': this.user + " Votre rapport de consultation est maintenant disponible dans Mon dossier médical",
        'ToUser': this.prepatientemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }

  }


  public InsertPrscriptionNotifications() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.patientiddd,
        'Notification': "Prescription from doctor",
        'Description': "Following your consultation with Dr " + this.user + " added prescription for you",
        'NotificationTypeID': 101,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.preappointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.patientiddd,
        'Notification': "Médicaments du médecin",
        'Description': "Suite à votre consultation avec le Dr " + this.user + "  votre ordonnance pour vos médicaments est maintant disponible dans Accueil",
        'NotificationTypeID': 101,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.preappointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }




  public clear1() {
    this.medicinename = "";
    this.morning = "";
    this.afternoon = "";
    this.evening = "";
    this.night = "";
    this.noofdays = "";
  }

  public getdoctorpatinetdetails() {

    if (this.docdepartmentid == 14) {
      this.docservice.GetDoctor_PatientPrescriptionByDoctorIDandPatientID(this.patientiddddddd, this.languageid, this.doctorid).subscribe(
        data => {

          this.prescrptionlist = data;
        }, error => {
        }
      )
    }
    else if (this.docdepartmentid != 14) {
      this.docservice.GetDoctor_PatientPrescriptionByDoctorIDandPatientID(this.patientiddddddd, this.languageid, this.doctorid).subscribe(
        data => {

          this.dummprescrptionlist = data;
          this.prescrptionlist = this.dummprescrptionlist.filter(x => x.departmentID != 14)
        }, error => {
        }
      )
    }
  }





  public GetPriviouesPrescriptionlist(presciption) {

    this.editprescid = presciption.id,
      this.medicinename = presciption.medicineName,
      this.sig = presciption.sig,
      this.notetopharmacist = presciption.noteToPharmasist,
      this.howmanyrefills = presciption.howmanyRefills,
      this.substainable = presciption.substainablenotPermitted,
      this.dispensequantity = presciption.dispenseQuantity
  }

  editprescid: any;


  public updateprescription() {
    var entity =
    {
      'ID': this.editprescid,
      'MedicineName': this.medicinename,
      'SIG': this.sig,
      'DispenseQuantity': this.dispensequantity,
      'NoteToPharmasist': this.notetopharmacist,
      'HowmanyRefills': this.howmanyrefills,
      'SubstainablenotPermitted': this.substainable
    }
    this.docservice.UpdateDoctor_PatientPrescriptionWeb(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Updated successfully');
        this.getdoctorpatinetdetails();
      }
      else {
        Swal.fire('Mis à jour avec succés');
        this.getdoctorpatinetdetails();
      }

    })
  }

  //prescrptio end 


  //getearlyprescription


  public GetEarlyDiaTest(patientID, appointmentID, appdate, slots, pemail, smsmobileno) {
    this.diapatientid = patientID;
    this.diaappointmentID = appointmentID;
    this.appdate = appdate
    this.slots = slots,
      this.testpatientemail = pemail
    this.testdisplay = "block";
    this.diapatientid = patientID;

    this.diaappointmentID = appointmentID;
    this.appdate = appdate
    this.slots = slots
    this.smsmobileno = smsmobileno
    this.GetDiagnpsticDoctorTemplates();
  }



  testdisplay: any;
  testpatientemail: any;


  public GetDiatestPatientid(patientID, appointmentID, appdate, slots, pemail, smsmobileno, appointmentTypeID) {

    this.diapatientid = patientID;
    this.diaappointmentID = appointmentID;
    this.appdate = appdate
    this.slots = slots,
      this.testpatientemail = pemail

    if (appointmentTypeID == 1) {
      this.testdisplay = "block";
      this.diapatientid = patientID;
      this.diaappointmentID = appointmentID;
      this.appdate = appdate
      this.slots = slots
      this.smsmobileno = smsmobileno

      this.GetDiagnpsticDoctorTemplates()
    }
    else {




      if (this.serverdate == this.appdate) {
        if (this.servertime > this.slots) {
          this.testdisplay = "block";
          this.diapatientid = patientID;
          this.diaappointmentID = appointmentID;
          this.appdate = appdate
          this.slots = slots
          this.smsmobileno = smsmobileno

          this.GetDiagnpsticDoctorTemplates()
        }
        else {
          if (this.languageid == 1) {
            Swal.fire('Alert', 'It is still not yet time to add a diagnostic test.');
            this.testdisplay = "none";
          }
          else if (this.languageid == 6) {
            Swal.fire('Alerte', 'Vous ne pouvez prescrire des tests qu’une fois la consultation commencée');
            this.testdisplay = "none";
          }
        }
      }
      else {
        if (this.languageid == 1) {
          Swal.fire('Alert', 'This appointment date is Over. you can not add diagnostic test.');
          this.testdisplay = "none";
        }
        else if (this.languageid == 6) {
          Swal.fire('Alerte', "Vous ne pouvez pas créer de prescription de test de laboratoire, le rendez-vous n'a pas commencé.  ");
          this.testdisplay = "none";
        }

      }
    }
  }

  public getdiagnosticcentertests() {

    this.docservice.GetDiagnosticTestTypeMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.testslist = data;
      }, error => {
      }
    )
  }

  public GetDiagnosticTestID(even) {

    this.testid = even.target.value;
    for (let i = 0; i < this.testslist.length; i++) {

      if (this.testslist[i].id == this.testid) {
        this.diagnostictesttypename = this.testslist[i].name
      }
    }

  }

  public getdiagnostictests() {
    this.docservice.GetDiagnosticTestMasterByTestIDByLanguageID(1, this.languageid).subscribe(
      data => {

        this.tsetssslist = data;
        this.tsetssslist[0]["checked"] = false;
        console.log("testsss", this.tsetssslist)
      }, error => {
      }
    )
  }
  TestTemplateList: any;
  dummtemalelist: any;

  public GetDiagnpsticDoctorTemplates() {
    this.docservice.GetDiagnosticTest_DoctorTemplate(this.doctorid).subscribe(
      data => {


        this.dummtemalelist = data;
        this.TestTemplateList = this.dummtemalelist.filter(x => x.doctorID == this.doctorid)
      }, error => {
      }
    )
  }

  public GetDiagnosticTestssID(even) {
    this.testssid = even.target.value;
    if (this.testssid == 59 || this.testssid == 60) {
      this.diagnostictestname = ""
    }
    else {
      for (let i = 0; i < this.tsetssslist.length; i++) {
        if (this.tsetssslist[i].id == this.testssid) {
          this.diagnostictestname = this.tsetssslist[i].short
        }
      }
    }
  }

  testtemplate: any;
  testtemplatename: any;


  public GetTestTemplateID(even) {
    if (even.target.value != 0) {

      this.templateid = even.target.value;
      var list = this.TestTemplateList.filter(x => x.id == this.templateid)
      this.testid = list[0].testTypeID
      this.testssid = list[0].testID
      this.clinicalinfo = list[0].clinicalInfo,
        this.testtemplatename = list[0].templateName

      this.getdiagnostictests()
      // this.getdiagnosticcentertests()

      var list1 = this.testslist.filter(x => x.id == this.testid)
      this.diagnostictesttypename = list1[0].name

      this.docservice.GetDiagnosticTestMasterByTestIDByLanguageID(this.testid, this.languageid).subscribe(
        data => {

          this.tsetssslist = data;
          var list2 = this.tsetssslist.filter(x => x.id == this.testssid)
          this.diagnostictestname = list2[0].short

        }, error => {
        }
      )
      // for (let i = 0; i < this.testslist.length; i++) {

      //   if (this.testslist[i].id == this.testid) {
      //     this.diagnostictesttypename = this.testslist[i].name
      //   }
      // }
      // for (let i = 0; i < this.tsetssslist.length; i++) {
      //   if (this.tsetssslist[i].id == this.testssid) {
      //     this.diagnostictestname = this.tsetssslist[i].short
      //   }
      // }

    }
    else {
      this.testid = 0
      this.testssid = 0
    }
  }



  public adddetails() {
    if (this.testid == undefined || this.testid == 0 || this.testssid == 0 || this.testssid == undefined) {

      if (this.languageid == 1) {
        Swal.fire('Please Fill Manadatory Fields');
      }
      else {
        Swal.fire('Veuillez remplir les champs obligatoires*');
      }

    }
    else {

      this.tablecount = 1;
      var entity = {
        'Sno': this.idcount,
        'DiagnosticTestTypeID': this.testid,
        'DiagnosticTestName': this.diatest,
        'DiagnosticTestTypeName': this.diagnostictesttypename,
        'TestName': this.diagnostictestname,
        'TestID': this.testssid,
        'ClinicalInfo': this.clinicalinfo
      }
      this.qwerty.push(entity);
      if (this.testtemplate == 1) {
        this.SaveTestTemplate()
      }
      if (this.templateid != 0) {
        this.UpdateTemplte()
      }
      this.idcount = this.idcount + 1;
      this.diatest = "";
      this.testslist.length = 0;
      this.tsetssslist.length = 0;
      this.diagnostictestname = ""
      this.testid = 0;
      this.testssid = 0;
      this.testtemplate = 2;
      this.getdiagnosticcentertests();
      this.GetDiagnpsticDoctorTemplates();
    }
  }


  public SaveTestTemplate() {
    var entity = {
      'DoctorID': this.doctorid,
      'TestTypeID': this.testid,
      'TestID': this.testssid,
      'AppointmentTypeID': this.diaappointmentID,
      'ClinicalInfo': this.clinicalinfo,
      'TemplateName': this.testtemplatename
    }
    this.docservice.InsertDiagnosticTest_DoctorTemplate(entity).subscribe(data => {
      this.GetDiagnpsticDoctorTemplates();
    })
  }

  public UpdateTemplte() {
    var entity = {
      'ID': this.templateid,
      'DoctorID': this.doctorid,
      'TestTypeID': this.testid,
      'TestID': this.testssid,
      'AppointmentTypeID': this.diaappointmentID,
      'ClinicalInfo': this.clinicalinfo,
      'TemplateName': this.testtemplatename
    }
    this.docservice.UpdateDiagnosticTest_DoctorTemplate(entity).subscribe(data => {
      this.GetDiagnpsticDoctorTemplates();
    })
  }



  public insertDiagnostictestdetails() {
    if (this.languageid == 1) {
      var smsdesc = "Following your consultation with Dr " + this.user + " your prescription for lab tests is now available in homepage."
      this.SendTwiliSms(smsdesc, this.smsmobileno)
    }
    else {
      debugger
      var smsdesc = "Suite à votre consultation avec le Dr " + this.user + ", votre ordonnance pour vos examens médicaux est maintant disponible dans Accueil."
      this.SendTwiliSms(smsdesc, this.smsmobileno)
    }
    debugger
    var checktestlist = this.tsetssslist.filter(x => x.checked == true)
    debugger
    for (let i = 0; i < checktestlist.length; i++) {
      debugger
      var entity = {
        'DoctorID': this.doctorid,
        'PateintID': this.diapatientid,
        'DiagnosticTestTypeID': 1,
        'DiagnosticTestName': checktestlist[i].short,
        'LanguageID': this.languageid,
        'AppointmentID': this.diaappointmentID,
        'TestsID': checktestlist[i].id,
        'ClinicalInfo': 0
      }
      this.docservice.InsertDoctor_PatientDiagnostics(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire('Completed', 'Diagnostic Tests Added successfully', 'success');
            checktestlist = [];
            checktestlist = 0;
            this.testdisplay = "none";
            document.getElementById("close").click();
            this.getdiagnostictests();
            this.SerachtestOn = 0;
            this.testsname = "";
            this.VisitDoctorAppointmentStatus(this.diaappointmentID);
            this.Insertnotificationtestazure();
            this.Insertnotificationtest()
            this.tablecount = 0;
            this.testid.length = 0;
            // this.tsetssslist = 0;
            this.testssid = 0;

            if (this.followupvisit == 1) {
              this.docservice.UpdateBookAppointmentFollowupVisit(this.diaappointmentID).subscribe(data => {
              })

            }
            this.followupvisit = 0;
          }
          else if (this.languageid == 6) {
            Swal.fire('Détails enregistrés', 'Test de laboratoire', 'success');
            this.testdisplay = "none";
            document.getElementById("close").click();
            this.qwerty = [];
            this.qwerty.length = 0;
            this.getdiagnostictests();
            this.SerachtestOn = 0;
            this.testsname = "";
            this.VisitDoctorAppointmentStatus(this.diaappointmentID);
            this.Insertnotificationtestazure()
            this.Insertnotificationtest()
            this.tablecount = 0;
            this.testid.length = 0;
            this.tsetssslist = 0;
            this.testssid = 0;
            this.SerachtestOn = 0;


            if (this.followupvisit == 1) {
              this.docservice.UpdateBookAppointmentFollowupVisit(this.diaappointmentID).subscribe(data => {
              })

            }
            this.followupvisit = 0;
          }

        }
      })
    }

    if (this.languageid == 1) {
      var smsdesc = "Following your consultation with Dr " + this.user + " your prescription for lab tests is now available in homepage."
      this.SendTwiliSms(smsdesc, this.smsmobileno)
    }
    else {
      debugger
      var smsdesc = "Suite à votre consultation avec le Dr " + this.user + ", votre ordonnance pour vos examens médicaux est maintant disponible dans Accueil."
      this.SendTwiliSms(smsdesc, this.smsmobileno)
    }
  }

  public Insertnotificationtestazure() {
    if (this.languageid == 1) {
      var entity = {
        'Description': "Following your consultation with Dr " + this.user + " your prescription for lab tests is now available in homepage.",
        'ToUser': this.testpatientemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == 6) {
      var entity = {
        'Description': "Suite à votre consultation avec le Dr " + this.user + ", votre ordonnance pour vos examens médicaux est maintant disponible dans Accueil.",
        'ToUser': this.testpatientemail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }

  }


  public insertDiagnostictest() {
    debugger
    var entity = {
      'DoctorID': this.doctorid,
      'PateintID': this.diapatientid,
      'DiagnosticTestTypeID': 1,
      'DiagnosticTestName': this.diagnostictestname,
      'LanguageID': this.languageid,
      'AppointmentID': this.diaappointmentID,
      'TestsID': 59,
      'ClinicalInfo': 0
    }
    this.docservice.InsertDoctor_PatientDiagnostics(entity).subscribe(data => {
      debugger
      if (data != 0) {
        if (this.languageid == 1) {
          Swal.fire('Completed', 'Diagnostic Tests Added successfully', 'success');
          debugger
          this.testdisplay = "none";
          document.getElementById("close").click();
          this.getdiagnostictests();
          this.SerachtestOn = 0;
          this.testsname = "";
          this.VisitDoctorAppointmentStatus(this.diaappointmentID);
          this.Insertnotificationtestazure();
          this.Insertnotificationtest()
          this.tablecount = 0;
          this.testid.length = 0;
          // this.tsetssslist = 0;
          this.testssid = 0;
          this.diagnostictestname = ""



          if (this.followupvisit == 1) {
            this.docservice.UpdateBookAppointmentFollowupVisit(this.diaappointmentID).subscribe(data => {
            })

          }
          this.followupvisit = 0;
        }
        else if (this.languageid == 6) {
          Swal.fire('Détails enregistrés', 'Test de laboratoire', 'success');
          this.testdisplay = "none";
          document.getElementById("close").click();
          this.qwerty = [];
          this.qwerty.length = 0;
          this.getdiagnostictests();
          this.SerachtestOn = 0;
          this.testsname = "";
          this.VisitDoctorAppointmentStatus(this.diaappointmentID);
          this.Insertnotificationtestazure()
          this.Insertnotificationtest()
          this.tablecount = 0;
          this.testid.length = 0;
          this.tsetssslist = 0;
          this.testssid = 0;
          this.SerachtestOn = 0;
          this.diagnostictestname = ""


          if (this.followupvisit == 1) {
            this.docservice.UpdateBookAppointmentFollowupVisit(this.diaappointmentID).subscribe(data => {
            })

          }
          this.followupvisit = 0;
        }

      }
    })
  }




  public Insertnotificationtest() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.diapatientid,
        'Notification': this.user + " added diagnostic test for you. ",
        'Description': "Following your consultation with Dr " + this.user + " your prescription for lab tests is now available in homepage.",
        'NotificationTypeID': 102,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.diaappointmentID
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.diapatientid,
        'Notification': this.user + " Vos résultats d'analyses sont maintenant disponibles dans Mon dossier médical.",
        'Description': this.user + " Vos résultats d'analyses sont maintenant disponibles dans Mon dossier médical.",
        'NotificationTypeID': 102,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.diaappointmentID
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }


  public delete(Sno) {

    for (let i = 0; i < this.qwerty.length; i++) {

      if (Sno == this.qwerty[i].Sno) {

        this.qwerty.splice(i, 1);
      }
    }

  }
  public deleteprscriptonforpatient(id) {
    ;
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Appointment!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteDoctor_PatientPrescription(id).subscribe(res => {
          let test = res;
          this.getdoctorpatinetdetails();
        })
        Swal.fire(
          'Deleted!',
          'Prescription has been deleted.',
          'success'
        )
      }
      else {
        this.getdoctorpatinetdetails();
      }
    })
  }

  public GetDiaID(patientID) {

    this.diapatientidddd = patientID;
    this.getdiadnosticdetails();
  }
  public getdiadnosticdetails() {
    if (this.docdepartmentid == 14) {
      this.docservice.GetDoctor_PatientDiagnosticsByPatient(this.diapatientidddd, this.languageid, this.doctorid).subscribe(
        data => {

          this.dialist = data;
        }, error => {
        }
      )
    }
    else if (this.docdepartmentid != 14) {
      this.docservice.GetDoctor_PatientDiagnosticsByPatient(this.diapatientidddd, this.languageid, this.doctorid).subscribe(
        data => {

          this.dummdialist = data;
          this.dialist = this.dummdialist.filter(x => x.departmentID != 14)
        }, error => {
        }
      )
    }

  }

  editdiaid: any;

  public GetDiaEditList(dia) {

    this.editdiaid = dia.id,
      this.testid = dia.diagnosticTestTypeID,
      this.testssid = dia.testsID,
      this.clinicalinfo = dia.clinicalInfo
    this.getdiagnostictests();
  }


  public updatedignostictest() {

    var diatest = {
      'ID': this.editdiaid,
      'DiagnosticTestTypeID': this.testid,
      'DiagnosticTestName': this.diagnostictestname,
      'TestsID': this.testssid,
      'ClinicalInfo': this.clinicalinfo
    }
    this.docservice.UpdateDoctor_PatientDiagnostics(diatest).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Updated successfully');
        this.getdiadnosticdetails();
      }
      else {
        Swal.fire('Mis à jour avec succés');
        this.getdiadnosticdetails();
      }

    })
  }





  //early video call




  public GetVideoconfrenceEarlycall(patientID, appointmentID, appdate, slots, endtime) {
    localStorage.setItem('patientID', patientID);
    localStorage.setItem('appointmentID', appointmentID);
    localStorage.setItem('appdate', appdate);

    this.docservice.showvid = 1;
    window.open("#/Vediocall", "_blank");

  }

  public getvedioconferencebydateandtime(patientID, appointmentID, appdate, slots, endtime) {
    localStorage.setItem('patientID', patientID);
    localStorage.setItem('appointmentID', appointmentID);
    localStorage.setItem('appdate', appdate);

    // this.docservice.showvid = 1;

    //  window.open("#/Vediocall", "_blank");
    this.getserverdateandtime();
    if (this.serverdate == appdate) {

      if (this.servertime >= slots) {

        if (this.servertime <= endtime) {

          this.docservice.showvid = 1;

          window.open("#/Vediocall", "_blank");
        }
        else {
          if (this.languageid == 1) {
            Swal.fire('Alert', 'Your Exceeded Video Conference Time  ');


          }
          else if (this.languageid == 6) {
            Swal.fire('L heure du rendez-vous est déjà passée');
            // + endtime)
          }
        }
      }
      else {
        if (this.languageid == 1) {
          Swal.fire('Alert', 'It is Still not yet Time to start the Video conference. You Can Start At ' + slots);

        }
        else if (this.languageid == 6) {
          Swal.fire('Votre rendez-vous est à ' + slots);
        }
      }
    }
    else {
      if (this.languageid == 1) {
        Swal.fire('Alert', 'It is Still not yet Time to start the Video conference. You Can Start At ' + slots + ' on ' + appdate);

      }
      else if (this.languageid == 6) {
        Swal.fire('Alert', 'Votre rendez-vous est à ' + slots + ' on ' + appdate);
      }
    }
  }
  // public GetChatByDateandTime(patientID, appointmentID, appdate, slots) {
  //   localStorage.setItem('patientID', patientID);
  //   localStorage.setItem('appointmentID', appointmentID);
  //   localStorage.setItem('appdate', appdate);
  //   

  //   
  //   this.getserverdateandtime();
  //   
  //   if (this.serverdate == appdate) {
  //     
  //     if (this.servertime >= slots) {
  //       location.href = '#/Mychats';

  //     }
  //     else {
  //       Swal.fire('Alert', 'You Can Start Chat At ' + slots)
  //     }

  //   }
  //   else {
  //     Swal.fire('Alert', 'You Can Start Chat At ' + slots + ' on ' + appdate)
  //   }
  // }



  public getvedioconferencebydateandtimedemand(patientID, appointmentID, appdate, slots, endtime, completed) {



    localStorage.setItem('patientID', patientID);
    localStorage.setItem('appointmentID', appointmentID);
    localStorage.setItem('appdate', appdate);
    this.getserverdateandtime();
    if (completed == 2) {
      if (this.languageid == 1) {
        Swal.fire("Session Ended");
      }
      else {
        Swal.fire("Session terminée ");
      }
    }
    else {
      if (this.serverdate == appdate) {
        if (this.servertime >= slots) {
          if (this.servertime <= endtime) {
            // location.href = '#/Vediocall';
            window.open("#/Vediocall", "_blank");

          }
          else {
            if (this.languageid == 1) {
              Swal.fire('Alert', 'Your Exceeded Video Conference Time  ');

            }
            else if (this.languageid == 6) {
              Swal.fire('L’heure du rendez-vous est passée, le patient a été remboursé.');
            }
            // Swal.fire('Alert', 'Your Exceeded Video Conference Time  ' + endtime);
          }
        }
        else {
          if (this.languageid == 1) {
            Swal.fire('Alert', 'It is Still not yet Time to start the Video conference. You Can Start At ' + slots);

          }
          else if (this.languageid == 6) {
            Swal.fire('Votre rendez-vous est à ' + slots);
          }
          // Swal.fire('Alert', 'You Can Start Video Conference At ' + slots)
        }
      }
      else {
        if (this.languageid == 1) {
          Swal.fire('Alert', 'It is Still not yet Time to start the Video conference. You Can Start At ' + slots + ' on ' + appdate);

        }
        else if (this.languageid == 6) {
          Swal.fire('Alerte rendez-vous', 'Votre rendez-vous est à ' + slots + ' le ' + appdate);
        }
        // Swal.fire('Alert', 'You Can Start Video Conference At ' + slots + ' on ' + appdate)
      }
    }



  }

  misuse: any;

  public GetPateintMisUseCheck(even) {

    if (even.target.checked == true) {
      this.misuse = 1;
    }
    else {

      this.misuse = 0;
    }
  }


  public updatecomments() {

    var entity = {
      'ID': this.patientid,
      'MisUseComments': this.miscomments
    }
    this.docservice.UpdatePatientRegistrationMisUseComments(entity).subscribe(res => {
      let test = res;

    })
  }
  pemailsoap: any;


  public GetEarlySoap(patientID, adate, appointmentID, appdate, slots, pemail, smsmobileno, categoryid) {
    this.patientid = patientID;
    this.appointmentdatetime = adate;
    this.appointmentid = appointmentID;
    this.appdate = appdate;
    this.pemailsoap = pemail;
    this.slots = slots
    this.smsmobileno = smsmobileno;
    this.categoryid = categoryid;

    this.soapdisplay = "block"

    this.objective = "",
      this.subjective = "",
      this.assessment = "",
      this.diagnosiscode = "",
      this.followupplan = "",
      this.notes = ""
    this.plan = ""

    this.savetemplate = 2
    let list = this.appointmentlist.filter(x => x.appointmentID == this.appointmentid)

    this.patientname = list[0].patientName
    this.ailment = list[0].reasonForVisit
  }



  categoryid: any;

  public GetSoapID(patientID, adate, appointmentID, appdate, slots, pemail, smsmobileno, categoryid, appointmentTypeID) {

    this.patientid = patientID;
    this.appointmentdatetime = adate;
    this.appointmentid = appointmentID;
    this.appdate = appdate;
    this.pemailsoap = pemail;
    this.slots = slots
    this.categoryid = categoryid;
    this.smsmobileno = smsmobileno
    if (appointmentTypeID == 1) {
      this.soapdisplay = "block"

      this.objective = "",
        this.subjective = "",
        this.assessment = "",
        this.diagnosiscode = "",
        this.followupplan = "",
        this.notes = ""
      this.plan = ""

      this.savetemplate = 2
      let list = this.appointmentlist.filter(x => x.appointmentID == this.appointmentid)

      this.patientname = list[0].patientName
      this.ailment = list[0].reasonForVisit
    }
    else {
      if (this.serverdate == this.appdate) {
        if (this.servertime > this.slots) {
          this.soapdisplay = "block"

          this.objective = "",
            this.subjective = "",
            this.assessment = "",
            this.diagnosiscode = "",
            this.followupplan = "",
            this.notes = ""
          this.plan = ""

          this.savetemplate = 2
          let list = this.appointmentlist.filter(x => x.appointmentID == this.appointmentid)

          this.patientname = list[0].patientName
          this.ailment = list[0].reasonForVisit
        }
        else {
          if (this.languageid == 1) {
            Swal.fire('Alert', 'It is still not yet time to add a soap notes.');
            this.soapdisplay = "none"
          }
          else if (this.languageid == 6) {
            Swal.fire('', 'Vous ne pouvez renseigner les notes SOAP  qu un fois la consultation commencée');
            this.soapdisplay = "none"
          }
        }
      }
      else {
        if (this.languageid == 1) {
          Swal.fire('Alert', 'This appointment date is over. you can not add soap notes');
          this.soapdisplay = "none"
        }
        else if (this.languageid == 6) {
          Swal.fire('Alert', "Vous ne pouvez pas créer de notes SOAP, le rendez-vous n'a pas commencé.");
          this.soapdisplay = "none"
        }

      }
    }
    // for(let i=0;i<this.appointmentlist.length;i++)
    // {
    //   
    //   if(this.appointmentlist[i].id==this.appointmentid)
    //   {
    //     
    //     this.patientname=this.appointmentlist[i].patientName,
    //     this.ailment=this.appointmentlist[i].reasonForVisit

    //   }
    // }

  }

  // public InsertSickSlipGenarator() {
  //   
  //   var entity = {
  //     'PatientID': this.patientid,
  //     'Ailment': this.ailment,
  //     'FromDate': this.fromdate,
  //     'ToDate': this.todate,
  //     'SickSlipDate': this.todaydate,
  //     'Description': 0,
  //     'AppointmentID': this.appointmentid
  //   }
  //   this.docservice.InsertSickSlipGenarator(entity).subscribe(data => {
  //     if (data != 0) {
  //       Swal.fire('Completed', 'Details saved successfully', 'success');
  //       this.clear()

  //     }
  //   })
  // }





  public UploadSoapAttchments(abcd) {

    this.dummprescriptionphotourl = []

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments1.push(abcd.addedFiles[0]);
    this.uploadSoAPattachmentss();
    // }

    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }
  }

  public shoprescphoto = [];

  public uploadSoAPattachmentss() {
    this.shoprescphoto = [];
    this.attachmentsurl1 = [];

    let folder = this.patientid + '/' + 'SoapNotes'
    this.docservice.UploadPatientDocuments(this.attachments1, folder).subscribe(res => {
      this.attachmentsurl1.push(res);
      this.dummprescriptionphotourl.push(res);
      let a = this.attachmentsurl1[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      if (this.attachments1[0].type == 'image/jpeg') {

        this.shoprescphoto.push(b)
      }
      else if (this.attachments1[0].type == 'application/pdf') {

        this.shoprescphoto.push('assets/Images/pdf.png')
      }

      this.attachments1.length = 0;

    })
    // this.sendattachment();
  }


  doctemplatelist: any;
  templatelist: any;
  templateid: any;

  public GetDoctorSoapNotesTemplates() {

    this.docservice.GetDoctorSoapNotesTemplates().subscribe(
      data => {

        this.doctemplatelist = data;
        this.templatelist = this.doctemplatelist.filter(x => x.doctorID == this.doctorid)
      }, error => {
      }
    )
  }


  public GetTemplateID(even) {
    if (even.target.value != 0) {

      this.templateid = even.target.value;
      var list = this.doctemplatelist.filter(x => x.id == this.templateid)
      this.subjective = list[0].subjective,
        this.objective = list[0].objective,
        this.assessment = list[0].assesment,
        this.plan = list[0].plan,
        this.diagnosiscode = list[0].diagnosisCode,
        this.followupplan = list[0].followUpPlan,
        this.signature = list[0].signature,
        this.notes = list[0].notes,
        this.icdcode = list[0].icrCode,
        this.icrcodeid = list[0].icrID,
        this.icddesc = list[0].icrDescrption
    }
    else {
      this.objective = "",
        this.subjective = "",
        this.assessment = "",
        this.diagnosiscode = "",
        this.followupplan = "",
        this.notes = ""
      this.plan = ""
      this.signature = ""
      this.icddesc = "",
        this.icdcode = ""
    }
  }

  public InsertDoctorSoapNoteTemplate() {
    var entity = {
      'DoctorID': this.doctorid,
      'TemplateName': this.templatename,
      'Subjective': this.subjective,
      'Objective': this.objective,
      'Assesment': this.assessment,
      'Plan': this.plan,
      'DiagnosisCode': this.diagnosiscode,
      'FollowUpPlan': this.followupplan,
      'Signature': this.signature,
      'Notes': this.notes,
      'LanguageID': this.languageid,
      'IcrCode': this.icdcode,
      'IcrDescrption': this.icddesc,
      'IcrID': this.icrcodeid
    }

    this.docservice.InsertDoctorSoapNotesTemplates(entity).subscribe(data => {
      if (data != 0) {

        // Swal.fire('Completed', 'Details saved successfully', 'success');
        this.GetDoctorSoapNotesTemplates()


      }
    })
  }



  icrcodedummlist: any;
  icdcode: any;
  icrcodeid: any;
  icddmmmms = []

  public geticdcode() {
    this.docservice.GetICDCodeMaster(this.languageid).subscribe(
      data => {
        ;
        this.icrcodedummlist = data;
        this.icdcodelist = data;

        this.states = this.icdcodelist.map(x => x.description);
      },
      error => { }
    );
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),

      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 100))
    )

  showsearchsoap: any;

  public SearchIcrCode() {

    if (this.icddesc == '') {
      this.icdcode = ''
      this.showsearchsoap = 0
    }
    else {
      // let wqew = this.icdcodelist.filter(v => v.description.toLowerCase().indexOf(this.icddesc.toLowerCase()) > -1);
      // this.icdcode = wqew[0].icdCode,
      //   this.icrcodeid = wqew[0].id
      this.showsearchsoap = 1;

    }
  }

  public GetIcrCodeID(id, description, icdCode) {
    this.icdcode = icdCode,
      this.icrcodeid = id
    this.icddesc = description
    this.showsearchsoap = 0
  }

  public insertsoapnotes1() {
    var entity = {
      'DoctorID': this.doctorid,
      'PatientID': this.patientid,
      'AppointmentID': this.appointmentid,
      'AppointmentDate': this.appointmentdatetime,
      'Subjective': this.subjective,
      'Objective': this.objective,
      'Assessment': this.assessment,
      'Plan': this.plan,
      'FollowUpPlan': this.followupplan,
      'DiagnosisCode': this.icdcode,
      'Notes': this.notes,
      'LanguageID': this.languageid,
      'ICRCode': this.icdcode,
      'ICRDescription': this.icddesc,
      'ICRID': this.icrcodeid,
      'AttachmentUrl': this.attachmentsurl1[0],
      'Signature': this.signature
    }
    this.docservice.InsertDoctor_PatientSoapNotes1(entity).subscribe(data => {
      if (data != 0) {
        this.soapid = data;

        // this.insertsoapnotes2();
        // this.insertsoapnotes3();
        // this.insertsoapnotes4();
        this.Insertnotificationsoapnotesazuere()
        this.InsertNotificationSoapnotes()

        if (this.languageid == 1) {
          var smsdesc = this.user + " has added SOAP notes for you. "
          this.SendTwiliSms(smsdesc, this.smsmobileno)
        }
        else {
          var smsdesc = this.user + "Votre rapport de consultation est maintenant disponible dans Mon dossier médical."
          this.SendTwiliSms(smsdesc, this.smsmobileno)
        }

        this.VisitDoctorAppointmentStatus(this.appointmentid);
        if (this.savetemplate == 1) {
          this.InsertDoctorSoapNoteTemplate()
        }
        if (this.misuse == 1) {

          this.docservice.GetPatientRegistrationMisuseBit(this.patientid).subscribe(data => {
          })

          this.updatecomments();
        }
        else if (this.misuse == 0) {
          this.docservice.GetPatientRegistrationMisuseEnablebit(this.patientid).subscribe(data => {
          })
        }
        this.GetDoctorSoapNotesTemplates()
        if (this.languageid == 1) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
        }
        else if (this.languageid == 6) {
          if (this.languageid == 6) {
            Swal.fire('', 'Détails enregistrés !', 'success');
          }

        }
        this.soapdisplay = "none"
        this.clear()
        this.icdcode = ""
        this.icddesc = ""
        if (this.followupvisit == 1) {
          this.docservice.UpdateBookAppointmentFollowupVisit(this.diaappointmentID).subscribe(data => {
          })
        }
        this.followupvisit = 0;
        this.shoprescphoto = [];
      }
    })

  }



  public Insertnotificationsoapnotesazuere() {
    if (this.languageid == 1) {
      var entity = {
        'Description': this.user + " has added SOAP notes for you. ",
        'ToUser': this.pemailsoap,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == 6) {
      var entity = {
        'Description': this.user + "Votre rapport de consultation est maintenant disponible dans Mon dossier médical.",
        'ToUser': this.pemailsoap,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }

  }


  public InsertNotificationSoapnotes() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.patientid,
        'Notification': this.user + " has added SOAP notes for you. ",
        'Description': this.user + " has added SOAP notes for you. ",
        'NotificationTypeID': 100,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.appointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.patientiddd,
        'Notification': this.user + " Votre rapport de consultation est maintenant disponible dans Mon dossier médical .",
        'Description': this.user + " Votre rapport de consultation est maintenant disponible dans Mon dossier médical .",
        'NotificationTypeID': 100,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.appointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }






  // public insertsoapnotes2() {
  //   var entity = {
  //     'DoctorID': this.doctorid,
  //     'PatientID': this.patientid,
  //     'SoapID': this.soapid,
  //     'Objective': this.objective
  //   }
  //   this.docservice.InsertDoctor_PatientSoapNotes2(entity).subscribe(data => {

  //     if (data != 0) {
  //       // Swal.fire('Completed', 'Details saved successfully', 'success');
  //       this.clear()

  //     }
  //   })
  // }

  // public insertsoapnotes3() {
  //   var entity = {
  //     'Assessment': this.assessment,
  //     'DoctorID': this.doctorid,
  //     'PatientID': this.patientid,
  //     'SoapID': this.soapid
  //   }
  //   this.docservice.InsertDoctor_PatientSoapNotes3(entity).subscribe(data => {
  //     if (data != 0) {
  //       // Swal.fire('Completed', 'Details saved successfully', 'success');
  //       this.clear()

  //     }
  //   })
  // }



  public UpdateBookAppointmentNoShow(appointmentID, appdate, slots) {

    if (this.languageid == 1) {
      if (this.serverdate >= appdate) {

        if (this.servertime >= slots) {
          ;
          Swal.fire({
            title: 'Are you sure?',
            text: "This Patient has Not Visited!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Not Visited!'
          }).then((result) => {
            if (result.value) {
              this.docservice.UpdateBookAppointmentNoShow(appointmentID).subscribe(res => {
                let test = res;
                this.getbookappointmentbydoctorid();
                this.getbookappointmentbydocid();
              })
              Swal.fire(
                'Yes!',
                'Patient Not Visited.',
                'success'
              )
            }
            else {
              this.getbookappointmentbydoctorid();
              this.getbookappointmentbydocid();
            }
          })

        }
        else {
          if (this.languageid == 1) {
            Swal.fire('Alert', 'The Patient  Will Come At' + slots)
          } else {
            Swal.fire('Alert', 'Le patient sera présent à' + slots)
          }

        }


      }
    }
    else {
      if (this.serverdate >= appdate) {

        if (this.servertime >= slots) {
          ;
          Swal.fire({
            title: 'Êtes-vous sûr(e) ?',
            text: "Ce patient n'a pas visité!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Annuler'
          }).then((result) => {
            if (result.value) {
              this.docservice.UpdateBookAppointmentNoShow(appointmentID).subscribe(res => {
                let test = res;
                this.getbookappointmentbydoctorid();
                this.getbookappointmentbydocid();
              })
              Swal.fire(
                'Oui !',
                'Non presentation ',
                'success'
              )
            }
            else {
              this.getbookappointmentbydoctorid();
              this.getbookappointmentbydocid();
            }
          })

        }
        else {
          if (this.languageid == 1) {
            Swal.fire('Alert', 'The Patient  Will Come At' + slots)
          } else {
            Swal.fire('Alert', 'Le patient sera présent à' + slots)
          }

        }

      }
      else {
        // Swal.fire('Alert', 'The PAtient Will Come At ' + slots + ' on ' + appdate)

        if (this.languageid == 1) {
          Swal.fire('Alert', 'The PAtient Will Come At ' + slots + ' on ' + appdate)
        } else {
          Swal.fire('Alert', 'Le patient sera présent à ' + slots + ' on ' + appdate)
        }
      }
    }

  }


  // public insertsoapnotes4() {
  //   var entity = {
  //     'Plan': this.plan,
  //     'DoctorID': this.doctorid,
  //     'PatientID': this.patientid,
  //     'SoapID': this.soapid,
  //     'DiagnosisCode': this.icdcode,
  //     'Orders': 0,
  //     'SickSlip': 0,
  //     'FollowUpPlan': this.followupplan,
  //     'Signature': this.signature,
  //     'Notes': this.notes,

  //   }
  //   this.docservice.InsertDoctor_PatientSoapNotes4(entity).subscribe(data => {
  //     if (data != 0) {
  //       // Swal.fire('Completed', 'Details saved successfully', 'success');
  //       this.clear()

  //     }
  //   })
  // }



  public clear() {
    this.objective = "",
      this.subjective = "",
      this.assessment = "",

      this.diagnosiscode = "",
      this.followupplan = "",
      this.notes = ""

  }



  public Getappointmentsoapid(appointmentID) {

    this.soapappoitmentid = appointmentID;

    this.docservice.GetSoapNotesByAppointmentID(this.soapappoitmentid).subscribe(
      data => {

        this.soaplist = data;
        if (this.soaplist == null) {
          this.subjective = "";
          this.phsycialexam = "";
          this.genaral = "";
          this.ent = "";
          this.neck = "";
          this.lymphnode = "";
          this.cardiovascular = "";
          this.lungs = "";
          this.skin = "";
          this.breast = "";
          this.Psychiatry = "";
          this.abdomen = "";
          this.genitourinary = "";
          this.rectal = "";
          this.extremities = "";
          this.musculoskeletal = "";
          this.assessment = "";
          this.plan = "";
          this.diagnosiscode = "";
          this.followupplan = "";
          this.notes = "";
          this.neurological = "";
        }
        else {
          this.subjective = this.soaplist[0].subjective,
            this.phsycialexam = this.soaplist[0].physicalExam,
            this.genaral = this.soaplist[0].genaral,
            this.ent = this.soaplist[0].ent,
            this.neck = this.soaplist[0].neck,
            this.lymphnode = this.soaplist[0].lymphNode,
            this.cardiovascular = this.soaplist[0].cardiovascular,
            this.lungs = this.soaplist[0].lungs,
            this.skin = this.soaplist[0].skin,
            this.breast = this.soaplist[0].breast,
            this.Psychiatry = this.soaplist[0].psychiatry,
            this.abdomen = this.soaplist[0].abdomen,
            this.genitourinary = this.soaplist[0].genitourinarySystem,
            this.rectal = this.soaplist[0].rectal,
            this.extremities = this.soaplist[0].extremities,
            this.musculoskeletal = this.soaplist[0].musculoskeletal,
            this.assessment = this.soaplist[0].assessment,
            this.plan = this.soaplist[0].plan,
            this.diagnosiscode = this.soaplist[0].diagnosisCode,
            this.followupplan = this.soaplist[0].followUpPlan,
            this.notes = this.soaplist[0].notes,
            this.neurological = this.soaplist[0].neurological,
            this.objective = this.soaplist[0].objective
        }

      }, error => {
      }
    )
  }


  public GetVedioID(id) {

    this.vedioid = id;

    this.docservice.GetPatient_IllnessVedioes(this.vedioid).subscribe(
      data => {

        this.showvedioes = data;
        if (this.showvedioes.length == 0) {
          this.novideo = 1

        }
        else if (this.showvedioes.length != 0) {
          this.novideo = 0
        }
      }, error => {
      }
    )
  }
  sickslippatientid
  patientlist: any
  docregno: any;
  pEmail: any;
  public GetSickSlipID(patientID, appid, pEmail, smsmobileno, nationalidno) {

    this.sickslippatientid = patientID;
    this.appointmentid = appid;
    this.pEmail = pEmail;
    this.smsmobileno = smsmobileno;
    this.nationaidno = nationalidno;
    this.docservice.GetDoctorPatients(this.doctorid).subscribe(
      data => {

        this.patientlist = data;
        this.getpatientdetail(this.sickslippatientid);
      }
    )
  }
  phonenumber: any
  email: any
  address: any
  public getpatientdetail(pid) {

    this.patientid = pid;
    let qwerty = this.patientlist.filter(x => x.patientID == this.patientid);
    this.patientname = qwerty[0].patientName;
    this.phonenumber = qwerty[0].mobileNumber;
    this.email = qwerty[0].emailID;
    this.address = qwerty[0].address;
    this.doctorname = qwerty[0].doctorName;
    this.docregno = qwerty[0].registrationNo;
  }
  description: any
  mobiledescription: any
  leavefor: any
  sicksliplist: any
  description1
  desc: any
  Scholldata: any;


  public Getscholladate() {
    if (this.languageid == 6) {

      if (this.leavefor == 'École') {
        this.Scholldata = 'Arrêt maladie (Ecole).'
      }
      if (this.leavefor == 'Travail') {

        this.Scholldata = 'un arrêt de travail.'
      }
    }
    else if (this.languageid == 1) {

      if (this.leavefor == 'School') {
        this.Scholldata = 'School'
      }
      if (this.leavefor == 'Office') {
        this.Scholldata = 'Office'
      }
    }
  }

  premedicallist: any;


  public InsertSickSlipGenarator() {
    const qwer = 'dd-MMM-yyyy';
    const pljdjf = 'en-US';
    const frdat = this.fromdate;
    this.fromdate = formatDate(frdat, qwer, pljdjf);
    const todat = this.todate;
    this.todate = formatDate(todat, qwer, pljdjf);


    const qwert = 'dd-MM-yyyy';
    const prrrfd = 'en-US';
    const frdatds = this.fromdate;
    this.fromdatehtml = formatDate(frdatds, qwert, prrrfd);
    const todathjf = this.todate;
    this.todatehtml = formatDate(todathjf, qwert, prrrfd);


    if (this.languageid == 1) {
      this.desc = '<p>DATE: ' + this.todaydate + '</p><p><b>SUBJECT: ' + this.Scholldata + ' Sick Slip / Medical Note</b></p><p>Patient name  : ' + this.patientname + 'ID number :  ' + this.nationaidno + ' </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientname + ' had a telehealth visit with me on ' + this.fromdate.toLocaleString() + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.fromdatehtml + '<br>End Date: ' + this.todatehtml + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.doctorname + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>"
    }
    else {
      this.desc = '<p>DATE: ' + this.todaydatess + '</p><p><b>Objet : ' + this.Scholldata + '</b></p><p>Nom du patient  : ' + this.patientname + 'Numéro de CIN  :  ' + this.nationaidno + ' </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;">' + '(Ecole) : Je soussigné(e), certifie avoir examiné le patient et prescrit ' + this.Scholldata + '<br><br>' + 'Date de commencement : ' + this.fromdatehtml + ',<br><br>Date de fin : ' + this.todatehtml + ',<br><br><br>' + '<br>Meilleures Salutations,<br><u>' + this.user + "<br> Registration no :" + this.docregno + "<br>"
    }

    if (this.languageid == 1) {
      document.getElementById("qwerty").innerHTML = this.desc
      this.mobiledescription = document.getElementById("qwerty").innerText;
    }
    else if (this.languageid == 6) {
      document.getElementById("qwerty").innerHTML = this.desc
      this.mobiledescription = document.getElementById("qwerty").innerText;
    }
    debugger
    if (this.languageid == 1) {
      var entity = {
        'PatientID': this.patientid,
        'Ailment': this.ailment,
        'FromDate': this.fromdate,
        'ToDate': this.todate,
        'SickSlipDate': this.todaydate,
        'Description': '<p>DATE: ' + this.todaydatess + '</p><p><b>SUBJECT : ' + this.Scholldata + ' Sick Slip / Medical Note</b></p><p>Patient name : ' + this.patientname + '<br>ID number :  ' + this.nationaidno + ' </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientname + ' had a telehealth visit with me on ' + this.todate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.fromdate + '<br>End Date: ' + this.todate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.doctorname + "<br>Registration no :" + this.docregno + "<br>",
        'AppointmentID': this.appointmentid,
        'DoctorID': this.doctorid,
        'LeaveFor': this.leavefor,
        'Mobiledescription': this.mobiledescription,
        'LanguageID': this.languageid
      }
      this.docservice.InsertSickSlipGenarator(entity).subscribe(res => {
        if (res != 0) {

          this.doctorid = localStorage.getItem('userid');
          this.InsertMedicalAzure()

          var smsdesc = this.user + " has sent you a medical certificate. Please check your home page."
          this.SendTwiliSms(smsdesc, this.smsmobileno)

          this.docservice.GetSickSlipGenaratorByPatientIDWeb(this.patientid, this.languageid, this.doctorid).subscribe(data => {
            this.premedicallist = data;

            var list = this.premedicallist.filter(x => x.id == res)

            this.clickedsickslipid = list[0].patientID;
            this.sickslipid = list[0].id;
            //let qwerty = this.sicksliplist.filter(x => x.patientID == this.clickedsickslipid);
            // let qwertyq = this.sicksliplist.filter(x => x.id == this.sickslipid);
            this.desc = list[0].description;
            this.doctorname = list[0].doctorName;
            this.docmobileno = list[0].docmobileno;
            this.registrationNo = list[0].registrationNo;
            this.hospital_ClinicName = list[0].hospital_ClinicName;
            this.address = list[0].address;

          })
          // this.SaveMedicalCertificatePdf()
          // this.docservice.GetSickSlipGenaratorByDoctorID(this.doctorid, this.startdate, this.enddate).subscribe(
          //   data => {

          //     this.sicksliplist = data;

          //     // this.getdesc(res);
          //   }, error => {
          //   }
          // )
          this.ailment = "";
        }
      })
      document.getElementById('close').click();
    }
    else {
      debugger
      var entity = {
        'PatientID': this.patientid,
        'Ailment': this.ailment,
        'FromDate': this.fromdate,
        'ToDate': this.todate,
        'SickSlipDate': this.todaydate,
        'Description': '<p>DATE: ' + this.todaydatess + '</p><p><b>Objet : ' + this.Scholldata + '</b></p><p>Nom du patient  : ' + this.patientname + '<br>Numéro de CIN  :  ' + this.nationaidno + ' </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;">' + '(Ecole) : Je soussigné(e), certifie avoir examiné le patient et prescrit ' + this.Scholldata + '<br><br>' + 'Date de commencement : ' + this.fromdatehtml + ',<br><br>Date de fin : ' + this.todatehtml + ',<br><br><br>' + '<br>Meilleures Salutations,<br><u>' + this.user + "<br> No d’inscription  : " + this.docregno + "<br>",
        // 'Description': '<p>DATE: ' + this.todaydate + '</p><p><b>OBJET: ' + this.leavefor + ' Je vous référe le patient </b></p><p> ' + this.patientname + ' </p><p style="text-align: center !important;">Vous remerciant, je vous prie d’agréer, mon cher confrère (consœur) mes salutations les meilleures.wwwwXrr</p><p style="text-align:justify;">' + this.patientname + ' had a telehealth visit with me on ' + this.todate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.fromdate + '<br>End Date: ' + this.todate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.doctorname + '</u><br>VoilaDoc</p>',
        'AppointmentID': this.appointmentid,
        'DoctorID': this.doctorid,
        'LeaveFor': this.leavefor,
        'Mobiledescription': this.mobiledescription,
        'LanguageID': this.languageid
      }
      this.docservice.InsertSickSlipGenarator(entity).subscribe(res => {
        debugger
        if (res != 0) {

          this.doctorid = localStorage.getItem('userid');
          this.InsertMedicalAzure()

          var smsdesc = this.user + " vous a envoyé un certificat médical. Veuillez vérifier votre page d'accueil."
          this.SendTwiliSms(smsdesc, this.smsmobileno)

          this.docservice.GetSickSlipGenaratorByPatientIDWeb(this.patientid, this.languageid, this.doctorid).subscribe(data => {
            this.premedicallist = data;

            var list = this.premedicallist.filter(x => x.id == res)

            this.clickedsickslipid = list[0].patientID;
            this.sickslipid = list[0].id;
            //let qwerty = this.sicksliplist.filter(x => x.patientID == this.clickedsickslipid);
            // let qwertyq = this.sicksliplist.filter(x => x.id == this.sickslipid);
            this.desc = list[0].description;
            this.doctorname = list[0].doctorName;
            this.docmobileno = list[0].docmobileno;
            this.registrationNo = list[0].registrationNo;
            this.hospital_ClinicName = list[0].hospital_ClinicName;
            this.address = list[0].address;

          })
          this.ailment = "";
          document.getElementById('close').click();
          // this.SaveMedicalCertificatePdf();
        }
      })
    }
  }
  des
  public getdesc(id) {
    this.des = this.sicksliplist.filter(x => x.id == id);
    this.desc = this.des[0].description;
  }





  public InsertMedicalAzure() {
    if (this.languageid == 1) {
      var entity = {
        'Description': this.user + " has sent you a medical certificate. Please check your home page.",
        'ToUser': this.pEmail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == 6) {
      var entity = {
        'Description': this.user + " vous a envoyé un certificat médical. Veuillez vérifier votre page d'accueil.",
        'ToUser': this.pEmail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }

  }


  public SaveMedicalCertificatePdf() {
    ;

    let pdfContent = window.document.getElementById("medicalcontent");
    var doc = new jsPDF('p', 'mm', "a4");

    html2canvas(pdfContent).then(canvas => {
      ;
      var imgData = canvas.toDataURL('image/jpeg', 1.0);

      doc.setFontSize(2);

      doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      var pdf = doc.output('blob');

      var file = new File([pdf], "MedicalCertificate" + ".pdf");

      let body = new FormData();

      body.append('Dan', file);
      this.docservice.ReceiptUpload(file).subscribe(res => {
        ;
        this.pdfurl = res;
        this.UpdateMedicalReceit();

      });
    });
  }

  public UpdateMedicalReceit() {

    var entity = {
      'ID': this.sickslipid,
      'SickSlipUrl': this.pdfurl
    }
    this.docservice.UpdateSickSlipGenaratorSickSlipUrl(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Medical Cerifiate Sent Successfully');
      }
      else {
        Swal.fire("'L'arrêt maladie a été envoyé avec succès.");
      }
    })
  }


  public attachmentsurl = [];
  public sendmail() {
    this.attachmentsurl[0] = 'C:/MeridionalWebTestAPI/Images/logo/logo.png'
    var mailentity = {
      'emailto': 'srikanthreddy0905@gmail.com',
      'emailsubject': 'SICK SLIP',
      'emailbody': this.desc,
      'attachmenturl': this.attachmentsurl
    }

    this.docservice.SendMail(mailentity).subscribe(data => {

      if (this.languageid == 1) {
        Swal.fire('Mail sent successfully.');
      }
      else if (this.languageid == 6) {
        Swal.fire('Email envoyé avec succès');
      }

      this.leavefor = "";
      this.ailment = "";
      document.getElementById('close').click();
      // location.href = "#/SickSlipDashboard";

    })
  }
  previousreferalist: any;

  public GetReferralID(details) {

    this.patientid = details.patientID;
    this.appointmentid = details.appointmentID;
    this.smsmobileno = details.smsmobileno
    if (this.languageid == 1) {
      const format = 'yyyy-MM-dd';
      const myDate = new Date();
      const locale = 'en-US';
      this.todaydate = formatDate(myDate, format, locale);
    }
    else {
      const format = 'yyyy-MM-dd';
      const myDate = new Date();
      const locale = 'en-US';
      this.todaydate = formatDate(myDate, format, locale);
    }

    this.GetPreviousRefereals()
    this.docservice.GetBookAppointmentByPatientID(this.patientid, this.appointmentid, this.languageid).subscribe(
      data => {
        this.details = data[0];
        this.patientname = this.details.pName,
          this.mobileno = this.details.mobileNumber,
          // this.emailid = this.details.pEmail,
          this.patientidd = this.details.patientID,
          // this.mobileno = this.details.mobileNumber,
          this.email = this.details.pEmail

        if (this.languageid == 1) {
          this.referalnotes = " DATE: " + this.todaydate + " <p>SUBJECT : Referral To " + this.doctorname + "</p > <p>RE: Mr. " + this.patientname + "<p>i am referring my patient " + this.patientname + " for review of his new onset.<p>&nbsp;</p > <p>Thank you In advance for attending to the patients's health needs</p><p>" + this.user + "<br>" + this.MobileNumber + "</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>&nbsp;Consultation Summary<p><strong>Patient Name </strong>: &nbsp;" + this.patientname + "</p><p><strong>Date of Consult : &nbsp;</strong> &nbsp;" + this.todaydate + "</p><p><strong>Provider </strong>: &nbsp;  " + this.user + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>"
        }
        else {
          this.referalnotes = " DATE :" + this.todaydate + "<p>OBJET : Lettre de recommandation <br> Cher(e) confrère (consœur), Je vous réfère le patient  " + this.patientname + "</p><p>Pour le(s) motif(s) et diagnostic(s) suivant(s) : " + "<br><br>" + this.user + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>"
        }

      }, error => {
      }
    )



  }


  public GetPreviousRefereals() {
    this.docservice.GetDoctorReferalsByPatientIDForWeb(this.patientid, this.languageid, this.doctorid).subscribe(data => {

      this.previousreferalist = data;
    })
  }




  details: any
  mobileno: any
  patientidd: any

  referaltypeid: any
  doctoremail: any
  docphoneno: any;



  public GetReferencetypeID(even) {

    this.referaltypeid = even.target.value;
    if (this.referaltypeid == '2') {
      this.doctorname = "",
        this.doctoremail = "",
        this.docphoneno = ""
    }
  }


  departmentlist: any
  public getdepartmentmaster() {

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
      }, error => {
      }
    )
  }



  hospitalid: any;
  dochospitalid: any;
  referdoctorid: any;
  public GetDoctorID(item: any) {

    this.referdoctorid = item.id
    var list1 = this.referdoctorlist.filter(x => x.id == this.referdoctorid)
    this.doctorname = list1[0].doctorName,
      this.docphoneno = list1[0].mobileNumber,
      this.doctoremail = list1[0].emailID,
      this.hospitalid = list1[0].hospital_ClinicID;
    this.dochospitalid = list1[0].dochospitalID;



    if (this.languageid == 1) {
      this.referalnotes = " DATE: " + this.todaydate + "<br><p>SUBJECT : Referral To " + this.doctorname + "</p > <p>RE: Mr. " + this.patientname + "<p>&nbsp;</p > <p>i am referring my patient " + this.patientname + " for review of his new onset.<p>&nbsp;</p > <p>Thank you In advance for attending to the patients's health needs</p><p>" + this.user + "<br>" + this.MobileNumber + "</p><p>Consultation Summary<p><strong>Patient Name </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.patientname + "</p><p><strong>Date of Consult : &nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.todaydate + "</p><p><strong>Provider </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + this.doctorname + "<br>" + this.docphoneno + "<br>" + this.Hospital_ClinicName + "</p>"
    }
    else if (this.languageid == 6) {
      this.referalnotes = " DATE :" + this.todaydate + "<br>OBJET : Lettre de recommandation <br> Cher(e) confrère (consœur), Je vous réfère le patient  " + this.patientname + "<p>Pour le(s) motif(s) et diagnostic(s) suivant(s) : " + "<p>Vous remerciant, je vous prie d’agréer, mon cher confrère (consœur) mes salutations les meilleures.<br><br>" + this.user + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>"
    }
    // this.referalnotes = "<p><br>" + this.todaydate + "</p><p>SUBJECT : Referral To " + this.doctorname + "</p><p>RE: Mr. " + this.patientname + "</p><p>&nbsp;</p><p>i am referring my patient " + this.patientname + " for review of his new onset.</p><p>&nbsp;</p><p>Thank you In advance for attending to the patients's health needs</p><p>" + this.user + "</p><p>&nbsp;</p><p>Voiladoc</p><p>" + this.docphoneno + "</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consultation Summary<p><strong>Patient Name </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.patientname + "</p><p><strong>Date of Consult : &nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.todaydate + "</p><p><strong>Provider </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + this.doctorname + "</p><p>Chief Complaint :&nbsp;</p><p>Diagnosis :</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>";
  }


  public getdoctorforadmin() {

    this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.doctorlist = data;
        // this.dummlist = this.doctorlist

      }, error => {
      }
    )
  }

  departmentid: any
  public list: any;
  public referdoctorlist: any;
  public docdd = {}
  public GetDepartmentID(even) {
    this.departmentid = even.target.value;


    this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.doctorlist = data;
        // && x.areaID == this.areaid
        // this.dummlist = this.doctorlist
        this.list = this.doctorlist.filter(x => x.departmentID == this.departmentid)
        this.referdoctorlist = this.list.filter(x => x.referealBit == 1)
      }, error => {
      }
    )

    this.docdd = {
      singleSelection: true,
      idField: 'id',
      textField: 'doctorName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //  itemsShowLimit: 3,
      searchPlaceholderText: this.search2,
      allowSearchFilter: true,

    };
  }

  public Getdocname(doctorname) {

    this.doctorname = doctorname;
    this.referalnotes = "<p><br>" + this.todaydate + "</p><p>SUBJECT : Referral To " + this.doctorname + "</p><p>RE: Mr. " + this.patientname + "</p><p>&nbsp;</p><p>i am referring my patient " + this.patientname + " for review of his new onset.</p><p>&nbsp;</p><p>Thank you In advance for attending to the patients's health needs</p><p>" + this.user + "</p><p>&nbsp;</p><p></p><p>" + this.docphoneno + "</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consultation Summary<p><strong>Patient Name </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.patientname + "</p><p><strong>Date of Consult : &nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.todaydate + "</p><p><strong>Provider </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + this.doctorname + "</p><p>Chief Complaint :&nbsp;</p><p>Diagnosis :</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>";

  }


  referalnotes: any
  mobilereferalnotes: any
  public user: any;
  public soap: any;
  public insertdetails1() {

    if (this.referaltypeid == 1 || this.referaltypeid == 2) {

      if (this.doctorname == null) {
        if (this.languageid == 1) {
          Swal.fire('', 'Please select or enter doctor name')
        }
        else if (this.languageid == 6) {

          Swal.fire('', 'Sélectionnez ou entrez le nom du médecin')
        }
      }
      else if (this.doctoremail == null) {
        if (this.languageid == 1) {
          Swal.fire("Please Enter Doctor Email")
        }
        else {
          Swal.fire("Veuillez saisir l’adresse email du médecin")
        }
      }
      else if (this.referalnotes == null || this.referalnotes == "") {
        Swal.fire("Please Enter Referral Notes")
      }
      else {

        if (this.referaltypeid == 1 || this.referaltypeid == 2) {

          if (this.languageid == 1) {
            this.mobilereferalnotes = "Your Doctor " + this.user + " has referred you to " + this.doctorname + "for further investigation, kindly be touch in with doctor"
          }
          else {
            this.mobilereferalnotes = "Le Dr " + this.user + " vous a référe vers le " + this.doctorname + "pour une enquête plus approfondie, veuillez contacter le médecin"
          }
        }
        if (this.referaltypeid == 3) {
          document.getElementById("qwerty").innerHTML = this.referalnotes;
          this.mobilereferalnotes = document.getElementById("qwerty").innerText;
        }
        var entity = {
          'ReferalTypeID': this.referaltypeid,
          'AppointmentID': this.appointmentid,
          'PatientID': this.patientid,
          'PatientName': this.patientname,
          'DoctorID': this.referdoctorid,
          'DoctorName': this.doctorname,
          'DoctorEmail': this.doctoremail,
          'DoctorPhNo': this.docphoneno,
          'ReferalNotes': this.referalnotes,
          'AssignDoctorID': this.doctorsssid,
          'MobileReferalNotes': this.mobilereferalnotes,
          'soapbit': this.soap,
          'Hospital_ClinicID': this.hospitalid,
          'DoctorHospitalDetailsID': this.dochospitalid,
          'LanguageID': this.languageid
        }
        this.docservice.InsertDoctorReferals(entity).subscribe(data => {
          if (data != 0) {
            this.InsertDoctorRefererlas();
            if (this.languageid == 1) {
              var smsdesc = "Dr" + this.doctorname + " has sent you a referral letter. Please check your home page to make an appointment."
              this.SendTwiliSms(smsdesc, this.smsmobileno)
            }
            else {
              var smsdesc = "Vous avez été référé au Dr " + this.doctorname + "  Cliquez sur la notification pour prendre rendez-vous. "
              this.SendTwiliSms(smsdesc, this.smsmobileno)
            }
            this.SendNotification();
            this.InsertReferalLeterNotification()
            // this.senmailToPatient();

            if (this.referaltypeid == 1 || this.referaltypeid == 2) {
              this.sendmail1();
            }
            if (this.referaltypeid == 3) {
              this.senmailToPatient()
            }
            // Swal.fire('Success', 'Referral Sent To Doctor Successfully');
            location.href = "#/Sentrefferals"
          }
        })
      }
    }
    if (this.referaltypeid == 3) {
      // if (this.referaltypeid == 1 || this.referaltypeid == 2) {
      //   
      //   this.mobilereferalnotes = "Your Doctor " + this.user + " has referred you to " + this.doctorname + "for further investigation, kindly be touch in with doctor"
      // }
      if (this.referaltypeid == 3) {
        document.getElementById("qwerty").innerHTML = this.referalnotes;
        this.mobilereferalnotes = document.getElementById("qwerty").innerText;
      }
      var entity = {
        'ReferalTypeID': this.referaltypeid,
        'AppointmentID': this.appointmentid,
        'PatientID': this.patientid,
        'PatientName': this.patientname,
        'DoctorID': this.referdoctorid,
        'DoctorName': this.doctorname,
        'DoctorEmail': this.doctoremail,
        'DoctorPhNo': this.docphoneno,
        'ReferalNotes': this.referalnotes,
        'AssignDoctorID': this.doctorsssid,
        'MobileReferalNotes': this.mobilereferalnotes,
        'soapbit': this.soap,
        'Hospital_ClinicID': this.hospitalid,
        'DoctorHospitalDetailsID': this.dochospitalid,
        'LanguageID': this.languageid
      }
      this.docservice.InsertDoctorReferals(entity).subscribe(data => {
        if (data != 0) {
          this.InsertDoctorRefererlas();
          this.InsertReferalLeterNotification()
          if (this.languageid == 1) {
            var smsdesc = "Dr" + this.doctorname + " has sent you a referral letter. Please check your home page to make an appointment."
            this.SendTwiliSms(smsdesc, this.smsmobileno)
          }
          else {
            var smsdesc = "Vous avez été référé au Dr " + this.doctorname + "  Cliquez sur la notification pour prendre rendez-vous. "
            this.SendTwiliSms(smsdesc, this.smsmobileno)
          }
          this.SendNotification();

          // Swal.fire('Success', 'Referral Sent To Doctor Successfully');
          location.href = "#/Sentrefferals"
        }
      })
    }
  }



  public sendmail1() {

    var entity = {
      'emailto': this.doctoremail,
      'emailsubject': 'Patient Referred By ' + this.user,
      'emailbody': this.referalnotes,
      'attachmenturl': this.emailattchementurl,
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





  // 'Dear ' + this.doctorname + ' I am referring my Patient ' + this.patientname + ' for further investigation.<br> My Notes About The Patient Is Given Below. <br>' + this.referalnotes + ' Please Feel Free To Reach Out To Me. If You Have Any Queries.<br><br> Regards<br>' + this.user
  public SendNotification() {
    if (this.languageid == 1) {
      var entity = {
        'Description': "Dr" + this.doctorname + " has sent you a referral letter. Please check your home page to make an appointment.",
        'ToUser': this.email,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else {
      var entity = {
        'Description': "Vous avez été référé au Dr " + this.doctorname + "  Cliquez sur la notification pour prendre rendez-vous. ",
        'ToUser': this.email,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }

  }








  public InsertDoctorRefererlas() {
    for (let i = 0; i < this.attachmentsurl1.length; i++) {
      var entity = {
        'AppointmentID': this.appointmentid,
        'PatientID': this.patientid,
        'AttachmentUrl': this.attachmentsurl1[i],
      }
      this.docservice.InsertDoctorReferalAttachments(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }

  }

  public InsertReferalLeterNotification() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.patientid,
        'Notification': " Referral letter",
        'Description': "Dr" + this.doctorname + " has sent you a referral letter. Please check your home page to make an appointment.",
        'NotificationTypeID': 121,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.appointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.patientid,
        'Notification': " Lettre de référence",
        'Description': "Vous avez été référé au Dr " + this.doctorname + "  Cliquez sur la notification pour prendre rendez-vous. ",
        'NotificationTypeID': 121,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.appointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }





  // 'Dear ' + this.doctorname + ' I am referring my Patient ' + this.patientname + ' for further investigation.<br> My Notes About The Patient Is Given Below. <br>' + this.referalnotes + ' Please Feel Free To Reach Out To Me. If You Have Any Queries.<br><br> Regards<br>' + this.user,







  public senmailToPatient() {

    var entity = {
      'emailto': this.email,
      'emailsubject': 'Patient Referred By ' + this.user,
      'emailbody': "Your Have Been Referred To " + this.doctorname + " For Further Investigation. Please Contact Him on Mobile" + this.docphoneno,
      'attachmenturl': this.emailattchementurl,
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

  public SendReciept() {

    var entity = {
      'emailto': 'srikanthreddy0905@gmail.com',
      'emailsubject': 'Reciept ' + this.patientName,
      'emailbody': "Reciept has been recieved for video call with " + this.doctorName + " For Further Investigation. Please Contact Him on Mobile " + this.mobileNumber,
      'attachmenturl': this.emailattchementurl,
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

  mobileNumber: any;
  // public SendReciept() {
  //   var mailentity = {
  //     ToEmail: 'srikanthreddy0905@gmail.com',
  //     Subject: 'Reciept ' + this.patientName,
  //     FromEmail: 'Doctor@Voiladoc.Net',
  //     ContentType: "text/html",
  //     Content: "Reciept has been recieved for video call with " + this.doctorName + " For Further Investigation. Please Contact Him on Mobile " + this.mobileNumber,
  //     // 'Dear ' + this.doctorname + ' I am referring my Patient ' + this.patientname + ' for further investigation.<br> My Notes About The Patient Is Given Below. <br>' + this.referalnotes + ' Please Feel Free To Reach Out To Me. If You Have Any Queries.<br><br> Regards<br>' + this.user,
  //   };

  //   this.docservice.SendMail(mailentity).subscribe(data => {

  //     if (this.languageid == 1) {
  //       Swal.fire('Mail sent successfully.');
  //     }
  //     else if (this.languageid == 6) {
  //       Swal.fire('Email envoyé avec succès');
  //     }
  //   })
  // }




  public GetCountryID(item: any) {

    // if (item.target.value != 0) {

    this.countryid = item.id;

    this.doctorlist = this.dummlist.filter(x => x.countryID == this.countryid)
    // this.count = this.doctorlist.length
    this.getcity();

    // else if (item.target.value == 0) {
    //   this.getdoctorforadmin()
    //   this.countryid = 0

    // }
  }

  public citylist: any;
  public citydd = {};
  public areadd = {}
  public getcity() {

    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {

        this.citylist = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,

          searchPlaceholderText: this.search2,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }

  public GetCityID(item: any) {
    // if (item.target.value != 0) {

    this.cityid = item.id;
    this.getareamasterbyid()
    // this.doctorlist = this.dummlist.filter(x => x.cityID == this.cityid)
    // this.count = this.doctorlist.length
    // }
    // else if (item.target.value == 0) {
    //   this.getcity();
    //   this.areaid = 0;
    //   this.cityid = 0
    // }
  }
  public arealist: any;
  public getareamasterbyid() {

    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {

        this.arealist = data;

        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,

          searchPlaceholderText: this.search2,
          allowSearchFilter: true
        };

      }, error => {
      }
    )
  }



  public GetAreaID(item: any) {
    // if (item.target.value != 0) {
    //   
    this.areaid = item.id;
    this.doctorlist = this.dummlist.filter(x => x.areaID == this.areaid)
    this.departmentid = 0;
    // }
    // else if (item.target.value == 0) {
    //   this.getdoctorforadmin()
    // }
  }
  public countrylist: any;
  public countrydd = {}
  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.countrylist = data;

        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          searchPlaceholderText: this.search2,
          allowSearchFilter: true
        };

      }, error => {
      }
    )
  }


  doctorName: any;
  patientName: any;
  pMobileNo: any;
  videoAmount: any;
  appointmentType: any;
  hospital_ClinicName: any;
  adate: any;
  signatureURL: any;
  docaddres: any;
  nationaidno: any;
  regno: any;
  patientaddress: any;
  public GenerateReciept(data) {
    ;
    this.appointmentID = data.appointmentID;
    this.doctorName = data.doctorName;
    this.patientName = data.patientName;
    this.slots = data.slots;
    this.pMobileNo = data.pMobileNo;
    this.videoAmount = data.paidAmount;
    this.appointmentType = data.appointmentType;
    this.mobileNumber = data.mobileNumber;
    this.hospital_ClinicName = data.hospital_ClinicName;
    this.adate = data.reciptdate;
    this.signatureURL = data.signatureURL,
      this.docaddres = data.docaddress,
      this.nationaidno = data.nationalIdentityNo,
      this.regno = data.registrationNo,
      this.patientaddress = data.patientaddress,
      this.patientid = data.patientID

  }

  display: any;

  public Openmodel() {
    ;
    this.display = "block";
  }

  soapdisplay: any;


  onCloseHandled() {
    this.display = "none";
  }
  onclosetest() {
    this.testdisplay = "none"
  }

  onsopclose() {
    this.soapdisplay = "none"
  }


  public GetFolloupVistID(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to This Appointment Follow Up Again!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Follow Up!'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateBookAppointmentFollowupVisit(id).subscribe(res => {
            let test = res;
            this.getbookappointmentbydocid;
          })
          Swal.fire(
            'Success!',
            'This Appointment Follow Up Again',
            'success'
          )
          this.getbookappointmentbydocid();
        }
        else {
          this.getbookappointmentbydocid();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Etes-vous sûr(e) ?',
        // text: "Vous voulez à nouveau suivre ce rendez-vous!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Valider',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateBookAppointmentFollowupVisit(id).subscribe(res => {
            let test = res;
            this.getbookappointmentbydocid;
          })
          Swal.fire(
            'Détails enregistrés!',
            'Visite de suivi', 'success'
          )
          this.getbookappointmentbydocid();
        }
        else {
          this.getbookappointmentbydocid();
        }
      })
    }

  }





  public GetPrescriptionPhoto(details) {

    this.patientid = details.patientID,
      this.appointmentid = details.appointmentID
  }


  public dummprescriptionphotourl = []



  public onattachmentUpload1(abcd) {
    this.spinner.show();
    this.dummprescriptionphotourl = [];
    this.dummprescriptionphotourl.length = 0;

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments1.push(abcd.addedFiles[0]);
    this.uploadattachments1();
    // }

    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }
  }

  // public shoprescphoto = [];

  public uploadattachments1() {
    if (this.diasoaptypeid == 1) {
      var foldername = this.patientid + '/' + 'DiagnosticTests'
    }
    else if (this.diasoaptypeid == 2) {
      var foldername = this.patientid + '/' + 'SoapNotes'
    }
    else if (this.diasoaptypeid == 3) {
      var foldername = this.patientid + '/' + 'Prescriptions'
    }
    else if (this.diasoaptypeid == 4) {
      var foldername = this.patientid + '/' + 'Medical Certificate'
    }
    else if (this.diasoaptypeid == 5) {
      var foldername = this.patientid + '/' + 'Referal Letter'
    }
    this.docservice.UploadPatientDocuments(this.attachments1, foldername).subscribe(res => {
      this.spinner.hide();
      this.attachmentsurl1.push(res);
      this.dummprescriptionphotourl.push(res);
      let a = this.attachmentsurl1[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      if (this.attachments1[0].type == 'image/jpeg') {

        this.shoprescphoto.push(b)
      }
      else if (this.attachments1[0].type == 'application/pdf') {

        this.shoprescphoto.push('assets/Images/pdf.png')
      }

      this.attachments1.length = 0;

    })
    // this.sendattachment();
  }


  public InsertPrescrptionPhoto() {
    if (this.attachmentsurl1.length == 0 || (this.attachmentsurl1 == null)) {
      if (this.languageid == 1) {
        Swal.fire('Please add prescription')
      }
      else if (this.languageid == 6) {
        Swal.fire('Veuillez ajouter une ordonnance')
      }
    }
    else {
      var entity = {
        'DoctorID': this.doctorid,
        'PateintID': this.patientid,
        'LanguageID': this.languageid,
        'AppointmentID': this.appointmentid,
        'NewPrescriptionPhotoUrl': this.attachmentsurl1[0],
      }
      this.docservice.InsertDoctor_PatientPrescriptionPhotoUrl(entity).subscribe(data => {
        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire('success', 'Prescription added successfully');
            this.attachmentsurl1.length = 0;
            this.shoprescphoto.length = 0;
          }
          else if (this.languageid == 6) {
            Swal.fire('success', 'Ordonnance ajoutée avec succès');
            this.attachmentsurl1.length = 0;
            this.shoprescphoto.length = 0;
          }

        }
      })
    }
  }









  // Diagnostic Test and Soap notes 



  public InsertDiagnostictestAndSoap() {
    if (this.attachmentsurl1.length == 0 || (this.attachmentsurl1 == null)) {
      if (this.languageid == 1) {
        Swal.fire('', 'Please upload photo')
      }
      else if (this.languageid == 6) {
        Swal.fire('', 'Veuillez télécharger une photo')
      }
    }
    else {
      var entity = {
        'TypeID': this.diasoaptypeid,
        'AppointmentID': this.appointmentid,
        'DoctorID': this.doctorid,
        'PatientID': this.patientid,
        'PhotoUrl': this.attachmentsurl1[0],
      }
      this.docservice.InsertDiagnostic_SoapNotesAttachments(entity).subscribe(data => {
        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire('success', 'Saved Successfully');
            this.attachmentsurl1.length = 0;
            this.shoprescphoto.length = 0;
            this.shoprescphoto = []
          }
          else if (this.languageid == 6) {
            Swal.fire('Enregistré avec succès ');
            this.attachmentsurl1.length = 0;
            this.shoprescphoto.length = 0;
            this.shoprescphoto = []
          }

        }
      })
    }
  }









  //chat




  public appointmentiddd: any;
  public appointmentdatetimee: any;

  public chatconversation = "";

  public docmsges = [];
  public patientmsges = [];
  public istyping = false;
  coversationarray = [];

  public patientphoto: any;
  public docphoto: any;
  public chatID: any;
  public attachments = [];

  public imageurl: any;
  public image: any;

  showwindow: any;

  public GetShowID() {
    this.showwindow = 0
    document.getElementById("myForm").style.display = "none";


  }
  chatpatientemail

  public GetChatShowID(patientid, appdate, slots, pEmail, appointmentID) {

    this.patientiddd = patientid;
    this.chatpatientemail = pEmail;
    this.chatappointmentid = appointmentID;

    document.getElementById("myForm").style.display = "block";


    this.showwindow = 1

    this.dosendmsg();


  }



  public chatappointmentid: any;

  public InsertChatnotificationazure() {
    var entity = {
      'Description': this.user + ' Trying to reach you. Please open your voiladoc app : ' + this.chatconversation,
      'ToUser': this.chatpatientemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {
      }
    })
  }

  public dosendmsg() {
    var entity = {
      // 'ChatID': this.chatID,
      'DoctorID': this.doctorid,
      'PatientID': this.patientiddd,
      'AppointmentID': this.chatappointmentid
      // 'Read_Me': 0
    }
    this.docservice.InsertChatMaster(entity).subscribe(data => {
      if (data != 0) {
        this.chatID = data;

        this.getPreviousChat();
        this.oberserableTimer();

      }
    })

  }

  public InsertChatDetails() {
    let conversation = '[doc:-' + this.chatconversation + ';time:-' + this.servertime + ']';
    ;
    if (this.image == 0) {
      var entity = {
        'ChatID': this.chatID,
        'Message': conversation,
        'SenderID': this.doctorid,
        'Sender': 'Doctor',
        'MessageType': 1,
        'MobileMessage': this.chatconversation,
        'MobileTime': this.servertime
      }
      this.docservice.InsertChatDetails(entity).subscribe(data => {

        if (data != 0) {

        }
        this.chatconversation = "";
        this.image = 0;
        this.getPreviousChat();
        this.InsertChatnotificationazure()


      })
    }
    else {
      var entitys = {
        'ChatID': this.chatID,
        'Message': this.imageurl,
        'SenderID': this.doctorid,
        'Sender': 'Doctor',
        'MessageType': 1,
        'MobileMessage': this.chatconversation,
        'MobileTime': this.servertime
      }
      this.docservice.InsertChatDetails(entitys).subscribe(data => {

        if (data != 0) {

        }
        this.chatconversation = "";
        this.image = 0;
        this.getPreviousChat();
        this.InsertChatnotificationazure()
      })
    }
  }


  public getPreviousChat() {
    this.docservice.GetDoctor_ChatDetailsMobileWeb(this.chatID).subscribe(res => {
      let Chatconversation = res;

      this.coversationarray.length = 0;

      for (let i = 0; i < Chatconversation.length; i++) {

        if (Chatconversation[i].sender == 'Patient') {
          this.coversationarray.push({
            chatmsg: Chatconversation[i].mobileMessage, time: Chatconversation[i].mobileTime, user: 'pat', msgtype: Chatconversation[i].messageType
          })
        }

        if (Chatconversation[i].sender == 'Doctor') {
          this.coversationarray.push({ chatmsg: Chatconversation[i].mobileMessage, time: Chatconversation[i].mobileTime, user: 'doc', msgtype: Chatconversation[i].messageType })
        }
      }
    })
  }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.getPreviousChat();

      var objDiv = document.getElementById("chatboxdiv");
      objDiv.scrollTop = objDiv.scrollHeight;


    });
  }



  public onattachmentUpload(abcd) {

    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.imageurl = b;
      this.image = 1;
      this.attachments.length = 0;
      this.attachmentsurl = [];

    })
    // this.sendattachment();
  }


  public GetShowOff() {
    document.getElementById("myForm").style.display = "none";
  }

  sopapatientid: any;
  soaplist1: any;
  dummsopailist: any;

  public GetSoapPatientID(patientid) {
    this.sopapatientid = patientid

    this.GetSoapNotes();
  }

  public GetSoapNotes() {
    if (this.departmentid != 14) {

      this.docservice.GetSoapNotesByApointmentID(this.sopapatientid, this.languageid, this.doctorid).subscribe(
        data => {

          this.dummsopailist = data;
          this.soaplist1 = this.dummsopailist.filter(x => x.departmentID! = 14)

        }, error => {
        }
      )
    }
    else if (this.departmentid == 14) {

      this.docservice.GetSoapNotesByApointmentID(this.sopapatientid, this.languageid, this.doctorid).subscribe(
        data => {
          this.soaplist1 = data;

        }, error => {
        }
      )
    }

  }




  editsoapid: any;

  public GetEditPrevioussoap(soap) {

    this.editsoapid = soap.id
    this.subjective = soap.subjective,
      this.objective = soap.objective,
      this.plan = soap.plan,
      this.assessment = soap.assessment,
      this.diagnosiscode = soap.diagnosisCode,
      this.notes = soap.notes,
      this.signature = soap.signature,
      this.subjective = soap.subjective,
      this.icddesc = soap.icrDescription,
      this.icdcode = soap.diagnosisCode,
      this.followupplan = soap.followUpPlan
  }


  public updatesoapnotes() {
    var soapentity = {
      'ID': this.editsoapid,
      'Subjective': this.subjective,
      'ICRCode': this.icdcode,
      'ICRDescription': this.icddesc,
      'ICRID': this.icrcodeid,
      'Objective': this.objective,
      'Assessment': this.assessment,
      'Plan': this.plan,
      'DiagnosisCode': this.icdcode,
      'FollowUpPlan': this.followupplan,
      'Signature': this.signature,
      'Notes': this.notes
    }
    this.docservice.UpdateDoctor_PatientSoapNotes(soapentity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Updated successfully');
        this.GetSoapNotes();
      }
      else {
        Swal.fire('Mis à jour avec succés');
        this.GetSoapNotes();
      }
    })
  }


  viewdetaillist: any;

  public GetViewDetails(id, patientid) {

    this.appointmentid = id;
    this.patientID = patientid;
    this.viewdetaillist = this.appointmentlist.filter(x => x.appointmentID == this.appointmentid);
    // this.firstvaccine = this.viewdetaillist[0].firstVaccine,
    //   this.secondvaccine = this.viewdetaillist[0].secondVaccine,
    //   this.firstvaccinedate = this.viewdetaillist[0].firstVaccineDate,
    //   this.secondvaccinedate = this.viewdetaillist[0].secondVaccineDate,
    this.allergies = this.viewdetaillist[0].knownAllergies

    this.allergieslist = this.details.knownAllergies.split(',')

    this.allergies = []
    for (let i = 0; i < this.allergieslist.length; i++) {
      var wtt = {
        displayValue: this.allergieslist[i]
      }

      this.allergies.push(wtt);
    }
    this.GetAllerges();
  }


  earlycallpatientid: any;
  earlypatientemail: any;
  earlyappointmentid: any;

  public GetEarlycallPatientID(patientID, pEmail, id, smsmobileno) {
    debugger
    this.earlycallpatientid = patientID,
      this.earlypatientemail = pEmail,
      this.earlyappointmentid = id
    this.smsmobileno = smsmobileno

  }


  public InsertnotificationForEarlyCall() {
    var entity = {
      'Description': this.earlycallnotes,
      'ToUser': this.earlypatientemail,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {

      }
    })
  }


  public InsertPatientEarlyCall() {
    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.earlycallpatientid,
        'Notification': "Early video call request",
        'Description': this.earlycallnotes,
        'NotificationTypeID': 103,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.earlyappointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {
        debugger
        if (data != 0) {
          this.InsertnotificationForEarlyCall()
          this.docservice.GetBookAppointmentEarlyCallbit(this.earlyappointmentid).subscribe(data => {
            Swal.fire(
              'success', 'Details registered Successfully')
            this.getbookappointmentbydoctorid()

            var smsdesc = this.user + " is available earlier. Do you want to start the call now? Open the app to accept or reject. Type: teleconsultation"
            this.SendTwiliSms(smsdesc, this.smsmobileno)

            debugger

          })
        }


      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.earlycallpatientid,
        'Notification': "Demande d’avance de RDV",
        'Description': this.earlycallnotes,
        'NotificationTypeID': 103,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.earlyappointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
          this.InsertnotificationForEarlyCall()
          this.docservice.GetBookAppointmentEarlyCallbit(this.earlyappointmentid).subscribe(data => {
            Swal.fire('Succès', 'Détails enregistrés avec succès')
            this.getbookappointmentbydoctorid()

            var smsdesc = this.user + " est disponible plus tôt. Voulez-vous commencer l'appel maintenant ? Ouvrez l'app pour accepter ou rejeter. Type : téléconsultation"
            this.SendTwiliSms(smsdesc, this.smsmobileno)

          })
        }

      })
    }
  }




  //insurance details

  insurancedetails: any;

  public Getinsurancedetails(patientID) {

    this.docservice.GetPatientInsuranceDetailsWeb(patientID).subscribe(
      data => {
        this.insurancedetails = data;

      }, error => {
      }
    )
  }
  insurencephoto: any;

  public GetInsurencephoto(photoURL) {
    this.insurencephoto = photoURL;
  }



  public GetDocWhatsaPP(pMobileNo) {
    window.open("http://api.whatsapp.com/send/?phone=" + pMobileNo);
  }




  public GetInsurancepdf(photoURL) {
    // window.open("http://api.whatsapp.com/send/?phone=" + photoURL);
    window.open(photoURL, "_blank");
  }



  public openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

  }


  showreferelnotes: any;

  public GetPatientCondition(doc) {

    this.patientid = doc.patientID;
    this.appointmentid = doc.appointmentID;
    this.showreferelnotes = doc.referalNotes;
  }

  public GetAppointmentID(doc) {

    this.appointmentID = doc.appointmentID;
    this.patientID = doc.patientID
    this.docservice.GetDoctorReferalAttachments(this.appointmentID).subscribe(
      data => {

        this.attachments = data;
      },
      error => { }
    );
  }




  public attachments5 = [];
  public attachmentsurl5 = [];
  public onattachmentUpload15(abcd) {
    this.attachments5.length = 0;
    this.showattachdoc.length = 0;
    this.attachments5.push(abcd.addedFiles[0]);
    this.uploadattachments15();

    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Mis à jour avec succès !');
      abcd.length = 0;
    }

  }

  public showattachdoc = [];
  public uploadattachments15() {
    this.docservice.DoctorPhotoUpload(this.attachments5).subscribe(res => {
      this.attachmentsurl5.push(res);

      let a = this.attachmentsurl5[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.showattachdoc.push(b)

      this.attachments5.length = 0;

    })
    // this.sendattachment();
  }



  public GetPdf(attchments) {

    document.getElementById('closeview').click();
    window.open(attchments, '_blank');
  }


  updaterefid: any;
  public GetReferalletter(ref) {

    this.updaterefid = ref.id;
    this.patientidd = ref.patientID;
    this.patientname = ref.patientName;
    this.mobileno = ref.pMobileNo;
    this.email = ref.pEmail;
    this.showreferelnotes = ref.referalNotes;

  }

  updatemobilereferalnotes: any;

  public UpdateRefferalLetter() {

    document.getElementById("qwerty123").innerHTML = this.showreferelnotes
    this.updatemobilereferalnotes = document.getElementById("qwerty123").innerText;
    var entity = {
      'ID': this.updaterefid,
      'ReferalNotes': this.showreferelnotes,
      'MobileReferalNotes': this.updatemobilereferalnotes
    }
    this.docservice.UpdateDoctorReferalsWeb(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');

        this.docservice.GetDoctorReferalsByPatientIDForWeb(this.patientidd, this.languageid, this.doctorid).subscribe(data => {

          this.previousreferalist = data;
        })
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
      }
      this.docservice.GetDoctorReferalsByPatientIDForWeb(this.patientidd, this.languageid, this.doctorid).subscribe(data => {

        this.previousreferalist = data;
      })
    })

  }



  public Deletefile(id) {

    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Completed This One!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Completed !'
      }).then((result) => {
        if (result.value) {
          this.docservice.Delete_DoctorReferalAttachments(id).subscribe(res => {
            let test = res;
            // this.GetDoctorRefererals();
            document.getElementById('closeview').click();
          })
          Swal.fire(
            'Deleted!',
            'File has been Completed.',
            'success'
          )
        }
        else {
          // this.GetDoctorRefererals();
        }
      })
    }
    else {
      Swal.fire({
        title: 'Êtes-vous sûr(e) ?',
        text: "Terminé !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.Delete_DoctorReferalAttachments(id).subscribe(res => {
            let test = res;
            this.GetPreviousRefereals()
            document.getElementById('closeview').click();
          })
          Swal.fire(
            'Supprimé!',
          )
        }
        else {
          this.GetPreviousRefereals()
        }
      })
    }
  }



  public InsertDoctorRefererlasAttachemenys() {

    for (let i = 0; i < this.attachmentsurl5.length; i++) {
      var entity = {
        'AppointmentID': this.appointmentID,
        'PatientID': this.patientID,
        'AttachmentUrl': this.attachmentsurl5[i],
      }
      this.docservice.InsertDoctorReferalAttachments(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            document.getElementById('closeview').click();
            Swal.fire('Uploaded Successfully');
            this.GetPreviousRefereals()
          }
          else {
            document.getElementById('closeview').click();
            Swal.fire('Téléchargé avec succès');
            this.GetPreviousRefereals()
          }
        }
      })
    }

  }








  //edit show previous medical certicates



  public previousmedicallist: any;

  public GetPreviousmediclcertificates(patientID) {
    this.patientid = patientID;
    this.getpreviousmedicalcertificates()
  }


  public getpreviousmedicalcertificates() {
    this.docservice.GetSickSlipGenaratorByPatientIDWeb(this.patientid, this.languageid, this.doctorid).subscribe(data => {
      this.previousmedicallist = data;

    })
  }

  clickedsickslipid: any;
  sickslipid: any;
  docmobileno: any;
  registrationNo: any;

  public GetMysickslip(sickslip) {

    this.clickedsickslipid = sickslip.patientID;
    this.sickslipid = sickslip.id;
    //let qwerty = this.sicksliplist.filter(x => x.patientID == this.clickedsickslipid);
    // let qwertyq = this.sicksliplist.filter(x => x.id == this.sickslipid);
    this.desc = sickslip.description;
    this.doctorname = sickslip.doctorName;
    this.docmobileno = sickslip.docmobileno;
    this.registrationNo = sickslip.registrationNo;
    this.hospital_ClinicName = sickslip.hospital_ClinicName;
    this.address = sickslip.address;

    // let qwertyq = this.sicksliplist.filter(x => x.id == this.sickslipid);
    // this.desc = qwertyq[0].description;
    // this.doctorname = qwertyq[0].doctorName;
    // this.docmobileno = qwertyq[0].docmobileno;
    // this.registrationNo = qwertyq[0].registrationNo;
    // this.hospital_ClinicName = qwertyq[0].hospital_ClinicName;
    // this.address = qwertyq[0].address;

  }

  sicksliplist1: any;

  public GetSickSlipIDForEdit(patientid, id) {

    this.sickslippatientid = patientid;
    this.sickslipid = id;
    this.docservice.GetDoctorPatients(this.doctorid).subscribe(
      data => {

        this.patientlist = data;
        this.getpatientdetailssss(this.sickslippatientid);
      }
    )
  }


  public getpatientdetailssss(pid) {

    if (this.languageid == 6) {
      this.patientid = pid;
      let qwerty = this.patientlist.filter(x => x.patientID == this.patientid);
      this.patientname = qwerty[0].patientName;
      this.phonenumber = qwerty[0].mobileNumber;
      this.email = qwerty[0].emailID;
      this.address = qwerty[0].address;
      this.doctorname = qwerty[0].doctorName;
      this.docservice.GetSickSlipGenaratorByPatientIDWeb(this.sickslippatientid, this.languageid, this.doctorid).subscribe(
        data => {
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
      this.docservice.GetSickSlipGenaratorByPatientIDWeb(this.sickslippatientid, this.languageid, this.doctorid).subscribe(
        data => {

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









  fromdatehtml: any;
  todatehtml: any;

  public UpdateSickSlip() {

    const qwer = 'dd-MMM-yyyy';
    const pljdjf = 'en-US';
    const frdat = this.fromdate;
    this.fromdate = formatDate(frdat, qwer, pljdjf);
    const todat = this.todate;
    this.todate = formatDate(todat, qwer, pljdjf);


    const frdatf = this.fromdate;
    this.fromdatehtml = formatDate(frdatf, qwer, pljdjf);
    const todatd = this.todate;
    this.todatehtml = formatDate(todatd, qwer, pljdjf);

    if (this.languageid == 1) {
      var entity = {
        'ID': this.sickslipid,
        'Ailment': this.ailment,
        'FromDate': this.fromdate,
        'ToDate': this.todate,
        'LeaveFor': this.leavefor,
        'Description': '<p>DATE: ' + this.todaydate + '</p><p><b>SUBJECT: ' + this.leavefor + ' Sick Slip / Medical Note</b></p><p>RE: ' + this.patientname + ' </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientname + ' had a telehealth visit with me on ' + this.todate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.fromdatehtml + '<br>End Date: ' + this.todatehtml + '<br>Notes:' + this.ailment + '<br>' + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.user + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>",
      }

      this.docservice.UpdateSickSlipGenarator(entity).subscribe(data => {

        if (this.languageid == 1) {

          Swal.fire('Updated successfully.');
          this.getpreviousmedicalcertificates()

        }
        else {

          Swal.fire('Mis à jour avec succés');
          this.getpreviousmedicalcertificates()

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
        'Description': '<p>DATE: ' + this.todaydate + '</p><p><b>Objet: ' + ' Arrêt maladie(' + this.leavefor + ')' + '</b></p><p>Re: ' + this.patientname + ' </p><p style="text-align: center !important;"><b>A qui de droit,</b></p><p style="text-align:justify;">' + 'Je soussigné(e), certifie avoir examiné le patient et prescrit un arrêt de travail.<br><br>' + 'Date de commencement :' + this.fromdatehtml + ',<br><br>Date de fin :' + this.todatehtml + ',<br><br>Notes complémentaires  :' + this.ailment + '<br>' + '<br>Meilleures Salutations,<br><u>' + this.user + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>"
        //'Description': '<p>DATE: ' + this.todaydate + '</p><p><b>SUBJECT: ' + this.leavefor + ' Sick Slip / Medical Note</b></p><p>RE: ' + this.patientname + ' </p><p style="text-align: center !important;"><b>To Whom It May Concern:</b></p><p style="text-align:justify;">' + this.patientname + ' had a telehealth visit with me on ' + this.todate + ' for an acute illness.</p><p>Based on this evaluation, please excuse this patient from ' + this.leavefor + ' on the following dates:</p><p>Start Date: ' + this.fromdate + '<br>End Date: ' + this.todate + '</p><p>If they are feeling better, the patient may return to ' + this.leavefor + ' on the following day.</p><p>If they are not feeling better, they should be evaluated further.</p><p style="float: left;">Best Regards,<br><u>Dr. ' + this.doctorname + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>",
      }
      this.docservice.UpdateSickSlipGenarator(entity).subscribe(data => {

        if (this.languageid == 1) {
          Swal.fire('Updated successfully.');
          // location.href = "#/SickSlipDashboard";
          this.getpreviousmedicalcertificates()
        }
        else {
          Swal.fire('Mis à jour avec succés');
          // location.href = "#/SickSlipDashboard";
        }

      })
    }

  }




  // Doctor Auto Cancelled Appointments

  public DoctotNotJoinedList: any;

  public getbookappointDoctorNotJoinedAppointments() {
    this.docservice.GetBookAppointmentByDoctorIDAutoCancelled(this.doctorid, this.todaydate).subscribe(data => {
      this.DoctotNotJoinedList = data;

      if (this.DoctotNotJoinedList.length != 0) {
        var list = this.DoctotNotJoinedList[0]

        this.DoctorCancelledAppointment(list)

      }
    })
  }

  public DoctorCancelledAppointment(list) {

    this.docservice.UpdateBookAppointmentByDocCancel(list.id).subscribe(
      data => {

        this.getbookappointmentbydoctorid();
        this.getbookappointmentbydocid();
        this.SendDoctorAutoCancelMail(list);
        this.insertDoctorAutoCancelNotification(list);
        this.InserDoctorAutocancelNotification(list)

      }, error => {
      }
    )
  }



  public SendDoctorAutoCancelMail(list) {

    var entity = {
      'emailto': list.pEmail,
      'emailsubject': "Your Doctor " + list.doctorName + " Has Cancelled Your Appointment At Time " + list.notificationdate,
      'emailbody': 'Dear ' + list.pName + ',' + "<br><br>" + 'We regret to inform that your Doctor ' + list.doctorName + ' has cancelled your appointment of ' + list.notificationdate + '. Please use voiladoc app to reschedule or ask for refund. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }




  public insertDoctorAutoCancelNotification(list) {

    if (this.languageid == '1') {
      var entity = {
        'Description': "Dr. " + list.doctorName + "has cancelled your appointment scheduled for " + list.notificationdate + '. Please use voiladoc app to reschedule or ask for refund. For any further help. Please contact our support clients',
        'ToUser': list.pEmail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "VDésolé, le docteur " + this.candoctorname + " A annulé votre rendez-vous " + list.notificationdate + + '. Veuillez utiliser l application voiladoc pour reporter ou demander un remboursement. Pour toute aide supplémentaire. Veuillez contacter nos clients d assistance',
        'ToUser': list.pEmail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }


  public InserDoctorAutocancelNotification(list) {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': list.relationPatientID,
        'Notification': "Appointment Cancelled By Doctor.",
        'Description': "Dr." + list.doctorName + " has cancelled your appointment scheduled for " + list.notificationdate,
        'NotificationTypeID': 11,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': list.id
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': list.relationPatientID,
        'Notification': "Rendez-vous annulé par le médecin.",
        'Description': "Dr." + list.doctorName + " a annulé votre rendez-vous prévu pour " + list.notificationdate,
        'NotificationTypeID': 11,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': list.id
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }





  // Re Join the call
  public GetRejointhecall(appointmentID, pEmail, smsmobileno) {
    this.smsmobileno = smsmobileno;
    if (this.languageid == 1) {
      Swal.fire({
        // title: 'Are you sure?',
        text: "Would you like to grant a free consultation to this patient ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Join!'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateBookVideoCallRejoinbit(appointmentID).subscribe(res => {
            let test = res;
            this.getbookappointmentbydoctorid()
            this.InsertFreecallazureNotification(pEmail)
          })
          Swal.fire(
            'Success!',
            'Offer for a free call has been sent to patient. ',
            'success'
          )
          var smsdesc = this.user + " has given you a free call. Please click the notification on Voiladoc app to book your next appt."
          this.SendTwiliSms(smsdesc, this.smsmobileno)
        }
        else {
          this.getbookappointmentbydoctorid()
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        // title: 'Êtes-vous sûr ?',
        html: "Souhaitez-vous accorder une      <br>" + "      " + " consultation gratuite àce patient ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.docservice.UpdateBookVideoCallRejoinbit(appointmentID).subscribe(res => {
            let test = res;
            this.getbookappointmentbydoctorid()
            this.InsertFreecallazureNotification(pEmail)
          })
          Swal.fire(
            'Succès!',
            "Une notification informant le patient a été envoyée",
            'success'
          )
          var smsdesc = "Le " + this.user + " vous a accordé une RDV gratuite. Veuillez cliquer sur la notification sur l'App Voiladoc pour réserver votre prochain RDV."
          this.SendTwiliSms(smsdesc, this.smsmobileno)
        }
        else {
          this.getbookappointmentbydoctorid()
        }
      })
    }
  }


  diasoaptypeid: any;

  public InsertFreecallazureNotification(pEmail) {

    if (this.languageid == '1') {
      var entity = {
        'Description': "The consultation was unsuccessful due to technical reasons. The doctor has activated a free call. Please schedule as call on your homepage.",
        'ToUser': pEmail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': "La consultation n'a pu aboutir. Merci de prendre un nouveau RDV (non payant) pour poursuivre la téléconsultation.",
        'ToUser': pEmail,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }


  public pdfurl: any;

  public SavePDF() {
    ;

    let pdfContent = window.document.getElementById("content");
    var doc = new jsPDF('p', 'mm', "a4");

    html2canvas(pdfContent).then(canvas => {
      ;
      var imgData = canvas.toDataURL('image/jpeg', 1.0);

      doc.setFontSize(2);

      doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      var pdf = doc.output('blob');

      var file = new File([pdf], "DocReceipt" + ".pdf");

      let body = new FormData();

      body.append('Dan', file);

      let foldername = this.patientid + '/' + 'Receipts'

      this.docservice.DoctorReports(file, foldername).subscribe(res => {
        ;
        this.pdfurl = res;
        this.UpdateReceipt();

      });
    });
  }


  public UpdateReceipt() {

    var entity = {
      'AppointmentID': this.appointmentID,
      'ReceiptURL': this.pdfurl
    }
    this.docservice.UpdateBookAppoinmentReceiptUrl(entity).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Receipt Sent Successfully');
      }
      else {
        Swal.fire('Le reçu a été envoyé avec succès');
      }
    })
  }




  public availabletime: any;

  slottime: any;

  //refund details



  public GetRefundPatientDetailsID(details) {

    this.appointmentid = details.appointmentID,
      this.patientID = details.primarypatientid,
      this.paidamount = details.paidAmount,
      this.email = details.pEmail
    this.smsmobileno = details.smsmobileno

  }


  public refundreason: any;


  public updaterefund() {

    var entity = {
      'AppointmentID': this.appointmentid,
      'RefundComments': this.refundreason
    }
    this.docservice.UpdateBookAppointmentRefund(entity).subscribe(data => {

      this.updateWalletdetails()
      this.InserWlletlog()
      this.insertWalletnotification()
      if (this.languageid == 1) {
        var smsdesc = "We like to inform you that Dr." + this.user + " has refunded " + this.paidamount + "MAD to your Voiladoc Wallet  "
        this.SendTwiliSms(smsdesc, this.smsmobileno)
      }
      else {
        var smsdesc = "Nous vous informons que le  Dr." + this.user + " a remboursé " + this.paidamount + " MAD . sur votre portefeuille Voiladoc."
        this.SendTwiliSms(smsdesc, this.smsmobileno)
      }


      if (this.languageid == 1) {
        Swal.fire('Amount Refunded Successfully');
        this.getbookappointmentbydoctorid();

        this.refundreason = "";
      }
      else {
        Swal.fire('Montant remboursé avec succès.');
        this.getbookappointmentbydoctorid();

        this.refundreason = "";
      }

    })
  }

  public updateWalletdetails() {

    var entity = {
      'PatientID': this.patientID,
      'WalletAmount': this.paidamount
    }
    this.docservice.UpdatePatientWalletAmountDetailsLoadWallet(entity).subscribe(data => {

      this.InsertRefundAzureNotification()

      // Swal.fire('Amount Added Successfully to Your Wallet');
    })
  }




  public insertWalletnotification() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.patientID,
        'Notification': "Amount Refunded By" + this.user,
        'Description':"We like to inform you that Dr." + this.user + " has refunded " + this.paidamount + "MAD to your Voiladoc Wallet  ",
        'NotificationTypeID': 30,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.appointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'PatientID': this.patientID,
        'Notification': "Amount Refunded By" + this.user,
        'Description':"Nous vous informons que le  Dr." + this.user + " a remboursé " + this.paidamount + " MAD . sur votre portefeuille Voiladoc.",
        'NotificationTypeID': 30,
        'Date': this.todaydate,
        'LanguageID': this.languageid,
        'AppointmentID': this.appointmentid
      }
      this.docservice.InsertNotificationsWebLatest(entity).subscribe(data => {

        if (data != 0) {

        }

      })
    }
  }


  public InserWlletlog() {
    var entity = {
      'PatientID': this.patientID,
      'Date': this.serverdate,
      'Time': this.servertime,
      'User': this.user,
      'Reason': "Nous vous informons que le  Dr." + this.user + " a remboursé " + this.paidamount + " MAD . sur votre portefeuille Voiladoc.",
      'Amount': this.paidamount,
      'DoctorID': this.doctorid,
      'AppointmentID': this.appointmentid,
      'PaymentType': 1,
      'TypeID': 1
    }
    this.docservice.InsertPatient_WalletLogWeb(entity).subscribe(data => {
      if (data != 0) {

      }
    })
  }





  public InsertRefundAzureNotification() {

    if (this.languageid == '1') {
      var entity = {
        'Description': this.user + " has Refunded amount in your wallet" + this.paidamount + ". Please use Voiladoc for further bookings  ",
        'ToUser': this.email
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == '6') {
      var entity = {
        'Description': this.user + " has Refunded amount in your wallet" + this.paidamount + ". Please use Voiladoc for further bookings  ",
        'ToUser': this.email
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
  }


  public GetReportPdf(pdf) {

    window.open(pdf, "_blank");
  }




  public GetReportsssss(pdf) {

    window.open(pdf, "_blank");
  }





  // public InserWlletlog() {
  //   var entity = {
  //     'PatientID': this.patientid,
  //     'Date': this.serverdate,
  //     'Time': this.servertime,
  //     'User': this.user,
  //     'Reason': this.reason,
  //     'Amount': this.entermoney
  //   }
  //   this.docservice.InsertPatient_WalletLog(entity).subscribe(data => {
  //     if (data != 0) {

  //     }
  //   })
  // }






  //


  Prescription: any;
  Test: any;
  soappdf: any;
  medicalcertificate: any;
  referals: any;
  medical: any;
  pdfprslist: any;

  public GetAllPrescription(appointmentid, email, patientID) {
    this.appointmentid = appointmentid;
    this.email = email;
    this.patientid = patientID;
    // this.docservice.GetBookAppointmentByAppID(this.languageid, patientid, 1).subscribe(data => {
    //   this.pdfprslist = data;
    // })
  }

  public GenaratePdf() {
    this.spinner.show()
    this.docservice.GetBookAppointmentByAppID(this.languageid, this.appointmentid, 1).subscribe(data => {
      this.pdfprslist = data;
      this.spinner.hide()
      // document.getElementById("mymodalss").click();

    })

  }





  public DownloadPDf() {
    this.spinner.show()
    var data = document.getElementById('Prescriptions');

    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();

      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft >= 0) {
        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.deletePage(1)

      this.spinner.hide()
      doc.save('Reports.pdf');
    });
  }










  public sendattchmenturl = [];
  emailurl: any;

  public SavePdf() {
    this.spinner.show()
    var data = document.getElementById('Prescriptions');

    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();

      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft >= 0) {
        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.deletePage(1)
      var pdf = doc.output('blob');
      var file = new File([pdf], "Report" + ".pdf");
      let body = new FormData();
      body.append('Dan', file);
      debugger
      let folder = this.patientid + '/' + 'Consulation Report'
      this.docservice.DoctorReports(file, folder).subscribe(res => {
        ;
        // ReceiptUpload
        // DoctorPdfreports
        debugger
        this.sendattchmenturl.push(res);
        let a = this.sendattchmenturl[0].slice(2);

        let b = 'https://maroc.voiladoc.org' + a;
        this.emailurl = b;

        this.SendMailReport()
        this.updateReport();
        this.spinner.hide()
      });

      // doc.save('Prescriptions.pdf');
    });
  }




  public updateReport() {

    var entity = {
      'ApointmentID': this.appointmentid,
      'ReportPdfsUrl': this.sendattchmenturl[0]
    }
    this.docservice.UpdateBookAppointmentReportPdfsUrl(entity).subscribe(data => {
      this.sendattchmenturl = [];
      this.sendattchmenturl.length = 0;

    })
  }
  public noattachments = []

  public SendMailReport() {

    if (this.languageid == 1) {
      var sub = "Medical report";
      var emaildesc = "As you requested, " + this.user + " sent a medical report. Please click on the link below." + this.emailurl + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team'
    }
    else {
      var sub = "Rapport de consultation"
      var emaildesc = "Comme vous l'avez demandé, le " + this.user + " a envoyé un rapport médical. Veuillez cliquer sur le lien ci-dessous." + this.emailurl + "<br><br>" + 'Cordialement,' + "<br>" + 'Voiladoc Team'
    }

    var entity = {
      'emailto': this.email,
      'emailsubject': sub,
      'emailbody': emaildesc,
      'attachmenturl': this.noattachments,
      'cclist': this.cclist,
      'bcclist': this.bcclist
    }
    this.docservice.sendemail(entity).subscribe(data => {

      let res = data;
      if (this.languageid == 1) {
        Swal.fire('Mail sent successfully.');
      }

      else if (this.languageid == 6) {
        Swal.fire('Email envoyé avec succès');
      }
    })
  }




  vitalslist: any;
  oxygen: any;
  bpm: any;
  cpm: any;
  stress: any;
  bloodpressure: any;



  public getvitaldetails(appointmentid) {

    this.docservice.GetPatient_VitalDetailsWeb(appointmentid, 1).subscribe(
      data => {
        this.vitalslist = data;
        this.oxygen = this.vitalslist[0].oxygenSaturation,
          this.bpm = this.vitalslist[0].bpm,
          this.cpm = this.vitalslist[0].rr,
          this.stress = this.vitalslist[0].streeLevel,
          this.bloodpressure = this.vitalslist[0].bloodPressureStatus
      }, error => {
      }
    )
  }





  //vaccination 



  firstvaccinedate: any;
  secondvaccinedate: any;
  firstvaccine: any;
  secondvaccine: any;


  vaccinationStatus() {
    debugger
    let firstvaccinedate = this.docservice.GetDates(this.firstvaccinedate)

    var entity = {
      'VaccinationName': this.firstvaccine,
      'VaccinationDate': firstvaccinedate,
      'PatientID': this.patientID,
      'AppointmentID': this.appointmentid
    }
    this.docservice.InsertPatient_VaccinationDetails(entity).subscribe(data => {
      debugger
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        this.getvaccinatindetails();
        this.firstvaccinedate = "";
        this.secondvaccinedate = "";
        this.firstvaccine = "";
        this.secondvaccine = "";
      }
      else {
        Swal.fire('Les vaccins ont été mis à jour.');
        this.getvaccinatindetails();
        this.firstvaccinedate = "";
        this.secondvaccinedate = "";
        this.firstvaccine = "";
        this.secondvaccine = "";
      }

    })
  }


  vaccinationlist: any;



  getvaccinatindetails() {
    this.docservice.GetPatient_VaccinationDetails(this.patientID).subscribe(
      data => {
        this.vaccinationlist = data;

      }, error => {
      }
    )

  }



  //Allergies


  allergieslist = [];
  myarray = [];
  allergyidcount: any;
  public GetAllerges() {
    // this.allergieslist = this.allergies.split(',')

    // this.allergies = []
    // for (let i = 0; i < this.allergieslist.length; i++) {
    //   var wtt = {
    //     displayValue: this.allergieslist[i]
    //   }

    //   this.allergies.push(wtt);
    // }

    // this.allergyidcount=0
    debugger
    this.myarray = []
    let showalergres = this.allergies.split(',');
    debugger
    for (let i = 0; i < showalergres.length; i++) {
      var medetty = {
        'Showallergies': showalergres[i],
        'Snoo': i + 1
      }
      this.myarray.push(medetty);
      this.allergyidcount = this.allergyidcount + 1;

    }
  }




  public updateelergies: any;

  public deletealergeies(Sno) {

    for (let i = 0; i < this.myarray.length; i++) {
      if (Sno == this.myarray[i].Snoo) {
        this.myarray.splice(i, 1);
      }
    }
    this.updateelergies = '';
    for (let j = 0; j < this.myarray.length; j++) {

      if (this.updateelergies == '') {
        this.updateelergies = this.myarray[j].Showallergies;
      }
      else {
        this.updateelergies = this.updateelergies + ',' + this.myarray[j].Showallergies;
      }

    }
    this.Updatealriesss()
  }



  public Updateallergies() {
    this.updateelergies = '';
    debugger

    for (let j = 0; j < this.myarray.length; j++) {

      if (this.updateelergies == '') {
        this.updateelergies = this.myarray[j].Showallergies;
      }
      else {
        this.updateelergies = this.updateelergies + ',' + this.myarray[j].Showallergies;
      }

    }

    var entity = {
      'AppointmentID': this.appointmentid,
      'KnownAllergies': this.updateelergies
    }
    this.docservice.UpdateBookAppointmentKnownAllergies(entity).subscribe(data => {

      let res = data;
      if (this.languageid == 1) {
        Swal.fire('Allergies Updated Successfully');
        this.allergieslist = [];
        this.allergies = this.updateelergies;

      }
      else if (this.languageid == 6) {
        Swal.fire('Les allergies ont été mises à jour');
        this.allergieslist = [];
        this.allergies = this.updateelergies;

      }
    })
  }


  addallergies: any;

  public updatedetsils() {

    var medetty = {
      'Showallergies': this.addallergies,
      'Snoo': this.myarray.length + 1
    }
    this.myarray.push(medetty);

    this.Updateallergies()
  }


  public Updatealriesss() {

    var entity = {
      'AppointmentID': this.appointmentid,
      'KnownAllergies': this.updateelergies
    }
    this.docservice.UpdateBookAppointmentKnownAllergies(entity).subscribe(data => {
      let res = data;
      if (this.languageid == 1) {


      }
      else if (this.languageid == 6) {


      }
    })
  }

}

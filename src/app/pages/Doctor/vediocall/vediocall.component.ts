import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import config from '../../../config';
import { timer } from 'rxjs';
import { OpentokService } from '../../../opentok.service';
import * as OT from '@opentok/client';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';



@Component({
  selector: 'app-vediocall',
  templateUrl: './vediocall.component.html',
  styleUrls: ['./vediocall.component.css']
})
export class VediocallComponent implements OnInit {
  play: boolean;
  unitofmeasure: any;
  dosage: any;
  sig: any;
  duration: any;
  dispensequantity: any;
  notetopharmacist: any;
  diagnosis: any;
  howmanyrefills: any;
  // showModal: boolean;

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, private ref: ChangeDetectorRef, public opentokService: OpentokService) {
    this.changeDetectorRef = ref;

  }

  session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  public patientdetails: any;
  public patientid: any;
  public apiKey;
  public sessionId;
  public token;
  public archiveID;
  public doctorid: any;
  public prescrptionlist: any;
  public details: any;
  public patientname: any;
  public mobileno: any;
  public emailid: any;
  public appointmentid: any;
  public patientidd: any;
  public appointmentno: any;
  public appointmentdate: any;
  public email: any;
  public reasonforappointment: any;
  public diagnosticlist: any;
  public pddddd: any;
  public soapddddd: any;
  public sppp: any;
  public gtsss: any;
  public cheif: any;
  public historyofillness: any;
  public medcondition: any;
  public meditations: any;

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
  public plan: any;
  public getss: any;
  public getoo: any;
  public getaa: any;
  public getpp: any;
  public soaplist: any;
  public issubscriberready = false;
  public isRecordingstoped = false;
  public appointmentdatetime: any;
  public details1: any;

  public pdpd: any;
  public pdpp: any;
  public pddt: any;
  public ondemandid: any;
  public soaplist1: any;

  public showchat: any;


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
  public soaplist2: any;
  public objective: any;

  public quantity: any;
  public bmi: any;




  public medicineid: any;
  public consumelist: any;
  public consumeid: any;

  public medicinename: any;
  public morning: any;
  public afternoon: any;
  public evening: any;
  public night: any;
  public noofdays: any;
  public date: any;
  public patientiddd: any;
  public todaydate: any;
  public medicinelist: any;
  public idcount: any;

  public testslist: any;
  public testid: any;
  public diatest: any;
  public qwerty = [];
  public tablecount: any;
  public diagnostictesttypename: any;
  public diapatientid: any;
  public validtill: any;

  public tablecuont1: any;
  public qwerty2 = [];
  public medicinenamede: any;
  public consumename: any;

  public tsetssslist: any;

  public diagnostictestname: any;
  public testssid: any;


  Date2: any;
  DateChanged2: boolean = false;
  Date: any;
  DateChanged: boolean = false;


  public languageid: any;
  public labels: any;
  public clinicinfo: any;
  public medicationlist: any;
  public endorse: any;
  public showhistory: any;
  public age: any;




  //chat 


  // public patientiddd: any;
  public appointmentiddd: any;
  public appointmentdatetimee: any;
  // public details: any;
  // public doctorid: any;
  public chatconversation = "";
  public serverdate: any;
  public servertime: any;
  public serverdateandtime: any;
  public docmsges = [];
  public patientmsges = [];
  public istyping = false;
  coversationarray = [];
  // public patientname: any;

  // public mobileno: any;
  public patientphoto: any;
  public docphoto: any;
  public chatID: any;
  public attachments = [];
  public attachmentsurl = [];
  public imageurl: any;
  public image: any;


  public gender: any;
  public dateofbirth: any;
  public height: any;
  public wight: any;
  public minutes: any;
  public seconds: any;
  public docname: any;

  time: number = 0;
  interval;
  public display: any;
  public sidate: any;
  public countryid: any;
  public cityid: any;
  public areaid: any;
  public appointmenttypeid: any;
  public localdocid: any;

  public localdoclist: any;
  public showhistoryid: any;
  public savetemplate: any;
  public chatIDlist: any;
  manuallydrug: any;
  user: any;

   public showclosebutton: any;
  ngOnInit() {

    this.minutes = 0;
    this.seconds = 0;

    // document.getElementById('def_op').click();
    this.docservice.showvid = 1;

    var countDownDate = new Date().getTime();


    document.getElementById("sidbarid").style.display = "none";

    document.getElementById("vidiv").classList.remove('col-lg-10');
    document.getElementById("vidiv").classList.add("col-lg-12");
    document.getElementById("vidpagehead").style.display = "none";


    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = now - countDownDate;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      document.getElementById("demo").innerHTML = minutes + "m " + seconds + "s ";

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);


    //document.getElementById("videocall_1234").style.display = "block";
    this.display = "block";

    this.Date = new Date();
    this.idcount = 1;
    this.allergyidcount = 1;
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    const llll = 'dd-MMM-yyyy';
    const sigdate = new Date();
    const locales = 'en-US';
    this.sidate = formatDate(sigdate, llll, locales);

    this.docname = localStorage.getItem('user');


    this.languageid = localStorage.getItem('LanguageID');
    this.user = localStorage.getItem('user');
    if (this.languageid == 1) {
      this.signature = 'Electronically signed by ' + this.docname + ' ' + this.sidate;
    }
    else if (this.languageid == 6) {
      this.signature = 'Signature électronique du ' + this.docname + ' ' + this.sidate;
    }
    this.getlanguage();
    document.getElementById('stoprecoring').style.display = 'none';
    // document.getElementById('viewrecoring').style.display = 'none';

    // document.getElementById('stoprecoring_forshow').style.display = 'block';
    this.activatedroute.params.subscribe(params => {

      // this.patientid = params['patientID'];
      // this.appointmentid = params['appointmentID'];
      // this.appointmentdatetime = params['appdate'];

      this.patientid = localStorage.getItem('patientID');
      this.appointmentid = localStorage.getItem('appointmentID');
      this.appointmentdatetime = localStorage.getItem('appdate');
    }
    )
   this.showclosebutton = 0;

    // this.docservice.GetVideoStatus(this.appointmentid).subscribe(res => {
    //   this.compltedlist = res;
    //   if (this.compltedlist[0].completed == 2) {
    //     if (this.count == 1) {
    //       this.count = this.count + 1
    //       Swal.fire('Patient Ended The Session');
    //     }
    //   }
    // })


    //chat
    this.image = 0;
    this.savetemplate = 2;
    this.manuallydrug = 2
    this.substainable = 1;

    this.getserverdateandtime();

    // this.appointmentiddd = 570;
    this.appointmentdatetimee = localStorage.getItem('appdate');


    this.getserverdateandtime();

    // this.docservice.GetChatID(this.doctorid, this.patientid).subscribe(res => {
    //   ;
    //   this.chatIDlist = res;
    //   this.chatID = this.chatIDlist[0].chatID
    //   this.getPreviousChat();
    //   this.oberserableTimer();
    //   this.getserverdateandtime();
    //   // this.appointmentiddd = 570;
    //   this.appointmentdatetimee = localStorage.getItem('appdate');
    //   this.getserverdateandtime();
    //   this.getPreviousChat();
    //   this.oberserableTimer();
    // })
    ;
    // this.languageid = localStorage.getItem('LanguageID');
    this.doctorid = localStorage.getItem('userid');
    this.getpatientdetails();
    this.getdoctorpatinetdetails();
    this.getpatient_diagnosticdetails();
    this.getdoctorpatientdetailsbydocidandpatientid();
    this.Getmedicinetypemaster();
    this.GetWhenConsumemedicals();
    this.getdiagnosticcentertests();
    this.GetCurrentMedications();
    this.GetDoctorPrescrptionTemplates()
    this.geticdcode()
    this.GetDoctorSoapNotesTemplates()
    this.GetDrugnamemaster()

    this.pddddd = 1;
    this.pdpd = 1;
    ;


    let jjj = document.getElementById("Completed");
    if (jjj != null) {
      document.getElementById("Completed").style.display = "block";
    }
    // tok bok vamsi  start


    // this.docservice.GetBooked_DoctorPatientBookedVideoConferencebyppointmentID(this.appointmentid).subscribe(
    //   data => {
    //     if (data.length > 0) {

    //       config.SESSION_ID = data[0].sessionID,
    //         config.TOKEN = data[0].token
    //       this.insertvedioeconferencedetails();
    //     }
    //     else {
    //       this.opentokService.getsessionandtoken().subscribe(res => {
    //         config.SESSION_ID = res['sessionid'];
    //         config.TOKEN = res['token'];

    //         this.insertvedioeconferencedetails();
    //       })
    //     }
    //   }, error => {
    //   }
    // )

    this.opentokService.getsessionandtoken().subscribe(res => {
      config.SESSION_ID = res['sessionid'];
      config.TOKEN = res['token'];

      this.insertvedioeconferencedetails();
    })

    // tok bok vamsi End
    this.GetSoapNotesByPatientID();
    this.medicinetemplate = 2;
    this.oberserableTimer();

  }


  newtab() {
    window.open('www.facebook.com', '_blank');
  }


  endsession
  public getlanguage() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.endsession = this.labels[0].endsession
      }, error => {
      }
    )
  }


  public GetSoapNotesByPatientID() {
    this.docservice.GetSoapNotesByPatientID(this.patientid, this.languageid,this.doctorid).subscribe(
      data => {

        this.soaplist1 = data;
      }, error => {
      }
    )

  }


  public insertvedioeconferencedetails() {
    var entity = {
      'DoctorID': this.doctorid,
      'PatientID': this.patientid,
      'AppointmentID': this.appointmentid,
      'Token': config.TOKEN,
      'SessionID': config.SESSION_ID
    }
    this.docservice.InsertBook_DoctorPatientBookedVideoConference(entity).subscribe(data => {
      ;
      if (data != 0) {
        this.opentokService.initSession().then((session: OT.Session) => {
          this.session = session;

          this.session.on('streamCreated', (event) => {
            ;
            this.streams.push(event.stream);
             this.showclosebutton = 1;
            debugger
            document.getElementById('stoprecoring').style.display = 'block';

            // document.getElementById('stoprecoring_forshow').style.display = 'none';

            this.startarchive();
            this.changeDetectorRef.detectChanges();
          });
          this.session.on('streamDestroyed', (event) => {
            this.stoparchive();
            const idx = this.streams.indexOf(event.stream);

            if (idx > -1) {
              this.streams.splice(idx, 1);
              this.changeDetectorRef.detectChanges();
            }
          });
          this.session.on('archiveStarted', (event) => {

            this.archiveID = event.id;
            this.updatearchiveid(this.archiveID);
          });
          this.session.on('archiveStopped', (event) => {
            ;
            this.archiveID = event.id;

          });
        })

          .then(() => this.opentokService.connect())
          .catch((err) => {
            console.error(err);
            alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
          });
      }
      else {
        this.updatearchiveid('notyet')

        this.opentokService.initSession().then((session: OT.Session) => {
          this.session = session;
          this.session.on('streamCreated', (event) => {
            this.streams.push(event.stream);
             this.showclosebutton = 1;
            document.getElementById('stoprecoring').style.display = 'block';
            // document.getElementById('stoprecoring_forshow').style.display = 'none';
            this.startarchive();

            this.changeDetectorRef.detectChanges();
          });
          this.session.on('streamDestroyed', (event) => {
            ;
            this.stoparchive();
            debugger

            const idx = this.streams.indexOf(event.stream);
            if (idx > -1) {
              this.streams.splice(idx, 1);
              this.changeDetectorRef.detectChanges();
            }
          });
          this.session.on('archiveStarted', (event) => {

            this.archiveID = event.id;
            this.updatearchiveid(this.archiveID);
          });
          this.session.on('archiveStopped', (event) => {
            this.archiveID = event.id;
          });
        })
          .then(() => this.opentokService.connect())
          .catch((err) => {
            console.error(err);
            alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
          });

      }
    })
  }

  public updatearchiveid(archiveID) {
    var entity = {
      'DoctorID': this.doctorid,
      'PatientID': this.patientid,
      'AppointmentID': this.appointmentid,
      'ArchiveID': archiveID,
      'Token': config.TOKEN,
      'SessionID': config.SESSION_ID
    }
    this.docservice.UpdateBook_DoctorPatientBookedVideoConference(entity).subscribe(res => {

    })
  }




  public getcityy(evn, cityname) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityname).style.display = "block";
    evn.currentTarget.className += " active";
  }

  public getcityrtret(evn, cityname) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityname).style.display = "block";
    evn.currentTarget.className += " active";
  }



  public getcityyyyyyyy(evn, cityname) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityname).style.display = "block";
    evn.currentTarget.className += " active";
  }




  public deleteprscriptonforpatient(id) {

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





  public pd() {
    this.pddddd = 1;
    this.soapddddd = 0;
    this.showchat = 0;
    this.getss = 0;
    this.getoo = 0;
    this.getaa = 0;
    this.getpp = 0;
    this.showid = 0;
    this.showhistory = 0
  }

  public getcity(evn, cityname) {

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityname).style.display = "block";
    evn.currentTarget.className += " active";
  }

  public soap() {

    this.pddddd = 0;
    this.soapddddd = 1;
    this.showchat = 0;
    this.showhistoryid = 0
    this.showid = 0;
    this.showhistory = 0
    document.getElementById("qwerty_1234").style.display = "block";

  }
  public chat() {
    this.pddddd = 0;
    this.soapddddd = 0;
    this.showchat = 1;
    this.showid = 0;
    this.showhistoryid = 0
    this.showhistory = 0
  }

  public history() {
    this.pddddd = 0;
    this.soapddddd = 0;
    this.showchat = 0;
    this.showid = 0;
    this.showhistory = 1;
  }

  public soap1() {
    this.pddddd = 1;
    this.soapddddd = 0;
  }
  public gets() {
    this.getss = 1;
    this.getoo = 0;
    this.getaa = 0;
    this.getpp = 0;

  }


  public geto() {

    this.getss = 0;
    this.getoo = 1;
    this.getaa = 0;
    this.getpp = 0;


  }
  public geta() {

    this.getss = 0;
    this.getoo = 0;
    this.getaa = 1;
    this.getpp = 0;


  }
  public getp() {

    this.getss = 0;
    this.getoo = 0;
    this.getaa = 0;
    this.getpp = 1;

  }


  ispatientpragnent: any;
  breastFeeding: any;
  allallergies = []
  allergieslist: any;
  public allergies = []

  nationalidentityno: any;
  medicalhistory: any;
  surgeryHistory: any;
  longtermtreatment: any;
  vaccinationStatus: any;
  dieteryissues: any;
  alcohol: any;
  Smoker: any;
  medicalinsurence: any;
  exercise: any;
  showallergies: any;
  drugname: any;
  attendingdoctor: any;
  photoexist: any;
  public videoexist: any;

  public getpatientdetails() {
    this.docservice.GetBookAppointmentByPatientID(this.patientid, this.appointmentid, this.languageid).subscribe(
      data => {

        this.details = data[0];
        this.patientname = this.details.pName,
          this.mobileno = this.details.mobileNumber,
          // this.emailid = this.details.pEmail,
          this.patientidd = this.details.patientID,
          this.appointmentno = this.details.appointmentID,
          this.appointmentdate = this.details.apptDateTime,
          // this.mobileno = this.details.mobileNumber,
          this.email = this.details.pEmail,
          this.reasonforappointment = this.details.reasonForVisit,
          this.gender = this.details.gender,
          this.dateofbirth = this.details.dateofbirth,
          this.height = this.details.height,
          this.wight = this.details.weight,
          this.bmi = this.details.bmi,
          this.age = this.details.age,
          this.countryid = this.details.countryID,
          this.cityid = this.details.cityID,
          this.areaid = this.details.areaID,
          this.appointmenttypeid = this.details.appointmentTypeID,
          this.ispatientpragnent = this.details.isPatientPragnent,
          this.breastFeeding = this.details.breastFeeding,

          this.nationalidentityno = this.details.nationalidno,
          this.medicalhistory = this.details.medicalHistory,
          this.surgeryHistory = this.details.surgeryHistory,
          this.longtermtreatment = this.details.longtermTreatment,
          this.vaccinationStatus = this.details.vaccinationStatus,
          this.dieteryissues = this.details.dietaryIssues,
          this.alcohol = this.details.alcohol,
          this.Smoker = this.details.smoker,
          this.showallergies = this.details.knownAllergies,
          this.medicalinsurence = this.details.medicalinsurance,
          this.exercise = this.details.exercise,
          this.attendingdoctor = this.details.attendingdoctor,

          this.photoexist = this.details.photoexist,
          this.videoexist = this.details.videoexist,

          this.showdrugname = this.details.drugName,
          this.showdosage = this.details.dosage,
          this.showfrequency = this.details.frequency,


          this.allergieslist = this.details.knownAllergies.split(',')

        this.allergies = []
        for (let i = 0; i < this.allergieslist.length; i++) {
          var wtt = {
            displayValue: this.allergieslist[i]
          }

          this.allergies.push(wtt);
        }

        this.SendNotification()


        this.docservice.UpdateAlertbit(this.appointmentid).subscribe(
          data => {

          }, error => {
          }
        )
        this.GetAllerges()

        this.docservice.GetLocalDoctorRegistrationByCityID(this.countryid, this.cityid, this.areaid).subscribe(
          data => {

            this.localdoclist = data;

            this.localdocid = this.localdoclist[0].id
          }, error => {
          }
        )

      }, error => {
      }
    )
  }





  public SendNotification() {

    if (this.languageid == 1) {
      var entity = {
        'Description': "Doctor Has Started Video Please Join ",
        'ToUser': this.email,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    else if (this.languageid == 6) {
      var entity = {
        'Description': "Le médecin a commencé la vidéo, veuillez rejoindre",
        'ToUser': this.email,
      }
      this.docservice.PostGCMNotifications(entity).subscribe(data => {

        if (data != 0) {

        }
      })

    }

  }

  showdrugname: any;
  showfrequency: any;
  showdosage: any;



  public GetCurrentMedications() {

    this.docservice.GetPatientCurrentMedicationByID(this.appointmentid).subscribe(
      data => {

        this.medicationlist = data;



      }, error => {
      }
    )
  }


  public getdoctorpatinetdetails() {

    this.docservice.GetDoctor_PatientPrescriptionByDoctorIDandPatientID(this.patientid, this.languageid,this.doctorid).subscribe(
      data => {

        this.prescrptionlist = data;
      }, error => {
      }
    )
  }

  public getpatient_diagnosticdetails() {

    this.docservice.GetDoctor_PatientDiagnosticsbypatientdeatils(this.patientid, this.languageid,this.doctorid).subscribe(
      data => {

        this.diagnosticlist = data;
      }, error => {
      }
    )
  }



  public VisitDoctorAppointmentStatus() {

    this.docservice.UpdateVisitedBitByDoctor(this.appointmentid).subscribe(
      data => {

      }, error => {
      }
    )
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


  miscomments: any;

  public updatecomments() {

    var entity = {
      'ID': this.patientid,
      'MisUseComments': this.miscomments
    }
    this.docservice.UpdatePatientRegistrationMisUseComments(entity).subscribe(res => {
      let test = res;

    })
  }

  templatename: any;


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

        Swal.fire('Completed', 'Details saved successfully', 'success');


      }
    })
  }

  public GetDoctorSoapNotesTemplates() {

    this.docservice.GetDoctorSoapNotesTemplates().subscribe(
      data => {

        this.doctemplatelist = data;
        this.templatelist = this.doctemplatelist.filter(x => x.doctorID == this.doctorid)
      }, error => {
      }
    )
  }


  templateid: any;
  doctemplatelist: any;
  templatelist: any;

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
    }
  }


  icddesc: any;


  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),

      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


  // public getid() {
  //   
  //   if (this.icddesc == '') {
  //     this.icdcode = ''
  //   }
  //   else {
  //     let wqew = this.icdcodelist.filter(v => v.description.toLowerCase().indexOf(this.icddesc.toLowerCase()) > -1);
  //     this.icdcode = wqew[0].icdCode,
  //       this.icrcodeid = wqew[0].id
  //     
  //   }

  // }
  showsearchsoap: any;

  public SearchIcrCode() {

    if (this.icddesc == '') {
      this.icdcode = ''
      this.showsearchsoap = 0
    }
    else {
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
      'LanguageID': this.languageid,
      'ICRCode': this.icdcode,
      'ICRDescription': this.icddesc,
      'ICRID': this.icrcodeid
    }

    this.docservice.InsertDoctor_PatientSoapNotes1(entity).subscribe(data => {
      if (data != 0) {
        this.soapid = data;
        if (this.savetemplate == 1) {
          this.InsertDoctorSoapNoteTemplate()
        }
        this.insertsoapnotes2();
        this.insertsoapnotes3();
        this.insertsoapnotes4();
        this.GetDoctorSoapNotesTemplates()

        if (this.misuse == 1) {

          this.docservice.GetPatientRegistrationMisuseBit(this.patientid).subscribe(data => {
          })
          this.updatecomments();
        }
        else if (this.misuse == 0) {
          this.docservice.GetPatientRegistrationMisuseEnablebit(this.patientid).subscribe(data => {
          })
        }
        if (this.languageid == 1) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
        }
        else {
          Swal.fire('Détails enregistrés', 'SOAP');
        }
        this.GetSoapNotesByPatientID();
        this.InsertNotificationSoapnotes()
        this.VisitDoctorAppointmentStatus()
        this.clear();
        this.icdcode = ""
        this.icddesc = ""

      }
    })

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
        'Notification': "Le docteur a ajouté des notes SOAP pour vous.",
        'Description': this.user + " Votre rapport de consultation est maintenant disponible dans Mon dossier médical.",
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








  public insertsoapnotes2() {
    var entity = {
      'DoctorID': this.doctorid,
      'PatientID': this.patientid,
      'SoapID': this.soapid,
      'Objective': this.objective
    }
    this.docservice.InsertDoctor_PatientSoapNotes2(entity).subscribe(data => {

      if (data != 0) {
        if (this.languageid == 1) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
        }
        else {
          Swal.fire('Détails enregistrés', 'SOAP');
        }
      }
    })
  }

  public insertsoapnotes3() {
    var entity = {
      'Assessment': this.assessment,
      'DoctorID': this.doctorid,
      'PatientID': this.patientid,
      'SoapID': this.soapid
    }
    this.docservice.InsertDoctor_PatientSoapNotes3(entity).subscribe(data => {
      if (data != 0) {
        if (this.languageid == 1) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
        }
        else {
          Swal.fire('Détails enregistrés', 'SOAP');
        }

      }
    })
  }

  public insertsoapnotes4() {
    var entity = {
      'Plan': this.plan,
      'DoctorID': this.doctorid,
      'PatientID': this.patientid,
      'SoapID': this.soapid,
      'DiagnosisCode': this.diagnosiscode,
      'Orders': 0,
      'SickSlip': 0,
      'FollowUpPlan': this.followupplan,
      'Signature': this.signature,
      'Notes': this.notes,
    }
    this.docservice.InsertDoctor_PatientSoapNotes4(entity).subscribe(data => {
      if (data != 0) {
        if (this.languageid == 1) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
        }
        else {
          Swal.fire('Détails enregistrés', 'SOAP');
        }
      }
    })
  }

  public getdoctorpatientdetailsbydocidandpatientid() {

    this.docservice.GetBookappointmentByDoctorIDandPatientID(this.doctorid, this.patientid).subscribe(
      data => {
        this.soaplist = data;
      }, error => {
      }
    )
  }

  public GetSoapID(soapid) {

    this.soapid = soapid;

    this.getsopanotesbyid()
  }

  public getsopanotesbyid() {
    this.docservice.GetSoapNotesByID(this.soapid, this.languageid).subscribe(
      data => {

        this.soaplist = data;
        if (this.soaplist == null || this.soaplist == undefined || this.soaplist.length == 0) {
          this.subjective = "";

          this.assessment = "";
          this.plan = "";
          this.diagnosiscode = "";
          this.followupplan = "";
          this.notes = "";
          this.neurological = "";
          this.objective = "";

        }
        else {
          this.subjective = this.soaplist[0].subjective,
            this.assessment = this.soaplist[0].assessment,
            this.plan = this.soaplist[0].plan,
            this.diagnosiscode = this.soaplist[0].diagnosisCode,
            this.followupplan = this.soaplist[0].followUpPlan,
            this.notes = this.soaplist[0].notes,
            this.neurological = this.soaplist[0].neurological,
            this.objective = this.soaplist[0].objective,
            this.signature = this.soaplist[0].signature,
            this.icddesc = this.soaplist[0].icrDescription,
            this.icdcode = this.soaplist[0].diagnosisCode
        }

      }, error => {
      }
    )
  }

  public clear() {
    this.subjective = "";
    this.assessment = "";
    this.plan = "";
    this.diagnosiscode = "";
    this.followupplan = "";
    this.notes = "";
    this.neurological = "";

  }



  // tok bok vamsi 

  public startarchive() {
    this.play = true;
    this.interval = setInterval(() => {
      this.time++;
    }, 1000)
      ;
    this.opentokService.startArchive().subscribe(res => {
      ;
      let result = JSON.parse(res.toString());
      this.archiveID = result.id;
    })

  }


  public stoparchive() {
    debugger
    this.docservice.GetVideoStatus(this.appointmentid).subscribe(res => {
      this.compltedlist = res;
      if (this.compltedlist[0].completed == 2 && this.compltedlist[0].endSessionStatus == 'Patient') {
        this.count = this.count + 1
        debugger
        Swal.fire('Patient Ended The Call');
        window.close();
      }
      else {
        this.docservice.GetBookAppointmentCompletedSession(this.appointmentid).subscribe(
          data => {
            debugger
            window.close();
            
          }, error => {
          }
        )
      }
    })

    this.docservice.showvid = 0;
    ;
    this.opentokService.stoparchive(this.archiveID).subscribe(res => {
      ;
      let result = res;
      this.opentokService.disconnect_1();
      document.getElementById('stoprecoring').style.display = 'none';
      // document.getElementById('viewrecoring').style.display = 'block';
      document.getElementById('subscibre').style.display = 'none';

      window.close();
    })

    this.VisitDoctorAppointmentStatus()

    // location.href = "#/Myappointments"
    // location.reload()

  }

  public viewArchive() {
    window.location.href = 'https://amazintchtokbox.herokuapp.com/archive/' + this.archiveID + '/view';
  }

  //schedule

  public GetWhenConsumemedicals() {

    this.docservice.GetWhenToConsumeMasterMedicalsByLanguageID(this.languageid).subscribe(
      data => {

        this.consumelist = data;
      }, error => {
      }
    )
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


  docpretempid: any;
  docpretemplates: any;
  docprtemplateslist: any;



  public GetDoctorPrescrptionTemplates() {

    this.docservice.GetDoctorPrescrptionTemplates().subscribe(
      data => {

        this.docpretemplates = data;
        this.docprtemplateslist = this.docpretemplates.filter(x => x.doctorID == this.doctorid)
      }, error => {
      }
    )
  }

  icdcode: any;
  icrdescription: any;
  icrcodeid: any;
  medicinetemplatename: any;
  medicinetemplate: any;

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
  icdcodelist: any;
  icrcodedummlist: any;
  states: any;

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





  // SerachOn
  // public SearchIcrCode(event) {
  //   
  //   if (event != "") {
  //     this.SerachOn = 1;
  //   }
  //   else {
  //     this.SerachOn = 0;
  //   }

  // }

  // public GetIcrCodeID(id, desc, icdCode) {
  //   
  //   this.icrcodeid = id;
  //   this.icrdescription = desc
  //   this.icdcode = icdCode;
  //   this.SerachOn = 0;
  // }





  SerachOn







  // prescription 
  drugnames: any;
  drugnamelist: any;


  search1 = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(termsss => termsss.length < 1 ? []
        : this.drugnames.filter(z => z.toLowerCase().indexOf(termsss.toLowerCase()) > -1).slice(0, 50))
    )

  public GetDrugnamemaster() {

    this.docservice.GetDrugNameMaster(this.languageid).subscribe(
      data => {
        this.drugnamelist = data;

        // this.drugnames = this.drugnamelist.map(x => x.medicament);

      }, error => {
      }
    )
  }

  // public GetDrugNameID() {

  // if (this.medicinename == '') {
  //   this.medicinename = ''
  // }
  // else {
  //   let wqew = this.icdcodelist.filter(v => v.drugnames.toLowerCase().indexOf(this.icddesc.toLowerCase()) > -1);
  //   // this.icdcode = wqew[0].icdCode,
  //   //   this.icrcodeid = wqew[0].id

  // }
  // }



  public SerchDrugName(medicinename) {

    if (medicinename == "") {
      this.SerachOn = 0;

    }
    else {
      this.SerachOn = 1;

      //  this.drugnamelist=this.dummdrugnamelist.filter(x=>x.medicinename)
    }
  }


  public GetDrugID(medicinename) {

    this.medicinename = medicinename
    this.SerachOn = 0
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
      'SubstainablenotPermitted': this.substainable,

    }
    this.docservice.InsertDoctorPrescrptionTemplates(entity).subscribe(data => {

      if (data != 0) {

      }
    })

  }

  substainable: any;

  public adddetails1() {
    this.tablecuont1 = 1;
    var entity1 = {
      'Sno': this.idcount,
      'MedicineTypeID': this.medicineid,
      'DoctorID': this.doctorid,
      'PateintID': this.patientiddd,
      'LanguageID': this.languageid,
      'Date': new Date(),
      'AppointmentID': this.appointmentid,
      'MedicineName': this.medicinename,
      'UnitOfMeasure': this.unitofmeasure,
      'Dosage': this.dosage,
      'SIG': this.sig,
      'Duration': this.duration,
      'DispenseQuantity': this.dispensequantity,
      'NoteToPharmasist': this.notetopharmacist,
      'Diagnosis': this.diagnosis,
      'HowmanyRefills': this.howmanyrefills,
      'ICDCode': this.icdcode,
      'ICDDescription': this.icrdescription,
      'ICDID': this.icrcodeid,
      'SubstainablenotPermitted': this.substainable,

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
    this.icdcode = ""
    this.icrdescription = ""
    this.icrcodeid = ""
    this.medicinetemplate == 2

  }

  public deleteMedicines(Sno) {

    for (let i = 0; i < this.qwerty2.length; i++) {

      if (Sno == this.qwerty2[i].Sno) {

        this.qwerty2.splice(i, 1);
      }
    }

  }

  public InsertPrescription() {

    // if (this.appointmenttypeid == '2') {
    //   this.endorse = 0;
    // }
    // if (this.localdocid == undefined) {
    //   this.endorse = 1;
    // }
    // if (this.appointmenttypeid == '1') {
    //   this.endorse = 1;
    // }
    if (this.appointmenttypeid == '1' || this.localdocid == '0') {
      this.endorse = 1;
    }
    if (this.appointmenttypeid == '2' && this.localdocid != '0') {
      this.endorse = 0;
    }
    if (this.appointmenttypeid == '2' && this.localdocid == '0') {
      this.endorse = 1;
    }
    for (let i = 0; this.qwerty2.length; i++) {

      var entity = {
        // 'MedicineTypeID': this.qwerty2[i].MedicineTypeID,
        'DoctorID': this.qwerty2[i].DoctorID,
        'PateintID': this.patientid,
        'LanguageID': this.qwerty2[i].LanguageID,
        'Date': new Date(),
        'AppointmentID': this.qwerty2[i].AppointmentID,
        'MedicineName': this.qwerty2[i].MedicineName,
        // 'UnitOfMeasure': this.qwerty2[i].UnitOfMeasure,
        // 'Dosage': this.qwerty2[i].Dosage,
        'SIG': this.qwerty2[i].SIG,
        // 'Duration': this.qwerty2[i].Duration,
        'DispenseQuantity': this.qwerty2[i].DispenseQuantity,
        'NoteToPharmasist': this.notetopharmacist,
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
          }
          else {
            Swal.fire('Détails enregistrés', 'Ordonnance');
          }

          this.tablecuont1 = 0;
          this.qwerty2 = [];
          this.getdoctorpatinetdetails();
          this.GetDoctorPrescrptionTemplates()
          this.InsertPrscriptionNotifications()
        }
      })
    }

  }







  public InsertPrscriptionNotifications() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.patientiddd,
        'Notification': this.user + " added prescription for you. ",
        'Description': this.user + " added prescription for you. ",
        'NotificationTypeID': 101,
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
        'Notification': this.user + " Votre ordonnance est maintenant disponible dans Mon dossier médical.",
        'Description': this.user + " Votre ordonnance est maintenant disponible dans Mon dossier médical.",
        'NotificationTypeID': 101,
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
    this.getdiagnostictests();
  }
  public getdiagnostictests() {
    this.docservice.GetDiagnosticTestMasterByTestIDByLanguageID(this.testid, this.languageid).subscribe(
      data => {

        this.tsetssslist = data;
      }, error => {
      }
    )
  }
  public GetDiagnosticTestssID(even) {
    this.testssid = even.target.value;
    // for (let i = 0; i < this.tsetssslist.length; i++) {
    //   if (this.tsetssslist[i].id == this.testssid) {
    //     this.diagnostictestname = this.tsetssslist[i].short
    //   }
    // }
    if (this.testssid == 59 || this.testssid == 60) {
    }
    else {
      for (let i = 0; i < this.tsetssslist.length; i++) {
        if (this.tsetssslist[i].id == this.testssid) {
          this.diagnostictestname = this.tsetssslist[i].short
        }
      }
    }
  }

  public adddetails() {
    this.tablecount = 1;
    var entity = {
      'Sno': this.idcount,
      'DiagnosticTestTypeID': this.testid,
      'DiagnosticTestName': this.diagnostictestname,
      'DiagnosticTestTypeName': this.diagnostictesttypename,
      'TestName': this.diagnostictestname,
      'TestID': this.testssid,
      'ClinicalInfo': this.clinicinfo
    }
    this.qwerty.push(entity);
    this.idcount = this.idcount + 1;
    this.diatest = "";
    this.testslist.length = 0;
    this.tsetssslist.length = 0;
    this.getdiagnosticcentertests()
    this.diagnostictestname = ""
  }

  public insertDiagnostictestdetails() {

    for (let i = 0; i < this.qwerty.length; i++) {
      var entity = {
        'DoctorID': this.doctorid,
        'PateintID': this.patientid,
        'DiagnosticTestTypeID': this.qwerty[i].DiagnosticTestTypeID,
        'DiagnosticTestName': this.qwerty[i].TestName,
        'LanguageID': this.languageid,
        'AppointmentID': this.appointmentid,
        'TestsID': this.qwerty[i].TestID,
        'ClinicalInfo': this.qwerty[i].ClinicalInfo
      }
      this.docservice.InsertDoctor_PatientDiagnostics(entity).subscribe(data => {

        if (data != 0) {

          if (this.languageid == 1) {
            Swal.fire('Completed', 'Diagnostic Tests Added successfully', 'success');
          }
          else {
            Swal.fire('Détails enregistrés', 'Test de laboratoire');
          }
          this.tablecount = 0;
          this.qwerty = []
          this.qwerty.length = 0
          this.testid.length = 0;
          this.testssid = 0;
          this.getpatient_diagnosticdetails()
          this.Insertnotificationtest()
        }
      })
    }
  }



  public Insertnotificationtest() {

    if (this.languageid == '1') {
      var entity = {
        'PatientID': this.diapatientid,
        'Notification': this.user + " added diagnostic test for you.",
        'Description': this.user + " added diagnostic test for you.",
        'NotificationTypeID': 102,
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
        'PatientID': this.diapatientid,
        'Notification': this.user + " Vos résultats d'analyses sont maintenant disponibles dans Mon dossier médical.",
        'Description': this.user + " Vos résultats d'analyses sont maintenant disponibles dans Mon dossier médical.",
        'NotificationTypeID': 102,
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






  public delete(Sno) {

    for (let i = 0; i < this.qwerty.length; i++) {

      if (Sno == this.qwerty[i].Sno) {

        this.qwerty.splice(i, 1);
      }
    }

  }









  //chat



  // oberserableTimer() {
  //   const source = timer(1000, 2000);
  //   const abc = source.subscribe(val => {
  //     this.getPreviousChat();

  //     var objDiv = document.getElementById("chatboxdiv");
  //     objDiv.scrollTop = objDiv.scrollHeight;
  //   });
  // }

  public getserverdateandtime() {

    this.docservice.GetServerDateAndTime().subscribe(
      data => {

        this.serverdateandtime = data;
        this.servertime = this.serverdateandtime.presentTime,
          this.serverdate = this.serverdateandtime.todaydate
      }, error => {
      }
    )
  }


  // public dosendmsg() {
  //   this.getChat();
  // }


  public dosendmsg() {
    var entity = {
      // 'ChatID': this.chatID,
      'DoctorID': this.doctorid,
      'PatientID': this.patientid,
      'AppointmentID':this.appointmentid
      // 'Read_Me': 0
    }
    this.docservice.InsertChatMaster(entity).subscribe(data => {

      if (data != 0) {
        this.chatID = data;
        this.InsertChatDetails();
        this.InsertChatnotificationazure();
      }
    })

    // 
    // this.docservice.GetChatID(this.doctorid, this.patientid).subscribe(ressss => {
    //   ;
    //   if (ressss.length > 1) {
    //     this.chatID = ressss;
    //     this.InsertChatDetails();
    //   }
    //   else {

    //   }
    // })
  }


  public InsertChatnotificationazure() {
    var entity = {
      'Description': this.user + ' Trying to reach you. Please open your voiladoc app : ' + this.chatconversation,
      'ToUser': this.email
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {

      if (data != 0) {
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


  compltedlist: any;
  public count: any;


  //chat end

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.getPreviousChat();

      var objDiv = document.getElementById("chatboxdiv");
      objDiv.scrollTop = objDiv.scrollHeight;
    });



    this.docservice.GetVideoStatus(this.appointmentiddd).subscribe(res => {
      this.compltedlist = res;
      if (this.compltedlist[0].completed == 2) {
        if (this.count == 1) {
          this.count = this.count + 1
          Swal.fire('Patient Ended The Session');
        }
      }
    })
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

      let b = 'https://14.192.17.225' + a;
      this.imageurl = b;
      this.image = 1;
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }



  public renewprescription(presdetails) {
    var entity = {
      // 'MedicineTypeID': presdetails.medicineTypeID,
      'DoctorID': this.doctorid,
      'PateintID': this.patientid,
      'LanguageID': this.languageid,
      'Date': new Date(),
      'AppointmentID': this.appointmentid,
      'MedicineName': presdetails.medicineName,
      // 'UnitOfMeasure': presdetails.unitOfMeasure,
      // 'Dosage': presdetails.dosage,
      'SIG': presdetails.sig,
      // 'Duration': presdetails.duration,
      'DispenseQuantity': presdetails.dispenseQuantity,
      'NoteToPharmasist': presdetails.noteToPharmasist,
      // 'Diagnosis': presdetails.diagnosis,
      'HowmanyRefills': presdetails.howmanyRefills,
      'LocalDoctorID': this.localdocid,
      'EndorseBit': this.endorse,
      // 'ICDCode': 0,
      // 'ICDDescription': 0,
      // 'ICDID': 0,
      'SubstainablenotPermitted': presdetails.substainablenotPermitted
    }
    this.docservice.InsertDoctor_PatientPrescription(entity).subscribe(data => {

      if (data != 0) {
        this.getdoctorpatinetdetails()
        if (this.languageid = 1) {
          Swal.fire('Renewed', 'Prescription renewed successfully', 'success');
        }
        else {
          Swal.fire('Détails enregistrés', 'Ordonnance');
        }
      }
    })
  }




  public Openmodel() {
    ;
    this.display = "block";
  }

  onCloseHandled() {
    this.display = "none";
  }



  showid: any;
  public GetSelectedID(even) {

    this.showid = even.target.value;
  }


  public GetSelectedHistoryID(even) {

    this.showhistoryid = even.target.value;
  }


  public mouseEnter(evn) {

    evn.target.style.color = '#f18235';
  }

  public mouseleave(evn) {
    evn.target.style.color = 'white';
  }

  public highlight(evt) {
    var i, tablinks;
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
  }



  showimages: any;
  nophoto



  public GetImagesID() {
    this.docservice.GetPatient_Illnessphotos(this.appointmentid).subscribe(
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

  showvedioes
  novideo

  public GetVedioID() {


    this.docservice.GetPatient_IllnessVedioes(this.appointmentid).subscribe(
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


  public GetChatShowID() {

    document.getElementById("myForm").style.display = "block";

    this.docservice.GetChatID(this.doctorid, this.patientid,this.appointmentid).subscribe(res => {
      ;
      this.chatIDlist = res;
      this.chatID = this.chatIDlist[0].chatID
      this.getPreviousChat();
      this.oberserableTimer();
      this.getserverdateandtime();
      // this.appointmentiddd = 570;
      this.getserverdateandtime();
      this.getPreviousChat();
      this.oberserableTimer()
    })
  }



  public GetShowOff() {
    document.getElementById("myForm").style.display = "none";
  }




  // edit prescription

  public editprescid: any;

  public GetPriviouesPrescriptionlist(presciption) {
    debugger
    this.editprescid = presciption.id,
      this.medicinename = presciption.medicineName,
      this.sig = presciption.sig,
      this.notetopharmacist = presciption.noteToPharmasist,
      this.howmanyrefills = presciption.howmanyRefills,
      this.substainable = presciption.substainablenotPermitted,
      this.dispensequantity = presciption.dispenseQuantity
  }


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



  //edit test

  editdiaid: any;
  clinicalinfo: any;

  public GetDiaEditList(dia) {
    debugger
    this.editdiaid = dia.id,
      this.testid = dia.diagnosticTestTypeID,
      this.testssid = dia.testsID,
      this.clinicalinfo = dia.clinicalInfo
    this.getdiagnostictests();
  }



  public updatedignostictest() {
    debugger
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
        this.getpatient_diagnosticdetails();
      }
      else {
        Swal.fire('Mis à jour avec succés');
        this.getpatient_diagnosticdetails();
      }
    })
  }



  editsoapid: any;

  // public GetEditPrevioussoap(soap) {
  //   debugger
  //   this.editsoapid = soap.id
  //   this.subjective = soap.subjective,
  //     this.objective = soap.objective,
  //     this.plan = soap.plan,
  //     this.assessment = soap.assessment,
  //     this.diagnosiscode = soap.diagnosisCode,
  //     this.notes = soap.notes,
  //     this.signature = soap.signature,
  //     this.subjective = soap.subjective,
  //     this.icddesc = soap.icrDescription,
  //     this.icdcode = soap.diagnosisCode,
  //     this.followupplan = soap.followUpPlan
  // }


  public updatesoapnotes() {
    var soapentity = {
      'ID': this.soapid,
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
        this.getsopanotesbyid()
      }
      else {
        Swal.fire('Mis à jour avec succés');
        this.getsopanotesbyid()
      }
    })
  }



  public showModal() {
    document.getElementById("pageContent").style.opacity = "0.0";
  }



  public GetDocWhatsaPP() {
    window.open("https://api.whatsapp.com/send/?phone=" + this.mobileno);
  }


  public myarray = [];
  public allergyidcount: any;

  public GetAllerges() {
    debugger
    // this.allergyidcount=0
    this.myarray = []
    let showalergres = this.details.knownAllergies.split(',');
    debugger
    for (let i = 0; i < showalergres.length; i++) {
      var medetty = {
        'Showallergies': showalergres[i],
        'Snoo': i + 1
      }
      this.myarray.push(medetty);
      this.allergyidcount = this.allergyidcount + 1;
      debugger
    }
  }

  public updateelergies: any;

  public deletealergeies(Sno) {
    debugger
    for (let i = 0; i < this.myarray.length; i++) {
      if (Sno == this.myarray[i].Snoo) {
        this.myarray.splice(i, 1);
      }
    }
    this.updateelergies = '';
    for (let j = 0; j < this.myarray.length; j++) {
      debugger
      if (this.updateelergies == '') {
        this.updateelergies = this.myarray[j].Showallergies;
      }
      else {
        this.updateelergies = this.updateelergies + ',' + this.myarray[j].Showallergies;
      }

    }
    this.Updatealriesss()
  }


  public Updatealriesss() {
    debugger
    var entity = {
      'AppointmentID': this.appointmentid,
      'KnownAllergies': this.updateelergies
    }
    this.docservice.UpdateBookAppointmentKnownAllergies(entity).subscribe(data => {
      let res = data;
      if (this.languageid == 1) {
        Swal.fire('Deleted Successfully');
        // this.allergieslist = [];
        this.getpatientdetails()
      }
      else if (this.languageid == 6) {
        Swal.fire('Deleted Successfully');
        // this.allergieslist = [];
        this.getpatientdetails()
      }
    })
  }



  public Updateallergies() {
    this.updateelergies = '';
    // this.allergies = this.allergies.map(x => x.displayValue);
    // this.allergieslist = this.allergies.join(',');
    for (let j = 0; j < this.myarray.length; j++) {
      debugger
      if (this.updateelergies == '') {
        this.updateelergies = this.myarray[j].Showallergies;
      }
      else {
        this.updateelergies = this.updateelergies + ',' + this.myarray[j].Showallergies;
      }
      // this.updateelergies = this.updateelergies + ',' + this.myarray[j].Showallergies;
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
        this.getpatientdetails()
      }
      else if (this.languageid == 6) {
        Swal.fire('Allergies détails enregistrés');
        this.allergieslist = [];
        this.getpatientdetails()
      }
    })
  }

  public addallergies: any;

  public updatedetsils() {
    debugger
    var medetty = {
      'Showallergies': this.addallergies,
      'Snoo': this.myarray.length + 1
    }
    this.myarray.push(medetty);
    debugger
    this.Updateallergies()
  }

  public closewindow() {
    window.close();
  }
}



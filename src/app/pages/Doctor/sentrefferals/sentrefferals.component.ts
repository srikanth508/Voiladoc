import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

@Component({
  selector: 'app-sentrefferals',
  templateUrl: './sentrefferals.component.html',
  styleUrls: ['./sentrefferals.component.css']
})
export class SentrefferalsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public doctorid: any;
  public labels: any;
  public languageid: any;
  public docreferels: any;
  public attachments: any;
  public search: any;
  public referalnotes: any;
  public labels1: any;
  public Editor = ClassicEditor;

  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  value: any;
  SDate = new Date();
  EDate = new Date();
  public sdate: any;
  public edate: any;

  //
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
  public plan: any;
  public details1: any;
  public id: any;
  public treatment: any;
  public soaplist1: any;
  public objective: any;


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
  public soaplist: any;

  public labels4: any;

  user
  MobileNumber
  Hospital_ClinicName
  dropzonelable: any;
  ngOnInit() {

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.languageid = localStorage.getItem("LanguageID");
    this.user = localStorage.getItem("user");
    this.Hospital_ClinicName = localStorage.getItem("Hospital_ClinicName");
    this.MobileNumber = localStorage.getItem("MobileNumber");
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
    // const format = 'yyyy-MM-dd';
    // const myDate = new Date();
    // const locale = 'en-US';
    // this.todaydate = formatDate(myDate, format, locale);

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


    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )
    this.GetDoctorRefererals()
    this.getkang()
  }




  public getkang() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels4 = data;
      }, error => {
      }
    )
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );
  }

  public GetDoctorRefererals() {
    this.docservice.GetDoctorReferals(this.doctorid, 1, this.startdate, this.enddate).subscribe(
      data => {

        let temp: any = data
        this.docreferels = temp.filter(x => x.assignDoctorID == this.doctorid && x.languageID == this.languageid);
      },
      error => { }
    );
  }

  patientid
  appointmentid
  details
  patientname
  mobileno
  patientidd
  email
  appointmentID
  patientID
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

  public GetSickSlipID() {

    this.docservice.GetBookAppointmentByPatientID(this.patientid, this.appointmentid, this.languageid).subscribe(
      data => {
        this.details = data[0];
        this.patientname = this.details.pName,
          this.mobileno = this.details.mobileNumber,
          // this.emailid = this.details.pEmail,
          this.patientidd = this.details.patientID,
          // this.mobileno = this.details.mobileNumber,
          this.email = this.details.pEmail

        // if (this.languageid == 1) {
        //   this.referalnotes = " DATE: " + + this.todaydate + " <p>SUBJECT : Referral To " + this.user + "</p > <p>RE: Mr. " + this.patientname + "<p>i am referring my patient " + this.patientname + " for review of his new onset.<p>&nbsp;</p > <p>Thank you In advance for attending to the patients's health needs</p><p>" + this.user + "</p><p>&nbsp;</p><p>Voiladoc</p><p>" + this.MobileNumber + "</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consultation Summary<p><strong>Patient Name </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.patientname + "</p><p><strong>Date of Consult : &nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.todaydate + "</p><p><strong>Provider </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + this.user + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>"
        // }
        // else {
        //   this.referalnotes = " DATE :" + this.todaydate + "<p>OBJET : Lettre de recommandation <br> Cher(e) confrère (consœur), Je vous réfère le patient  " + this.patientname + "</p><p>Pour le(s) motif(s) et diagnostic(s) suivant(s) : " + "<p>Vous remerciant, je vous prie d’agréer, mon cher confrère (consœur) mes salutations les meilleures.<br><br>" + this.user + "<br>" + this.MobileNumber + "<br>" + this.Hospital_ClinicName + "</p>"
        // }

      }, error => {
      }
    )
  }

  public GetPdf(attchments) {

    document.getElementById('closeview').click();
    window.open(attchments, '_blank');
  }


  public UpdateDoctorReferalsCompletedBit(id) {

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
          this.docservice.UpdateDoctorReferalsCompletedBit(id).subscribe(res => {
            let test = res;
            this.GetDoctorRefererals();
          })
          Swal.fire(
            'Completed!',
            'success'
          )
        }
        else {
          this.GetDoctorRefererals();
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
          this.docservice.UpdateDoctorReferalsCompletedBit(id).subscribe(res => {
            let test = res;
            this.GetDoctorRefererals();
          })
          Swal.fire(
            'Termine!',
            'success'
          )
        }
        else {
          this.GetDoctorRefererals();
        }
      })
    }
  }


  public GetPatientCondition(doc) {

    this.patientid = doc.patientID;
    this.appointmentid = doc.appointmentID;
    this.referalnotes = doc.referalNotes;
  }


  public UpdateRefferalLetter() {


    var entity = {
      'ID': this.appointmentid,
      'ReferalNotes': this.referalnotes
    }
    this.docservice.UpdateDoctorReferals(entity).subscribe(data => {


      if (this.languageid == 1) {
        document.getElementById('close').click();
        document.getElementById('close1').click();
        Swal.fire('Updated successfully.');
        this.ngOnInit();
      }
      else {
        document.getElementById('close').click();
        document.getElementById('close1').click();
        Swal.fire('Mis à jour avec succés');
        this.ngOnInit();
      }

    })

  }




  selectedDate(data) {

    //   var sdate = data.split('-')
    //   this.startdate= sdate[0]
    //  this.enddate= sdate[1]

    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.GetDoctorRefererals();
  }


  public GetSopaNotesID(id) {

    this.id = id;
    this.GetSoapNotesByID();
  }
  public GetSoapNotesByID() {

    this.docservice.GetSoapNotesByPatientRefereal(this.id, this.languageid).subscribe(
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
          this.signature = "";
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
            this.GetDoctorRefererals();
            document.getElementById('closeview').click();
          })
          Swal.fire(
            'Deleted!',
            'File has been Completed.',
            'success'
          )
        }
        else {
          this.GetDoctorRefererals();
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
            this.GetDoctorRefererals();
            document.getElementById('closeview').click();
          })
          Swal.fire(
            'Supprimé!',
          )
        }
        else {
          this.GetDoctorRefererals();
        }
      })
    }
  }
  public attachments1 = [];
  public attachmentsurl1 = [];
  public onattachmentUpload1(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments1.push(abcd.addedFiles[0]);
    this.uploadattachments1();
    // }
    
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Ajouté avec succès');
      abcd.length = 0;
    }

  }
  public showdocphoto = []

  public uploadattachments1() {
    this.docservice.DoctorPhotoUpload(this.attachments1).subscribe(res => {
      
      this.attachmentsurl1.push(res);
      let a = this.attachmentsurl1[0].slice(2);
      
      let b = 'https://maroc.voiladoc.org' + a;

      this.showdocphoto.push(b)

      this.attachments1.length = 0;

    })
    // this.sendattachment();
  }
  public InsertDoctorRefererlas() {
    for (let i = 0; i < this.attachmentsurl1.length; i++) {
      var entity = {
        'AppointmentID': this.appointmentID,
        'PatientID': this.patientID,
        'AttachmentUrl': this.attachmentsurl1[i],
      }
      this.docservice.InsertDoctorReferalAttachments(entity).subscribe(data => {

        if (data != 0) {

          Swal.fire('Uploaded Successfully');
          this.GetDoctorRefererals()
        }
      })
    }

  }


}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-referred-patients',
  templateUrl: './referred-patients.component.html',
  styleUrls: ['./referred-patients.component.css']
})
export class ReferredPatientsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public doctorid: any;
  public labels: any;
  public languageid: any;
  public docreferels: any;
  public attachments: any;
  public search: any;
  public referalnotes: any;
  public labels1: any;




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


  ngOnInit() {
    this.languageid = localStorage.getItem("LanguageID");
    this.doctorid = localStorage.getItem('userid');
    this.getlanguage();

    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {
        debugger
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
        debugger
        this.labels4 = data;
      }, error => {
      }
    )
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger;
        this.labels = data;
      },
      error => { }
    );
  }

  public GetDoctorRefererals() {
    this.docservice.GetDoctorReferals(this.doctorid, 2).subscribe(
      data => {
        debugger;
        let temp: any = data
        this.docreferels = temp.filter(x => x.doctorID == this.doctorid && x.languageID == this.languageid);
      },
      error => { }
    );
  }



  public GetAppointmentID(appointmentid) {
    this.docservice.GetDoctorReferalAttachments(appointmentid).subscribe(
      data => {
        debugger;
        this.attachments = data;
      },
      error => { }
    );
  }

  public GetPdf(attchments) {
    debugger
    window.open(attchments, '_blank');
  }


  public UpdateDoctorReferalsCompletedBit(id) {
    debugger;
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
            'Deleted!',
            'Item has been Completed.',
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
            'Deleted!',
            'Item has been Completed.',
            'success'
          )
        }
        else {
          this.GetDoctorRefererals();
        }
      })
    }



  }


  public GetPatientCondition(referalNotes) {
    this.referalnotes = referalNotes
  }





  public GetSopaNotesID(id) {
    debugger
    this.id = id;
    this.GetSoapNotesByID();
  }
  public GetSoapNotesByID() {
    debugger
    this.docservice.GetSoapNotesByPatientRefereal(this.id, this.languageid).subscribe(
      data => {
        debugger
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




}

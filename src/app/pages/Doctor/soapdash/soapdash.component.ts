import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-soapdash',
  templateUrl: './soapdash.component.html',
  styleUrls: ['./soapdash.component.css']
})
export class SoapdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public soaplist: any;
  public patientid: any;
  public term: any;


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


  public languageid: any;
  public labels: any;
  docdepartmentid: any;
  dummsoaplist1: any;

  ngOnInit() {

    this.activatedroute.params.subscribe(params => {
     
      this.patientid = params['patientID'];
      this.languageid = localStorage.getItem('LanguageID');
      this.docdepartmentid = localStorage.getItem('departmentid')
      this.GetSoapNotes()
    }
    )
    this.getlanguage();
  }

  public getlanguage() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetSoapNotes() {
   
    if (this.docdepartmentid == 14) {
      this.docservice.GetSoapNotesByPatientID(this.patientid, this.languageid).subscribe(
        data => {
         
          this.soaplist1 = data;
        }, error => {
        }
      )
    }
    else if (this.docdepartmentid != 14) {
      this.docservice.GetSoapNotesByPatientID(this.patientid, this.languageid).subscribe(
        data => {
         
          this.dummsoaplist1 = data;
          this.soaplist1 = this.dummsoaplist1.filter(x => x.departmentID == this.docdepartmentid)
        }, error => {
        }
      )
    }
  }


  public GetID(id) {
   
    this.id = id;
    this.GetSoapNotesByID();
  }
  public GetSoapNotesByID() {
   
    this.docservice.GetSoapNotesByID(this.id, this.languageid).subscribe(
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


  public deletesoap(id) {
   
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
        this.docservice.DeleteSoapNotes(id).subscribe(res => {
          let test = res;
          this.GetSoapNotes()
        })
        Swal.fire(
          'Deleted!',
          'SOAP has been deleted.',
          'success'
        )
      }
      else {
        this.GetSoapNotes()
      }
    })
  }

}

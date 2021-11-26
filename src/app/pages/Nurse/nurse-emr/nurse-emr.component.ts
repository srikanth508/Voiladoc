import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-nurse-emr',
  templateUrl: './nurse-emr.component.html',
  styleUrls: ['./nurse-emr.component.css']
})
export class NurseEmrComponent implements OnInit {
  subjective: string;
  assessment: string;
  plan: string;
  diagnosiscode: string;
  followupplan: string;
  notes: string;
  neurological: string;
  signature: string;
  icrdescription: string;
  attchment: any;

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public patientid: any;
  public languageid: any;
  details: any;
  patientname: any;
  mobileno: any;
  emailid: any;
  patientidd: any;
  appointmentno: any;
  appointmentdate: any;
  email: any;
  reasonforappointment: any;
  gender: any;
  bloodgroup: any;
  address: any;
  age: any;
  color: any;
  soaplist1: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');


    this.activatedroute.params.subscribe(params => {
      
      this.patientid = params['patientID'];

      this.docservice.GetPatientDetails(this.patientid, this.languageid).subscribe(
        data => {
          
          this.details = data;
          
          this.patientname = this.details.patientName,
            this.mobileno = this.details.mobileNumber,
            this.emailid = this.details.emailID,
            this.patientidd = this.details.patientID,
            this.appointmentno = this.details.appointmentID,
            this.appointmentdate = this.details.apptDateTime,
            this.mobileno = this.details.mobileNumber,
            this.email = this.details.emailID,
            this.reasonforappointment = this.details.reasonForVisit,
            this.gender = this.details.gender,
            this.bloodgroup = this.details.bloodGroup,
            this.address = this.details.address,
            this.age = this.details.age

        }, error => {
        }
      )

    }
    )

    this.docservice.GetAllHomeCareSoap(this.patientid, this.languageid).subscribe(
      data => {
        
        this.soaplist1 = data;
        console.log("soap",this.soaplist1)
      }, error => {
      }
    )

    if (this.languageid == 1) {
      this.color = "#f18235"
    }
    else {
      this.color = "#f18235"
    }
    this.getlanguage();
    this.getlanguagesssss();
  }

  labels: any;
  labels1: any;


  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginPMR_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  public getlanguagesssss() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )
  }


  public GetSoapPdf() {
    
    // document.getElementById('closeview').click();
    window.open(this.attchment, '_blank');
  }



  soapid: any;
  soaplist: any;
  objective: any;

  public GetSoapID(soapid) {
    
    this.soapid = soapid;
    this.docservice.GetHomeCaeeSoapNotesByID(this.soapid, this.languageid).subscribe(
      data => {
        
        this.soaplist = data;
        if (this.soaplist == null || this.soaplist.length == 0 || this.soaplist == undefined) {
          this.subjective = "";

          this.assessment = "";
          this.plan = "";
          this.diagnosiscode = "";
          this.followupplan = "";
          this.notes = "";
          this.neurological = "";
          this.signature = "";
          this.subjective = "";
          this.signature = "";
          this.icrdescription = ""
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
            this.icrdescription = this.soaplist[0].icrDescription,
            this.attchment = this.soaplist[0].attchment
          
        }

      }, error => {
      }
    )
  }



  
  AppointmentID;
  showimages;
  public nophoto: any;
  public GetIllnessPhotos(even) {
    this.AppointmentID = even;

    this.docservice.GetPatient_Nurse_Illnessphotos(this.AppointmentID).subscribe(
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

}

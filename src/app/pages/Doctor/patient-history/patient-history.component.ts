import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public patientid: any; 
  public patientlist:any;
  public details: any;
  public patientname: any;
  public mobileno: any;
  public emailid: any;
  public email: any;
  public reasonforappointment: any;
   public patientidd: any;
  public appointmentno: any;
  public appointmentdate: any;
  public gender:any;
  public bloodgroup:any;
  public address:any;
  public doctorid:any;
  public prescrptionlist:any;
  public appointmentlist:any;
  public imageid:any;
  public showimages:any;
  public soappatientlist:any;
  public prescriptionlist:any;
  public diagnosticlist:any;
  public soaplist:any;
  public soapid:any;
  public prescrptionlist1:any;
  public plan: any;
  public assessment: any;
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
  public preid:any;
  public diaid:any;
  languageid

  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');
    this.activatedroute.params.subscribe(params => {
     
      this.patientid = params['patientID'];
      this.Getpatientdetails();
      // this.getsoapnotesbypatientid();
      // this.getdoctorpatientprescriptiondetails();
      this.getdiagnostictestsdetails();
     
    }
    )
    this.doctorid = localStorage.getItem('userid');
    this.getdoctorpatinetdetails();
    this.getbookappointmentbydoctoridandpatientid();
  }
  public Getpatientdetails() {
   
    this.docservice.GetPatientDetails(this.patientid,this.languageid).subscribe(
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
        this.address = this.details.address

      }, error => {
      }
    )
  }



  public getdoctorpatinetdetails() {
   
    this.docservice.GetDoctor_PatientPrescriptionByDoctorIDandPatientID(this.doctorid, this.patientid,this.doctorid).subscribe(
      data => {
       
        this.prescrptionlist = data;
      }, error => {
      }
    )
  }
public getbookappointmentbydoctoridandpatientid()
{
 
    this.docservice.GetBookappointmentByPatientDetails(this.patientid).subscribe(
      data => {
       
        this.appointmentlist = data;
      }, error => {
      }
    )
}
// public getsoapnotesbypatientid()
// {
//  
//     this.docservice.GetSoapNotesByPatientID(this.patientid).subscribe(
//       data => {
//        
//         this.soappatientlist = data;
//       }, error => {
//       }
//     )
// }
// public getdoctorpatientprescriptiondetails()
// {
//  
//     this.docservice.GetDoctor_PatientPrescriptionbyPatientDeatails(this.patientid).subscribe(
//       data => {
//        
//         this.prescriptionlist = data;
//       }, error => {
//       }
//     )
// }


public GetdiaID(appointmentID)
{
  this.diaid=appointmentID;
  this.getdiagnostictestsdetails()
}
public getdiagnostictestsdetails()
{
 
  this.docservice.GetDoctor_PatientDiagnosticsbyAppointmentID(this.diaid).subscribe(
    data => {
     
      this.diagnosticlist = data;
    }, error => {
    }
  )
}

public GetSoapID(soapid)
{
 
  this.soapid=soapid;
  this.getSoapNotesByID()
}

public getSoapNotesByID()
{
 
  this.docservice.GetSoapNotesByAppointmentID(this.soapid).subscribe(
    data => {
     
      this.soaplist = data[0];
      if(this.soaplist==null)
      {
      this.clear();
      }
      else{
        this.subjective=this.soaplist.subjective,
        this.phsycialexam=this.soaplist.physicalExam,
        this.genaral=this.soaplist.genaral,
        this.ent=this.soaplist.ent,
        this.neck=this.soaplist.neck,
        this.lymphnode=this.soaplist.lymphNode, 
        this.cardiovascular=this.soaplist.cardiovascular,
        this.lungs=this.soaplist.lungs,
        this.skin=this.soaplist.skin,
        this.breast=this.soaplist.breast,
        this.Psychiatry=this.soaplist.psychiatry,
        this.abdomen=this.soaplist.abdomen,
        this.genitourinary=this.soaplist.genitourinarySystem,
        this.rectal=this.soaplist.rectal,
        this.extremities=this.soaplist.extremities,
        this.musculoskeletal=this.soaplist.musculoskeletal,
        this.assessment=this.soaplist.assessment,
        this.plan=this.soaplist.plan,
        this.diagnosiscode=this.soaplist.diagnosisCode,
        this.followupplan=this.soaplist.followUpPlan,
        this.notes=this.soaplist.notes,
        this.neurological=this.soaplist.neurological
      }

    }, error => {
    }
  )
}

public clear()
{
  this.subjective="";
  this.phsycialexam="";
  this.genaral="";
  this.ent="";
  this.neck="";
  this.lymphnode="";
  this.cardiovascular="";
  this.lungs="";
  this.skin="";
  this.breast="";
  this.Psychiatry="";
  this.abdomen="";
  this.genitourinary="";
  this.rectal="";
  this.extremities="";
  this.musculoskeletal="";
  this.assessment="";
  this.plan="";
  this.diagnosiscode="";
  this.followupplan="";
  this.notes="";
  this.neurological="";
}




public GetprscriptionID(id)
{
 
  this.preid=id;
  this.getprescriptionbyid()
}
public getprescriptionbyid()
{
  this.docservice.GetDoctor_PatientPrescriptionByAppointmentID(this.preid).subscribe(
    data => {
     
      this.prescrptionlist1 = data;
    }, error => {
    }
  )
}




public GetImagesID(id) {
 
  this.imageid = id;
  this.docservice.GetPatient_Illnessphotos(this.imageid).subscribe(
    data => {
     
      this.showimages = data;
    }, error => {
    }
  )
}

}

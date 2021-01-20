import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-patient-history',
  templateUrl: './new-patient-history.component.html',
  styleUrls: ['./new-patient-history.component.css']
})
export class NewPatientHistoryComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public doctorid: any;
  public patientid: any;
  public patientlist: any;
  public details: any;
  public patientname: any;
  public mobileno: any;
  public emailid: any;
  public patientidd: any;
  public appointmentno: any;
  public appointmentdate: any;
  public gender: any;
  public bloodgroup: any;
  public address: any;
  public email: any;
  public reasonforappointment: any;
  public prescriptionlist: any;
  public dialist: any;
  public prescriptionid: any;
  public prelist: any;
  public soaplist: any;
  public soapid: any;
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
  public soaplist1: any;
  public objective: any;
  public vedioslist: any;
  public languageid: any;
  public labels: any;
  public labels1: any;
  public departmentid: any;
  dummprescrptiolist: any;
  dummdialist: any;
  dummsoaplist: any;
  dummvedioslist: any;
  ngOnInit() {

   
    this.activatedroute.params.subscribe(params => {
     
      this.patientid = params['patientID'];
      this.doctorid = localStorage.getItem('userid');
      this.languageid = localStorage.getItem('LanguageID');
      this.departmentid = localStorage.getItem('departmentid')

    }
    )

    if (this.departmentid == 14) {
     
      this.docservice.GetSoapNotesByPatientID(this.patientid, this.languageid,this.doctorid).subscribe(
        data => {
         
          this.soaplist1 = data;
        }, error => {
        }
      )
    }
    else if (this.departmentid != 14) {
      this.docservice.GetSoapNotesByPatientID(this.patientid, this.languageid,this.doctorid).subscribe(
        data => {
         
          this.dummsoaplist = data;
          this.soaplist1 = this.dummsoaplist.filter(x => x.departmentID!= 14);
        }, error => {
        }
      )
    }

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

    if (this.departmentid == 14) {
     
      this.docservice.GetDoctor_PatientPrescriptionbyPatientDeatails(this.patientid, this.languageid).subscribe(
        data => {
         
          this.prescriptionlist = data;
        }, error => {
        }
      )
    }
    else if (this.departmentid != 14) {
      this.docservice.GetDoctor_PatientPrescriptionbyPatientDeatails(this.patientid, this.languageid).subscribe(
        data => {
         
          this.dummprescrptiolist = data;
          this.prescriptionlist = this.dummprescrptiolist.filter(x => x.departmentID != 14)
        }, error => {
        }
      )
    }

    if (this.departmentid == 14) {
      this.docservice.GetDoctor_PatientDiagnosticsbypatientdeatils(this.patientid, this.languageid,this.doctorid).subscribe(
        data => {
         
          this.dialist = data;
        }, error => {
        }
      )
    }
    else if (this.departmentid! = 14) {
      this.docservice.GetDoctor_PatientDiagnosticsbypatientdeatils(this.patientid, this.languageid,this.doctorid).subscribe(
        data => {
         
          this.dummdialist = data;
          this.dialist = this.dummdialist.filter(x => x.departmentID != 14);
        }, error => {
        }
      )
    }

   

    if (this.departmentid == 14) {
      this.docservice.GetBook_DoctorPatientBookedVideoConferenceByPatientID(this.patientid).subscribe(
        data => {
         
          this.vedioslist = data;
        }, error => {
        }
      )
    }
    else if (this.departmentid != 14) {

      this.docservice.GetBook_DoctorPatientBookedVideoConferenceByPatientID(this.patientid).subscribe(
        data => {
         
          this.dummvedioslist = data;
          this.vedioslist = this.dummvedioslist.filter(x => x.departmentID != 14)
        }, error => {
        }
      )
    }

    this.getlanguage();
    this.getlanguagesssss();

  }
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

  public GetprscriptionID(id) {
   
    this.prescriptionid = id;
    this.docservice.GetDoctor_PatientPrescriptionByID(this.prescriptionid, this.languageid).subscribe(
      data => {
       
        this.prelist = data;
      }, error => {
      }
    )
    //this.getDoctorPatientPrescriptions()
  }

  icrdescription
  public GetSoapID(soapid) {
   
    this.soapid = soapid;
    this.docservice.GetSoapNotesByID(this.soapid, this.languageid).subscribe(
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
          this.objective = "";
          this.signature = "";
          this.icrdescription=""
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
            this.icrdescription = this.soaplist[0].icrDescription

        }

      }, error => {
      }
    )
  }
  public GetArchiveID(archiveID) {
   
    // window.location.href = 'http://amazintchtokbox.herokuapp.com/archive/' + archiveID + '/view';
    window.open('http://amazintchtokbox.herokuapp.com/archive/' + archiveID + '/view', '_blank');
   
  }
}

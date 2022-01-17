import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
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
  age: any;
  color: any;
  homecaresoaplist: any;
  Appointmentlist: any;
  ngOnInit() {


    this.activatedroute.params.subscribe(params => {

      this.patientid = params['patientID'];
      this.doctorid = localStorage.getItem('userid');
      this.languageid = localStorage.getItem('LanguageID');
      this.departmentid = localStorage.getItem('departmentid')

    }
    )


    if (this.departmentid == 14) {

      this.docservice.GetSoapNotesByPatientID(this.patientid, this.languageid, this.doctorid).subscribe(
        data => {

          this.soaplist1 = data;
        }, error => {
        }
      )
    }
    else if (this.departmentid != 14) {
      this.docservice.GetSoapNotesByPatientID(this.patientid, this.languageid, this.doctorid).subscribe(
        data => {

          this.dummsoaplist = data;
          this.soaplist1 = this.dummsoaplist.filter(x => x.departmentID != 14);
        }, error => {
        }
      )
    }

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
      debugger
      this.docservice.GetDoctor_PatientDiagosticApps(this.patientid, this.languageid).subscribe(
        data => {
          debugger
          this.dialist = data;
        }, error => {
        }
      )

    }
    else if (this.departmentid! = 14) {
      debugger
      this.docservice.GetDoctor_PatientDiagosticApps(this.patientid, this.languageid).subscribe(
        data => {
          debugger
          this.dummdialist = data;
          this.dialist = this.dummdialist.filter(x => x.departmentID != 14);
        }, error => {
        }
      )


      this.docservice.GetAllHomeCareSoap(this.patientid, this.languageid).subscribe(
        data => {

          this.homecaresoaplist = data;
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
    this.GetDiagnosticAttachments()
    this.getvitaldetails()

    if (this.languageid == 1) {
      this.color = "#322B6B"
    }
    else {
      this.color = "#322B6B"
    }

    debugger
    this.docservice.GetBookApptbyPatientID(this.patientid, this.languageid).subscribe(
      data => {
        debugger
        this.Appointmentlist = data;
      }, error => {
      }
    )

    this.getvaccinatindetails()
  }


  vaccinationlist:any;

  getvaccinatindetails() {
    this.docservice.GetPatient_VaccinationDetails(this.patientid).subscribe(
      data => {
        this.vaccinationlist = data;

      }, error => {
      }
    )

  }

  appointmentDialist: any;

  getDiaTests(appointmentID) {
    debugger
    this.docservice.GetDoctor_PatientDiagnosticsbypatientdeatils(this.patientid, this.languageid, this.doctorid).subscribe(
      data => {
        debugger
        this.appointmentDialist = data.filter(x => x.appointmentID == appointmentID);
      }, error => {
      }
    )
  }
  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginPMR_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  DiaAttchmentList: any;


  public GetDiagnosticAttachments() {
    this.docservice.GetDiagnostic_SoapNotesAttachmentsWeb(this.patientid).subscribe(
      data => {

        this.DiaAttchmentList = data;
      }, error => {
      }
    )
  }
  vitalslist: any;
  public getvitaldetails() {

    this.docservice.GetPatient_VitalDetailsByPatientID(this.patientid, 1).subscribe(
      data => {
        this.vitalslist = data;
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
  attchment
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
  public GetArchiveID(archiveID) {

    // window.location.href = 'http://amazintchtokbox.herokuapp.com/archive/' + archiveID + '/view';
    window.open('http://amazintchtokbox.herokuapp.com/archive/' + archiveID + '/view', '_blank');

  }



  public GetPdfsss(attchments) {

    // document.getElementById('closeview').click();
    window.open(attchments, '_blank');
  }


  public GetSoapPdf() {

    // document.getElementById('closeview').click();
    window.open(this.attchment, '_blank');
  }










  public GetSoapHomeCarelist(soapid) {

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
            this.subjective = this.soaplist[0].objective,
            this.icrdescription = this.soaplist[0].icrDescription,
            this.attchment = this.soaplist[0].attchment

        }

      }, error => {
      }
    )
  }


  public GetReportPdf(pdf) {

    window.open(pdf, "_blank");
  }

  viewdetaillist: any;

  showmedicalquestionare(app) {
    debugger
    this.viewdetaillist = this.Appointmentlist.filter(x => x.id == app.id);
  }
}

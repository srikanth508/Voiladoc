import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-my-patient-prescriptions',
  templateUrl: './my-patient-prescriptions.component.html',
  styleUrls: ['./my-patient-prescriptions.component.css']
})
export class MyPatientPrescriptionsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;

  value: any;
  SDate = new Date();
  EDate = new Date();
  public todaydate: any;
  public startdate: any;
  public enddate: any;
  public CurrentTime: any;
  public docid: any;
  public appointmentslist: any;
  public count: any;
  public prescriptionid: any;
  public prelist: any;
  public labels1: any;

  public showphoto = [];
  public attachments = [];
  public attachmentsurl = [];
  public notes: any;
  public appointmentsid: any;
  dropzonelable:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.docid = localStorage.getItem('localdocid')

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
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

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

    this.docservice.GetAdmin_LocalDoctor_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {
       
        this.labels1 = data;
      }, error => {
      }
    )
    this.getprescriptions()
    if(this.languageid==1)
    {
      this.dropzonelable="Upload file"
    }
    else if(this.languageid==6)
    {
      this.dropzonelable="Télécharger des fichiers"
    }
  

  }

  selectedDate(data) {
   
    //   var sdate = data.split('-')
    //   this.startdate= sdate[0]
    //  this.enddate= sdate[1]
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    this.getprescriptions()
  }


  public getprescriptions() {
    this.docservice.GetDoctor_PatientPrescriptionbyLocalDOcID(this.docid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {
       
        this.appointmentslist = data;
        this.count = this.appointmentslist.length
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
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {
       
        this.labels1 = data;
      }, error => {
      }
    )
    //this.getDoctorPatientPrescriptions()
  }




  public GetEndorseID(appointmentID) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Endorse This Prescription!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.UpdateDoctor_PatientPrescription(appointmentID).subscribe(res => {
          let test = res;
          this.getprescriptions();
        })
        Swal.fire(
          'Success!',
          'Prescription has been Approved.',
          'success'
        )
      }
      else {
        this.getprescriptions();
      }
    })
  }







  public onattachmentUpload(abcd) {
   
    // for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd.addedFiles[0]);
      this.uploadattachments();
    // }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.DiagnosticRecordUploads(this.attachments).subscribe(res => {
     
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
     
      let b = 'https://maroc.voiladoc.org' + a;
      this.showphoto.push(b)
      this.attachments.length = 0;
     
    })
    // this.sendattachment();
  }



  public GetAppointmentID(appointmentID) {
   
    this.appointmentsid = appointmentID;
  }



  public UpdateNewPrescription() {
   
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        'AppointmentID': this.appointmentsid,
        'NewPrescriptionPhotoUrl': this.attachmentsurl[i],
        'Notes': this.notes
      }
      this.docservice.UpdateDoctor_PatientPrescriptionNewPrescription(entity).subscribe(data => {
       
        if (data != undefined) {
          Swal.fire('Success', 'Prescription Successfully');
          this.notes = "";
          this.attachmentsurl.length = 0;
          this.showphoto.length = 0;

        }
      })
    }
  }

}

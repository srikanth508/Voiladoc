import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-patient-pdfs',
  templateUrl: './patient-pdfs.component.html',
  styleUrls: ['./patient-pdfs.component.css']
})
export class PatientPdfsComponent implements OnInit {
  @ViewChild('myTemp') myTempRef: ElementRef;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  languageid: any;
  labels: any;
  patientslist: any;
  count: any;
  search: any;
  labels2:any;
  ngOnInit() {
    this.languageid = localStorage.getItem("LanguageID");
    this.getlanguage();
    this.Getregisterdpatients();
    this.getdoctorforadmin()
  }
  doctorlist: any;

  public getdoctorforadmin() {
    this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.doctorlist = data;

      }, error => {
      }
    )
  }
  labels1: any;

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );

    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )

    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels2 = data;
        
      }, error => {
      }
    )
  }

  public Getregisterdpatients() {
    this.docservice.GetPatientRegistration('2020-01-01', '2080-01-01').subscribe(
      data => {

        this.patientslist = data;

        this.count = this.patientslist.length
      },
      error => { }
    );
  }

  pdfprslist: any;

  public GetAllPrescription(patientid, email) {
    
    this.email = email;
    
    this.spinner.show()
    this.docservice.GetBookAppointmentByDOctorss(this.languageid, patientid, 1).subscribe(data => {
      
      this.pdfprslist = data;
      this.spinner.hide();
      
    })
  }





  public SavePdf() {

    var data = document.getElementById('Prescriptions');
    this.spinner.show()
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
      
      this.docservice.DoctorPdfreports(file).subscribe(res => {
        ;
        // ReceiptUpload
        // DoctorPdfreports
        
        this.sendattchmenturl.push(res);
        let a = this.sendattchmenturl[0].slice(2);

        let b = 'https://maroc.voiladoc.org' + a;
        this.emailurl = b;

        this.SendMailReport()

        this.spinner.hide()
      });
      this.spinner.hide();

      doc.save('Prescriptions.pdf');
    });
  }
  sendattchmenturl = [];
  emailurl: any;


  public disabledoctor(docid) {
    this.docservice.DisableDoctorLogin(docid).subscribe(
      data => {

        if (this.languageid == 1) {
          Swal.fire('Disabled', 'Doctor has been Disabled');
          this.getdoctorforadmin()

        }
        else {
          Swal.fire('Désactivée', 'Accès désactivé');
          this.getdoctorforadmin()
        }


      }, error => {
      }
    )
  }

  public enabledoctor(id) {
    this.docservice.EnableDoctorLogin(id).subscribe(
      data => {

        if (this.languageid == 1) {
          Swal.fire('Enabled', 'Doctor has been Enabled');
          this.getdoctorforadmin();
        }
        else {
          Swal.fire('Activé', 'Accès Activé');
          this.getdoctorforadmin();
        }


      }, error => {
      }
    )
  }

  noattachments = [];
  bcclist = [];
  cclist = []
  email: any;

  public SendMailReport() {
    if(this.languageid==1)
    {
    var body= "Good day !<br><br>"+"Sur la base de votre demande, voici votre rapport médical complet. Veuillez cliquer sur le lien pour télécharger. Envoyez-nous un e-mail à support@voiladoc.me si vous avez besoin d'aide.<br><br>" + this.emailurl + "<br><br>" + 'Best regards,' + "<br>" + 'Voiladoc data department'
    }
    else
    {
      var body= "Bonne journée !<br><br>"+"Based on your request, here is your full medical report. Please click the link to download. Email us at support@voiladoc.me if you need help.<br><br>" + this.emailurl + "<br><br>" + 'Best regards,' + "<br>" + 'Voiladoc data department'
    }
    var entity = {
      'emailto': this.email,
      'emailsubject': "Medical report",
      'emailbody': body,
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





  public DownloadPdf() {

    var data = document.getElementById('Prescriptions');
    this.spinner.show()
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

      this.spinner.hide();

      doc.save('Prescriptions.pdf');
    });
  }





  
  
  
}


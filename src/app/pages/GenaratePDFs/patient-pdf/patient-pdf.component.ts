import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from "../../../hello-doctor.service";
import Swal from "sweetalert2";
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-patient-pdf',
  templateUrl: './patient-pdf.component.html',
  styleUrls: ['./patient-pdf.component.css']
})
export class PatientPdfComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  languageid: any;
  labels: any;
  labels1:any;
  patientslist: any;
  count: any;
  search: any;
  ngOnInit() {
    this.languageid = localStorage.getItem("LanguageID");
    this.getlanguage();
    this.Getregisterdpatients()
  }



  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );
 
      this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
        data => {
  
          this.labels1 = data;
          
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
    this.docservice.GetAllPreascriptionByPatientID(this.languageid, patientid, 1).subscribe(data => {
      
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
      // this.spinner.hide();

      // doc.save('Prescriptions.pdf');
    });
  }
  sendattchmenturl = [];
  emailurl: any;


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


  public DownPdf() {
    this.spinner.show()
    var data = document.getElementById('Prescriptions');

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
      this.spinner.hide();
      doc.save('Prescriptions.pdf');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-diagnostic-support',
  templateUrl: './diagnostic-support.component.html',
  styleUrls: ['./diagnostic-support.component.css']
})
export class DiagnosticSupportComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService) { }

  description: any;
  issuename: any;
  public issuephoto = [];
  public issuephotourl = [];
  public user: any;
  public languageid: any;
  public midwifeid: any;
  public labels: any;
  dropzonelable: any;
  public pharmacyid: any;
  public diagnosticid: any;
  ngOnInit() {
    this.description = ""
    this.languageid = localStorage.getItem('LanguageID');
    this.diagnosticid = localStorage.getItem('diagnosticid');
    this.user = localStorage.getItem('user');
    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
    this.GetLanguageMaster();
  }



  public GetLanguageMaster() {
    this.docservice.GetAdmin_SupportForWeb_Labels(this.languageid).subscribe(res => {

      this.labels = res;

    })
  }





  removetgdescription: any;

  public insertdetails() {

    if (this.issuephotourl == null && this.issuephotourl.length == 0 && this.issuephotourl == undefined) {

      Swal.fire('Please upload image')
    }
    else {
      document.getElementById("qwerty").innerHTML = this.description;
      this.removetgdescription = document.getElementById("qwerty").innerText;
      var entity = {
        'Issue': this.issuename,
        'Description': this.removetgdescription,
        'Photo': this.issuephotourl[0],
        'TypeID': 8,
        'DoctorID': 0,
        'NurseID': 0,
        'PhysioID': 0,
        'MidWifeID': this.midwifeid,
        'HospitalID': 0,
        'ReceptionID': 0,
        'UserName': this.user,
        'LanguageID': this.languageid,
        'PharmacyID': 0,
        'DiagnosticcenterID': this.diagnosticid
      }
      this.docservice.InsertSupportForWeb1(entity).subscribe(data => {
        if (data != 0) {
           this.insertnotification();
          if (this.languageid == 1) {
            Swal.fire('Issue Raised Successflly')
            location.href = "#/DiagnosticSupportDash"
          }
          else {
            Swal.fire('Problème soulevé avec Succès')
            location.href = "#/DiagnosticSupportDash"
          }

        }
      })
    }
  }

  public onattachmentUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.issuephoto.push(abcd.addedFiles[0]);
    this.uploadid();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
      Swal.fire('Ajouté avec Succès');
      abcd.length = 0;
    }

  }
  public showphoto = [];

  public uploadid() {
    this.docservice.pharmacyphoto(this.issuephoto).subscribe(res => {

      this.issuephotourl.push(res);
      let a = this.issuephotourl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showphoto.push(b);
    })
    // this.sendattachment();
  }
  public insertnotification() {

    var entity = {
      'NotificationName': 'Diagnostic Center Raised A issue',
      'NotificationTypeID': 1,
      'Notification': this.user + ' Raised a issue. Please Check',
      'DoctorID': 0,
      'NurseID': 0,
      'PhysioID': 0,
      'MidwifeID':0,
      'RcepID': 0,
      'HospitalID': 0,
      'TypeID': 8,
      'LanguageID': this.languageid,
      'DiagnosticID':this.diagnosticid,
      'PharmacyID':0
    }
    this.docservice.InsertSupportForWebNotificationsDiaPha(entity).subscribe(data => {
      if (data != 0) {

      }
    })
  }
}

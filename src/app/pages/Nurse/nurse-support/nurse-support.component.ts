import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-nurse-support',
  templateUrl: './nurse-support.component.html',
  styleUrls: ['./nurse-support.component.css']
})
export class NurseSupportComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService) { }

  description: any;
  issuename: any;
  public issuephoto = [];
  public issuephotourl = [];
  public user: any;
  public languageid: any;
  public nurseid: any;
  public labels: any;
  dropzonelable:any;
  ngOnInit() {
    this.description = ""
    this.nurseid = localStorage.getItem('nurseid');
    this.user = localStorage.getItem('user');
    this.languageid = localStorage.getItem('LanguageID');
    this.GetLanguageMaster()
    if(this.languageid==1)
    {
      this.dropzonelable="Upload file"
    }
    else if(this.languageid==6)
    {
      this.dropzonelable="Télécharger des fichiers"
    }
  }

  public GetLanguageMaster() {
    this.docservice.GetAdmin_SupportForWeb_Labels(this.languageid).subscribe(res => {
      debugger
      this.labels = res;
      debugger
    })
  }

  removetgdescription:any;

  public insertdetails() {
    debugger
    if (this.issuephotourl == null && this.issuephotourl.length == 0 && this.issuephotourl == undefined) {
      debugger
      Swal.fire('Please upload image')
    }
    else {
      document.getElementById("qwerty").innerHTML = this.description;
      this.removetgdescription = document.getElementById("qwerty").innerText;
      var entity = {
        'Issue': this.issuename,
        'Description': this.removetgdescription,
        'Photo': this.issuephotourl[0],
        'TypeID': 2,
        'DoctorID': 0,
        'NurseID': this.nurseid,
        'PhysioID': 0,
        'MidWifeID': 0,
        'HospitalID': 0,
        'ReceptionID': 0,
        'UserName': this.user,
        'LanguageID': this.languageid
      }
      this.docservice.InsertSupportForWeb(entity).subscribe(data => {
        if (data != 0) {
          this.insertnotification()
          Swal.fire('Issue Raised Successflly')
          location.href = "#/NurseSupportDash"
        }
      })
    }
  }


  public onattachmentUpload(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
      this.issuephoto.push(abcd.addedFiles[0]);
      this.uploadid();
    // }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadid() {
    this.docservice.pharmacyphoto(this.issuephoto).subscribe(res => {
      debugger
      this.issuephotourl.push(res);
      let a = this.issuephotourl[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      debugger
    })
    // this.sendattachment();
  }



  public insertnotification() {

    var entity = {
      'NotificationName': 'Nurse Raised A issue',
      'NotificationTypeID': 1,
      'Notification': this.user + ' Raised a issue. Please Check',
      'DoctorID': 0,
      'NurseID': this.nurseid,
      'PhysioID': 0,
      'MidwifeID': 0,
      'RcepID': 0,
      'HospitalID': 0,
      'TypeID': 2,
      'LanguageID': this.languageid
    }
    this.docservice.InsertSupportForWebNotifications(entity).subscribe(data => {
      if (data != 0) {

      }
    })

  }

}

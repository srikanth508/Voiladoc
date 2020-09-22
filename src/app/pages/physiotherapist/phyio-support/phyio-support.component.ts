import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-phyio-support',
  templateUrl: './phyio-support.component.html',
  styleUrls: ['./phyio-support.component.css']
})
export class PhyioSupportComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService) { }


  description: any;
  issuename: any;
  public issuephoto = [];
  public issuephotourl = [];
  public user: any;
  public languageid: any;
  public physioid: any;
  public labels: any;
  ngOnInit() {
    this.description = ""
    this.physioid = localStorage.getItem('physioid');
    this.user = localStorage.getItem('user');
    this.languageid = localStorage.getItem('LanguageID');
    this.GetLanguageMaster()
  }

  public GetLanguageMaster() {
    this.docservice.GetAdmin_SupportForWeb_Labels(this.languageid).subscribe(res => {
      debugger
      this.labels = res;
      debugger
    })
  }
  removetgdescription: any;

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
        'TypeID': 3,
        'DoctorID': 0,
        'NurseID': 0,
        'PhysioID': this.physioid,
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
          location.href = "#/PhyioSupportDash"
        }
      })
    }
  }

  public onattachmentUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.issuephoto.push(abcd[i]);
      this.uploadid();
    }
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
      'NotificationName': 'Physiotherapist Raised A issue',
      'NotificationTypeID': 1,
      'Notification': this.user + ' Raised a issue. Please Check',
      'DoctorID': 0,
      'NurseID': 0,
      'PhysioID': this.physioid,
      'MidwifeID': 0,
      'RcepID': 0,
      'HospitalID': 0,
      'TypeID': 3,
      'LanguageID': this.languageid
    }
    this.docservice.InsertSupportForWebNotifications(entity).subscribe(data => {
      if (data != 0) {

      }
    })

  }
}

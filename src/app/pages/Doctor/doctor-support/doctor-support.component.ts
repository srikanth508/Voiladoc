import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-doctor-support',
  templateUrl: './doctor-support.component.html',
  styleUrls: ['./doctor-support.component.css']
})
export class DoctorSupportComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService) { }

  doctorid: any;
  description: any;
  issuename: any;
  public issuephoto = [];
  public issuephotourl = [];
  public user: any;
  public languageid: any;
  public labels:any;

  ngOnInit() {
    this.description = ""
    this.doctorid = localStorage.getItem('userid');
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


  public insertdetails() {
    debugger
    if (this.issuephotourl == null && this.issuephotourl.length == 0 && this.issuephotourl == undefined) {
      debugger
      Swal.fire('Please upload image')
    }
    else {
      var entity = {
        'Issue': this.issuename,
        'Description': this.description,
        'Photo': this.issuephotourl[0],
        'TypeID': 1,
        'DoctorID': this.doctorid,
        'NurseID': 0,
        'PhysioID': 0,
        'MidWifeID': 0,
        'HospitalID': 0,
        'ReceptionID': 0,
        'UserName': this.user,
        'LanguageID': this.languageid
      }
      this.docservice.InsertSupportForWeb(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Issue Raised Successflly')
          location.href="#/DoctorSupportDash"
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

}

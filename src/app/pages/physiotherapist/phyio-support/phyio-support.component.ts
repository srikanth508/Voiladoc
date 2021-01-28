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
  dropzonelable: any;
  ngOnInit() {
    this.description = ""
    this.physioid = localStorage.getItem('physioid');
    this.user = localStorage.getItem('user');
    this.languageid = localStorage.getItem('LanguageID');
    this.GetLanguageMaster()

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
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
          if(this.languageid==1)
          {
            Swal.fire('Issue Raised Successflly')
            location.href = "#/PhyioSupportDash"
          }
          else{
            Swal.fire('Problème soulevé avec succès')
            location.href = "#/PhyioSupportDash"
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
    if(this.languageid==1)
    {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else{
      Swal.fire('Ajouté avec succès');
      abcd.length = 0;
    }
 
  }

  public showphoto=[];

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

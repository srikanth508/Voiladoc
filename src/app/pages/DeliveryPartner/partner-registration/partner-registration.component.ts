import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partner-registration',
  templateUrl: './partner-registration.component.html',
  styleUrls: ['./partner-registration.component.css']
})

export class PartnerRegistrationComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public name: any;
  public phno: any;
  public email: any;
  public dcid: any;
  public address: any;
  public username: any;
  public password: any;
  public photo: any;
  public idprof: any;
  public showphoto: any;
  public showidproof: any;
  public idproof = [];
  public idproofurl = [];
  public attachments = [];
  public attachmentsurl = [];
  StaffTypeID: any

  public labels: any;
  public languageid: any;
  ngOnInit() {
    this.StaffTypeID = 0;
    this.dcid = localStorage.getItem('deliveryid');
    this.photo = 0;
    this.idprof = 0;

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
  }



  public getlanguage() {
    this.docservice.Getadmin_DeliveryLoginsOrdersEmployee_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }



  public onattachmentUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
      debugger
      let b = 'https://14.192.17.225' + a;
      this.photo = 1;
      this.showphoto = b;
      this.attachments.length = 0;
      debugger
    })
    // this.sendattachment();
  }

  public onidUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.idproof.push(abcd[i]);
      this.uploadid();
    }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadid() {
    this.docservice.pharmacyphoto(this.idproof).subscribe(res => {
      debugger
      this.idproofurl.push(res);
      let a = this.idproofurl[0].slice(2);
      debugger
      let b = 'https://14.192.17.225' + a;
      this.idprof = 1;
      this.showidproof = b;
      this.idproof.length = 0;
      debugger
    })
    // this.sendattachment();
  }

  public InsertDeliveryPartners() {
    var entity = {
      'DeliveryCompanyID': this.dcid,
      'Name': this.name,
      'PhoneNo': this.phno,
      'EmailID': this.email,
      'Address': this.address,
      'PhotoURL': this.attachmentsurl[0],
      'IdProof': this.idproofurl[0],
      'UserName': this.username,
      'Password': this.password,
      'StaffType':this.StaffTypeID
    }
    this.docservice.InsertDeliveryPartners(entity).subscribe(data => {
      debugger
      Swal.fire('Registration Completed', 'Details saved successfully', 'success');
      location.href = '#/PartnersDashboard';
    })
  }

  public GetStaffTypeID(event) {
    debugger
    this.StaffTypeID=event.target.value;
  }

}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

import { formatDate } from "@angular/common";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-referred-doctor',
  templateUrl: './referred-doctor.component.html',
  styleUrls: ['./referred-doctor.component.css']
})
export class ReferredDoctorComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public patientid: any;
  public appointmentid: any;
  public details: any;
  public patientname: any;
  public mobileno: any;
  public email: any;
  public patientidd: any;
  public languageid: any;
  public referaltypeid: any;
  public referalnotes: any;
  public departmentlist: any;
  public departmentid: any;
  public doctorlist: any;
  public list: any;
  public referdoctorlist: any;
  public doctorid: any;
  public doctorname: any;
  public doctoremail: any;
  public docphoneno: any;
  public dummlist: any;
  public attachments1 = [];
  public attachmentsurl1 = [];
  public attachmentsurl = []
  public doctorsssid: any;
  public labels: any;
  public user: any;
  public mobilereferalnotes: any;

  public countrylist: any;
  public countryid: any;
  public citylist: any;
  public cityid: any;
  public areaid: any;
  public arealist: any;
  public labels1: any;
  public labels2: any;
  public todaydate: any;
  public countrydd = {}
  public citydd = {};
  public areadd = {}
  public docdd = {}
  public soap: any;
  public hospitalid: any;
  public dochospitalid: any;


  ngOnInit() {

    this.soap = 1;
    this.doctorsssid = localStorage.getItem('userid');
    this.languageid = localStorage.getItem('LanguageID');
    this.user = localStorage.getItem('user');
    this.departmentid = 0
    this.activatedroute.params.subscribe(params => {
     
      this.patientid = params['patientID'];
      this.appointmentid = params['appointmentID'];
      this.getpatientdetails();
    }
    )
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
       
        this.labels2 = data;
      }, error => {
      }
    )
    const format = 'dd-MMM-yyyy';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);


    this.cityid = 0
    this.areaid = 0
    this.countryid = 0

    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels1 = data;
      },
      error => { }
    );

    this.docservice.GetBookAppointmentByPatientID(this.patientid, this.appointmentid).subscribe(
      data => {
        this.details = data[0];
        this.patientname = this.details.pName,
          this.mobileno = this.details.mobileNumber,
          // this.emailid = this.details.pEmail,
          this.patientidd = this.details.patientID,
          // this.mobileno = this.details.mobileNumber,
          this.email = this.details.pEmail
        this.referalnotes = "<p>Voiladoc<br>" + this.todaydate + "</p><p>SUBJECT : Referral To " + this.doctorname + "</p><p>RE: Mr. " + this.patientname + "</p><p>&nbsp;</p><p>i am referring my patient " + this.patientname + " for review of his new onset.</p><p>&nbsp;</p><p>Thank you In advance for attending to the patients's health needs</p><p>" + this.user + "</p><p>&nbsp;</p><p>Voiladoc</p><p>" + this.docphoneno + "</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consultation Summary<p><strong>Patient Name </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.patientname + "</p><p><strong>Date of Consult : &nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.todaydate + "</p><p><strong>Provider </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + this.doctorname + "</p><p>Chief Complaint :&nbsp;</p><p>Diagnosis :</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>";
      }, error => {
      }
    )


    //  this.mobilereferalnotes = "";

    this.getdepartmentmaster();
    this.getdoctorforadmin();
    this.getlanguage();
    this.GetCountryMaster();
  }

  public getdoctorforadmin() {
   
    this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {
       
        this.doctorlist = data;
        this.dummlist = this.doctorlist

      }, error => {
      }
    )
  }
  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.countrylist = data;

        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };

      }, error => {
      }
    )
  }
  public GetCountryID(item: any) {
   
    // if (item.target.value != 0) {
   
    this.countryid = item.id;

    this.doctorlist = this.dummlist.filter(x => x.countryID == this.countryid)
    // this.count = this.doctorlist.length
    this.getcity();

    // else if (item.target.value == 0) {
    //   this.getdoctorforadmin()
    //   this.countryid = 0

    // }
  }



  public getcity() {
   
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
       
        this.citylist = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }

  public GetCityID(item: any) {
    // if (item.target.value != 0) {
   
    this.cityid = item.id;
    this.getareamasterbyid()
    this.doctorlist = this.dummlist.filter(x => x.cityID == this.cityid)
    // this.count = this.doctorlist.length
    // }
    // else if (item.target.value == 0) {
    //   this.getcity();
    //   this.areaid = 0;
    //   this.cityid = 0
    // }
  }

  public getareamasterbyid() {
   
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
       
        this.arealist = data;

        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };

      }, error => {
      }
    )
  }



  public GetAreaID(item: any) {
    // if (item.target.value != 0) {
    //  
    this.areaid = item.id;
    this.doctorlist = this.dummlist.filter(x => x.areaID == this.areaid)
    this.departmentid = 0;
    // }
    // else if (item.target.value == 0) {
    //   this.getdoctorforadmin()
    // }
  }


  public getlanguage() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetReferencetypeID(even) {
   
    this.referaltypeid = even.target.value;
    if (this.referaltypeid == '2') {
      this.doctorname = "",
        this.doctoremail = "",
        this.docphoneno = ""
    }
  }



  public getdepartmentmaster() {
   
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.departmentlist = data;
      }, error => {
      }
    )
  }


  public GetDoctorID(item: any) {
   
    this.doctorid = item.id
    var list = this.dummlist.filter(x => x.id == this.doctorid)
    this.doctorname = list[0].doctorName,
      this.docphoneno = list[0].mobileNumber,
      this.doctoremail = list[0].emailID,
      this.hospitalid = list[0].hospital_ClinicID,
      this.dochospitalid = list[0].dochospitalID,
      this.referalnotes = "<p>Voiladoc<br>" + this.todaydate + "</p><p>SUBJECT : Referral To " + this.doctorname + "</p><p>RE: Mr. " + this.patientname + "</p><p>&nbsp;</p><p>i am referring my patient " + this.patientname + " for review of his new onset.</p><p>&nbsp;</p><p>Thank you In advance for attending to the patients's health needs</p><p>" + this.user + "</p><p>&nbsp;</p><p>Voiladoc</p><p>" + this.docphoneno + "</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consultation Summary<p><strong>Patient Name </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.patientname + "</p><p><strong>Date of Consult : &nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.todaydate + "</p><p><strong>Provider </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + this.doctorname + "</p><p>Chief Complaint :&nbsp;</p><p>Diagnosis :</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>";
  }


  public GetDepartmentID(even) {
   
    this.departmentid = even.target.value;

    this.list = this.dummlist.filter(x => x.departmentID == this.departmentid && x.areaID == this.areaid)
    this.referdoctorlist = this.list.filter(x => x.referealBit == 1)

    this.docdd = {
      singleSelection: true,
      idField: 'id',
      textField: 'doctorName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //  itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  public Getdocname(doctorname) {
   
    this.doctorname = doctorname
    this.referalnotes = "<p>Voiladoc<br>" + this.todaydate + "</p><p>SUBJECT : Referral To " + this.doctorname + "</p><p>RE: Mr. " + this.patientname + "</p><p>&nbsp;</p><p>i am referring my patient " + this.patientname + " for review of his new onset.</p><p>&nbsp;</p><p>Thank you In advance for attending to the patients's health needs</p><p>" + this.user + "</p><p>&nbsp;</p><p>Voiladoc</p><p>" + this.docphoneno + "</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Consultation Summary<p><strong>Patient Name </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.patientname + "</p><p><strong>Date of Consult : &nbsp;</strong> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;" + this.todaydate + "</p><p><strong>Provider </strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; " + this.doctorname + "</p><p>Chief Complaint :&nbsp;</p><p>Diagnosis :</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>";
  }

  public getpatientdetails() {
    this.docservice.GetBookAppointmentByPatientID(this.patientid, this.appointmentid).subscribe(
      data => {
        this.details = data[0];
        this.patientname = this.details.pName,
          this.mobileno = this.details.mobileNumber,
          // this.emailid = this.details.pEmail,
          this.patientidd = this.details.patientID,
          // this.mobileno = this.details.mobileNumber,
          this.email = this.details.pEmail

      }, error => {
      }
    )
  }

  public insertdetails() {
   
    if (this.referaltypeid == 1 || this.referaltypeid == 2) {
      if (this.doctorname == null) {
        Swal.fire("Please Select Or Enter Doctor Name")
      }
      else if (this.doctoremail == null) {
        Swal.fire("Please Enter Doctor Email")
      }
      else if (this.referalnotes == null || this.referalnotes == "") {
        Swal.fire("Please Enter Referral Notes")
      }
      else {
       
        if (this.referaltypeid == 1 || this.referaltypeid == 2) {
         
          this.mobilereferalnotes = "Your Doctor " + this.user + " has referred you to " + this.doctorname + "for further investigation, kindly be touch in with doctor"
        }
        if (this.referaltypeid == 3) {
          document.getElementById("qwerty").innerHTML = this.referalnotes;
          this.mobilereferalnotes = document.getElementById("qwerty").innerText;
        }
        var entity = {
          'ReferalTypeID': this.referaltypeid,
          'AppointmentID': this.appointmentid,
          'PatientID': this.patientid,
          'PatientName': this.patientname,
          'DoctorID': this.doctorid,
          'DoctorName': this.doctorname,
          'DoctorEmail': this.doctoremail,
          'DoctorPhNo': this.docphoneno,
          'ReferalNotes': this.referalnotes,
          'AssignDoctorID': this.doctorsssid,
          'MobileReferalNotes': this.mobilereferalnotes,
          'soapbit': this.soap,
          'Hospital_ClinicID':this.hospitalid,
          'DoctorHospitalDetailsID':this.dochospitalid
        }
        this.docservice.InsertDoctorReferals(entity).subscribe(data => {
          if (data != 0) {
            this.InsertDoctorRefererlas();
           
            this.SendNotification();
            // this.senmailToPatient();
           
            if (this.referaltypeid == 1 || this.referaltypeid == 2) {
              this.sendmail();
            }
            if(this.referaltypeid==3)
            {
              this.senmailToPatient()
            }
            Swal.fire('Success', 'Referral Sent To Doctor Successfully');
            location.href = "#/Myappointments"
          }
        })
      }
    }
    if (this.referaltypeid == 3) {
     
      // if (this.referaltypeid == 1 || this.referaltypeid == 2) {
      //  
      //   this.mobilereferalnotes = "Your Doctor " + this.user + " has referred you to " + this.doctorname + "for further investigation, kindly be touch in with doctor"
      // }
      if (this.referaltypeid == 3) {
        document.getElementById("qwerty").innerHTML = this.referalnotes;
        this.mobilereferalnotes = document.getElementById("qwerty").innerText;
      }
      var entity = {
        'ReferalTypeID': this.referaltypeid,
        'AppointmentID': this.appointmentid,
        'PatientID': this.patientid,
        'PatientName': this.patientname,
        'DoctorID': this.doctorid,
        'DoctorName': this.doctorname,
        'DoctorEmail': this.doctoremail,
        'DoctorPhNo': this.docphoneno,
        'ReferalNotes': this.referalnotes,
        'AssignDoctorID': this.doctorsssid,
        'MobileReferalNotes': this.mobilereferalnotes,
        'soapbit': this.soap,
        'Hospital_ClinicID':this.hospitalid,
        'DoctorHospitalDetailsID':this.dochospitalid
      }
      this.docservice.InsertDoctorReferals(entity).subscribe(data => {
        if (data != 0) {
          this.InsertDoctorRefererlas();
         
          this.SendNotification();
          // this.senmailToPatient();
         
          // if (this.referaltypeid == 1 || this.referaltypeid == 2) {
          //   this.sendmail();
          // }
          Swal.fire('Success', 'Referral Sent To Doctor Successfully');
          location.href = "#/Myappointments"
        }
      })
    }

  }

  public sendmail() {

    var mailentity = {
      ToEmail: this.doctoremail,
      Subject: 'Patient Referred By ' + this.user,
      FromEmail: 'Doctor@Voiladoc.Net',
      ContentType: "text/html",
      Content: this.referalnotes,
    };
   
    this.docservice.SendMail(mailentity).subscribe(data => {
     
      Swal.fire('Mail sent successfully.');
    })
  }

  // 'Dear ' + this.doctorname + ' I am referring my Patient ' + this.patientname + ' for further investigation.<br> My Notes About The Patient Is Given Below. <br>' + this.referalnotes + ' Please Feel Free To Reach Out To Me. If You Have Any Queries.<br><br> Regards<br>' + this.user
  public SendNotification() {
   
    var entity = {
      'Description': "Your Have Been Referred To " + this.doctorname + " For Further Investigation. Please Contact Him on Mobile" + this.docphoneno,
      'ToUser': this.email,
    }
    this.docservice.PostGCMNotifications(entity).subscribe(data => {
     
      if (data != 0) {

      }
    })

  }

  public InsertDoctorRefererlas() {
    for (let i = 0; i < this.attachmentsurl1.length; i++) {
      var entity = {
        'AppointmentID': this.appointmentid,
        'PatientID': this.patientid,
        'AttachmentUrl': this.attachmentsurl1[i],
      }
      this.docservice.InsertDoctorReferalAttachments(entity).subscribe(data => {
       
        if (data != 0) {

        }
      })
    }
   
  }





  // 'Dear ' + this.doctorname + ' I am referring my Patient ' + this.patientname + ' for further investigation.<br> My Notes About The Patient Is Given Below. <br>' + this.referalnotes + ' Please Feel Free To Reach Out To Me. If You Have Any Queries.<br><br> Regards<br>' + this.user,











  public senmailToPatient() {
   
    // this.attachmentsurl[0] = 'C:/MeridionalWebTestAPI/Images/logo/logo.png'
   
    // var mailentity = {
    //   'emailto': 'srikanthreddy0905@gmail.com',
    //   'emailsubject': 'Patient Referred By' + this.doctorname,
    //   'emailbody': 'Dear' + this.doctorname + ' I Am Referring My Patient' + this.patientname + 'For Further Investigation. My Notes About The Patient Given Below',
    //   'attachmenturl': this.attachmentsurl
    var mailentity = {
      ToEmail: this.email,
      Subject: 'Patient Referred By ' + this.user,
      FromEmail: 'Doctor@Voiladoc.Net',
      ContentType: "text/html",
      Content: "Your Have Been Referred To " + this.doctorname + " For Further Investigation. Please Contact Him on Mobile" + this.docphoneno,
      // 'Dear ' + this.doctorname + ' I am referring my Patient ' + this.patientname + ' for further investigation.<br> My Notes About The Patient Is Given Below. <br>' + this.referalnotes + ' Please Feel Free To Reach Out To Me. If You Have Any Queries.<br><br> Regards<br>' + this.user,
    };
   
    this.docservice.SendMail(mailentity).subscribe(data => {
     
      Swal.fire('Mail sent successfully.');
    })
  }



  public onattachmentUpload1(abcd) {
   
    for (let i = 0; i < abcd.length; i++) {
      this.attachments1.push(abcd[i]);
      this.uploadattachments1();
    }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments1() {
    this.docservice.DoctorPhotoUpload(this.attachments1).subscribe(res => {
     
      this.attachmentsurl1.push(res);
      let a = this.attachmentsurl1[0].slice(2);
     
      let b = 'http://14.192.17.225' + a;

      // this.showdocphoto.push(b)
     

      this.attachments1.length = 0;
     
    })
    // this.sendattachment();
  }







  // var mailentity = {
  //   emailto: this.emaillist[i],
  //   emailsubject: "REGISTRATION FORM FOR EVENT",
  //   emailbody:
  //     "Please click on the below URL to regiter for the event " +
  //     "https://14.192.17.225/DigiEvents/#/RSVP/" +
  //     eventid,
  //   attachmenturl: this.attachmentsurl
  // };
}

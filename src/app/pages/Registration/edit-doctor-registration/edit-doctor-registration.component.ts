import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-doctor-registration',
  templateUrl: './edit-doctor-registration.component.html',
  styleUrls: ['./edit-doctor-registration.component.css']
})
export class EditDoctorRegistrationComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public doctorid: any;
  public details: any;
  public doctorname: any;
  public phno: any;
  public emailid: any;
  public departmentname: any;
  public address: any;
  public description: any;
  public cityid: any;
  public registrationno: any;
  public registrationcouncil: any;
  public registrationyear: any;
  public colleagename: any;
  public yearofpassing: any;
  public degreeid: any;
  public experience: any;
  public citylist: any;
  public departmentlist: any;
  public departmentid: any;
  public cityname: any;
  public degreelist: any;
  public photourl: any;
  public validEmail: any;
  public id: any;
  public homevisit: any;
  public editbit: any;
  public attachments1 = [];
  public attachmentsurl1 = [];
  public attachments = [];
  public attachmentsurl = [];
  public showdocphoto = [];
  public details1: any;
  public mid: any;
  public mphoto: any;
  public meditt: any;
  public medicalphotoid: any;
  public identityphoto: any;
  public identityid: any;
  public identiyyyds: any;
  public showidentityproof = [];

  public attachments2 = [];
  public attachmentsurl2 = [];
  public photodetail = [];
  public arealist: any;
  public areaid: any;
  public pincode: any;
  public dcoverify: any;
  public mallprcise: any;
  public countryid: any;
  public countrylist: any;
  public educationlist: any;
  public doctorservices: any;
  public serviceid: any;
  public servicelist: any;
  public docmedicalid: any;

  public languageid: any;
  public labels: any;
  public speaklanguages: any;
  dropzonelable: any;
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.id = params['id'];
    }
    )
    this.languageid = localStorage.getItem('LanguageID');
    this.getservicemaster()
    this.getcitymaster();
    this.getdepartmentmaster();
    this.getdegreemaster();
    this.getdoctordetailsbyid();
    this.GetDoctorMedicalproof();
    this.GetDoctorIdentityProof();
    this.GetCountryMaster()
    this.getdoctorservices();
    this.getdoctoreducationweb();
    this.editbit = 0;
    this.meditt = 0;
    this.identiyyyds = 0;
    this.getlanguage();

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }
  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }

  public getlanguage() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }
  public getcitymaster() {
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
        debugger
        this.citylist = data;
      }, error => {
      }
    )
  }

  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.countrylist = data;


      }, error => {
      }
    )
  }


  public GetCountryID(even) {
    debugger
    this.countryid = even.target.value;
    this.getcitymaster()
  }

  public getdepartmentmaster() {
    debugger
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.departmentlist = data;
      }, error => {
      }
    )
  }
  public getdegreemaster() {
    debugger
    this.docservice.GetDegreeMasterBylanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.degreelist = data;
      }, error => {
      }
    )
  }

  public getdoctordetailsbyid() {

    this.docservice.GetDoctorDetailsForAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {
        debugger;
        this.details = data[0];
        debugger;
        this.doctorname = this.details.doctorName,
          this.phno = this.details.mobileNumber,
          this.emailid = this.details.emailID,
          this.departmentid = this.details.departmentID,
          this.address = this.details.address,
          this.description = this.details.description,
          this.registrationno = this.details.registrationNo,
          this.experience = this.details.experience,
          this.registrationcouncil = this.details.registrationCouncil,
          this.registrationyear = this.details.registrationYear,
          this.photourl = this.details.photoURL,
          this.homevisit = this.details.homeVisit,
          this.areaid = this.details.areaID,
          this.pincode = this.details.pincode,
          this.dcoverify = this.details.documentsVerified,
          this.mallprcise = this.details.mallPractise,
          this.countryid = this.details.countryID,
          this.cityid = this.details.cityID,
          this.areaid = this.details.areaID,
          this.pincode = this.details.pincode,
          this.docmedicalid = this.details.docmedicalid,
          this.speaklanguages = this.details.spokenLanguages
        this.GetCountryMaster()
        this.getcitymaster();
        this.getareamasterbyid();
        this.getservicemaster()
      }, error => {
      }
    )
  }
  public GetcityID(even) {
    debugger
    this.cityid = even.target.value;
    this.getareamasterbyid();
  }
  public GetdepartmentID(even) {
    debugger
    this.departmentid = even.target.value;
  }
  public GetDegreeID(even) {
    debugger
    this.degreeid = even.target.value;
  }

  public GetDepartmentID(even) {
    debugger
    this.departmentid = even.target.value;
    this.getservicemaster();
  }

  public updatedetails() {
    debugger
    var entity = {
      'LanguageID': this.languageid,
      'DoctorID': this.id,
      'MobileNumber': this.phno,
      'EmailID': this.emailid,
      'Address': this.address,
      'CityID': this.cityid,
      'DepartmentID': this.departmentid,
      'Experience': this.experience,
      'Description': this.description,
      'HomeVisit': Number(this.homevisit),
      'AreaID': this.areaid,
      'Pincode': this.pincode,
      'DocumentsVerified': this.dcoverify,
      'MallPractise': this.mallprcise,
      'CountryID': this.countryid,
      'SpokenLanguages': this.speaklanguages,
    }
    this.docservice.UpdateDoctorPersonelInfo(entity).subscribe(res => {
      let test = res;
      this.getdoctordetailsbyid();
      Swal.fire(' Updated Successfully');
    })

  }

  public updatemedicalregistration() {
    debugger
    var entity = {
      'LanguageID': this.languageid,
      'DoctorID': this.docmedicalid,
      'RegistrationNo': this.registrationno,
      'RegistrationCouncil': this.registrationcouncil,
      'RegistrationYear': this.registrationyear

    }
    this.docservice.UpdateDoctorMedicalRegistration(entity).subscribe(res => {
      let test = res;
      this.getdoctordetailsbyid();
      Swal.fire(' Updated Successfully');
    })

  }
  public updatedoctoreducation() {
    debugger
    var entity = {
      'DoctorID': this.id,
      'DegreeID': this.degreeid,
      'CollegeName': this.colleagename,
      'YearOfPassing': this.yearofpassing
    }
    this.docservice.UpdateDoctorEducationAdmin(entity).subscribe(res => {
      let test = res;
      this.getdoctordetailsbyid();
      Swal.fire(' Updated Successfully');
    })

  }


  public GetEditPhoto() {
    this.editbit = 1;
  }


  public onattachmentUpload1(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
      this.attachments1.push(abcd.addedFiles[0]);
      this.uploadattachments1();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments1() {
    this.docservice.DoctorPhotoUpload(this.attachments1).subscribe(res => {
      debugger
      this.attachmentsurl1.push(res);
      let a = this.attachmentsurl1[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      this.showdocphoto.push(b)
      debugger

      this.attachments1.length = 0;
      debugger
    })
    // this.sendattachment();
  }
  public updatedocphoto() {
    debugger
    var entity = {
      'ID': this.id,
      'PhotoURL': this.attachmentsurl1[0]
    }
    this.docservice.UpdateDoctorRegistrationPhoto(entity).subscribe(res => {
      let test = res;
      this.getdoctordetailsbyid();
      Swal.fire(' Updated Successfully');
      this.editbit = 0;
      this.attachmentsurl1.length = 0
      this.showdocphoto.length = 0
    })

  }





  public GetDoctorMedicalproof() {

    this.docservice.GetDoctorMedicalProofs(this.id).subscribe(
      data => {
        debugger;
        this.details1 = data;
        debugger;
        // this.mid = this.details1.id,
        //   this.mphoto = this.details1.photoUrl

      }, error => {
      }
    )
  }


  public GetMedicalPhotoEdit(id) {
    debugger
    this.meditt = 1;
    this.medicalphotoid = id;
  }



  public onattachmentUpload2(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
      this.attachments2.push(abcd.addedFiles[0]);
      this.uploadattachments2();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }
  public uploadattachments2() {
    this.docservice.DoctorMedicalProof(this.attachments2).subscribe(res => {
      debugger
      this.attachmentsurl2.push(res);
      debugger
      let a = this.attachmentsurl2[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      this.photodetail.push(b)
      debugger

      this.attachments2.length = 0;
      debugger
    })
    // this.sendattachment();
  }


  public updatemedicalphoto() {
    debugger
    var entity = {
      'ID': this.medicalphotoid,
      'PhotoURL': this.attachmentsurl2[0]
    }
    this.docservice.UpdateDoctorMedicalProofs(entity).subscribe(res => {
      let test = res;
      this.getdoctordetailsbyid();
      this.GetDoctorMedicalproof();
      Swal.fire(' Updated Successfully');

      this.attachmentsurl2.length = 0
      this.photodetail.length = 0
      this.meditt = 0;
    })
  }


  public GetDoctorIdentityProof() {

    this.docservice.GetDoctorIdentityProofs(this.id).subscribe(
      data => {
        debugger;
        this.identityphoto = data;
        debugger;
        // this.mid = this.details1.id,
        //   this.mphoto = this.details1.photoUrl

      }, error => {
      }
    )
  }
  public GetidentityID(id) {
    debugger
    this.identityid = id;
    this.identiyyyds = 1;
  }


  public onattachmentUpload(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd.addedFiles[0]);
      this.uploadattachments();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.DoctorIdentityProof(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      this.showidentityproof.push(b)
      this.attachments.length = 0;
      debugger
    })
    // this.sendattachment();
  }


  public UpdateIdentityproof() {
    debugger
    var entity = {
      'ID': this.identityid,
      'PhotoURL': this.attachmentsurl[0]
    }
    this.docservice.UpdateDoctorIdentityProofs(entity).subscribe(res => {
      let test = res;
      this.GetDoctorIdentityProof();

      Swal.fire(' Updated Successfully');

      this.attachmentsurl.length = 0
      this.showidentityproof.length = 0
      this.identiyyyds = 0;
    })
  }
  public getareamasterbyid() {
    debugger
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
        debugger
        this.arealist = data;
      }, error => {
      }
    )
  }
  public GetAreaID(even) {
    debugger
    this.areaid = even.target.value;
    for (let i = 0; i < this.arealist.length; i++) {
      debugger
      if (this.arealist[i].id == this.areaid) {
        debugger
        this.pincode = this.arealist[i].pincode
      }
    }
  }


  public getdoctorservices() {
    this.docservice.GetDoctorServicesAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {
        debugger
        this.doctorservices = data;
      }, error => {
      }
    )
  }


  public GetServiceID(even) {
    this.serviceid = even.target.value;
  }


  public insertdetails() {

    var entity = {
      'DoctorID': this.id,
      'ServiceID': this.serviceid,
      'DepartmentID': this.departmentid
    }

    this.docservice.InsertDoctorServices(entity).subscribe(data => {
      debugger
      if (data != 0) {
        Swal.fire('Completed', 'Details saved successfully', 'success');
        this.getdoctorservices()

      }
      else {
        Swal.fire("Service Already Exists");
        this.getdoctorservices()
      }
    })

  }

  public getdoctoreducationweb() {
    this.docservice.GetDoctorEducationWebByLanguageID(this.id, this.languageid).subscribe(
      data => {
        debugger
        this.educationlist = data;

      }, error => {
      }
    )
  }



  public insertdoctoreducation() {
    debugger
    var entity = {
      'DoctorID': this.id,
      'CollegeName': this.colleagename,
      'YearOfPassing': this.yearofpassing,
      'DegreeID': this.degreeid,
      'Experience': this.id
    }
    this.docservice.InsertDoctorEducation(entity).subscribe(data => {
      debugger
      if (data != 0) {
        Swal.fire('Completed', 'Deatils Added Successfully');
        this.colleagename = "";
        this.yearofpassing = "";
        this.getdoctoreducationweb();
      }

    })
  }

  public DeleteDoctorSrvices(id) {
    debugger
    this.docservice.DeleteDoctorServices(id).subscribe(
      data => {
        debugger
        Swal.fire("Deleted Successfully");
        this.getdoctorservices();
      }, error => {
      }
    )
  }


  public DeleteDoctorEducation(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Education!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteDoctorEducation(id).subscribe(res => {
          let test = res;
          this.getdoctoreducationweb();
        })
        Swal.fire(
          'Deleted!',
          'Education has been deleted.',
          'success'
        )
      }
      else {
        this.getdoctoreducationweb();
      }
    })
  }

  public getservicemaster() {
    this.docservice.GetServiceMasterByDepartmentID(this.departmentid).subscribe(
      data => {
        debugger
        this.servicelist = data;


      }, error => {
      }
    )
  }

}

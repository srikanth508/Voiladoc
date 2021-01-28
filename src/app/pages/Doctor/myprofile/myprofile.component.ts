import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
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
  public doctorservices: any;
  public servicelist: any;
  public serviceid: any;
  public workingdetails: any;
  public countrylist: any;
  public countryid; any;
  public educationlist: any;

  public languageid: any;
  public docmedicalid: any;
  public labels: any;
  public speaklanguages: any;

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);


    this.id = localStorage.getItem('userid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();

    this.getdepartmentmaster();
    this.getdegreemaster();
    this.getdoctordetailsbyid();
    this.GetDoctorMedicalproof();
    this.GetDoctorIdentityProof()
    this.editbit = 0;
    this.meditt = 0;
    this.identiyyyds = 0;
    this.GetCountryMaster()
    this.getdoctorservices();
    this.GetDoctorHospitalDetails();
    this.getdoctoreducationweb()
  }

  public getlanguage() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }



  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.countrylist = data;


      }, error => {
      }
    )
  }


  public GetCountryID(even) {
    this.countryid = even.target.value;
    this.getcitymaster()
  }

  public getcitymaster() {
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
       
        this.citylist = data;
      }, error => {
      }
    )
  }


  // public getcitymaster() {
  //  
  //   this.docservice.GetCityMaster().subscribe(
  //     data => {
  //      
  //       this.citylist = data;
  //     }, error => {
  //     }
  //   )
  // }

  public getdepartmentmaster() {
   
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.departmentlist = data;
      }, error => {
      }
    )
  }
  public getdegreemaster() {
   
    this.docservice.GetDegreeMasterBylanguageID(this.languageid).subscribe(
      data => {
       
        this.degreelist = data;
      }, error => {
      }
    )
  }

  public getdoctordetailsbyid() {

    this.docservice.GetDoctorDetailsForAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {
       
        this.details = data[0];
       
        this.doctorname = this.details.doctorName,
          this.phno = this.details.mobileNumber,
          this.emailid = this.details.emailID,
          this.departmentid = this.details.departmentID,
          this.address = this.details.address,
          this.description = this.details.description,
          this.cityid = this.details.cityID,
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
          this.speaklanguages=this.details.spokenLanguages
        this.getcitymaster();
        this.getareamasterbyid();
        this.getservicemaster();
      }, error => {
      }
    )
  }
  public GetcityID(even) {
   
    this.cityid = even.target.value;
    this.getareamasterbyid();
  }
  public GetdepartmentID(even) {
   
    this.departmentid = even.target.value;
  }
  public GetDegreeID(even) {
   
    this.degreeid = even.target.value;
  }

  public updatedetails() {
   
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
      'DocumentsVerified': true,
      'MallPractise': false,
      'CountryID': this.countryid,
      'SpokenLanguages': this.speaklanguages,
    }
    this.docservice.UpdateDoctorPersonelInfo(entity).subscribe(res => {
      let test = res;
      this.getdoctordetailsbyid();
      if (this.languageid == 1) {
        Swal.fire(' Updated Successfully');
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
      }
    })
  }

  public updatemedicalregistration() {
   
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
      if (this.languageid == 1) {
        Swal.fire(' Updated Successfully');
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
      }
    })

  }
  public updatedoctoreducation() {
   
    var entity = {
      'DoctorID': this.id,
      'DegreeID': this.degreeid,
      'CollegeName': this.colleagename,
      'YearOfPassing': this.yearofpassing
    }
    this.docservice.UpdateDoctorEducationAdmin(entity).subscribe(res => {
      let test = res;
      this.getdoctordetailsbyid();
      if (this.languageid == 1) {
        Swal.fire(' Updated Successfully');
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
      }
    })

  }

  public GetEditPhoto() {
    this.editbit = 1;
  }


  public onattachmentUpload1(abcd) {
   
    for (let i = 0; i < abcd.length; i++) {
      this.attachments1.push(abcd[i]);
      this.uploadattachments1();
    }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Ajouté avec succès');
      abcd.length = 0;
    }
  }

  public uploadattachments1() {
    this.docservice.DoctorPhotoUpload(this.attachments1).subscribe(res => {
     
      this.attachmentsurl1.push(res);
      let a = this.attachmentsurl1[0].slice(2);
     
      let b = 'https://maroc.voiladoc.org' + a;

      this.showdocphoto.push(b)
     

      this.attachments1.length = 0;
     
    })
    // this.sendattachment();
  }
  public updatedocphoto() {
   
    var entity = {
      'ID': this.id,
      'PhotoURL': this.attachmentsurl1[0]
    }
    this.docservice.UpdateDoctorRegistrationPhoto(entity).subscribe(res => {
      let test = res;
      this.getdoctordetailsbyid();
      if (this.languageid == 1) {
        Swal.fire(' Updated Successfully');
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
      }
      this.editbit = 0;
      this.attachmentsurl1.length = 0
      this.showdocphoto.length = 0
    })

  }





  public GetDoctorHospitalDetails() {

    this.docservice.GetDoctorHospitalDetailsWeb(this.id, this.languageid).subscribe(
      data => {
       
        this.workingdetails = data;
       
        // this.mid = this.details1.id,
        //   this.mphoto = this.details1.photoUrl

      }, error => {
      }
    )
  }




  public GetDoctorMedicalproof() {

    this.docservice.GetDoctorMedicalProofs(this.id).subscribe(
      data => {
       
        this.details1 = data;
       
        // this.mid = this.details1.id,
        //   this.mphoto = this.details1.photoUrl

      }, error => {
      }
    )
  }


  public GetMedicalPhotoEdit(id) {
   
    this.meditt = 1;
    this.medicalphotoid = id;
  }



  public onattachmentUpload2(abcd) {
   
    for (let i = 0; i < abcd.length; i++) {
      this.attachments2.push(abcd[i]);
      this.uploadattachments2();
    }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Ajouté avec succès');
      abcd.length = 0;
    }
  }
  public uploadattachments2() {
    this.docservice.DoctorMedicalProof(this.attachments2).subscribe(res => {
     
      this.attachmentsurl2.push(res);
     
      let a = this.attachmentsurl2[0].slice(2);
     
      let b = 'https://maroc.voiladoc.org' + a;

      this.photodetail.push(b)
     

      this.attachments2.length = 0;
     
    })
    // this.sendattachment();
  }


  public updatemedicalphoto() {
   
    var entity = {
      'ID': this.medicalphotoid,
      'PhotoURL': this.attachmentsurl2[0]
    }
    this.docservice.UpdateDoctorMedicalProofs(entity).subscribe(res => {
      let test = res;
      this.getdoctordetailsbyid();
      this.GetDoctorMedicalproof();
      if (this.languageid == 1) {
        Swal.fire(' Updated Successfully');
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
      }
      this.attachmentsurl2.length = 0
      this.photodetail.length = 0
      this.meditt = 0;
    })
  }


  public GetDoctorIdentityProof() {

    this.docservice.GetDoctorIdentityProofs(this.id).subscribe(
      data => {
       
        this.identityphoto = data;
       
        // this.mid = this.details1.id,
        //   this.mphoto = this.details1.photoUrl

      }, error => {
      }
    )
  }
  public GetidentityID(id) {
   
    this.identityid = id;
    this.identiyyyds = 1;
  }



  public onattachmentUpload(abcd) {
   
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Ajouté avec succès');
      abcd.length = 0;
    }

  }

  public uploadattachments() {
    this.docservice.DoctorIdentityProof(this.attachments).subscribe(res => {
     
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
     
      let b = 'https://maroc.voiladoc.org' + a;

      this.showidentityproof.push(b)
      this.attachments.length = 0;
     
    })
    // this.sendattachment();
  }


  public UpdateIdentityproof() {
   
    var entity = {
      'ID': this.identityid,
      'PhotoURL': this.attachmentsurl[0]
    }
    this.docservice.UpdateDoctorIdentityProofs(entity).subscribe(res => {
      let test = res;
      this.GetDoctorIdentityProof();
      if (this.languageid == 1) {
        Swal.fire(' Updated Successfully');
        this.attachmentsurl.length = 0
        this.showidentityproof.length = 0
        this.identiyyyds = 0;
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succés');
        this.attachmentsurl.length = 0
        this.showidentityproof.length = 0
        this.identiyyyds = 0;
      }

    })
  }
  public getareamasterbyid() {
   
    this.docservice.GetAreaMasterByCityID(this.cityid).subscribe(
      data => {
       
        this.arealist = data;
      }, error => {
      }
    )
  }
  public GetAreaID(even) {
   
    this.areaid = even.target.value;
    for (let i = 0; i < this.arealist.length; i++) {
     
      if (this.arealist[i].id == this.areaid) {
       
        this.pincode = this.arealist[i].pincode
      }
    }
  }

  public GetDepartmentID(even) {
   
    this.departmentid = even.target.value;
    this.getservicemaster();
  }

  public getservicemaster() {
    this.docservice.GetServiceMasterByDepartmentIDAndLanguageID(this.departmentid, this.languageid).subscribe(
      data => {
       
        this.servicelist = data;


      }, error => {
      }
    )
  }
  public GetServiceID(even) {
    this.serviceid = even.target.value;
  }
  public getdoctorservices() {
    this.docservice.GetDoctorServicesAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {
       
        this.doctorservices = data;
      }, error => {
      }
    )
  }

  public insertdetails() {

    var entity = {
      'DoctorID': this.id,
      'ServiceID': this.serviceid,
      'DepartmentID': this.departmentid
    }

    this.docservice.InsertDoctorServices(entity).subscribe(data => {
     
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
  public DeleteDoctorSrvices(id) {
   
    this.docservice.DeleteDoctorServices(id).subscribe(
      data => {
       
        Swal.fire("Deleted Successfully");
        this.getdoctorservices();
      }, error => {
      }
    )
  }


  public DeleteDoctorSlots(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Day Slot!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteDoctorSlots(id).subscribe(res => {
          let test = res;
          this.GetDoctorHospitalDetails()
        })
        Swal.fire(
          'Deleted!',
          'Slot has been deleted.',
          'success'
        )
      }
      else {
        this.GetDoctorHospitalDetails()
      }
    })
  }

  public getdoctoreducationweb() {
    this.docservice.GetDoctorEducationWebByLanguageID(this.id, this.languageid).subscribe(
      data => {
       
        this.educationlist = data;

      }, error => {
      }
    )
  }



  public insertdoctoreducation() {
   
    var entity = {
      'DoctorID': this.id,
      'CollegeName': this.colleagename,
      'YearOfPassing': this.yearofpassing,
      'DegreeID': this.degreeid,
      'Experience': this.id
    }
    this.docservice.InsertDoctorEducation(entity).subscribe(data => {
     
      if (data != 0) {
        Swal.fire('Completed', 'Deatils Added Successfully');
        this.colleagename = "";
        this.yearofpassing = "";
        this.getdoctoreducationweb();
      }

    })
  }

  public DeleteDoctorEducation(id) {
   
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

}

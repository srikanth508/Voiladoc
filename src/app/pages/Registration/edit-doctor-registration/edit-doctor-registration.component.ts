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
    this.countryid = "";
    this.cityid = "";
    this.departmentid = "";
    this.areaid = "";
    this.slotid = "";

    this.getlanguage();

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
    this.GetDoctorType()
  }

  doctortyplist: any;


  public GetDoctorType() {
    this.docservice.GetDoctorTypeMasterByLanguageID(this.languageid).subscribe(data => {
      this.doctortyplist = data;

    }, error => {
    })
  }





  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }

  public getlanguage() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
  public getcitymaster() {
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {

        this.citylist = data;
      }, error => {
      }
    )
  }

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


  public getdegreemaster() {

    this.docservice.GetDegreeMasterBylanguageID(this.languageid).subscribe(
      data => {

        this.degreelist = data;
      }, error => {
      }
    )
  }


  public GetCategoryID(even) {
    this.categoryid = even.target.value;
    this.getdepartmentmaster()
  }

  public getdepartmentmaster() {

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data.filter(x => x.categoryID == this.categoryid);
      }, error => {
      }
    )
  }
  hospitalname:any;
  subscriptiontype:any;
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
          this.speaklanguages = this.details.spokenLanguages,
          this.slotid = this.details.slotDurationID,
          this.gender = this.details.genderID,
          this.doctypeid = this.details.doctorType,
          this.hospitalid = this.details.hospitalClinicID,
          this.signatureurl = this.details.signatureURL,
          this.referbit = this.details.referealBit,
          this.categoryid = this.details.categoryID,
          this.hospitalname=this.details.hospital_ClinicName,
          this.subscriptiontype=this.details.subscriptionTypeID,
          this.monthlysubription=this.details.monthlySubscription
          this.appointmentpercentage=this.details.appointmentPercentage
           this.taxidentification=this.details.taxIdentification
           this.businessid=this.details.businessID
          this.commercialcity=this.details.commercialRegCity
           this.taxprofessional=this.details.taxProfessional

           this.socialseccurityfundno=this.details.socialSeccurityNo
           this.nameofbank=this.details.nameofthebank
            this.accountName=this.details.accountName
            this.accountNumber=this.details.accountNumber
           


        this.GetCountryMaster()
        this.getcitymaster();
        this.getareamasterbyid();
        this.getservicemaster()
        this.GetDoctorType()
        this.getdepartmentmaster()
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

  public GetDepartmentID(even) {

    this.departmentid = even.target.value;
    this.getservicemaster();
  }

  gender: any;
  doctypeid: any;

  public GetDoctypeID(even) {
    this.doctypeid = even.target.value;
  }

  hospitalid: any;
  signatureurl: any;
  referbit: any;
  categoryid: any;


  taxidentification: any;
  businessid: any;
  commercialcity: any;
  taxprofessional: any;
  socialseccurityfundno: any;
  nameofbank: any;
  accountName: any;
  accountNumber: any;


  appointmentpercentage: any;
  monthlysubription: any;
  public Getsubscriptontype() {

    this.appointmentpercentage = 0;
    this.monthlysubription = 0;
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
      'DocumentsVerified': this.dcoverify,
      'MallPractise': this.mallprcise,
      'CountryID': this.countryid,
      'SpokenLanguages': this.speaklanguages,
      'SlotDurationID': this.slotid,
      'DoctorName': this.doctorname,
      'GenderID': this.gender,
      'DoctorType': this.doctypeid,
      'HospitalClinicID': this.hospitalid,
      'SignatureURL': this.signatureurl,
      'ReferealBit': this.referbit,
      'CategoryID': this.categoryid,
      'SubscriptionTypeID': this.subscriptiontype,
      'MonthlySubscription': this.monthlysubription,
      'AppointmentPercentage': this.appointmentpercentage,
      'TaxIdentification': this.taxidentification,
      'BusinessID': this.businessid,
      'CommercialRegCity': this.commercialcity,
      'TaxProfessional': this.taxprofessional,
      'SocialSeccurityNo': this.socialseccurityfundno,
      'Nameofthebank': this.nameofbank,
      'AccountName': this.accountName,
      'AccountNumber': this.accountNumber,
      'VAT': 0
    }
    this.docservice.UpdateDoctorPersonelInfo(entity).subscribe(res => {
      let test = res;

      if (this.languageid == 1) {
        this.getdoctordetailsbyid();
        Swal.fire('Updated Successfully');
      }
      else if (this.languageid == 6) {
        this.getdoctordetailsbyid();
        Swal.fire('Mis à jour avec succés');
      }

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
      debugger
      if (this.languageid == 1) {
        this.getdoctordetailsbyid();
        Swal.fire('Updated Successfully');
      }
      else if (this.languageid == 6) {
        this.getdoctordetailsbyid();
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
      if (this.languageid == 1) {
        this.getdoctordetailsbyid();
        Swal.fire('Updated Successfully');
      }
      else if (this.languageid == 6) {
        this.getdoctordetailsbyid();
        Swal.fire('Mis à jour avec succés');
      }
    })

  }

  public slotid: any;

  public GetSlotDurationID(even) {
    this.slotid = even.target.value;
  }



  public GetEditPhoto() {
    this.editbit = 1;
  }


  public onattachmentUpload1(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments1.push(abcd.addedFiles[0]);
    this.uploadattachments1();
    // }
    if (this.languageid == 1) {

      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
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
      if (this.languageid == 1) {
        this.getdoctordetailsbyid();
        Swal.fire(' Updated Successfully');
        this.editbit = 0;
        this.attachmentsurl1.length = 0
        this.showdocphoto.length = 0
      }
      else {
        this.getdoctordetailsbyid();
        Swal.fire('Mis à jour avec succés');
        this.editbit = 0;
        this.attachmentsurl1.length = 0
        this.showdocphoto.length = 0
      }

    })

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

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments2.push(abcd.addedFiles[0]);
    this.uploadattachments2();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
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
      if (this.languageid == 1) {
        this.getdoctordetailsbyid();
        this.GetDoctorMedicalproof();
        Swal.fire(' Updated Successfully');

        this.attachmentsurl2.length = 0
        this.photodetail.length = 0
        this.meditt = 0;
      }
      else {
        this.getdoctordetailsbyid();
        this.GetDoctorMedicalproof();
        Swal.fire('Mis à jour avec succés');

        this.attachmentsurl2.length = 0
        this.photodetail.length = 0
        this.meditt = 0;
      }

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

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else {
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
      if (this.languageid == 1) {
        this.GetDoctorIdentityProof();
        Swal.fire(' Updated Successfully');

        this.attachmentsurl.length = 0
        this.showidentityproof.length = 0
        this.identiyyyds = 0;
      }
      else {
        this.GetDoctorIdentityProof();
        Swal.fire('Mis à jour avec succés');

        this.attachmentsurl.length = 0
        this.showidentityproof.length = 0
        this.identiyyyds = 0;
      }

    })
  }
  public getareamasterbyid() {

    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
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


  public getdoctorservices() {
    this.docservice.GetDoctorServicesAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {

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
        if (this.languageid == 1) {
          Swal.fire('Completed', 'Details Added Successfully');
          this.colleagename = "";
          this.yearofpassing = "";
          this.getdoctoreducationweb();
        }
        else if (this.languageid == 6) {
          Swal.fire('Ajouté avec succès.');
          this.colleagename = "";
          this.yearofpassing = "";
          this.getdoctoreducationweb();
        }

      }

    })
  }

  public DeleteDoctorSrvices(id) {

    this.docservice.DeleteDoctorServices(id).subscribe(
      data => {
        if (this.languageid == 1) {
          Swal.fire("Deleted Successfully");
          this.getdoctorservices();
        }
        else {
          Swal.fire("Supprimé avec succès");
          this.getdoctorservices();
        }

      }, error => {
      }
    )
  }


  public DeleteDoctorEducation(id) {
    if (this.languageid == 1) {
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
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Supprimer !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteDoctorEducation(id).subscribe(res => {
            let test = res;
            this.getdoctoreducationweb();
          })
          Swal.fire(
            '',
            'Enregistré !'

          )
        }
        else {
          this.getdoctoreducationweb();
        }
      })

    }

  }

  public getservicemaster() {
    this.docservice.GetServiceMasterByDepartmentID(this.departmentid).subscribe(
      data => {

        this.servicelist = data;


      }, error => {
      }
    )
  }



  public GetGenderID(even) {

    this.gender = even.target.value;
  }
}

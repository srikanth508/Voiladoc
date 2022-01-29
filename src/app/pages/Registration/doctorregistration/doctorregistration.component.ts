import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-doctorregistration',
  templateUrl: './doctorregistration.component.html',
  styleUrls: ['./doctorregistration.component.css']
})
export class DoctorregistrationComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public doctorname: any;
  public phoneno: any;
  public email: any;
  public gender: any;
  public address: any;
  public experience: any;
  public description: any;
  public prefer: any;
  public chat: any;
  public medical: any;
  public registrationno: any;
  public registrationcouncil: any;
  public registrationyear: any;
  public colleagename: any;
  public yearofpassing: any;
  public otherexperience: any;
  public memberdetails: any;
  public homevisit: any;
  public arealist: any;
  public pincode: any;
  public showicons: any;



  public citylist: any;
  public cityid: any;
  public departmentlist: any;
  public departmentid: any;
  public specilisationlist: any;
  public specilisatiodd = {};
  public specilisationid = [];
  public attachments = [];
  public attachmentsurl = [];
  public attachments1 = [];
  public attachmentsurl1 = [];
  public attachments2 = [];
  public attachmentsurl2 = [];
  public signatureurl = [];
  public doctorid: any;
  public degreelist: any;
  public degreeid: any;
  public validEmail: any;
  public areaid: any;
  public showdocphoto = [];
  public showdocicons: any;
  public showidentityproof = []
  public consulttype: any;

  public showidproof = [];
  public idproof = [];
  public idproofurl = [];

  photodetail = [];
  public countrylist: any;
  public countrydd = {};
  public countryid: any;
  public citydd = {}
  public areadd = {}
  public doctortyplist: any;
  public doctypeid: any;
  public doctypeee = {};

  public dcoverify: any;
  public mallprcise: any;
  public validtill: any;

  public tablecount: any;
  public degreename: any;
  public languageid: any;
  public labels: any;

  public qwert = [];
  public referbit: any;
  public hospitalclinicid: any;
  public hospitalcliniclist: any;
  public hospitadd = {};
  public dummid: any;
  public speaklanguages: any;
  dropzonelable: any;
  search: any;
  meridionalid: any;
  ngOnInit() {
    this.dummid = localStorage.getItem('hospitalid');
    this.hospitalclinicid = localStorage.getItem('hospitalid');


    this.tablecount = 0
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 800);
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.GetDoctorType();
    // this.getspecilicationmaster();
    // this.getdepartmentmaster();
    this.getdegreemaster();
    this.GetCountryMaster();

    this.gethosptilclinicforadmin()
    this.departmentid = 0;
    this.categoryid = ""
    this.mallprcise = 1;
    this.chat = 1;

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }


  SelectLabel: any;
  public getlanguage() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search

      }, error => {
      }
    )
  }

  public GetDoctorType() {
    this.docservice.GetDoctorTypeMasterByLanguageID(this.languageid).subscribe(data => {
      this.doctortyplist = data;
      this.doctypeee = {
        singleSelection: true,
        idField: 'id',
        textField: 'type',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        //  itemsShowLimit: 3,
        allowSearchFilter: true,
        searchPlaceholderText: this.search,
      };
    }, error => {
    })
  }



  public gethosptilclinicforadmin() {

    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {

        this.hospitalcliniclist = data;
        this.hospitadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )
  }

  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }

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
          searchPlaceholderText: this.search,
          //  itemsShowLimit: 3,

          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }
  public GetCountryID(item: any) {

    this.countryid = item.id;

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
          allowSearchFilter: true,
          searchPlaceholderText: this.search,

        };
      }, error => {
      }
    )
  }

  public GetHospitalID(item: any) {

    this.hospitalclinicid = item.id;
  }



  public getdegreemaster() {

    this.docservice.GetDegreeMasterBylanguageID(this.languageid).subscribe(
      data => {

        this.degreelist = data;
      }, error => {
      }
    )
  }

  public dummapecilizationlist: any;

  public getspecilicationmaster() {

    this.docservice.GetSpecilaizationMasterByLanguageID(this.languageid).subscribe(
      data => {
        this.dummapecilizationlist = data;

        this.specilisationlist = this.dummapecilizationlist.filter(x => x.departmentID == this.departmentid)
        this.specilisatiodd = {
          singleSelection: false,
          idField: 'id',
          textField: 'specilaizationName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
          enableCheckAll: false,
          // allowSearchFilter: true

        };

      }, error => {
      }
    )
  }


  public GetCityID(item1: any) {

    this.cityid = item1.id;
    this.getareamasterbyid();
  }
  public GetDepartmentID(even) {

    this.departmentid = even.target.value;
    this.getspecilicationmaster()
  }
  public GetSpecilizationID(item: any) {

    this.specilisationid.push(item);

  }

  categoryid: any;

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



  public GetDegreeID(even) {

    this.degreeid = even.target.value;

    for (let i = 0; i < this.degreelist.length; i++) {
      if (this.degreelist[i].id == this.degreeid) {
        this.degreename = this.degreelist[i].short
      }
    }
  }
  public GetDoctypeID(item4: any) {

    this.doctypeid = item4.id;
  }

  slotid: any;

  public GetSlotDurationID(even) {
    this.slotid = even.target.value;
  }



  typeofdoctor: any;
  taxidentification: any;
  businessid: any;
  commercialcity: any;
  taxprofessional: any;
  socialseccurityfundno: any;
  nameofbank: any;
  accountName: any;
  accountNumber: any;

  public GetTypeofdoctor(even) {


    this.typeofdoctor = even.target.value;
    if (this.typeofdoctor == '1') {
      this.hospitalclinicid = 0;
    }
    else if (this.typeofdoctor == '2') {
      this.hospitalclinicid = 590;

    }
    else if (this.typeofdoctor == '3') {
      this.hospitalclinicid = 778;

    }
  }




  public insertdoctorregistration() {

    // if (this.attachmentsurl1.length == 0 || this.attachmentsurl.length == 0 || this.attachmentsurl2.length == 0) {
    //   Swal.fire("Please Upload Photo")
    // }
    if (this.countryid == undefined || this.countryid.length == 0) {

      Swal.fire("Please Select Country");
    }
    else if (this.cityid == undefined || this.cityid.length == 0) {
      Swal.fire("Please Select Province")
    }
    else if (this.areaid == undefined || this.areaid.length == 0) {
      Swal.fire("Please Select City");
    }
    else if (this.departmentid == undefined || this.departmentid.length == 0) {
      Swal.fire("Please Select Department");
    }
    else if (this.slotid == undefined || this.slotid == 0) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Slot Duration");
      }
      else {
        Swal.fire("Veuillez sélectionner la durée de la consultation.");
      }
    }
    else if (this.hospitalclinicid == undefined || this.hospitalclinicid == 0) {
      Swal.fire("Please Select Hospital/Clinic");
    }
    else if (this.doctypeid == undefined || this.doctypeid == 0) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Doctor type");
      }
      else {
        Swal.fire("Veuillez sélectionner le type de docteur.");
      }
    }
    else {
      if (this.attachmentsurl1.length == 0) {
        this.attachmentsurl1[0] = 'C:\\MarocAPI\\Images\\DocPhoto\\doc1.png'
      }
      this.spinner.show();
      // var doc = 'Dr.' + '' + this.doctorname
      var entity = {
        'DoctorName': this.doctorname,
        'MobileNumber': this.phoneno,
        'EmailID': this.email,
        'Password': '123',
        'DepartmentID': this.departmentid,
        'Experience': this.experience,
        'Address': this.address,
        'PhotoURL': this.attachmentsurl1[0],
        'Description': this.description,
        'MedicalRegistration': this.medical,
        'Preffered': this.prefer,
        'GenderID': Number(this.gender),
        'CityID': this.cityid,
        'LanguageID': this.languageid,
        'IsChatEnabled': Number(this.chat),
        'HomeVisit': Number(this.homevisit),
        'AreaID': this.areaid,
        'Pincode': this.pincode,
        'CountryID': this.countryid,
        'DoctorType': this.doctypeid,
        'DocumentsVerified': Number(this.dcoverify),
        'MallPractise': Number(this.mallprcise),
        'ReferealBit': this.referbit,
        'HospitalClinicID': this.hospitalclinicid,
        'SpokenLanguages': this.speaklanguages,
        'SignatureURL': this.signatureurl[0],
        'SlotDurationID': this.slotid,
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
      this.docservice.InsertDoctorRegistration(entity).subscribe(data => {

        if (data != 0 && data != 1) {
          this.doctorid = data;
          this.insertdoctorspecilisation();
          this.insertdoctormedicalregistration();
          this.insertidentityProof();
          this.InsertMedicalProof();
          this.insertdoctoreducation();
          this.insertdoctorexperience();
          this.insertdoctormembership();
          // this.getdoctorforadmin();

          // this.sendmail();
          if (this.languageid == 1) {
            Swal.fire('Registration Completed', 'Details saved successfully', 'success');
            // this.clear();
            this.spinner.hide();
            location.href = "#/Docdash";
          }
          else {
            Swal.fire('Sauvegardé');
            // this.clear();
            this.spinner.hide();
            location.href = "#/Docdash";
          }

        }
        else {

          if (data == 0) {
            if (this.languageid == 1) {
              Swal.fire('Email address already exists. Please verify and use the correct email address.');
              this.spinner.hide();
            }
            else {
              Swal.fire("L'adresse email existe déjà. Veuillez vérifier et utiliser la bonne adresse email.");
              this.spinner.hide();
            }

          }
          else {
            if (this.languageid == 1) {
              Swal.fire('The phone number already exists. Please verify and use the correct number');
              this.spinner.hide();
            }
            else {
              Swal.fire("Le numéro de téléphone existe déjà.Veuillez vérifier et utiliser le bon numéro.");
              this.spinner.hide();
            }
          }

          // location.href = "#/Docdash";
        }
      }, error => {
        Swal.fire("Exception while saving.Please Try After Some Time");
        this.spinner.hide();
      })
    }
  }
  doctorlist: any;

  public getdoctorforadmin() {

    this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.doctorlist = data;

        var list = this.doctorlist.filter(x => x.id == this.doctorid)
        this.pinno = list[0].pinno
        this.sendmail()
      }, error => {
      }
    )
  }


  pinno: any;
  emailattchementurl = [];

  public sendmail() {

    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.doctorname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Your Pin is ' + this.pinno + '.  Dont Share Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }




  public insertdoctorspecilisation() {
    for (let i = 0; i < this.specilisationid.length; i++) {
      var entity = {
        'SpecializationID': this.specilisationid[i].id,
        'DoctorID': this.doctorid
      }
      this.docservice.InsertDoctorSpecialization(entity).subscribe(data => {

        if (data != 0) {
        }
      })
    }
  }
  public insertdoctormedicalregistration() {
    if (this.registrationno == "") {
      this.registrationno = 0;
    }
    if (this.registrationcouncil == "") {
      this.registrationcouncil = 'none';
    }
    var entity = {
      'DoctorID': this.doctorid,
      'RegistrationNo': this.registrationno,
      'RegistrationCouncil': this.registrationcouncil,
      'RegistrationYear': this.registrationyear,
      'LanguageID': '1',
      'ValidTill': new Date()
    }
    this.docservice.InsertDoctorMedicalRegistration(entity).subscribe(data => {

      if (data != 0) {
      }
    })
  }




  public onidUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.idproof.push(abcd.addedFiles[0]);
    //  if (this.idproof[0].type == 'application/pdf' || this.idproof[0].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    //  {
    this.idproof.push(abcd.addedFiles[0]);
    this.uploadid();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }

    //  }
    //  else
    //  {
    //    Swal.fire('Please Upload Pdf/Document Format');
    //  }
    // application/pdf

  }

  public uploadid() {
    this.docservice.pharmacyphoto(this.idproof).subscribe(res => {

      this.idproofurl.push(res);
      let a = this.idproofurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showidproof.push('assets/Images/pdf.png');
      this.idproof.length = 0;

    })
    // this.sendattachment();
  }


  public InsertDocDetsils() {
    this.tablecount = 1;
    var entity = {
      'DegreeID': this.degreeid,
      'CollegeName': this.colleagename,
      'YearOfPassing': this.yearofpassing,
      'DegreeName': this.degreename
    }
    this.qwert.push(entity);
    this.colleagename = "";
    this.degreename = "";
    this.yearofpassing = "";
  }

  public insertdoctoreducation() {
    for (let i = 0; i < this.qwert.length; i++) {

      var entity = {
        'DoctorID': this.doctorid,
        'CollegeName': this.qwert[i].CollegeName,
        'YearOfPassing': this.qwert[i].YearOfPassing,
        'DegreeID': this.qwert[i].DegreeID,
        'Experience': this.doctorid,
        'Resume': this.idproofurl[0]
      }
      this.docservice.InsertDoctorEducation(entity).subscribe(data => {

        if (data != 0) {
        }

      })
    }

  }

  public insertdoctorexperience() {
    var entity = {
      'ExperienceDescription': this.otherexperience,
      'DoctorID': this.doctorid

    }
    this.docservice.InsertDoctorExperience(entity).subscribe(data => {

      if (data != 0) {
      }
    })
  }

  public insertdoctormembership() {
    var entity = {
      'MembershipDescription': this.memberdetails,
      'DoctorID': this.doctorid,
      'LanguageID': '1'
    }
    this.docservice.InsertDoctorMembership(entity).subscribe(data => {

      if (data != 0) {
      }
    })
  }

  public InsertMedicalProof() {
    if (this.attachmentsurl2.length == 0) {
      this.attachmentsurl2[0] = 'C:\\MarocAPI\\Images\\DocMedicalProofProof\\medical.jpg'
    }
    else {
      for (let i = 0; i < this.attachmentsurl2.length; i++) {
        var entity = {
          'DoctorID': this.doctorid,
          'PhotoURL': this.attachmentsurl2[i]
        }
        this.docservice.InsertDoctorMedicalProofs(entity).subscribe(data => {

          if (data != 0) {
          }
        })
      }
    }


  }

  public insertidentityProof() {
    if (this.attachmentsurl.length == 0) {
      this.attachmentsurl[0] = 'C:\\MarocAPI\\Images\\DocIdentityProof\\identity.jpg'
    }
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        'DoctorID': this.doctorid,
        'PhotoURL': this.attachmentsurl[i]
      }
      this.docservice.InsertDoctorIdentityProofs(entity).subscribe(data => {

        if (data != 0) {

        }
      })

    }


  }


  //Signature Upload

  signatureattachmentssss = []
  showsignaturephoto = []
  dummshowsignatureurl = []

  public onSignaturUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.dummshowsignatureurl = []
    this.signatureattachmentssss.push(abcd.addedFiles[0]);
    this.DoctorSignatureUpload();
    // }

    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }

  }

  subscriptiontype: any;

  public DoctorSignatureUpload() {
    this.docservice.DoctorSignatureUpload(this.signatureattachmentssss).subscribe(res => {

      this.signatureurl.push(res);

      this.dummshowsignatureurl.push(res);

      let a = this.dummshowsignatureurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.showsignaturephoto.push(b)
      this.signatureattachmentssss.length = 0;

    })

  }



  //End Sifnature Upload
  identityattachmentsurlssss = []

  public onattachmentUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.identityattachmentsurlssss = []
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }

  }

  public uploadattachments() {
    this.docservice.DoctorIdentityProof(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);

      this.identityattachmentsurlssss.push(res);

      let a = this.identityattachmentsurlssss[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showidentityproof.push(b)
      this.attachments.length = 0;



    })
    // this.sendattachment();
  }

  dummsttchmentursl = []
  public onattachmentUpload1(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.dummsttchmentursl = []
    this.attachments1.push(abcd.addedFiles[0]);
    this.uploadattachments1();
    // }

    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }

  }

  public uploadattachments1() {
    this.docservice.DoctorPhotoUpload(this.attachments1).subscribe(res => {

      this.attachmentsurl1.push(res);
      this.dummsttchmentursl.push(res);
      let a = this.dummsttchmentursl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.showdocphoto.push(b)


      this.attachments1.length = 0;

    })
    // this.sendattachment();
  }



  identityshowphoto = []

  public onattachmentUpload2(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.identityshowphoto = []
    this.attachments2.push(abcd.addedFiles[0]);
    this.uploadattachments2();
    // }

    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }

  }
  public uploadattachments2() {
    this.docservice.DoctorMedicalProof(this.attachments2).subscribe(res => {

      this.attachmentsurl2.push(res);
      this.identityshowphoto.push(res);

      let a = this.identityshowphoto[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.photodetail.push(b)


      this.attachments2.length = 0;

    })
    // this.sendattachment();
  }
  public clear() {
    this.doctorname = '';
    this.phoneno = '';
    this.email = '';
    this.experience = '';
    this.address = '';
    this.description = '';
    this.medical = '';
    this.prefer = '';
    this.gender = '';
    this.chat = '';
    this.colleagename = '';
    this.yearofpassing = '';
    this.registrationyear = '';
    this.otherexperience = '';
    this.registrationcouncil = '';
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
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )
  }
  public GetAreaID(item3: any) {

    this.areaid = item3.id;
    for (let i = 0; i < this.arealist.length; i++) {

      if (this.arealist[i].id == this.areaid) {

        this.pincode = this.arealist[i].pincode
      }
    }
  }
  public GetGenderID(even) {

    this.gender = even.target.value;
  }

  appointmentpercentage: any;
  monthlysubription: any;
  public Getsubscriptontype() {

    this.appointmentpercentage = 0;
    this.monthlysubription = 0;
  }


}

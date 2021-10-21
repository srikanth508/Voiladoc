import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-diagnostic-registration',
  templateUrl: './edit-diagnostic-registration.component.html',
  styleUrls: ['./edit-diagnostic-registration.component.css']
})
export class EditDiagnosticRegistrationComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public diagnosticid: any;
  public details: any;
  public diagnosticcentername: any;
  public phno: any;
  public contactperson: any;
  public licenseno: any;
  public licensevalidtill: any;
  public description: any;
  public cityid: any;
  public emailid: any;
  public address: any;
  public zipcode: any;
  public website: any;
  public timings: any;
  public citylist: any;
  public photourl: any;
  public contactpersonphno: any;
  public validEmail: any;
  public id: any;
  public photoslist: any;
  public diaphotoid: any;
  public diabit: any;
  public attachments = [];
  public attachmentsurl = [];
  public showphoto = [];
  public arealist: any;
  public areaid: any;
  public pincode: any;
  public countrylist: any;
  public countryid: any;
  public languageid: any;
  public labels: any;
  dropzonelable: any;
  diagnosticappointmentperslot: any;
  homesampleordersperslot: any;
  homesample: any;
  evngtimings: any;
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];

    }
    )
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
    this.getdiagnosticdetailsforadmin();
    this.GetDiagnosticPhotos();
    this.GetDiagnosticPhotos();
    this.GetCountryMaster()
    this.GetDiagnosticRevenue()
    this.diabit = 0;
    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

    this.countryid = "";
    this.cityid = "";
    this.areaid = "";

  }
  onChange(newValue) { const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; if (validEmailRegEx.test(newValue)) { this.validEmail = true; } else { this.validEmail = false; } }
  public getdiagnosticdetailsforadmin() {
    this.docservice.GetDiagnosticDetailsForAdminByLanguageID(this.id, this.languageid).subscribe(
      data => {

        this.details = data[0];
        debugger
        this.diagnosticcentername = this.details.diagnosticCenterName,
          this.phno = this.details.phoneNo,
          this.contactperson = this.details.contactPerson,
          this.contactpersonphno = this.details.contactPersonPhNo,
          this.licenseno = this.details.licenseNo,
          this.licensevalidtill = this.details.licenseValidTill,
          this.emailid = this.details.emailID,
          this.address = this.details.address,
          this.cityid = this.details.cityID,
          this.zipcode = this.details.zipcode,
          this.website = this.details.website,
          this.timings = this.details.timings,
          this.description = this.details.description,
          this.photourl = this.details.photoURL
        this.areaid = this.details.areaID,
          this.countryid = this.details.countryID,
          this.pincode = this.details.pincode,
          this.diagnosticappointmentperslot = this.details.diagnosticAppointmentPerSlot,
          this.homesampleordersperslot = this.details.homeSampleOrdersPerSlot,
          this.homesample = this.details.homeSample,
          this.evngtimings = this.details.eveningTimings
        debugger
        this.GetCountryMaster();
        this.getcitymaster();
        this.getareamasterbyid();

      }, error => {
      }
    )
  }
  public getlanguage() {
    this.docservice.GetAdmin_DiagnosticRegistration_LabelBYLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
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

  public getcitymaster() {
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {

        this.citylist = data;
      }, error => {
      }
    )
  }
  public GetcityID(even) {

    this.cityid = even.target.value;
    this.getareamasterbyid();
  }
  public updatedetails() {

    var entity = {
      'LanguageID': this.languageid,
      'DiagnosticCenterID': this.id,
      'PhoneNo': this.phno,
      'ContactPerson': this.contactperson,
      'ContactPersonPhNo': this.contactpersonphno,
      'LicenseNo': this.licenseno,
      'LicenseValidTill': this.licensevalidtill,
      'EmailID': this.emailid,
      'Address': this.address,
      'CityID': this.cityid,
      'Zipcode': this.zipcode,
      'Website': this.website,
      'Timings': this.timings,
      'Description': this.description,
      'AreaID': this.areaid,
      'Pincode': this.pincode,
      'CountryID': this.countryid,
      'DiagnosticAppointmentPerSlot': this.diagnosticappointmentperslot,
      'HomeSampleOrdersPerSlot': this.homesampleordersperslot,
      'HomeSample': this.homesample,
      'EveningTimings': this.evngtimings
    }
    this.docservice.UpdateDiagnosticCenterProfile(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        this.getdiagnosticdetailsforadmin();
        Swal.fire(' Updated Successfully');
      }
      else {
        this.getdiagnosticdetailsforadmin();
        Swal.fire('Mis à jour avec succès');
      }

    })

  }

  public GetDiagnosticPhotos() {

    this.docservice.GetDiagnosticCenterPhotosByID(this.id).subscribe(
      data => {

        this.photoslist = data;
      }, error => {
      }
    )
  }
  public GetDiagphotoId(diaid) {

    this.diaphotoid = diaid;
    this.diabit = 1;
  }
  public onattachmentUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.DiagnosticPhotos(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }
  public UpdateDiaPhotos() {

    var entity = {
      'ID': this.diaphotoid,
      'PhotoURL': this.attachmentsurl[0],
    }
    this.docservice.UpdateDiagnosticCenterPhotos(entity).subscribe(res => {
      let test = res;
      if (this.languageid == 1) {
        this.GetDiagnosticPhotos();
        Swal.fire(' Updated Successfully');
        this.diabit = 0;
        this.showphoto.length = 0
      }
      else {
        this.GetDiagnosticPhotos();
        Swal.fire('Mis à jour avec succès');
        this.diabit = 0;
        this.showphoto.length = 0
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

  public Diagnosticrevenuelist: any;

  public GetDiagnosticRevenue() {
    this.docservice.GetDiagnosticCentersSubscriptions_Revenue(this.id).subscribe(data => {

      this.Diagnosticrevenuelist = data;
    })
  }






  public monthlysubription: any;
  public contractstartdate: any;
  public contractenddate: any;
  public revenueupdateid: any;



  public GetContractSubscriptions(subscriptions) {
    this.monthlysubription = subscriptions.monthlySubscription;
    this.contractstartdate = subscriptions.editcontractStartDate;
    this.contractenddate = subscriptions.editcontractenddate;
    this.revenueupdateid = subscriptions.id
  }


  public UpdateDiagnosticRevenue() {
    var entity = {
      'ID': this.revenueupdateid,
      'MonthlySubscription': this.monthlysubription,
      'ContractStartdate': this.contractstartdate,
      'ContractEnddate': this.contractenddate
    }
    this.docservice.UpdateDiagnosticCentersSubscriptions_Revenue(entity).subscribe(data => {

      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        this.GetDiagnosticRevenue();
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succès');
        this.GetDiagnosticRevenue();
      }

    })

  }


  public addmonthlysubscription: any;
  public contractstartdateeee: any;
  public contractenddateeeee: any;




  public InsertDiagnosticRevenue() {

    var entity = {
      'DiagnosticID': this.id,
      'MonthlySubscription': this.addmonthlysubscription,
      'ContractStartdate': this.contractstartdateeee,
      'ContractEnddate': this.contractenddateeeee
    }
    this.docservice.InsertDiagnosticCentersSubscriptions_Revenue(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Data added Successfully');
        this.GetDiagnosticRevenue();
        this.addmonthlysubscription = "";
        this.contractstartdateeee = "";
        this.contractenddateeeee = "";
      }
      else {
        Swal.fire('Error', 'Contract Dates Already Exists');
        this.GetDiagnosticRevenue();
        this.addmonthlysubscription = "";
        this.contractstartdateeee = "";
        this.contractenddateeeee = "";
      }
    })

  }
}

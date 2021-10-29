import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-midwifeservices',
  templateUrl: './midwifeservices.component.html',
  styleUrls: ['./midwifeservices.component.css']
})
export class MidwifeservicesComponent implements OnInit {
  public labels: any;
  public languageid: any;
  public countryname: any;
  public id: any;
  public countrylist: any;
  public showbit: any;
  dummnurselist: any;
  nurselist: any;
  physiolist: any;
  term: any;
  user: any;
  dummid: any;
  midwifeid: any;
  showDropdown: any;
  hospitalclinicid: any;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.midwifeid = localStorage.getItem('midwifeid');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    if (this.midwifeid == undefined) {
      this.showDropdown = 1;
    }
    else {
      this.showDropdown = 0;
    }

    this.user = localStorage.getItem('user');
    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];

      if (this.id == undefined) {
        debugger
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        debugger
        this.showbit = 1;
        this.GetPhysioServices()
      }
    }
    )
    this.getlanguage1()
    this.getlanguage();

    if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {

          this.nurselist = data.filter(x => x.hospitalClinicID == this.hospitalclinicid);

        }, error => {
        }
      )
    }
    else {
      this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {

          this.nurselist = data;

        }, error => {
        }
      )
    }

  }





  labels1: any;

  public getlanguage1() {
    debugger
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels1 = data;
      }, error => {
      }
    )
  }


  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  public GetPhysioID(even) {
    this.midwifeid = even.target.value;
  }



  public GetPhysioServices() {
    debugger
    this.docservice.GetMidWifeServicesWeb(this.midwifeid, 1).subscribe(
      data => {
        debugger
        var list = data.filter(x => x.id == this.id);
        this.midwifeid = list[0].midWifeID,
          this.servicename = list[0].serviceName,
          this.description = list[0].serviceDescription,
          this.charges = list[0].serviceCharges
        debugger
      }, error => {
      }
    )
  }

  servicename: any;
  charges: any;
  description: any;
  qwerty = [];
  idcount: any;
  tablecount: any;

  public insertdetails() {
    var entity = {
      'Sno': this.idcount,
      'PhysioID': this.midwifeid,
      'ServiceName': this.servicename,
      'ServiceDescription': this.description,
      'ServiceCharges': this.charges,
      'LanguageID': this.languageid
    }
    this.qwerty.push(entity);
    this.idcount = this.idcount + 1;
    this.tablecount = 1;
    this.servicename="";
    this.description="";
    this.charges="";

  }


  public SaveDetails() {
    for (let i = 0; i < this.qwerty.length; i++) {
      var entity = {
        'MidWifeID': this.midwifeid,
        'ServiceName': this.qwerty[i].ServiceName,
        'ServiceDescription': this.qwerty[i].ServiceDescription,
        'ServiceCharges': this.qwerty[i].ServiceCharges,
        'LanguageID': this.languageid
      }
      this.docservice.InsertMidWifeServicesWeb(entity).subscribe(data => {
        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire("Saved Successfully");
            location.href = "#/MidwifeservicesDash"
          }
          else {
            Swal.fire("Enregistré");
            location.href = "#/MidwifeservicesDash"
          }

        }

      })
    }

  }

  public delete(Sno) {

    for (let i = 0; i < this.qwerty.length; i++) {
      if (Sno == this.qwerty[i].Sno) {


        this.qwerty.splice(i, 1);
      }
    }
    if (this.qwerty.length == 0) {
      this.tablecount = 0;
    }

  }

  public updatedetails() {
    debugger
    var entity = {
      'ID': this.id,
      'MidWifeID': this.midwifeid,
      'ServiceName': this.servicename,
      'ServiceDescription': this.description,
      'ServiceCharges': this.charges,
      'LanguageID': this.languageid
    }
    this.docservice.UpdateMidWifeServicesWeb(entity).subscribe(data => {

      if (this.languageid == 1) {
        Swal.fire("Updated Successfully");
        location.href = "#/MidwifeservicesDash"
      }
      else {
        Swal.fire("Enregistré");
        location.href = "#/MidwifeservicesDash"
      }
    })


  }

}

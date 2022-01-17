import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-physio-services',
  templateUrl: './physio-services.component.html',
  styleUrls: ['./physio-services.component.css']
})
export class PhysioServicesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

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
  showDropdown:any;
  labels1:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.physioid = localStorage.getItem('physioid');
    this.dummid = localStorage.getItem('physioid');
    if(this.dummid==undefined)
    {
      this.showDropdown=1;
    }
    else
    {
      this.showDropdown=2;
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

    this.getlanguage();


    this.docservice.GetPhysiotherapyRegistringLogins(this.languageid).subscribe(
      data => {
        this.physiolist = data;

      }, error => {
      }
    )

    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels1 = data;
      }, error => {
      }
    )

  }
  public GetPhysioID(even) {
    this.physioid = even.target.value;
  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  public GetPhysioServices() {
    debugger
    this.docservice.GetPhysioServicesByIDWeb(this.languageid, 1).subscribe(
      data => {
        debugger
        var list = data.filter(x => x.id == this.id);
        this.physioid = list[0].physioID,
          this.servicename = list[0].serviceName,
          this.description = list[0].serviceDescription,
          this.charges = list[0].serviceCharges
        debugger
      }, error => {
      }
    )
  }
  physioid: any;
  servicename: any;
  charges: any;
  description: any;
  qwerty = [];
  idcount: any;
  tablecount: any;

  public insertdetails() {
    var entity = {
      'Sno': this.idcount,
      'PhysioID': this.physioid,
      'ServiceName': this.servicename,
      'ServiceDescription': this.description,
      'ServiceCharges': this.charges,
      'LanguageID': this.languageid
    }
    this.qwerty.push(entity);
    this.idcount = this.idcount + 1;
    this.tablecount = 1;
  }


  public SaveDetails() {
    for (let i = 0; i < this.qwerty.length; i++) {
      var entity = {
        'PhysioID': this.physioid,
        'ServiceName': this.qwerty[i].ServiceName,
        'ServiceDescription': this.qwerty[i].ServiceDescription,
        'ServiceCharges': this.qwerty[i].ServiceCharges,
        'LanguageID': this.languageid
      }
      this.docservice.InsertPhysioServicesMobileWeb(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire("Saved Successfully");
          location.href = "#/PhysioServicesDash"
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
      'PhysioID': this.physioid,
      'ServiceName': this.servicename,
      'ServiceDescription': this.description,
      'ServiceCharges': this.charges,
      'LanguageID': this.languageid
    }
    this.docservice.UpdatePhysioServicesMobileWeb(entity).subscribe(data => {

      Swal.fire("Updated Successfully");
      location.href = "#/PhysioServicesDash"
    })


  }
}

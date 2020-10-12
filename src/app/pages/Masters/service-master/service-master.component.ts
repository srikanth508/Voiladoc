import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-service-master',
  templateUrl: './service-master.component.html',
  styleUrls: ['./service-master.component.css']
})
export class ServiceMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels: any;
  public languageid: any;
  public departmentlist: any;
  public departmentid: any;
  public servicename: any;
  public description: any;
  public id: any;
  public showbit: any;
  public servicelist: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
     

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
      }
    }
    )
    this.getlanguage();
    this.getdepartmentmaster();
    this.GetServicemaster()
    this.departmentid=0;
    this.servicetypeid=0;
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public getdepartmentmaster() {
   
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.departmentlist = data;
      }, error => {
      }
    )
  }
  public GetDepartmentID(even) {
   
    this.departmentid = even.target.value;
  }
  servicetypeid
  public GetServicetypeID(even) {
   
    this.servicetypeid = even.target.value;
  }
  

  public GetServicemaster() {
    this.docservice.GetServiceMasterWeb(this.languageid).subscribe(
      data => {
       
        this.servicelist = data;
        var list = this.servicelist.filter(x => x.id == this.id)
        this.departmentid = list[0].departmentID,
        this.servicetypeid = list[0].typeID,
          this.servicename = list[0].serviceName
        this.description = list[0].description
      }, error => {
      }
    )
  }





  public insertdetails() {
    if(this.departmentid==0||this.departmentid==undefined ||this.servicetypeid==0||this.servicetypeid==undefined)
    {
      Swal.fire("Please Select Department and Service Type");
    }
    else{
      this.spinner.show();
      var entity = {
        'DepartmentID': this.departmentid,
        'ServiceName': this.servicename,
        'Description': this.description,
        'LanguageID': 1,
        'TypeID':this.servicetypeid
      }
      this.docservice.InsertServiceMasterWeb(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Saved Successfully');
          this.spinner.hide();
          location.href = "#/ServiceMasterDash"
        }
      })
    }
  }


  public updatedetails() {
   
    var entity = {
      'ID': this.id,
      'DepartmentID': this.departmentid,
      'ServiceName': this.servicename,
      'Description': this.description,
      'LanguageID': this.languageid,
      'TypeID':this.servicetypeid
    }
    this.docservice.UpdateServiceMaster_Web(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Details Updated Successfully');
    
      location.href = "#/ServiceMasterDash"

    })
  }
}

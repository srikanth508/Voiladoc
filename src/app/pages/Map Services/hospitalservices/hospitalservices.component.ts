import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitalservices',
  templateUrl: './hospitalservices.component.html',
  styleUrls: ['./hospitalservices.component.css']
})
export class HospitalservicesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public servicelist: any;
  public hospitalcliniclist: any;
  public servicedd = {};
  public serviceid = [];
  public hospitalid: any;
  public hospitadd: any;
  public departmentlist: any;
  public departmentid: any;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummhospitallist: any;
  public hospitalname: any;
  public dummid: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.dummid = localStorage.getItem('hospitalid');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.hospitalname = localStorage.getItem('user');
    this.getlanguage();
    this.gethosptilclinicforadmin();
    this.getdepartmentmaster();
  }
  public getlanguage() {
    debugger
    this.docservice.GetAdmin_MapServices_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.labels = data;
        this.SelectLabel=this.labels[0].select;
      }, error => {
      }
    )
  }
  SelectLabel:any
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
  public GetDepartmentID(even) {
    debugger
    this.departmentid = even.target.value;
    this.getservicemaster();
  }



  public getservicemaster() {
    this.docservice.GetServiceMasterByDepartmentIDAndLanguageID(this.departmentid, this.languageid).subscribe(
      data => {
        debugger
        let temp:any=data;
        this.servicelist = temp.filter(x=>x.typeID==5);
        this.servicedd = {
          singleSelection: false,
          idField: 'id',
          textField: 'serviceName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll:false
        };

      }, error => {
      }
    )
  }
  public gethosptilclinicforadmin() {
    if (this.hospitalid == undefined) {
      debugger
      this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
        data => {
          debugger
          this.hospitalcliniclist = data;
          this.hospitadd = {
            singleSelection: true,
            idField: 'id',
            textField: 'hospital_ClinicName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true
          };
        }, error => {
        }
      )
    }
    else if (this.hospitalid != undefined) {
      debugger
      this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
        data => {
          debugger
          this.dummhospitallist = data;
          this.hospitalcliniclist = this.dummhospitallist.filter(x => x.id == this.hospitalclinicid)
          this.hospitadd = {
            singleSelection: true,
            idField: 'id',
            textField: 'hospital_ClinicName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true
          };
        }, error => {
        }
      )
    }

  }
  public GetServiceID(item: any) {
    debugger
    this.serviceid.push(item);
  }
  public GetHospitalID(item: any) {
    debugger
    this.hospitalid = item.id;
  }
  public insertdetails() {
    for (let i = 0; i < this.serviceid.length; i++) {
      var entity = {
        'Hospital_ClinicDetailsID': this.hospitalid,
        'ServiceID': this.serviceid[i].id,
        'LanguageID': '1',
        'DepartmentID': this.departmentid
      }
      this.docservice.InsertHospitalClinicServices(entity).subscribe(data => {
        debugger
        if (data != 0) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
          this.serviceid.length = 0;
          location.href="#/HospitalServicesDash"
        }
        else {
          Swal.fire("Service Already Exists");
          this.serviceid.length = 0;
          location.href="#/HospitalServicesDash"
        }
      })
    }
  }


}


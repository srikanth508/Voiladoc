import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doctorservices',
  templateUrl: './doctorservices.component.html',
  styleUrls: ['./doctorservices.component.css']
})
export class DoctorservicesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public doctorlist: any;
  public doctorid: any;
  public servicelist: any;
  public servicedd = {};
  public serviceid = [];
  public dropdown = [];
  public doctordd = {};
  public departmentlist: any;
  public departmentid: any;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  SelectLabel
  public dummdoctorlist: any;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.getlanguage();
    this.getdoctorforadmin();

    this.getdepartmentmaster()
  }

  public getlanguage() {
   
    this.docservice.GetAdmin_MapServices_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
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
    this.getservicemaster();
  }



  public getdoctorforadmin() {
   
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
        data => {
         
          this.doctorlist = data;
          this.doctordd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true
          };
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
        data => {
         
          this.dummdoctorlist = data;
          this.doctorlist = this.dummdoctorlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.doctordd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
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
  public getservicemaster() {
    this.docservice.GetServiceMasterByDepartmentIDAndLanguageID(this.departmentid, this.languageid).subscribe(
      data => {
       
        let temp: any = data;
        this.servicelist = temp.filter(x => x.typeID == 1);
        this.servicedd = {
          singleSelection: false,
          idField: 'id',
          textField: 'serviceName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };

      }, error => {
      }
    )
  }
  public GetServiceID(item: any) {
   
    this.serviceid.push(item);
  }

  onItemDeSelect(item: any) {
   
    var index = this.serviceid.findIndex(x => x.id == item.id)
    this.serviceid.splice(index, 1);

  }
  public GetDoctorID(item1: any) {
   
    this.doctorid = item1.id;
   
    var dept = this.doctorlist.filter(x => x.id == this.doctorid)
    this.departmentid = dept[0].departmentID
    this.getdepartmentmaster()
    this.getservicemaster()
  }
  public insertdetails() {
    for (let i = 0; i < this.serviceid.length; i++) {
      var entity = {
        'DoctorID': this.doctorid,
        'ServiceID': this.serviceid[i].id,
        'DepartmentID': this.departmentid
      }

      this.docservice.InsertDoctorServices(entity).subscribe(data => {
       
        if (data != 0) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
          this.dropdown = [];
          this.serviceid.length = 0;
        }
        else {
          Swal.fire("Service Already Exists");
        }
      })
    }
  }
}



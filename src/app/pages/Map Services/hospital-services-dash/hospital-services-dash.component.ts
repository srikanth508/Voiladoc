import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hospital-services-dash',
  templateUrl: './hospital-services-dash.component.html',
  styleUrls: ['./hospital-services-dash.component.css']
})
export class HospitalServicesDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public term: any;
  public hospitallist: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummhospitalist: any;
  DepartmentList
  DepartmentList1
  roleid: any
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.roleid = localStorage.getItem('roleid');
    this.getlanguage();
    this.GetHospitalClinicServices();
    if (this.languageid == 1) {
      this.docservice.GetDepartmentMaster().subscribe(
        data => {
         
          let temp: any = data;
          this.DepartmentList = temp;
        }, error => {
        }
      )
    }
    else {
      this.docservice.GetDepartmentMaster_French().subscribe(
        data => {
         
          let temp: any = data;
          this.DepartmentList1 = temp;
        }, error => {
        }
      )
    }
  }

  public getlanguage() {
   
    this.docservice.GetAdmin_MapServices_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public GetHospitalClinicServices() {
   
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetHospital_ClinicServices(this.languageid).subscribe(
        data => {
         
          this.hospitallist = data;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetHospital_ClinicServices(this.languageid).subscribe(
        data => {
         
          this.dummhospitalist = data;
          this.hospitallist = this.dummhospitalist.filter(x => x.hospital_ClinicDetailsID == this.hospitalclinicid)
        }, error => {
        }
      )

    }

  }
  public DeletehospitalClinicServices(id) {
   
    this.docservice.DeleteHospital_ClinicServices(id).subscribe(
      data => {
       
        Swal.fire("Deleted Successfully");
        this.GetHospitalClinicServices()
      }, error => {
      }
    )
  }
  public pageChanged(even) {
   
    let fgdgfgd = even;
    this.p = even;
  }
  departmentid
  public GetDepartmentID(event) {
   
    this.departmentid = event.target.value;
    if (this.departmentid == 0) {
      this.GetHospitalClinicServices();
    }
    else {
      this.docservice.GetHospital_ClinicServices(this.languageid).subscribe(
        data => {
         
          this.dummhospitalist = data;
          this.hospitallist = this.dummhospitalist.filter(x => x.hospital_ClinicDetailsID == this.hospitalclinicid && x.departmentID == this.departmentid)
        }, error => {
        }
      )
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public hospitalid: any;
  public doctorlist: any;
  public departmentlist: any;
  public departmentid: any;
  public term1: any;

  public term: any;

  public languageid: any;
  public labels: any;
  public count: any;
  public dummlist: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.gethospitaldoctorsforadmin();
    this.getdepartmentmaster();
    this.getlanguage();

  }

  
  public GetDepartmentID(even) {
    debugger
    if (even.target.value != 0) {
      this.term = even.target.value;
      this.doctorlist = this.dummlist.filter(x => x.departmentname == this.term)
      this.count = this.doctorlist.length;
    }
    else {
      this.gethospitaldoctorsforadmin()
    }

  }

  public getlanguage() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }
  public gethospitaldoctorsforadmin() {
    debugger
    this.docservice.GetHospitalDoctorsForAdmin(this.hospitalid, this.languageid).subscribe(
      data => {
        debugger
        this.doctorlist = data;
        this.dummlist = data;
        this.count = this.doctorlist.length;
      }, error => {
      }
    )
  }
  public deletedoctorhosiptaldetails() {
    debugger
    this.docservice.DeleteDoctorHospitalDetails(this.hospitalid).subscribe(
      data => {
        Swal.fire("Deleted Succesfully");
        this.gethospitaldoctorsforadmin();
      }, error => {
      }
    )
  }
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

}

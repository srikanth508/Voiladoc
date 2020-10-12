import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doctor-services-dash',
  templateUrl: './doctor-services-dash.component.html',
  styleUrls: ['./doctor-services-dash.component.css']
})
export class DoctorServicesDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public term: any;
  public servicelist: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummservicelist: any;
  public doctorlist: any;
  DepartmentList1: any;
  DepartmentList: any
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.GetDoctorServices();
    this.getlanguage();


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
          this.DepartmentList = temp;
        }, error => {
        }
      )
    }



    this.docservice.GetDoctorListByLanguageID(1).subscribe(
      data => {
       
        let temp: any = data;
        this.doctorlist = temp.filter(x => x.hospitalClinicID == this.hospitalclinicid)
      }, error => {
      }
    )



  }

  public getlanguage() {
   
    this.docservice.GetAdmin_MapServices_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetDoctorServices() {
    if (this.hospitalclinicid == undefined) {
     
      this.docservice.GetDoctorServices(this.languageid).subscribe(
        data => {
         
          this.servicelist = data;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
     
      this.docservice.GetDoctorServices(this.languageid).subscribe(
        data => {
         
          this.dummservicelist = data;
          this.servicelist = this.dummservicelist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
        }, error => {
        }
      )
    }
  }
  public DeleteDiagnostocServces(id) {
   
    this.docservice.DeleteDoctorServices(id).subscribe(
      data => {
       
        Swal.fire("Deleted Successfully");
        this.GetDoctorServices();
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
      this.GetDoctorServices();
    }
    else {
      this.docservice.GetDoctorServices(this.languageid).subscribe(
        data => {
         
          this.dummservicelist = data;
          this.servicelist = this.dummservicelist.filter(x => x.hospitalClinicID == this.hospitalclinicid && x.departmentID == this.departmentid)
        }, error => {
        }
      )
    }
  }
  doctorID
  public GetDoctorID(event) {
   
    this.doctorID = event.target.value;
    if (this.doctorID == 0) {
      this.GetDoctorServices();
    }
    else {
      this.docservice.GetDoctorServices(this.languageid).subscribe(
        data => {
         
          this.dummservicelist = data;
          this.servicelist = this.dummservicelist.filter(x => x.hospitalClinicID == this.hospitalclinicid && x.departmentID == this.departmentid && x.doctorID == this.doctorID)
        }, error => {
        }
      )
    }
  }

}

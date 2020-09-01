import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nurseworkingdash',
  templateUrl: './nurseworkingdash.component.html',
  styleUrls: ['./nurseworkingdash.component.css']
})
export class NurseworkingdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public nurseid: any;
  public workinglist: any;
  public nursehospitaldetilsid: any;
  public dayid: any;
  public startdatetime: any;
  public enddatetime: any;
  public term: any;
  public dayslist: any;
  public id: any;

  public languageid: any;
  public labels: any;
  public hospitalclinicid: any;
  public dummworkinglist:any;
  public dummlist:any;
  public nurselist:any;
  public count:any;
  public daysname:any;
  public nursename:any;
  ngOnInit() {
    this.daysname=''
    this.nursename=''
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');

    this.getlanguage()
    this.getnurselist();
    this.GetDaysMaster()


    if (this.hospitalclinicid == undefined) {
      this.getnurselist();
    }

    if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.dummlist = data;
          this.nurselist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.nurselist.length
        }, error => {
        }
      )
    }

  }


  public GetDaysMaster() {
    this.docservice.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.dayslist = data;
      }, error => {
      }
    )
  }

  public getlanguage() {
    this.docservice.GetAdmin_NurseLoginAppointmentReportWorkingDetails_Lable(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }
  public getnurselist() {
    if(this.hospitalclinicid==undefined)
    {
      this.docservice.GetNurseWorkingDetils(this.languageid).subscribe(
        data => {
          debugger
          this.workinglist = data;
  
        }, error => {
        }
      )
    }
    else if(this.hospitalclinicid!=undefined)
    {
      this.docservice.GetNurseWorkingDetils(this.languageid).subscribe(
        data => {
          debugger
          this.dummworkinglist = data;
          this.workinglist=this.dummworkinglist.filter(x=>x.hospitalClinicID==this.hospitalclinicid)
  
        }, error => {
        }
      )
    }
   
  }
}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-midwife-working-dash',
  templateUrl: './midwife-working-dash.component.html',
  styleUrls: ['./midwife-working-dash.component.css']
})
export class MidwifeWorkingDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public workinglist: any;
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public term: any;
  public dayslist: any;
  public daysname: any;
  public dummlist: any;
  public midwifelist: any;
  public count: any;
  public miwifename:any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.miwifename = ''
    this.daysname = ''
    this.getmidwifelist();
    this.getlanguage();
    this.GetDaysMaster();



    if (this.hospitalclinicid == undefined) {
      this.GetMidWivesRegistration();
    }
    if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.dummlist = data;
          this.midwifelist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.midwifelist.length;
        }, error => {
        }
      )
    }
  }


  public GetMidWivesRegistration() {
    this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.midwifelist = data;
        this.dummlist = this.midwifelist
        this.count = this.midwifelist.length;
      }, error => {
      }
    )
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
    this.docservice.GetAdmin_PhysiotherapistLoginsAppointmentsReportworkingDetails_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }
  public getmidwifelist() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetMidWifeWorkingDetails(this.languageid).subscribe(
        data => {
          debugger
          this.workinglist = data;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWifeWorkingDetails(this.languageid).subscribe(
        data => {
          debugger
          this.dummworkinglist = data;
          this.workinglist = this.dummworkinglist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
        }, error => {
        }
      )
    }

  }
}

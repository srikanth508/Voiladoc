import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-physioworking-dash',
  templateUrl: './physioworking-dash.component.html',
  styleUrls: ['./physioworking-dash.component.css']
})
export class PhysioworkingDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;
  public labels: any;
  public workinglist: any;
  public hospitalclinicid: any;
  public dummworkinglist: any;
  public dummlistphysiolist: any;
  public physioist: any;
  public term: any;
  public count: any;
  public dummlist: any;
  public dayslist: any;
  public daysname: any;
  public physioname: any;
  ngOnInit() {
    this.daysname = ''
    this.physioname = ''
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');

    this.getlanguage();
    // this.getphysiolist();

    if (this.hospitalclinicid != undefined) {
      this.docservice.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.dummlistphysiolist = data;
          this.physioist = this.dummlistphysiolist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.physioist.length
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid == undefined) {

      this.docservice.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.physioist = data;
          this.dummlist = this.physioist
          this.count = this.physioist.length
        }, error => {
        }
      )
    }
    this.GetDaysMaster()

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
  public getphysiolist() {
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetPhysiotherapyWorkingDetails(this.languageid).subscribe(
        data => {
          debugger
          this.workinglist = data;
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetPhysiotherapyWorkingDetails(this.languageid).subscribe(
        data => {
          debugger
          this.dummworkinglist = data;
          this.workinglist = this.dummworkinglist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
        }, error => {
        }
      )
    }

  }
  physioid: any;

  public GetPhysioID(even) {

    this.physioid = even.target.value;
    this.docservice.GetPhysiotherapyWorkingDetails(this.languageid).subscribe(
      data => {
        debugger
        this.dummworkinglist = data;
        this.workinglist = this.dummworkinglist.filter(x => x.physiotherapistID == this.physioid)
      }, error => {
      }
    )
  }
}

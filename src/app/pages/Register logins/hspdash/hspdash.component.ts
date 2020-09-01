import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-hspdash',
  templateUrl: './hspdash.component.html',
  styleUrls: ['./hspdash.component.css']
})
export class HspdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public hsopitalloginlist: any;
  public id: any;
  public term: any;
  p: number = 1;
  public labels:any;
  public languageid:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.gethospitalclinicfordash();

    this.getlanguage();
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )  
  }

  public gethospitalclinicfordash() {
    this.docservice.GetHospital_ClinicLoginForDash(this.languageid).subscribe(
      data => {
        debugger
        this.hsopitalloginlist = data;
      }, error => {
      }
    )
  }

  public disablehospital(id) {
    this.docservice.DisableHospital_ClinicLogin(id).subscribe(
      data => {
        
        debugger
        Swal.fire('Disabled', 'Hospital/Clinic has been Disabled');
        this.gethospitalclinicfordash();
      }, error => {
      }
    )
  }
  public enablehospital(hosid) {
    this.docservice.EnableHospital_ClinicLogin(hosid).subscribe(
      data => {
        debugger
        Swal.fire('Enabled', 'Hospital/Clinic has been Enabled');
        this.gethospitalclinicfordash();
      }, error => {
      }
    )
  }
  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }
}

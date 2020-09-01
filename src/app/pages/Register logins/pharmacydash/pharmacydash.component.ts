import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pharmacydash',
  templateUrl: './pharmacydash.component.html',
  styleUrls: ['./pharmacydash.component.css']
})
export class PharmacydashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public pharmacylist: any;
  public term: any;
  p: number = 1;
  public labels:any;
  public languageid:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getpharmacyloginfordash();

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

  
  public getpharmacyloginfordash() {
    this.docservice.GetPharmacyLoginForDash(this.languageid).subscribe(
      data => {
        debugger
        this.pharmacylist = data;
      }, error => {
      }
    )
  }
  public disablepharmacy(id) {
    this.docservice.DisablePharmacyLogin(id).subscribe(
      data => {
        debugger
        Swal.fire('Disabled', 'Pharmacy has been Disabled');
        this.getpharmacyloginfordash();
      }, error => {
      }
    )
  }
  public enablepharmacy(id) {
    this.docservice.EnablePharmacyLogin(id).subscribe(
      data => {
        debugger
        Swal.fire('Enabled', 'Pharmacy has been Enabled');
        this.getpharmacyloginfordash();
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

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public pharmacylist: any;
  public username: any;
  public password: any;
  public pharmacyid: any;
  public pharmacydd={}
  public password1:any;
  public labels:any;
  public languageid:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.docservice.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.pharmacylist = data;
        this.pharmacydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'pharmacyName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
    
    
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel=this.labels[0].select;
      }, error => {
      }
    )  
  }
  SelectLabel
  public GetPharmacyID(item2:any)
  {
    debugger
    this.pharmacyid=item2.id;
  }

  public insertdetails() {
    if( this.pharmacyid==undefined)
    {
      Swal.fire("Please Select Pharmacy");
    }
    else if(this.password!=undefined)  {

      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
        debugger;
        this.password1=1;
      }
    else{
      var entity = {
        'PharmacyID': this.pharmacyid,
        'UserName': this.username,
        'Password': this.password
      }
      this.docservice.InsertPharmacyAdminRegistration(entity).subscribe(data => {
        debugger
        if (data != 0) {
          Swal.fire('Registration Completed', 'Details saved successfully', 'success');
          location.href="#/Pharmacydash"
          this.clear();
          this.password1=0;

        }
      })
    }
  }
}
public clear()
{
  this.username='';
  this.password='';
}
}

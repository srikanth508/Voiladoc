import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital-clinic',
  templateUrl: './hospital-clinic.component.html',
  styleUrls: ['./hospital-clinic.component.css']
})
export class HospitalClinicComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public hospitallist: any;
  public username: any;
  public password: any;
  public hospitalid: any;
  public hospdd={};
  public pp:any;
  public labels:any;
  public languageid:any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
       
        this.hospitallist = data;
        this.hospdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
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
       
        this.labels = data;
        this.SelectLabel=this.labels[0].select;
      }, error => {
      }
    )  
  }
  SelectLabel
  public GetHospitalID(item2:any) {
   
    this.hospitalid = item2.id;
  }
  public insertdetails() {
    if (this.hospitalid == undefined) {
      Swal.fire("Please Select Hospital/Clinic");
    }
    else if(this.password!=undefined)  {

      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
       
        this.pp=1;
     
      }
    else {
      var entity = {
        'Hospital_ClinicID': this.hospitalid,
        'UserName': this.username,
        'Password': this.password
      }
      this.username = '';
      this.password = '';
      this.docservice.InsertHospitalClinicAdminRegistration(entity).subscribe(data => {
       
        if (data != 0) {
          if(this.languageid==1)
          {
            Swal.fire('Registration Completed', 'Details saved successfully', 'success');
            location.href="#/Hspdash"
            this.pp=0;
          }
          else{
            Swal.fire('', 'Mis à jour avec succés', 'success');
            location.href="#/Hspdash"
            this.pp=0;
          }
       
        }
        else{
          Swal.fire('Error', 'Hospital Login Already Exists', 'success');
          location.href="#/Hspdash"
        }
      })
    }
  }


  }
}

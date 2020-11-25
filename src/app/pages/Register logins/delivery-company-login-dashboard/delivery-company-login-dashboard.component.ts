import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-company-login-dashboard',
  templateUrl: './delivery-company-login-dashboard.component.html',
  styleUrls: ['./delivery-company-login-dashboard.component.css']
})
export class DeliveryCompanyLoginDashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public physiologinlist: any;
  public id: any;
  public term: any;
  p: number = 1;
  public labels:any;
  public languageid:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.GetDeliveryCompanyLoginAdmin();
 
    this.getlanguage();
  }

  public getlanguage()
  {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )  
  }
  
  public GetDeliveryCompanyLoginAdmin() {
    this.docservice.GetDeliveryCompanyLoginAdmin(this.languageid).subscribe(
      data => {
       
        this.physiologinlist = data;
      }, error => {
      }
    )
  }

  public DisableDeliveryCompanyLogin(id) {
    this.docservice.DisableDeliveryCompanyLogin(id).subscribe(
      data => {
       
        Swal.fire('Disabled', 'Delivery Company has been Disabled');
        this.GetDeliveryCompanyLoginAdmin();

      }, error => {
      }
    )
  }

  public EnableDeliveryCompanyLogin(id) {
    this.docservice.EnableDeliveryCompanyLogin(id).subscribe(
      data => {
       
        Swal.fire('Enabled', 'Delivery Company has been Enabled');
        this.GetDeliveryCompanyLoginAdmin();

      }, error => {
      }
    )
  }

  public pageChanged(even) {
   
    this.p = even;
  }


  public username: any;
  public password: any;


  public GetDeatsils(details) {
    debugger
    this.id = details.id,
      this.username = details.userName,
      this.password = details.password
  }

public pp:any;

  public insertdetails() {
    if(this.password!=undefined)  {
      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
       
        this.pp=1;
      }
    else {
      var entity = {
        'ID': this.id,
        'UserName': this.username,
        'Password': this.password
      }
      this.username = '';
      this.password = '';
      this.docservice.UpdateDeliveryCompanyLogin(entity).subscribe(data => {
        if (data != 0) {
          if(this.languageid==1)
          {
            Swal.fire('Success', 'Password Updated successfully', 'success');
            this.pp=0;
            this.GetDeliveryCompanyLoginAdmin();
            document.getElementById('close').click();
          }
          else{
            Swal.fire('', 'Mis à jour avec succés', 'success');
            this.pp=0;
            this.GetDeliveryCompanyLoginAdmin();
            document.getElementById('close').click();
          }
      
        }
        else{
          Swal.fire('Success', 'User Name Already Exists', 'success');
          this.pp=0;
          this.GetDeliveryCompanyLoginAdmin();
          document.getElementById('close').click();
        }
      })
    }
  }
}
}

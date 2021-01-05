import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-company-login',
  templateUrl: './delivery-company-login.component.html',
  styleUrls: ['./delivery-company-login.component.css']
})
export class DeliveryCompanyLoginComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public dclist: any;
  public dcid: any;
  public username: any;
  public password: any;
  public diadd={}
  public pp:any;
  public labels:any;
  public languageid:any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.docservice.GetDeliveryCompanyAdminByLanguageID(this.languageid).subscribe(
      data => {
       
        this.dclist = data;

        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'companyName',
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
  public GetdcID(item:any) {
   
    this.dcid = item.id;
  }

  public insertdetails() {
    if (this.dcid == undefined) {
      Swal.fire("Please Select Delivery Company");
    }
    else if(this.password!=undefined)  {

      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
       
        this.pp=1;
      }
    else {
     
      var entity = {
        'DeliveryCompanyID': this.dcid,
        'UserName': this.username,
        'Password': this.password
      }
      this.username = '';
      this.password = '';
      this.docservice.InsertDeliveryCompanyLogin(entity).subscribe(data => {
       
        if (data != 0) {
          Swal.fire('Registration Completed', 'Details saved successfully', 'success');
          this.pp=0;
        
        }
        else{
          Swal.fire('Success', 'Delivery Company Login Already Exists', 'success');
          this.pp=0;
      
        }
      })
    }
  }
}

}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-physiotherapist-login',
  templateUrl: './physiotherapist-login.component.html',
  styleUrls: ['./physiotherapist-login.component.css']
})
export class PhysiotherapistLoginComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public physiolist: any;
  public physioid: any;
  public username: any;
  public password: any;
  public phydd={};
  public pp:any;
  public labels:any;
  public languageid:any;
  public hospitalclinicid:any;
  public dummphysiolist:any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.getlanguage();
    if(this.hospitalclinicid==undefined)
    {
      this.docservice.GetPhysiotherapyRegistringLogins(this.languageid).subscribe(
        data => {
          debugger
          this.physiolist = data;
          this.phydd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true
          };
        }, error => {
        }
      )   
    }
    else if(this.hospitalclinicid!=undefined)
    {
      this.docservice.GetPhysiotherapyRegistringLogins(this.languageid).subscribe(
        data => {
          debugger
          this.dummphysiolist = data;
           this.physiolist=this.dummphysiolist.filter(x=>x.hospitalClinicID==this.hospitalclinicid)

          this.phydd = {
            singleSelection: true,
            idField: 'id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true
          };
        }, error => {
        }
      )   
    }
   
    
 
    
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
  public GetphysioID(item1:any) {
    debugger
    this.physioid = item1.id;
  }

  public insertdetails() {
    if (this.physioid == undefined) {
      Swal.fire("Please Select Hospital/Clinic");
    }
    else if(this.password!=undefined)  {

      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
        debugger;
        this.pp=1;
      }
    else {
      debugger
      var entity = {
        'PhysiotherapistID': this.physioid,
        'UserName': this.username,
        'Password': this.password
      }
      this.username = '';
      this.password = '';
      this.docservice.InsertPhysiotherapistLogin(entity).subscribe(data => {
        debugger
        if (data != 0) {
          Swal.fire('Registration Completed', 'Details saved successfully', 'success');
          location.href="#/PhysiotherapistLoginDashboard"
          this.pp=0;
        }
        else{
          Swal.fire("Physiotherapist Login Already Exists");
          location.href="#/PhysiotherapistLoginDashboard"
        }
      })
    }
  }
}

}

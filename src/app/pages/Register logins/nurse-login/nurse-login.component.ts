import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nurse-login',
  templateUrl: './nurse-login.component.html',
  styleUrls: ['./nurse-login.component.css']
})
export class NurseLoginComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public nurselist: any;
  public nurseid: any;
  public username: any;
  public password: any;
  public nursedd = {};
  public pp: any;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummnurselist: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    if (this.hospitalclinicid == null) {
      this.docservice.GetNurseListForRegisteringLogin(this.languageid).subscribe(
        data => {
         
          this.nurselist = data;
          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true
          };
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseListForRegisteringLogin(this.languageid).subscribe(
        data => {
         
          this.dummnurselist = data;
          this.nurselist=this.dummnurselist.filter(x=>x.hospitalClinicID==this.hospitalclinicid)

          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
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
  SelectLabel
  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
        this.SelectLabel=this.labels[0].select;
      }, error => {
      }
    )
  }

  public GetnurseID(item1: any) {
   
    this.nurseid = item1.id;
  }

  public insertdetails() {
    if (this.nurseid == undefined) {
      Swal.fire("Please Select Hospital/Clinic");
    }
    else if (this.password != undefined) {

      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
       
        this.pp = 1;
      }
      else {
       
        var entity = {
          'NurseID': this.nurseid,
          'UserName': this.username,
          'Password': this.password
        }
        this.username = '';
        this.password = '';
        this.docservice.InsertNurseLogin(entity).subscribe(data => {
         
          if (data != 0) {
            if(this.languageid==1)
            {
              Swal.fire('Registration Completed', 'Details saved successfully', 'success');
              location.href="#/NurseLoginDashboard"
            }
            else{
              Swal.fire('', 'Mis à jour avec succés', 'success');
              location.href="#/NurseLoginDashboard"
            }
        
          }
          else {
            Swal.fire("Nurse Login Already Exists");
            location.href="#/NurseLoginDashboard"
          }
        })
      }
    }
  }
}

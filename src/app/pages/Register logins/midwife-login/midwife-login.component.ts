import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-midwife-login',
  templateUrl: './midwife-login.component.html',
  styleUrls: ['./midwife-login.component.css']
})
export class MidwifeLoginComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public midwifelist: any;
  public midewifeid: any;
  public username: any;
  public password: any;
  public middd = {};
  public pp: any;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummmidwifelist: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.getlanguage();
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetMidWivesRegistratingLogins(this.languageid).subscribe(
        data => {
         
          this.midwifelist = data;

          this.middd = {
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
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWivesRegistratingLogins(this.languageid).subscribe(
        data => {
         
          this.dummmidwifelist = data;
          this.midwifelist = this.dummmidwifelist.filter(x => x.hospitalClinicID == this.hospitalclinicid)

          this.middd = {
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
  SelectLabel
  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )
  }


  public Getmidewifeid(item: any) {
   
    this.midewifeid = item.id;
  }

  public insertdetails() {
    if (this.midewifeid == undefined) {
      Swal.fire("Please Select Mid Wife");
    }
    else if (this.password != undefined) {

      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
       
        this.pp = 1;
      }
      else {
       
        var entity = {
          'MidWiveID': this.midewifeid,
          'UserName': this.username,
          'Password': this.password
        }
        this.username = '';
        this.password = '';
        this.docservice.InsertMidWivesLogin(entity).subscribe(data => {
         
          if (data != 0) {
            if(this.languageid==1)
            {
              Swal.fire('Registration Completed', 'Details saved successfully', 'success');
              this.pp = 0;
              location.href = "#/MidwifeLoginDashboard"
            }
            else{
              Swal.fire('', 'Mis à jour avec succés', 'success');
              this.pp = 0;
              location.href = "#/MidwifeLoginDashboard"
            }
        
          }
          else {
            Swal.fire("Mid Wife Login Already Exists");
            location.href = "#/MidwifeLoginDashboard"
          }
        })
      }
    }
  }
}

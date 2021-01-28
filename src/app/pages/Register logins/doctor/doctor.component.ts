import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public doctorlist: any;
  public doctorid: any;
  public username: any;
  public password: any;
  public docdd = {};
  public pp: any;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummdoctorlist: any;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetDoctorRegistratingLogins(this.languageid).subscribe(
        data => {
         
          this.doctorlist = data;
          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
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
      this.docservice.GetDoctorRegistratingLogins(this.languageid).subscribe(
        data => {
         
          this.dummdoctorlist = data;
          this.doctorlist = this.dummdoctorlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)

          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
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
  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )
  }
  SelectLabel
  public GetDoctorID(item2: any) {
   
    this.doctorid = item2.id;

  }
  public insertdetails() {
    if (this.doctorid == undefined) {
      Swal.fire("please select Doctor");
    }
    else if (this.password != undefined) {

      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
       
        this.pp = 1;
      }
      else {
        var entity = {
          'DoctorID': this.doctorid,
          'UserName': this.username,
          'Password': this.password
        }
        this.username = '';
        this.password = '';
        this.docservice.InsertDoctorLogin(entity).subscribe(data => {
         
          if (data != 0) {
            // Swal.fire('Added Successfully.');
            if(this.languageid==1)
            {
              Swal.fire('Completed', 'Doctor saved successfully', 'success');
              location.href = "#/Doctordash"
              this.pp = 0;
            }
            else{
              Swal.fire('', 'Mis à jour avec succés', 'success');
              location.href = "#/Doctordash"
              this.pp = 0;
            }
          
          }
          else {
            Swal.fire("Doctor Login Already Exists");
            location.href = "#/Doctordash"
          }
        })
      }
    }

  }


}

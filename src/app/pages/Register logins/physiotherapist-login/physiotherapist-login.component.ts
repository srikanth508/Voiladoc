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
  public phydd = {};
  public pp: any;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummphysiolist: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.getlanguage();
    if (this.hospitalclinicid == undefined) {
      this.docservice.GetPhysiotherapyRegistringLogins(this.languageid).subscribe(
        data => {

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
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetPhysiotherapyRegistringLogins(this.languageid).subscribe(
        data => {

          this.dummphysiolist = data;
          this.physiolist = this.dummphysiolist.filter(x => x.hospitalClinicID == this.hospitalclinicid)

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
  public GetphysioID(item1: any) {

    this.physioid = item1.id;
  }

  public insertdetails() {
    this.password = Math.random().toString(36).slice(-8);
    if (this.physioid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Hospital/Clinic");
      }
      else {
        Swal.fire("Sélectionner un physiothérapeute");
      }

    }
    else if (this.password != undefined) {

      // var valpassword = this.docservice.strongpassword(this.password);
      // if (valpassword == false) {

      //   this.pp = 1;
      // }
      // else {

        var entity = {
          'PhysiotherapistID': this.physioid,
          'UserName': this.username,
          'Password': this.password
        }
        // this.username = '';
        // this.password = '';
        this.docservice.InsertPhysiotherapistLogin(entity).subscribe(data => {

          if (data != 0) {
            if (this.languageid == 1) {
              this.GetPhysiotherapistLoginAdmin()
              Swal.fire('Registration Completed', 'Details saved successfully', 'success');
              location.href = "#/PhysiotherapistLoginDashboard"
              this.pp = 0;
            }
            else {
              this.GetPhysiotherapistLoginAdmin()
              Swal.fire('', 'Mis à jour avec succés', 'success');
              location.href = "#/PhysiotherapistLoginDashboard"
              this.pp = 0;
            }
          }
          else {
            if (this.languageid == 1) {
              Swal.fire("Physiotherapist Login Already Exists");
              location.href = "#/PhysiotherapistLoginDashboard"
            }
            else {
              Swal.fire("Cet identifiant existe déjà");
              location.href = "#/PhysiotherapistLoginDashboard"
            }
          }
        })
      }
    // }
  }



  public physiologinlist: any;
  public physioname: any;

  public GetPhysiotherapistLoginAdmin() {
    debugger
    this.docservice.GetPhysiotherapistLoginAdmin(this.languageid).subscribe(
      data => {
        debugger
        this.physiologinlist = data;
        var list = this.physiologinlist.filter(x => x.physiotherapistID == this.physioid)
        this.physioname = list[0].name,
          this.pinno = list[0].pinno,
          this.email = list[0].email

        this.sendmail()
      }, error => {
      }
    )
  }



  pinno: any;
  emailattchementurl = [];
  public email: any;


  public sendmail() {
    debugger
    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.physioname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }

}

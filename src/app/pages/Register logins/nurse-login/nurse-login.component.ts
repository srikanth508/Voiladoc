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
  public search: any;

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
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };
        }, error => {
        }
      )
    }
    else if (this.hospitalclinicid != undefined) {
      this.docservice.GetNurseListForRegisteringLogin(this.languageid).subscribe(
        data => {

          this.dummnurselist = data;
          this.nurselist = this.dummnurselist.filter(x => x.hospitalClinicID == this.hospitalclinicid)

          this.nursedd = {
            singleSelection: true,
            idField: 'id',
            textField: 'nurseName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
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
        this.search = this.labels[0].search;
      }, error => {
      }
    )
  }

  public GetnurseID(item1: any) {

    this.nurseid = item1.id;
  }

  public insertdetails() {
    this.password = Math.random().toString(36).slice(-8);

    if (this.nurseid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Hospital/Clinic");
      }
      else {
        Swal.fire("Sélectionner une infirmière");
      }

    }
    else if (this.password != undefined) {

      // var valpassword = this.docservice.strongpassword(this.password);
      // if (valpassword == false) {

      //   this.pp = 1;
      // }
      // else {

      var entity = {
        'NurseID': this.nurseid,
        'UserName': this.username,
        'Password': this.password
      }
      // this.username = '';
      // this.password = '';
      this.docservice.InsertNurseLogin(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            this.GetNurseLoginAdmin()
            Swal.fire('Registration Completed', 'Details saved successfully', 'success');
            location.href = "#/NurseLoginDashboard"
          }
          else {
            this.GetNurseLoginAdmin()
            Swal.fire('', 'Mis à jour avec succés', 'success');
            location.href = "#/NurseLoginDashboard"
          }

        }
        else {
          if (this.languageid == 1) {
            Swal.fire("Nurse Login Already Exists");
            location.href = "#/NurseLoginDashboard"
          }
          else {
            Swal.fire("La connexion infirmière existe déjà");
            location.href = "#/NurseLoginDashboard"
          }

        }
      })
      // }
    }
  }

  public nurseloginlist: any;
  public nursename: any;



  public GetNurseLoginAdmin() {

    this.docservice.GetNurseLoginAdmin(this.languageid).subscribe(
      data => {

        this.nurseloginlist = data;
        var list = this.nurseloginlist.filter(x => x.nurseID == this.nurseid)
        this.nursename = list[0].nurseName,
          this.email = list[0].email,
          this.pinno = list[0].pinno
        this.sendmail()
      }, error => {
      }
    )

  }



  pinno: any;
  emailattchementurl = [];
  public email: any;


  public sendmail() {
    
    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.nursename + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }

}

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
  public search: any;

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
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
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


  public Getmidewifeid(item: any) {

    this.midewifeid = item.id;
  }

  public insertdetails() {
    this.password = Math.random().toString(36).slice(-8);

    if (this.midewifeid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Mid Wife");
      }
      else {
        Swal.fire("Sélectionner une sage-femme");
      }

    }
    else if (this.password != undefined) {

      // var valpassword = this.docservice.strongpassword(this.password);
      // if (valpassword == false) {

      //   this.pp = 1;
      // }
      // else {

      var entity = {
        'MidWiveID': this.midewifeid,
        'UserName': this.username,
        'Password': this.password
      }
      // this.username = '';
      // this.password = '';
      this.docservice.InsertMidWivesLogin(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            this.GetMidWivesLoginAdmin();
            Swal.fire('Registration Completed', 'Details saved successfully', 'success');
            this.pp = 0;
            location.href = "#/MidwifeLoginDashboard"
          }
          else {
            this.GetMidWivesLoginAdmin();
            Swal.fire('', 'Mis à jour avec succés', 'success');
            this.pp = 0;
            location.href = "#/MidwifeLoginDashboard"
          }
        }
        else {
          if (this.languageid == 1) {
            Swal.fire("Mid Wife Login Already Exists");
            location.href = "#/MidwifeLoginDashboard"
          }
          else {
            Swal.fire("Cet identifiant existe déjà");
            location.href = "#/MidwifeLoginDashboard"
          }
        }
      })
    }
    // }
  }

  public midwiveslist: any;
  public midwifename: any;


  public GetMidWivesLoginAdmin() {
    debugger
    this.docservice.GetMidWivesLoginAdmin(this.languageid).subscribe(
      data => {
        debugger
        this.midwiveslist = data;
        var list = this.midwiveslist.filter(x => x.midWiveID == this.midewifeid)
        this.midwifename = list[0].name,
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
    debugger
    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.midwifename + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }
}

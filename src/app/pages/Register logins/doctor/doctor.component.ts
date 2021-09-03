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
  public search: any;
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
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
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
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
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
        this.search=this.labels[0].search
      }, error => {
      }
    )
  }
  SelectLabel
  public GetDoctorID(item2: any) {

    this.doctorid = item2.id;


  }








  public insertdetails() {

    this.password = Math.random().toString(36).slice(-8);

    if (this.doctorid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("please select Doctor");
      }
      else {
        Swal.fire("Sélectionner un médecin");
      }
    }
    else if (this.password != undefined) {

      // this.password = this.docservice.strongpassword(this.password);
      // if (valpassword == false) {

      //   this.pp = 1;
      // }
      // else {

      var entity = {
        'DoctorID': this.doctorid,
        'UserName': this.username,
        'Password': this.password
      }
      // this.username = '';
      // this.password = '';
      this.docservice.InsertDoctorLogin(entity).subscribe(data => {

        if (data != 0) {
          // Swal.fire('Added Successfully.');
          if (this.languageid == 1) {
            this.getdoctorloginfordash()
            Swal.fire('Completed', 'Doctor saved successfully', 'success');
            location.href = "#/Doctordash"
            this.pp = 0;
            // this.sendmail();
          }
          else {
            this.getdoctorloginfordash()
            Swal.fire('', 'Mis à jour avec succés', 'success');
            location.href = "#/Doctordash"
            this.pp = 0;

          }

        }
        else {
          if (this.languageid == 1) {
            Swal.fire("Doctor Login Already Exists");
            location.href = "#/Doctordash"
          }
          else {
            Swal.fire("La connexion au médecin existe déjà");
            location.href = "#/Doctordash"
          }

        }
      })
    }
    // }

  }

  public doctorloginlist: any;

  public getdoctorloginfordash() {

    this.docservice.GetDoctorLoginForDash(this.languageid).subscribe(
      data => {

        this.doctorloginlist = data;
        var list = this.doctorloginlist.filter(x => x.doctorID == this.doctorid)
        this.pinno = list[0].pinno,
          this.email = list[0].emailID,
          this.doctorname = list[0].doctorName
        this.sendmail();
      }, error => {
      }
    )

  }




  pinno: any;
  emailattchementurl = [];
  public email: any;
  public doctorname: any;

  public sendmail() {

    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.doctorname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }


}

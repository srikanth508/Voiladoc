import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css']
})
export class PharmacyComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public pharmacylist: any;
  public username: any;
  public password: any;
  public pharmacyid: any;
  public pharmacydd = {}
  public password1: any;
  public labels: any;
  public languageid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.docservice.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.pharmacylist = data;
        this.pharmacydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'pharmacyName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )


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
  public GetPharmacyID(item2: any) {

    this.pharmacyid = item2.id;
  }

  public insertdetails() {
    this.password = Math.random().toString(36).slice(-8);
    if (this.pharmacyid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Pharmacy");
      }
      else {
        Swal.fire("Sélectionner une pharmacie");
      }
    }
    else if (this.password != undefined) {
    
      // var valpassword = this.docservice.strongpassword(this.password);
      // if (valpassword == false) {

      //   this.password1 = 1;
      // }
      // else {
        var entity = {
          'PharmacyID': this.pharmacyid,
          'UserName': this.username,
          'Password': this.password
        }
        this.docservice.InsertPharmacyAdminRegistration(entity).subscribe(data => {

          if (data != 0) {
            if (this.languageid == 1) {
              this.getpharmacyloginfordash();
              Swal.fire('Registration Completed', 'Details saved successfully', 'success');
              location.href = "#/Pharmacydash"
              this.clear();
              this.password1 = 0;
            }
            else {
              this.getpharmacyloginfordash();
              Swal.fire('', 'Mis à jour avec succés', 'success');
              location.href = "#/Pharmacydash"
              this.clear();
              this.password1 = 0;
            }


          }
          else {
            if (this.languageid == 1) {
              Swal.fire('Error', 'Pharmacy Login Already Exists', 'success');
              location.href = "#/Pharmacydash"
              this.clear();
              this.password1 = 0;
            }
            else {
              Swal.fire('Erreur Cet identifiant existe déjà');
              location.href = "#/Pharmacydash"
              this.clear();
              this.password1 = 0;
            }

          }
        })
      }
    // }
  }


  public getpharmacyloginfordash() {
    this.docservice.GetPharmacyLoginForDash(this.languageid).subscribe(
      data => {
        this.pharmacylist = data;
        var list = this.pharmacylist.filter(x => x.pharmacyID == this.pharmacyid)
        this.pinno = list[0].pinno,
          this.email = list[0].email,
          this.pharmacyname = list[0].pharmacyName
        this.sendmail()
      }, error => {
      }
    )
  }

  pinno: any;
  emailattchementurl = [];
  public email: any;
  public pharmacyname: any;


  public sendmail() {
    
    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.pharmacyname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }






  public clear() {
    this.username = '';
    this.password = '';
  }
}

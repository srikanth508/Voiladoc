import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital-clinic',
  templateUrl: './hospital-clinic.component.html',
  styleUrls: ['./hospital-clinic.component.css']
})
export class HospitalClinicComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public hospitallist: any;
  public username: any;
  public password: any;
  public hospitalid: any;
  public hospdd = {};
  public pp: any;
  public labels: any;
  public languageid: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {

        this.hospitallist = data;
        this.hospdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
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
  public GetHospitalID(item2: any) {

    this.hospitalid = item2.id;
  }
  public insertdetails() {
    
    this.password = Math.random().toString(36).slice(-8);

    if (this.hospitalid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Hospital/Clinic");
      }
      else {
        Swal.fire("Selectionner un hôpital / clinique");
      }

    }
    else if (this.password != undefined) {

      // var valpassword = this.docservice.strongpassword(this.password);
      // if (valpassword == false) {

      //   this.pp = 1;

      // }
      // else {
        var entity = {
          'Hospital_ClinicID': this.hospitalid,
          'UserName': this.username,
          'Password': this.password
        }
        // this.username = '';
        // this.password = '';
        this.docservice.InsertHospitalClinicAdminRegistration(entity).subscribe(data => {

          if (data != 0) {
            
            if (this.languageid == 1) {
              this.gethospitalclinicfordash()
              Swal.fire('Registration Completed', 'Details saved successfully', 'success');
              location.href = "#/Hspdash"
              this.pp = 0;
            }
            else {
              this.gethospitalclinicfordash()
              Swal.fire('', 'Mis à jour avec succés', 'success');
              location.href = "#/Hspdash"
              this.pp = 0;
            }
          }
          else {
            if (this.languageid == 1) {
              Swal.fire('Error', 'Hospital Login Already Exists', 'success');
              location.href = "#/Hspdash"
            }
            else {
              Swal.fire('Erreur', "La connexion à l'hôpital existe déjà", 'success');
              location.href = "#/Hspdash"
            }

          }
        })
      // }
    }
  }


  public hsopitalloginlist: any;


  public gethospitalclinicfordash() {
    this.docservice.GetHospital_ClinicLoginForDash(this.languageid).subscribe(
      data => {

        this.hsopitalloginlist = data;
        var list = this.hsopitalloginlist.filter(x => x.hospital_ClinicID == this.hospitalid)
        this.pinno = list[0].pinno,
          this.email = list[0].emailID,
          this.hospitalname = list[0].hospital_ClinicName
        this.sendmail();
      }, error => {
      }
    )
  }


  pinno: any;
  emailattchementurl = [];
  public email: any;
  public hospitalname: any;


  public sendmail() {
    
    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.hospitalname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }
}

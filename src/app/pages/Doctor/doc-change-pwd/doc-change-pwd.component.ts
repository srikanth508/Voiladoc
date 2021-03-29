import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doc-change-pwd',
  templateUrl: './doc-change-pwd.component.html',
  styleUrls: ['./doc-change-pwd.component.css']
})
export class DocChangePwdComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public doctorloginlist: any;
  public docid: any;
  public id: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public hospitalclinicid: any;
  public dummdcotorlogins: any;
  public count: any;
  public pinno: any;
  public doctorid: any;
  public dummdocloginlist:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.doctorid = localStorage.getItem('userid');
    this.pinno = localStorage.getItem('Pinno');
    this.getdoctorloginfordash()
    this.getlanguage()
  }


  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  public getdoctorloginfordash() {
      this.docservice.GetDoctorLoginForDash(this.languageid).subscribe(
        data => {

          this.dummdocloginlist=data
          this.doctorloginlist =this.dummdocloginlist.filter(x=>x.doctorID==this.doctorid)

        
        }, error => {
        }
      )
    
  }





  password: any;
  pp: any;
  username: any;
  mypinno: any;


  public GetDeatsils(details) {

    this.id = details.id,
      this.username = details.userName,
      this.password = details.password,
      this.mypinno = details.pinno

    this.Showpassword = 0;
  }

  public Showpassword: any;




  public insertdetails() {

    if (this.password != undefined) {
      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
        this.pp = 1;
      }
      else {
        var entity = {
          'ID': this.id,
          'UserName': this.username,
          'Password': this.password
        }

        this.username = '';
        this.password = '';
        this.docservice.UpdateDoctorLogins(entity).subscribe(data => {
          if (data != 0) {
            // Swal.fire('Added Successfully.');
            if (this.languageid == 1) {
              Swal.fire('Completed', 'Password updated successfully', 'success');
              this.pp = 0;
              this.getdoctorloginfordash()
              document.getElementById('close').click();
            }
            else {
              Swal.fire('', 'Mis à jour avec succés', 'success');
              this.pp = 0;
              this.getdoctorloginfordash()
              document.getElementById('close').click();
            }

          }
          else {
            Swal.fire("user name already exists");
            this.getdoctorloginfordash()
            document.getElementById('close').click();
          }
        })
      }
    }
  }

  public Enteredpinno: any;

  public CheckPasswordvalidate() {
    debugger
    if (this.Enteredpinno == "") {
      debugger
      Swal.fire('Please Enter Your Pin No')

    }
    else {
      debugger
      if (this.pinno == this.Enteredpinno) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
      }
      else {
        debugger
        Swal.fire('You Entered Pin no is invalid')
        this.Enteredpinno = ""
      }
    }
  }

  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
  }
}

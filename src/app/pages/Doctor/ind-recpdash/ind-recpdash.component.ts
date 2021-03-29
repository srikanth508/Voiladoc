import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ind-recpdash',
  templateUrl: './ind-recpdash.component.html',
  styleUrls: ['./ind-recpdash.component.css']
})
export class IndRecpdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public receptionistlogins: any;
  public hospitalclinicid: any;
  public term: any;
  languageID
  labels: any;
  count: any;
  pinno: any;
  Showpassword: any;
  doctorid: any;
  recpid: any;
  dummrecplogins: any;
  public notshow:any;
  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');
    this.recpid = localStorage.getItem('recpid');
    if(this.recpid!=undefined)
    {
      this.notshow=0;
    }
    else
    {
      this.notshow=1;
    }
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.pinno = localStorage.getItem('Pinno');
    this.languageID = localStorage.getItem('LanguageID');
    this.getreceptionlogin();
    this.getlanguage()
  }
  public getreceptionlogin() {

    if (this.recpid == undefined) {
      this.docservice.GetIndependentDoctors_Receptionist(this.languageID).subscribe(
        data => {
          this.dummrecplogins = data;
          this.receptionistlogins = this.dummrecplogins.filter(x => x.doctorID == this.doctorid)
          this.count = this.receptionistlogins.length;
        }, error => {
        }
      )
    }
    else {
      this.docservice.GetIndependentDoctors_Receptionist(this.languageID).subscribe(
        data => {
          this.dummrecplogins = data;
          this.receptionistlogins = this.dummrecplogins.filter(x => x.id == this.recpid)
          this.count = this.receptionistlogins.length;
        }, error => {
        }
      )
    }

  }

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageID).subscribe(
      data => {

        this.labels = data;

      }, error => {
      }
    )
  }


  public id: any;
  public username: any;
  public password: any;
  public mypinno: any;
  name: any;
  address: any;
  mobileno: any;
  email: any;


  public GetDeatsils(details) {
    debugger
    this.id = details.id,
      this.username = details.userName,
      this.password = details.password,
      this.mypinno = details.pinno,
      this.name = details.name,
      this.mobileno = details.mobileNo,
      this.email = details.email,
      this.address = details.address,
      this.Showpassword = 0;
  }



  public updatedetails() {
    debugger
    var entity = {
      'ID': this.id,
      'DoctorID': this.doctorid,
      'Name': this.name,
      'MobileNo': this.mobileno,
      'Email': this.email,
      'Address': this.address,
      'UserName': this.username,
      'Password': this.password
    }
    this.docservice.UpdateIndependentDoctors_Receptionist(entity).subscribe(data => {

      if (this.languageID == 1) {
        Swal.fire('Updated Successfully');
        this.getreceptionlogin();
        document.getElementById('close').click();
      }
      else {
        Swal.fire('', 'Mis à jour avec succés');
        this.getreceptionlogin();
        document.getElementById('close').click();
      }


      // else {
      //   Swal.fire('User Name Already Exists');
      //   this.getreceptionlogin();
      //   document.getElementById('close').click();
      // }

    })
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
}

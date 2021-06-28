import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-receptionist-login-dashboard',
  templateUrl: './receptionist-login-dashboard.component.html',
  styleUrls: ['./receptionist-login-dashboard.component.css']
})
export class ReceptionistLoginDashboardComponent implements OnInit {
  languageid: any;
  labels: any;
  receptionistloginlist: any;
  term: any;
  count: any;
  labels1:any;
  constructor(public docservice: HelloDoctorService) { }

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.pinno = localStorage.getItem('Pinno');
    this.currentpwd = localStorage.getItem('Password');
    this.GetLables();
    this.GetReceptionistlogin();
    this.getlanguage()
  }

  public GetLables() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );
  }

  public GetReceptionistlogin() {

    this.docservice.GetDiagnosticReceptionistLogin(localStorage.getItem('diagnosticid')).subscribe(data => {

      this.receptionistloginlist = data;
      this.count = this.receptionistloginlist.length;
    })
  }
  // public Delete(id) {
  //   
  //   this.docservice.DeleteDiagnosticReceptionistLogin(id).subscribe(data => {
  //     
  //       if (data != undefined) {
  //           this.GetReceptionistlogin();
  //           Swal.fire("Deleted Successfully");
  //       }
  //   })
  // }


  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )
  }






  public Delete(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteDiagnosticReceptionistLogin(id).subscribe(res => {
            let test = res;
            this.GetReceptionistlogin();
          })
          Swal.fire(
            'Deleted!',
            'Deleted Successfully".',
            'success'
          )
        }
        else {
          this.GetReceptionistlogin();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteDiagnosticReceptionistLogin(id).subscribe(res => {
            let test = res;
            this.GetReceptionistlogin();
          })
          Swal.fire(
            'Supprimé!',
            'Supprimé avec Succès ',
            'success'
          )
        }
        else {
          this.GetReceptionistlogin();
        }
      })
    }
  }



  public password: any;
  public mypinno: any;
  public Showpassword: any;
  public pinno: any;
  oldpassword: any;
  receptionistlist:any;
  name:any;
  phoneno:any;
  email:any;
  address:any;
  username:any;
  id:any;


  public getpassword(details) {
    
    this.oldpassword = details.password,
      this.mypinno = details.pinno,
      this.id=details.id

    this.Showpassword = 0;

    this.docservice.GetDiagnosticReceptionistLogin(localStorage.getItem('diagnosticid')).subscribe(data => {
      this.receptionistlist = data;
      var list = this.receptionistlist.filter(x => x.id == this.id);
      this.name = list[0].name,
          this.phoneno = list[0].phoneNo,
          this.email = list[0].email,
          this.address = list[0].address,
          this.username = list[0].userName
          // this.password = list[0].password
  })
  }



  public Enteredpinno: any;
  public entercurrentpwd:any;
  public currentpwd:any;


  public CheckPasswordvalidate() {
    
    if (this.Enteredpinno == "" || this.entercurrentpwd == "") {
      
      if (this.languageid == 1) {
        Swal.fire('Please Enter Your Pin No && Current password')
        this.entercurrentpwd = "";
        this.Enteredpinno = "";
      }
      else {
        Swal.fire('Veuillez entrer votre NIP && mot de passe actuel')
        this.entercurrentpwd = "";
        this.Enteredpinno = "";
      }


    }
    else {
      
      if (this.pinno == this.Enteredpinno && this.currentpwd == this.entercurrentpwd) {
        this.Showpassword = 1;
        this.Enteredpinno = ""
        this.entercurrentpwd = "";
      }
      else {
        
        if(this.languageid==1)
        {
          Swal.fire('Please enter valid Pinno and valid password')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }
        else
        {
          Swal.fire('Veuillez saisir un Pinno valide et un mot de passe valide')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }
      
      }
    }
  }





  public UpdateDetailes() {
    
    var entity = {
        ID: this.id,
        DiagnosticID: localStorage.getItem('diagnosticid'),
        Name: this.name,
        PhoneNo: this.phoneno,
        EmailID: this.email,
        Address: this.address,
        UserName: this.username,
        Password: this.password
    }
    this.docservice.UpdateDiagnosticReceptionistLogin(entity).subscribe(res => {
        if (this.languageid == 1) {
      
            
            Swal.fire('Success', 'Updated successfully')
            // location.href = "#/ReceptionistLoginDashboard"
            this.GetReceptionistlogin()
        }
        else if (this.languageid == 6) {
          this.GetReceptionistlogin()
            Swal.fire('Mis à jour avec Succés')
            // location.href = "#/ReceptionistLoginDashboard"
        }
    })
  }
}

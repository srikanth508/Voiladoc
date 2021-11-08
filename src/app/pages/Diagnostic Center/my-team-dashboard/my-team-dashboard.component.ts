import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-my-team-dashboard',
  templateUrl: './my-team-dashboard.component.html',
  styleUrls: ['./my-team-dashboard.component.css']
})
export class MyTeamDashboardComponent implements OnInit {

  languageid: any;
  labels: any;
  myteamlist: any;
  term: any;
  public count: any;
  labels1: any;
  currentpwd: any;
  pinno: any;
  phoneno: any;
  address: any;
  email: any;
  username: any;
  password: any;
  constructor(public docservice: HelloDoctorService) { }

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.currentpwd = localStorage.getItem('Password');
    this.pinno = localStorage.getItem('Pinno');
    this.currentpwd = localStorage.getItem('Password');
    this.GetLables();
    this.GetMyTeam();
    this.getlanguage()
  }

  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      }, error => {
      }
    )
  }

  public GetLables() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );
  }

  public GetMyTeam() {
    this.docservice.GetMyTeam(localStorage.getItem('diagnosticid')).subscribe(data => {
      this.myteamlist = data;
      this.count = this.myteamlist.length
    })
  }

  // public Delete(id) {
  //     this.docservice.DeleteMyTeam(id).subscribe(data => {
  //         if (data != undefined) {
  //             this.GetMyTeam();
  //             Swal.fire("Deleted Successfully");
  //         }
  //     })
  // }
  oldpassword: any;
  mypinno: any;
  id: any;
  Showpassword: any;
  name: any;



  public getpassword(details) {
    
    this.oldpassword = details.password,
      this.mypinno = details.pinno,
      this.id = details.id

    this.docservice.GetMyTeam(localStorage.getItem('diagnosticid')).subscribe(data => {
      this.myteamlist = data;
      var list = this.myteamlist.filter(x => x.id == this.id);
      this.name = list[0].name,
        this.phoneno = list[0].phoneNo,
        this.email = list[0].emailID,
        this.address = list[0].address,
        this.username = list[0].userName
        // this.password = list[0].password
    })
    this.Showpassword = 0;


  }




  public Enteredpinno: any;
  public entercurrentpwd: any;



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
        
        if (this.languageid == 1) {
          Swal.fire('Please enter valid Pinno and valid password')
          this.Enteredpinno = ""
          this.currentpwd = ""
        }
        else {
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
    this.docservice.UpdateMyTeam(entity).subscribe(res => {
        if (this.languageid == 1) {
            Swal.fire('Success', 'Updated Successfully')
            document.getElementById('close').click();
            this.GetMyTeam()
            // location.href = "#/MyTeamDashboard"
        }
        else if (this.languageid == 6) {
            Swal.fire('Mis à jour avec Succés')
            document.getElementById('close').click();
            this.GetMyTeam()
            // location.href = "#/MyTeamDashboard"
        }
    })
}


  public Delete(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Deactivate This!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteMyTeam(id,1).subscribe(res => {
            let test = res;
            this.GetMyTeam();
          })
          Swal.fire(
            'Deleted!',
            'Deleted Successfully".',
            'success'
          )
        }
        else {
          this.GetMyTeam();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
         text: "Désactiver",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui ',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteMyTeam(id,1).subscribe(res => {
            let test = res;
            this.GetMyTeam();
          })
          Swal.fire(
            'Supprimé!',
            'Supprimé avec succès ',
            'success'
          )
        }
        else {
          this.GetMyTeam();
        }
      })
    }

  }





  public Enable(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Activer This!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteMyTeam(id,2).subscribe(res => {
            let test = res;
            this.GetMyTeam();
          })
          Swal.fire(
            'Deleted!',
            'Deleted Successfully".',
            'success'
          )
        }
        else {
          this.GetMyTeam();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
         text: "Activer",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui ',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteMyTeam(id,2).subscribe(res => {
            let test = res;
            this.GetMyTeam();
          })
          Swal.fire(
            'Supprimé!',
            'Supprimé avec succès ',
            'success'
          )
        }
        else {
          this.GetMyTeam();
        }
      })
    }

  }
}

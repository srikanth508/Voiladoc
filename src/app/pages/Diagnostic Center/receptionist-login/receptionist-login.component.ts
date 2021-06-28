import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-receptionist-login',
  templateUrl: './receptionist-login.component.html',
  styleUrls: ['./receptionist-login.component.css']
})
export class ReceptionistLoginComponent implements OnInit {
  languageid: any;
    labels: any;
    id: any;
    showbit: any;
    name: any;
    phoneno: any;
    email: any;
    address: any;
    username: any;
    password: any;
    receptionistlist: any;
    label:any;
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
        this.id = params['id'];
        if (this.id == undefined) {
            this.showbit = 0;
        }
        else if (this.id != undefined) {
            this.showbit = 1;
            this.docservice.GetDiagnosticReceptionistLogin(localStorage.getItem('diagnosticid')).subscribe(data => {
                this.receptionistlist = data;
                var list = this.receptionistlist.filter(x => x.id == this.id);
                this.name = list[0].name,
                    this.phoneno = list[0].phoneNo,
                    this.email = list[0].email,
                    this.address = list[0].address,
                    this.username = list[0].userName,
                    this.password = list[0].password
            })
        }
    }
    )
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
        data => {

            this.labels = data;
        },
        error => { }
    );
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
        data => {

            this.label = data;
        }, error => {
        }
    )
  }

  public InsertDetailes() {
    this.password = Math.random().toString(36).slice(-8);
   
    var entity = {
        DiagnosticID: localStorage.getItem('diagnosticid'),
        Name: this.name,
        PhoneNo: this.phoneno,
        EmailID: this.email,
        Address: this.address,
        UserName: this.username,
        Password: this.password
    }
    this.docservice.InsertDiagnosticReceptionistLogin(entity).subscribe(res => {
        
        if (this.languageid == 1) {
            this.pinno=res;
            this.sendmail()
            Swal.fire('Success', 'Added Successfully')
            location.href = "#/ReceptionistLoginDashboard"
        }
        else if (this.languageid == 6) {
            this.pinno=res;
            this.sendmail()
            Swal.fire('Mis à jour avec Succés');
            location.href = "#/ReceptionistLoginDashboard"
        }
    })
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
            location.href = "#/ReceptionistLoginDashboard"
        }
        else if (this.languageid == 6) {
       
            Swal.fire('Mis à jour avec Succés')
            location.href = "#/ReceptionistLoginDashboard"
        }
    })
  }


  pinno: any;
  emailattchementurl = [];
  public doctorname: any;

  public sendmail() {
    
    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.name + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {
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
  myteamlist: any;
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
            this.docservice.GetMyTeam(localStorage.getItem('diagnosticid')).subscribe(data => {
                this.myteamlist = data;
                var list = this.myteamlist.filter(x => x.id == this.id);
                this.name = list[0].name,
                    this.phoneno = list[0].phoneNo,
                    this.email = list[0].emailID,
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
  }



  public InsertDetailes() {
    var entity = {
        DiagnosticID: localStorage.getItem('diagnosticid'),
        Name: this.name,
        PhoneNo: this.phoneno,
        EmailID: this.email,
        Address: this.address,
        UserName: this.username,
        LanguageID:this.languageid,
        Password: this.password
    }
    this.docservice.InsertMyTeam(entity).subscribe(res => {
        if (this.languageid == 1) {
            Swal.fire('Success', 'Added successfully')
            location.href = "#/MyTeamDashboard"
        }
        else if (this.languageid == 6) {
            Swal.fire('Mis à jour avec Succés');
            location.href = "#/MyTeamDashboard"
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
    this.docservice.UpdateMyTeam(entity).subscribe(res => {
        if (this.languageid == 1) {
            Swal.fire('Success', 'Updated Successfully')
            location.href = "#/MyTeamDashboard"
        }
        else if (this.languageid == 6) {
            Swal.fire('Mis à jour avec Succés')
            location.href = "#/MyTeamDashboard"
        }
    })
}

}

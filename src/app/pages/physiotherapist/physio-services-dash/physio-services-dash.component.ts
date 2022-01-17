import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-physio-services-dash',
  templateUrl: './physio-services-dash.component.html',
  styleUrls: ['./physio-services-dash.component.css']
})
export class PhysioServicesDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels: any;
  public languageid: any;
  servicesList: any;
  term: any;
  labels1:any;
  physioid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.physioid = localStorage.getItem('physioid');
    this.getlanguage();
    this.getPhysioServices()
  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels1 = data;
      }, error => {
      }
    )
  }


  public getPhysioServices() {
    if (this.physioid == undefined) {
      this.docservice.GetPhysioServicesByIDWeb(this.languageid, 0).subscribe(
        data => {

          this.servicesList = data;
        }, error => {
        }
      )
    }
    else {
      this.docservice.GetPhysioServicesByIDWeb(this.languageid, 0).subscribe(
        data => {

          this.servicesList = data.filter(x => x.physioID == this.physioid);
        }, error => {
        }
      )
    }
  }
}



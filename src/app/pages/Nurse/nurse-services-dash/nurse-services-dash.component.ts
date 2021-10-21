import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nurse-services-dash',
  templateUrl: './nurse-services-dash.component.html',
  styleUrls: ['./nurse-services-dash.component.css']
})
export class NurseServicesDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public labels: any;
  public languageid: any;
  nurseServicesList: any;
  term: any;
  nurseid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.nurseid = localStorage.getItem('nurseid');
    this.getlanguage();
    this.GetNurseServices()
  }

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }


  public GetNurseServices() {
    if (this.nurseid == undefined) {
      this.docservice.GetNurseServicesByIDWeb(this.languageid, 0).subscribe(
        data => {

          this.nurseServicesList = data;
        }, error => {
        }
      )
    }
    else {
      this.docservice.GetNurseServicesByIDWeb(this.languageid, 0).subscribe(
        data => {

          this.nurseServicesList = data.filter(x => x.nurseID == this.nurseid);
        }, error => {
        }
      )
    }

  }
}

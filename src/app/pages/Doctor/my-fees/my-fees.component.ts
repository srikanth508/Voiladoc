import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-my-fees',
  templateUrl: './my-fees.component.html',
  styleUrls: ['./my-fees.component.css']
})
export class MyFeesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public countryid: any;
  public citylist: any;
  public cityid: any;
  public dummlist: any;
  public arealist: any;
  public areaid: any;
  public countrylist: any;
  public count: any;
  public hospitalclinicid: any;
  public dummlistsss: any;
  public doctorid: any;
  public doccommissionlist: any;
  public languageid: any;
  public labels: any;
  public labels1: any;
  public term:any;

  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getdoctorfeess()


    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels1 = data;
      },
      error => { }
    );
  }

  public getdoctorfeess() {

    this.docservice.DoctorCommissionFees(this.languageid).subscribe(
      data => {
       
        this.dummlistsss = data;
        this.doccommissionlist = this.dummlistsss.filter(x => x.doctorID == this.doctorid)
        this.dummlist = this.doccommissionlist
        this.count = this.doccommissionlist.length
      }, error => {
      }
    )

  }

}

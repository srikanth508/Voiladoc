import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-partners-dashboard',
  templateUrl: './partners-dashboard.component.html',
  styleUrls: ['./partners-dashboard.component.css']
})
export class PartnersDashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public dcid: any;
  public partnerlist: any;
  public term: any;

  public labels:any;
  public languageid:any;

  ngOnInit() {
    this.dcid = localStorage.getItem('deliveryid');
    this.docservice.GetDeliveryPartnersByID(this.dcid).subscribe(
      data => {
        debugger
        this.partnerlist = data;
      }, error => {
      }
    )
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
  }

  
  public getlanguage()
  {
    this.docservice.Getadmin_DeliveryLoginsOrdersEmployee_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )  
  }


}

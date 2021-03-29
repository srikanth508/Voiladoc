import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-independentsubdash',
  templateUrl: './independentsubdash.component.html',
  styleUrls: ['./independentsubdash.component.css']
})
export class IndependentsubdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public languageid: any;
  public typeid: any;
  public independentSubscriptions: any;
  public search: any;
  public count: any;
  labels:any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.typeid = 1;
    this.GetALLSubscriptions();
    this.getlanguage()
  }



  SelectLabel: any;
  public getlanguage() {
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      

      }, error => {
      }
    )
  }


  public GetALLSubscriptions() {
    this.docservice.GetAllIndependentSubscriptionsContractDatesdash(this.typeid, this.languageid).subscribe(
      data => {

        this.independentSubscriptions = data;
        this.count = this.independentSubscriptions.length;

      }, error => {
      }
    )
  }

  public GetTypeID(even) {
    this.typeid = even.target.value;
    this.GetALLSubscriptions();
  }
}

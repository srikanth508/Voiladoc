import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-when-to-consume',
  templateUrl: './when-to-consume.component.html',
  styleUrls: ['./when-to-consume.component.css']
})
export class WhenToConsumeComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, private spinner: NgxSpinnerService) { }
  public labels: any;
  public languageid: any;
  public id: any;
  public showbit: any;
  public consumename:any;
  public description:any;
  public consumelist:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
     

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
      }
    }
    )
    this.getlanguage();
    this.GetWhenConsumemedicals()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetWhenConsumemedicals() {
   
    this.docservice.GetWhenToConsumeMasterMedicalsByLanguageID(this.languageid).subscribe(
      data => {
       
        this.consumelist = data;
        var list=this.consumelist.filter(x=>x.id==this.id)
        this.consumename=list[0].name
        this.description=list[0].description
      }, error => {
      }
    )
  }


  public insertdetails() {
    this.spinner.show();
    var entity = {
      'Name': this.consumename,
      'Description': this.description,
      'LanguageID': 1,
    }
    this.docservice.InsertWhenToConsumeMasterMedicals(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Details Saved Successfully');
        this.spinner.hide();
        location.href = "#/WhenToConsumeMaster"
      }
    })
  }
  
  
  public updatedetails() {
    this.spinner.show();
    var entity = {
      'ID':this.id,
      'Name': this.consumename,
      'Description': this.description,
      'LanguageID': this.languageid,
    }
    this.docservice.UpdateWhenToConsumeMasterMedicals_Web(entity).subscribe(data => {
   
        Swal.fire('Success', 'Details Updated Successfully');
        this.spinner.hide();
        location.href = "#/WhenToConsumeMaster"
      
    })
  }



  
}

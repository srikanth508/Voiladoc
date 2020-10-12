import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-degree-master',
  templateUrl: './degree-master.component.html',
  styleUrls: ['./degree-master.component.css']
})
export class DegreeMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels: any;
  public languageid: any;
  public id: any;
  public showbit: any;
  public description:any;
  public degreename:any;
  public degreelist:any;

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
    this.getdegreemaster()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }
  public getdegreemaster() {
   
    this.docservice.GetDegreeMasterBylanguageID(this.languageid).subscribe(
      data => {
       
        this.degreelist = data;
        var list=this.degreelist.filter(x=>x.id==this.id)
        this.degreename=list[0].short
        this.description=list[0].description
      }, error => {
      }
    )
  }
  
  public insertdetails() {
    this.spinner.show();
    var entity = {
      'Short': this.degreename,
      'Description':this.description,
      'LanguageID': 1
    }
    this.docservice.InsertDegreeMaster(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Details Saved Successfully');
        this.spinner.hide();
        location.href = "#/DegreeMasterDash"
      }
    })
  }



  public updatedetails() {
    this.spinner.show();
    var entity = {
      'ID':this.id,
      'Short': this.degreename,
      'Description':this.description,
      'LanguageID': this.languageid
    }
    this.docservice.UpdateDegreeMaster_Web(entity).subscribe(data => {
     
        Swal.fire('Success', 'Details Updated Successfully');
        this.spinner.hide();
        location.href = "#/DegreeMasterDash"
      
    })
  }
}

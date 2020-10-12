import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-specilization-master',
  templateUrl: './specilization-master.component.html',
  styleUrls: ['./specilization-master.component.css']
})
export class SpecilizationMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, private spinner: NgxSpinnerService) { }
  public labels: any;
  public languageid: any;
  public id: any;
  public showbit: any;
  public specilizationanme: any;
  public description: any;
  public specilisationlist: any;
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
    this.getspecilicationmaster()
    this.getlanguage()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }


  public getspecilicationmaster() {
   
    this.docservice.GetSpecilaizationMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.specilisationlist = data;
        var list = this.specilisationlist.filter(x => x.id == this.id)
        this.specilizationanme = list[0].specilaizationName,
        this.description = list[0].description
      }, error => {
    }
    )
  }



  public insertdetails() {
    this.spinner.show();
    var entity = {
      'SpecilaizationName': this.specilizationanme,
      'Description': this.description,
      'LanguageID': 1,
    }
    this.docservice.InsertSpecilaizationMaster(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Details Saved Successfully');
        this.spinner.hide();
        location.href = "#/SpecilizationDash"
      }
    })
  }


  public updatedetails() {
    var entity = {
      'ID': this.id,
      'SpecilaizationName': this.specilizationanme,
      'Description': this.description,
      'LanguageID': this.languageid,
    }
    this.docservice.UpdateSpecilaizationMaster_Web(entity).subscribe(data => {
      let res = data
      Swal.fire('Success', 'Details Saved Successfully');

      location.href = "#/SpecilizationDash"

    })
  }
}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-medicine-type-master',
  templateUrl: './medicine-type-master.component.html',
  styleUrls: ['./medicine-type-master.component.css']
})
export class MedicineTypeMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels: any;
  public languageid: any;
  public id: any;
  public showbit: any;
  public medicine: any;
  public description: any;
  public medicinelist: any;
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
    this.Getmedicinetypemaster()
    this.getlanguage()
  }
  public getlanguage() {
    this.docservice.GetAdmin_Mastersss_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }


  public Getmedicinetypemaster() {
   
    this.docservice.GetMedicineTypeMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.medicinelist = data;
        var list = this.medicinelist.filter(x => x.id == this.id)
        this.medicine = list[0].name
        this.description = list[0].description
      }, error => {
      }
    )
  }


  public insertdetails() {
    this.spinner.show();
    var entity = {
      'Short': this.medicine,
      'Description': this.description,
      'LanguageID': 1
    }
    this.docservice.InsertMedicineTypeMaster(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Details Saved Successfully');
        this.spinner.hide();
        location.href = "#/MedicineTypeMasterDash"
      }
    })
  }


  public updatedetails() {
    this.spinner.show();
    var entity = {
      'ID': this.id,
      'Short': this.medicine,
      'Description': this.description,
      'LanguageID': this.languageid
    }
    this.docservice.UpdateMedicineTypeMaster(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Details Saved Successfully');
      this.spinner.hide();
      location.href = "#/MedicineTypeMasterDash"

    })
  }
}

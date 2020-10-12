import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { NUMBER_FORMAT_REGEXP } from '@angular/common/src/i18n/format_number';

@Component({
  selector: 'app-edit-camp',
  templateUrl: './edit-camp.component.html',
  styleUrls: ['./edit-camp.component.css']
})
export class EditCampComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public hospitallist: any;
  public hospitalid: any;
  public campname: any;
  public campdescription: any;
  public contactpersonname: any;
  public contactpersonphno: any;
  public criteria: any;
  public fees: any;
  public startdate: Date;
  public enddate: Date;
  public time: any;
  public address: any;
  public todaydate: any;
  public CurrentTime: any;
  public details: any;
  public id: any;
  public hosipitalname: any;
  public hosname: any;


  ngOnInit() {


    this.activatedroute.params.subscribe(params => {
     
      this.id = params['id'];
      this.getcampdetailsbyid();
    }
    )

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
   
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();

    this.docservice.GetHospital_ClinicForAdmin().subscribe(
      data => {
       
        this.hospitallist = data;
      }, error => {
      }
    )
  }

  public getcampdetailsbyid() {

    this.docservice.GetHospital_ClinicCampByID(this.id).subscribe(
      data => {
       
        this.details = data[0];
       
   
        this.hospitalid = this.details.hospital_ClinicName,
          this.campname = this.details.campName,
          this.campdescription = this.details.description,
          this.contactpersonname = this.details.contactPersonName,
          this.criteria = this.details.enrollmentCriteria,
          this.fees = this.details.fees,
          this.contactpersonphno = this.details.contactPersonPhNo,
          this.startdate = this.details.sDate,
          this.enddate = this.details.eDate,
          this.time = this.details.timings,
          this.address = this.details.address
          this.docservice.GetHospital_ClinicForAdmin().subscribe(
            data => {
             
              this.hospitallist = data;
            }, error => {
            }
          )
      }, error => {
      }
    )
  }
  public updatedetails() {
   
    var entity = {
      'ID':this.id,
      'CampName': this.campname,
      'Description': this.campdescription,
      'ContactPersonName': this.contactpersonname,
      'ContactPersonPhNo': this.contactpersonphno,
      'EnrollmentCriteria': this.criteria,
      'Fees': Number(this.fees),
      'SDate':this.startdate,
      'EDate': this.enddate,
      'Timings': this.time,
      'Address': this.address
    }
   
    this.docservice.UpdateHospital_ClinicCamps(entity).subscribe(res => {
      let test = res;
     
      Swal.fire(' Updated Successfully');
      this.getcampdetailsbyid();
    })

  }

}

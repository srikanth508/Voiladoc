import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-addcamp',
  templateUrl: './addcamp.component.html',
  styleUrls: ['./addcamp.component.css']
})
export class AddcampComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public hospitallist: any;
  public hospitalid: any;
  public campname: any;
  public campdescription: any;
  public contactpersonname: any;
  public contactpersonphno: any;
  public criteria: any;
  public fees: any;
  public startdate: any;
  public enddate: any;
  public time: any;
  public address: any;
  public todaydate: any;
  public CurrentTime: any;

  ngOnInit() {
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

  public GetHospitalID(even) {
    this.hospitalid = even.target.value;
  }
  public insertdetails() {
     
    var entity = {
      'Hospital_ClinicID': this.hospitalid,
      'CampName': this.campname,
      'Description': this.campdescription,
      'ContactPersonName': this.contactpersonname,
      'ContactPersonPhNo': this.contactpersonphno,
      'EnrollmentCriteria': this.criteria,
      'Fees': this.fees,
      'SDate': this.startdate,
      'EDate': this.enddate,
      'Timings': this.time,
      'Address': this.address
    }
    this.docservice.InsertHospital_ClinicCamp(entity).subscribe(data => {
     
      if (data != 0) {
        Swal.fire('Registration Completed', 'Details saved successfully', 'success');
        this.clear();

      }
    })

}
public clear()
{
  this.campname="";
  this.campdescription="";
  this.contactpersonname="";
  this.contactpersonphno="";
  this.criteria="";
   this.fees="";
    this.startdate="";
    this.enddate="";
    this.time="";
     this.address="";
   
}
public GetEndDate()
{
  this.enddate="";
}
}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-doc-reports',
  templateUrl: './doc-reports.component.html',
  styleUrls: ['./doc-reports.component.css']
})
export class DocREportsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public cancelledlist:any;
  public dummlist:any;
  public count:any;
  public doctorid:any;
  public startdate:any;
  public enddate:any;
  public languageid:any;
  public labels:any;
  public term:any;
  public id:any;
  public sdate:any;
  public edate:any;

  ngOnInit() {

    this.sdate = localStorage.getItem('StartDate');
    this.edate = localStorage.getItem('EndDate');
    this.activatedroute.params.subscribe(params => {
      debugger;

      this.id = params['id']
    }
    )
  
    this.languageid = localStorage.getItem('LanguageID');
    this.doctorid=localStorage.getItem('Reportdocid');
    this.startdate=localStorage.getItem('startdate');
    this.enddate=localStorage.getItem('enddate');
   
    debugger
    if (this.id == undefined) {
      debugger
      this.getcancelledappoinrtments();
    }
    
    else if(this.id=='1'){
      this.docservice.GetAllAppointmentsForHosp(this.sdate,this.edate).subscribe(
        data => {
          debugger
          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
    else if(this.id=='2'){
      this.docservice.GetAllAppointmentsForClinics(this.sdate,this.edate).subscribe(
        data => {
          debugger
          this.cancelledlist = data;
          this.dummlist = this.cancelledlist;
          this.count = this.cancelledlist.length
        }, error => {
        }
      )
    }
    this.getlanguage()
  }

  public getlanguage()
  {
    this.docservice.GetAdmin_DoctorLoginArticleAppointmentReport_Lable(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    ) 
  }
  public getcancelledappoinrtments() {
    debugger
    this.docservice.GetCancelledAppointmentReportsForDoctor(this.doctorid, this.startdate, this.enddate,this.languageid).subscribe(
      data => {
        debugger
        this.cancelledlist = data;
        this.dummlist = this.cancelledlist;
        this.count = this.cancelledlist.length
      }, error => {
      }
    )
  }


  public getget(even) {
    // this.featurelist.find(item => item.featureID == fid).checkbox = true;
    debugger
    if (even.target.value == 1) {
      debugger
      let dfsfd = this.dummlist.filter(x => x.isVisited == 1);
      debugger
      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }
    if (even.target.value == 2) {
      debugger
      let dfsfd = this.dummlist.filter(x => x.noShow == 1);
      debugger
      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }
    if (even.target.value == 3) {
      debugger
      let dfsfd = this.dummlist.filter(x => x.cancelled == 1||x.docCancelled==1);
      debugger
      this.cancelledlist = dfsfd;
      this.count = this.cancelledlist.length
    }
    if (even.target.value == 4) {
      debugger
    this.getcancelledappoinrtments();
    this.docservice.GetAllAppointmentsForHosp(this.sdate,this.edate).subscribe(
      data => {
        debugger
        this.cancelledlist = data;
        this.dummlist = this.cancelledlist;
        this.count = this.cancelledlist.length
      }, error => {
      }
    )

    }

  }


  public GetAppointmenttype(even)
  {
    if(even.target.value=='2')
 {
  let dfsfd = this.dummlist.filter(x => x.appointmentTypeID == 1);
  debugger
  this.cancelledlist = dfsfd;
  this.count = this.cancelledlist.length
 }
 if(even.target.value=='3')
 {
  let dfsfd = this.dummlist.filter(x => x.appointmentTypeID == 2);
  debugger
  this.cancelledlist = dfsfd;
  this.count = this.cancelledlist.length
 }
 if(even.target.value=='1')
 {
   if(this.id==undefined)
   {
    this.getcancelledappoinrtments();
   }
else if(this.id=='1')
{
  this.docservice.GetAllAppointmentsForHosp(this.sdate,this.edate).subscribe(
    data => {
      debugger
      this.cancelledlist = data;
      this.dummlist = this.cancelledlist;
      this.count = this.cancelledlist.length
    }, error => {
    }
  )
}
else if(this.id=='2')
{
  this.docservice.GetAllAppointmentsForClinics(this.sdate,this.edate).subscribe(
    data => {
      debugger
      this.cancelledlist = data;
      this.dummlist = this.cancelledlist;
      this.count = this.cancelledlist.length
    }, error => {
    }
  )
}

 }
  }

}

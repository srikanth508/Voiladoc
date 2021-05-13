import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-home-page-sponsrship-dash-board',
  templateUrl: './home-page-sponsrship-dash-board.component.html',
  styleUrls: ['./home-page-sponsrship-dash-board.component.css']
})
export class HomePageSponsrshipDashBoardComponent implements OnInit {

  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
  term;
  languageid;
  value: any;
  SDate = new Date();
  EDate = new Date();
  public todaydate: any;
  public CurrentTime: any;

  ngOnInit() {

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.languageid = localStorage.getItem('LanguageID');

    this.getlanguage()
    var kkk = this.SDate.setDate(this.SDate.getDate() - 5);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    this.CurrentTime = hours + ':' + minutes + ' ' + newformat;
    this.Getsponrshipofhomepage();


  }



  HomepageSponsrships: any
  public Getsponrshipofhomepage() {



    this.docservice.GetSponcered_AddsMobile(this.languageid).subscribe(
      data => {

        let temp: any = data;
        this.HomepageSponsrships = temp;
      }, error => {
      }
    )
  }
  PhotoUrl
  public GetPhotoUrl(id) {

    this.docservice.GetSponcered_AddsMobile(this.languageid).subscribe(
      data => {

        let temp: any = data;
        let temp1: any = temp.filter(x => x.id == id);
        this.PhotoUrl = temp1[0].photoURL;
      }, error => {
      }
    )
  }
  startdate
  enddate
  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1];
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.docservice.GetSponcered_AddsMobileByDate(this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        let temp: any = data;
        this.HomepageSponsrships = temp;
      }, error => {
      }
    )

  }





  SelectLabel
  search
  labels: any;
  public getlanguage() {
    this.docservice.GetAdmin_Sponsored_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search
      }, error => {
      }
    )
  }


  public DeleteServiceMaster(id) {

    if(this.languageid==1)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This Service!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteSponcered_Adds(id).subscribe(res => {
            let test = res;
            this.Getsponrshipofhomepage()
          })
          Swal.fire(
            'Deleted!',
            'Service has been deleted.',
            'success'
          )
        }
        else {
          this.Getsponrshipofhomepage()
        }
      })
    }
    else
    {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Service!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer.!',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteSponcered_Adds(id).subscribe(res => {
            let test = res;
            this.Getsponrshipofhomepage()
          })
          Swal.fire(
            'Supprimé!',
            'Le service a été supprimé.',
            'success'
          )
        }
        else {
          this.Getsponrshipofhomepage()
        }
      })
    }
  
  }



}

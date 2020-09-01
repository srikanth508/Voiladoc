import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-app-page-sponsorship-dashboard',
  templateUrl: './app-page-sponsorship-dashboard.component.html',
  styleUrls: ['./app-page-sponsorship-dashboard.component.css']
})
export class AppPageSponsorshipDashboardComponent implements OnInit {

  options: any
  constructor(public docservice: HelloDoctorService) { }
  value;
  term;
  languageid
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
    this.Getsponrshipofhomepage();
    this.languageid = localStorage.getItem('LanguageID');
  }
  ApppageSponsrships: any
  public Getsponrshipofhomepage() {
    debugger
    this.docservice.GetAppPageSponsorship().subscribe(
      data => {
        debugger
        let temp: any = data;
        this.ApppageSponsrships = temp;
      }, error => {
      }
    )
  }
  PhotoUrl
  public GetPhotoUrl(id) {
    debugger
    this.docservice.GetAppPageSponsorship().subscribe(
      data => {
        debugger
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
    debugger
    //  var sdate = data.split('-')
    //  this.startdate = sdate[0]
    //  this.enddate = sdate[1];
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.docservice.GetAppPageSponsorshipByDate(this.startdate, this.enddate).subscribe(
      data => {
        debugger
        let temp: any = data;
        this.ApppageSponsrships = temp;
      }, error => {
      }
    )

  }


  public DeleteServiceMaster(id) {
    debugger;
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
        this.docservice.DeleteAppPageSponsorship(id).subscribe(res => {
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



}


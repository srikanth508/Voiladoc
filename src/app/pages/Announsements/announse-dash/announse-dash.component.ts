import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-announse-dash',
  templateUrl: './announse-dash.component.html',
  styleUrls: ['./announse-dash.component.css']
})
export class AnnounseDashComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public languageid: any;


  value: any;
  SDate = new Date();
  EDate = new Date();
  public todaydate: any;
  public startdate: any;
  public enddate: any;
  public CurrentTime: any;
  public annousments: any;
  public labels: any;
  public term: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    var kkk = this.SDate.setDate(this.SDate.getDate() - 30);
    var lll = this.EDate.setDate(this.EDate.getDate() + 20);
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
    this.getannounsements()

    this.docservice.GetAdmin_LocalDoctor_Labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }



  public DeleteAnnouncements(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This Announcement!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteAnnouncements(id).subscribe(res => {
            let test = res;
            this.getannounsements();
          })
          Swal.fire(
            'Deleted!',
            'Announcement has been deleted.',
            'success'
          )
        }
        else {
          this.getannounsements();
        }
      })
    }
    else {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteAnnouncements(id).subscribe(res => {
            let test = res;
            this.getannounsements();
          })
          Swal.fire(
            'Supprimé!',
            'Annonce a été supprimé.',
            'success'
          )
        }
        else {
          this.getannounsements();
        }
      })
    }

  }
  public getannounsements() {
    this.docservice.GetAnnouncements(this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.annousments = data;
      }, error => {
      }
    )
  }
  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];
    this.getannounsements()
  }





  public DisableAnnouncements(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to disable this Announcement !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, disable it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DisableAnnouncements(id).subscribe(res => {
            let test = res;
            this.getannounsements();
          })
          Swal.fire(
            'Disabled!',
            'Announcement has been Disabled.',
            'success'
          )
        }
        else {
          this.getannounsements();
        }
      })

    }
    else {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, désactiver !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DisableAnnouncements(id).subscribe(res => {
            let test = res;
            this.getannounsements();
          })
          Swal.fire(
            '',
            'Désactivé avec succès',
            'success'
          )
        }
        else {
          this.getannounsements();
        }
      })
    }


  }






  public EnableAnnouncements(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Enable This Announcement!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Enable it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.EnableAnnouncements(id).subscribe(res => {
            let test = res;
            this.getannounsements();
          })
          Swal.fire(
            'Enabled!',
            'Announcement has been Enabled.',
            'success'
          )
        }
        else {
          this.getannounsements();
        }
      })
    }
    else {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, Activer !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.EnableAnnouncements(id).subscribe(res => {
            let test = res;
            this.getannounsements();
          })
          Swal.fire(
            '',
            'Activé avec succès',
            'success'
          )
        }
        else {
          this.getannounsements();
        }
      })
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home-page-sponsrship',
  templateUrl: './home-page-sponsrship.component.html',
  styleUrls: ['./home-page-sponsrship.component.css']
})
export class HomePageSponsrshipComponent implements OnInit {
  todaydate
  CurrentTime
  languageid
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, private datePipe: DatePipe) { }
  paramid;
  value;
  ngOnInit() {

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    debugger
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();
    debugger
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.paramid = params['id'];
      this.languageid = localStorage.getItem('LanguageID');
      this.getsponsradd(this.paramid);

    }
    )
  }
  public getsponsradd(id) {
    debugger
    this.docservice.GetSponcered_AddsMobile(this.languageid).subscribe(
      data => {
        debugger
        let temp: any = data;
        let temp1: any = temp.filter(x => x.id == id)
        this.ClientName = temp1[0].clientName;
        this.Description = temp1[0].description;
        this.LinkURL = temp1[0].linkURL;
        this.StartDate = this.datePipe.transform(temp1[0].startDate, 'yyyy-MM-dd');
        this.EndDate = this.datePipe.transform(temp1[0].endDate, 'yyyy-MM-dd');
      }, error => {
      }
    )
  }

  public attachments1 = [];
  public attachmentsurl = [];
  public onattachmentUpload1(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.attachments1.push(abcd[i]);
      this.uploadattachments1();
    }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }
  PhotoURL: any
  public uploadattachments1() {
    this.docservice.ArticlePhoto(this.attachments1).subscribe(res => {
      debugger
      this.PhotoURL = res;
      debugger
    })
  }
  ClientName
  Description
  LinkURL
  StartDate
  EndDate
  public insertdetails() {
    debugger

    var entity = {
      'ClientName': this.ClientName,
      'Description': this.Description,
      'PhotoURL': this.PhotoURL,
      'LinkURL': this.LinkURL,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'LanguageID':this.languageid
    }
    this.docservice.InsertSponcered_Adds(entity).subscribe(data => {
      debugger
      if (data != 0) {
        Swal.fire('Completed', 'Details saved successfully', 'success');
        location.href = "#/HomePageSponsrshipDashBoard";
      }
    })

  }
  public UpdateDetails() {
    debugger

    var entity = {
      'ID': this.paramid,
      'ClientName': this.ClientName,
      'Description': this.Description,
      'LinkURL': this.LinkURL,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      
    }
    this.docservice.UpdateSponcered_Adds(entity).subscribe(data => {
      debugger
      if (data != 0) {
        Swal.fire('Completed', 'Details Updated successfully', 'success');
        location.href = "#/HomePageSponsrshipDashBoard";
      }
    })

  }



}

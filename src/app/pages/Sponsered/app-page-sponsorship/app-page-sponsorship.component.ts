import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-app-page-sponsorship',
  templateUrl: './app-page-sponsorship.component.html',
  styleUrls: ['./app-page-sponsorship.component.css']
})
export class AppPageSponsorshipComponent implements OnInit {
  todaydate
  CurrentTime
  languageid
  value;
  term;
  dropzonelable
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, private datePipe: DatePipe) { }
  paramid
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
    if(this.languageid==1)
    {
      this.dropzonelable="Upload file"
    }
    else if(this.languageid==6)
    {
      this.dropzonelable="Télécharger des fichiers"
    }
  }
  public getsponsradd(id) {
    debugger
    this.docservice.GetAppPageSponsorship().subscribe(
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
    // for (let i = 0; i < abcd.length; i++) {
      this.attachments1.push(abcd.addedFiles[0]);
      this.uploadattachments1();
    // }

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
      'EndDate': this.EndDate
    }
    this.docservice.InsertAppPageSponsorship(entity).subscribe(data => {
      debugger
      if (data != 0) {
        Swal.fire('Completed', 'Details saved successfully', 'success');
        location.href = "#/AppPageSponsorshipDashBoard";
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
      'EndDate': this.EndDate
    }
    this.docservice.UpdateAppPageSponsorship(entity).subscribe(data => {
      debugger
      if (data != 0) {
        Swal.fire('Completed', 'Details Updated successfully', 'success');
        location.href = "#/AppPageSponsorshipDashBoard";
      }
    })

  }



}

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
  fees
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, private datePipe: DatePipe) { }
  paramid
  ngOnInit() {

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
   
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();
   
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
    this.activatedroute.params.subscribe(params => {
     
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
   
    this.docservice.GetAppPageSponsorship().subscribe(
      data => {
       
        let temp: any = data;
        let temp1: any = temp.filter(x => x.id == id)
        this.ClientName = temp1[0].clientName;
        this.Description = temp1[0].description;
        this.LinkURL = temp1[0].linkURL;
        this.StartDate=temp1[0].startdatee;
        this.EndDate=temp1[0].enddatee;
        this.fees=temp1[0].fees;
        // this.StartDate = this.datePipe.transform(temp1[0].startDate, 'yyyy-MM-dd');
        // this.EndDate = this.datePipe.transform(temp1[0].endDate, 'yyyy-MM-dd');
      }, error => {
      }
    )
  }

  public attachments1 = [];
  public attachmentsurl = [];
public showPhotoURL=[];

  public onattachmentUpload1(abcd) {
   
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
     
      this.PhotoURL = res;

      
      let a = this.PhotoURL.slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showPhotoURL.push(b)
    
     
    })
  }
  ClientName
  Description
  LinkURL
  StartDate
  EndDate
  public insertdetails() {
   

    var entity = {
      'ClientName': this.ClientName,
      'Description': this.Description,
      'PhotoURL': this.PhotoURL,
      'LinkURL': this.LinkURL,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'Fees':this.fees
    }
    this.docservice.InsertAppPageSponsorship(entity).subscribe(data => {
     
      if (data != 0) {
        Swal.fire('Completed', 'Details saved successfully', 'success');
        location.href = "#/AppPageSponsorshipDashBoard";
      }
    })
  }
  
  public UpdateDetails() {
    var entity = {
      'ID': this.paramid,
      'ClientName': this.ClientName,
      'Description': this.Description,
      'LinkURL': this.LinkURL,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'Fees':this.fees
    }
    this.docservice.UpdateAppPageSponsorship(entity).subscribe(data => {
     
      if (data != 0) {
        Swal.fire('Completed', 'Details Updated successfully', 'success');
        location.href = "#/AppPageSponsorshipDashBoard";
      }
    })

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


}

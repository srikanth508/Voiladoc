import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-home-page-sponsrship',
  templateUrl: './home-page-sponsrship.component.html',
  styleUrls: ['./home-page-sponsrship.component.css']
})
export class HomePageSponsrshipComponent implements OnInit {
  todaydate
  CurrentTime
  languageid
  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, private datePipe: DatePipe, private spinner: NgxSpinnerService) { }
  paramid;
  value;
  dropzonelable: any;
  fees: any;
  showphoto:any;
  ngOnInit() {

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();

    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {

      this.paramid = params['id'];

      
      this.languageid = localStorage.getItem('LanguageID');
      this.getsponsradd(this.paramid);

    }
    )

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
    this.getlanguage()
  }
  public getsponsradd(id) {
      this.docservice.GetSponcered_AddsMobile(this.languageid).subscribe(
        data => {
          
          let temp: any = data;
          let temp1: any = temp.filter(x => x.id == id)
          this.ClientName = temp1[0].clientName;
          this.Description = temp1[0].description;
          this.LinkURL = temp1[0].linkURL;
          this.fees=temp1[0].fees;
          this.StartDate=temp1[0].startdatee;
          this.EndDate=temp1[0].enddatee;
          this.PhotoURL=temp1[0].photourlss;
          this.showphoto=temp1[0].photoURL
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
    
    this.attachmentsurl.length=0
    
    // for (let i = 0; i < abcd.length; i++) {
    this.attachments1.push(abcd.addedFiles[0]);
    this.uploadattachments1();
    // }
    
    if(this.languageid==1)
    {
      Swal.fire('Photo Added Successfully');
      abcd.length = 0;
    }
    else{
      Swal.fire('Photo ajoutée');
      abcd.length = 0;
    }

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
    this.spinner.show();
    var entity = {
      'ClientName': this.ClientName,
      'Description': this.Description,
      'PhotoURL': this.PhotoURL,
      'LinkURL': this.LinkURL,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'LanguageID': this.languageid,
      'Fees': this.fees
    }
    this.docservice.InsertSponcered_Adds(entity).subscribe(data => {

      if (data != 0) {
        if(this.languageid==1)
        {
          this.spinner.hide();
          Swal.fire('Completed', 'Published successfully', 'success');
          location.href = "#/HomePageSponsrshipDashBoard";
        }
        else
        {
          this.spinner.hide();
          Swal.fire('','Publié avec succès', 'success');
          location.href = "#/HomePageSponsrshipDashBoard";
        }
      
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
      'Fees':this.fees,
      'PhotoURL':this.PhotoURL
    }
    this.docservice.UpdateSponcered_Adds(entity).subscribe(data => {

      if (data != 0) {
        Swal.fire('Completed', 'Details Updated successfully', 'success');
        location.href = "#/HomePageSponsrshipDashBoard";
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

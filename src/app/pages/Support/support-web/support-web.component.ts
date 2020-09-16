import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate } from "@angular/common";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-support-web',
  templateUrl: './support-web.component.html',
  styleUrls: ['./support-web.component.css']
})
export class SupportWebComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService) { }
  options: NgDateRangePickerOptions;
  issuelist: any;
  languageid: any;
  labels: any;
  count: any;
  term: any;
  public startdate: any;
  public enddate: any;

  value: any;
  SDate = new Date();
  EDate = new Date();
  public sdate: any;
  public edate: any;
  public todaydate: any;
  public CurrentTime: any;
  public dummissuelist: any;
  public issuephoto = [];
  public issuephotourl = [];
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
    var kkk = this.SDate.setDate(this.SDate.getDate() - 5);
    var lll = this.EDate.setDate(this.EDate.getDate() + 7);
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);
    debugger
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
    this.languageid = localStorage.getItem('LanguageID');
    this.GetSupportIssues()
    this.GetLanguageMaster()
  }


  public GetSupportIssues() {
    this.docservice.GetSupportForWebForSupportLogin(this.languageid, this.startdate, this.enddate).subscribe(res => {
      debugger
      this.issuelist = res;
      this.dummissuelist = res;

      this.issuelist = this.dummissuelist.filter(x => x.resolved == 0)
      this.count = this.issuelist.length;
      debugger
    })
  }
  public GetLanguageMaster() {
    this.docservice.GetAdmin_SupportForWeb_Labels(this.languageid).subscribe(res => {
      debugger
      this.labels = res;
      debugger
    })
  }


  photourl: any;

  public GetImageUrl(photoURL) {
    debugger
    this.photourl = photoURL
  }


  selectedDate(data) {
    debugger
    //   var sdate = data.split('-')
    //   this.startdate= sdate[0]
    //  this.enddate= sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetSupportIssues()

  }
  typeid: any;

  public GetTypeID(even) {
    this.typeid = even.target.value;
    if (even.target.value != 0) {
      this.issuelist = this.dummissuelist.filter(x => x.typeID == this.typeid && x.resolved == 0)
      this.count = this.issuelist.length;
    }
    else {
      this.GetSupportIssues()
    }
  }

  // public UpdateSupportForWebResolvedbit(id) {
  //   debugger;
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "This Issue Has Resolved!",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, Resolved!'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.docservice.UpdateSupportForWebResolvedbit(id).subscribe(res => {
  //         let test = res;
  //         this.GetSupportIssues();
  //       })
  //       Swal.fire(
  //         'Resolved!',
  //         'Issue has been Resolved.',
  //         'success'
  //       )
  //     }
  //     else {
  //       this.GetSupportIssues();
  //     }
  //   })
  // }


  public UpdateSupportForWebAcceptedbit(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "This Want To Accept This Issue!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Accept!'
    }).then((result) => {
      if (result.value) {
        this.docservice.UpdateSupportForWebAcceptedbit(id).subscribe(res => {
          let test = res;
          this.GetSupportIssues();
        })
        Swal.fire(
          'Accepted!',
          'Issue has been Accepted.',
          'success'
        )
      }
      else {
        this.GetSupportIssues();
      }
    })
  }
  resolveid: any;

  public GetSupportResolveID(id) {
    this.resolveid = id
  }
  description: any;


  public insertdetails() {
    debugger
    var entity = {
      'ID': this.resolveid,
      'ResolvePhotoUrl': this.issuephotourl[0],
      'ResolveDescription': this.description
    }
    this.docservice.UpdateSupportForWebResolvedbit(entity).subscribe(data => {
      let res = data;
      Swal.fire('Issue Resolved Successflly')
      this.description=""
      this.issuephotourl=[]
      this.GetSupportIssues();
    })
  }


  public onattachmentUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.issuephoto.push(abcd[i]);
      this.uploadid();
    }
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadid() {
    this.docservice.pharmacyphoto(this.issuephoto).subscribe(res => {
      debugger
      this.issuephotourl.push(res);
      let a = this.issuephotourl[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      debugger
    })
    // this.sendattachment();
  }
}

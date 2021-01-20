import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-previous-videos',
  templateUrl: './previous-videos.component.html',
  styleUrls: ['./previous-videos.component.css']
})
export class PreviousVideosComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public id:any;
  public vedioslist:any;
  public patientid;any;
  public appdate:any;
  public patientname:any;
  public slots:any;
  public reason:any;
  public archiveid:any;
  public videiourl=[];
  public languageid: any;
  public labels: any;
  
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
     
      this.archiveid = params['archiveID'];    
      this.patientid = params['patientID']; 
   
     this.videiourl.push('http://amazintchtokbox.herokuapp.com/archive/' + this.archiveid + '/view')
    }
    )
    this.docservice.GetBook_DoctorPatientBookedVideoConferenceByPatientID(this.patientid).subscribe(
      data => {
       
        this.vedioslist = data[0];
        this.appdate=this.vedioslist.appdate,
        this.patientname=this.vedioslist.patientName,
        this.slots=this.vedioslist.slots,
        this.reason=this.vedioslist.reasonForVisit
      }, error => {
      }
    )
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_DoctorLoginPMR_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    ) 
  }

  public GoBackPage()
  {
    location.href="#/MedicalHistory"
  }
}

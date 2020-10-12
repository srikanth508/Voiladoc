import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-myarticles',
  templateUrl: './myarticles.component.html',
  styleUrls: ['./myarticles.component.css']
})
export class MyarticlesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public doctorid: any;
  public details: any;
  public topic: any;
  public subtopic: any;
  public writeup: any;
  public tags: any;
  public photourl: any;
  public languageid: any;
  public labels: any;

  
  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');

    this.docservice.GetArticleForAdminByDocID(this.doctorid).subscribe(
      data => {
       
        this.details = data;
       
        // this.topic=this.details.topic,
        // this.subtopic=this.details.subTopic,
        // this.writeup=this.details.writeup,
        // this.tags=this.details.tags,
        // this.photourl=this.details.photoURL
      }, error => {
      }
    )
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
  }
  
  public getlanguage()
  {
    this.docservice.GetAdmin_DoctorLoginArticleAppointmentReport_Lable(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    ) 
  }
}

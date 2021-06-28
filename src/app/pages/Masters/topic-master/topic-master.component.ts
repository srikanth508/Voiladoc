import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-topic-master',
  templateUrl: './topic-master.component.html',
  styleUrls: ['./topic-master.component.css']
})
export class TopicMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }

  public labels: any;
  public languageid: any;
  public showbit: any;
  public id: any;
  public topicname: any;
  public description: any;
  public topiclist: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {


      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;


        this.docservice.GetTopicMaster().subscribe(
          data => {

            this.topiclist = data;
            var list = this.topiclist.filter(x => x.id == this.id)
            this.topicname=list[0].topicName,
            this.description=list[0].description

          }, error => {
          }
        )
      }
    }
    )
    this.getlanguage()
  }


  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public insertdetails() {
    var entity = {
      'TopicName': this.topicname,
      'Description': this.description,
    }
    this.docservice.InsertTopicMaster(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Success', 'Details Saved Successfully');
        this.spinner.hide();
        location.href = "#/TopicMasterDash"
      }
    })
  }


  public updatedetails() {
    
    var entity = {
      'ID': this.id,
      'TopicName': this.topicname,
      'Description': this.description,
    }
    this.docservice.UpdateTopicMaster(entity).subscribe(data => {
      
        Swal.fire('Success', 'Details Updated Successfully');
     
        location.href = "#/TopicMasterDash"
      
    })
  }

}

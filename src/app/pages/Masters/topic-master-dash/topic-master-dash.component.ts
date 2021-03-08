import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-topic-master-dash',
  templateUrl: './topic-master-dash.component.html',
  styleUrls: ['./topic-master-dash.component.css']
})
export class TopicMasterDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public labels: any;
  public languageid: any;
  public topiclist: any;
  public term: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');


    this.docservice.GetTopicMaster().subscribe(
      data => {

        this.topiclist = data;

      }, error => {
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



  public DeleteTopicMaster(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete Topic!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteTopicMaster(id).subscribe(res => {
          let test = res;

          this.docservice.GetTopicMaster().subscribe(
            data => {
      
              this.topiclist = data;
      
            }, error => {
            }
          )
        })
        Swal.fire(
          'Deleted!',
          'Topic has been Disabled.',
          'success'
        )
      }
      else {

        this.docservice.GetTopicMaster().subscribe(
          data => {
    
            this.topiclist = data;
    
          }, error => {
          }
        )
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-folders-dash',
  templateUrl: './folders-dash.component.html',
  styleUrls: ['./folders-dash.component.css']
})
export class FoldersDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  doctorid: any;
  languageid: any;
  folderlist: any;
  labels: any;
  term: any;
  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');
    this.languageid = localStorage.getItem('LanguageID');
    this.GetDoctors_PersonalFolder();
    this.getlanguage()
  }


  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginPMR_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  GetDoctors_PersonalFolder() {
    this.docservice.GetDoctors_PersonalFolder(this.doctorid, this.languageid).subscribe(data => {
      this.folderlist = data;
    }, error => {

    })
  }

}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-folders',
  templateUrl: './create-folders.component.html',
  styleUrls: ['./create-folders.component.css']
})
export class CreateFoldersComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  folderName: any;
  doctorid: any;
  languageid:any;
  labels:any;
  ngOnInit() {
    this.doctorid = localStorage.getItem('userid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
  }


  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginPMR_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }


  InsertDetails() {
    var entity = {
      'DoctorID': this.doctorid,
      'FolderName': this.folderName
    }
    this.docservice.InsertDoctors_PersonalFolder(entity).subscribe(data => {
      if (data != 0) {
        if(this.languageid==1)
        {
          Swal.fire("Saved Successfully");
          location.href="#/FoldersDash"
        }
        else{
          Swal.fire("Enregistré avec succès");
          location.href="#/FoldersDash"
        }
       
      }
    })
  }

}

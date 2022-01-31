import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.css']
})
export class MyFilesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  languageid: any;
  dropzonelable: any;
  id: any;
  term: any;
  doctorid: any;
  labels: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.doctorid = localStorage.getItem('userid');

    this.activatedroute.params.subscribe(params => {
      debugger
      this.id = params['id'];
      this.foldername = params['Foldername'];
      this.GetAttachments();
    }
    )

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
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

  atachmentlist: any;
  foldername: any;

  GetAttachments() {
    this.docservice.GetFolders_Attchments(this.id, this.languageid).subscribe(data => {
      this.atachmentlist = data;

    })
  }


  identityattachmentsurlssss = [];
  attachments = [];
  attachmentsurl = [];

  public onattachmentUpload(abcd) {


    this.spinner.show();
    // for (let i = 0; i < abcd.length; i++) {
    this.identityattachmentsurlssss = []
    debugger
    this.attachments.push(abcd.addedFiles[0]);
    // this.attachments[0]["FolderName"] = folder;
    // console.log("Atchments",this.attachments);

    debugger
    this.uploadattachments();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }

  }
  showPhoto: any;

  public uploadattachments() {
    let folder = this.doctorid + '/' + this.foldername
    this.docservice.DoctorsPersonalUploads(this.attachments, folder).subscribe(res => {
      this.attachmentsurl.push(res);
      this.spinner.hide();
      this.identityattachmentsurlssss.push(res);

      let a = this.identityattachmentsurlssss[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showPhoto = b;
      this.attachments.length = 0;
    })
    // this.sendattachment();
  }



  subfoldername: any;
  filename: any;




  InsertDetails() {
    debugger
    if (this.attachmentsurl.length == 0 || this.attachmentsurl == []) {
      Swal.fire("Please Add Atachment");
    }
    else {
      debugger
      var entity = {
        'FolderID': this.id,
        'SubFolderName': '',
        'AttachmentUrl': this.attachmentsurl[0],
        'FileName': this.filename
      }
      this.docservice.InsertFolders_Attchments(entity).subscribe(data => {
        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire("File Saved Successfully");
            this.attachmentsurl.length = 0;
            this.GetAttachments();
          }
          else {
            Swal.fire("Fichier enregistré avec succès");
            this.attachmentsurl.length = 0;
            this.GetAttachments();
          }
        }
      })
    }
  }


  openwindow(documents) {
    window.open(documents, '_blank');
  }






  CreateSubfolder() {
    debugger
    debugger
    var entity = {
      'FolderID': this.id,
      'SubFolderName': this.subfoldername,
      'AttachmentUrl': 0,
      'FileName': ''
    }
    this.docservice.InsertFolders_Attchments(entity).subscribe(data => {
      if (data != 0) {
        if (this.languageid == 1) {
          Swal.fire("Subfolder created");
          this.attachmentsurl.length = 0;
          this.GetAttachments();
        }
        else {
          Swal.fire("Sous dossier créé");
          this.attachmentsurl.length = 0;
          this.GetAttachments();
        }

      }
    })
  }

}

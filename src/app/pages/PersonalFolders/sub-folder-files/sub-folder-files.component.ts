import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-sub-folder-files',
  templateUrl: './sub-folder-files.component.html',
  styleUrls: ['./sub-folder-files.component.css']
})
export class SubFolderFilesComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  languageid: any;
  dropzonelable: any;
  folderid: any;
  term: any;
  subfolderid: any;
  doctorid: any;
  foldername: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.doctorid = localStorage.getItem('userid');

    this.activatedroute.params.subscribe(params => {

      this.folderid = params['folderid'];
      this.subfolderid = params['subfolderid'];
      this.foldername = params['Foldername'];
      this.subfoldername = params['SubFolderName'];
      this.GetAttachments();
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


  labels:any;
  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginPMR_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }


  atachmentlist: any;

  GetAttachments() {
    this.docservice.GetSubFolder_Attachments(this.subfolderid, this.languageid).subscribe(data => {
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
    this.attachments.push(abcd.addedFiles[0]);
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
    let folder = this.doctorid + '/' + this.foldername + '/' + this.subfoldername
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
        'FolderID': this.folderid,
        'SubfolderID': this.subfolderid,
        'FileName': this.filename,
        'AttachmentUrl': this.attachmentsurl[0],
        'SubFolderName':''
      }
      this.docservice.InsertSubFolder_Attachments(entity).subscribe(data => {
        if (data != 0) {
          if(this.languageid==1)
          {
            Swal.fire("File Saved Successfully");
            this.attachmentsurl.length = 0;
            this.GetAttachments();
          }
          else
          {
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

  subfold:any;


  CreateSubfolder() {
   
      debugger
      var entity = {
        'FolderID': this.folderid,
        'SubfolderID': this.subfolderid,
        'FileName': '',
        'AttachmentUrl': 0,
        'SubFolderName':this.subfold
      }
      this.docservice.InsertSubFolder_Attachments(entity).subscribe(data => {
        if (data != 0) {
          if(this.languageid==1)
          {
            Swal.fire("Subfolder created");
            this.attachmentsurl.length = 0;
            this.GetAttachments();
          }
          else
          {
            Swal.fire("Sous dossier créé");
            this.attachmentsurl.length = 0;
            this.GetAttachments();
          }
        }
      })
    }
}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-departmentmaster',
  templateUrl: './departmentmaster.component.html',
  styleUrls: ['./departmentmaster.component.css']
})
export class DepartmentmasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService, private activatedroute: ActivatedRoute) { }
  public labels: any;
  public languageid: any;
  public id: any;
  public showbit: any;
  public departmentname: any;
  public description: any;
  public attachments = [];
  public attachmentsurl = [];
  public showphoto = [];
  public departmentlist: any;
  public departmentimage: any;
  dropzonelable: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {


      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
      }
    }
    )
    this.getlanguage();
    this.getdepartmentmaster();


    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }


  public onattachmentUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.attachmentsurl = []
    this.attachmentsurl.length = 0;
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }

  categoryid: any;

  GetCategoryID(even) {
    this.categoryid = even.target.value;
  }

  public insertdetails() {

    if (this.attachmentsurl == undefined || this.attachmentsurl.length == 0) {
      Swal.fire("Please Select Image");
    }
    else {
      this.spinner.show();
      var entity = {
        'Departmentname': this.departmentname,
        'Description': this.description,
        'DepartmentImage': this.attachmentsurl[0],
        'CategoryID':this.categoryid
      }
      this.docservice.InsertDepartmentMasterWeb(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Saved Successfully');
          this.spinner.hide();
          location.href = "#/DepartmentDash"
        }
      })
    }
  }

  public getdepartmentmaster() {

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
        var list = this.departmentlist.filter(x => x.id == this.id)
        this.departmentname = list[0].departmentname,
          this.description = list[0].description,
          this.attachmentsurl[0] = list[0].departmentImage,
          this.departmentimage = list[0].deptphoto,
          this.categoryid=list[0].categoryID

      }, error => {
      }
    )
  }


  public Updatedetails() {
    // this.spinner.show();

    var entity = {
      'ID': this.id,
      'Departmentname': this.departmentname,
      'Description': this.description,
      'DepartmentImage': this.attachmentsurl[0],
      'LanguageID': this.languageid,
      'CategoryID':this.categoryid
    }
    this.docservice.UpdateDepartmentMaster_Web(entity).subscribe(data => {
      let res = data;

      Swal.fire('Success', 'Details Saved Successfully');
      this.spinner.hide();
      location.href = "#/DepartmentDash"

    })
  }

}

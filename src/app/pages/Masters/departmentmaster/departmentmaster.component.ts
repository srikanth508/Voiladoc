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
  public showphoto: any;
  public departmentlist: any;
  public departmentimage: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.activatedroute.params.subscribe(params => {
      debugger;

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
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }


  public onattachmentUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
      debugger
      let b = 'http://14.192.17.225' + a;

      this.showphoto.push(b)
      this.attachments.length = 0;
      debugger
    })
    // this.sendattachment();
  }


  public insertdetails() {

if(this.attachmentsurl==undefined||this.attachmentsurl.length==0)
{
  Swal.fire("Please Select Image");
}
else{
  this.spinner.show();
  var entity = {
    'Departmentname': this.departmentname,
    'Description': this.description,
    'DepartmentImage': this.attachmentsurl[0]
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
    debugger
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.departmentlist = data;
        var list = this.departmentlist.filter(x => x.id == this.id)
        this.departmentname = list[0].departmentname,
          this.description = list[0].description,
          this.attachmentsurl[0] = list[0].departmentImage,
          this.departmentimage = list[0].deptphoto

      }, error => {
      }
    )
  }


  public Updatedetails() {
    this.spinner.show();
    var entity = {
      'ID': this.id,
      'Departmentname': this.departmentname,
      'Description': this.description,
      'DepartmentImage': this.attachmentsurl[0],
      'LanguageID': this.languageid
    }
    this.docservice.UpdateDepartmentMaster_Web(entity).subscribe(data => {
      let res = data;
      Swal.fire('Success', 'Details Saved Successfully');
      this.spinner.hide();
      location.href = "#/DepartmentDash"

    })
  }

}

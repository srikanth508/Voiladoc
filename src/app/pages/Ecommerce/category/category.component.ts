import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from 'src/app/hello-doctor.service';
import { AngleLineOptions } from 'chart.js';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public categoryname: any;
  public description: any;
  public name: any;
  public paramID: any;
  public category: any;


  constructor(public docservice: HelloDoctorService, private _router: Router, private ActivatedRoute: ActivatedRoute) { }
  languageid: any;
  ngOnInit() {

    this.paramID = this.ActivatedRoute.snapshot.params['id'];
    this.GetCategoryById(this.paramID);
    debugger;

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage1(this.languageid);
  }


  labels
  public getlanguage1(LanguageID) {
    debugger;
    this.docservice.GetCategorydashboard_Labels(LanguageID).subscribe(
      data => {
        debugger;
        this.labels = data;
      },
      error => { }
    );
  }


  attachments = [];
  public onattachmentUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);

    }
    this.uploadattachments();
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }


  attachmentsurl = [];
  showphoto = [];
  public uploadattachments() {
    debugger;
    this.docservice.ItemsPhotosUpload(this.attachments).subscribe(res => {
      debugger;

      for (let i = 0; i < res.length; i++) {
        this.attachmentsurl.push(res[i]);
        let a = this.attachmentsurl[0].slice(2);
        debugger
        let b = 'http://14.192.17.225' + a;
        this.showphoto.push(b)
      }

      this.attachments.length = 0;
      debugger
    })

  }



  public insertdetail() {
    debugger;
    let entity = {
      CategoryName: this.categoryname,
      Description: this.description,
      PhotoURL: this.attachmentsurl[0]

    }
    this.docservice.InsertCategoryItem(entity).subscribe(x => {
      if (x >= 0) {
        debugger;
        Swal.fire("Saved Successfully");
        this._router.navigate(['/Categorydashboard']);
      }
      else {
        alert("something went wrong");
      }
    });
  }
  public GetCategoryById(paramID) {
    debugger
    this.docservice.GetCategoryById(paramID).subscribe((data) => {
      debugger;
      this.category = data;
      this.categoryname = data[0].categoryName;
      this.description = data[0].description;

    });
  }
  public update() {
    debugger;
    let entity = {
      Id: this.paramID,
      CategoryName: this.categoryname,
      Description: this.description,
    }
    this.docservice.UpdateCategory(entity).subscribe(data => {
      if (data != undefined) {
        debugger;
        this._router.navigate(['/Categorydashboard']);
      }
      else {
        alert("something went wrong");
      }
    });
  }


}

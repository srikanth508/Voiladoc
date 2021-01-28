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
  public dropzonelable: any;


  constructor(public docservice: HelloDoctorService, private _router: Router, private ActivatedRoute: ActivatedRoute) { }
  languageid: any;
  ngOnInit() {

    this.paramID = this.ActivatedRoute.snapshot.params['id'];
    this.GetCategoryById(this.paramID);


    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage1(this.languageid);


    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }


  labels
  public getlanguage1(LanguageID) {

    this.docservice.GetCategorydashboard_Labels(LanguageID).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );
  }


  attachments = [];
  public onattachmentUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd.addedFiles[0]);

    // }
    this.uploadattachments();
    Swal.fire('Added Successfully');
    abcd.length = 0;
  }


  attachmentsurl = [];
  showphoto = [];
  public uploadattachments() {

    this.docservice.ItemsPhotosUpload(this.attachments).subscribe(res => {

      for (let i = 0; i < res.length; i++) {
        this.attachmentsurl.push(res[i]);
        let a = this.attachmentsurl[0].slice(2);

        let b = 'https://maroc.voiladoc.org' + a;
        this.showphoto.push(b)
      }

      if (this.languageid == 1) {
        this.attachments.length = 0;
        Swal.fire('Added Successfully');
      }
      else {
        this.attachments.length = 0;
        Swal.fire('Ajouté avec succès');
      }
    })

  }



  public insertdetail() {

    let entity = {
      CategoryName: this.categoryname,
      Description: this.description,
      PhotoURL: this.attachmentsurl[0]

    }
    this.docservice.InsertCategoryItem(entity).subscribe(x => {
      if (x >= 0) {

        Swal.fire("Saved Successfully");
        this._router.navigate(['/Categorydashboard']);
      }
      else {
        alert("something went wrong");
      }
    });
  }
  public GetCategoryById(paramID) {

    this.docservice.GetCategoryById(paramID).subscribe((data) => {

      this.category = data;
      this.categoryname = data[0].categoryName;
      this.description = data[0].description;

    });
  }
  public update() {
    let entity = {
      Id: this.paramID,
      CategoryName: this.categoryname,
      Description: this.description,
    }
    this.docservice.UpdateCategory(entity).subscribe(data => {
      if (data != undefined) {

        this._router.navigate(['/Categorydashboard']);
        Swal.fire('Updated Successfully');
      }
      else {
        alert("something went wrong");
      }
    });
  }


}

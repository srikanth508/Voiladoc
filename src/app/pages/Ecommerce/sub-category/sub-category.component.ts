import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private route: ActivatedRoute) { }
  public ID: any;
  public SubcategoryList: any;
  public languageid: any;
  public dropzonelable:any;
  ngOnInit() {
   
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage1(this.languageid)
    this.GetItemCategory();
    this.route.params.subscribe(params => {
      this.ID = params['id'];


      this.docservice.GetSubcategory().subscribe(
        data => {
         
          let temp: any = data;
          this.SubcategoryLists = temp.filter(x => x.subCatID == this.ID);
          this.docservice.GetItemCategory().subscribe(
            data => {
             
              this.CategoryList = data;
            }, error => {
            }
          )
          this.CategoryID = this.SubcategoryLists[0].categoryID;
          this.SubcategoryName = this.SubcategoryLists[0].subacategoryName;
          this.Description = this.SubcategoryLists[0].description;

        }, error => {
        }
      )
    });

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
      // this.attachments.push(abcd[i]);
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

      this.attachments.length = 0;
     
    })

  }


  CategoryList
  public GetItemCategory() {
    this.docservice.GetItemCategory().subscribe(
      data => {
       
        this.CategoryList = data;
      }, error => {
      }
    )
  }

  CategoryID;
  SubcategoryLists;
  public GetCategoryID(evn) {
   
    this.CategoryID = evn.target.value;
  }


  SubcategoryName;
  Description;
  public InsertSubcategory() {
   
    let Entity = {
      'ItemCategoryID': this.CategoryID,
      'SubacategoryName': this.SubcategoryName,
      'Description': this.Description,
      'PhotoURL': this.attachmentsurl[0]
    }
    this.docservice.InsertSubcategory(Entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Saved Successfully');
        location.href = '#/SubCategoryDash';
      }
    })
  }
  public UpdateSubcategory() {
   
    let Entity = {
      'ID': this.ID,
      'ItemCategoryID': this.CategoryID,
      'SubacategoryName': this.SubcategoryName,
      'Description': this.Description,
    }
    this.docservice.UpdateSubcategory(Entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Updated Successfully');
        location.href = '#/SubCategoryDash';
      }
    })
  }

}



import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { Route, Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-sub-category-dash',
  templateUrl: './sub-category-dash.component.html',
  styleUrls: ['./sub-category-dash.component.css']
})
export class SubCategoryDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, public router: Router) { }


  public term: any;
  CategoryList: any;
  languageid;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage1(this.languageid)
    this.GetSubcategory();

    this.docservice.GetItemCategory().subscribe(
      data => {
       
        let temp: any = data;
        this.CategoryList = temp;
      }, error => {
      }
    )
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


  SubcategoryLists;
  FilteredSubcategoryLists;
  public GetSubcategory() {
    this.docservice.GetSubcategory().subscribe(
      data => {
       
        this.SubcategoryLists = data;
        this.FilteredSubcategoryLists = this.SubcategoryLists;
      }, error => {
      }
    )
  }


  CategoryID: any;
  public GetCategoryID(evn) {
   
    if(evn.target.value!=0)
    {
      this.CategoryID = evn.target.value;
      this.FilteredSubcategoryLists = this.SubcategoryLists.filter(x => x.categoryID == this.CategoryID);
    }
    else{
      this.GetSubcategory();
    }
  }



  public Edit(evn) {
   
    let ID = evn;
    this.router.navigate(['/SubCategory', evn]);
  }
  public DeleteSubcategory(id) {
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Sub Category!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteSubcategory(id).subscribe(res => {
          let test = res;
          this.GetSubcategory();
        })
        Swal.fire(
          'Deleted!',
          'Subcategory has been deleted.',
          'success'
        )
      }
      else {
        this.GetSubcategory();
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private ActivatedRoute: ActivatedRoute) { }


  public paramID: any;
  public languageid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage1(this.languageid)
    this.GetItemCategory();
    this.paramID = this.ActivatedRoute.snapshot.params['id'];
    this.GetInvByID(this.paramID);
  }


  labels
  public getlanguage1(LanguageID) {

    this.docservice.ProductsPage_Labels(LanguageID).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );
  }



  public category: any;
  public categoryID: any;
  public subCategoryID: any;
  public item: any;
  SubCatID: any;
  public GetInvByID(paramID) {
    this.docservice.GetInvByID(paramID).subscribe((data) => {

      this.category = data;
      this.CategoryID = data[0].categoryID;
      this.SubCategoryID = data[0].subCategoryID;
      this.docservice.GetSubcategory().subscribe(
        data => {

          this.SubcategoryLists = data.filter(x => x.categoryID == data[0].categoryID);
        }, error => {
        }
      )
      this.docservice.GetInventoryByID(data[0].categoryID, data[0].subCategoryID).subscribe(
        data => {

          this.InventoryLists = data;
        }, error => {
        }
      )

      this.item = data[0].item;
      this.Quantity = data[0].quantity;
    });
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
    this.docservice.GetSubcategory().subscribe(
      data => {

        this.SubcategoryLists = data.filter(x => x.categoryID == this.CategoryID);
      }, error => {
      }
    )
  }

  
  SubCategoryID;
  InventoryLists;
  public GetSubCategoryID(evn) {
    
    this.SubCategoryID = evn.target.value;

    this.docservice.GetInventoryByID(this.CategoryID, this.SubCategoryID).subscribe(
      data => {
        
        this.InventoryLists = data;
      }, error => {
      }
    )
  }

  ItemsID
  public GetItemID(evn) {
    this.ItemsID = evn.target.value;

  }

  Quantity
  public insertdetails() {
    
    let Entity = {
      'CategoryID': this.CategoryID,
      'SubCategoryID': this.SubCategoryID,
      'Item': this.ItemsID,
      'Quantity': this.Quantity
    }
    
    this.docservice.InsertInventory(Entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Saved Successfully');
        location.href = '#/InventoryDash';
      }
    })
  }



  public Update() {
    
    let Entity = {
      'ID': this.paramID,
      'CategoryID': this.CategoryID,
      'SubCategoryID': this.SubCategoryID,
      'Item': this.item,
      'Quantity': this.Quantity
    }
    
    this.docservice.UpdateInventory(Entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Updated Successfully');
        location.href = '#/InventoryDash';
      }
    })

  }


}

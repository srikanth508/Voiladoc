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
    debugger;
    this.docservice.ProductsPage_Labels(LanguageID).subscribe(
      data => {
        debugger;
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
    debugger
    this.docservice.GetInvByID(paramID).subscribe((data) => {
      debugger;
      this.category = data;
      this.categoryID = data[0].categoryID;
      this.SubCatID = data[0].subCategoryID;
      this.docservice.GetSubcategory().subscribe(
        data => {
          debugger
          this.SubcategoryLists = data.filter(x => x.categoryID == data[0].categoryID);
        }, error => {
        }
      )
      this.docservice.GetInventoryByID(data[0].categoryID, data[0].subCategoryID).subscribe(
        data => {
          debugger
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
        debugger
        this.CategoryList = data;
      }, error => {
      }
    )
  }


  CategoryID;
  SubcategoryLists;
  public GetCategoryID(evn) {
    debugger;
    this.CategoryID = evn.target.value;
    this.docservice.GetSubcategory().subscribe(
      data => {
        debugger
        this.SubcategoryLists = data.filter(x => x.categoryID == this.CategoryID);
      }, error => {
      }
    )
  }

  SubCategoryID;
  InventoryLists;
  public GetSubCategoryID(evn) {
    debugger;
    this.SubCategoryID = evn.target.value;

    this.docservice.GetInventoryByID(this.CategoryID, this.SubCategoryID).subscribe(
      data => {
        debugger
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
    debugger;
    let Entity = {
      'ID': this.paramID,
      'CategoryID': this.categoryID,
      'SubCategoryID': this.subCategoryID,
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

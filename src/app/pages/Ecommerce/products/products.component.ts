import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  ngOnInit() {
    this.GetItemCategory();
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
  public GetSubCategoryID(evn) {
    this.SubCategoryID = evn.target.value;
  }


  ItemName;
  ItemDescription;
  ProductCode;
  Price;
  Quantity;
  public insertdetails() {
    let Entity = {
      'CategoryID': this.CategoryID,
      'SubcategoryID': this.SubCategoryID,
      'ItemName': this.ItemName,
      'ItemDescription': this.ItemDescription,
      'ProductCode': this.ProductCode,
      'Price': this.Price,
      'Quantity': this.Quantity
    }

    this.docservice.InsertItems(Entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Saved Successfully');
        location.href = '#/ProductsDash';
      }
    })
  }

}

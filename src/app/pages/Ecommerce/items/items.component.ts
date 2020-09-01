import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from 'src/app/hello-doctor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  productname: any;
  categoryID: any;
  subcategoryID: any;
  productDescription: any;
  productCode: any;
  productprice: any;
  quantity: any;
  photourl: any;
  Categorylist: any;
  Subcategorylist: any;
  ID: any
  constructor(public service: HelloDoctorService, private _router: Router, private route: ActivatedRoute) { }
  languageid: any;
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage1(this.languageid)
    this.getCategory();
    this.route.params.subscribe(params => {
      this.ID = params['id'];
      this.service.GetItems().subscribe(
        data => {
          debugger
          let temp: any = data;
          let temp1: any = temp.filter(x => x.id == this.ID);
          this.service.GetItemCategory().subscribe(data => {
            debugger;
            this.Categorylist = data;
          })
          this.CategoryID = temp1[0].categoryID;
          this.service.GetsubcategoryByCategoryID(this.CategoryID).subscribe(data => {
            this.Subcategorylist = data;
          })
          this.SubcategoryID = temp1[0].subcategoryID;
          this.productname = temp1[0].itemName;
          this.productDescription = temp1[0].itemDescription;
          this.productCode = temp1[0].productCode;
          this.productprice = temp1[0].productPrice;


        }, error => {
        }
      )
    });
  }


  labels
  public getlanguage1(LanguageID) {
    debugger;
    this.service.ProductsPage_Labels(LanguageID).subscribe(
      data => {
        debugger;
        this.labels = data;
      },
      error => { }
    );
  }
  CategoryID;
  SubcategoryID;
  insertdetail() {

    debugger;
    let entity = {
      productname: this.productname,
      CategoryID: this.CategoryID,
      SubcategoryID: this.SubcategoryID,
      productDescription: this.productDescription,
      ProductCode: this.productCode,
      productprice: this.productprice,
      Quantity: 10,
      photourl: 'NULL'
    };
    debugger;
    this.service.insertItems(entity).subscribe(data => {
      if (data >= 0) {
        debugger;
        this.inserthspphotos(data);
        location.href = '#/ItemMaster';
        //this._router.navigate(['/ItemMaster']);
      }
      else {
        alert("something went wrong");
      }
    })
  }

  getCategory() {
    debugger;
    this.service.GetItemCategory().subscribe(data => {
      debugger;
      this.Categorylist = data;
    })
  }

  getCategoryID(eve) {
    let cid = eve.target.value
    debugger;
    this.service.GetsubcategoryByCategoryID(cid).subscribe(data => {
      this.Subcategorylist = data;
    })
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
    this.service.ItemsPhotosUpload(this.attachments).subscribe(res => {
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


  public inserthspphotos(ID) {
    debugger
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      let entity = {
        'ItemsID': ID,
        'PhotoUrl': this.attachmentsurl[i]
      }
      this.service.Insert_ItemPhotos(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }
      })
    }
    let Entity = {
      'ID': ID,
      'PhotoURL': this.attachmentsurl[0]
    }

    this.service.UpdateProductImages(Entity).subscribe(data => {
      debugger
      if (data != 0) {
        Swal.fire('Saved Sucessfully')
      }
    })
  }


  Updatedetail() {
    debugger;
    let entity = {
      'ID': this.ID,
      'ProductName': this.productname,
      'CategoryID': this.CategoryID,
      'SubcategoryID': this.SubcategoryID,
      'ProductDescription': this.productDescription,
      'ProductCode': this.productCode,
      'ProductPrice': this.productprice
    };
    debugger;
    this.service.UpdateProducts(entity).subscribe(data => {
      if (data != 0) {
        Swal.fire('Updated Successfully');
        location.href = '#/ItemMaster';
      }
    })
  }


}

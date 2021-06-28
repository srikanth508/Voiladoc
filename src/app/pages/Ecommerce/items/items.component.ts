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
  dropzonelable: any;
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

          let temp: any = data;
          let temp1: any = temp.filter(x => x.id == this.ID);
          this.service.GetItemCategory().subscribe(data => {

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

    this.CategoryID = 0;
    this.SubcategoryID = 0;

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }


  labels
  public getlanguage1(LanguageID) {

    this.service.ProductsPage_Labels(LanguageID).subscribe(
      data => {

        this.labels = data;
      },
      error => { }
    );
  }
  CategoryID;
  SubcategoryID;
  insertdetail() {


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

    this.service.insertItems(entity).subscribe(data => {
      if (data >= 0) {

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

    this.service.GetItemCategory().subscribe(data => {

      this.Categorylist = data;
    })
  }

  getCategoryID(eve) {
    let cid = eve.target.value

    this.service.GetsubcategoryByCategoryID(cid).subscribe(data => {
      this.Subcategorylist = data;
    })
  }

  public duummattchmenturl = [];



  attachments = [];
  public onattachmentUpload(abcd) {
    
    this.duummattchmenturl = [];
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
    
    this.service.ItemsPhotosUpload(this.attachments).subscribe(res => {
      
       for (let i = 0; i < res.length; i++) {
      this.attachmentsurl.push(res[i]);
      this.duummattchmenturl.push(res[i]);

      let a = this.duummattchmenturl[0].slice(2);
      // let a = this.duummattchmenturl[0].slice(2);
      let b = 'https://maroc.voiladoc.org' + a;
      this.showphoto.push(b)
       }
      
      this.attachments.length = 0;

    })

  }


  public inserthspphotos(ID) {

    for (let i = 0; i < this.attachmentsurl.length; i++) {
      let entity = {
        'ItemsID': ID,
        'PhotoUrl': this.attachmentsurl[i]
      }
      this.service.Insert_ItemPhotos(entity).subscribe(data => {

        if (data != 0) {

        }
      })
    }
    let Entity = {
      'ID': ID,
      'PhotoURL': this.attachmentsurl[0]
    }

    this.service.UpdateProductImages(Entity).subscribe(data => {

      if (data != 0) {
        Swal.fire('Saved Sucessfully')
      }
    })
  }


  Updatedetail() {
  
    let entity = {
      'ID': this.ID,
      'ProductName': this.productname,
      'ProductDescription': this.productDescription,
      'ProductCode': this.productCode,
      'ProductPrice': this.productprice,
      'CategoryID': this.CategoryID,
      'SubcategoryID': this.SubcategoryID,
    };
    this.service.UpdateProducts(entity).subscribe(data => {
      
      Swal.fire('Updated Successfully');
      location.href = '#/ItemMaster';
      // if (data != 0) {
      
      // }
    })
  }


}

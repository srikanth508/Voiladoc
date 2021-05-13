import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inventory-dash',
  templateUrl: './inventory-dash.component.html',
  styleUrls: ['./inventory-dash.component.css']
})
export class InventoryDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public term: any;
  CategoryList: any;
  languageid: any;
  ngOnInit() {

    this.GetInventory();
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage1(this.languageid)

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
   
    this.docservice.ProductsPage_Labels(LanguageID).subscribe(
      data => {
       
        this.labels = data;
      },
      error => { }
    );
  }


  SubcategoryLists;
  InventoryList;
  FilteredInventoryList;
  public GetInventory() {
    this.docservice.GetInventory().subscribe(
      data => {
       
        this.InventoryList = data;
        this.FilteredInventoryList = this.InventoryList;
      }, error => {
      }
    )
  }


  AppointmentID;
  showimages;
  public nophoto: any;
  public GetIllnessPhotos(even) {
   
    this.AppointmentID = even;

    this.docservice.GetProductsImagesByID(this.AppointmentID).subscribe(
      data => {
       
        this.showimages = data;
        if (this.showimages.length == 0) {
          this.nophoto = 1
        }
        else if (this.showimages.length != 0) {
          this.nophoto = 0
        }

      }, error => {
      }
    )

  }



  public InventoryID: any;
  public Edit(evn) {
   
    this.InventoryID = evn;

  }



  catid
  SubCategoryList
  public GetCategoryID(event) {
    this.catid = event.target.value;

    if (this.catid == 0) {
      this.docservice.GetInventory().subscribe(
        data => {
         
          let temp: any = data;
          this.FilteredInventoryList = this.InventoryList;
        }, error => {
        }
      )
    }
    else {
      this.docservice.GetInventory().subscribe(
        data => {
         
          let temp: any = data;
          this.FilteredInventoryList = this.InventoryList.filter(x => x.categoryID == this.catid);
        }, error => {
        }
      )
    }

    this.docservice.GetSubcategory().subscribe(
      data => {
       
        let temp: any = data;
        this.SubCategoryList = temp.filter(x => x.categoryID == this.catid);
      }, error => {
      }
    )
  }


  scatid
  public GetSubCategoryID(event) {
    this.scatid = event.target.value;
    if (this.scatid == 0) {
      this.docservice.GetInventory().subscribe(
        data => {
         
          let temp: any = data;
          this.FilteredInventoryList = this.InventoryList.filter(x => x.categoryID == this.catid);
        }, error => {
        }
      )
    }
    else {
      this.docservice.GetInventory().subscribe(
        data => {
         
          let temp: any = data;
          this.FilteredInventoryList = this.InventoryList.filter(x => x.categoryID == this.catid && x.subCategoryID == this.scatid);
        }, error => {
        }
      )
    }

  }




  public DeleteInventory(id)
  {
    if(this.languageid==1)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to This Inventory!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteInventory(id).subscribe(res => {
            let test = res;
            this.ngOnInit()
          })
          Swal.fire(
            'Deleted!',
            'Inventory has been deleted.',
            'success'
          )
        }
        else {
          this.ngOnInit()
        }
      })
    }else{

      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "You Want to This Inventory!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Non'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteInventory(id).subscribe(res => {
            let test = res;
            this.ngOnInit()
          })
          Swal.fire(
            'Supprimé!',
            'L inventaire a été supprimé.',
            'success'
          )
        }
        else {
          this.ngOnInit()
        }
      })


    }
  
  }



}

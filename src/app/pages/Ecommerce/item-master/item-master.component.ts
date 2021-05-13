import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from 'src/app/hello-doctor.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {
  public itemlist: any;
  constructor(public service: HelloDoctorService, private _router: Router) { }


  public term: any;
  public CategoryList: any;

  public languageid: any;
  ngOnInit() {
    this.getitem();

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage1(this.languageid)

    this.service.GetItemCategory().subscribe(
      data => {

        let temp: any = data;
        this.CategoryList = temp;
      }, error => {
      }
    )
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
  


  Filtereditemlist: any;
  getitem() {
    this.service.GetItems().subscribe(data => {

      let temp: any = data;
      this.itemlist = temp;
      this.Filtereditemlist = this.itemlist;
    })
  }


  catid
  SubCategoryList
  public GetCategoryID(event) {
    this.catid = event.target.value;

    if (this.catid == 0) {
      this.service.GetItems().subscribe(
        data => {

          let temp: any = data;
          this.Filtereditemlist = this.itemlist;
        }, error => {
        }
      )
    }
    else {
      this.service.GetItems().subscribe(
        data => {

          let temp: any = data;
          this.Filtereditemlist = this.itemlist.filter(x => x.categoryID == this.catid);
        }, error => {
        }
      )
    }

    this.service.GetSubcategory().subscribe(
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
      this.service.GetItems().subscribe(
        data => {

          let temp: any = data;
          this.Filtereditemlist = this.itemlist.filter(x => x.categoryID == this.catid);
        }, error => {
        }
      )
    }
    else {
      this.service.GetItems().subscribe(
        data => {

          let temp: any = data;
          this.Filtereditemlist = this.itemlist.filter(x => x.categoryID == this.catid && x.subcategoryID == this.scatid);
        }, error => {
        }
      )
    }



  }


  AppointmentID;
  showimages;
  public nophoto: any;
  public GetIllnessPhotos(even) {
    this.AppointmentID = even;

    this.service.GetProductsImagesByID(this.AppointmentID).subscribe(
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


  public Edit(evn) {

    let ID = evn;
    this._router.navigate(['/items', evn]);
  }

  Deleteitem(id) {

    this.service.deleteItems(id).subscribe(data => {

      if (data >= 0) {

        // this._router.navigate(['/ItemMaster']);
        // location.reload();
        if(this.languageid==1)
        {
          Swal.fire('Deleted Successfully');
          this.getitem();
        }
        else{
          Swal.fire('Supprimé avec succès ');
          this.getitem();
        }
       
      }
      else {
        alert("something went wrong");
        this.getitem();
      }
    })
  }

}

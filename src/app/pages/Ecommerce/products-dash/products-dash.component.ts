import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';

@Component({
  selector: 'app-products-dash',
  templateUrl: './products-dash.component.html',
  styleUrls: ['./products-dash.component.css']
})
export class ProductsDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }


  public term: any;
  ngOnInit() {

    this.GetSubcategory();

  }


  SubcategoryLists
  public GetSubcategory() {
    this.docservice.GetSubcategory().subscribe(
      data => {
       
        this.SubcategoryLists = data;
      }, error => {
      }
    )
  }

}

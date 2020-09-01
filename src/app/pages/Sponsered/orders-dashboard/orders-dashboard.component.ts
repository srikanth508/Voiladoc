import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
@Component({
  selector: 'app-orders-dashboard',
  templateUrl: './orders-dashboard.component.html',
  styleUrls: ['./orders-dashboard.component.css']
})
export class OrdersDashboardComponent implements OnInit {
  options: any
  CategoryList: any;
  value;
  term;
  constructor(public docservice: HelloDoctorService) { }
  languageid
  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage1(this.languageid);

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.GetOrders();
    this.docservice.GetItemCategory().subscribe(
      data => {
        debugger
        let temp: any = data;
        this.CategoryList = temp;
      }, error => {
      }
    )

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
  Orderslist
  public GetOrders() {
    debugger
    this.docservice.GetProducts_cart().subscribe(
      data => {
        debugger
        let temp: any = data;
        this.Orderslist = temp;
      }, error => {
      }
    )
  }
  startdate
  enddate
  selectedDate(data) {
    debugger
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1];
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.docservice.GetProducts_cartByDate(this.startdate, this.enddate).subscribe(
      data => {
        debugger
        let temp: any = data;
        this.Orderslist = temp;
      }, error => {
      }
    )

  }
  catid
  SubCategoryList
  public GetCategoryID(event) {
    this.catid = event.target.value;

    this.docservice.GetProducts_cart().subscribe(
      data => {
        debugger
        let temp: any = data;
        this.Orderslist = temp.filter(x => x.categoryID == this.catid);
      }, error => {
      }
    )
    this.docservice.GetSubcategory().subscribe(
      data => {
        debugger
        let temp: any = data;
        this.SubCategoryList = temp.filter(x => x.categoryID == this.catid);
      }, error => {
      }
    )
  }
  scatid
  public GetSubCategoryID(event) {
    this.scatid = event.target.value;

    this.docservice.GetProducts_cart().subscribe(
      data => {
        debugger
        let temp: any = data;
        this.Orderslist = temp.filter(x => x.categoryID == this.catid && x.subCategoryID == this.scatid);
      }, error => {
      }
    )

  }

}

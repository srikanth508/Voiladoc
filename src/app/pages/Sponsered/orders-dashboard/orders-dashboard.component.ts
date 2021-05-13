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
  Orderslist
  public GetOrders() {
   
    this.docservice.GetProducts_cart().subscribe(
      data => {
       
        let temp: any = data;
        this.Orderslist = temp;
      }, error => {
      }
    )
  }
  startdate
  enddate
  selectedDate(data) {
   
    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1];
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])

    this.docservice.GetProducts_cartByDate(this.startdate, this.enddate).subscribe(
      data => {
       
        let temp: any = data;
        this.Orderslist = temp;
      }, error => {
      }
    )

  }
  catid
  SubCategoryList
  public GetCategoryID(event) {
    if(event.target.value!=0)
    {
      this.catid = event.target.value;

      this.docservice.GetProducts_cart().subscribe(
        data => {
         
          let temp: any = data;
          this.Orderslist = temp.filter(x => x.categoryID == this.catid);
        }, error => {
        }
      )
      this.docservice.GetSubcategory().subscribe(
        data => {
         
          let temp: any = data;
          this.SubCategoryList = temp.filter(x => x.categoryID == this.catid);
        }, error => {
        }
      )
    }
   else
   {
    this.GetOrders()
   }
  }
  scatid
  public GetSubCategoryID(event) {
    if(event.target.value!=0)
    {
      this.scatid = event.target.value;

      this.docservice.GetProducts_cart().subscribe(
        data => {
         
          let temp: any = data;
          this.Orderslist = temp.filter(x => x.categoryID == this.catid && x.subCategoryID == this.scatid);
        }, error => {
        }
      )
    }
    else
    {
      this.GetOrders();
    }
  

  }

}

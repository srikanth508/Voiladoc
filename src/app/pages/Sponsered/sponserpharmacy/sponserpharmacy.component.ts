import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";


@Component({
  selector: 'app-sponserpharmacy',
  templateUrl: './sponserpharmacy.component.html',
  styleUrls: ['./sponserpharmacy.component.css']
})
export class SponserpharmacyComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public pharmacylist: any;
  public pharmacyid: any;
  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  public pharmacylist1: any;
  public pharmacydd={}
  public labels:any;
  public languageid:any;
  ngOnInit() {

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    debugger
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();
    debugger
    this.languageid = localStorage.getItem('LanguageID');
    // this.docservice.GetSponsoredPharmacyForAdmin().subscribe(
    //   data => {
    //     debugger
    //     this.pharmacylist = data;
    //   }, error => {
    //   }
    // )
    this.getlanguage();
    this.getpharmacydetails();
 
  }

  public getlanguage()
  {
    this.docservice.GetAdmin_Sponsored_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel=this.labels[0].select;
      }, error => {
      }
    )  
  }
  SelectLabel


public getpharmacydetails(){
  
  this.docservice.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
    data => {
      debugger
      this.pharmacylist1 = data;
      this.pharmacydd = {
        singleSelection: true,
        idField: 'id',
        textField: 'pharmacyName',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    }, error => {
    }
  )
}



  public GetPharmacyID(item2:any)
  {
    debugger
    this.pharmacyid=item2.id;
  }
  public insertdetails() {
    debugger
    if(this.pharmacyid==undefined)
    {
      Swal.fire("Please Select Pharmacy");
    }
    else{
      var entity = {
        'PharmacyID': this.pharmacyid,
        'SDate': this.startdate,
        'EDate': this.enddate
      }
      this.docservice.InsertSponsoredPharmacy(entity).subscribe(data => {
        debugger
        if (data != 0) {
          Swal.fire('Completed', 'Details saved successfully', 'success');
    
        }
      })
    }
  }
  public clear()
  {
    this.startdate='';
    this.enddate='';
  }
public GetEnddate()
{
  this.enddate='';
}
}

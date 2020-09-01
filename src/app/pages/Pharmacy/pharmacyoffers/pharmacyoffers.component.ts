import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

@Component({
  selector: 'app-pharmacyoffers',
  templateUrl: './pharmacyoffers.component.html',
  styleUrls: ['./pharmacyoffers.component.css']
})
export class PharmacyoffersComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public pharmacyid: any;
  public offername: any;
  public descripton: any;
  public startdate: any;
  public enddate: any;
  public offer: any;
  public offerid: any;
  public todaydate: any;
  public CurrentTime: any;

  public attachments = [];
  public attachmentsurl = [];
  public languageid:any;
  public labels:any;
  ngOnInit() {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    debugger
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();
    this.pharmacyid = localStorage.getItem('pharmacyid');
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
  }
  public insertdetails() {
    debugger
    var entity = {
      'PharmacyID': this.pharmacyid,
      'OfferName': this.offername,
      'Description': this.descripton,
      'SDate': this.startdate,
      'EDate': this.enddate,
      'Offer': this.offer
    }
    this.docservice.InsertPharmacyOffers(entity).subscribe(data => {
      debugger
      if (data != 0) {
        this.offerid = data;
        for (let i = 0; i < this.attachmentsurl.length; i++) {
          var entity = {
            'PharmacyID': this.pharmacyid,
            'PharmacyOfferID': this.offerid,
            'PhotoURL': this.attachmentsurl[i]
          }
          this.docservice.InsertPharmacyOfferPhotos(entity).subscribe(data => {
            debugger
            if (data != 0) {
              Swal.fire('Added Successfully.');
            
            }
          })
        }
        Swal.fire('Added Successfully.');
        this.clear();
      }
    })

  }
  public getlanguage()
  {
    this.docservice.GetAdmin_PharmacyLoginOffers_Lable(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    ) 
  }

  public onattachmentUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.AttachmentsUpload(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      this.attachments.length = 0;
      debugger
    })
    // this.sendattachment();
  }

public clear()
{
  this.offername='';
  this.descripton='';
  this.startdate='';
  this.enddate='';
  this.offername='';
  this.offer='';

}
 public GetDateClear()
 {
   this.enddate="";
 }
}

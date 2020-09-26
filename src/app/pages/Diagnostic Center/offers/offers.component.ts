import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public diagnosticid: any;
  public offername: any;
  public descripton: any;
  public testid: any;
  public sdate: any;
  public edate: any;
  public offer: any;
  public diagnosticlist: any;
  public diagnosticofferid: any;

  public attachments = [];
  public attachmentsurl = [];
  public todaydate: any;
  public CurrentTime: any;
  public languageid: any;
  public labels: any;
  dropzonelable: any;


  ngOnInit() {

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    debugger
    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();

    this.diagnosticid = localStorage.getItem('diagnosticid');
    this.getdiagnostictestmaster();
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }


  public getlanguage() {
    this.docservice.GetAdmin_PharmacyLoginOffers_Lable(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }

  public getdiagnostictestmaster() {
    debugger
    this.docservice.GetDiagnosticTestMaster().subscribe(
      data => {
        debugger
        this.diagnosticlist = data;
      }, error => {
      }
    )
  }
  public GetTestID(even) {
    debugger
    this.testid = even.target.value;

  }
  public insertdetails() {
    debugger
    var entity = {
      'DiagnosticCenterID': this.diagnosticid,
      'OfferName': this.offername,
      'Description': this.descripton,
      'TestID': this.testid,
      'SDate': this.sdate,
      'EDate': this.edate,
      'Offer': this.offer
    }

    this.docservice.InsertDiagnosticCenterOffers(entity).subscribe(data => {
      debugger
      if (data != 0) {
        this.diagnosticofferid = data;
        for (let i = 0; i < this.attachmentsurl.length; i++) {
          var entity = {
            'DiagnosticCenterID': this.diagnosticid,
            'DiagnosticOfferID': this.diagnosticofferid,
            'PhotoURL': this.attachmentsurl[i]
          }
          this.docservice.InsertDiagnosticCenterOfferPhotos(entity).subscribe(data => {
            debugger
            if (data != 0) {
              Swal.fire('Added Successfully.');
              this.clear();
            }
          })
        }
        Swal.fire('Added Successfully.');
        this.clear();

      }
    })
  }
  public onattachmentUpload(abcd) {
    debugger
    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }
  public uploadattachments() {
    this.docservice.DiagnosticPhotosUpload(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      this.attachments.length = 0;
      debugger
    })
    // this.sendattachment();
  }
  public clear() {
    this.offername = '';
    this.descripton = '';
    this.sdate = '';
    this.edate = '';
    this.offer = '';
  }
  public GetClearDate() {
    this.edate = "";
  }
}

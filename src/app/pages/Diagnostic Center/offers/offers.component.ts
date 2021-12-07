import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

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
  diadd = {}
  searchlable: any;
  SelectLabel: any;
  showbit: any;
  ngOnInit() {

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();

    this.diagnosticid = localStorage.getItem('diagnosticid');

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()

    this.getdiagnostictestmaster();
    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }

    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbit = 0;
      }
      else if (this.id != undefined) {
        this.showbit = 1;
        this.docservice.GetDiagnosticOfferByDiagnosticID(this.diagnosticid).subscribe(data => {
          var offers = data;
          var list = offers.filter(x => x.id == this.id);
          this.descripton = list[0].description,
            this.offer = list[0].offer,
            this.offername = list[0].offerName,
            this.sdate = list[0].sdate,
            this.edate = list[0].edate,
            this.attachmentsurl[0] = list[0].photo

        })
      }
    }
    )
  }


  public getlanguage() {
    this.docservice.GetAdmin_PharmacyLoginOffers_Lable(this.languageid).subscribe(
      data => {
        this.labels = data;
        this.searchlable = this.labels[0].search,
          this.SelectLabel = this.labels[0].select
      }, error => {
      }
    )
  }


  public getdiagnostictestmaster() {
    this.docservice.GetDiagnosticTestMaster().subscribe(
      data => {

        this.diagnosticlist = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.searchlable,
        };

      }, error => {
      }
    )
  }
  public GetTestID(item1: any) {

    this.testid = item1.id;

  }
  public insertdetails() {

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

      if (data != 0) {
        this.diagnosticofferid = data;
        for (let i = 0; i < this.attachmentsurl.length; i++) {
          var entity = {
            'DiagnosticCenterID': this.diagnosticid,
            'DiagnosticOfferID': this.diagnosticofferid,
            'PhotoURL': this.attachmentsurl[0]
          }
          this.docservice.InsertDiagnosticCenterOfferPhotos(entity).subscribe(data => {

            if (data != 0) {

              if (this.languageid == 1) {
                Swal.fire('Added Successfully');

                this.clear();
                this.attachmentsurl.length = 0;
              }
              else if (this.languageid == 6) {
                Swal.fire('Mis à jour avec Succés');

                this.attachmentsurl.length = 0;
                this.clear();
              }
            }
          })
        }
        if (this.languageid == 1) {
          Swal.fire('Added Successfully');
          location.href = "#/Offersdash"
          this.clear();
        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec Succés');
          location.href = "#/Offersdash"
          this.clear();
        }

      }
    })
  }

  public onattachmentUpload(abcd) {
    this.dummattchmenturl = [];
    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec Succés');
      abcd.length = 0;
    }

  }
  public dummattchmenturl = [];
  public showphoto = [];


  public uploadattachments() {
    this.attachmentsurl.length = 0;
    this.docservice.DiagnosticPhotosUpload(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);

      this.dummattchmenturl.push(res);
      let a = this.dummattchmenturl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showphoto.push(b)
      this.attachments.length = 0;
      this.attachments.length = 0;

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





  id: any;


  public updatedetails() {
debugger
    var sdate = this.docservice.Getyearmonthformat(this.sdate);
    var edate = this.docservice.Getyearmonthformat(this.edate);
    debugger
    var entity = {
      'ID': this.id,
      'OfferName': this.offername,
      'Description': this.descripton,
      'TestID': this.testid,
      'SDate': sdate,
      'EDate': edate,
      'Offer': this.offer
    }
    this.docservice.UpdateDiagnosticCenterOffers(entity).subscribe(data => {
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'DiagnosticOfferID': this.id,
        'PhotoURL': this.attachmentsurl[0]
      }
      this.docservice.UpdateDiagnosticCenterOfferPhotos(entity).subscribe(data => {

        if (data != 0) {

          if (this.languageid == 1) {
            Swal.fire('Added Successfully');

            this.clear();
            this.attachmentsurl.length = 0;
          }
          else if (this.languageid == 6) {
            Swal.fire('Mis à jour avec Succés');

            this.attachmentsurl.length = 0;
            this.clear();
          }
        }
      })

      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');
        location.href = "#/Offersdash"
        this.clear();
      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec Succés');
        location.href = "#/Offersdash"
        this.clear();
      }


    })
  }
}

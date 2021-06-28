import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-pharmacyoffers',
  templateUrl: './pharmacyoffers.component.html',
  styleUrls: ['./pharmacyoffers.component.css']
})
export class PharmacyoffersComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

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
  public languageid: any;
  public labels: any;
  dropzonelable: any;
  id: any;
  showbutton: any;

  ngOnInit() {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);



    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();
    this.pharmacyid = localStorage.getItem('pharmacyid');
    this.languageid = localStorage.getItem('LanguageID');


    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else {
        this.showbutton = 1;
        this.getpharmacyoffersbypharmacyid();
        this.phrmayphotos()
      }

    }
    )







    this.getlanguage()
    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }

  offerslist: any;

  public getpharmacyoffersbypharmacyid() {

    this.docservice.GetPharmacyOfferByPharmacyID(this.pharmacyid).subscribe(
      data => {
        
        this.offerslist = data;
        var list = this.offerslist.filter(x => x.id == this.id)
        this.offername = list[0].offerName,
          this.descripton = list[0].description,
          this.startdate = list[0].sdate,
          this.enddate = list[0].edate,
          this.offer = list[0].offer
        
      }, error => {
      }
    )
  }





  public insertdetails() {

    var entity = {
      'PharmacyID': this.pharmacyid,
      'OfferName': this.offername,
      'Description': this.descripton,
      'SDate': this.startdate,
      'EDate': this.enddate,
      'Offer': this.offer
    }
    this.docservice.InsertPharmacyOffers(entity).subscribe(data => {

      if (data != 0) {
        this.offerid = data;
        for (let i = 0; i < this.attachmentsurl.length; i++) {
          var entity = {
            'PharmacyID': this.pharmacyid,
            'PharmacyOfferID': this.offerid,
            'PhotoURL': this.attachmentsurl[0]
          }
          this.docservice.InsertPharmacyOfferPhotos(entity).subscribe(data => {

            if (data != 0) {
              if (this.languageid == 1) {

                Swal.fire('Added Successfully.');
              }
              else {
                Swal.fire('Enregistré');

              }

            }
          })
        }
        if (this.languageid == 1) {
          Swal.fire('Added Successfully.');
          location.href = "#/OffersDashboard"
          this.clear();
        }
        else if (this.languageid == 6) {
          Swal.fire('Enregistré.');
          location.href = "#/OffersDashboard"
          this.clear();
        }

      }
    })

  }



  public Updatedetails() {
    var entity = {
      'ID': this.id,
      'PharmacyID': this.pharmacyid,
      'OfferName': this.offername,
      'Description': this.descripton,
      'SDate': this.startdate,
      'EDate': this.enddate,
      'Offer': this.offer
    }
    this.docservice.UpdatePharmacyOffers(entity).subscribe(data => {

      if (data != 0) {
        this.offerid = data;
        if (this.languageid == 1) {
          this.updatephotos()
          Swal.fire('Added Successfully.');
          
          location.href = "#/OffersDashboard"
          this.clear();
        }
        else if (this.languageid == 6) {
          this.updatephotos()
          Swal.fire('Enregistré.');
          location.href = "#/OffersDashboard"
          this.clear();
        }
      }
    })

  }
  pharmcyphotos: any;

  public phrmayphotos() {
    this.docservice.GetPharmacyOffersPhotos(this.id).subscribe(
      data => {

        this.pharmcyphotos = data;
        this.attachmentsurl[0] = this.pharmcyphotos[0].photourlss
      }, error => {
      }
    )
  }


  public getlanguage() {
    this.docservice.GetAdmin_PharmacyLoginOffers_Lable(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  public dummattachmenturl = []

  public onattachmentUpload(abcd) {
    this.dummattachmenturl = []
    // for (let i = 0; i < abcd.length; i++) {
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }
  }

  public photodetail = []
  public uploadattachments() {
    this.docservice.AttachmentsUpload(this.attachments).subscribe(res => {
      this.attachmentsurl.push(res);
      this.dummattachmenturl.push(res);
    
      let a = this.dummattachmenturl[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;

      this.photodetail.push(b)
      this.attachments.length = 0;

    })
    // this.sendattachment();
  }

  public clear() {
    this.offername = '';
    this.descripton = '';
    this.startdate = '';
    this.enddate = '';
    this.offername = '';
    this.offer = '';

  }
  public GetDateClear() {
    this.enddate = "";
  }


  public updatephotos() {
    
    var entity = {
      'ID': this.id,
      'PhotoURL': this.attachmentsurl[0]
    }
    this.docservice.UpdatePharmacyOffersPhotos(entity).subscribe(data => {
      
      this.phrmayphotos()
    })
  }
}

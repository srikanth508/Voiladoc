import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-announsements',
  templateUrl: './announsements.component.html',
  styleUrls: ['./announsements.component.css']
})
export class AnnounsementsComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(public docservice: HelloDoctorService) { }
  public languageid: any;
  public labels: any;
  public countrylist: any;
  public countrydd = {};
  public cityid: any;
  public countryid: any;
  public citylist: any;
  public citydd = {}
  public arealist: any;
  public areadd = {}
  public areaid: any;
  public pincode: any;

  public attachments1 = [];
  public attachmentsurl1 = [];
  public showdocphoto = [];
  public announsementname: any;
  public description: any;
  dropzonelable:any;
  select:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_LocalDoctor_Labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
        this.select=this.labels[0].select
      }, error => {
      }
    )
    this.GetCountryMaster();

    if(this.languageid==1)
    {
      this.dropzonelable="Upload file"
    }
    else if(this.languageid==6)
    {
      this.dropzonelable="Télécharger des fichiers"
    }
  
  }

  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.countrylist = data;
        this.countrydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }


  public GetCityID(item1: any) {
   
    this.cityid = item1.id;
    this.getareamasterbyid();
  }


  public GetCountryID(item: any) {
   
    this.countryid = item.id;
   
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
       
        this.citylist = data;

        this.citydd = {
          singleSelection: true,
          idField: 'id',
          textField: 'short',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }
  public getareamasterbyid() {
   
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
       
        this.arealist = data;
        this.areadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'areaName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
  }
  public GetAreaID(item3: any) {
   
    this.areaid = item3.id;
    for (let i = 0; i < this.arealist.length; i++) {
     
      if (this.arealist[i].id == this.areaid) {
       
        this.pincode = this.arealist[i].pincode
      }
    }
  }





  public onattachmentUpload1(abcd) {
   
    // for (let i = 0; i < abcd.length; i++) {
      this.attachments1.push(abcd.addedFiles[0]);
      this.uploadattachments1();
    // }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments1() {
    this.docservice.DoctorPhotoUpload(this.attachments1).subscribe(res => {
     
      this.attachmentsurl1.push(res);
      let a = this.attachmentsurl1[0].slice(2);
     
      let b = 'https://maroc.voiladoc.org' + a;

      this.showdocphoto.push(b)
     

      this.attachments1.length = 0;
     
    })

  }




  public insertdetails() {
    if (this.countryid == undefined || this.countryid.length == 0) {
     
      Swal.fire("Please Select Country");
    }

    else {
      if (this.attachmentsurl1.length == 0) {
        this.attachmentsurl1[0] = 0
      }
     
      var entity = {
        'AnnounsementName': this.announsementname,
        'Description': this.description,
        'CountryID': this.countryid,
        'Photo': this.attachmentsurl1[0],
        'LanguageID': 1,
        'CityID': this.cityid,
        'AreaID': this.areaid,
        'Pincode': this.pincode,
      }
      this.docservice.InsertAnnouncements(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('success', 'Details Saved Successfully');
          location.href = "#/AnnounseDash"
        }
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-countrt-master',
  templateUrl: './countrt-master.component.html',
  styleUrls: ['./countrt-master.component.css']
})
export class CountrtMasterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public labels:any;
  public languageid:any;
  public countryname:any;
  public countryid:any;
  public countrylist:any;
  public showbit:any;

  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
     
      this.countryid = params['id'];
      if(this.countryid==undefined)
      {
        this.showbit=0;
      }
      else if(this.countryid!=undefined)
      {
        this.showbit=1;
      }
    }
    )
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.GetCountryMaster();
  }
  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
       
        this.labels = data;
      }, error => {
      }
    )
  }

  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
       
        this.countrylist = data;

       var list=this.countrylist.filter(x=>x.id==this.countryid)
       this.countryname=list[0].short
      }, error => {
      }
    )
  }






  public insertdetails()
  {
    var entity={
      'Short':this.countryname,
      'LanguageID':1
    }
    this.docservice.InsertCountryMaster(entity).subscribe(data=>{
      if(data!=0)
      {
        Swal.fire('Success','Details Saved Successfully');
        location.href="#/CountryDash"
      }
    })
  }

  public updatedetails()
  {
    var entity={
      'ID':this.countryid,
      'Short':this.countryname,
      'LanguageID':this.languageid
    }
    this.docservice.UpdateCountryMaster_Web(entity).subscribe(data=>{
     let res=data;
     Swal.fire('Success','Details Updated Successfully');
     location.href="#/CountryDash"
    })
  }
}

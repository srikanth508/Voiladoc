import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sponserhospitalclinic',
  templateUrl: './sponserhospitalclinic.component.html',
  styleUrls: ['./sponserhospitalclinic.component.css']
})
export class SponserhospitalclinicComponent implements OnInit {


  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public hospitallist: any;
  public hospitalid: any;
  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  public hospitalcliniclist: any;
  public hospitaldd = {}
  public labels: any;
  public languageid: any;
  public hspcliid: any;
  public fees: any;
  public id: any;
  public showbutton: any;
  public sponserhospitalist: any;
  public hospitalclinicname: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage()
    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else if (this.id != undefined) {
        this.showbutton = 1;
        this.getsponserhospitalforadmin()
      }
    }
    )

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();


    // this.docservice.GetSponsoredHospitalsForAdmin().subscribe(
    //   data => {
    //    
    //     this.hospitallist = data;
    //   }, error => {
    //   }
    // )
    //this.gethosptilclinicforadmin();

    this.getlanguage();
  }
  SelectLabel
  search
  public getlanguage() {
    this.docservice.GetAdmin_Sponsored_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search=this.labels[0].search
      }, error => {
      }
    )
  }
  handleChange(event) {

    this.hspcliid = event.target.value;
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {

        let temp: any = data;
        this.hospitalcliniclist = temp.filter(x => x.hospital_ClinicID == this.hspcliid);
        this.hospitaldd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search
        };
      }, error => {
      }
    )
  }
  // public gethosptilclinicforadmin() {
  //  
  //   this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
  //     data => {
  //      
  //       this.hospitalcliniclist = data;
  //       this.hospitaldd = {
  //         singleSelection: true,
  //         idField: 'id',
  //         textField: 'hospital_ClinicName',
  //         selectAllText: 'Select All',
  //         unSelectAllText: 'UnSelect All',
  //         itemsShowLimit: 3,
  //         allowSearchFilter: true
  //       };
  //     }, error => {
  //     }
  //   )
  // }


  public GetHospitalID(item3: any) {

    this.hospitalid = item3.id;
  }
  public insertdetails() {

    if (this.hospitalid == undefined) {
      Swal.fire("Please Select Hospital/Clinic")
    }
    else {
      debugger
     var sdate= this.docservice.Getyearmonthformat(this.startdate);
     var edate= this.docservice.Getyearmonthformat(this.startdate);
      debugger
      var entity = {
        'Hospital_ClinicID': this.hospitalid,
        'SDate': sdate,
        'EDate': edate,
        'Fees': this.fees
      }
      this.docservice.InsertSponsoredHospitals(entity).subscribe(data => {

        if (data != 0) {
          if(this.languageid==1)
          {
            Swal.fire('Completed', 'Published successfully', 'success');
            this.clear();
            location.href = "#/Hspclidash";
          }
          else{
            Swal.fire('','Publié avec succès', 'success');
            this.clear();
            location.href = "#/Hspclidash";
          }
        
        }
      })
    }
  }
  public clear() {
    this.startdate = '';
    this.enddate = '';
  }
  public GetEnddate() {
    this.enddate = '';
  }


  public getsponserhospitalforadmin() {
    if (this.languageid == 1) {
      this.docservice.GetSponsoredHospitalsForAdmin().subscribe(
        data => {
          
          this.sponserhospitalist = data;

          var list = this.sponserhospitalist.filter(x => x.id == this.id)
          this.startdate = list[0].startdate,
            this.enddate = list[0].enddate,
            this.fees = list[0].fees,
            this.hospitalclinicname = list[0].hospital_ClinicName
        }, error => {
        }
      )
    }
    else if (this.languageid == 6) {
      this.docservice.GetSponsoredHospitalsForAdmin().subscribe(
        data => {
          
          this.sponserhospitalist = data;
          
          var list = this.sponserhospitalist.filter(x => x.id == this.id)
          this.startdate = list[0].startdate.toLocaleString();
          this.enddate = list[0].enddate.toLocaleString();
          this.fees = list[0].fees,
            this.hospitalclinicname = list[0].hospital_ClinicName
        }, error => {
        }
      )
    }
  }


  public updatedetails() {
    
    // const qwer = 'yyyy-MMM-dd';
    // const pljdjf = 'en-US';
    // const frdat = this.startdate;
    // this.startdate = formatDate(frdat, qwer, pljdjf);
    // const todat = this.enddate;
    // this.enddate = formatDate(todat, qwer, pljdjf);
    
    var entity1 = {
      'ID': this.id,
      'SDate': this.startdate,
      'EDate': this.enddate,
      'Fees': this.fees
    }
    this.docservice.UpdateSponsoredHospitals(entity1).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Completed', 'Updated Successfully', 'success');
        location.href = "#/Hspclidash";
      }
      else {
        Swal.fire('Terminé', 'Mis à jour avec succés', 'success');
        location.href = "#/Hspclidash";
      }
    })
  }
}

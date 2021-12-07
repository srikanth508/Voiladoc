import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diagnosticcenter',
  templateUrl: './diagnosticcenter.component.html',
  styleUrls: ['./diagnosticcenter.component.css']
})
export class DiagnosticcenterComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public diagnosticlist: any;
  public diagnosticid: any;
  public startdate: any;
  public enddate: any;
  public todaydate: any;
  public CurrentTime: any;
  public diadd = {}
  public labels: any;
  public languageid: any;
  public fees: any;
  public id: any;
  public showbutton: any;
  public search: any;
  ngOnInit() {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes();
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
      if (this.id == undefined) {
        this.showbutton = 0;
      }
      else if (this.id != undefined) {
        this.showbutton = 1;
        this.GetSponsoredDiagnosticCenterForAdmin()
      }
    }
    )
    this.getlanguage();
    //
    // this.docservice.GetSponsoredDiagnosticCenterForAdmin().subscribe(
    //   data => {
    //    
    //     this.diagnosticlist = data;
    //   }, error => {
    //   }
    // )

    this.getdiagnosticforadmin();


  }
  public getlanguage() {
    this.docservice.GetAdmin_Sponsored_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search;
      }, error => {
      }
    )
  }
  SelectLabel

  public getdiagnosticforadmin() {

    this.docservice.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
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


  public GetDiagnosticID(item2: any) {

    this.diagnosticid = item2.id;
  }
  public insertdetails() {

    if (this.diagnosticid == undefined) {
      Swal.fire("Please Select Diagnostic Center");

    }
    else {
      debugger
      var sdate = this.docservice.Getyearmonthformat(this.startdate);
      var edate = this.docservice.Getyearmonthformat(this.enddate);
      var entity = {
        'DiagnosticID': this.diagnosticid,
        'SDate': sdate,
        'EDate': edate,
        'Fees': this.fees
      }
      this.docservice.InsertSponsoredDiagnosticCenter(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire('Completed', 'Published successfully', 'success');
            location.href = "#/Diagdash";
            this.clear();
          }
          else {
            Swal.fire('', 'Publié avec succès', 'success');
            location.href = "#/Diagdash";
            this.clear();
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


  sponserdialist: any;
  diagnosticcentername: any;



  public GetSponsoredDiagnosticCenterForAdmin() {
    if (this.languageid == 1) {
      this.docservice.GetSponsoredDiagnosticCenterForAdmin().subscribe(
        data => {

          this.sponserdialist = data;
          var list = this.sponserdialist.filter(x => x.id == this.id)
          this.startdate = list[0].startdate,
            this.enddate = list[0].enddate,
            this.fees = list[0].fees,
            this.diagnosticcentername = list[0].diagnosticCenterName
        }, error => {
        }
      )
    }
    else if (this.languageid == 6) {
      this.docservice.GetSponsoredDiagnosticCenterForAdmin().subscribe(
        data => {

          this.sponserdialist = data;

          var list = this.sponserdialist.filter(x => x.id == this.id)
          this.startdate = list[0].startdate.toLocaleString();
          this.enddate = list[0].enddate.toLocaleString();
          this.fees = list[0].fees,
            this.diagnosticcentername = list[0].diagnosticCenterName
        }, error => {
        }
      )
    }
  }



  public updatedetails() {

    // const qwer = 'dd-MMM-yyyy';
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
    this.docservice.UpdateSponsoredDiagnosticCenter(entity1).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Completed', 'Updated Successfully', 'success');
        location.href = "#/Diagdash";
      }
      else {
        Swal.fire('Terminé', 'Mis à jour avec succés', 'success');
        location.href = "#/Diagdash";
      }
    })
  }
}

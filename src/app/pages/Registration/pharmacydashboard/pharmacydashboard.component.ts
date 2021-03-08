import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-pharmacydashboard',
  templateUrl: './pharmacydashboard.component.html',
  styleUrls: ['./pharmacydashboard.component.css']
})
export class PharmacydashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public pharmacylist: any;
  public term: any;
  p: number = 1;
  public languageid: any;
  public labels: any;
  public startdate: any;
  public enddate: any;
  public pharmacycount: any;
  public id: any;
  public labels1: any;

  public countryid: any;
  public citylist: any;
  public cityid: any;
  public dummlist: any;
  public arealist: any;
  public areaid: any;
  public countrylist: any;
  public hospitalclinicid: any;
  public countrymanaerid: any;
  public showexportbutton: any;
  public salesrepresntiveid: any;
  public showeditbutton: any;
  meridionalid: any;
  showdelete:any;

  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.countrymanaerid = localStorage.getItem('countrymanagerid');
    this.salesrepresntiveid = localStorage.getItem('salesrepresntativeid');
    this.meridionalid = localStorage.getItem('meridionalid');

    if (this.salesrepresntiveid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }
    if(this.meridionalid==undefined)
    {
      this.showdelete=0;
    }
    else
    {
      this.showdelete=1;
    }
    this.startdate = localStorage.getItem('StartDate');
    this.enddate = localStorage.getItem('EndDate');

    if (this.hospitalclinicid != undefined || this.countrymanaerid != undefined) {
      this.showexportbutton = 1;
    }
    this.activatedroute.params.subscribe(params => {
      this.id = params['id']
    }
    )
    this.languageid = localStorage.getItem('LanguageID');


    if (this.id == undefined) {
      this.getpharmacyforadmin();
    }
    if (this.hospitalclinicid != undefined) {
      this.docservice.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.pharmacylist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.pharmacycount = this.pharmacylist.length;
        }, error => {
        }
      )
    }
    else if (this.id != undefined) {
      this.docservice.GetPhamacyDetailsForWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {

          this.pharmacylist = data;
          this.dummlist = this.pharmacylist
          this.pharmacycount = this.pharmacylist.length;
        }, error => {
        }
      )
    }
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      },
      error => { }
    );

    this.getlanguage();
    this.GetCountryMaster()
    this.countryid = 0
    this.cityid = 0

  }

  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.countrylist = data;

      }, error => {
      }
    )
  }

  public GetCountryID(even) {
    if (even.target.value != 0) {

      this.countryid = even.target.value;

      this.pharmacylist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.pharmacycount = this.pharmacylist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getpharmacyforadmin()
      this.countryid = 0

    }
  }
  public getcity() {

    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {

        this.citylist = data;
      }, error => {
      }
    )
  }


  public GetCityID(even) {
    if (even.target.value != 0) {

      this.cityid = even.target.value;
      this.getareamasterbyid()
      this.pharmacylist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.pharmacycount = this.pharmacylist.length
    }
    else if (even.target.value == 0) {
      this.getcity();
      this.areaid = 0;
      this.cityid = 0
    }
  }



  public getareamasterbyid() {

    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {

        this.arealist = data;

      }, error => {
      }
    )
  }


  public GetAreaID(even) {
    if (even.target.value != 0) {

      this.areaid = even.target.value;
      this.pharmacylist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.pharmacycount = this.pharmacylist.length
    }
    else if (even.target.value == 0) {
      this.getpharmacyforadmin()
    }
  }




  public getlanguage() {
    this.docservice.GetAdmin_PharmacyRegistration_LabelByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }


  public getpharmacyforadmin() {

    this.docservice.GetPharmacyForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.pharmacylist = data;
        this.dummlist = this.pharmacylist
        this.pharmacycount = this.pharmacylist.length;
      }, error => {
      }
    )
  }

  public deletepharmacy(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This Pharmacy!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeletePharmacy(id).subscribe(res => {
            let test = res;
            this.getpharmacyforadmin();
          })
          Swal.fire(
            'Deleted!',
            'Pharmacy has been deleted.',
            'success'
          )
        }
        else {
          this.getpharmacyforadmin();
        }
      })
    }
    else if (this.languageid == 6) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeletePharmacy(id).subscribe(res => {
            let test = res;
            this.getpharmacyforadmin();
          })
          Swal.fire(
            'Supprimé!'
            // 'Le médecin a été supprimé.',
            // 'success'
          )
        }
        else {
          this.getpharmacyforadmin();
        }
      })
    }
  }


  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Pharmacy List");
  }

  public tableToJson(table) {

    var data = []; // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};
      for (var j = 0; j < tableRow.cells.length - 1; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      } data.push(rowData);
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }




  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
  }
}

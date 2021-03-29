import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-diagnestic-dashboard',
  templateUrl: './diagnestic-dashboard.component.html',
  styleUrls: ['./diagnestic-dashboard.component.css']
})
export class DiagnesticDashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }
  public diagnosticlist: any;
  public id: any;
  public term: any;
  p: number = 1;
  public labels: any;
  public languageid: any;
  public enddate: any;
  public startdate: any;
  public count: any;
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
  meridionalid:any;
  showdelete:any;
  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');

    this.countrymanaerid = localStorage.getItem('countrymanagerid');
    this.salesrepresntiveid = localStorage.getItem('salesrepresntativeid');
    this.languageid = localStorage.getItem('LanguageID');
    this.startdate = localStorage.getItem('StartDate');
    this.enddate = localStorage.getItem('EndDate');
    this.meridionalid = localStorage.getItem('meridionalid');
    this.activatedroute.params.subscribe(params => {
      this.id = params['id'];
    }
    )

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
    if (this.hospitalclinicid != undefined || this.countrymanaerid != undefined) {
      this.showexportbutton = 1;
    }

    if (this.id == undefined) {
      this.getdiagnosticforadmin();
    }
    if (this.hospitalclinicid != undefined) {
      this.docservice.GetDiagnosticForAdminByLanguageID(this.languageid).subscribe(
        data => {
          this.diagnosticlist = data;
          this.dummlist = this.diagnosticlist
          this.diagnosticlist = this.diagnosticlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.diagnosticlist.length;
        }, error => {
        }
      )
    }
    else if(this.id!=undefined){
      this.docservice.GetDiagnosticDetailsForWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {

          this.diagnosticlist = data;
          this.dummlist = this.diagnosticlist
          this.count = this.diagnosticlist.length;
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
    this.GetCountryMaster()
    this.getlanguage();
    this.countryid = 0;
    this.cityid = 0;

  }

  public getdiagnosticforadmin() {

    this.docservice.GetDiagnosticForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.diagnosticlist = data;

        this.dummlist = this.diagnosticlist
        this.count = this.diagnosticlist.length;
      }, error => {
      }
    )
  }

  public getlanguage() {
    this.docservice.GetAdmin_DiagnosticRegistration_LabelBYLanguageID(this.languageid).subscribe(
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

      }, error => {
      }
    )
  }

  public GetCountryID(even) {
    if (even.target.value != 0) {

      this.countryid = even.target.value;

      this.diagnosticlist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.diagnosticlist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getdiagnosticforadmin()
      this.countryid = 0
      this.areaid = 0

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
      this.diagnosticlist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.diagnosticlist.length
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
      this.diagnosticlist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.diagnosticlist.length
    }
    else if (even.target.value == 0) {
      this.getdiagnosticforadmin()
    }
  }

  public deletediagnosticcenter(id) {

    if(this.languageid==1)
    {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This Diagnostic Center!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteDiagnosticCenter(id).subscribe(res => {
            let test = res;
            this.getdiagnosticforadmin();
          })
          Swal.fire(
            'Deleted!',
            'Diagnostic Center has been deleted.',
            'success'
          )
        }
        else {
          this.getdiagnosticforadmin();
        }
      })
    }
    else if(this.languageid==6)
    {
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
          this.docservice.DeleteDiagnosticCenter(id).subscribe(res => {
            let test = res;
            this.getdiagnosticforadmin();
          })
          Swal.fire(
            'Supprimé!'
            // 'Le médecin a été supprimé.',
            // 'success'
          )
        }
        else {
          this.getdiagnosticforadmin();
        }
      })
    }
  
  }

  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Diagnostic List");
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
      for (var j = 1; j < tableRow.cells.length - 1; j++) {
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

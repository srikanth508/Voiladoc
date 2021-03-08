import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-local-doc-dash',
  templateUrl: './local-doc-dash.component.html',
  styleUrls: ['./local-doc-dash.component.css']
})
export class LocalDocDashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public languageid: any;
  public labels: any;
  public localdoclist: any;
  public term: any;
  p: number = 1;
  public count: any;
  public labels1: any;

  public countryid: any;
  public citylist: any;
  public cityid: any;
  public dummlist: any;
  public arealist: any;
  public areaid: any;
  public countrylist: any;
  public countrymanaerid: any;
  public showexportbutton: any;
  meridionalid: any;
  showdelete:any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');

    this.countrymanaerid = localStorage.getItem('countrymanagerid');
    this.meridionalid = localStorage.getItem('meridionalid');

    if (this.countrymanaerid != undefined) {
      this.showexportbutton = 1;
    }
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
    if(this.meridionalid==undefined)
    {
      this.showdelete=0;
    }
    else
    {
      this.showdelete=1;
    }


    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      },
      error => { }
    );
    this.getlocaldoctors();
    this.GetCountryMaster();
    this.countryid = 0;
    this.cityid = 0
  }


  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
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

      this.localdoclist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.localdoclist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getlocaldoctors()
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
      this.localdoclist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.localdoclist.length
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
      this.localdoclist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.localdoclist.length
    }
    else if (even.target.value == 0) {
      this.getlocaldoctors()
    }
  }




  public getlocaldoctors() {
    this.docservice.GetLocalDoctorRegistration(this.languageid).subscribe(
      data => {

        this.localdoclist = data;
        this.dummlist = this.localdoclist
        this.count = this.localdoclist.length
      }, error => {
      }
    )
  }



  public deletedoctorregistration(id) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Doctor!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteLocalDoctorRegistration(id).subscribe(res => {
          let test = res;
          this.getlocaldoctors();
        })
        Swal.fire(
          'Deleted!',
          'Doctor has been deleted.',
          'success'
        )
      }
      else {
        this.getlocaldoctors();
      }
    })
  }







  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Doctors List");
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

}

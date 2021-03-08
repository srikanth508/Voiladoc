import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-midwife-dashboard',
  templateUrl: './midwife-dashboard.component.html',
  styleUrls: ['./midwife-dashboard.component.css']
})
export class MidwifeDashboardComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public midwifelist: any;
  public languageid: any;
  public labels: any;
  public term: any;
  public enddate: any;
  public startdate: any;
  public id: any;
  public count: any;
  public labels1: any;

  labels2

  public countryid: any;
  public citylist: any;
  public cityid: any;
  public dummlist: any;
  public arealist: any;
  public areaid: any;
  public countrylist: any;
  public hospitalclinicid: any;
  public miwifename: any;
  public daysname: any;
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
    this.startdate = localStorage.getItem('StartDate');
    this.enddate = localStorage.getItem('EndDate');

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
    this.activatedroute.params.subscribe(params => {

      this.id = params['id'];
    }
    )
    this.languageid = localStorage.getItem('LanguageID');


    if (this.hospitalclinicid == undefined) {
      this.GetMidWivesRegistration();
    }
    if (this.hospitalclinicid != undefined) {
      this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
        data => {

          this.dummlist = data;
          this.midwifelist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.midwifelist.length;
        }, error => {
        }
      )
    }
    else if (this.id != undefined) {
      this.docservice.GetMidWivesRegistrationForWeb(this.languageid, this.startdate, this.enddate).subscribe(
        data => {

          this.midwifelist = data;
          this.dummlist = this.midwifelist
          this.count = this.midwifelist.length;
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
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {

        this.labels2 = data;
      },
      error => { }
    );

    this.getlanguage()
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

      this.midwifelist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.midwifelist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.GetMidWivesRegistration()
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
      this.midwifelist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.midwifelist.length
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
      this.midwifelist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.midwifelist.length
    }
    else if (even.target.value == 0) {
      this.GetMidWivesRegistration()
    }
  }

  public GetMidWivesRegistration() {
    this.docservice.GetMidWivesRegistrationByLanguageID(this.languageid).subscribe(
      data => {

        this.midwifelist = data;
        this.dummlist = this.midwifelist
        this.count = this.midwifelist.length;
      }, error => {
      }
    )
  }

  public getlanguage() {
    this.docservice.GetAdmin_MidWifeRegistration_LabelByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }


  public DeleteMidWivesRegistration(id) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This MidWife!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteMidWivesRegistration(id).subscribe(res => {
            let test = res;
            this.ngOnInit();
          })
          Swal.fire(
            'Deleted!',
            'MidWife has been deleted.',
            'success'
          )
        }
        else {
          this.ngOnInit();
        }
      })
    }
    else {
      Swal.fire({
        title: 'Êtes-vous sûr(e) ?',
        // text: "You Want to Delete This Doctor!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteMidWivesRegistration(id).subscribe(res => {
            let test = res;
            this.ngOnInit();
          })
          Swal.fire(
            'Supprimé!'
            // 'Le médecin a été supprimé.',
            // 'success'
          )
        }
        else {
          this.ngOnInit();
        }
      })
    }


  }
  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Midwife List");
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

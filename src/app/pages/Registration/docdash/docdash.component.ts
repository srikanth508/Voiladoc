import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-docdash',
  templateUrl: './docdash.component.html',
  styleUrls: ['./docdash.component.css']
})
export class DocdashComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  public doctorlist: any;
  public id: any;
  public term: any;
  p: number = 1;
  public languageid: any;
  public labels: any;
  public startdate: any;
  public enddate: any;
  public count: any;
  public docount: any;
  public labels1: any;

  public countryid: any;
  public citylist: any;
  public cityid: any;
  public dummlist: any;
  public arealist: any;
  public areaid: any;
  public countrylist: any;
  public hospitalclinicid: any;
  public departmentlist: any;
  public departmentid: any;
  labels2: any
  ngOnInit() {
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 800);
    this.getdoctorsbycityforexcel()

    this.languageid = localStorage.getItem('LanguageID');
    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {
        debugger
        this.labels2 = data;
      }, error => {
      }
    )
    this.startdate = localStorage.getItem('StartDate');
    this.enddate = localStorage.getItem('EndDate');

    this.activatedroute.params.subscribe(params => {
      debugger;

      this.id = params['id']
    }
    )
    if (this.hospitalclinicid == undefined) {
      this.getdoctorforadmin();
    }
    if (this.hospitalclinicid != undefined) {
      this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.dummlist = data;
          this.doctorlist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
          this.count = this.doctorlist.length
        }, error => {
        }
      )
    }
    else {
      debugger
      this.docservice.GetDoctorForAdminByLanguageIDWeb(this.startdate, this.enddate, this.languageid).subscribe(
        data => {
          debugger
          this.doctorlist = data;
          this.dummlist = this.doctorlist
          this.count = this.doctorlist.length
        }, error => {
        }
      )
    }
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        debugger;
        this.labels1 = data;
      },
      error => { }
    );
    this.GetCountryMaster()
    this.countryid = 0
    this.cityid = 0
    this.getdepartmentmaster();
  }

  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.countrylist = data;

      }, error => {
      }
    )
  }


  public getdepartmentmaster() {
    debugger
    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.departmentlist = data;
      }, error => {
      }
    )
  }

  public GetCountryID(even) {
    if (even.target.value != 0) {
      debugger
      this.countryid = even.target.value;

      this.doctorlist = this.dummlist.filter(x => x.countryID == this.countryid)
      this.count = this.doctorlist.length
      this.getcity();
    }
    else if (even.target.value == 0) {
      this.getdoctorforadmin()
      this.countryid = 0

    }
  }
  public getcity() {
    debugger
    this.docservice.GetCityMasterBYIDandLanguageID(this.countryid, this.languageid).subscribe(
      data => {
        debugger
        this.citylist = data;
      }, error => {
      }
    )
  }


  public GetCityID(even) {
    if (even.target.value != 0) {
      debugger
      this.cityid = even.target.value;
      this.getareamasterbyid()
      this.doctorlist = this.dummlist.filter(x => x.cityID == this.cityid)
      this.count = this.doctorlist.length
    }
    else if (even.target.value == 0) {
      this.getcity();
      this.areaid = 0;
      this.cityid = 0
    }
  }



  public getareamasterbyid() {
    debugger
    this.docservice.GetAreaMasterByCityIDAndLanguageID(this.cityid, this.languageid).subscribe(
      data => {
        debugger
        this.arealist = data;

      }, error => {
      }
    )
  }


  public GetAreaID(even) {
    if (even.target.value != 0) {
      debugger
      this.areaid = even.target.value;
      this.doctorlist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.doctorlist.length
    }
    else if (even.target.value == 0) {
      this.getdoctorforadmin()
    }
  }



  public getdoctorsbycityforexcel() {
    debugger
    this.docservice.getdoctorsbycityforexcel().subscribe(
      data => {
        debugger
        this.docount = data;

      }, error => {
      }
    )
  }




  public getdoctorforadmin() {
    debugger
    this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.doctorlist = data;
        this.dummlist = this.doctorlist
        this.count = this.doctorlist.length
      }, error => {
      }
    )
  }
  // public deletedoctorregistration(id)
  // {
  //   debugger
  //   this.docservice.DeleteDoctorRegistration(id).subscribe(
  //     data => {
  //       debugger
  //       Swal.fire("Deleted Successfully");
  //       this.getdoctorforadmin();
  //     }, error => {
  //     }
  //   )

  // }



  public deletedoctorregistration(id) {
    debugger;
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
        this.docservice.DeleteDoctorRegistration(id).subscribe(res => {
          let test = res;
          this.getdoctorforadmin();
        })
        Swal.fire(
          'Deleted!',
          'Doctor has been deleted.',
          'success'
        )
      }
      else {
        this.getdoctorforadmin();
      }
    })
  }





  public pageChanged(even) {
    debugger
    let fgdgfgd = even;
    this.p = even;
  }

  public getglmasterexcel() {
     let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(this.docount, "Register Entity List");
  }

  public tableToJson(table) {
    debugger
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
    debugger;
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

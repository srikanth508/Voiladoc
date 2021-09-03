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
  labels2: any;
  public countrymanaerid: any;
  public showexportbutton: any;
  public salesrepresntiveid: any;
  public showeditbutton: any;
  meridionalid: any;
  showdelete: any;
  ngOnInit() {
    this.departmentname = ""
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 800);
    this.getdoctorsbycityforexcel()
    this.meridionalid = localStorage.getItem('meridionalid');
    this.countrymanaerid = localStorage.getItem('countrymanagerid');

    this.salesrepresntiveid = localStorage.getItem('salesrepresntativeid');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.languageid = localStorage.getItem('LanguageID');

    if (this.salesrepresntiveid != undefined) {
      this.showeditbutton = 1
    }
    else {
      this.showeditbutton = 0;
    }
    if (this.hospitalclinicid != undefined || this.countrymanaerid != undefined || this.meridionalid != undefined) {
      this.showexportbutton = 1;
    }

    if (this.meridionalid == undefined) {
      this.showdelete = 0;
    }
    else {
      this.showdelete = 1;
    }

    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {

        this.labels2 = data;
      }, error => {
      }
    )
    this.startdate = localStorage.getItem('StartDate');
    this.enddate = localStorage.getItem('EndDate');

    this.activatedroute.params.subscribe(params => {
      this.id = params['id']
      if (this.hospitalclinicid == undefined) {

        this.getdoctorforadmin();

      }
      else if (this.id != undefined) {
        this.docservice.GetDoctorForAdminByLanguageIDWeb(this.startdate, this.enddate, this.languageid).subscribe(
          data => {

            this.doctorlist = data;
            this.dummlist = this.doctorlist
            this.count = this.doctorlist.length
          }, error => {
          }
        )
      }
      else if (this.hospitalclinicid != undefined) {
        this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
          data => {

            this.dummlist = data;
            this.doctorlist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
            this.count = this.doctorlist.length
          }, error => {
          }
        )
      }
    }
    )


    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels1 = data;
      },
      error => { }
    );
    this.GetCountryMaster()
    this.countryid = 0
    this.cityid = 0
    this.getdepartmentmaster();

  }

  doctorlistsss: any;
  departmentname: any;




  // public GetDepartmentID(even) {
  //  
  //   this.hospitalclinicid = localStorage.getItem('hospitalid');
  //   if (this.hospitalclinicid! = 'undefined') {
  //     if (even.target.value != 0) {
  //      
  //       this.departmentid = even.target.value;
  //       this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
  //         data => {
  //          
  //           this.dummlist = data;
  //           this.doctorlistsss = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)

  //           this.doctorlist = this.doctorlistsss.filter(x => x.departmentID == this.departmentid)
  //           this.count = this.doctorlist.length
  //         }, error => {
  //         }
  //       )
  //     }
  //     else {
  //       this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
  //         data => {
  //          
  //           this.dummlist = data;
  //           this.doctorlist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
  //           this.count = this.doctorlist.length
  //         }, error => {
  //         }
  //       )
  //     }
  //   }
  //   else {
  //     if (even.target.value != 0) {
  //      
  //       this.departmentid = even.target.value;
  //       this.doctorlist = this.dummlist.filter(x => x.departmentID = this.departmentid)
  //       this.count = this.doctorlist.length;
  //     }
  //     else {
  //       this.getdoctorforadmin()
  //     }
  //   }
  // }


  public GetCountryMaster() {
    this.docservice.GetCountryMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.countrylist = data;

      }, error => {
      }
    )
  }


  public getdepartmentmaster() {

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
      }, error => {
      }
    )
  }

  public GetCountryID(even) {
    if (even.target.value != 0) {

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
      this.doctorlist = this.dummlist.filter(x => x.areaID == this.areaid)
      this.count = this.doctorlist.length
    }
    else if (even.target.value == 0) {
      this.getdoctorforadmin()
    }
  }


  public getdoctorsbycityforexcel() {

    this.docservice.getdoctorsbycityforexcel().subscribe(
      data => {

        this.docount = data;

      }, error => {
      }
    )
  }


  public getdoctorforadmin() {
    this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.doctorlist = data;
        this.dummlist = this.doctorlist
        this.count = this.doctorlist.length
      }, error => {
      }
    )
  }
  // public deletedoctorregistration(id)
  // {
  //  
  //   this.docservice.DeleteDoctorRegistration(id).subscribe(
  //     data => {
  //      
  //       Swal.fire("Deleted Successfully");
  //       this.getdoctorforadmin();
  //     }, error => {
  //     }
  //   )

  // }



  public deletedoctorregistration(id) {
    if (this.languageid == 1) {
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
            this.ngOnInit()
          })
          Swal.fire(
            'Deleted!',
            'Doctor has been deleted.',
            'success'
          )
        }
        else {
          this.ngOnInit()
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
          this.docservice.DeleteDoctorRegistration(id).subscribe(res => {
            let test = res;
            this.ngOnInit()
          })
          Swal.fire(
            'Supprimé!',
            'Le médecin a été supprimé.',
            'success'
          )
        }
        else {
          this.ngOnInit()
        }
      })
    }

  }





  public pageChanged(even) {

    let fgdgfgd = even;
    this.p = even;
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


  // public GetDepartmentID(even) {
  //  
  //   if (even.target.value != 0) {
  //     this.departmentid = even.target.value;
  //     this.doctorlist = this.dummlist.filter(x => x.departmentID == this.departmentid)
  //   }
  //   else if (even.target.value == 0) {
  //     this.getdoctorforadmin()
  //   }
  // }


  public dummdoctorlist: any;


  public GetDepartmentID(even) {

    this.departmentid = even.target.value;
    if (even.target.value != 0) {
      this.departmentid = even.target.value;

      if (this.hospitalclinicid == undefined) {

        this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
          data => {

            this.dummlist = data;
            this.doctorlist = this.dummlist.filter(x => x.departmentID == this.departmentid)
            this.count = this.doctorlist.length
          }, error => {
          }
        )
      }
      else if (this.hospitalclinicid != undefined) {
        this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
          data => {

            this.dummlist = data;
            this.dummdoctorlist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
            this.doctorlist = this.dummdoctorlist.filter(x => x.departmentID == this.departmentid)
            this.count = this.doctorlist.length
          }, error => {
          }
        )
      }
    }
    else {
      if (this.hospitalclinicid == undefined) {

        this.getdoctorforadmin();

      }
      else if (this.hospitalclinicid != undefined) {
        this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
          data => {

            this.dummlist = data;
            this.doctorlist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
            this.count = this.doctorlist.length
          }, error => {
          }
        )
      }
    }
  }



  // public GetDoctorRating(even)
  // {

  // }

}

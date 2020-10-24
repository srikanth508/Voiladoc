import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
@Component({
  selector: 'app-admin-siderevenue',
  templateUrl: './admin-siderevenue.component.html',
  styleUrls: ['./admin-siderevenue.component.css']
})
export class AdminSiderevenueComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public todaydate: any;
  public languageid: any;


  public allcounts: any;
  public nursecount: any;
  public midwifecount: any;
  public physiocount: any;
  public doccommissioncount: any;
  public docommicssion: any;
  public Nursecommssioncount: any;
  public midwifecommissioncount: any;
  public physiocommissioncount: any;
  public labels: any;

  public TotalDoctorRevenue: any;
  public TotalNurserevenue: any;
  public TotalMidwifeRevenue: any;
  public TotalPhysioRevenue: any;
  public hospitalid: any;
  public cityid: any;
  public hospitallist: any;
  public hospdd = {};
  public SelectLabel: any;
  public indepedentlist: any;
  public doctorid: any;
  public docdd = {}
  public arealist: any;
  public areadd = {};


  ngOnInit() {
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.languageid = localStorage.getItem('LanguageID');
    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 0);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    this.hospitalid = 0;
    this.doctorid = 0;
    this.cityid = 0
    this.getlanguage()
    this.GetCounts()
    this.getIndependentDoctors()


    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {
        this.hospitallist = data;
        this.hospdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )


    this.GetAreaMaster()
  }


  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        this.labels = data;
        this.SelectLabel = this.labels[0].select
      },
      error => { }
    );
  }
  docrevenue: any;
  nurserevenue: any;
  public midwiferevenue: any;
  physiorevenue: any;
  hospitalrevenue: any;


  public GetCounts() {
    debugger
    this.docservice.GetDoctorCommissionFeesByAdminRevenue(this.startdate, this.enddate, this.hospitalid, this.cityid).subscribe(
      data => {
        debugger
        this.allcounts = data;
        this.docrevenue = this.allcounts[0].totalamount
        debugger
        this.docservice.GetNurseCommissionDeatailsAdminRevenue(this.startdate, this.enddate, this.hospitalid, this.cityid).subscribe(
          data => {
            debugger
            this.nursecount = data;

          }, error => {
          }
        )
        this.docservice.GetMidWifeCommissionDeatailsAdminRevenue(this.startdate, this.enddate, this.hospitalid, this.cityid).subscribe(
          data => {
            debugger
            this.midwifecount = data;

            debugger

          }, error => {
          }
        )
        this.docservice.GetPhsyioTherapistCommissionDeatailsAdminRevenue(this.startdate, this.enddate, this.hospitalid, this.cityid).subscribe(
          data => {
            debugger
            this.physiocount = data;
            debugger
          }, error => {
          }
        )
        this.docservice.GetHospitalRevenue(this.startdate, this.enddate, this.hospitalid, this.cityid).subscribe(
          data => {
            debugger
            this.hospitalrevenue = data;
            debugger
          }, error => {
          }
        )
        this.docservice.GetDoctorCommissionFeesByAdminRevenueForIndependentDoctor(this.startdate, this.enddate, this.doctorid, this.cityid).subscribe(
          data => {
            debugger
            this.indepedentlist = data;

            debugger
          }, error => {
          }
        )
        debugger

      }, error => {
      }
    )
  }

  inddoctorslist: any;


  public getIndependentDoctors() {
    this.docservice.GetDoctorForAdminByLanguageIDIndependentDoctors(this.languageid).subscribe(
      data => {
        debugger
        this.inddoctorslist = data;

        this.docdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'doctorName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };

        debugger
      }, error => {
      }
    )
  }

  public GetHospitalID(item: any) {
    debugger
    this.hospitalid = item.id
    this.GetCounts()
  }

  public GetDoctorID(item1: any) {
    debugger
    this.doctorid = item1.id;

    this.docservice.GetDoctorCommissionFeesByAdminRevenueForIndependentDoctor(this.startdate, this.enddate, this.doctorid, this.cityid).subscribe(
      data => {
        debugger
        this.indepedentlist = data;

        debugger
      }, error => {
      }
    )
  }
























  // public GetDoctorCommission() {
  //   this.docservice.GetPatientPaymentDetailsAdminDoctorsCommission(this.startdate, this.enddate).subscribe(
  //     data => {

  //       this.doccommissioncount = data;

  //     }, error => {
  //     }
  //   )
  // }



  // public GetNurseCommissionCount() {
  //   this.docservice.GetNurse_PatientPaymentDetailsNurseRevenue(this.startdate, this.enddate).subscribe(
  //     data => {

  //       this.Nursecommssioncount = data;
  //     }, error => {
  //     }
  //   )
  // }

  // public GetidwifeommissionsRevenue() {
  //   this.docservice.GetMidWife_PatientPaymentDetailsAdminRevenue(this.startdate, this.enddate).subscribe(
  //     data => {

  //       this.midwifecommissioncount = data;
  //     }, error => {
  //     }
  //   )
  // }

  // public GetPhysiotherapistcount() {
  //   this.docservice.GetPhysiotherapist_PatientPaymentDetailsAdminRevenue(this.startdate, this.enddate).subscribe(
  //     data => {

  //       this.physiocommissioncount = data;
  //     }, error => {
  //     }
  //   )
  // }


  public GetAreaMaster() {
    this.docservice.GetAreaMasterByhospitals(this.languageid).subscribe(
      data => {
        this.arealist = data;
        // this.areadd = {
        //   singleSelection: true,
        //   idField: 'id',
        //   textField: 'areaName',
        //   selectAllText: 'Select All',
        //   unSelectAllText: 'UnSelect All',
        //   //  itemsShowLimit: 3,
        //   allowSearchFilter: true
        // };
      }, error => {
      }
    )
  }



  selectedDate(data) {
    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.GetCounts();
    localStorage.setItem('StartTime', this.startdate)
    localStorage.setItem('EndDate', this.enddate)
  }


  public GetAreaID(even) {
    this.cityid = even.target.value;
    this.hospitalid = 0;
    this.GetCounts()
    debugger
  }

  public GetAreaIndependentDoctor(even)
  {
    this.cityid = even.target.value;
    this.hospitalid = 0;
    this.docservice.GetDoctorCommissionFeesByAdminRevenueForIndependentDoctor(this.startdate, this.enddate, this.doctorid, this.cityid).subscribe(
      data => {
        debugger
        this.indepedentlist = data;

        debugger
      }, error => {
      }
    )
    debugger
  }



  // public GetCountsByCityID() {
  //   debugger
  //   this.docservice.GetDoctorCommissionFeesByAdminRevenue(this.startdate, this.enddate, 0, this.cityid).subscribe(
  //     data => {
  //       debugger
  //       this.allcounts = data;
  //       this.docrevenue = this.allcounts[0].totalamount
  //       debugger
  //       this.docservice.GetNurseCommissionDeatailsAdminRevenue(this.startdate, this.enddate, 0, this.cityid).subscribe(
  //         data => {
  //           debugger
  //           this.nursecount = data;

  //         }, error => {
  //         }
  //       )
  //       this.docservice.GetMidWifeCommissionDeatailsAdminRevenue(this.startdate, this.enddate, 0, this.cityid).subscribe(
  //         data => {
  //           debugger
  //           this.midwifecount = data;

  //           debugger

  //         }, error => {
  //         }
  //       )
  //       this.docservice.GetPhsyioTherapistCommissionDeatailsAdminRevenue(this.startdate, this.enddate, 0, this.cityid).subscribe(
  //         data => {
  //           debugger
  //           this.physiocount = data;
  //           debugger
  //         }, error => {
  //         }
  //       )
  //       this.docservice.GetHospitalRevenue(this.startdate, this.enddate, 0, this.cityid).subscribe(
  //         data => {
  //           debugger
  //           this.hospitalrevenue = data;
  //           debugger
  //         }, error => {
  //         }
  //       )
  //       this.docservice.GetDoctorCommissionFeesByAdminRevenueForIndependentDoctor(this.startdate, this.enddate, 0 , this.cityid).subscribe(
  //         data => {
  //           debugger
  //           this.indepedentlist = data;

  //           debugger
  //         }, error => {
  //         }
  //       )
  //       debugger

  //     }, error => {
  //     }
  //   )
  // }

}

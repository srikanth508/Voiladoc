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

  value1: any;
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

  public month: any;
  public year: any;
  public monthstartdate: any;
  public monthenddate: any;


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
    this.subHospitalID = 0;
    this.nurseid = 0;
    this.physioid = 0;
    this.midifeid = 0;


    this.docservice.GetMonthStartDateAndEndDate().subscribe(
      data => {

        this.serverdateandtime = data[0];
        this.monthstartdate = this.serverdateandtime.startMonth,
          this.monthenddate = this.serverdateandtime.endMonth

        this.GetAllHospitalSubscriptions();
        this.GetAllIndepenentPeopleRevenue();
        this.GetDiaPharmacCounts();


        localStorage.setItem('SDATE', this.monthstartdate)
        localStorage.setItem('EDATE', this.monthenddate)
      }, error => {
      }
    )
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
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )

    this.GetAreaMaster()




    //all independent

    this.GetAllIndependentNurseList();
    this.GetAllIndependentphysiotherapits();
    this.GetAllIndependentMidWife();
  }
  search: any;

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {
        this.labels = data;
        this.SelectLabel = this.labels[0].select,
          this.search = this.labels[0].search

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

    this.docservice.GetDoctorCommissionFeesByAdminRevenue(this.startdate, this.enddate, this.hospitalid, this.cityid).subscribe(
      data => {

        this.allcounts = data;
        this.docrevenue = this.allcounts[0].totalamount

        this.docservice.GetNurseAllRevenueByAdmin(this.startdate, this.enddate, this.hospitalid, this.cityid).subscribe(
          data => {

            this.nursecount = data;

          }, error => {
          }
        )
        this.docservice.GetMidWifeCommissionDeatailsAdminRevenue(this.startdate, this.enddate, this.hospitalid, this.cityid).subscribe(
          data => {

            this.midwifecount = data;
          }, error => {
          }
        )
        this.docservice.GetPhsyioTherapistCommissionDeatailsAdminRevenue(this.startdate, this.enddate, this.hospitalid, this.cityid).subscribe(
          data => {

            this.physiocount = data;

          }, error => {
          }
        )
        this.docservice.GetHospitalRevenue(this.startdate, this.enddate, this.hospitalid, this.cityid).subscribe(
          data => {

            this.hospitalrevenue = data;

          }, error => {
          }
        )
        this.docservice.GetDoctorCommissionFeesByAdminRevenueForIndependentDoctor(this.startdate, this.enddate, this.doctorid, this.cityid).subscribe(
          data => {

            this.indepedentlist = data;


          }, error => {
          }
        )



        this.docservice.GetIndependentMidWifeRevenueByMidwifeID(this.startdate, this.enddate, this.midifeid, this.cityid).subscribe(
          data => {

            this.indmidwifelist = data;


          }, error => {
          }
        )


        this.docservice.GeIndependentnurserevenueByNurseID(this.startdate, this.enddate, this.nurseid, this.cityid).subscribe(
          data => {

            this.indnurselist = data;


          }, error => {
          }
        )


        this.docservice.GetPhsyioTherapistindependentRevenueByphysioID(this.startdate, this.enddate, this.physioid, this.cityid).subscribe(
          data => {

            this.indphysiolist = data;


          }, error => {
          }
        )


      }, error => {
      }
    )
  }

  inddoctorslist: any;
  nurseid: any;
  physioid: any;
  public getIndependentDoctors() {
    this.docservice.GetDoctorForAdminByLanguageIDIndependentDoctors(this.languageid).subscribe(
      data => {

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


      }, error => {
      }
    )
  }

  public GetHospitalID(item: any) {

    this.hospitalid = item.id
    this.GetCounts()
  }
  indtypeid: any;

  // Independent Doc/nurse/physio/midiwife

  public GetIndetypeIDs(even) {
    this.indtypeid = even.target.value;
  }



  public GetDoctorID(item1: any) {

    this.doctorid = item1.id;

    this.docservice.GetDoctorCommissionFeesByAdminRevenueForIndependentDoctor(this.startdate, this.enddate, this.doctorid, this.cityid).subscribe(
      data => {

        this.indepedentlist = data;


      }, error => {
      }
    )
  }

  midifeid: any;
  indmidwifelist: any;

  public GetMidwifeID1(item1: any) {

    this.midifeid = item1.id;

    this.docservice.GetIndependentMidWifeRevenueByMidwifeID(this.startdate, this.enddate, this.midifeid, this.cityid).subscribe(
      data => {

        this.indmidwifelist = data;


      }, error => {
      }
    )
  }

  indnurselist: any;

  public GetNurseIDD(item1: any) {

    this.nurseid = item1.id;

    this.docservice.GeIndependentnurserevenueByNurseID(this.startdate, this.enddate, this.nurseid, this.cityid).subscribe(
      data => {

        this.indnurselist = data;

      }, error => {
      }
    )
  }

  indphysiolist: any;

  public GetPhysioID(item1: any) {

    this.physioid = item1.id;

    this.docservice.GetPhsyioTherapistindependentRevenueByphysioID(this.startdate, this.enddate, this.physioid, this.cityid).subscribe(
      data => {

        this.indphysiolist = data;


      }, error => {
      }
    )
  }









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
    // this.startdate = data[0].toLocaleString().split(',')[0];
    // this.enddate = data[1].toLocaleString().split(',')[0];
    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.GetCounts();
    localStorage.setItem('StartTime', this.startdate)
    localStorage.setItem('EndDate', this.enddate)
  }


  public GetAreaID(even) {
    this.cityid = even.target.value;
    this.hospitalid = 0;
    this.GetCounts()

  }

  public GetAreaIndependentDoctor(even) {
    this.cityid = even.target.value;
    this.hospitalid = 0;
    this.docservice.GetDoctorCommissionFeesByAdminRevenueForIndependentDoctor(this.startdate, this.enddate, this.doctorid, this.cityid).subscribe(
      data => {

        this.indepedentlist = data;


      }, error => {
      }
    )

  }

  // hospital subscriptions

  public hospitalSubscriptionslist: any;

  public GetAllHospitalSubscriptions() {


    this.docservice.GetAllHospitalSubscriptionRevenue(this.monthstartdate, this.monthenddate, this.subHospitalID).subscribe(
      data => {

        this.hospitalSubscriptionslist = data;

      }, error => {
      }
    )

  }


  public subHospitalID: any;

  public GetAllSubScriptionRevenueID(item: any) {

    this.subHospitalID = item.id;
    localStorage.setItem('SubhospitalID', this.subHospitalID);
    
    this.GetAllHospitalSubscriptions()
  }

  public HospitalRevenueSelecteddate(data) {
    this.monthstartdate = data[0].toLocaleString().split(',')[0];
    this.monthenddate = data[1].toLocaleString().split(',')[0];
    this.GetAllHospitalSubscriptions()
  }




  //independent subscriptions

  public serverdateandtime: any;




  public dummnurse: any;
  public nurselist1: any;
  public nursedd = {};


  public GetAllIndependentNurseList() {
    this.docservice.GetNurseHospitalDetailsNurses(this.languageid).subscribe(
      data => {

        this.dummnurse = data;
        this.nurselist1 = this.dummnurse.filter(x => x.hospitalClinicID == 612)

        this.nursedd = {
          singleSelection: true,
          idField: 'nurseID',
          textField: 'nurseName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };


      }, error => {
      }
    )
  }
  dummphysiolist: any;
  public physiolist1: any;
  public physiodd = {};


  public GetAllIndependentphysiotherapits() {
    this.docservice.GetPhysiotherapyHospitalDetails(this.languageid).subscribe(
      data => {

        this.dummphysiolist = data;
        this.physiolist1 = this.dummphysiolist.filter(x => x.hospitalClinicID == 613)

        this.physiodd = {
          singleSelection: true,
          idField: 'physiotherapyID',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };

      }, error => {
      }
    )
  }

  public dummmidwifes: any;
  public midwifes1: any;
  public midwifedd = {};


  public GetAllIndependentMidWife() {
    this.docservice.GetMidWifeHospitalDetails(this.languageid).subscribe(
      data => {

        this.dummmidwifes = data;
        this.midwifes1 = this.dummmidwifes.filter(x => x.hospitalClinicID == 614)

        this.midwifedd = {
          singleSelection: true,
          idField: 'midWifeID',
          textField: 'name',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };

      }, error => {
      }
    )
  }


  public ChangAllIndependentPeople(data) {
    // this.monthstartdate = data[0].toLocaleString().split(',')[0];
    // this.monthenddate = data[1].toLocaleString().split(',')[0];


    this.monthstartdate = this.docservice.GetDates(data[0])
    this.monthenddate = this.docservice.GetDates(data[1])

    this.GetCounts();
    localStorage.setItem('StartTime', this.startdate)
    localStorage.setItem('EndDate', this.enddate)
    this.GetAllIndepenentPeopleRevenue();
  }

  public IndependentSubscriptionList: any;

  public GetAllIndepenentPeopleRevenue() {


    this.docservice.GetAllIndepenedentSubscriptionRevenue(this.monthstartdate, this.monthenddate, 0).subscribe(
      data => {

        this.IndependentSubscriptionList = data;

      }, error => {
      }
    )

  }

  public typeid: any;

  public GetTypeID(even) {
    this.typeid = even.target.value;
  }




  public filterdid: any;

  public GetHomecareTypeID(item: any) {
    this.filterdid = item.id;
    this.GetAllIndependentPeopleRevenueByTypeID();
  }


  public GetNurseID(item2: any) {
    this.filterdid = item2.nurseID;
    this.GetAllIndependentPeopleRevenueByTypeID();
  }

  public GetMidWifeID(item3: any) {
    this.filterdid = item3.midWifeID;
    this.GetAllIndependentPeopleRevenueByTypeID();
  }

  public GetPhysiotherapistID(item4: any) {
    this.filterdid = item4.physiotherapyID;
    this.GetAllIndependentPeopleRevenueByTypeID();
  }

  public GetAllIndependentPeopleRevenueByTypeID() {
    this.docservice.GetAllIndepenedentSubscriptionRevenueByTypeID(this.monthstartdate, this.monthenddate, 0, this.typeid, this.filterdid).subscribe(
      data => {

        this.IndependentSubscriptionList = data;

      }, error => {
      }
    )
  }



  //Home Care Charges
  DiagnosticChargeslist: any;

  // public GetDiagnosticHomeCareCharges() {
  //   this.docservice.GetDianosticAppointments_PaymentsReport(this.monthstartdate, this.monthenddate, this.languageid).subscribe(
  //     data => {

  //       this.DiagnosticChargeslist = data;

  //     }, error => {
  //     }
  //   )
  // }


  // public GetPharmacyHomeCareList() {
  //   this.docservice.GetDianosticAppointments_PaymentsReport(this.monthstartdate, this.monthenddate, this.languageid).subscribe(
  //     data => {

  //       this.DiagnosticChargeslist = data;

  //     }, error => {
  //     }
  //   )
  // }
  diaphacounts: any;


  public GetDiaPharmacCounts() {

    this.docservice.GetDiaPharmacCounts(this.monthstartdate, this.monthenddate, this.languageid).subscribe(
      data => {

        this.diaphacounts = data;

      }, error => {
      }
    )
  }


  public GetHomeChargesSelectDate(data) {
    this.monthstartdate = this.docservice.GetDates(data[0])
    this.monthenddate = this.docservice.GetDates(data[1])

    localStorage.setItem('SDATE', this.monthstartdate)
    localStorage.setItem('EDATE', this.monthenddate)

    this.GetDiaPharmacCounts();
  }

}

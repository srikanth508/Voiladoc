import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-physio-month-wise-sch',
  templateUrl: './physio-month-wise-sch.component.html',
  styleUrls: ['./physio-month-wise-sch.component.css']
})
export class PhysioMonthWiseSchComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public physioid: any;
  public languageid: any;
  public Workinglist: any;
  public timeSheetTablearray = [];
  public TodatDate: any;
  public workingdetails: any;
  showmonth: any;
  month: any;
  year: any;
  labels: any;
  dummlistphysiolist: any;
  hospitalclinicid: any;
  physioist: any;
  count: any;

  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');


    this.docservice.GetPhysiotherapyRegistrationAdminByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.dummlistphysiolist = data;
        this.physioist = this.dummlistphysiolist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
        this.count = this.physioist.length
      }, error => {
      }
    )
    this.timeSheetTablearray = [];
    this.TodatDate = new Date();
    var date = new Date();

    // var startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    // var Lastdate;
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    // debugger
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    debugger
    this.month = date.getMonth();
    this.year = date.getFullYear();

    var startdate = new Date(this.year, this.month, 1);
    var Lastdate;
    var firstDay = new Date(this.year, this.month, 1).getDate();
    debugger
    var lastDay = new Date(this.year, this.month + 1, 0).getDate();
    this.showmonth = new Date(startdate).toDateString().substring(4, 7);
    this.getlanguage()
  }

  Select: any;

  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.Select = this.labels[0].selectt;
      }, error => {
      }
    )
  }



  public GetPhysioTimings() {
    ;
    this.docservice.GetPhysiotherapyHospitalDetailsWeb(this.physioid, this.languageid).subscribe(
      data => {
        ;
        this.workingdetails = data;
        ;
        for (let t = 0; t < this.timeSheetTablearray.length; t++) {

          let kkk = this.timeSheetTablearray[t]._day;

          let validatedate = kkk.substring(0, 10);
          this.timeSheetTablearray[t]["_day"] = validatedate;
          let kk = this.workingdetails.filter(x => x.day == validatedate);

          if (kk.length > 0) {
            this.timeSheetTablearray[t]["day"] = kk[0].day;
            this.timeSheetTablearray[t]["hospital_ClinicName"] = kk[0].hospital_ClinicName;
            this.timeSheetTablearray[t]["physiohospitalid"] = kk[0].physiohospitalid;
            this.timeSheetTablearray[t]["dayOfTheWeek"] = kk[0].dayOfTheWeek;
            this.timeSheetTablearray[t]["startime"] = kk[0].starttime;
            this.timeSheetTablearray[t]["endtime"] = kk[0].endtime;
            this.timeSheetTablearray[t]["physioname"] = kk[0].name;
          }
        }
      }, error => {
      }
    )
  }

  public nursehospitalid: any;
  public date: any;
  physiohospitalid: any;


  public GetDisableDate(physiohospitalid, date) {
    this.physiohospitalid = physiohospitalid;
    this.date = date;
    this.DisableDay()
  }


  public DisableDay() {
    var entity = {
      'PhysioID': this.physioid,
      'PhysiHospitalID': this.physiohospitalid,
      'Date': this.date
    }
    this.docservice.InsertPhysiotherapistDisabledSlots(entity).subscribe(data => {
      Swal.fire('Disabled Successfully');
      this.GetPhysioTimings()
      this.GetPhysioDisablelist()
    })
  }



  disablelist: any;


  public GetPhysioDisablelist() {
    this.docservice.GetPhysiotherapistDisabledSlots().subscribe(data => {
      this.disablelist = data;

      for (let t = 0; t < this.timeSheetTablearray.length; t++) {
        debugger

        let kkk = this.timeSheetTablearray[t]._fulldate;
        let validatedate = kkk.substring(0, 10);
        debugger
        this.timeSheetTablearray[t]["_fulldate"] = validatedate;

        let zz = this.disablelist.filter(x => x.date == validatedate && x.physioID == this.physioid);
        debugger
        debugger
        if (zz.length > 0) {
          this.timeSheetTablearray[t]["disabled"] = 1

        }
        else {
          this.timeSheetTablearray[t]["disabled"] = 0

        }
      }
    })
  }


  public GetDeleteSlots(date) {
    debugger
    this.docservice.DeletePhysiotherapistDisabledSlots(this.physioid, date).subscribe(data => {

      Swal.fire('Enabled Successfully')
      this.GetPhysioTimings()
      this.GetPhysioDisablelist()
    })
  }




  public ChangeMonth(even) {
    debugger
    this.month = even.target.value;

    this.timeSheetTablearray = [];
    this.TodatDate = new Date();
    var date = new Date();
    this.showmonth = "";
    let month = ""
    // var startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    // var Lastdate;
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    // debugger
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    debugger
    // this.month = date.getMonth();

    var startdate = new Date(date.getFullYear(), this.month, 1);
    var Lastdate;
    var firstDay = new Date(date.getFullYear(), this.month, 1).getDate();
    debugger
    var lastDay = new Date(date.getFullYear(), this.month + 1, 0).getDate();

    this.showmonth = new Date(startdate).toDateString().substring(4, 7);

    for (let h = 0; h < lastDay; h++) {

      //let day = firstDay.toDateString().substring(0, 3);
      let day = "";

      if (this.timeSheetTablearray.length == 0) {

        day = new Date(startdate.setDate(startdate.getDate())).toDateString().substring(0, 3);
      }
      else {
        day = new Date(startdate.setDate(startdate.getDate() + 0)).toDateString().substring(0, 3);
      }

      let date = startdate.getDate();
      debugger

      let month = new Date(startdate).toDateString().substring(4, 7);


      let subfulldate = new Date(startdate.setDate(startdate.getDate() + 1));


      let fulldate = subfulldate.toISOString();

      let montdata = { _day: day, _date: date, _month: month, _fulldate: fulldate, hrs: 0 };
      this.timeSheetTablearray.push(montdata);

    }
    this.GetPhysioTimings()
    this.GetPhysioDisablelist()
  }




  public GetPhysiotherapistID(even) {
    this.physioid = even.target.value;


    this.timeSheetTablearray = [];
    this.TodatDate = new Date();
    var date = new Date();
    this.showmonth = "";
    let month = ""
    // var startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    // var Lastdate;
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    // debugger
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    debugger
    // this.month = date.getMonth();

    var startdate = new Date(date.getFullYear(), this.month, 1);
    var Lastdate;
    var firstDay = new Date(date.getFullYear(), this.month, 1).getDate();
    debugger
    var lastDay = new Date(date.getFullYear(), this.month + 1, 0).getDate();

    this.showmonth = new Date(startdate).toDateString().substring(4, 7);

    for (let h = 0; h < lastDay; h++) {

      //let day = firstDay.toDateString().substring(0, 3);
      let day = "";

      if (this.timeSheetTablearray.length == 0) {

        day = new Date(startdate.setDate(startdate.getDate())).toDateString().substring(0, 3);
      }
      else {
        day = new Date(startdate.setDate(startdate.getDate() + 0)).toDateString().substring(0, 3);
      }

      let date = startdate.getDate();
      debugger

      let month = new Date(startdate).toDateString().substring(4, 7);


      let subfulldate = new Date(startdate.setDate(startdate.getDate() + 1));


      let fulldate = subfulldate.toISOString();

      let montdata = { _day: day, _date: date, _month: month, _fulldate: fulldate, hrs: 0 };
      this.timeSheetTablearray.push(montdata);

      this.GetPhysioDisablelist();
      this.GetPhysioTimings()
    }
  }

  public ChangeYear(even) {
    this.year = even.target.value;


    this.timeSheetTablearray = [];
    this.TodatDate = new Date();
    var date = new Date();
    this.showmonth = "";

    // var startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    // var Lastdate;
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    // debugger
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    debugger
    // this.month = date.getMonth();

    var startdate = new Date(this.year, this.month, 1);
    var Lastdate;
    var firstDay = new Date(this.year, this.month, 1).getDate();
    debugger
    var lastDay = new Date(this.year, this.month + 1, 0).getDate();



    for (let h = 0; h < lastDay; h++) {

      //let day = firstDay.toDateString().substring(0, 3);
      let day = "";

      if (this.timeSheetTablearray.length == 0) {

        day = new Date(startdate.setDate(startdate.getDate())).toDateString().substring(0, 3);
      }
      else {
        day = new Date(startdate.setDate(startdate.getDate() + 0)).toDateString().substring(0, 3);
      }


      let date = startdate.getDate();
      debugger
      this.showmonth = new Date(startdate).toDateString().substring(4, 7);
      let month = new Date(startdate).toDateString().substring(4, 7);


      let subfulldate = new Date(startdate.setDate(startdate.getDate() + 1));


      let fulldate = subfulldate.toISOString();

      let montdata = { _day: day, _date: date, _month: month, _fulldate: fulldate, hrs: 0 };
      this.timeSheetTablearray.push(montdata);

    }
    this.GetPhysioTimings()
    this.GetPhysioDisablelist()
  }
}

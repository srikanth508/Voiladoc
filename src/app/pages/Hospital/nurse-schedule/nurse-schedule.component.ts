import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nurse-schedule',
  templateUrl: './nurse-schedule.component.html',
  styleUrls: ['./nurse-schedule.component.css']
})
export class NurseScheduleComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }
  public timeSheetTablearray = [];
  public TodatDate: any;
  public languageid: any;
  public workingdetails: any;
  showmonth: any;
  month: any;
  year: any;
  labels: any;
  Select: any;
  public nurseid: any;
  public Workinglist: any;
  public dummlist: any;
  public nurselist: any;
  public count: any;
  public hospitalclinicid: any;

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalclinicid = localStorage.getItem('hospitalid');
    this.timeSheetTablearray = [];
    this.TodatDate = new Date();
    var date = new Date();


    this.docservice.GetNurseRegistrationAdminByLanguageID(this.languageid).subscribe(
      data => {
       
        this.dummlist = data;
        this.nurselist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalclinicid)
        this.count = this.nurselist.length
      }, error => {
      }
    )

    // var startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    // var Lastdate;
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    //
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
   
    this.month = date.getMonth();
    this.year = date.getFullYear();

    var startdate = new Date(this.year, this.month, 1);
    var Lastdate;
    var firstDay = new Date(this.year, this.month, 1).getDate();
   
    var lastDay = new Date(this.year, this.month + 1, 0).getDate();


    this.showmonth = new Date(startdate).toDateString().substring(4, 7);

    // for (let h = 0; h < lastDay; h++) {

    //   //let day = firstDay.toDateString().substring(0, 3);
    //   let day = "";

    //   if (this.timeSheetTablearray.length == 0) {

    //     day = new Date(startdate.setDate(startdate.getDate())).toDateString().substring(0, 3);
    //   }
    //   else {
    //     day = new Date(startdate.setDate(startdate.getDate() + 0)).toDateString().substring(0, 3);
    //   }


    //   let date = startdate.getDate();
    //   this.showmonth = new Date(startdate).toDateString().substring(4, 7);
    //   let month = new Date(startdate).toDateString().substring(4, 7);


    //   let subfulldate = new Date(startdate.setDate(startdate.getDate() + 1));


    //   let fulldate = subfulldate.toISOString();

    //   let montdata = { _day: day, _date: date, _month: month, _fulldate: fulldate, hrs: 0 };
    //   this.timeSheetTablearray.push(montdata);

    // }
    this.getlanguage()

  }



  public GetNurseID(even) {
    this.nurseid = even.target.value;



    this.timeSheetTablearray = [];
    this.TodatDate = new Date();
    var date = new Date();
    this.showmonth = "";

    // var startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    // var Lastdate;
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    //
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
   
    // this.month = date.getMonth();

    var startdate = new Date(this.year, this.month, 1);
    var Lastdate;
    var firstDay = new Date(this.year, this.month, 1).getDate();
   
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
     
      this.showmonth = new Date(startdate).toDateString().substring(4, 7);
      let month = new Date(startdate).toDateString().substring(4, 7);


      let subfulldate = new Date(startdate.setDate(startdate.getDate() + 1));


      let fulldate = subfulldate.toISOString();

      let montdata = { _day: day, _date: date, _month: month, _fulldate: fulldate, hrs: 0 };
      this.timeSheetTablearray.push(montdata);
    }




    this.GetNurseTimings()
    this.GetNurseDisabledList()
  }




  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
        this.Select = this.labels[0].selectt;
      }, error => {
      }
    )
  }



  public GetNurseTimings() {
    ;
    this.docservice.GetNurseHospitalDetailsWeb(this.nurseid, this.languageid).subscribe(
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
            this.timeSheetTablearray[t]["nursehospitalid"] = kk[0].nursehospitalid;
            this.timeSheetTablearray[t]["dayOfTheWeek"] = kk[0].dayOfTheWeek;
            this.timeSheetTablearray[t]["startime"] = kk[0].startime;
            this.timeSheetTablearray[t]["endtime"] = kk[0].endtime;
            this.timeSheetTablearray[t]["nurseName"] = kk[0].nurseName;
          }
        }
      }, error => {
      }
    )
  }

  public nursehospitalid: any;
  public date: any;


  public GetDisableDate(nursehospitalid, date) {
    this.nursehospitalid = nursehospitalid;
    this.date = date;
    this.DisableDay()
  }


  public DisableDay() {
    var entity = {
      'NurseHospitalID': this.nursehospitalid,
      'NurseID': this.nurseid,
      'Date': this.date
    }
    this.docservice.InsertNurseDisabledSlots(entity).subscribe(data => {
      Swal.fire('Disabled Successfully');
      this.GetNurseTimings()
      this.GetNurseDisabledList()
    })

  }



  disablelist: any;


  public GetNurseDisabledList() {
    this.docservice.GetNurseDisabledSlots().subscribe(data => {
      this.disablelist = data;

      for (let t = 0; t < this.timeSheetTablearray.length; t++) {
       

        let kkk = this.timeSheetTablearray[t]._fulldate;
        let validatedate = kkk.substring(0, 10);
       
        this.timeSheetTablearray[t]["_fulldate"] = validatedate;

        let zz = this.disablelist.filter(x => x.date == validatedate && x.nurseID == this.nurseid);
       
       
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
   
    this.docservice.DeleteNurseDisabledSlots(this.nurseid, date).subscribe(data => {

      Swal.fire('Enabled Successfully')
      this.GetNurseTimings()
      this.GetNurseDisabledList()
    })
  }




  public ChangeMonth(even) {
   
    this.month = even.target.value;

    this.timeSheetTablearray = [];
    this.TodatDate = new Date();
    var date = new Date();
    this.showmonth = "";
    let month = ""
    // var startdate = new Date(date.getFullYear(), date.getMonth(), 1);
    // var Lastdate;
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
    //
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
   
    // this.month = date.getMonth();

    var startdate = new Date(date.getFullYear(), this.month, 1);
    var Lastdate;
    var firstDay = new Date(date.getFullYear(), this.month, 1).getDate();
   
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
     

      let month = new Date(startdate).toDateString().substring(4, 7);


      let subfulldate = new Date(startdate.setDate(startdate.getDate() + 1));


      let fulldate = subfulldate.toISOString();

      let montdata = { _day: day, _date: date, _month: month, _fulldate: fulldate, hrs: 0 };
      this.timeSheetTablearray.push(montdata);

    }
    this.GetNurseTimings()
    this.GetNurseDisabledList()
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
    //
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
   
    // this.month = date.getMonth();

    var startdate = new Date(this.year, this.month, 1);
    var Lastdate;
    var firstDay = new Date(this.year, this.month, 1).getDate();
   
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
     
      this.showmonth = new Date(startdate).toDateString().substring(4, 7);
      let month = new Date(startdate).toDateString().substring(4, 7);


      let subfulldate = new Date(startdate.setDate(startdate.getDate() + 1));


      let fulldate = subfulldate.toISOString();

      let montdata = { _day: day, _date: date, _month: month, _fulldate: fulldate, hrs: 0 };
      this.timeSheetTablearray.push(montdata);

    }
    this.GetNurseTimings()
    this.GetNurseDisabledList()
  }
}

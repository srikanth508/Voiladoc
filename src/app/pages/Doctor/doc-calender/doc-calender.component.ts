import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doc-calender',
  templateUrl: './doc-calender.component.html',
  styleUrls: ['./doc-calender.component.css']
})
export class DocCalenderComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public timeSheetTablearray = [];
  public TodatDate: any;
  public doctorid: any;
  public languageid: any;
  public workingdetails: any;
  showmonth: any;
  month: any;
  year: any;
  labels: any;
  Select: any;

  ngOnInit() {



    this.doctorid = localStorage.getItem('userid');
    this.languageid = localStorage.getItem('LanguageID');


    this.docservice.GetDoctorHospitalDetailsWeb(this.doctorid, this.languageid).subscribe(
      data => {
        ;
        this.workingdetails = data;
      })
      
    this.getlanguage()

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

      // let kkk = this.timeSheetTablearray[t]._fulldate;
      // let validatedate = kkk.substring(0, 10);
    
      // let validatedate = kkk.substring(0, 10);
      // this.timeSheetTablearray[t]["_day"] = validatedate;
      // let kk = this.workingdetails.filter(x => x.day == validatedate);



      this.timeSheetTablearray.push(montdata);


    }

    this.GetDoctorHospitalDetails();
    this.getGetDoctorDisabledSlots()
  }



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



  disablelist: any;
  fulldate: any;

  public getGetDoctorDisabledSlots() {
    this.docservice.GetDoctorDisabledSlots().subscribe(data => {
      this.disablelist = data;

      for (let t = 0; t < this.timeSheetTablearray.length; t++) {
        debugger

        let kkk = this.timeSheetTablearray[t]._fulldate;
        let validatedate = kkk.substring(0, 10);
        debugger
        this.timeSheetTablearray[t]["_fulldate"] = validatedate;

        let zz = this.disablelist.filter(x => x.date == validatedate && x.doctorID == this.doctorid);
        debugger
        debugger
        if (zz.length > 0) {
          for (let i = 0; i < zz.length; i++) {

            if (zz[i].timeID == 1) {
              this.timeSheetTablearray[t]["date"] = zz[i].date;
              this.timeSheetTablearray[t]["mrngtimeid"] = zz[i].timeID;
              this.timeSheetTablearray[t]["afternoontimeid"] = 6;
              this.timeSheetTablearray[t]["eveningtimeid"] = 6;
              this.timeSheetTablearray[t]["niighttimeid"] = 6;

            }
            else if (zz[i].timeID == 2) {
              this.timeSheetTablearray[t]["date"] = zz[i].date;
              this.timeSheetTablearray[t]["afternoontimeid"] = zz[i].timeID;
              this.timeSheetTablearray[t]["eveningtimeid"] = 6;
              this.timeSheetTablearray[t]["niighttimeid"] = 6;

            }

            else if (zz[i].timeID == 3) {
              this.timeSheetTablearray[t]["date"] = zz[i].date;
              this.timeSheetTablearray[t]["eveningtimeid"] = zz[i].timeID;
              this.timeSheetTablearray[t]["niighttimeid"] = 6;
            }

            else if (zz[i].timeID == 4) {
              this.timeSheetTablearray[t]["date"] = zz[i].date;
              this.timeSheetTablearray[t]["niighttimeid"] = zz[i].timeID;
            }

            else {

              this.timeSheetTablearray[t]["mrngtimeid"] = 6
              this.timeSheetTablearray[t]["afternoontimeid"] = 6
              this.timeSheetTablearray[t]["eveningtimeid"] = 6
              this.timeSheetTablearray[t]["niighttimeid"] = 6

            }
          }

          debugger
        }
        else {

          this.timeSheetTablearray[t]["mrngtimeid"] = 6
          this.timeSheetTablearray[t]["afternoontimeid"] = 6
          this.timeSheetTablearray[t]["eveningtimeid"] = 6
          this.timeSheetTablearray[t]["niighttimeid"] = 6

        }
      }
    })
  }



  public GetDoctorHospitalDetails() {
    ;
    this.docservice.GetDoctorHospitalDetailsWeb(this.doctorid, this.languageid).subscribe(
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
            if (kk[0].dayOfTheWeek != undefined)
            {
              debugger
             this.timeSheetTablearray[t]["day"] = kk[0].day;
            this.timeSheetTablearray[t]["mrngStartTime"] = kk[0].mrngStartTime;
            this.timeSheetTablearray[t]["mrngEndTime"] = kk[0].mrngEndTime;
            this.timeSheetTablearray[t]["noonStartTime"] = kk[0].noonStartTime;
            this.timeSheetTablearray[t]["noonEndTime"] = kk[0].noonEndTime;
            this.timeSheetTablearray[t]["evngStartTime"] = kk[0].evngStartTime;
            this.timeSheetTablearray[t]["evngEndTime"] = kk[0].evngEndTime;
            this.timeSheetTablearray[t]["nightStartTime"] = kk[0].nightStartTime;
            this.timeSheetTablearray[t]["nightEndTime"] = kk[0].nightEndTime;
            this.timeSheetTablearray[t]["doctorName"] = kk[0].doctorName;
            this.timeSheetTablearray[t]["hospital_ClinicName"] = kk[0].hospital_ClinicName;
            this.timeSheetTablearray[t]["doctorHospitalDetailsID"] = kk[0].doctorHospitalDetailsID;

            this.timeSheetTablearray[t]["mrngAppointtypeID"] = kk[0].mrngAppointtypeID;
            this.timeSheetTablearray[t]["afternoonAppointmentTypeID"] = kk[0].afternoonAppointmentTypeID;
            this.timeSheetTablearray[t]["eveningAppointmentTypeID"] = kk[0].eveningAppointmentTypeID;
            this.timeSheetTablearray[t]["nightAppointmentTypeID"] = kk[0].nightAppointmentTypeID;
            // this.timeSheetTablearray[t]["mtextcolor"] = kk[0].mtextcolor;
            // this.timeSheetTablearray[t]["atextcolor"] = kk[0].atextcolor;
            // this.timeSheetTablearray[t]["etextcolor"] = kk[0].etextcolor;
            // this.timeSheetTablearray[t]["ntextcolor"] = kk[0].ntextcolor;

            this.timeSheetTablearray[t]["dayOfTheWeek"] = kk[0].dayOfTheWeek;

          }
        }
        }

      }, error => {
      }
    )
  }

  dochosptailid: any;
  timeid: any;
  date: any;

  public GetDisableslots(doctorHospitalDetailsID, timeid, date) {
    debugger
    this.dochosptailid = doctorHospitalDetailsID;
    this.timeid = timeid;
    this.date = date;
    this.insertdetails()
  }


  public insertdetails() {
    var entity = {
      'DoctorHospitalID': this.dochosptailid,
      'DoctorID': this.doctorid,
      'TimeID': this.timeid,
      'Date': this.date
    }
    this.docservice.InsertDoctorDisabledSlots(entity).subscribe(data => {
      if (this.languageid == 1) {
        //Swal.fire('Disabled Successfully');
        Swal.fire(
          '',
          'Disabled Successfully')
        this.GetDoctorHospitalDetails();
        this.getGetDoctorDisabledSlots()
      }
      else if (this.languageid == 6) {
        Swal.fire('Désactivé avec succès');
        this.GetDoctorHospitalDetails();
        this.getGetDoctorDisabledSlots()
      }

    })
  }


  public GetDeleteSlots(doctorHospitalDetailsID, timeid, date) {
    debugger
    this.dochosptailid = doctorHospitalDetailsID;
    this.timeid = timeid;
    this.date = date;
    this.getdeleteslots()
  }


  public getdeleteslots() {
    debugger
    this.docservice.DeleteDisableSlots(this.dochosptailid, this.doctorid, this.timeid, this.date).subscribe(data => {
      if (this.languageid == 1) {
        Swal.fire('Enabled Successfully');
        this.GetDoctorHospitalDetails();
        this.getGetDoctorDisabledSlots()
      }
      else if (this.languageid == 6) {
        Swal.fire('Détails enregistrés');
        this.GetDoctorHospitalDetails();
        this.getGetDoctorDisabledSlots()
      }

    })
  }



  public GetDeleteAllSlots(doctorHospitalDetailsID, date) {
    this.dochosptailid = doctorHospitalDetailsID;
    this.date = date;
    this.GetDeleteAllSlotsDay()
  }


  public GetDeleteAllSlotsDay() {
    debugger
    this.timeid = 0
    for (let i = 0; i < 4; i++) {
      this.timeid = this.timeid + 1
      this.docservice.DeleteDisableSlots(this.dochosptailid, this.doctorid, this.timeid, this.date).subscribe(data => {

        if (this.languageid == 1) {
          Swal.fire('Enabled Successfully');
          this.GetDoctorHospitalDetails();
          this.getGetDoctorDisabledSlots()
        }
        else if (this.languageid == 6) {
          Swal.fire('Détails enregistrés');
          this.GetDoctorHospitalDetails();
          this.getGetDoctorDisabledSlots()
        }

      })
    }

  }




  public GetAllDisableSlots(doctorHospitalDetailsID, date) {
    this.dochosptailid = doctorHospitalDetailsID;
    this.date = date;
    this.disableAllday()
  }



  public disableAllday() {
    this.timeid = 0
    for (let i = 0; i < 4; i++) {
      this.timeid = this.timeid + 1
      var entity = {
        'DoctorHospitalID': this.dochosptailid,
        'DoctorID': this.doctorid,
        'TimeID': this.timeid,
        'Date': this.date
      }
      this.docservice.InsertDoctorDisabledSlots(entity).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Disabled Successfully');
          this.GetDoctorHospitalDetails();
          this.getGetDoctorDisabledSlots()
        }
        else if (this.languageid == 6) {
          Swal.fire('Désactivé avec succès');
          this.GetDoctorHospitalDetails();
          this.getGetDoctorDisabledSlots()
        }

      })
    }
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
    this.GetDoctorHospitalDetails();
    this.getGetDoctorDisabledSlots()
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
    this.GetDoctorHospitalDetails();
    this.getGetDoctorDisabledSlots()
  }
}

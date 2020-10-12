import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { formatDate, DatePipe } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { debug } from 'util';
@Component({
  selector: 'app-doctorslots',
  templateUrl: './doctorslots.component.html',
  styleUrls: ['./doctorslots.component.css']
})
export class DoctorslotsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute, public datepipe: DatePipe) {


  }
  selecteddate: any;

  public doctorid: any;
  public dochospitalid: any;
  public hospitalclinicid: any;
  public todaydate: any;
  public doctorslots: any;
  public afternoonslots: any;
  public eveningslosts: any;
  public nightslots: any;
  public dayid: any;
  public appointmenttypeid: any;
  public bookingTypeID: any;

  SDate = new Date();
  PresentTime: any;
  languageid: any;
  dayidslist: any;

  dummdoctorslots: any;
  dummafternoonslots: any;
  dummeveningslots: any;
  dummnightslots: any;
  filterdate: any;

  dummdoctorslotsss: any;
  dummafternoonslotssss: any;
  dummeveningslotssss: any;
  dummnightslotsss: any;
  date: any;
  todaydatessss: any;
  labels: any;
  serverdateandtime: any;
  doctorfees: any;
  ngOnInit() {
   
    this.languageid = localStorage.getItem('LanguageID');
    // const format = 'yyyy-MM-dd';
    // const myDate = new Date();
    // const locale = 'en-US';
    // this.todaydatessss = formatDate(myDate, format, locale);
    if (this.languageid == 1) {
      this.docservice.GetServerDateAndTime().subscribe(
        data => {
          this.serverdateandtime = data;

          this.todaydatessss = this.serverdateandtime.todaydateeeesss.toLocaleString()
          // this.selecteddate = this.serverdateandtime.datePickerTodaydate
        }, error => {
        }
      )
    }
    else if (this.languageid == 6) {
      this.docservice.GetServerDateAndTime().subscribe(
        data => {
          this.serverdateandtime = data;

          this.todaydatessss = this.serverdateandtime.todaydateeeesss.toLocaleString()
          // this.selecteddate = this.serverdateandtime.datePickerTodaydate
        }, error => {
        }
      )
    }

    if (this.languageid == 1) {
      this.activatedroute.params.subscribe(params => {
       
        this.doctorid = params['doctorID'];
        this.dochospitalid = params['id'];
        this.hospitalclinicid = params['hospital_ClinicID'];
        this.appointmenttypeid = params['appointmentTypeID'];
        this.bookingTypeID = params['bookingTypeID'];
        this.doctorfees = params['feesNumber'];


        this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
          data => {
           
            this.labels = data;
          }, error => {
          }
        )

        this.todaydate = localStorage.getItem('SelectedDate');

        this.filterdate = this.todaydate
       
        //this.filterdate = this.todaydate
        var gsDayNames = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];
        var d = new Date(this.todaydate);
        var dayName = gsDayNames[d.getDay()];
        this.docservice.GetDayID(dayName).subscribe(data => {
         
          this.dayidslist = data;
          this.dayid = this.dayidslist[0].dayID;

          localStorage.setItem('doctorid', this.doctorid)
          localStorage.setItem('doctorhospitalid', this.dochospitalid);
          localStorage.setItem('appointmentate', this.todaydate);
          localStorage.setItem('Appointmenttypeid', this.appointmenttypeid);
          localStorage.setItem('BookingTypeID', this.bookingTypeID);
          localStorage.setItem('fees', this.doctorfees);

          if (this.todaydate == this.todaydatessss) {
            this.getdoctormorningslots();
            this.getafternoonslots();
            this.geteveningslots();
            this.GetNightslots();
          }
          else {
            this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 1, this.todaydate, this.dochospitalid).subscribe(
              data => {
               
                this.dummdoctorslotsss = data;
                this.doctorslots = this.dummdoctorslotsss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
              }, error => {
              }
            )
            this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 2, this.todaydate, this.dochospitalid).subscribe(
              data => {
               
                this.dummafternoonslotssss = data;
                this.afternoonslots = this.dummafternoonslotssss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
              }, error => {
              }
            )
            this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 3, this.todaydate, this.dochospitalid).subscribe(
              data => {
               
                this.dummeveningslotssss = data;
                this.eveningslosts = this.dummeveningslotssss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
              }, error => {
              }
            )
            this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 4, this.todaydate, this.dochospitalid).subscribe(
              data => {
               
                this.dummnightslotsss = data;
                this.nightslots = this.dummnightslotsss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
              }, error => {
              }
            )
          }

        })
      }
      )
      //this.DateofAdmission = this.datepipe.transform(details.admisiionDate, 'yyyy-MM-dd');
    }
    else if (this.languageid == 6) {
      this.activatedroute.params.subscribe(params => {
       
        this.doctorid = params['doctorID'];
        this.dochospitalid = params['id'];
        this.hospitalclinicid = params['hospital_ClinicID'];
        this.appointmenttypeid = params['appointmentTypeID'];
        this.bookingTypeID = params['bookingTypeID'];
        this.doctorfees = params['feesNumber'];
        this.languageid = localStorage.getItem('LanguageID');
     


        this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
          data => {
           
            this.labels = data;
          }, error => {
          }
        )

        this.todaydate = localStorage.getItem('SelectedDate');

        this.filterdate = this.datepipe.transform(this.todaydate, 'dd/MM/yyyy');
       
        //this.filterdate = this.todaydate
        var gsDayNames = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ];
        var d = new Date(this.todaydate);
        var dayName = gsDayNames[d.getDay()];
        this.docservice.GetDayID(dayName).subscribe(data => {
         
          this.dayidslist = data;
          this.dayid = this.dayidslist[0].dayID;

          localStorage.setItem('doctorid', this.doctorid)
          localStorage.setItem('doctorhospitalid', this.dochospitalid);
          localStorage.setItem('appointmentate', this.todaydate);
          localStorage.setItem('Appointmenttypeid', this.appointmenttypeid);
          localStorage.setItem('BookingTypeID', this.bookingTypeID);
          localStorage.setItem('fees', this.doctorfees);
          
          if (this.todaydate == this.todaydatessss) {
            this.getdoctormorningslots();
            this.getafternoonslots();
            this.geteveningslots();
            this.GetNightslots();
          }
          else {
            this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 1, this.todaydate, this.dochospitalid).subscribe(
              data => {
               
                this.dummdoctorslotsss = data;
                this.doctorslots = this.dummdoctorslotsss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
              }, error => {
              }
            )
            this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 2, this.todaydate, this.dochospitalid).subscribe(
              data => {
               
                this.dummafternoonslotssss = data;
                this.afternoonslots = this.dummafternoonslotssss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
              }, error => {
              }
            )
            this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 3, this.todaydate, this.dochospitalid).subscribe(
              data => {
               
                this.dummeveningslotssss = data;
                this.eveningslosts = this.dummeveningslotssss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
              }, error => {
              }
            )
            this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 4, this.todaydate, this.dochospitalid).subscribe(
              data => {
               
                this.dummnightslotsss = data;
                this.nightslots = this.dummnightslotsss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
              }, error => {
              }
            )
          }

        })
      }
      )
      //this.DateofAdmission = this.datepipe.transform(details.admisiionDate, 'yyyy-MM-dd');
    }



  }

  public GetDate(even) {
   
    this.selecteddate = even.toLocaleString().split(',')[0];
    // this.selecteddate = even.target.value;
    // this.selecteddate =new Date(even.setDate(even.getDate())).toJSON().slice(0,10).split('-').reverse().join('/');

    // this.selecteddate =new Date(even.setDate(even.getDate() + 1)).toJSON().slice(0,10).split('-').reverse().join('-');

    localStorage.setItem('appointmentate', this.selecteddate);
    // this.selecteddate = even.target.value;
    if (this.selecteddate == this.todaydatessss) {
      this.dayid = (new Date()).getDay();
      this.getdoctormorningslots();
      this.getafternoonslots();
      this.geteveningslots();
      this.GetNightslots();
    }
    else {
      var gsDayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];

      var d = new Date(this.selecteddate);
      var dayName = gsDayNames[d.getDay()];
      this.docservice.GetDayID(dayName).subscribe(data => {
       
        this.dayidslist = data;
        this.dayid = this.dayidslist[0].dayID;
        this.selecteddate = even.toLocaleString().split(',')[0];
        this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 1, this.selecteddate, this.dochospitalid).subscribe(
          data => {
           
            this.dummdoctorslotsss = data;
            this.doctorslots = this.dummdoctorslotsss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
          }, error => {
          }
        )
        this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 2, this.selecteddate, this.dochospitalid).subscribe(
          data => {
           
            this.dummafternoonslotssss = data;
            this.afternoonslots = this.dummafternoonslotssss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
          }, error => {
          }
        )
        this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 3, this.selecteddate, this.dochospitalid).subscribe(
          data => {
           
            this.dummeveningslotssss = data;
            this.eveningslosts = this.dummeveningslotssss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
          }, error => {
          }
        )
        this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 4, this.selecteddate, this.dochospitalid).subscribe(
          data => {
           
            this.dummnightslotsss = data;
            this.nightslots = this.dummnightslotsss.filter(x => x.appointmentTypeID == this.appointmenttypeid)
          }, error => {
          }
        )
      })
    }


    localStorage.setItem('appointmentate', this.selecteddate);

  }
  hours: any;
  minutes: any;
  public getdoctormorningslots() {
   
    // this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    let d = new Date();
    this.hours = d.getHours() + 2
    this.minutes = d.getMinutes() + 30
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;
    this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 1, this.todaydate, this.dochospitalid).subscribe(
      data => {
       
        this.dummdoctorslots = data;
        this.doctorslots = this.dummdoctorslots.filter(x => x.slotcompare > cts && x.appointmentTypeID == this.appointmenttypeid);
      }, error => {
      }
    )
  }

  public getafternoonslots() {
   
    //this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    let d = new Date();
    this.hours = d.getHours() + 2
    this.minutes = d.getMinutes() + 30
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;

    this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 2, this.todaydate, this.dochospitalid).subscribe(
      data => {
       
        this.dummafternoonslots = data;
        this.afternoonslots = this.dummafternoonslots.filter(x => x.slotcompare > cts && x.appointmentTypeID == this.appointmenttypeid);
      }, error => {
      }
    )
  }

  public geteveningslots() {
   
    let d = new Date();
    this.hours = d.getHours() + 2
    this.minutes = d.getMinutes() + 30
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;
    // this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 3, this.todaydate, this.dochospitalid).subscribe(
      data => {
       
        this.dummeveningslots = data;
        this.eveningslosts = this.dummeveningslots.filter(x => x.slotcompare > cts && x.appointmentTypeID == this.appointmenttypeid)
      }, error => {
      }
    )
  }

  public GetNightslots() {
   
    //this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
    let d = new Date();
    this.hours = d.getHours() + 2
    this.minutes = d.getMinutes() + 30
    let h = (d.getHours() < 10 ? '0' : '') + this.hours;
    let m = (d.getMinutes() + 150 < 10 ? '0' : '') + this.minutes;
    let cts = h + ':' + m;
    this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 4, this.todaydate, this.dochospitalid).subscribe(
      data => {
       
        this.dummnightslots = data;
        this.nightslots = this.dummnightslots.filter(x => x.slotcompare > cts && x.appointmentTypeID == this.appointmenttypeid);
      }, error => {
      }
    )
  }






  // public GetDate(even) {
  //  
  //   // this.todaydate = even.target.value;
  //    this.todaydate = even.toLocaleString().split(',')[0];

  //   // this.dayid = (this.SDate).getDay();
  //   // localStorage.setItem('appointmentate', this.todaydate);
  //  // this.todaydate = new Date(date);
  //   this.dayid = (this.SDate).getDay();
  //   localStorage.setItem('appointmentate', this.todaydate);
  //   this.getdoctormorningslots();
  //   this.getafternoonslots();
  //   this.geteveningslots();
  //   this.GetNightslots();
  // }



  // public getdoctormorningslots() {
  //  
  //   this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
  //   this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 1, this.todaydate, this.dochospitalid).subscribe(
  //     data => {
  //      
  //       this.doctorslots = data;
  //     }, error => {
  //     }
  //   )
  // }

  // public getafternoonslots() {
  //  
  //   this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
  //   this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 2, this.todaydate, this.dochospitalid).subscribe(
  //     data => {
  //      
  //       this.afternoonslots = data;
  //     }, error => {
  //     }
  //   )
  // }
  // public geteveningslots() {
  //  
  //   this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
  //   this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 3, this.todaydate, this.dochospitalid).subscribe(
  //     data => {
  //      
  //       this.eveningslosts = data
  //     }, error => {
  //     }
  //   )
  // }

  // public GetNightslots() {
  //  
  //   this.PresentTime = this.datepipe.transform(new Date(), 'shortTime');
  //   this.docservice.GetDoctorSlotsForWeb(this.doctorid, this.dayid, this.hospitalclinicid, 4, this.todaydate, this.dochospitalid).subscribe(
  //     data => {
  //      
  //       this.nightslots = data;
  //     }, error => {
  //     }
  //   )
  // }

}

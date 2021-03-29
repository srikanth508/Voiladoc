import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-doc-working-dash',
  templateUrl: './doc-working-dash.component.html',
  styleUrls: ['./doc-working-dash.component.css']
})
export class DocWorkingDashComponent implements OnInit {
  workingdetailscopy: any;

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public languageid: any;
  public labels: any;
  public workingdetails: any;
  public hospitalid: any;
  public dummworkingdetails: any;
  public term: any;
  public daysname: any;
  public dayslist: any;
  public dummlist: any;
  public doctorlist: any;
  public doctorname: any;


  public doctorid: any;
  public timeid: any;
  public availabilityid: any;
  public hospitallist: any;

  public availabilitylist: any;
  public slotslist: any;
  public slotsdd: any;
  public timedivisonid: any;
  public morningslotid: any;
  public aftrenoonslots = [];
  public eveningslots = [];
  public nightslots = [];
  public slotslist1: any;
  public slotsdd1: any;
  public slotslist2: any;
  public slotsdd2: any;
  public slotslist3: any;
  public slotsdd3: any;
  public tablecount: any;
  public dayid: any;
  public fees: any;

  public hosipitalidd: any;
  public qwerty = [];

  public slotid: any;
  public morningslots = [];
  public slotname: any;
  public mrng: any;
  public slotnameid: any;
  public mrngid: any;
  public afternoonslotarray = [];
  public slotname1: any;

  public slotnameid1: any;
  public eveningarray = [];
  public slotname2: any;
  public evening: any;
  public eveningid: any;
  public slotnameid2: any;
  public slotname3: any;
  public night: any;
  public slotnameid3: any;
  public nightid: any;
  public short: any;
  public hospital_ClinicName: any;
  public dayOfTheWeek: any;

  public details: any;
  public day: any;
  public name: any;
  public docid: any;
  public qwertyy = [];
  public idcount: any;
  public cleardropdown4 = [];
  public abcd: any;
  public dis1: any;
  public dis2: any;
  public dis3: any;

  public hspcliid: any;
  public dochspid: any;
  public hopitslname: any;
  public hopitsllist: any;
  public slottypeid: any;
  public docdd = {};
  public search: any;

  ngOnInit() {
    this.daysname = '';
    // this.doctorname = '';
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalid');
    this.getlanguage();
    // this.GetDoctorHospitalDetails();
    this.GetDaysMaster()

    if (this.hospitalid == undefined) {
      this.getdoctorforadmin();
    }
    if (this.hospitalid != undefined) {
      this.docservice.GetDoctorForAdminByLanguageIDForWorking(this.languageid).subscribe(
        data => {

          this.dummlist = data;

          this.doctorlist = this.dummlist.filter(x => x.hospitalClinicID == this.hospitalid)

          this.docdd = {
            singleSelection: true,
            idField: 'id',
            textField: 'doctorName',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            //  itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: this.search,
          };

        }, error => {
        }
      )
    }

  }




  public getdoctorforadmin() {

    this.docservice.GetDoctorForAdminByLanguageIDForWorking(this.languageid).subscribe(
      data => {

        this.doctorlist = data;
        this.dummlist = this.doctorlist

        this.docdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'doctorName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true,
          searchPlaceholderText: this.search,
        };
      }, error => {
      }
    )
  }

  public SelectLabel: any;

  public GetDaysMaster() {
    this.docservice.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.dayslist = data;
      }, error => {
      }
    )
  }
  public docselect: any;
  public getlanguage() {
    this.docservice.GetAdmin_DoctorLoginFeedbackWorkingDetails_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search,
          this.SelectLabel = this.labels[0].select
        this.docselect = this.labels[0].selectDoctor
      }, error => {
      }
    )
  }



  public GetDoctorHospitalDetails() {
    if (this.hospitalid == undefined) {
      this.docservice.GetDoctorWorkingDetails(this.languageid).subscribe(
        data => {

          this.workingdetails = data;
        }, error => {
        }
      )
    }
    else if (this.hospitalid != undefined) {
      this.docservice.GetDoctorWorkingDetails(this.languageid).subscribe(
        data => {

          this.dummworkingdetails = data;
          this.workingdetails = this.dummworkingdetails.filter(x => x.hospitalClinicID == this.hospitalid)
          this.workingdetailscopy = this.workingdetails;
        }, error => {
        }
      )
    }

  }
  dummwork: any;
  // doctorid: any;


  public GetDoctorID(item: any) {
    this.doctorid = item.id


    this.spinner.show();
    // this.GetDoctorsworkinglist()

    this.docservice.GetDoctorHospitalDetailsWebByDoctorID(this.doctorid, this.languageid).subscribe(
      data => {

        this.workingdetails = data;
        var list = this.workingdetails.filter(x => x.doctorID == this.doctorid)
        this.slottypeid = list[0].slotDurationID;
        this.dochspid = list[0].id;
        this.hospitalid = list[0].hospital_ClinicID;

        this.GetDoctorTimings();

      }, error => {
      }
    )
  }


  public Timings: any;

  public GetDoctorTimings() {

    this.docservice.GetDoctorSlotsByDoctorID(this.doctorid, this.slottypeid, this.languageid).subscribe(
      data => {

        this.Timings = data;
        this.spinner.hide();
      }, error => {
      }
    )
  }



  public GetDoctorsworkinglist() {
    this.docservice.GetDoctorWorkingDetails(this.languageid).subscribe(
      data => {

        this.dummworkingdetails = data;
        this.workingdetails = this.dummworkingdetails.filter(x => x.doctorID == this.doctorid)
      }, error => {
      }
    )

  }


  public appointmentypeid: any;



  public gettimeid(tid, dochspid, hspcliid, dayid, appointmentypeid, doctorID) {

    this.timeid = tid;
    this.dochspid = dochspid;
    this.hspcliid = hspcliid;
    this.dayid = dayid;
    this.appointmentypeid = appointmentypeid;
    this.doctorid = doctorID;



  }


  public GetMorningSlotsMasterbyid() {

    this.docservice.GetSlotsMasterByID(1, this.slottypeid).subscribe(
      data => {

        this.slotslist = data;
        this.slotsdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'slots',

          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll: false
        };
      }, error => {
      }
    )
  }




  public GetAfternoonSlotsMasterbyID() {

    this.docservice.GetSlotsMasterByID(2, this.slottypeid).subscribe(
      data => {

        this.slotslist1 = data;
        this.slotsdd1 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slots',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll: false
        };
      }, error => {
      }
    )
  }
  public GetEveningSlotsMasterByID() {

    this.docservice.GetSlotsMasterByID(3, this.slottypeid).subscribe(
      data => {

        this.slotslist2 = data;
        this.slotsdd2 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slots',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll: false
        };
      }, error => {
      }
    )
  }
  public GetNightSlotsMasterByID() {

    this.docservice.GetSlotsMasterByID(4, this.slottypeid).subscribe(
      data => {

        this.slotslist3 = data;
        this.slotsdd3 = {
          singleSelection: false,
          idField: 'id',
          textField: 'slots',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll: false
        };
      }, error => {
      }
    )
  }





  public GetMorningSlotsID(item: any) {

    this.morningslots.push(item);

    if (this.morningslots.length == 2) {
      this.abcd = 1;
    }
  }

  onItemDeSelect(item: any) {

    this.morningslots = this.morningslots.slice(item.id)
  }

  public GetAfternoonSlotsID(item1: any) {

    this.aftrenoonslots.push(item1);

    if (this.aftrenoonslots.length == 2) {
      this.dis1 = 1;
    }
  }


  onItemDeSelect1(item1: any) {

    this.aftrenoonslots = this.aftrenoonslots.slice(item1.id)
  }

  public GetEveningSlotsID(item2: any) {

    this.eveningslots.push(item2);

    if (this.eveningslots.length == 2) {
      this.dis2 = 1;
    }
  }

  onItemDeSelect2(item2: any) {

    this.eveningslots = this.eveningslots.slice(item2.id)
  }


  public GetNightSlotsID(item3: any) {

    this.nightslots.push(item3);
    if (this.nightslots.length == 2) {
      this.dis3 = 1;
    }
  }

  onItemDeSelect3(item3: any) {

    this.eveningslots = this.eveningslots.slice(item3.id)
  }

  public docslotid: any;

  public insertbookappointmenttype() {
    var entity = {
      'DoctorHospitalID': this.dochspid,
      'AppointmentTypeID': this.appointmentypeid
    }
    this.docservice.InsertBookAppointmentType(entity).subscribe(data => {
      if (data != undefined) {

      }
    })
  }

  public allappointmentid: any;

  public GetDay1List(details) {

    this.appointmentypeid = details.mondayappointmentID;
    this.slotid = details.mondaySlotID;
    this.allappointmentid = details.mondayappointmentID;
    this.dayid = details.mondayDayID;
    this.docslotid = details.docMondaySlotID;
    this.fees = details.mondayFees;
  }



  public GetDay2List(details) {

    this.appointmentypeid = details.tuesdayAppointmentID;
    this.slotid = details.tuesdaySlotID;
    this.allappointmentid = details.tuesdayAppointmentID;
    this.dayid = details.tuesDayID;
    this.docslotid = details.docTuesDaySlotID;
    this.fees = details.tuesdayFees;
  }

  public GetDay3List(details) {

    this.appointmentypeid = details.wednesdayAppointmentID;
    this.slotid = details.wednessdaySlotID;
    this.allappointmentid = details.wednesdayAppointmentID;
    this.dayid = details.wednessDayID;
    this.docslotid = details.docWednessDaySlotID;
    this.fees = details.wednessdayFees;
  }

  public GetDay4List(details) {

    this.appointmentypeid = details.thursdayAppointmentID;
    this.slotid = details.tursdaySlotID;
    this.allappointmentid = details.thursdayAppointmentID;
    this.dayid = details.thursDayID;
    this.docslotid = details.docThursaDaySlotID;
    this.fees = details.thursdayFees;
  }

  public GetDay5List(details) {

    this.appointmentypeid = details.fridayAppointmentID;
    this.slotid = details.fridaySlotID;
    this.allappointmentid = details.fridayAppointmentID;
    this.dayid = details.friDayID;
    this.docslotid = details.docFridayDaySlotID;
    this.fees = details.fridayFees;
  }

  public GetDay6List(details) {

    this.appointmentypeid = details.saturdayAppintmentID;
    this.slotid = details.saturdaySlotID;
    this.allappointmentid = details.saturdayAppintmentID;
    this.dayid = details.saturDayID;
    this.docslotid = details.docSatDaySlotID;
    this.fees = details.satdayFees;
  }

  public GetDay7List(details) {

    this.appointmentypeid = details.sundayAppointmentID;
    this.slotid = details.sundaySlotID;
    this.allappointmentid = details.sundayAppointmentID;
    this.dayid = details.sunDayID;
    this.docslotid = details.doSunDaySlotID;
    this.fees = details.sundayFees;
  }


  public GetHospital(even) {

    this.hopitslname = even.target.value;
  }

  public Updateslots() {

    this.spinner.show();
    if (this.allappointmentid == 4 && this.appointmentypeid == 1) {
      var entity1 = {
        'SlotID': this.docslotid,
        'DoctorID': this.doctorid,
        'DayID': this.dayid,
        'Hospital_ClinicID': this.hospitalid,
        'LanguageID': this.languageid,
        'AppointmentTypeID': this.appointmentypeid,
        'DoctorHospitalDetailsID': this.dochspid,
        'DoctorFees': this.fees
      }
      this.docservice.InsertDoctorSlotsWeb(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }

        this.spinner.show();
        this.GetDoctorTimings();
        this.insertbookappointmenttype()

      })
    }

    else if (this.allappointmentid == 4 && this.appointmentypeid == 2) {
      this.spinner.show();
      var entity1 = {
        'SlotID': this.docslotid,
        'DoctorID': this.doctorid,
        'DayID': this.dayid,
        'Hospital_ClinicID': this.hospitalid,
        'LanguageID': this.languageid,
        'AppointmentTypeID': this.appointmentypeid,
        'DoctorHospitalDetailsID': this.dochspid,
        'DoctorFees': this.fees
      }
      this.docservice.InsertDoctorSlotsWeb(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.insertbookappointmenttype()
        this.GetDoctorTimings()


      })
    }
    else if (this.allappointmentid == 4 && this.appointmentypeid == 5) {
      this.spinner.show();
      var entity1 = {
        'SlotID': this.docslotid,
        'DoctorID': this.doctorid,
        'DayID': this.dayid,
        'Hospital_ClinicID': this.hospitalid,
        'LanguageID': this.languageid,
        'AppointmentTypeID': this.appointmentypeid,
        'DoctorHospitalDetailsID': this.dochspid,
        'DoctorFees': this.fees
      }
      this.docservice.InsertDoctorSlotsWeb(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.spinner.show();
        this.insertbookappointmenttype()
        this.GetDoctorTimings()
      })

    }
    else if (this.allappointmentid == 4 && this.appointmentypeid == 6) {
      this.spinner.show();

      var entity1 = {
        'SlotID': this.docslotid,
        'DoctorID': this.doctorid,
        'DayID': this.dayid,
        'Hospital_ClinicID': this.hospitalid,
        'LanguageID': this.languageid,
        'AppointmentTypeID': this.appointmentypeid,
        'DoctorHospitalDetailsID': this.dochspid,
        'DoctorFees': this.fees
      }
      this.docservice.InsertDoctorSlotsWeb(entity1).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.spinner.show();
        this.insertbookappointmenttype()
        this.GetDoctorTimings()
      })
    }

    else if (this.allappointmentid == 1 && this.appointmentypeid == 4) {
      this.spinner.show();
      this.docservice.DeleteDoctSlots(this.slotid).subscribe(
        data => {

          if (this.languageid == 1) {
            Swal.fire('Updated Successfully');

          }
          else if (this.languageid == 6) {
            Swal.fire('Mis à jour avec succès');
          }
          this.spinner.show();
          this.insertbookappointmenttype()
          this.GetDoctorTimings()
        }, error => {
        }
      )
    }
    else if (this.allappointmentid == 2 && this.appointmentypeid == 4) {
      this.spinner.show();
      this.docservice.DeleteDoctSlots(this.slotid).subscribe(
        data => {

          if (this.languageid == 1) {
            Swal.fire('Updated Successfully');

          }
          else if (this.languageid == 6) {
            Swal.fire('Mis à jour avec succès');
          }
          this.GetDoctorTimings()
        }, error => {
        }
      )
    }
    else if (this.allappointmentid == 5 && this.appointmentypeid == 4) {
      this.spinner.show();
      this.docservice.DeleteDoctSlots(this.slotid).subscribe(
        data => {

          if (this.languageid == 1) {
            Swal.fire('Updated Successfully');

          }
          else if (this.languageid == 6) {
            Swal.fire('Mis à jour avec succès');
          }

          this.GetDoctorTimings()
        }, error => {
        }
      )
    }
    else if (this.allappointmentid == 6 && this.appointmentypeid == 4) {
      this.spinner.show();
      this.docservice.DeleteDoctSlots(this.slotid).subscribe(
        data => {

          if (this.languageid == 1) {
            Swal.fire('Updated Successfully');

          }
          else if (this.languageid == 6) {
            Swal.fire('Mis à jour avec succès');
          }

          this.GetDoctorTimings()
        }, error => {
        }
      )
    }
    else if (this.appointmentypeid == 1 || this.appointmentypeid == 2 || this.appointmentypeid == 5 || this.appointmentypeid == 6 && this.allappointmentid == 1 || this.allappointmentid == 2 || this.allappointmentid == 5 || this.allappointmentid == 6) {

      this.spinner.show();
      var entity = {
        'ID': this.slotid,
        'AppointmentTypeID': this.appointmentypeid,
        'DoctorFees': this.fees
      }
      this.docservice.UpdateDoctorSlotsWeb(entity).subscribe(data => {
        if (this.languageid == 1) {
          Swal.fire('Updated Successfully');

        }
        else if (this.languageid == 6) {
          Swal.fire('Mis à jour avec succès');
        }
        this.insertbookappointmenttype()
        this.GetDoctorTimings()
      })
    }
    else {
      if (this.languageid == 1) {
        Swal.fire('Updated Successfully');

      }
      else if (this.languageid == 6) {
        Swal.fire('Mis à jour avec succès');
      }
    }

  }


}


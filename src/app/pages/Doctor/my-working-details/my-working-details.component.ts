import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-working-details',
  templateUrl: './my-working-details.component.html',
  styleUrls: ['./my-working-details.component.css']
})
export class MyWorkingDetailsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, public router: Router, private spinner: NgxSpinnerService) { }

  public doctorid: any;
  public workingdetails: any;
  public timeid: any;
  public availabilityid: any;
  public dayslist: any;
  public hospitallist: any;
  public hospitalid: any;
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
  public session1: any;
  public session2: any;
  public hosipitalidd: any;
  public qwerty = [];
  public morningslotarray = [];
  public morningslotidarray = [];
  public slotid: any;
  public morningslots = [];
  public slotname: any;
  public mrng: any;
  public slotnameid: any;
  public mrngid: any;
  public afternoonslotarray = [];
  public slotname1: any;
  public afternoon: any;
  public afternoonid: any;
  public slotnameid1: any;
  public eveningarray = [];
  public slotname2: any;
  public evening: any;
  public eveningid: any;
  public slotnameid2: any;
  public nightslotsarray = [];
  public slotname3: any;
  public night: any;
  public slotnameid3: any;
  public nightid: any;
  public short: any;
  public hospital_ClinicName: any;
  public dayOfTheWeek: any;
  public afternoonslotidarray = [];
  public eveningarrayid = [];
  public nightslotsarrayid = [];
  public details: any;
  public day: any;
  public name: any;
  public docid: any;
  public qwertyy = [];
  public idcount: any;
  public cleardropdown1 = [];
  public cleardropdown2 = [];
  public cleardropdown3 = [];
  public cleardropdown4 = [];
  public abcd: any;
  public dis1: any;
  public dis2: any;
  public dis3: any;
  public daysname: any;
  public hspcliid: any;
  public dochspid: any;
  public hopitslname: any;
  public hopitsllist: any;
  public slottypeid: any;

  public labels: any;
  public languageid: any;

  mrngAppointmenttype: any;
  afternoonappointmentType: any;
  eveningappointmentType: any;
  nightappointmenttype: any;
  public appointmentypeid: any;

  ngOnInit() {  
    debugger
    this.doctorid = localStorage.getItem('userid');
    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalClinicID')
    this.docservice.GetDoctorHospitalDetailsWebByDoctorID(this.doctorid, this.languageid).subscribe(
      data => {
        debugger;
        this.workingdetails = data;
        var list = this.workingdetails.filter(x => x.doctorID == this.doctorid)
        this.slottypeid=list[0].slotDurationID
        this.GetMorningSlotsMasterbyid();
        this.GetAfternoonSlotsMasterbyID();
        this.GetEveningSlotsMasterByID();
        this.GetNightSlotsMasterByID();
      }, error => {
      }
    )

    this.daysname = 0;
   
    this.GetDoctorHospitalDetailsHospital();
    this.languageid = localStorage.getItem('LanguageID');
    this.GetDaysMaster()
    this.getlanguage();
  }


  public GetDaysMaster() {
    this.docservice.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.dayslist = data;
      }, error => {
      }
    )
  }




  Select
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

  public GetDoctorHospitalDetails() {
    debugger;
    this.docservice.GetDoctorHospitalDetailsWebByDoctorID(this.doctorid, this.languageid).subscribe(
      data => {
        debugger;
        this.workingdetails = data;

      }, error => {
      }
    )
  }



  public GetDoctorHospitalDetailsHospital() {
    this.docservice.GetDoctorHospitalDetailsWebHospital(this.doctorid).subscribe(
      data => {
        debugger;
        this.hopitsllist = data;
      }, error => {
      }
    )
  }

  public GetMorningSlotsMasterbyid() {
    debugger
    this.docservice.GetSlotsMasterByID(1, this.slottypeid).subscribe(
      data => {
        debugger
        this.slotslist = data;
        this.slotsdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'slots',
          // selectAllText: 'Select All',
          // unSelectAllText: 'UnSelect All',
          itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll: false
        };
      }, error => {
      }
    )
  }
  public GetAfternoonSlotsMasterbyID() {
    debugger
    this.docservice.GetSlotsMasterByID(2, this.slottypeid).subscribe(
      data => {
        debugger
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
    debugger
    this.docservice.GetSlotsMasterByID(3, this.slottypeid).subscribe(
      data => {
        debugger
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
    debugger
    this.docservice.GetSlotsMasterByID(4, this.slottypeid).subscribe(
      data => {
        debugger
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
    debugger
    this.morningslots.push(item);

    if (this.morningslots.length == 2) {
      this.abcd = 1;
    }
  }

  onItemDeSelect(item: any) {
    debugger
    this.morningslots = this.morningslots.slice(item.id)
  }

  public GetAfternoonSlotsID(item1: any) {
    debugger
    this.aftrenoonslots.push(item1);

    if (this.aftrenoonslots.length == 2) {
      this.dis1 = 1;
    }
  }


  onItemDeSelect1(item1: any) {
    debugger
    this.aftrenoonslots = this.aftrenoonslots.slice(item1.id)
  }

  public GetEveningSlotsID(item2: any) {
    debugger
    this.eveningslots.push(item2);

    if (this.eveningslots.length == 2) {
      this.dis2 = 1;
    }
  }

  onItemDeSelect2(item2: any) {
    debugger
    this.eveningslots = this.eveningslots.slice(item2.id)
  }


  public GetNightSlotsID(item3: any) {
    debugger
    this.nightslots.push(item3);
    if (this.nightslots.length == 2) {
      this.dis3 = 1;
    }
  }

  onItemDeSelect3(item3: any) {
    debugger
    this.eveningslots = this.eveningslots.slice(item3.id)
  }

  public gettimeid(tid, dochspid, hspcliid, dayid, appointmentypeid) {
    debugger
    this.timeid = tid;
    this.dochspid = dochspid;
    this.hspcliid = hspcliid;
    this.dayid = dayid;
    this.appointmentypeid = appointmentypeid;
  }

  public addnew() {
    debugger
    location.href = '#/AddMyWorkingDetails/' + this.doctorid + '/' + this.hospitalid
  }

  public adddetails() {
    debugger
    if (this.morningslots.length == 0 && this.aftrenoonslots.length == 0 && this.eveningslots.length == 0 && this.nightslots.length == 0) {

      var entitysds = {

        'DoctorHospitalDetailsID': this.dochspid,
        'DayID': this.dayid,
        'TimeID': this.timeid,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.docservice.UpdateDoctorSlotStartAndEndTimeAppointmentType(entitysds).subscribe(data => {

        Swal.fire('Success', 'Updated Successfully')
        this.GetDoctorHospitalDetails()
        this.insertbookappointmenttype()
      })

    }
    else {
      this.tablecount = 1;
      debugger
      for (let i = 0; i < this.morningslots.length; i++) {
        this.morningslotarray.push(this.morningslots[i].slots);
        debugger
        this.morningslotidarray.push(this.morningslots[i].id)
      }
      debugger
      this.slotname = this.morningslotarray;
      this.mrng = this.slotname.join(' to ')
      this.slotnameid = this.morningslotidarray;
      this.mrngid = this.slotnameid.join(',')


      for (let i = 0; i < this.aftrenoonslots.length; i++) {
        this.afternoonslotarray.push(this.aftrenoonslots[i].slots);
        debugger
        this.afternoonslotidarray.push(this.aftrenoonslots[i].id)
      }
      debugger
      this.slotname1 = this.afternoonslotarray;
      this.afternoon = this.slotname1.join(' to ');
      this.slotnameid1 = this.afternoonslotidarray;
      this.afternoonid = this.slotnameid1.join(',');


      for (let i = 0; i < this.eveningslots.length; i++) {
        this.eveningarray.push(this.eveningslots[i].slots);
        debugger
        this.eveningarrayid.push(this.eveningslots[i].id);
      }
      debugger
      this.slotname2 = this.eveningarray;
      this.evening = this.slotname2.join(' to ');
      this.slotnameid2 = this.eveningarrayid;
      this.eveningid = this.slotnameid2.join(',');

      for (let i = 0; i < this.nightslots.length; i++) {
        this.nightslotsarray.push(this.nightslots[i].slots);
        debugger
        this.nightslotsarrayid.push(this.nightslots[i].id);
      }
      debugger
      this.slotname3 = this.nightslotsarray;
      this.night = this.slotname3.join(' to ');
      this.slotnameid3 = this.nightslotsarrayid;
      this.nightid = this.slotnameid3.join(',');
      debugger
      var entity = {
        'Sno': this.idcount,
        'DoctorID': this.doctorid,
        'DoctorAvailability': this.name,
        'DoctorAvailabilityID': this.availabilityid,
        'Hospital_Clinic': this.hospital_ClinicName,
        'Hospital_ClinicID': this.hosipitalidd,
        'Day': this.day,
        'DayID': this.dayid,
        'Fees': this.fees,
        'Session1': this.session1,
        'Session2': this.session2,
        'Morning': this.mrng,
        'Afternoon': this.afternoon,
        'Evening': this.evening,
        'Night': this.night,
        'Morningid': this.mrngid,
        'Afternoonid': this.afternoonid,
        'Eveningid': this.eveningid,
        'Nightid': this.nightid
      }
      this.qwerty.push(entity);
      this.idcount = this.idcount + 1;
      this.session1 = "";
      this.session2 = "";
      this.cleardropdown1 = [];
      this.cleardropdown2 = [];
      this.cleardropdown3 = [];
      this.cleardropdown4 = [];
      this.abcd = "";
      this.dis2 = "";
      this.dis1 = "";
      this.dis3 = "";
      this.eveningslots.length = 0;
      this.morningslotarray.length = 0;
      this.morningslotidarray.length = 0;
      this.eveningarray.length = 0;
      this.afternoonslotarray.length = 0;
      this.nightslotsarray.length = 0;
      this.nightslots.length = 0;
      this.morningslots.length = 0;
      this.eveningslots.length = 0;
      this.aftrenoonslots.length = 0;



      this.docservice.DeleteDoctorSlotsByDoctor(this.doctorid, this.dochspid, this.dayid, this.timeid).subscribe(res => {

        for (let s = 0; s < this.qwerty.length; s++) {

          debugger
          let mrng = this.qwerty[s].Morning;
          let ms = mrng.split(" to ", 3);
          let mst = ms[0];
          let met = ms[1];

          let noon = this.qwerty[s].Afternoon;
          let ns = noon.split(" to ", 3);
          let nst = ns[0];
          let net = ns[1];

          let evng = this.qwerty[s].Evening;
          let es = evng.split(" to ", 3);
          let est = es[0];
          let eet = es[1];

          let nyt = this.qwerty[s].Night;
          let nys = nyt.split(" to ", 3);
          let nyst = nys[0];
          let nyet = nys[1];
          debugger

          if (this.timeid == 1) {
            var entityssssss = {
              'DoctorHospitalDetailsID': this.dochspid,
              'DayID': this.dayid,
              'TimeID': this.timeid,
              'StartTime': mst,
              'EndTime': met,
              'AppointmentTypeID': this.appointmentypeid
            }
          }
          else if (this.timeid == 2) {
            var entityssssss = {
              'DoctorHospitalDetailsID': this.dochspid,
              'DayID': this.dayid,
              'TimeID': this.timeid,
              'StartTime': nst,
              'EndTime': net,
              'AppointmentTypeID': this.appointmentypeid
            }
          }
          else if (this.timeid == 3) {
            var entityssssss = {
              'DoctorHospitalDetailsID': this.dochspid,
              'DayID': this.dayid,
              'TimeID': this.timeid,
              'StartTime': est,
              'EndTime': eet,
              'AppointmentTypeID': this.appointmentypeid
            }
          }
          else if (this.timeid == 4) {
            var entityssssss = {
              'DoctorHospitalDetailsID': this.dochspid,
              'DayID': this.dayid,
              'TimeID': this.timeid,
              'StartTime': nyst,
              'EndTime': nyet,
              'AppointmentTypeID': this.appointmentypeid
            }
          }
          this.docservice.UpdateDoctorSlotStartAndEndTime(entityssssss).subscribe(data => {
            debugger
            this.GetDoctorHospitalDetails()
          })
        }

        for (let i = 0; i < this.qwerty.length; i++) {
          var entitys = {
            'Hospital_ClinicID': this.hspcliid,
            'DoctorID': this.doctorid,
            'DayID': this.dayid,
            'DoctorHospitalDetailsID': this.dochspid,
            'Morning': this.qwerty[i].Morningid,
            'Noon': this.qwerty[i].Afternoonid,
            'Evening': this.qwerty[i].Eveningid,
            'Night': this.qwerty[i].Nightid,
            'MrngAppointtypeID': this.appointmentypeid,
            'AfternoonAppointmentTypeID': this.appointmentypeid,
            'EveningAppointmentTypeID': this.appointmentypeid,
            'NightAppointmentTypeID': this.appointmentypeid
          }
          this.docservice.InsertDoctorSlotByID(entitys).subscribe(data => {
            debugger
            this.GetDoctorHospitalDetails();
          })
        }
      })
      if (this.languageid == 1) {
        Swal.fire('Completed', 'Slots saved successfully', 'success');
        this.GetDoctorHospitalDetails()
      }
      else {
        Swal.fire('Détails enregistrés');
        this.GetDoctorHospitalDetails()
      }

      //location.href="#/MyWorkingDetails";
      //this.GetDoctorHospitalDetails();
    }
  }

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




  public deleteparticular(dochspid, dayid, timeid) {

    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This Day Slot!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteDoctorSlotsByDoctor(this.doctorid, dochspid, dayid, timeid).subscribe(res => {
            let test = res;
            this.GetDoctorHospitalDetails()
          })
          Swal.fire(
            'Deleted!',
            'Slot has been deleted.',
            'success'
          )
        }
        else {
          this.GetDoctorHospitalDetails()
        }
      })
    }
    else {
      Swal.fire({
        title: 'Êtes-vous sûr(e) ?',
        text: "Supprimer !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Qui',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteDoctorSlotsByDoctor(this.doctorid, dochspid, dayid, timeid).subscribe(res => {
            let test = res;
            this.GetDoctorHospitalDetails()
          })
          Swal.fire(
            'Deleted!',
            'Slot has been deleted.',
            'success'
          )
        }
        else {
          this.GetDoctorHospitalDetails()
        }
      })
    }
  }

  public deletebydochspid(dochspid, dayid) {
    if (this.languageid == 1) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You Want to Delete This Day Slot!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteDoctorSlotsByDocHspDetailsID(dochspid, dayid).subscribe(res => {
            let test = res;
            this.GetDoctorHospitalDetails()
          })
          Swal.fire(
            'Deleted!',
            'Slot has been deleted.',
            'success'
          )
        }
        else {
          this.GetDoctorHospitalDetails()
        }
      })
    }
    else {
      Swal.fire({
        title: 'Êtes-vous sûr(e) ?',
        text: "Supprimer !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Qui',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.value) {
          this.docservice.DeleteDoctorSlotsByDocHspDetailsID(dochspid, dayid).subscribe(res => {
            let test = res;
            this.GetDoctorHospitalDetails()
          })
          Swal.fire(
            'Deleted!',
            'Slot has been deleted.',
            'success'
          )
        }
        else {
          this.GetDoctorHospitalDetails()
        }
      })
    }

  }

  public DeleteDoctorSlots(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to Delete This Day Slot!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.docservice.DeleteDoctorSlots(id).subscribe(res => {
          let test = res;
          this.GetDoctorHospitalDetails()
        })
        Swal.fire(
          'Deleted!',
          'Slot has been deleted.',
          'success'
        )
      }
      else {
        this.GetDoctorHospitalDetails()
      }
    })
  }

  public GetHospital(even) {
    debugger
    this.hopitslname = even.target.value;
  }


  public GetDaysName(even) {
    this.daysname = even.target.value;
  }
  public DisableDoctorWorking(docid) {
    this.docservice.DisableDoctorWorking(docid).subscribe(
      data => {
        debugger
        Swal.fire('Disabled', 'Doctor Working Details has been Disabled');
        this.GetDoctorHospitalDetails();
      }, error => {
      }
    )
  }
  public EnableDoctorWorking(id) {
    this.docservice.EnableDoctorWorking(id).subscribe(
      data => {
        debugger
        Swal.fire('Enabled', 'Doctor Working Details has has been Enabled');
        this.GetDoctorHospitalDetails();
      }, error => {
      }
    )
  }

}

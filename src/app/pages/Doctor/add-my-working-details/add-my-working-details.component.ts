import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-add-my-working-details',
  templateUrl: './add-my-working-details.component.html',
  styleUrls: ['./add-my-working-details.component.css']
})
export class AddMyWorkingDetailsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }


  public doctorlist: any;
  public doctorid: any;
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
  public bookingtype: any;
  public appontmenttypeid = [];
  public booktypeid = [];
  public appointmenttype: any;
  public bookingtypedd = {};
  public appointmentdd = {};
  public doctordd = {};
  public docdd = {}

  public languageid: any;
  public labels: any;
  public hosdd: any;
  public showid: any;
  public dummlist: any;
  public dummid: any;
  public doctorname: any
  public HospitalName: any
  SelectLabel: any
  active: any
  daysdd = {}
  mrngAppointmenttype: any;
  afternoonappointmentType: any;
  eveningappointmentType: any;
  nightappointmenttype: any;

  dummdoclist: any;

  public mrngcolorcode: any;
  afternooncolorcode: any;
  evengcolorcode: any;
  nightcolorcode: any;

  slottypeid: any;
  ngOnInit() {


    this.languageid = localStorage.getItem('LanguageID');
    
    this.activatedroute.params.subscribe(params => {
      debugger
      debugger;
      this.doctorid = params['id'];
      this.hosipitalidd = params['hospitalid'];

      // this.docservice.GetDoctorHospitalDetailsDoctors(1).subscribe(
      //   data => {
      //     debugger
      //     this.dummdoclist = data;
      //     var list = this.dummdoclist.filter(x => x.doctorID == this.doctorid);
      //     this.hosipitalidd = list[0].hosid
      //     this.hospital_ClinicName = list[0].hospital_ClinicName;

      //     this.hosipitalidd = temp.filter(x => x.doctorName == this.doctorname);
      //     this.hospital_ClinicName = temp1[0].hospital_ClinicName;
      //     this.hosipitalidd = temp1[0].hospital_ClinicID;
      //   }, error => {
      //   }
      // )
      this.booktypeid = [1, 2]

      this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
        data => {
          debugger
          this.doctorlist = data;
          var list = this.doctorlist.filter(x => x.id == this.doctorid)
          this.slottypeid = list[0].slotDurationID
      
          if (this.slottypeid != null) {
            this.GetMorningSlotsMasterbyid();
            this.GetAfternoonSlotsMasterbyID();
            this.GetEveningSlotsMasterByID();
            this.GetNightSlotsMasterByID();
          }
          if (this.slottypeid == null) {
            debugger
            this.slotslist.length = 0;
            this.slotslist1.lenght = 0;
            this.slotslist2.length = 0;
            this.slotslist3.length = 0;
            this.slotslist = []
            this.slotslist1 = []
            this.slotslist2 = []
            this.slotslist3 = []
          }
        }, error => {
        }
      )


    }
    )
    debugger


    this.doctorname = localStorage.getItem('user');

    this.active = 0;




    this.docservice.GetHospital_ClinicDetailsForAdmin(this.hosipitalidd).subscribe(
      data => {
        debugger
        this.details = data;
        this.hospital_ClinicName = this.details[0].hospital_ClinicName
      }, error => {
      }
    )



    debugger

    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )


    // this.Getdoctorlist();
    this.GetDaysMaster();
    // this.GetMorningSlotsMasterbyid();
    // this.GetAfternoonSlotsMasterbyID();
    // this.GetEveningSlotsMasterByID();
    // this.GetNightSlotsMasterByID();
    this.idcount = 1;
    this.tablecount = 0;
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.active = 1;
      this.doctorid = params['id'];
    }
    )
    this.getbookingtype();
    this.GetAppointmentType();
    this.availabilityid = 3;
    for (let i = 0; i < this.availabilitylist.length; i++) {
      if (this.availabilitylist[i].id == this.availabilityid) {
        this.name = this.availabilitylist[i].short
      }
    }

  }




  // public Getdoctorlist() {
  //   debugger
  //   if (this.dummid == undefined) {
  //     this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
  //       data => {
  //         debugger
  //         this.doctorlist = data;
  //         this.docdd = {
  //           singleSelection: true,
  //           idField: 'id',
  //           textField: 'doctorName',
  //           selectAllText: 'Select All',
  //           unSelectAllText: 'UnSelect All',
  //           //  itemsShowLimit: 3,
  //           allowSearchFilter: false,
  //           enableCheckAll: false
  //         };
  //       }, error => {
  //       }
  //     )
  //   }
  //   else if (this.dummid != undefined) {
  //     debugger
  //     this.docservice.GetDoctorListByLanguageID(this.languageid).subscribe(
  //       data => {
  //         debugger
  //         this.dummlist = data;
  //         this.doctorlist = this.dummlist.filter(x => x.hospitalClinicID == this.hosipitalidd)
  //         this.docdd = {
  //           singleSelection: true,
  //           idField: 'id',
  //           textField: 'doctorName',
  //           selectAllText: 'Select All',
  //           unSelectAllText: 'UnSelect All',
  //           //  itemsShowLimit: 3,
  //           allowSearchFilter: false,
  //           enableCheckAll: false
  //         };
  //       }, error => {
  //       }
  //     )
  //   }

  // }





  public getlanguage() {
    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }

  public getbookingtype() {
    this.docservice.GetBookingTypeMasterByLanguageID(this.languageid).subscribe(data => {
      this.bookingtype = data;
      this.bookingtypedd = {
        singleSelection: false,
        idField: 'id',
        textField: 'type',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: false,
        enableCheckAll: false
      };
    }, error => {
    })
  }
  public GetAppointmentType() {
    this.docservice.GetBookAppointmentTypeMasterWebByLanguageID(this.languageid).subscribe(data => {
      this.appointmenttype = data;
      this.appointmentdd = {
        singleSelection: false,
        idField: 'id',
        textField: 'appointmentType',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: false,
        enableCheckAll: false
      };
    }, error => {
    })
  }

  public GetBookingTpeID(item7: any) {
    debugger
    this.booktypeid.push(item7);
  }
  public onItemDeSelect7(item7: any) {
    debugger
    this.booktypeid = this.booktypeid.slice(item7.id)
  }

  public GetAppointmentTypeID(item8: any) {
    debugger
    this.appontmenttypeid.push(item8);
    this.showid = item8.id

    // if (this.showid == 1 && this.showid != 2) {
    //   this.mrngAppointmenttype = 1
    //   this.afternoonappointmentType = 1
    //   this.eveningappointmentType = 1
    //   this.nightappointmenttype = 1
    // }
    // else {
    //   this.mrngAppointmenttype = 0
    //   this.afternoonappointmentType = 0
    //   this.eveningappointmentType = 0
    //   this.nightappointmenttype = 0
    // }

  }
  public onItemDeSelect8(item8: any) {
    debugger
    this.appontmenttypeid = this.appontmenttypeid.slice(item8.id)
  }


  public insertbooktype() {
    for (let j = 0; j < this.booktypeid.length; j++) {
      var entity = {
        'DoctorHospitalID': this.docid,
        'BookingTypeID': this.booktypeid[j]
      }
      this.docservice.InsertBookingType(entity).subscribe(data => {
        if (data != undefined) {

        }

      })

    }

  }

  public insertbookappointmenttype() {
    for (let j = 0; j < this.appontmenttypeid.length; j++) {
      var entity = {
        'DoctorHospitalID': this.docid,
        'AppointmentTypeID': this.appontmenttypeid[j]
      }
      this.docservice.InsertBookAppointmentType(entity).subscribe(data => {
        if (data != undefined) {

        }
      })

    }

  }



  public GetDaysMaster() {
    this.docservice.GetDaysMasterByLanguageID(this.languageid).subscribe(
      data => {
        debugger
        this.dayslist = data;

        this.daysdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'dayOfTheWeek',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: false,
          enableCheckAll: false
        };
      }, error => {
      }
    )
  }

  public GetDaysID(item10: any) {
    debugger
    this.dayid = item10.id;
    debugger
    for (let i = 0; i < this.dayslist.length; i++) {
      if (this.dayslist[i].id == this.dayid) {
        this.day = this.dayslist[i].dayOfTheWeek;
      }
    }
  }
  public GetAvailabilityID(even) {
    debugger
    this.availabilityid = even.target.value;

    for (let i = 0; i < this.availabilitylist.length; i++) {

      if (this.availabilitylist[i].id == this.availabilityid) {
        this.name = this.availabilitylist[i].short
      }
    }
  }

  public GetAvailabilityMaster() {
    debugger
    this.docservice.GetAvailabilityMaster(this.hospitalid).subscribe(
      data => {
        debugger
        this.availabilitylist = data;
      }, error => {
      }
    )
  }


  public GetDoctorID(item: any) {
    debugger
    this.doctorid = item.id;
  }
  public GetHosiptalid(even) {
    this.hospitalid = even.target.value;
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

  public GetHospitalID(item: any) {
    debugger
    this.hosipitalidd = item.id;
    this.docservice.GetHospital_ClinicDetailsForAdmin(this.hosipitalidd).subscribe(
      data => {
        debugger
        this.details = data;
        this.hospital_ClinicName = this.details[0].hospital_ClinicName
      }, error => {
      }
    )
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



  public GetHospitalClinicid(even) {
    debugger
    this.hospitalid = even.target.value;
    if (this.hospitalid == 3) {
      this.hosipitalidd = 590
    }
    if (this.hospitalid == 4) {
      this.hosipitalidd = 591
    }
    this.GetAllHospitalclinicById();
    this.GetAvailabilityMaster()

  }

  public GetAllHospitalclinicById() {
    debugger
    this.docservice.GetAllHospital_ClinicListByIDByLanguageID(this.hospitalid, this.languageid).subscribe(
      data => {
        debugger
        this.hospitallist = data;

        this.hosdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: false
        };

      }, error => {
      }
    )
  }


  public GetMorningSlotsMasterbyid() {
    debugger
    this.docservice.GetSlotsMasterByID(1,this.slottypeid).subscribe(
      data => {
        debugger
        this.slotslist = data;
        this.slotsdd = {
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
  public GetAfternoonSlotsMasterbyID() {
    debugger
    this.docservice.GetSlotsMasterByID(2,this.slottypeid).subscribe(
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
    this.docservice.GetSlotsMasterByID(3,this.slottypeid).subscribe(
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
    this.docservice.GetSlotsMasterByID(4,this.slottypeid).subscribe(
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


  public adddetails() {

    if (this.dayid == null || this.dayid == 0) {
      Swal.fire('Please Select Day')
    }
   else if (this.doctorid == null || this.doctorid == 0) {
      Swal.fire('Please Select Doctor')
    }
    else 
    {
    this.tablecount = 1;

    for (let i = 0; i < this.morningslots.length; i++) {
      this.morningslotarray.push(this.morningslots[i].slots);

      this.morningslotidarray.push(this.morningslots[i].id)
    }

    this.slotname = this.morningslotarray;
    this.mrng = this.slotname.join(' to ')
    this.slotnameid = this.morningslotidarray;
    this.mrngid = this.slotnameid.join(',')


    for (let i = 0; i < this.aftrenoonslots.length; i++) {
      this.afternoonslotarray.push(this.aftrenoonslots[i].slots);

      this.afternoonslotidarray.push(this.aftrenoonslots[i].id)
    }

    this.slotname1 = this.afternoonslotarray;
    this.afternoon = this.slotname1.join(' to ');
    this.slotnameid1 = this.afternoonslotidarray;
    this.afternoonid = this.slotnameid1.join(',');


    for (let i = 0; i < this.eveningslots.length; i++) {
      this.eveningarray.push(this.eveningslots[i].slots);

      this.eveningarrayid.push(this.eveningslots[i].id);
    }

    this.slotname2 = this.eveningarray;
    this.evening = this.slotname2.join(' to ');
    this.slotnameid2 = this.eveningarrayid;
    this.eveningid = this.slotnameid2.join(',');

    for (let i = 0; i < this.nightslots.length; i++) {
      this.nightslotsarray.push(this.nightslots[i].slots);

      this.nightslotsarrayid.push(this.nightslots[i].id);
    }

    this.slotname3 = this.nightslotsarray;
    this.night = this.slotname3.join(' to ');
    this.slotnameid3 = this.nightslotsarrayid;
    this.nightid = this.slotnameid3.join(',');
    debugger

    if (this.mrngAppointmenttype == '1') {
      this.mrngcolorcode = '#bae6fb'
      this.appontmenttypeid.push(1)
    }
    else if (this.mrngAppointmenttype == '2') {
      this.mrngcolorcode = '#4e66b0'
      this.appontmenttypeid.push(2)
    }
    else if (this.mrngAppointmenttype == '5') {
      this.mrngcolorcode = '#90EE90'
      this.appontmenttypeid.push(5)
    }

    if (this.afternoonappointmentType == '1') {
      this.afternooncolorcode = '#bae6fb'
      this.appontmenttypeid.push(1)
    }
    else if (this.afternoonappointmentType == '2') {
      this.afternooncolorcode = '#4e66b0'
      this.appontmenttypeid.push(2)
    }
    else if (this.afternoonappointmentType == '5') {
      this.afternooncolorcode = '#90EE90'
      this.appontmenttypeid.push(5)
    }
    if (this.eveningappointmentType == '1') {
      this.evengcolorcode = '#bae6fb'
      this.appontmenttypeid.push(1)
    }
    else if (this.eveningappointmentType == '2') {
      this.evengcolorcode = '#4e66b0'
      this.appontmenttypeid.push(2)
    }
    else if (this.eveningappointmentType == '5') {
      this.evengcolorcode = '#90EE90'
      this.appontmenttypeid.push(5)
    }

    if (this.nightappointmenttype == '1') {
      this.nightcolorcode = '#bae6fb'
      this.appontmenttypeid.push(1)
    }
    else if (this.nightappointmenttype == '2') {
      this.nightcolorcode = '#4e66b0'
      this.appontmenttypeid.push(2)
    }
    else if (this.nightappointmenttype == '5') {
      this.nightcolorcode = '#90EE90'
      this.appontmenttypeid.push(5)
    }
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
      'Nightid': this.nightid,
      'mrngAppointmenttype': this.mrngAppointmenttype,
      'afternoonappointmentType': this.afternoonappointmentType,
      'eveningappointmentType': this.eveningappointmentType,
      'nightappointmenttype': this.nightappointmenttype,
      'MrngColorCode': this.mrngcolorcode,
      'Afternooncolorcode': this.afternooncolorcode,
      'Evngcolorcode': this.evengcolorcode,
      'Nightcolorcode': this.nightcolorcode
    }

    debugger
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
    this.mrngcolorcode = ""
    this.afternooncolorcode = ""
    this.evengcolorcode = ""
    this.nightcolorcode = ""
    this.mrngAppointmenttype = "",
      this.eveningappointmentType = "",
      this.afternoonappointmentType = "",
      this.nightappointmenttype = ""
  }
  }

  public insertdetails() {
    debugger

    var entity = {
      'DoctorID': this.doctorid,
      'DoctorAvalibity': this.name,
      'Fees': this.fees,
      'OnlineBooking': 1,
      'InHospital': 1,
      'Hospital_ClinicID': this.hosipitalidd,
      'DoctorAvailabilityID': this.availabilityid,
    }
    this.docservice.InsertDoctorHospitalDetails(entity).subscribe(data => {
      debugger
      if (data != 0) {
        this.docid = data;
        this.insertbooktype();
        this.insertbookappointmenttype()
        debugger
        if (this.availabilityid == '1' || this.availabilityid == '2') {
          debugger
          this.inserdoctorsessiondetails();
        }
        if (this.availabilityid == '3') {
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
            var entity = {
              'DoctorHospitalDetailsID': this.docid,
              'MrngStartTime': mst,
              'MrngEndTime': met,
              'NoonStartTime': nst,
              'NoonEndTime': net,
              'EvngStartTime': est,
              'EvngEndTime': eet,
              'NightStartTime': nyst,
              'NightEndTime': nyet,
              'DayID': this.qwerty[s].DayID,
              'MrngAppointtypeID': this.qwerty[s].mrngAppointmenttype,
              'AfternoonAppointmentTypeID': this.qwerty[s].afternoonappointmentType,
              'EveningAppointmentTypeID': this.qwerty[s].eveningappointmentType,
              'NightAppointmentTypeID': this.qwerty[s].nightappointmenttype
            }
            this.docservice.InsertDoctorSlotStartAndEndTime(entity).subscribe(data => {
              debugger
              if (data != 0) {
                if (this.languageid == 1) {
                  Swal.fire('Completed', 'Slots saved successfully', 'success');
                  location.href = "#/MyWorkingDetails"
                }
                else {
                  Swal.fire('Détails enregistrés');
                  location.href = "#/MyWorkingDetails"
                }

              }
            })
          }
          debugger
          this.insertdoctorslotsbyid();
        }
        if (this.languageid == 1) {
          Swal.fire('Completed', 'Slots saved successfully', 'success');
          location.href = "#/MyWorkingDetails"

        }
        else {
          Swal.fire('Détails enregistrés');
          location.href = "#/MyWorkingDetails"

        }
        this.tablecount = 0;

      }
      else {
        Swal.fire('OOPS', 'Doctor Already Exist');
      }

    })
  }



  public insertdetailsadmin() {
    debugger

    var entity = {
      'DoctorID': this.doctorid,
      'DoctorAvalibity': this.name,
      'Fees': this.fees,
      'OnlineBooking': 1,
      'InHospital': 1,
      'Hospital_ClinicID': this.hosipitalidd,
      'DoctorAvailabilityID': this.availabilityid,
    }
    this.docservice.InsertDoctorHospitalDetails(entity).subscribe(data => {
      debugger
      if (data != 0) {
        this.docid = data;
        this.insertbooktype();
        this.insertbookappointmenttype()
        debugger
        if (this.availabilityid == '1' || this.availabilityid == '2') {
          debugger
          this.inserdoctorsessiondetails();
        }
        if (this.availabilityid == '3') {
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
            var entity = {
              'DoctorHospitalDetailsID': this.docid,
              'MrngStartTime': mst,
              'MrngEndTime': met,
              'NoonStartTime': nst,
              'NoonEndTime': net,
              'EvngStartTime': est,
              'EvngEndTime': eet,
              'NightStartTime': nyst,
              'NightEndTime': nyet,
              'DayID': this.qwerty[s].DayID,
              'MrngAppointtypeID': this.qwerty[s].mrngAppointmenttype,
              'AfternoonAppointmentTypeID': this.qwerty[s].afternoonappointmentType,
              'EveningAppointmentTypeID': this.qwerty[s].eveningappointmentType,
              'NightAppointmentTypeID': this.qwerty[s].nightappointmenttype
            }
            this.docservice.InsertDoctorSlotStartAndEndTime(entity).subscribe(data => {
              debugger
              if (data != 0) {
                if (this.languageid == 1) {
                  Swal.fire('Completed', 'Slots saved successfully', 'success');
                  location.href = "#/MyWorkingDetails"
                } else {
                  Swal.fire('Détails enregistrés');
                  location.href = "#/MyWorkingDetails"
                }

              }
            })
          }
          debugger
          this.insertdoctorslotsbyid();
        }
        if (this.languageid == 1) {
          Swal.fire('Completed', 'Slots saved successfully', 'success');
        } else {
          Swal.fire('Détails enregistrés');
        }

        this.tablecount = 0;

      }
      else {
        Swal.fire('OOPS', 'Doctor Already Exist');
      }

    })
  }

  public inserdoctorsessiondetails() {
    debugger
    for (let i = 0; i < this.qwerty.length; i++) {
      debugger
      var entity = {
        'DoctorID': this.qwerty[i].DoctorID,
        'Hospital_ClinicID': this.qwerty[i].Hospital_ClinicID,
        'DayID': this.qwerty[i].DayID,
        'Session1': this.qwerty[i].Session1,
        'Session2': this.qwerty[i].Session2,
        'LanguageID': 1
      }
      this.docservice.InsertDoctorSessionDetails(entity).subscribe(data => {
        debugger
        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire('Completed', 'Slots saved successfully', 'success');
            location.href = "#/MyWorkingDetails"
          }
          else {
            Swal.fire('Détails enregistrés');
            location.href = "#/MyWorkingDetails"
          }

        }
        else {
          Swal.fire('OOPS', 'Doctor Sessions Already Exists');
        }

      })
    }
  }
  public insertdoctorslotsbyid() {
    debugger
    for (let i = 0; i < this.qwerty.length; i++) {
      var entity = {
        'Hospital_ClinicID': this.qwerty[i].Hospital_ClinicID,
        'DoctorID': this.qwerty[i].DoctorID,
        'DayID': this.qwerty[i].DayID,
        'DoctorHospitalDetailsID': this.docid,
        'Morning': this.qwerty[i].Morningid,
        'Noon': this.qwerty[i].Afternoonid,
        'Evening': this.qwerty[i].Eveningid,
        'Night': this.qwerty[i].Nightid,
        'MrngAppointtypeID': this.qwerty[i].mrngAppointmenttype,
        'AfternoonAppointmentTypeID': this.qwerty[i].afternoonappointmentType,
        'EveningAppointmentTypeID': this.qwerty[i].eveningappointmentType,
        'NightAppointmentTypeID': this.qwerty[i].nightappointmenttype
      }
      this.docservice.InsertDoctorSlotByID(entity).subscribe(data => {
        debugger
        if (data != 0) {
          if (this.languageid == 1) {
            Swal.fire('Completed', 'Slots saved successfully', 'success');
            location.href = "#/MyWorkingDetails"
          }
          else {
            Swal.fire('Détails enregistrés');
            location.href = "#/MyWorkingDetails"
          }

        }
      })
    }
  }

  public delete(Sno) {
    debugger
    for (let i = 0; i < this.qwerty.length; i++) {
      debugger
      if (Sno == this.qwerty[i].Sno) {
        debugger
        this.qwerty.splice(i, 1);
      }
    }
    debugger
  }
}

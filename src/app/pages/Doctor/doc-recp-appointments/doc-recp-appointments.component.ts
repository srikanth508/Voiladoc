import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";

import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
  selector: 'app-doc-recp-appointments',
  templateUrl: './doc-recp-appointments.component.html',
  styleUrls: ['./doc-recp-appointments.component.css']
})
export class DocRecpAppointmentsComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }

  public hospitalid: any;
  public appointmentlist: any;
  public departmentlist: any;
  public term: any;
  public term1: any;
  p: number = 1;
  public languageid: any;
  public labels: any;


  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  value: any;
  public todaydate: any;
  public count: any;
  public doctorlist: any;
  public doctorname: any;
  public dummlist: any;
  roleid;
  termsss: any;
  labels1: any;
  ngOnInit() {
    this.roleid = localStorage.getItem('roleid');
    this.doctorid = localStorage.getItem('userid');
    this.PaymentTypeID = "";
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;

    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 20);

    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    this.languageid = localStorage.getItem('LanguageID');
    this.hospitalid = localStorage.getItem('hospitalClinicID');
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search
        this.select = this.labels[0].selectDoctor

      }, error => {
      }
    )
    this.getlanguage();
    this.getbookappointmentbyhospitalbyhospitalid();
    this.getdepartmentmaster();
    this.gethospitaldoctorsforadmin();


    this.docservice.GetAdmin_Doctorregistration_LabelsByLanguageID(this.languageid).subscribe(
      data => {

        this.labels1 = data;


      }, error => {
      }
    )
  }




  public select: any;
  public getlanguage() {
    this.docservice.GetAdmin_DoctorMyAppointments_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search
        this.select = this.labels[0].selectDoctor

      }, error => {
      }
    )
  }

  public docdd = {};
  public search: any;

  public gethospitaldoctorsforadmin() {

    this.docservice.GetHospitalDoctorsForAdmin(this.hospitalid, this.languageid).subscribe(
      data => {

        this.doctorlist = data;

        this.docdd = {
          singleSelection: true,
          idField: 'doctorID',
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




  public getbookappointmentbyhospitalbyhospitalid() {

    this.docservice.GetBookAppointmentByHospital_ClinicID(this.hospitalid, this.startdate, this.enddate, this.languageid).subscribe(
      data => {

        this.dummlist = data;
        this.appointmentlist = this.dummlist.filter(x => x.doctorID == this.doctorid)
        // this.appointmentlist = data;

        this.count = this.appointmentlist.length;
      }, error => {
      }
    )
  }

  selectedDate(data) {

    // var sdate = data.split('-')
    // this.startdate = sdate[0]
    // this.enddate = sdate[1]

    this.startdate = data[0].toLocaleString().split(',')[0];
    this.enddate = data[1].toLocaleString().split(',')[0];
    this.getbookappointmentbyhospitalbyhospitalid()
  }


  public getdepartmentmaster() {

    this.docservice.GetDepartmentMasterByLanguageID(this.languageid).subscribe(
      data => {

        this.departmentlist = data;
      }, error => {
      }
    )
  }



  ReasonForCancel: any;
  public cancelappoinement(id, res) {
   
      if (this.languageid == 1) {
        Swal.fire({
          title: 'Are you sure?',
          text: "You Want to Cancel This Appointment!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Cancel it!'
        }).then((result) => {
          if (result.value) {

            let Entity = {
              'ID': id,
              'CancelReason': res
            }
            this.docservice.CancelBookAppointmentWeb(Entity).subscribe(res => {
              let test = res;
              this.getbookappointmentbyhospitalbyhospitalid();
            })
            Swal.fire(
              'Success!',
              'Appointment Has been Cancelled',
              'success'
            )
          }
          else {
            this.getbookappointmentbyhospitalbyhospitalid();
          }
        })
      }
      else if (this.languageid == 6) {
        Swal.fire({
          title: 'Êtes-vous sûr',
          text: "Annulation de rendez-vous !",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui',
          cancelButtonText: 'non'
        }).then((result) => {
          if (result.value) {

            let Entity = {
              'ID': id,
              'CancelReason': res
            }
            this.docservice.CancelBookAppointmentWeb(Entity).subscribe(res => {
              let test = res;
              this.getbookappointmentbyhospitalbyhospitalid();
            })
            Swal.fire(
              'Succès!',
              'Le rendez-vous a été annulé',
              'success'
            )
          }
          else {
            this.getbookappointmentbyhospitalbyhospitalid();
          }
        })
    }
    else {
      if (this.languageid == 1) {
        Swal.fire("Please enter reason for cancellation !");
      }
      else if (this.languageid == 6) {
        Swal.fire("Veuillez saisir le motif de l'annulation !")
      }
    }

  }

  public PaymentTypeID: any;

  public GetPaymentTypeID(even) {
    this.PaymentTypeID = even.target.value;
  }

  public patientid: any;
  public appointmentid: any;
  public doctorid: any;
  public PaidAmount: any;
  public appointmenttypeid: any;
  public feeslist: any;
  public doctorslotid: any;

  public GetDetails(details) {
    this.patientid = details.patientID,
      this.appointmentid = details.appointmentID
    this.doctorid = details.doctorID
    this.appointmenttypeid = details.appointmentTypeID,
      this.doctorslotid = details.doctorSlotID

    this.docservice.GetDoctorCommissionFeesByDoctorID(this.doctorslotid, this.appointmenttypeid).subscribe(data => {

      this.feeslist = data;
      this.PaidAmount = this.feeslist[0].doctorFees
    })
  }



  public insertpaymentDetails() {
    var entity = {
      'PatientID': this.patientid,
      'AppointmentID': this.appointmentid,
      'DoctorID': this.doctorid,
      'PaymentType': this.PaymentTypeID,
      'PaidAmount': this.PaidAmount,
      'TotalFeesOfDoctor': this.PaidAmount,
      'PaymentDate': new Date(),
      'Reason': 'Payment Made For Appointment By Receptionst',
    }
    this.docservice.InsertPatientPaymentDetailsWeb(entity).subscribe(data => {
      if (data != 0) {
        if (this.languageid == 1) {
          Swal.fire('Paid Successfully');
        }
        else {
          Swal.fire('Payé avec succès');
        }

      }
      this.getbookappointmentbyhospitalbyhospitalid()

    })
  }


}

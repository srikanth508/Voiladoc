import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { env } from 'process';
@Component({
  selector: 'app-doctor-fees',
  templateUrl: './doctor-fees.component.html',
  styleUrls: ['./doctor-fees.component.css']
})
export class DoctorFeesComponent implements OnInit {
  options: NgDateRangePickerOptions;
  constructor(public docservice: HelloDoctorService) { }
  public languageid: any;
  public doctorlist: any;
  public doctorid: any;
  public departmentlist: any;
  public departmentid: any;
  public departmentname: any;
  public hosptalist: any;
  public treatmentlist: any;
  public treatmentID: any;
  public doccommission: any;
  public voiladoccommission: any;
  public dochospitalid: any;

  public commission: any;
  public hospitalid: any;
  public fees: any;
  public qwerty = [];
  public tablecount: any;
  public hospitalname: any;
  public doctorname: any;
  public treatmentname: any;
  public idcount: any;
  public labels: any;
  public docdd = {}
  public dummlist: any;

  ngOnInit() {

    this.hospitalid = localStorage.getItem('hospitalid');

    this.languageid = localStorage.getItem('LanguageID');
    this.GetAllDoctors();
    this.tablecount = 0;
    this.idcount = 1;

    this.docservice.GetAdmin_WorkingDetails_label(this.languageid).subscribe(
      data => {
        debugger
        this.labels = data;
        this.SelectLabel = this.labels[0].select;
      }, error => {
      }
    )
    this.GetAppointmentType()
  }

  appointmenttype: any;
  dummappointmenttype: any;

  public GetAppointmentType() {
    this.docservice.GetBookAppointmentTypeMasterWebByLanguageID(this.languageid).subscribe(data => {
      this.appointmenttype = data;
      this.dummappointmenttype = data;

    }, error => {
    })
  }
  appointmentypeid: any;
  appointmenttypename: any;

  public GetAppointmentID(even) {
    debugger
    this.appointmentypeid = even.target.value;

    var applist = this.dummappointmenttype.filter(x => x.id == this.appointmentypeid)
    this.appointmenttypename = applist[0].appointmentType
  }


  SelectLabel
  public GetAllDoctors() {
    if (this.hospitalid == undefined) {
      this.docservice.GetDoctorHospitalDetailsDoctors(this.languageid).subscribe(
        data => {
          debugger
          this.doctorlist = data;

          this.docdd = {
            singleSelection: true,
            idField: 'doctorID',
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
    else if (this.hospitalid != undefined) {
      this.docservice.GetDoctorHospitalDetailsDoctors(this.languageid).subscribe(
        data => {
          debugger
          this.dummlist = data;
          this.doctorlist = this.dummlist.filter(x => x.hosid == this.hospitalid)

          this.docdd = {
            singleSelection: true,
            idField: 'doctorID',
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

  }

  public GetDoctorID(item: any) {
    debugger
    this.doctorid = item.doctorID;
    debugger
    var list = this.doctorlist.filter(x => x.doctorID == this.doctorid)
    debugger
    this.departmentid = list[0].departmentID,
      this.departmentname = list[0].departmentname,
      this.doctorname = list[0].doctorName

    this.docservice.GetDoctorHospitalsByDoctorID(this.languageid, this.doctorid).subscribe(
      data => {
        debugger
        this.hosptalist = data;
        this.hospitalid = this.hosptalist[0].hospital_ClinicID,
          this.dochospitalid = this.hosptalist[0].id,
          this.hospitalname = this.hosptalist[0].hospital_ClinicName
      }, error => {
      }
    )

    this.GetAllHospital();
    this.GetALlTreatmentPlans();
  }

  public GetAllHospital() {
    this.docservice.GetDoctorHospitalsByDoctorID(this.languageid, this.doctorid).subscribe(
      data => {
        debugger
        this.hosptalist = data;
        this.hospitalid = this.hosptalist[0].hospital_ClinicID,
          this.dochospitalid = this.hosptalist[0].id

      }, error => {
      }
    )
  }
  public GetALlTreatmentPlans() {
    this.docservice.GetTreatementPlanMaster(this.languageid, this.departmentid).subscribe(
      data => {
        debugger
        this.treatmentlist = data;
      }, error => {
      }
    )
  }
  public GetTreatmentID(even) {
    debugger
    this.treatmentID = even.target.value;
    var list = this.treatmentlist.filter(x => x.id == this.treatmentID)
    this.treatmentname = list[0].treatmentPlan
  }


  public GetDoccommission(doccommission) {
    debugger
    this.voiladoccommission = 100 - Number(doccommission);
    debugger
  }


  public GetHospitalID(even) {
    debugger
    this.hospitalid = even.target.value;

    var list = this.hosptalist.filter(x => x.hospital_ClinicID == this.hospitalid)
    this.hospitalname = list[0].hospital_ClinicName,
      this.dochospitalid = list[0].id
  }

  public adddetails() {
    debugger
    if (this.doctorid == undefined || this.hospitalid == undefined || this.appointmentypeid == undefined || this.fees == undefined) {
      if (this.languageid == 1) {
        Swal.fire("Please complete all mandatory fields");
      }
      else {
        Swal.fire("Veuillez remplir tous les champs obligatoires");
      }
    }
    else {
      this.tablecount = 1
      var entity = {
        'Sno': this.idcount,
        'DoctorHospitalID': this.dochospitalid,
        'HospitalName': this.hospitalname,
        'TreatmentPlan': this.treatmentname,
        'DoctorName': this.doctorname,
        'HospitaID': this.hospitalid,
        'DoctorID': this.doctorid,
        'TreatmentID': this.treatmentID,
        'Fees': this.fees,
        'DoctorCommission': this.doccommission,
        'VoilaDocCommisiion': this.voiladoccommission,
        'Appointmenttype': this.appointmenttypename,
        'AppointmentTypeID': this.appointmentypeid
      }
      this.qwerty.push(entity);
      this.idcount = this.idcount + 1;
      this.fees = ""
      this.doccommission = ""
      this.voiladoccommission = ""
    }
  }

  public insertdetails() {
    for (let i = 0; i < this.qwerty.length; i++) {
      var entity = {
        'DoctorHospitalID': this.qwerty[i].DoctorHospitalID,
        'HospitaID': this.qwerty[i].HospitaID,
        'DoctorID': this.qwerty[i].DoctorID,
        'TreatmentID': this.qwerty[i].TreatmentID,
        'Fees': this.qwerty[i].Fees,
        'DoctorCommission': this.qwerty[i].DoctorCommission,
        'VoilaDocCommisiion': this.qwerty[i].VoilaDocCommisiion,
        'AppointmentTypeID':this.qwerty[i].AppointmentTypeID,
      }
      this.docservice.InsertDoctorCommissionFees(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire('Success', 'Details Saved Successfully');
          location.href = "#/DoctorFeeDash"
        }
        else {
          if (this.languageid == 1) {
            Swal.fire("This Service Already Exists");
            this.tablecount = 0;
          }
          else {
            Swal.fire("Ce service existe déjà");
            this.tablecount = 0;
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

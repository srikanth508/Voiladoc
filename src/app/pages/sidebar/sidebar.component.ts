import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../hello-doctor.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  display: any;
  faq: any;
  sponsred: any;
  patientinvitations: any;
  invitaionsreport: any;


  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  public temp: any;
  public roleid: any;
  public languageid: any;
  public labels: any;
  public hospitalid: any;
  public menulist: any;
  docmedicine: any;
  public masters: any;
  public registery: any;
  public workingdetails: any;
  public managelogins: any;
  public ecommerce: any;
  public enablelocaldoctors: any;
  public countrymaster: any;
  public provincemaster: any;
  public citymaster: any;
  public departmentmaster: any;
  public complaintmaster: any;
  public specilizationmaster: any;
  public servicemster: any;
  public faciltymaster: any;
  public medicinetypemaster: any;
  public diagnostictesttype: any;
  public diagnostictestmaster: any;
  public bloodgroupmaster: any;
  public whentoconsumemaster: any;
  public insurancemaster: any;
  public degreemaster: any;
  public frequentlyaskedmaster: any;
  public howtousemaster: any;
  public doctortipsmaster: any;
  public prescriptionverifiers: any;
  public hospitals: any;
  public clinics: any;
  public doctor: any;
  public diagnostic: any;
  public pharmacy: any;
  public nurse: any;
  public physiotherapist: any;
  public midwife: any;
  public deliverycompany: any;
  public commissions: any;
  public docworking: any;
  public docfees: any;
  public nurseworking: any;
  public nursefees: any;
  public physioworking: any;
  public physiofees: any;
  public midwifeworking: any;
  public midwifefees: any;
  public doctorlogin: any;

  showdocvideo: any;
  hospitlogin: any;
  diagnosticlogins: any;
  pharmacylogins: any;
  nurselogins: any;
  physiologins: any;
  midwifelogins: any;
  deliverycompanylogins: any;
  hospitalsponsered: any;
  diagnosticcentersponser: any;
  pharmacysponsered: any;
  homepagesponserred: any;
  appointmentsponsered: any;
  category: any;
  subcategory: any;
  products: any;
  inventory: any;
  ordersdashboard: any;
  regentityes: any;
  appointments: any;
  revenue: any;
  supportregistration: any;
  mergepatientdata: any;
  sendemails: any;
  emailsdash: any;
  sendsms: any;
  smadash: any;
  howtousevoiladoc: any;
  doctortips: any;
  registerepatients: any;
  patientwallet: any;
  salesusers: any;
  announcements: any;
  articles: any;
  supportpatienttickets: any;
  supporttickets: any;
  pendingtickets: any;
  resolvedtickets: any;
  diagnosticpackage: any;
  public linforregistration: any;
  public registrationdash: any;
  public Registeredusers: any;
  public Approveddash: any;
  public RejectedDash: any;
  public subscriptions: any;
  public diagnosticplanning: any;
  patientmedicine: any;

  public midwifeagenda: any;
  public doctoragenda: any;
  public nurseagenda: any;
  public physiotherapistagenda: any;
  diagnosticagenda: any;
  completedtickets: any;
  refundtickets: any;
  refundticketsmenu: any;
  hospitalididd: any;
  deliveryreports: any;
  userrole: any;
  patientrefaral: any;
  importpatients: any;
  ngOnInit() {

    

    this.display = "none";
    this.roleid = localStorage.getItem('roleid');
    this.languageid = localStorage.getItem('LanguageID')
    this.hospitalid = localStorage.getItem('hospitalClinicID');

    this.hospitalididd = localStorage.getItem('hospitalid');

    this.getlanguage()

    if (this.roleid == 15 || this.roleid == 18 || this.roleid == 19 || this.roleid == 20 || this.roleid == 21 || this.roleid == 17) {

      this.docservice.GetMenuRoleMappingTableByRoleID(this.languageid, this.roleid).subscribe(
        data => {

          this.menulist = data;

          for (let s = 0; s < this.menulist.length; s++) {
            if (this.menulist[s].menus == 'Masters') {
              this.masters = 1;
            }
            if (this.menulist[s].menus == 'Registry') {
              this.registery = 1;
            }
            if (this.menulist[s].menus == 'Working Details') {
              this.workingdetails = 1;
            }
            if (this.menulist[s].menus == 'Manage logins') {
              this.managelogins = 1;
            }
            if (this.menulist[s].menus == 'Sponsored') {
              this.sponsred = 1;
            }
            if (this.menulist[s].menus == 'Ecommerce') {
              this.ecommerce = 1;
            }
            if (this.menulist[s].menus == 'Support Tickets') {
              this.supporttickets = 1;
            }

            if (this.menulist[s].menus == 'Registrations') {
              this.Registeredusers = 1;
            }

            if (this.menulist[s].menus == 'Refund Tickets') {
              this.refundticketsmenu = 1;
            }


            if (this.menulist[s].subMenuName == 'Enable Local Doctors') {
              this.enablelocaldoctors = 1;
            }
            if (this.menulist[s].subMenuName == 'Country Master') {
              this.countrymaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Province Master') {
              this.provincemaster = 1;
            }

            if (this.menulist[s].subMenuName == 'City Master') {
              this.citymaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Department Master') {
              this.departmentmaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Complaint Master') {
              this.complaintmaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Specilization Master') {
              this.specilizationmaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Service Master') {
              this.servicemster = 1;
            }
            if (this.menulist[s].subMenuName == 'Facility Master') {
              this.faciltymaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Medicine Type Master') {
              this.medicinetypemaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Diagnostic Test Type') {
              this.diagnostictesttype = 1;
            }
            if (this.menulist[s].subMenuName == 'Diagnostic Tests Master') {
              this.diagnostictestmaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Blood Group Master') {
              this.bloodgroupmaster = 1;
            }
            if (this.menulist[s].subMenuName == 'When To Consume Master') {
              this.whentoconsumemaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Insurance Master') {
              this.insurancemaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Degree Master') {
              this.degreemaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Frequently Asked Master') {
              this.frequentlyaskedmaster = 1;
            }
            if (this.menulist[s].subMenuName == 'How To Use Master') {
              this.howtousemaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Doctor Tips Master') {
              this.doctortipsmaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Prescription Verifiers') {
              this.prescriptionverifiers = 1;
            }
            if (this.menulist[s].subMenuName == 'Hospitals') {
              this.hospitals = 1;
            }
            if (this.menulist[s].subMenuName == 'Clinics') {
              this.clinics = 1;
            }
            if (this.menulist[s].subMenuName == 'Doctor') {
              this.doctor = 1;
            }
            if (this.menulist[s].subMenuName == 'Diagnostic') {
              this.diagnostic = 1;
            }
            if (this.menulist[s].subMenuName == 'Pharmacy') {
              this.pharmacy = 1;
            }
            if (this.menulist[s].subMenuName == 'Nurse') {
              this.nurse = 1;
            }
            if (this.menulist[s].subMenuName == 'Physiotherapist') {
              this.physiotherapist = 1;
            }
            if (this.menulist[s].subMenuName == 'MidWife') {
              this.midwife = 1;
            }
            if (this.menulist[s].subMenuName == 'Delivery Company') {
              this.deliverycompany = 1;
            }
            if (this.menulist[s].subMenuName == 'Commissions') {
              this.commissions = 1;
            }
            if (this.menulist[s].subMenuName == 'Doctor Working') {
              this.docworking = 1;
            }
            if (this.menulist[s].subMenuName == 'Doctor fees') {
              this.docfees = 1;
            }
            if (this.menulist[s].subMenuName == 'Nurse Working') {
              this.nurseworking = 1;
            }
            if (this.menulist[s].subMenuName == 'Nurse Fees') {
              this.nursefees = 1;
            }
            if (this.menulist[s].subMenuName == 'Physiotherapist Working') {
              this.physioworking = 1;
            }
            if (this.menulist[s].subMenuName == 'Physiotherapist fees') {
              this.physiofees = 1;
            }
            if (this.menulist[s].subMenuName == 'MidWife Working') {
              this.midwifeworking = 1;
            }
            if (this.menulist[s].subMenuName == 'MidWife fees') {
              this.midwifefees = 1;
            }
            if (this.menulist[s].subMenuName == 'Doctor  Logins') {
              this.doctorlogin = 1;
            }
            if (this.menulist[s].subMenuName == 'Hospital Logins') {
              this.hospitlogin = 1;
            }
            if (this.menulist[s].subMenuName == 'Diagnostic Logins') {
              this.diagnosticlogins = 1;
            }
            if (this.menulist[s].subMenuName == 'Pharmacy Logins') {
              this.pharmacylogins = 1;
            }
            if (this.menulist[s].subMenuName == 'Nurse Logins') {
              this.nurselogins = 1;
            }
            if (this.menulist[s].subMenuName == 'Physiotherapist Logins') {
              this.physiologins = 1;
            }
            if (this.menulist[s].subMenuName == 'Midwife Logins') {
              this.midwifelogins = 1;
            }
            if (this.menulist[s].subMenuName == 'Delivery company Logins') {
              this.deliverycompanylogins = 1;
            }
            if (this.menulist[s].subMenuName == 'Hospital / Clinic Sponsered') {
              this.hospitalsponsered = 1;
            }
            if (this.menulist[s].subMenuName == 'Diagnostic Center Sponsered') {
              this.diagnosticcentersponser = 1;
            }
            if (this.menulist[s].subMenuName == 'Pharmacy Sponsered') {
              this.pharmacysponsered = 1;
            }
            if (this.menulist[s].subMenuName == 'Home Page Sponsorship') {
              this.homepagesponserred = 1;
            }
            if (this.menulist[s].subMenuName == 'Appointment Sponsorship') {
              this.appointmentsponsered = 1;
            }
            if (this.menulist[s].subMenuName == 'Category') {
              this.category = 1;
            }
            if (this.menulist[s].subMenuName == 'Sub Category') {
              this.subcategory = 1;
            }
            if (this.menulist[s].subMenuName == 'Products') {
              this.products = 1;
            }
            if (this.menulist[s].subMenuName == 'Inventory') {
              this.inventory = 1;
            }
            if (this.menulist[s].subMenuName == 'Orders dashboard') {
              this.ordersdashboard = 1;
            }
            if (this.menulist[s].subMenuName == 'Registered Entities') {
              this.regentityes = 1;
            }
            if (this.menulist[s].subMenuName == 'Appointments') {
              this.appointments = 1;
            }
            if (this.menulist[s].subMenuName == 'Revenue') {
              this.revenue = 1;
            }
            if (this.menulist[s].subMenuName == 'Support Registration') {
              this.supportregistration = 1;
            }
            if (this.menulist[s].subMenuName == 'Merge Patient Data') {
              this.mergepatientdata = 1;
            }
            if (this.menulist[s].subMenuName == 'Send Emails') {
              this.sendemails = 1;
            }
            if (this.menulist[s].subMenuName == 'Emails dash') {
              this.emailsdash = 1;
            }
            if (this.menulist[s].subMenuName == 'Send Sms') {
              this.sendsms = 1;
            }
            if (this.menulist[s].subMenuName == 'Sms dash') {
              this.smadash = 1;
            }
            if (this.menulist[s].subMenuName == 'FAQ') {
              this.faq = 1;
            }
            if (this.menulist[s].subMenuName == 'How To Use Voiladoc') {
              this.howtousevoiladoc = 1;
            }
            if (this.menulist[s].subMenuName == 'Doctor Tips') {
              this.doctortips = 1;
            }
            if (this.menulist[s].subMenuName == 'Registered Patients') {
              this.registerepatients = 1;
            }
            if (this.menulist[s].subMenuName == 'Patient Wallet') {
              this.patientwallet = 1;
            }
            if (this.menulist[s].subMenuName == 'Sales users') {
              this.salesusers = 1;
            }
            if (this.menulist[s].subMenuName == 'Announcements') {
              this.announcements = 1;
            }
            if (this.menulist[s].subMenuName == 'Articles') {
              this.articles = 1;
            }
            if (this.menulist[s].subMenuName == 'Support Patient Tickets') {
              this.supportpatienttickets = 1;
            }
            if (this.menulist[s].subMenuName == 'Pending Tickets') {
              this.pendingtickets = 1;
            }
            if (this.menulist[s].subMenuName == 'Resolved Tickets') {
              this.resolvedtickets = 1;
            }
            if (this.menulist[s].subMenuName == 'Resolved Tickets') {
              this.resolvedtickets = 1;
            }
            if (this.menulist[s].subMenuName == 'Diagnostic Package') {
              this.diagnosticpackage = 1;
            }
            if (this.menulist[s].subMenuName == 'Link For Registration') {
              this.linforregistration = 1;
            }
            if (this.menulist[s].subMenuName == 'Registration Dashboard') {
              this.registrationdash = 1;
            }
            if (this.menulist[s].subMenuName == 'Approved dashboard') {
              this.Approveddash = 1;
            }
            if (this.menulist[s].subMenuName == 'Rejected dashboard') {
              this.RejectedDash = 1;
            }
            if (this.menulist[s].subMenuName == 'Subscriptions') {
              this.subscriptions = 1;
            }
            if (this.menulist[s].subMenuName == 'DIagnostic Planning') {
              this.diagnosticplanning = 1;
            }
            if (this.menulist[s].subMenuName == 'Doctor Agenda') {
              this.doctoragenda = 1;
            }
            if (this.menulist[s].subMenuName == 'Nurse Agenda') {
              this.nurseagenda = 1;
            }
            if (this.menulist[s].subMenuName == 'Physiotherapist Agenda') {
              this.physiotherapistagenda = 1;
            }
            if (this.menulist[s].subMenuName == 'Midwife Agenda') {
              this.midwifeagenda = 1;
            }
            if (this.menulist[s].subMenuName == 'Refund Tickets') {
              this.refundtickets = 1;
            }
            if (this.menulist[s].subMenuName == 'Completed Tickets') {
              this.completedtickets = 1;
            }
            if (this.menulist[s].subMenuName == 'Diagnostic Agenda') {
              this.diagnosticagenda = 1;
            }
            if (this.menulist[s].subMenuName == 'Home Delivery Fees') {
              this.homedeliveryfees = 1;
            }
            if (this.menulist[s].subMenuName == 'Invitation Master') {
              this.invitationmaster = 1;
            }
            if (this.menulist[s].subMenuName == 'Delivery Reports') {
              this.deliveryreports = 1;
            }
            if (this.menulist[s].subMenuName == 'User Role Menu Mapping') {
              this.userrole = 1;
            }
            if (this.menulist[s].subMenuName == 'Patient Referal Invitations') {
              this.patientrefaral = 1;
            }
            if (this.menulist[s].subMenuName == 'Patient Invitations') {
              this.patientinvitations = 1;
            }
            if (this.menulist[s].subMenuName == 'Patient Invitations Report') {
              this.invitaionsreport = 1;
            }

            if (this.menulist[s].subMenuName == 'Doctor Medicines') {
              this.docmedicine = 1;
            }
            if (this.menulist[s].subMenuName == 'Patient Medicines') {
              this.patientmedicine = 1;
            }
            if (this.menulist[s].subMenuName == 'Import Patients') {
              this.importpatients = 1;
            }
          }

        })
    }
  }

  homedeliveryfees: any;
  invitationmaster: any;


  public getlanguage() {
    this.docservice.GetAdmin_LoginPage_Labels(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }
  public show() {

    if (this.docservice.showvid == 1) {
      this.display = "block";
    }

  }

  public hide() {
    this.display = "none";
  }

  public highlight(evt) {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
    var i, tablinks;

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.currentTarget.className += " active";
  }
}

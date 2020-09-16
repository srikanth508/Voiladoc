import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../hello-doctor.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public roleid: any;
  public rolelist: any;
  public result: any;
  public uname: any;
  public pwd: any;
  public wname: any;
  public userid: any;
  public loginname: any;
  public languagelist: any;
  public LanguageID: any;
  public languageid: any;
  public adminid: any;
  public countrylist: any;
  public countryid: any;
  public countrydetails: any;
  public host: any;
  public labels: any;

  constructor(public docservice: HelloDoctorService, private router: Router, private spinner: NgxSpinnerService) { }
  ngOnInit() {


    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 800);
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetCountrySwitch().subscribe(
      data => {
        debugger
        this.countrylist = data;
      }, error => {
      }
    )

    // this.docservice.GetLanguageMaster().subscribe(
    //   data => {
    //     debugger
    //     this.languagelist = data;
    //   }, error => {
    //   }
    // )

  }


  public getlang(url) {
    this.docservice.GetLanguageMaster(url).subscribe(
      data => {
        debugger
        this.languagelist = data;
      }, error => {
      }
    )
  }

  public GetCountryID(even) {
    if (even.target.value != 0) {
      debugger
      this.countryid = even.target.value;
      this.docservice.GetCountrySwitchByCountryID(this.countryid).subscribe(
        data => {
          debugger
          this.countrydetails = data;
          debugger
          localStorage.setItem('WebUrl', this.countrydetails[0].webBaseURL);
          // this.host = this.docservice.host;
          debugger
          this.getlang(this.countrydetails[0].webBaseURL)
        }, error => {
        }
      )
    }
    else if (even.target.value == 0) {

    }

  }

  public GetLanguageID(even) {
    debugger
    this.LanguageID = even.target.value;
    this.getlanguage();
    localStorage.setItem('LanguageID', this.LanguageID);



    this.getroletypemaster();

  }

  public getroletypemaster() {
    debugger
    this.docservice.GetRoleTypesMasterBYID(this.LanguageID, localStorage.getItem('WebUrl')).subscribe(
      data => {
        debugger
        this.rolelist = data;
      }, error => {
      }
    )
  }
  public getlanguage() {
    this.docservice.Getloginlabel(this.LanguageID, localStorage.getItem('WebUrl')).subscribe(
      data => {
        debugger
        this.labels = data;
      }, error => {
      }
    )
  }

  public login() {
    debugger
    if (this.roleid == null || this.roleid == undefined) {
      Swal.fire('Error', 'Please select role!');
    }
    if (this.uname == null || this.pwd == undefined) {
      Swal.fire('Error', 'Please Enter UserName and Password!');
    }
    else {
      if (this.roleid == "1") {
        this.docservice.GetSalesRegistrationLogin(this.uname, this.pwd, this.LanguageID, localStorage.getItem('WebUrl')).subscribe(
          data => {
            debugger
            this.result = data;
            debugger
            if (this.result != null) {
              localStorage.setItem('user', '')
              localStorage.setItem('roleid', '1');
              this.adminid = this.result.id;
              const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
              localStorage.setItem('temp', '1');
              // localStorage.setItem('userid', this.result[0].id);
              location.href = '#/Docdash';
              location.reload();
            } else {
              Swal.fire('Error', 'Username or Password is not valid!');
              this.uname = "";
              this.pwd = "";
            }
          }, error => {
          }
        )
      }
    }
    if (this.roleid == "2") {
      this.docservice.GetDoctorLogin(this.uname, this.pwd, this.LanguageID, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('user', this.result[0].doctorName)
            localStorage.setItem('roleid', '2');
            sessionStorage.setItem('temp', '1');
            localStorage.setItem('MobileNumber', this.result[0].mobileNumber);
            localStorage.setItem('Hospital_ClinicName', this.result[0].hospital_ClinicName);
            localStorage.setItem('userid', this.result[0].doctorID);
            localStorage.setItem('hospitalClinicID', this.result[0].hospitalClinicID)
            localStorage.setItem('departmentid', this.result[0].departmentID)
            location.href = '#/DoctorDashboard';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";
          }
        }, error => {
        }
      )
    }
    if (this.roleid == "3") {
      this.docservice.GetHospitalAdminRegistrationLogin(this.uname, this.pwd, this.LanguageID, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('user', this.result[0].hospital_ClinicName)
            localStorage.setItem('roleid', '3');
            localStorage.setItem('hospitalid', this.result[0].hospital_ClinicID);
            sessionStorage.setItem('temp', '1');
            location.href = '#/HospitalRevenue';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";
          }
        }, error => {
        }
      )
    }
    if (this.roleid == "4") {
      this.docservice.GetDiagnosticCenterAdminRegistrationLogin(this.uname, this.pwd, this.LanguageID, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('user', this.result[0].diagnosticCenterName)
            localStorage.setItem('roleid', '4');
            localStorage.setItem('diagnosticid', this.result[0].diagnosticCenterID);
            sessionStorage.setItem('temp', '1');
            location.href = '#/Profiles';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";

          }
        }, error => {
        }
      )
    }
    if (this.roleid == "5") {
      this.docservice.GetPharmacyAdminRegistrationLogin(this.uname, this.pwd, this.LanguageID, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('user', this.result[0].pharmacyName)
            localStorage.setItem('roleid', '5');
            localStorage.setItem('pharmacyid', this.result[0].pharmacyID);
            sessionStorage.setItem('temp', '1');
            location.href = '#/Pharmacyprofile';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";
          }
        }, error => {
        }
      )
    }
    if (this.roleid == "7") {
      this.docservice.GetNurseLogin(this.uname, this.pwd, this.LanguageID, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('user', this.result[0].nurseName)
            localStorage.setItem('roleid', '7');
            localStorage.setItem('nurseid', this.result[0].nurseID);
            localStorage.setItem('hospitalid', this.result[0].hospitalClinicID);
            sessionStorage.setItem('temp', '1');
            location.href = '#/NurseProfile';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";
          }
        }, error => {
        }
      )
    }
    if (this.roleid == "8") {
      this.docservice.GetPhysiotherapistLogin(this.uname, this.pwd, this.LanguageID, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('user', this.result[0].name)
            localStorage.setItem('roleid', '8');
            localStorage.setItem('physioid', this.result[0].physiotherapistID);
            localStorage.setItem('hospitalid', this.result[0].hospitalClinicID);
            sessionStorage.setItem('temp', '1');
            location.href = '#/PhysiotherapistProfile';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";
          }
        }, error => {
        }
      )
    }
    if (this.roleid == "9") {
      this.docservice.GetMidWivesLogin(this.uname, this.pwd, this.LanguageID, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('user', this.result[0].name)
            localStorage.setItem('roleid', '9');
            localStorage.setItem('midwifeid', this.result[0].midWiveID);
            sessionStorage.setItem('temp', '1');
            location.href = '#/MidwifeProfile';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";
          }
        }, error => {
        }
      )
    }
    if (this.roleid == "10") {
      this.docservice.GetDeliveryCompanyLogin(this.uname, this.pwd, this.LanguageID, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('user', this.result[0].companyName)
            localStorage.setItem('roleid', '10');
            localStorage.setItem('deliveryid', this.result[0].deliveryCompanyID);
            sessionStorage.setItem('temp', '1');
            location.href = '#/DeliverPartnerProfile';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";
          }
        }, error => {
        }
      )
    }

    if (this.roleid == "11") {
      this.docservice.GetLocalDoctorRegistrationUnameAndPwd(this.uname, this.pwd, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('user', this.result[0].doctorName)
            localStorage.setItem('roleid', '11');
            localStorage.setItem('localdocid', this.result[0].id);
            sessionStorage.setItem('temp', '1');
            location.href = '#/MyProfiles';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";
          }
        }, error => {
        }
      )
    }
    if (this.roleid == "12") {
      this.docservice.GetMeridionalAdmin_LoginUnameAndPwd(this.uname, this.pwd, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('user', 'Manny')
            localStorage.setItem('roleid', '12');
            // localStorage.setItem('localdocid', this.result[0].id);
            sessionStorage.setItem('temp', '1');
            location.href = '#/AdminDash';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";
          }
        }, error => {
        }
      )
    }
    if (this.roleid == "13") {
      this.docservice.GetSupportRegistrationUnameAndPwd(this.uname, this.pwd, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('supportid', this.result[0].id)
            localStorage.setItem('user', this.result[0].name)
            localStorage.setItem('roleid', '13');
            // localStorage.setItem('localdocid', this.result[0].id);
            sessionStorage.setItem('temp', '1');
            location.href = '#/SupportDash';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";
          }
        }, error => {
        }
      )
    }
    
    if (this.roleid == "14") {
      this.docservice.GetReceiptionistLogin(this.uname, this.pwd, localStorage.getItem('WebUrl')).subscribe(
        data => {
          debugger
          this.result = data;
          debugger
          if (this.result.length != '0') {
            localStorage.setItem('user', this.result[0].hospital_ClinicName)
            localStorage.setItem('roleid', '14');
            localStorage.setItem('hospitalid', this.result[0].hospitalID);
            localStorage.setItem('Receptionstid', this.result[0].id);
            localStorage.setItem('receptiostname', this.result[0].name);
            sessionStorage.setItem('temp', '1');
            location.href = '#/Appointments';
            location.reload();
          }
          else {
            Swal.fire('Error', 'Username or Password is not valid!');
            this.uname = "";
            this.pwd = "";
          }
        }, error => {
        }
      )
    }
  }


  public onchangeFunction(even) {
    debugger
    this.roleid = even.target.value;
    localStorage.setItem('roleid', this.roleid);
  }



}

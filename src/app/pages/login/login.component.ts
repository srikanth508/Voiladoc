import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../hello-doctor.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { TotalHospitalApointmentsComponent } from '../Hospital/total-hospital-apointments/total-hospital-apointments.component';

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
  public Showpass: any;
  public pinno: any;

  constructor(public docservice: HelloDoctorService, private router: Router, private spinner: NgxSpinnerService) { }
  ngOnInit() {

    this.Showpass = 1;
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 800);
    this.languageid = localStorage.getItem('LanguageID');

    this.docservice.GetCountrySwitch().subscribe(
      data => {

        this.countrylist = data;
      }, error => {
      }
    )

    // localStorage.setItem('WebUrl', 'https://maroc.voiladoc.org/MarocAPI');

    // localStorage.setItem('WebUrl', 'https://maroc.voiladoc.org/MadagascarWebAPI');

    // this.docservice.GetLanguageMaster().subscribe(
    //   data => {
    //    
    //     this.languagelist = data;
    //   }, error => {
    //   }
    // )
    this.getlang()
    // this.autologout()
  }



  // public autologout() {
  //   
  //   window.addEventListener('storage', () => {
  //     
  //     window.alert('Voiladoc is opened in another tab. Please logout from that tab to login here');
  //     sessionStorage.clear();
  //     localStorage.clear();
  //     location.href = "#/login";
  //     // location.reload();
  //     
  //   }, false)
  //   localStorage.setItem('Sentinel', Math.random());
  //   
  // }





  public getlang() {
    this.docservice.GetLanguageMaster().subscribe(
      data => {

        this.languagelist = data;
      }, error => {
      }
    )
  }

  public GetCountryID(even) {
    if (even.target.value != 0) {

      this.countryid = even.target.value;
      this.docservice.GetCountrySwitchByCountryID(this.countryid).subscribe(
        data => {

          this.countrydetails = data;

          localStorage.setItem('WebUrl', this.countrydetails[0].webBaseURL);
          // this.host = this.docservice.host;

          // this.getlang(this.countrydetails[0].webBaseURL)
        }, error => {
        }
      )
    }
    else if (even.target.value == 0) {

    }

  }

  public GetLanguageID(even) {

    this.LanguageID = even.target.value;
    this.getlanguage();
    localStorage.setItem('LanguageID', this.LanguageID);

    this.getroletypemaster();

  }
  public getroletypemaster() {

    this.docservice.GetRoleTypesMasterBYID(this.LanguageID).subscribe(
      data => {

        this.rolelist = data;
      }, error => {
      }
    )
  }
  public getlanguage() {
    this.docservice.Getloginlabel(this.LanguageID).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }




  public login() {
    if (this.roleid == null || this.roleid == undefined) {
      if (this.LanguageID == 1) {
        Swal.fire('Error', 'Please select role!');
      }
      if (this.LanguageID == 6) {
        Swal.fire('Erreur', 'Sélectionner une fonction!');
      }
    }
    if (this.uname == null || this.pwd == undefined) {
      Swal.fire('Error', 'Please Enter UserName and Password!');
    }
    else {
      if (this.roleid == "1") {

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.docservice.Authenicate(entity).subscribe(data => {

          if (data['requestMessage'] != undefined || null) {

            localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.docservice.GetSalesRegistrationLogin(this.uname, this.pwd, this.LanguageID).subscribe(
              data => {

                this.result = data;

                if (this.result != null) {
                  localStorage.setItem('user', '')
                  localStorage.setItem('roleid', '1');
                  this.adminid = this.result.id;
                  const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                  sessionStorage.setItem('temp', '1');
                  // localStorage.setItem('userid', this.result[0].id);
                  location.href = '#/Docdash';
                  location.reload();
                } else {
                  if (this.LanguageID == 1) {
                    Swal.fire('Error', 'Username or Password is not valid!');
                    this.uname = "";
                    this.pwd = "";
                  }
                  else if (this.LanguageID == 6) {
                    Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                    this.uname = "";
                    this.pwd = "";
                  }

                }
              }, error => {
              }
            )
          }
        })
      }
    }
    if (this.roleid == "2") {

      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }

      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

          this.docservice.GetDoctorLogin(this.uname, this.pwd, this.LanguageID, this.pinno).subscribe(
            data => {

              this.result = data;

              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].doctorName)
                localStorage.setItem('roleid', '2');
                sessionStorage.setItem('temp', '1');
                localStorage.setItem('MobileNumber', this.result[0].mobileNumber);
                localStorage.setItem('Hospital_ClinicName', this.result[0].hospital_ClinicName);
                localStorage.setItem('userid', this.result[0].doctorID);
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.pwd);
                localStorage.setItem('hospitalClinicID', this.result[0].hospitalClinicID)
                localStorage.setItem('departmentid', this.result[0].departmentID)
                location.href = '#/Myappointments';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }
    if (this.roleid == "3") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

          this.docservice.GetHospitalAdminRegistrationLogin(this.uname, this.pwd, this.LanguageID, this.pinno).subscribe(
            data => {
              this.result = data;
              if (this.result.length != '0') {

                localStorage.setItem('user', this.result[0].hospital_ClinicName)
                localStorage.setItem('roleid', '3');
                localStorage.setItem('hospitalid', this.result[0].hospital_ClinicID);
                localStorage.setItem('hospitaltype', this.result[0].hospitalType);
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.pwd);
                sessionStorage.setItem('temp', '1');

                location.href = '#/HospitalRevenue';
                location.reload();

              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }
    if (this.roleid == "4") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetDiagnosticCenterAdminRegistrationLogin(this.uname, this.pwd, this.LanguageID, this.pinno).subscribe(
            data => {

              this.result = data;
              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].diagnosticCenterName)
                localStorage.setItem('roleid', '4');
                localStorage.setItem('diagnosticid', this.result[0].diagnosticCenterID);
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.pwd);
                sessionStorage.setItem('temp', '1');
                location.href = '#/Orders';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }

              }
            }, error => {
            }
          )
        }
      })
    }
    if (this.roleid == "5") {

      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetPharmacyAdminRegistrationLogin(this.uname, this.pwd, this.LanguageID, this.pinno).subscribe(
            data => {

              this.result = data;

              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].pharmacyName)
                localStorage.setItem('roleid', '5');
                localStorage.setItem('pharmacyid', this.result[0].pharmacyID);
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.pwd);
                sessionStorage.setItem('temp', '1');
                location.href = '#/DoctorPrescription';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })

    }
    if (this.roleid == "7") {



      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetNurseLogin(this.uname, this.pwd, this.LanguageID, this.pinno).subscribe(
            data => {

              this.result = data;

              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].nurseName)
                localStorage.setItem('roleid', '7');
                localStorage.setItem('nurseid', this.result[0].nurseID);
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('hospitalid', this.result[0].hospitalClinicID);

                localStorage.setItem('Password', this.pwd);
                sessionStorage.setItem('temp', '1');
                location.href = '#/NurseAppointments';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }
    if (this.roleid == "8") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetPhysiotherapistLogin(this.uname, this.pwd, this.LanguageID, this.pinno).subscribe(
            data => {

              this.result = data;

              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].name)
                localStorage.setItem('roleid', '8');
                localStorage.setItem('physioid', this.result[0].physiotherapistID);
                localStorage.setItem('hospitalid', this.result[0].hospitalClinicID);
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.pwd);
                sessionStorage.setItem('temp', '1');
                location.href = '#/PhysiotherapistAppointments';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })


    }
    if (this.roleid == "9") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetMidWivesLogin(this.uname, this.pwd, this.LanguageID, this.pinno).subscribe(
            data => {

              this.result = data;

              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].name)
                localStorage.setItem('roleid', '9');
                localStorage.setItem('midwifeid', this.result[0].midWiveID);
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('hospitalid', this.result[0].hospitalClinicID);
                localStorage.setItem('Password', this.pwd);
                sessionStorage.setItem('temp', '1');
                location.href = '#/MidwifeAppointments';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })


    }
    if (this.roleid == "10") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetDeliveryCompanyLogin(this.uname, this.pwd, this.LanguageID, this.pinno).subscribe(
            data => {

              this.result = data;

              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].companyName)
                localStorage.setItem('roleid', '10');
                localStorage.setItem('deliveryid', this.result[0].deliveryCompanyID);
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('pincode', this.result[0].pincode);
                localStorage.setItem('Password', this.pwd);

                sessionStorage.setItem('temp', '1');
                location.href = '#/PharmacyOrders';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })

    }

    if (this.roleid == "11") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetLocalDoctorRegistrationUnameAndPwd(this.uname, this.pwd, this.pinno).subscribe(
            data => {

              this.result = data;

              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].doctorName)
                localStorage.setItem('roleid', '11');
                localStorage.setItem('localdocid', this.result[0].id);
                sessionStorage.setItem('temp', '1');
                location.href = '#/MyProfiles';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })

    }
    if (this.roleid == "12") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {
        debugger
        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetMeridionalAdmin_LoginUnameAndPwd(this.uname, this.pwd, this.pinno).subscribe(
            data => {

              this.result = data;
              debugger
              if (this.result.length != '0') {
                localStorage.setItem('user', 'Manny')
                localStorage.setItem('roleid', '12');
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.result[0].password);
                localStorage.setItem('meridionalid', this.result[0].id);
                sessionStorage.setItem('temp', '1');
                location.href = '#/AdminDash';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }
    if (this.roleid == "13") {

      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetSupportRegistrationUnameAndPwd(this.uname, this.pwd, this.pinno).subscribe(
            data => {

              this.result = data;

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
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                  this.pinno = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                  this.pinno = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }
    if (this.roleid == "14") {



      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetReceiptionistLogin(this.uname, this.pwd, this.pinno).subscribe(
            data => {

              this.result = data;

              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].hospital_ClinicName)
                localStorage.setItem('roleid', '14');
                localStorage.setItem('hospitalid', this.result[0].hospitalID);
                localStorage.setItem('Receptionstid', this.result[0].id);
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.result[0].password);
                localStorage.setItem('receptiostname', this.result[0].name);
                sessionStorage.setItem('temp', '1');
                location.href = '#/Appointments';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }
    // management logins

    if (this.roleid == "15") {



      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetUsers_RoleMappingByUnameAndPwd(this.uname, this.pwd, this.roleid, this.pinno).subscribe(
            data => {
              this.result = data;
              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].firstName)
                localStorage.setItem('roleid', '15');
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.result[0].password);
                localStorage.setItem('countrymanagerid', this.result[0].id);
                localStorage.setItem('Commacountryid', this.result[0].id);


                sessionStorage.setItem('temp', '1');
                location.href = '#/AdminDash';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }
    if (this.roleid == "17") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetUsers_RoleMappingByUnameAndPwd(this.uname, this.pwd, this.roleid, this.pinno).subscribe(
            data => {
              this.result = data;
              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].firstName)
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.result[0].password);
                localStorage.setItem('roleid', '17');
                localStorage.setItem('implementationid', this.result[0].id);
                localStorage.setItem('Commacountryid', this.result[0].id);
                sessionStorage.setItem('temp', '1');
                location.href = '#/AdminDash';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }
    if (this.roleid == "18") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetUsers_RoleMappingByUnameAndPwd(this.uname, this.pwd, this.roleid, this.pinno).subscribe(
            data => {
              this.result = data;
              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].firstName)
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.result[0].password);
                localStorage.setItem('roleid', '18');
                localStorage.setItem('clientserviceid', this.result[0].id);
                localStorage.setItem('Commacountryid', this.result[0].id);
                sessionStorage.setItem('temp', '1');
                location.href = '#/AdminDash';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }
    if (this.roleid == "19") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetUsers_RoleMappingByUnameAndPwd(this.uname, this.pwd, this.roleid, this.pinno).subscribe(
            data => {
              this.result = data;
              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].firstName)
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.result[0].password);
                localStorage.setItem('roleid', '19');
                localStorage.setItem('salesmanagerid', this.result[0].id);
                localStorage.setItem('Commacountryid', this.result[0].id);
                sessionStorage.setItem('temp', '1');
                location.href = '#/AdminDash';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })



    }
    if (this.roleid == "20") {


      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetUsers_RoleMappingByUnameAndPwd(this.uname, this.pwd, this.roleid, this.pinno).subscribe(
            data => {
              this.result = data;
              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].firstName)
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.result[0].password);
                localStorage.setItem('roleid', '20');
                localStorage.setItem('salesrepresntativeid', this.result[0].id);
                localStorage.setItem('Commacountryid', this.result[0].id);
                sessionStorage.setItem('temp', '1');
                location.href = '#/AdminDash';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }
    if (this.roleid == "22") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);
          this.docservice.GetUsers_RoleMappingByUnameAndPwd(this.uname, this.pwd, this.roleid, this.pinno).subscribe(
            data => {
              this.result = data;
              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].firstName)
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.result[0].password);
                localStorage.setItem('roleid', '22');
                localStorage.setItem('finanacemanagerid', this.result[0].id);
                localStorage.setItem('Commacountryid', this.result[0].id);
                sessionStorage.setItem('temp', '1');
                location.href = '#/BillingDashboard';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }
    if (this.roleid == "23") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

          this.docservice.GetDiagnosticReceptionistLoginByUserNameAndPassword(this.uname, this.pwd, this.pinno).subscribe(
            data => {
              ;
              this.result = data;
              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].userName);

                localStorage.setItem('roleid', '23');
                localStorage.setItem('diagnosticid', this.result[0].diagnosticID);
                localStorage.setItem('Receptionstid', this.result[0].id);
                localStorage.setItem('receptiostname', this.result[0].name);
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.result[0].password);
                sessionStorage.setItem('temp', '1');
                location.href = '#/Orders';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })


    }

    if (this.roleid == "24") {
      var entity = {
        'username': 'HelloDoc@gmail.com',
        'Password': 'HelloDoc',
        'RoleID': 1
      }
      this.docservice.Authenicate(entity).subscribe(data => {

        if (data['requestMessage'] != undefined || null) {
          localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

          this.docservice.GetIndependentDoctors_ReceptionistByUserNameAndPwd(this.pinno, this.uname, this.pwd).subscribe(
            data => {
              this.result = data;
              if (this.result.length != '0') {
                localStorage.setItem('user', this.result[0].name)
                localStorage.setItem('roleid', '24');
                sessionStorage.setItem('temp', '1');
                localStorage.setItem('MobileNumber', this.result[0].mobileNumber);

                localStorage.setItem('Hospital_ClinicName', this.result[0].hospital_ClinicName);
                localStorage.setItem('userid', this.result[0].doctorID);
                localStorage.setItem('Pinno', this.result[0].pinno);
                localStorage.setItem('Password', this.pwd);
                localStorage.setItem('hospitalClinicID', this.result[0].hospitalClinicID)
                localStorage.setItem('hospitalid', this.result[0].hospitalClinicID)
                localStorage.setItem('departmentid', this.result[0].departmentID)
                localStorage.setItem('Password', this.result[0].password);
                localStorage.setItem('recpid', this.result[0].id)
                location.href = '#/DoctorDashboard';
                location.reload();
              }
              else {
                if (this.LanguageID == 1) {
                  Swal.fire('Error', 'Username or Password is not valid!');
                  this.uname = "";
                  this.pwd = "";
                }
                else if (this.LanguageID == 6) {
                  Swal.fire('Erreur', "Le nom d'utilisateur ou le mot de passe n'est pas correct !");
                  this.uname = "";
                  this.pwd = "";
                }
              }
            }, error => {
            }
          )
        }
      })
    }

    // if (this.roleid == "21") {
    //   this.docservice.GetUsers_RoleMappingByUnameAndPwd(this.uname, this.pwd, localStorage.getItem('WebUrl'),this.roleid).subscribe(
    //     data => {
    //       this.result = data;
    //       if (this.result.length != '0') {
    //         localStorage.setItem('user', this.result[0].firstName)
    //         localStorage.setItem('roleid', '21');
    //         localStorage.setItem('supportid', this.result[0].id);
    //         sessionStorage.setItem('temp', '1');
    //          location.href = '#/AdminDash';
    //         location.reload();
    //       }
    //       else {
    //         Swal.fire('Error', 'Username or Password is not valid!');
    //         this.uname = "";
    //         this.pwd = "";
    //       }
    //     }, error => {
    //     }
    //   )
    // }
  }


  public onchangeFunction(even) {

    this.roleid = even.target.value;
    localStorage.setItem('roleid', this.roleid);
  }

  public hidepassord() {
    this.Showpass = 0;
  }

  public showpassword() {
    this.Showpass = 1;
  }
}

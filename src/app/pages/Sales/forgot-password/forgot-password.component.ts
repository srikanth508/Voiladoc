import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { listener } from '@angular/core/src/render3';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  rolelist: any;
  languageid: any;
  labels: any;
  pinno: any;
  public uname: any;
  result: any;
  id: any;
  emailid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getroletypemaster()
    this.getlanguage()
  }

  public getlanguage() {
    this.docservice.Getloginlabel(this.languageid).subscribe(
      data => {

        this.labels = data;
      }, error => {
      }
    )
  }

  public dummrolelist: any;

  public getroletypemaster() {

    this.docservice.GetRoleTypesMasterBYIDForgotpassword(this.languageid).subscribe(
      data => {
        this.rolelist = data;

      }, error => {
      }
    )
  }
  roleid: any;
  public onchangeFunction(even) {

    this.roleid = even.target.value;

  }

  name: any;
  smsmobileno: any;



  public login() {
    if (this.roleid == null || this.roleid == undefined || this.roleid == "") {

      if (this.languageid == 1) {
        Swal.fire('Error', 'Please select role!');
      }
      else if (this.languageid == 6) {
        Swal.fire('Erreur', 'Sélectionner une fonction!');
      }
    }
    else if (this.uname == null || this.pinno == undefined) {
      Swal.fire('Error', 'Please Enter Pinno and Email!');
    }
    else {

      if (this.roleid == "2") {
        this.spinner.show()

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.docservice.Authenicate(entity).subscribe(data => {

          if (data['requestMessage'] != undefined || null) {

            localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.docservice.GetAllProvidersByPinAndUname(this.pinno, this.uname, 1).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = Math.random().toString(36).slice(-8);

                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)

                  this.sendmail(1)
                  // location.reload();
                } else {
                  if (this.languageid == 1) {
                    Swal.fire('Error', 'Email or Pinno is not valid!');
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                  else if (this.languageid == 6) {
                    Swal.fire('Erreur', "Adresse e-mail ou code pin incorrecte. Veuillez réessayer.");
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }

                }
              }, error => {
              }
            )
          }
        })
      }
      if (this.roleid == "3") {
        this.spinner.show()

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.docservice.Authenicate(entity).subscribe(data => {

          if (data['requestMessage'] != undefined || null) {

            localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.docservice.GetAllProvidersByPinAndUname(this.pinno, this.uname, 8).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = Math.random().toString(36).slice(-8);
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.sendmail(8)
                  // location.reload();
                } else {
                  if (this.languageid == 1) {
                    Swal.fire('Error', 'Email or Pinno is not valid!');
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide();
                  }
                  else if (this.languageid == 6) {
                    Swal.fire('Erreur', "Adresse e-mail ou code pin incorrecte. Veuillez réessayer.");
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                }
              }, error => {
              }
            )
          }
        })
      }

      if (this.roleid == "4") {
        this.spinner.show()

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.docservice.Authenicate(entity).subscribe(data => {

          if (data['requestMessage'] != undefined || null) {

            localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.docservice.GetAllProvidersByPinAndUname(this.pinno, this.uname, 6).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name,
                    this.smsmobileno = this.result[0].smsmobileno
                  this.password = Math.random().toString(36).slice(-8);
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.sendmail(6)
                  // location.reload();
                } else {
                  if (this.languageid == 1) {
                    Swal.fire('Error', 'Email or Pinno is not valid!');
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                  else if (this.languageid == 6) {
                    Swal.fire('Erreur', "Adresse e-mail ou code pin incorrecte. Veuillez réessayer.");
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }

                }
              }, error => {
              }
            )
          }
        })
      }
      if (this.roleid == "5") {
        this.spinner.show()

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.docservice.Authenicate(entity).subscribe(data => {

          if (data['requestMessage'] != undefined || null) {

            localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.docservice.GetAllProvidersByPinAndUname(this.pinno, this.uname, 5).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = Math.random().toString(36).slice(-8);
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.sendmail(5)
                  // location.reload();
                } else {
                  if (this.languageid == 1) {
                    Swal.fire('Error', 'Email or Pinno is not valid!');
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                  else if (this.languageid == 6) {
                    Swal.fire('Erreur', "Adresse e-mail ou code pin incorrecte. Veuillez réessayer.");
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }

                }
              }, error => {
              }
            )
          }
        })
      }

      if (this.roleid == "7") {
        this.spinner.show()

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.docservice.Authenicate(entity).subscribe(data => {

          if (data['requestMessage'] != undefined || null) {

            localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.docservice.GetAllProvidersByPinAndUname(this.pinno, this.uname, 2).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = Math.random().toString(36).slice(-8);
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)

                  this.sendmail(2)
                  // location.reload();
                } else {
                  if (this.languageid == 1) {
                    Swal.fire('Error', 'Email or Pinno is not valid!');
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                  else if (this.languageid == 6) {
                    Swal.fire('Erreur', "Adresse e-mail ou code pin incorrecte. Veuillez réessayer.");
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                }
              }, error => {
              }
            )
          }
        })
      }

      if (this.roleid == "8") {
        this.spinner.show()

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.docservice.Authenicate(entity).subscribe(data => {

          if (data['requestMessage'] != undefined || null) {

            localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.docservice.GetAllProvidersByPinAndUname(this.pinno, this.uname, 4).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = Math.random().toString(36).slice(-8);
                   var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.sendmail(4)
                  // location.reload();
                } else {
                  if (this.languageid == 1) {
                    Swal.fire('Error', 'Email or Pinno is not valid!');
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                  else if (this.languageid == 6) {
                    Swal.fire('Erreur', "Adresse e-mail ou code pin incorrecte. Veuillez réessayer.");
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }

                }
              }, error => {
              }
            )
          }
        })
      }

      if (this.roleid == "9") {
        this.spinner.show()

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.docservice.Authenicate(entity).subscribe(data => {

          if (data['requestMessage'] != undefined || null) {

            localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.docservice.GetAllProvidersByPinAndUname(this.pinno, this.uname, 3).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = Math.random().toString(36).slice(-8);
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.sendmail(3)
                  // location.reload();
                } else {
                  if (this.languageid == 1) {
                    Swal.fire('Error', 'Email or Pinno is not valid!');
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                  else if (this.languageid == 6) {
                    Swal.fire('Erreur', "Adresse e-mail ou code pin incorrecte. Veuillez réessayer.");
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                }
              }, error => {
              }
            )
          }
        })
      }

      if (this.roleid == "10") {
        this.spinner.show()

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.docservice.Authenicate(entity).subscribe(data => {

          if (data['requestMessage'] != undefined || null) {

            localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.docservice.GetAllProvidersByPinAndUname(this.pinno, this.uname, 7).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = Math.random().toString(36).slice(-8);
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.sendmail(7)
                  // location.reload();
                } else {
                  if (this.languageid == 1) {
                    Swal.fire('Error', 'Email or Pinno is not valid!');
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                  else if (this.languageid == 6) {
                    Swal.fire('Erreur', "Adresse e-mail ou code pin incorrecte. Veuillez réessayer.");
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                }
              }, error => {
              }
            )
          }
        })
      }
      if (this.roleid == "14") {
        this.spinner.show()

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.docservice.Authenicate(entity).subscribe(data => {

          if (data['requestMessage'] != undefined || null) {

            localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.docservice.GetAllProvidersByPinAndUname(this.pinno, this.uname, 9).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = Math.random().toString(36).slice(-8);
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)
                  this.recpsendmail(1)
                  // location.reload();
                } else {
                  if (this.languageid == 1) {
                    Swal.fire('Error', 'Email or Pinno is not valid!');
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                  else if (this.languageid == 6) {
                    Swal.fire('Erreur', "Adresse e-mail ou code pin incorrecte. Veuillez réessayer.");
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }

                }
              }, error => {
              }
            )
          }
        })
      }
      if (this.roleid == "24") {
        this.spinner.show()

        var entity = {
          'username': 'HelloDoc@gmail.com',
          'Password': 'HelloDoc',
          'RoleID': 1
        }
        this.docservice.Authenicate(entity).subscribe(data => {

          if (data['requestMessage'] != undefined || null) {

            localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

            this.docservice.GetAllProvidersByPinAndUname(this.pinno, this.uname, 10).subscribe(
              data => {

                this.result = data;

                if (this.result.length != '0') {
                  this.id = this.result[0].id,
                    this.emailid = this.result[0].emailID
                  this.name = this.result[0].name
                  this.smsmobileno = this.result[0].smsmobileno
                  this.password = Math.random().toString(36).slice(-8);
                  var smsdesc = "Your New Password is : " + this.password
                  this.SendTwiliSms(smsdesc)

                  this.recpsendmail(2)
                  // location.reload();
                } else {
                  if (this.languageid == 1) {
                    Swal.fire('Error', 'Email or Pinno is not valid!');
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }
                  else if (this.languageid == 6) {
                    Swal.fire('Erreur', "Adresse e-mail ou code pin incorrecte. Veuillez réessayer.");
                    this.uname = "";
                    this.pinno = "";
                    this.spinner.hide()
                  }

                }
              }, error => {
              }
            )
          }
        })
      }
    }

  }

  public updatepssword(typeid) {

    var entity = {
      'ID': this.id,
      'Password': this.password,
      'TypeID': typeid
    }
    this.docservice.UpdateForgotPsswords(entity).subscribe(data => {

      if (this.languageid == 1) {
        Swal.fire('Success', 'Password Reset Successfully');
        location.href = '#/login';
        this.spinner.hide()
      }
      else {
        Swal.fire('', 'Réinitialiser le mot de passe avec succès.');
        location.href = '#/login';
        this.spinner.hide()
      }

      // location.reload();
    })
  }

  emailattchementurl = []
  password: any;


  public sendmail(typeid) {

    if (this.languageid == 1) {
      var entity = {
        'emailto': this.emailid,
        'emailsubject': "Reset Password",
        'emailbody': 'Dear ' + this.name + ",<br><br>" + 'Your New Password is : ' + this.password + "<br><br>" + 'For data safety and that of your patients, do not share your password and change it regularly!  If you need help, please contact our support team.' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
        'attachmenturl': this.emailattchementurl,
        'cclist': 0,
        'bcclist': 0
      }
      this.docservice.sendemail(entity).subscribe(data => {

        if (data == 'Success') {

          this.updatepssword(typeid)
        }
        else {
          Swal.fire("Error", "Your Email is not valid. Can not send mail");
          this.spinner.hide()
        }
      })
    }
    else {
      var entity = {
        'emailto': this.emailid,
        'emailsubject': "Reset Password",
        'emailbody': 'Cher  ' + this.name + ",<br><br>" + 'Votre nouveau mot de passe est : ' + this.password + "<br><br>" + 'Pour votre sécurité et celle de vos patients, ne partagez pas votre mot de passe et changez-le régulièrement !' + "<br><br>" + "Si vous avez besoin d'aide, veuillez contacter notre équipe d'assistance." + "<br><br>" + 'Amicalement,' + "<br>" + "L'équipe de Voiladoc",
        'attachmenturl': this.emailattchementurl,
        'cclist': 0,
        'bcclist': 0
      }
      this.docservice.sendemail(entity).subscribe(data => {

        if (data == 'Success') {

          this.updatepssword(typeid)
        }
        else {
          Swal.fire("Error", "Your Email is not valid. Can not send mail");
          this.spinner.hide()
        }
      })
    }

  }






  public recpsendmail(typeid) {
    if (this.languageid == 1) {
      var entity = {
        'emailto': this.emailid,
        'emailsubject': "Reset Password",
        'emailbody': 'Dear ' + this.name + ",<br><br>" + 'Your New Password is : ' + this.password + "<br><br>" + 'For data safety and that of your patients, do not share your password and change it regularly!  If you need help, please contact our support team.' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
        'attachmenturl': this.emailattchementurl,
        'cclist': 0,
        'bcclist': 0
      }
      this.docservice.sendemail(entity).subscribe(data => {

        if (data == 'Success') {

          this.updatepssword(typeid)
        }
        else {
          Swal.fire("Error", "Your Email is not valid. Can not send mail");
          this.spinner.hide()
        }
      })
    }
    else {
      var entity = {
        'emailto': this.emailid,
        'emailsubject': "Reset Password",
        'emailbody': 'Cher  ' + this.name + ",<br><br>" + 'Votre nouveau mot de passe est : ' + this.password + "<br><br>" + 'Pour votre sécurité et celle de vos patients, ne partagez pas votre mot de passe et changez-le régulièrement !' + "<br><br>" + "Si vous avez besoin d'aide, veuillez contacter notre équipe d'assistance." + "<br><br>" + 'Amicalement,' + "<br>" + "L'équipe de Voiladoc",
        'attachmenturl': this.emailattchementurl,
        'cclist': 0,
        'bcclist': 0
      }
      this.docservice.sendemail(entity).subscribe(data => {

        if (data == 'Success') {

          this.updatepssword(typeid)
        }
        else {
          Swal.fire("Error", "Your Email is not valid. Can not send mail");
          this.spinner.hide()
        }
      })
    }

  }



  public SendTwiliSms(smsdesc) {
    if(this.languageid==1)
    {
      var smstext = "Your New Password is : " + this.password
    }
    else{
      var smstext = "Votre nouveau mot de passe : " + this.password
    }
    this.docservice.SendTwillioSMS(this.smsmobileno, smstext).subscribe(data => {

    })
  }


  public updaterecppwd(typeid) {

    var entity = {
      'ID': this.id,
      'Password': this.password,
      'TypeID': typeid
    }
    this.docservice.UpdateRecpPsswords(entity).subscribe(data => {

      if (this.languageid == 1) {
        Swal.fire('Success', 'Password Reset Successfully');
        location.href = '#/login';
        this.spinner.hide()
      }
      else {
        Swal.fire('', 'Réinitialiser le mot de passe avec succès.');
        location.href = '#/login';
        this.spinner.hide()
      }

      // location.reload();
    })
  }
}

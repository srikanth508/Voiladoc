import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-company-login',
  templateUrl: './delivery-company-login.component.html',
  styleUrls: ['./delivery-company-login.component.css']
})
export class DeliveryCompanyLoginComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public dclist: any;
  public dcid: any;
  public username: any;
  public password: any;
  public diadd = {}
  public pp: any;
  public labels: any;
  public languageid: any;
  search: any;


  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.docservice.GetDeliveryCompanyAdminByLanguageID(this.languageid).subscribe(
      data => {

        this.dclist = data;

        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'companyName',
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
  public getlanguage() {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.SelectLabel = this.labels[0].select;
        this.search = this.labels[0].search
      }, error => {
      }
    )
  }
  SelectLabel
  public GetdcID(item: any) {

    this.dcid = item.id;
  }

  public insertdetails() {
    this.password = Math.random().toString(36).slice(-8);
    if (this.dcid == undefined) {
      if (this.languageid == 1) {
        Swal.fire("Please Select Delivery Company");
      }
      else {
        Swal.fire("Sélectionner une société de livraison");
      }
    }
    else if (this.password != undefined) {

      // var valpassword = this.docservice.strongpassword(this.password);
      // if (valpassword == false) {

      //   this.pp = 1;
      // }
      // else {
      var entity = {
        'DeliveryCompanyID': this.dcid,
        'UserName': this.username,
        'Password': this.password
      }
      // this.username = '';
      // this.password = '';
      this.docservice.InsertDeliveryCompanyLogin(entity).subscribe(data => {

        if (data != 0) {
          if (this.languageid == 1) {
            this.GetDeliveryCompanyLoginAdmin()
            Swal.fire('Registration Completed', 'Details saved successfully', 'success');
            location.href = "#/DeliveryCompanyLoginDashboard"
            this.pp = 0;
          }
          else {
            this.GetDeliveryCompanyLoginAdmin()
            Swal.fire('Enregistré avec succès');
            this.pp = 0;
            location.href = "#/DeliveryCompanyLoginDashboard"
          }


        }
        else {
          this.GetDeliveryCompanyLoginAdmin()
          Swal.fire('Success', 'Delivery Company Login Already Exists', 'success');
          this.pp = 0;

        }
      })
    }
    // }
  }


  public deliverylist: any;
  public delivername: any;


  public GetDeliveryCompanyLoginAdmin() {
    this.docservice.GetDeliveryCompanyLoginAdmin(this.languageid).subscribe(
      data => {

        this.deliverylist = data;
        var list = this.deliverylist.filter(x => x.deliveryCompanyID == this.dcid)
        this.delivername = list[0].companyName,
          this.pinno = list[0].pinno,
          this.email = list[0].emailID

        this.sendmail()
      }, error => {
      }
    )
  }



  pinno: any;
  emailattchementurl = [];
  public email: any;




  public sendmail() {

    var entity = {
      'emailto': this.email,
      'emailsubject': "Voiladoc",
      'emailbody': 'Dear ' + this.delivername + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
      'attachmenturl': this.emailattchementurl,
      'cclist': 0,
      'bcclist': 0
    }
    this.docservice.sendemail(entity).subscribe(data => {
    })
  }


}

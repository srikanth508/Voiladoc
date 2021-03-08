import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.css']
})
export class DiagnosticComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  public diagnosticlist: any;
  public diagnosticid: any;
  public username: any;
  public password: any;
  public diadd={}
  public pp:any;
  public labels:any;
  public languageid:any;

  ngOnInit() {

    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.docservice.GetDiagnosticCenterListByLanguageID(this.languageid).subscribe(
      data => {
       
        this.diagnosticlist = data;
        this.diadd = {
          singleSelection: true,
          idField: 'id',
          textField: 'diagnosticCenterName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          //  itemsShowLimit: 3,
          allowSearchFilter: true
        };
      }, error => {
      }
    )
   
    
  }
  public getlanguage()
  {
    this.docservice.GetAdmin_RegisterLogins_Label(this.languageid).subscribe(
      data => {
       
        this.labels = data;
        this.SelectLabel=this.labels[0].select;
      }, error => {
      }
    )  
  }
  SelectLabel
  public GetDiagnosticID(item1:any) {
   
    this.diagnosticid =item1.id;
  }
  public insertdetails() {
   
    if (this.diagnosticid == undefined) {

      if(this.languageid==1)
      {
        Swal.fire("Please Select Diagnostic Center");
      }
      else{
        Swal.fire("Sélectionner un centre d’analyses / imagerie");
      }

    }
    else if(this.password!=undefined)  {

      var valpassword = this.docservice.strongpassword(this.password);
      if (valpassword == false) {
       
        this.pp=1;
      }
    else {
      var entity = {
        'DiagnosticCenterID': this.diagnosticid,
        'UserName': this.username,
        'Password': this.password
      }
      this.docservice.InsertDiagnosticCenterAdminRegistration(entity).subscribe(data => {
        if (data != 0) {
          if(this.languageid==1)
          {
            this.getdiagnosticloginfordash()
            Swal.fire('Registration Completed', 'Details saved successfully', 'success');
            location.href="#/Diagnosticdash"
            this.clear();
            this.pp=0;
          }
          else{
            this.getdiagnosticloginfordash()
            Swal.fire('', 'Mis à jour avec succés', 'success');
            location.href="#/Diagnosticdash"
            this.clear();
            this.pp=0;
          }
        }
        else{
          if(this.languageid==1)
          {
            Swal.fire('Success', 'Diagnostic Center Already Exists', 'success');
            location.href="#/Diagnosticdash"
          }
          else
          {
            Swal.fire('', 'Le laboratoire d’analyses / imagerie existe déjà');
            location.href="#/Diagnosticdash"
          }
        
        }
      })
    }
  }
}


public diagnoticloginlist:any;

public getdiagnosticloginfordash() {
  this.docservice.GetDiagnosticLoginForDash(this.languageid).subscribe(
    data => {

      this.diagnoticloginlist = data;

       var list= this.diagnoticloginlist.filter(x=>x.diagnosticCenterID==this.diagnosticid)
       this.diagnosticname=list[0].diagnosticCenterName,
       this.pinno=list[0].pinno,
       this.email=list[0].emailID

       this.sendmail();

    }, error => {
    }
  )
}



pinno: any;
emailattchementurl = [];
public email: any;
public diagnosticname: any;



public sendmail() {
  debugger
  var entity = {
    'emailto': this.email,
    'emailsubject': "Voiladoc",
    'emailbody': 'Dear ' + this.diagnosticname + ',' + "<br><br>" + 'Thank You For Registering Voiladoc Plaform. Please use the below link to  login Voiladoc Platform ' + "<br><br>" + 'Link : https://maroc.voiladoc.org/' + "<br>" + 'Pin : ' + this.pinno + "<br>" + 'UserName :' + this.username + "<br>" + 'Password : ' + this.password + "<br><br>" + 'Dont Share Your Passwords to Anyone. For any further help. Please contact our support clients' + "<br><br>" + 'Regards,' + "<br>" + 'Voiladoc Team',
    'attachmenturl': this.emailattchementurl,
    'cclist': 0,
    'bcclist': 0
  }
  this.docservice.sendemail(entity).subscribe(data => {
  })
}



  public clear() {
    this.username = '';
    this.password = '';
    this.diagnosticid = 0;
  }
}

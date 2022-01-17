import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
import { NgxSpinnerService } from "ngx-spinner";
// import { HttpResponse } from '@angular/common/http';
// import { throwError } from 'rxjs';
// import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-patientsreg',
  templateUrl: './patientsreg.component.html',
  styleUrls: ['./patientsreg.component.css']
})
export class PatientsregComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }
  languageid: any;
  labels: any;
  exceptionlist: any;
  typeid: any;
  ngOnInit() {
    this.languageid = localStorage.getItem('LanguageID');
    this.getlanguage();
    this.getexceptions();
    this.GetDoctors();
    this.GetHospitalClinics();
    this.GetClinics()
  }


  public importexcel() {
    this.contactdata = [];
    this.contactdata.length = 0
    this.provider = "";
    this.typeid = 0;

  }


  public getexceptions() {
    this.docservice.GetImportPatients_Exceptions().subscribe(
      data => {

        this.exceptionlist = data;

      },
      error => { }
    );
  }
  dummlist: any;
  dummlist1: any;
  hospitalcliniclist: any;
  hosdd = {}

  public GetHospitalClinics() {
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {

        this.dummlist = data;
        this.dummlist1 = this.dummlist.filter(x => x.hospital_ClinicID == 1)
        this.hospitalcliniclist = this.dummlist1.filter(x => x.id != 590 && x.id != 614 && x.id != 613 && x.id != 612)

        this.hosdd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
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

  clinidd = {}
  cliiclist: any;

  public GetClinics() {
    this.docservice.GetHospital_ClinicForAdminByAdmin(this.languageid).subscribe(
      data => {

        this.dummlist = data;
        this.dummlist1 = this.dummlist.filter(x => x.hospital_ClinicID == 2)
        this.cliiclist = this.dummlist1.filter(x => x.id != 590 && x.id != 614 && x.id != 613 && x.id != 612)

        this.clinidd = {
          singleSelection: true,
          idField: 'id',
          textField: 'hospital_ClinicName',
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

  search: any;

  public getlanguage() {
    this.docservice.GetAdmin_Masters_labels(this.languageid).subscribe(
      data => {

        this.labels = data;
        this.search = this.labels[0].search

      },
      error => { }
    );
  }

  doctorlist: any;
  docdd = {};
  public GetDoctors() {

    this.docservice.GetDoctorForAdminByLanguageID(this.languageid).subscribe(
      data => {


        this.doctorlist = data;

        this.docdd = {
          singleSelection: true,
          idField: 'id',
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
  provider: any;

  GetDoctorName(item: any) {
    this.provider = item.doctorName
  }
  GetHosptilaname(item2: any) {
    this.provider = item2.hospital_ClinicName
  }
  GetClinic(item2: any) {
    this.provider = item2.hospital_ClinicName
  }


  file: File;
  contactdata: any;
  arrayBuffer: any;
  incomingfile(event) {

    this.file = event.target.files[0];
    let a = this.file.name;
    var characters = a.substr(a.length - 5);
    if (characters == ".xlsx") {
      let fileReader = new FileReader();
      fileReader.onload = e => {
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)

          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });

        var first_sheet_name = workbook.SheetNames[0];

        var worksheet = workbook.Sheets[first_sheet_name];

        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.contactdata = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      };
      fileReader.readAsArrayBuffer(this.file);
    } else {
      Swal.fire("Imported file format not supported.");
    }
  }

  public qwerty = [];
  data: any;

  public Upload_file() {
    debugger
    this.spinner.show();
    debugger
    for (let i = 0; i < this.contactdata.length; i++) {
      debugger
      // this.contactdata[i]["ProviderName"] = this.provider
      debugger
      var entity = {
        "PatientName": this.contactdata[i].Prenom,
        "LastName": this.contactdata[i].Nom,
        'MobileNumber': this.contactdata[i].Nodetel,
        "EmailID": this.contactdata[i].Email,
        "Address": this.contactdata[i].Addresse,
        "DateOfBirth": this.contactdata[i].Datedenaissance,
        "BloodGroup": this.contactdata[i].Groupesanguin,
        "Gender": this.contactdata[i].Sexe,
        "Height": this.contactdata[i].Hauteur,
        "Weight": this.contactdata[i].Poids,
        "BMI": this.contactdata[i].IMC,
        "PrimaryCareProvider": this.contactdata[i].Medecintraitant,
        "MedicalHistory": this.contactdata[i].Antécédentsmédicauxetdechirurgicaux,
        "SurgeryHistory": this.contactdata[i].Traitementsdelongueduree,
        "FamilyHistory": this.contactdata[i].Antedentsfamiliaux,
        "VaccinationStatus": this.contactdata[i].Statutvaccinal,
        "SpecialDiet": this.contactdata[i].Regimeparticulier,
        "DoYouDrinkAlchohal": this.contactdata[i].Alcool,
        "AreYouASmoker": this.contactdata[i].Fumeur,
        "DoYouExescise": this.contactdata[i].Execicephysique,
        'Pinno': 0,
        'Medicalinsurance': this.contactdata[i].Nomdelassurance,
        'Allergies': this.contactdata[i].Allergies,
        'NationalIdentityNo': this.contactdata[i].Numérodecartedidentité,
        'ProviderName': this.provider
      }
      debugger
      this.qwerty.push(entity);
    }
    this.docservice.InsertpatientImportExcel(this.qwerty).subscribe(data => {
      debugger
      this.data = data;
      if (data == "Success") {
        debugger
        if(this.languageid==1)
        {
          Swal.fire("Save without errors.");
          this.getexceptions();
          this.spinner.hide();
          this.contactdata = [];
          this.qwerty = [];
        }
        else
        {
          Swal.fire("Enregistrer sans erreurs.");
          this.getexceptions();
          this.spinner.hide();
          this.contactdata = [];
          this.qwerty = [];
        }
       
        // this.contactdata = []
      }
      else {
        debugger
        Swal.fire("Exception : " + data);
        this.getexceptions();
        this.spinner.hide();
        // this.contactdata = []
      }
    },
      error => {
        debugger
        debugger
        if(this.languageid==1)
        {
          Swal.fire("Saved with some errors. Please check the error on the dashboard.");
        }
        else
        {
          Swal.fire("Enregistré avec quelques erreurs. Veuillez vérifier l'erreur sur le tableau de bord.")
        }
      
        this.contactdata = [];
        this.qwerty = [];
        debugger
        this.spinner.hide();
      });
  }


}

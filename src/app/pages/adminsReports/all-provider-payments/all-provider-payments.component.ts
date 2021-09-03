import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-all-provider-payments',
  templateUrl: './all-provider-payments.component.html',
  styleUrls: ['./all-provider-payments.component.css']
})
export class AllProviderPaymentsComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private spinner: NgxSpinnerService) { }

  languageid: any;
  year: any;
  month: any;
  typeid: any;
  alldetails: any;
  term: any;
  dropzonelable: any;
  comments: any;
  ngOnInit() {
    this.spinner.show();
    this.languageid = localStorage.getItem('LanguageID');
    var date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    this.typeid = 1
    this.GetAllRevenue();


    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
  }





  GrandTotal: any;
  count: any;

  public GetAllRevenue() {
    this.docservice.GetAllAdminPayments(this.year, this.month, this.typeid).subscribe(data => {

      this.alldetails = data;
      this.count = this.alldetails.length;
      this.GrandTotal = 0;
      for (let i = 0; i < this.alldetails.length; i++) {
        debugger
        this.GrandTotal = this.GrandTotal + Number(this.alldetails[i].grandTotalAmount);
      }
      this.spinner.hide()

    }, error => {
      this.spinner.hide();
    })
  }

  monthname: any;

  public GetYear(even) {
    this.spinner.show();
    this.year = even.target.value;
    this.GetAllRevenue()
  }


  public GetMonth(even) {
    this.spinner.show();
    this.month = even.target.value;



    this.GetAllRevenue()
  }


  public GetTypeID(even) {
    this.spinner.show();
    this.typeid = even.target.value;
    this.GetAllRevenue()
  }




  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Admin Reports");
  }

  public tableToJson(table) {

    var data = []; // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};
      for (var j = 1; j < tableRow.cells.length; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      } data.push(rowData);
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  public totrevenue: any;
  public totalcommission: any;
  public paymentdue: any;
  public userid: any;


  public GetList(details) {
    this.totrevenue = details.grandTotalAmount
    this.totalcommission = details.totalCommissionsAmount,
      this.paymentdue = Number(details.grandTotalAmount) - Number(details.totalCommissionsAmount),
      this.userid = details.id
  }


  paymenttypeid: any;


  public GetPaymentID(even) {
    this.paymenttypeid = even.target.value;
  }







  identityattachmentsurlssss = []
  attachments = []
  attachmentsurl = []
  showidentityproof = []


  public onattachmentUpload(abcd) {

    // for (let i = 0; i < abcd.length; i++) {
    this.identityattachmentsurlssss = []
    this.attachments.push(abcd.addedFiles[0]);
    this.uploadattachments();
    // }
    if (this.languageid == 1) {
      Swal.fire('Added Successfully');
      abcd.length = 0;
    }
    else if (this.languageid == 6) {
      Swal.fire('Mis à jour avec succés');
      abcd.length = 0;
    }

  }

  public uploadattachments() {
    this.docservice.DoctorIdentityProof(this.attachments).subscribe(res => {

      this.attachmentsurl.push(res);

      this.identityattachmentsurlssss.push(res);

      let a = this.identityattachmentsurlssss[0].slice(2);

      let b = 'https://maroc.voiladoc.org' + a;
      this.showidentityproof.push(b)
      this.attachments.length = 0;



    })
    // this.sendattachment();
  }


  transctionid: any;
  chequeno: any;


  public InsertPayments() {
    var entity = {
      'TypeID': this.typeid,
      'UserID': this.userid,
      'Month': this.month,
      'Year': this.year,
      'TransctionID': this.transctionid,
      'ChequeNo': this.chequeno,
      'PaymentType': this.paymenttypeid,
      'TransctionPhoto': this.attachmentsurl[0],
      'TotalRevenue': this.totrevenue,
      'VoiladocRevenue': this.totalcommission,
      'PaidAmount': this.paymentdue
    }
    this.docservice.InsertProviderPaidPayments(entity).subscribe(data => {
      Swal.fire("Payment Paid Successfully");
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-dia-pharma-pay',
  templateUrl: './dia-pharma-pay.component.html',
  styleUrls: ['./dia-pharma-pay.component.css']
})
export class DiaPharmaPayComponent implements OnInit {

  constructor(public docservice: HelloDoctorService) { }

  languageid: any;
  value: any;
  SDate = new Date();
  EDate = new Date();
  startdate: any;
  enddate: any;
  public todaydate: any;
  public roleid: any;
  options: NgDateRangePickerOptions;
  dropzonelable:any;
  show:any;
  ngOnInit() {

    this.roleid = localStorage.getItem('roleid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.languageid = localStorage.getItem('LanguageID');
    var kkk = this.SDate.setDate(this.SDate.getDate() - 0);
    var lll = this.EDate.setDate(this.EDate.getDate() + 0);


    this.startdate = formatDate(kkk, format, locale);
    this.enddate = formatDate(lll, format, locale);

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';
    // Find current hour in AM-PM Format 
    hours = hours % 12;
    // To display "0" as "12" 
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? 0 + minutes : minutes;

    if (this.languageid == 1) {
      this.dropzonelable = "Upload file"
    }
    else if (this.languageid == 6) {
      this.dropzonelable = "Télécharger des fichiers"
    }
    this.show=1;
  }

  selectedDate(data) {

    this.startdate = this.docservice.GetDates(data[0])
    this.enddate = this.docservice.GetDates(data[1])
    this.getprovidepay()
  }

  public typeid: any;

  public providerlist: any;

  public GetType(even) {
    this.typeid = even.target.value;
    this.getprovidepay()
  }





  public getprovidepay() {
    
    this.docservice.GetDiaPharmaPaymenets(this.startdate, this.enddate, this.typeid, this.languageid).subscribe(data => {
      
      this.providerlist = data;
    })
  }

  hospitalname: any;
  userid: any;
  address: any;
  emailid: any;
  totalamount: any;
  CommissionAmount: any;
  grossamount: any;
  invoicenumber: any;
  nettotal: any;

  public GetList(invlist) {
    ;
    this.hospitalname = invlist.providername;
    this.userid = invlist.id;
    this.address = invlist.address;
    this.emailid = invlist.emailID;
    this.totalamount = Number(invlist.totalAmount)
    this.CommissionAmount = Number(invlist.commissionAmount)
    this.grossamount = Number(invlist.grossAmount)
    this.nettotal = Number(invlist.netTotal)
    //  + Number(invlist.appointmentpercentageamount);
    this.invoicenumber = Math.floor(100000 + Math.random() * 900000);

  }




  public SavePDF() {
    ;
    
    this.show=0;
    let pdfContent = window.document.getElementById("content");
    var doc = new jsPDF('p', 'mm', "a4");

    html2canvas(pdfContent).then(canvas => {
      ;
      var imgData = canvas.toDataURL('image/jpeg', 1.0);

      doc.setFontSize(3);

      doc.addImage(imgData, 'JPEG', 10, 10, 180, 150);
      var pdf = doc.output('blob');

      var file = new File([pdf], "Invoice" + ".pdf");

      let body = new FormData();

      body.append('Dan', file);
      
      this.docservice.UploadInvoicePDF(file).subscribe(res => {
        ;
        
        this.invoiceurl = res;
        
        this.InsertDetailes();
      });
    });

  }

  invoiceurl: any;


  public UploadPdf(data) {
    this.docservice.UploadInvoicePDF(data).subscribe(res => {
      ;
      Swal.fire("Added Successfully");
    });
  }


  comments: any;

  public InsertDetailes() {
    // let fjkjhafd = this.invoiceurl.split('.');
    // let one = fjkjhafd[fjkjhafd.length - 2].split('/');
    // var re = /\\/gi;
    // var path2 = one[one.length - 1].replace(/\\/g, "-");
    // let two = path2.split('-');
    // var docname = two[3] + '-' + two[4] + '.pdf';
    var entity = {
      Type: this.typeid,
      UserID: this.userid,
      InvoiceUrl: this.invoiceurl,
      HospitalName: this.hospitalname,
      filename: this.invoiceurl,
      ContractStartDate: this.startdate,
      ContractEndDate: this.enddate,
      PaidAmount: this.nettotal,
      EmailID: this.emailid,
      Comments: this.comments,
      AttchmentUrl: this.attachmentsurl[0]
    }
    this.docservice.InsertSentInvoice(entity).subscribe(data => {
      ;
      if (data != undefined) {
        
        Swal.fire("Amount Paid Successfully");
        this.getprovidepay()
        // this.GetBillingdetails(this.type, this.startdate, this.enddate);
      }
    })
  }




  identityattachmentsurlssss=[]
  attachments=[]
  attachmentsurl=[]
  showidentityproof=[]


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
}

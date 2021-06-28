import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { NgDateRangePickerOptions } from "ng-daterangepicker";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


@Component({
    selector: 'app-new-billing',
    templateUrl: './new-billing.component.html',
    styleUrls: ['./new-billing.component.css']
})
export class NewBillingComponent implements OnInit {
    billinglist: any;
    invoicelist: any;
    totalamount: any;
    @ViewChild('content')
    content: ElementRef;
    invoiceurl: any;
    type: any;
    hospitalname: any;
    contractsdate: any;
    contractedate: any;
    monthlysub: any;
    appointmentperc: any;
    address: any;
    userid: any;
    yearlysub: any;
    emailid: any;
    constructor(public docservice: HelloDoctorService) { }
    languageid: any;
    value: any;
    SDate = new Date();
    EDate = new Date();
    startdate: any;
    enddate: any;
    public todaydate: any;
    roleid: any;
    invoicenumber: any;
    blob: any;
    options: NgDateRangePickerOptions;

    ngOnInit() {
        ;

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

    }
    selectedDate(data) {
        
        this.startdate = data[0].toLocaleString().split(',')[0];
        this.enddate = data[1].toLocaleString().split(',')[0];
        this.GetBillingdetails(this.type, this.startdate, this.enddate);
    }

    public GetBillingdetails(TypeID, SDATE, EDATE) {
        
        this.docservice.GetHospitalClinicBillingDetails(TypeID, SDATE, EDATE).subscribe(data => {
            
            this.billinglist = data;
        })
    }

    public GetList(invlist) {
        ;
        this.hospitalname = invlist.hospital_ClinicName;
        this.userid = invlist.id;
        this.contractsdate = invlist.contractStartdate;
        this.contractedate = invlist.contractEnddate;
        this.monthlysub = invlist.monthlySubscription;
        this.appointmentperc = invlist.appointmentpercentageamount;
        this.address = invlist.address;
        this.emailid = invlist.emailID;
        this.totalamount = Number(invlist.monthlySubscription)
        //  + Number(invlist.appointmentpercentageamount);
        this.invoicenumber = Math.floor(100000 + Math.random() * 900000);

    }
    public SavePDF() {
        ;
        
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



    public UploadPdf(data) {
        this.docservice.UploadInvoicePDF(data).subscribe(res => {
            ;
            Swal.fire("Added Successfully");
        });
    }

    public InsertDetailes() {
        // let fjkjhafd = this.invoiceurl.split('.');
        // let one = fjkjhafd[fjkjhafd.length - 2].split('/');
        // var re = /\\/gi;
        // var path2 = one[one.length - 1].replace(/\\/g, "-");
        // let two = path2.split('-');
        // var docname = two[3] + '-' + two[4] + '.pdf';
        var entity = {
            Type: this.type,
            UserID: this.userid,
            InvoiceUrl: this.invoiceurl,
            HospitalName: this.hospitalname,
            filename: this.invoiceurl,
            ContractStartDate: this.contractsdate,
            ContractEndDate: this.contractedate,
            PaidAmount: this.totalamount,
            EmailID: this.emailid
        }
        this.docservice.InsertSentInvoice(entity).subscribe(data => {
            ;
            if (data != undefined) {
                
                Swal.fire("Invoice Send Successfully");
                this.GetBillingdetails(this.type, this.startdate, this.enddate);
            }
        })
    }

    public GetType(even) {
        this.type = even.target.value;
    }

}

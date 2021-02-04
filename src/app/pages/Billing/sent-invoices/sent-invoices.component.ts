import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
@Component({
    selector: 'app-sent-invoices',
    templateUrl: './sent-invoices.component.html',
    styleUrls: ['./sent-invoices.component.css']
})
export class SentInvoicesComponent implements OnInit {
    invoiceslist: any;
    term: any;
    type: any;
    show: number;
    options: NgDateRangePickerOptions;
    public today = new Date();
    paiddate:any;
    constructor(public docservice: HelloDoctorService) { }

    ngOnInit() {
        this.show = 0;
        this.options = {
            theme: 'default',
            range: 'tm',
            dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
            dateFormat: 'yyyy/MM/dd',
            outputFormat: 'YYYY/MM/DD',
            startOfWeek: 1
        };

    }

    public Getsentinvoices(type) {
        this.docservice.GetSentInvoice(type).subscribe(data => {
            this.invoiceslist = data;
            this.invoiceslist = this.invoiceslist.filter(x => x.paid == 0);
        })
    }

    public GetType(even) {
        this.show = 1;
        this.type = even.target.value;
        this.Getsentinvoices(this.type);

    }
    public Makestatuspaid(id) {
        
        this.docservice.MakePaymentPaid(id,this.paiddate).subscribe(data => {
            
            if (data != undefined) {
                Swal.fire("Paid Successfully");
                this.Getsentinvoices(this.type);
            }
        })
    }
    selectedDate(even) {
        
        this.paiddate = even.toLocaleString().split(',')[0];    

    }
}

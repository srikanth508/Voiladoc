import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';

@Component({
    selector: 'app-billing-dashboard',
    templateUrl: './billing-dashboard.component.html',
    styleUrls: ['./billing-dashboard.component.css']
})
export class BillingDashboardComponent implements OnInit {
    type: any;
    year: any;
    month: any;
    dummylist: any;
    sentinvoicecount: any;
    paidinvoicecount: any;
    pendinginvoicecount: any;
    pendinginvoice: any;
    paidinvoice: any;
    paidamount: any;
    pendingamount: any;
    constructor(public docservice: HelloDoctorService) { }

    ngOnInit() {
    }

    public GetCounts(Type, Month, Year) {
        
        this.docservice.GetCountsForDashboard(Type, Month, Year).subscribe(data => {
            
            this.dummylist = data;
            this.pendinginvoice = this.dummylist.filter(x => x.paid == 0);
            this.paidinvoice = this.dummylist.filter(x => x.paid == 1);
            this.sentinvoicecount = this.dummylist.length;
            this.paidinvoicecount = this.pendinginvoice.length;
            this.pendinginvoicecount = this.paidinvoice.length;
            if (this.pendinginvoice.length == 0) {
                this.pendingamount = 0;
            }
            else {
                this.pendingamount = this.pendinginvoice.map(a => a.paidAmount).reduce(function (a, b) {
                    return a + b;
                });
            }
            if (this.paidinvoice.length == 0) {
                this.paidamount = 0;
            }
            else {
                this.paidamount = this.paidinvoice.map(a => a.paidAmount).reduce(function (a, b) {
                    return a + b;
                });
            }

        })
    }
    public GetType(even) {
        this.type = even.target.value;

    }
    public GetYear(even) {
        this.year = even.target.value;

    }
    public GetMonth(even) {
        this.month = even.target.value;
        this.GetCounts(this.type, this.month, this.year);
    }
}

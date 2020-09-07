import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import * as OT from '@opentok/client';

@Component({
  selector: 'app-subscriber',
  templateUrl: './subscriber.component.html',
  styleUrls: ['./subscriber.component.css']
})
export class SubscriberComponent implements AfterViewInit {

  @ViewChild('subscriberDiv') subscriberDiv: ElementRef;
  @Input() session: OT.Session;
  @Input() stream: OT.Stream;
  constructor() { }  
  ngAfterViewInit() {
    const subscriber = this.session.subscribe(this.stream, this.subscriberDiv.nativeElement, {height:300,width:485}, (err) => {
      debugger;
      if (err) {
        alert(err.message);
      }
    });
    subscriber.on("streamDestroyed", function (event) {
      debugger;
      console.log("Stream stopped. Reason: ");
    });

  }
}

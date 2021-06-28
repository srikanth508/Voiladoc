import { Component, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { OpentokService } from '../../../opentok.service';
const publish = () => {

};
@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements AfterViewInit {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing: Boolean;
  constructor(private opentokService: OpentokService) {
    this.publishing = false;
  }

  // ngOnInit() {
  // }
  ngAfterViewInit() {

    const OT = this.opentokService.getOT();
    
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {
      insertMode: 'append',
      width: 180,
      height: 120,
      publishAudio: true,
      publishVideo: true

    }, function (err) {
      // ;
      // if (err.name === 'OT_CHROME_MICROPHONE_ACQUISITION_ERROR') {
      //   
      //   alert('Failed to acquire microphone. Please completely quit and restart your browser');
      // }
    });

    if (this.session) {
      
      if (this.session['isConnected']()) {
        this.publish();
        
      }
      
      this.session.on('sessionConnected', () => this.publish());
      this.session.on("sessionDisconnected", function (event) {
        //alert("The session disconnected. " + event.reason);
      });
    }
  }

  publish() {
    this.session.publish(this.publisher, (err) => {
      
      if (err) {
        
        alert(err.message);
      } else {
        this.publishing = true;
        
      }
    });
  }

}

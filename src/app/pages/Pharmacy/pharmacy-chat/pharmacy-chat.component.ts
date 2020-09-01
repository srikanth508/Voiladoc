import { Component, OnInit } from '@angular/core';
import { HelloDoctorService } from '../../../hello-doctor.service';
import Swal from 'sweetalert2';
import { formatDate } from "@angular/common";
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pharmacy-chat',
  templateUrl: './pharmacy-chat.component.html',
  styleUrls: ['./pharmacy-chat.component.css']
})
export class PharmacyChatComponent implements OnInit {

  constructor(public docservice: HelloDoctorService, private activatedroute: ActivatedRoute) { }

  public pharmacyid:any;
  public patientid:any;
  public serverdateandtime:any;
  public servertime:any;
  public serverdate:any;
  public chatID:any;
  public chatconversation = "";
  public image:any;
  public attachments = [];
  public attachmentsurl = [];
  coversationarray = [];
  public imageurl: any;
  ngOnInit() {
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.pharmacyid = params['pharmacyID'];
      this.patientid = params['patientID'];
    }
    )
    this.image=0;
    this.getserverdateandtime()
    this.oberserableTimer();
    this.docservice.GetPharmacyChatID(this.pharmacyid, this.patientid).subscribe(res => {
      debugger;
      this.chatID = res[0].chatID;
      this.getPreviousChat();
    })
  }

  public getserverdateandtime() {

    this.docservice.GetServerDateAndTime().subscribe(
      data => {

        this.serverdateandtime = data;
        this.servertime = this.serverdateandtime.presentTime,
          this.serverdate = this.serverdateandtime.todaydate
      }, error => {
      }
    )
  }


  public dosendmsg() {
    this.getChat();
  }

  public getChat() {
    this.docservice.GetPharmacyChatID(this.pharmacyid, this.patientid).subscribe(res => {
      debugger;

      if (res.length > 0) {
        this.chatID = res[0].chatID;
       this.InsertChatDetails();
       this.getPreviousChat();
      }
      else {
        var entity = {
          'PharmacyID': this.pharmacyid,
          'PatientID': this.patientid
        }
        this.docservice.InserPharmacy_ChatMaster(entity).subscribe(data => {
          debugger
          if (data != 0) {
            this.chatID = data;
             this.InsertChatDetails();
             this.getPreviousChat();
          }
        })
      }
    })
  }


  public InsertChatDetails() {
    let conversation = '[doc:-' + this.chatconversation + ';time:-' + this.servertime + ']';
    debugger;
    if (this.image == 0) {
      var entity = {
        'ChatID': this.chatID,
        'Message': conversation,
        'SenderID': this.pharmacyid,
        'Sender': 'Pharmacy',
        'MessageType': 1
      }
      this.docservice.InsertPharmacy_ChatDetails(entity).subscribe(data => {
        debugger
        if (data != 0) {

        }
        this.chatconversation = "";
        this.image = 0;
        this.getPreviousChat();

      })
    }
    else {
      var entitys = {
        'ChatID': this.chatID,
        'Message': this.imageurl,
        'SenderID': this.pharmacyid,
        'Sender': 'Pharmacy',
        'MessageType': 2
      }
      this.docservice.InsertPharmacy_ChatDetails(entitys).subscribe(data => {
        debugger
        if (data != 0) {

        }
        this.chatconversation = "";
        this.image = 0;
        this.getPreviousChat();

      })
    }

  }

  public getPreviousChat() {
    this.docservice.GetPharmacy_ChatDetails(this.chatID).subscribe(res => {
      let Chatconversation = res;
      debugger
      this.coversationarray.length = 0;

      for (let i = 0; i < Chatconversation.length; i++) {

        if (Chatconversation[i].chatConversation.includes('[doc:-')) {

          var msg = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("[doc:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf(";")
          );
          var chattime = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 7 + 8
          );

          this.coversationarray.push({ user: 'doc', chatmsg: msg, time: chattime, msgtype: Chatconversation[i].messageType })
        }
        else if (Chatconversation[i].chatConversation.includes('[pat:-')) {

          var msg = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("[pat:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf(";")
          );
          var chattime = Chatconversation[i].chatConversation.substring(
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 6,
            Chatconversation[i].chatConversation.lastIndexOf("time:-") + 7 + 8
          );
          this.coversationarray.push({ user: 'pat', chatmsg: msg, time: chattime, msgtype: Chatconversation[i].messageType })
        }
        else {

          if (Chatconversation[i].sender == 'Patient') {
            this.coversationarray.push({ user: 'pat', chatmsg: Chatconversation[i].chatConversation, time: chattime, msgtype: Chatconversation[i].messageType })
          }
          if (Chatconversation[i].sender == 'Pharmacy') {
            this.coversationarray.push({ user: 'doc', chatmsg: Chatconversation[i].chatConversation, time: chattime, msgtype: Chatconversation[i].messageType })
          }
        }
      }

    })
  }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.getPreviousChat();
      // this.updateusertyping();
      // this.getusertyping();
      // var objDiv = document.getElementById("chatboxdiv");
      // objDiv.scrollTop = objDiv.scrollHeight;
    });
  }

  // public updateusertyping() {
  //   if (this.chatconversation.length > 0) {
  //     this.docservice.UpdateIsTyping(this.appointmentiddd, true).subscribe(res => {
  //       let tt = res;
  //     })
  //   }
  //   else {
  //     this.docservice.UpdateIsTyping(this.appointmentiddd, false).subscribe(res => {
  //       let tt = res;
  //     })
  //   }
  // }

  // public getusertyping() {
  //   this.docservice.getChat(this.pharmacyid, this.patientid).subscribe(res => {
  //     debugger;
  //     let isUserTyping = res.filter(x => x.appointmentID == this.appointmentiddd);
  //     this.istyping = isUserTyping[0].isTyping;
  //   })
  // }

  public onattachmentUpload(abcd) {
    debugger
    for (let i = 0; i < abcd.length; i++) {
      this.attachments.push(abcd[i]);
      this.uploadattachments();
    }

    Swal.fire('Added Successfully');
    abcd.length = 0;
  }

  public uploadattachments() {
    this.docservice.pharmacyphoto(this.attachments).subscribe(res => {
      debugger
      this.attachmentsurl.push(res);
      let a = this.attachmentsurl[0].slice(2);
      debugger
      let b = 'https://14.192.17.225' + a;
      this.imageurl = b;
      this.image = 1;
      this.attachments.length = 0;
      debugger
    })
    // this.sendattachment();
  }
}

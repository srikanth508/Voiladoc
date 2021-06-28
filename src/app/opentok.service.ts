import { Injectable } from '@angular/core';
import * as OT from '@opentok/client';
import config from './config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class OpentokService {
  session: OT.Session;
  token: string;
  archiveID;
  constructor(private http: HttpClient) { }
  getOT() {
    return OT;
  }

  initSession() {
   
    if (config.API_KEY && config.TOKEN && config.SESSION_ID) {
      
      this.session = this.getOT().initSession(config.API_KEY, config.SESSION_ID);
      
      this.token = config.TOKEN;
      return Promise.resolve(this.session);
    } else {
      return fetch(config.SAMPLE_SERVER_BASE_URL + '/session')
        .then((data) => data.json())
        .then((json) => {
          this.session = this.getOT().initSession(json.apiKey, json.sessionId);
          this.token = json.token;
          return this.session;
        });
    }
  }

  connect() {    
    return new Promise((resolve, reject) => {
      this.session.connect(this.token, (err) => {
        if (err) {
          
          Swal.fire("Failed to connect: ", err.message);
          if (err.name === "OT_NOT_CONNECTED") {
            
            alert("You are not connected to the internet. Check your network connection.");
          }
          reject(err);
        } else {
          
          resolve(this.session);
        }
      });
    });
  }

  disconnect_1(){
    return new Promise((resolve, reject) => {
      this.session.disconnect();
    });
  }


   startArchive(){
    
   
    let url = config.SAMPLE_SERVER_BASE_URL+'/archive/start';
    let data= JSON.stringify({ 'sessionId': this.session.sessionId });
    return this.http.post(url, data)

    
    // this.session.on('archiveStarted',(event)=>{
    //   this.archiveID = event.id;
    // })
   
   
  }

  stoparchive(archiveID){
    
    let url = config.SAMPLE_SERVER_BASE_URL+'/archive/'+archiveID+'/stop';
    return this.http.post(url, '')
    this.disconnect_1();

  }

  getsessionandtoken(){
    
    return this.http.get( config.Sessionurl+'?API_KEY='+config.API_KEY+'&API_SECRET='+config.SECRET)
  }

}

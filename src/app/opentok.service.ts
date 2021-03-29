import { Injectable } from '@angular/core';
import * as OT from '@opentok/client';
import config from './config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      debugger
      this.session = this.getOT().initSession(config.API_KEY, config.SESSION_ID);
      debugger
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
          debugger
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
    debugger
   debugger
    let url = config.SAMPLE_SERVER_BASE_URL+'/archive/start';
    let data= JSON.stringify({ 'sessionId': this.session.sessionId });
    return this.http.post(url, data)

    debugger
    // this.session.on('archiveStarted',(event)=>{
    //   this.archiveID = event.id;
    // })
   
   
  }

  stoparchive(archiveID){
    debugger
    let url = config.SAMPLE_SERVER_BASE_URL+'/archive/'+archiveID+'/stop';
    return this.http.post(url, '')
    this.disconnect_1();

  }

  getsessionandtoken(){
    debugger
    return this.http.get( config.Sessionurl+'?API_KEY='+config.API_KEY+'&API_SECRET='+config.SECRET)
  }

}

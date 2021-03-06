import { Injectable } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { ReplaySubject } from "rxjs";

import * as io from 'socket.io-client';


import { Session, Config, DisciplinePart, DSCMessage } from "./views/dsc/classes/session";

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DscApiService {

  private socket: io;

  private auth = {
    key: "",
  };

  // websocket connection status to dsc server
  private _connected: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  get connected() {
    return this._connected.asObservable();
  }

  // current dsc session, or null if not connected
  private currentSession: Session;
  private _session: ReplaySubject<Session> = new ReplaySubject<Session>();
  get session() {
    return this._session.asObservable();
  }
  
  private _config: ReplaySubject<Config> = new ReplaySubject<Config>();
  get config() {
    return this._config.asObservable();
  }
  
  private _status: ReplaySubject<boolean> = new ReplaySubject<boolean>();
  get status() {
    return this._status.asObservable();
  }
  
  private _message: ReplaySubject<DSCMessage> = new ReplaySubject<DSCMessage>();
  get message() {
    return this._message.asObservable();
  }

  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.auth.key = params.get("key");
    })
    
    this.socket = io(environment.serverURL(location));
    
    this.socket.on('connect', () => {
      console.log('on connect');
      this._connected.next(true);
    });
    
    this.socket.on('disconnect', () => {
      console.log('on disconnect');
      this._connected.next(false);
    });
    
    this.socket.on('setStatus', (status) => {
      console.log('setStatus', status);
      this._status.next(status);
    });
    
    
    this.socket.on('info', (info) => {
      this._message.next(info);
    });
    // this.socket.on('showMessage', (message) => {
    //   console.log('showMessage', message);
    // });
    // this.socket.on('hideMessage', () => {
    //   console.log('hideMessage');
    // });
    
    
    
    
    
    
    this.socket.on('setData', (session) => {
      this.currentSession = session;
      this._session.next(session);
      // console.log('setData', session);
    });
    
    this.socket.on('setConfig', (config) => {
      // console.log('setConfig', config);
      this._config.next(config);
    });
    
    
    
    // this.socket = new ReconnectingWebSocket(environment.serverURL);
    // // this.socket = new ReconnectingWebSocket("ws://" + location.host + "/socket/");
    // 
    // this.socket.onopen = () => {
    //   this._connected.next(true);
    //   window.status = "ready";
    // };
    // this.socket.onclose = () => {
    //   this._connected.next(false);
    //   this._session.next(null);
    // };
		// this.socket.onmessage = (event) => {
		// 	try {
		// 		let data = JSON.parse(event.data);
    //     if (data.type == "Config") {
    //       this._config.next(data.config);
		// 		}
		// 		if (data.type == "Session") {
    //       this._session.next(data.session);
    //       this.currentSession = data.session;
		// 		}
    // 
		// 		if (data.type == "Message") {
    //       console.log("set message", data)
		// 			// if (data.log != null) {
		// 			// 	this.logs.push(data.log);
		// 			// 	this.show_modal_message();
		// 			// }
		// 		}
		// 	}
		// 	catch (err) {
		// 		console.error(err)
		// 	}
		// }
  }


















  // Send given data to dsc server
  private send(data) {
    // this.socket.send(JSON.stringify(data));
  }
  

  

  setNewTarget() {
    this.socket.emit("newTarget", {
      auth: this.auth,
    });
  }
  setPart(partId, forceNewPart) {
    console.log(partId);
    this.socket.emit("setPart", {
      auth: this.auth,
      partId: partId,
    });
  }
  togglePart() {
    const session = this.currentSession;
    if (session == null) return;
    const partsOrder = session.disziplin.partsOrder;
    const activePart = session.sessionParts[session.sessionIndex];
    const currentIndex = partsOrder.indexOf(activePart.type)
    
    console.log(currentIndex)
    
    // Jump to the first disciplin part if we are at the end
    if (currentIndex + 1 >= partsOrder.length) {
      this.setPart(partsOrder[0], false);
    }
    // Jump to the nex disciplin part
    else {
      this.setPart(partsOrder[currentIndex+1], false);
    }
  }
  setSessionIndex(sessionIndex) {
    // this.socket.emit("setSessionIndex", {
    // 	auth: this.auth,
    // 	sessionIndex: sessionIndex,
    // });
  }
  setUser(user){
    // this.socket.emit("setUser", {
    // 	auth: this.auth,
    // 	user: user,
    // });
  }
  setDisciplin(disziplinID) {
    this.socket.emit("setDisziplin", {
      auth: this.auth,
      disziplin: disziplinID,
    });
  }
  print() {
    // default Normal
    // dateless Ohne Datum
    // bigImage Größere Scheibe
    this.socket.emit("print", {
      auth: this.auth,
      printTemplate: "default",
    });
  }
  loadData(data) {
    // this.socket.emit("loadData", {
    // 	auth: this.auth,
    // 	data: data,
    // });
  }
  getTempToken() {
    // this.socket.emit("getTempToken", {
    // 	auth: this.auth,
    // });
  }



  //
  // function new_target() {
  // 	send({
  // 		"type": "NewTarget"
  // 	});
  // }
  //
  // function set_disciplin() {
  // 	send({
  // 		"type": "SetDisciplin",
  // 		"name": "test"
  // 	});
  // }
  //
  // function send(element) {
  // 	socket.send(JSON.stringify(element));
  // }













}

import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { TokenStorageService } from './token-storage.service';
import { BehaviorSubject, observable } from 'rxjs';
import { StreamInfo } from '../_models/streamInfo';

@Injectable({
  providedIn: 'root',
})
export class LectureRoomService {
  private peer: Peer;
  private id: string;
  private socket: any;
  private callList;

  private localStream: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
  public localStream$ = this.localStream.asObservable();

  private remoteStream = new BehaviorSubject<StreamInfo>(null);
  public remoteStream$ = this.remoteStream.asObservable();

  private peerDisconnected = new BehaviorSubject<string>(null);
  public peerDisconnected$ = this.peerDisconnected.asObservable();

  constructor(private tokenStorageService: TokenStorageService) {}

  public initPeer(roomId: string): void {
    if (!this.peer || this.peer.disconnected) {
      try {
        this.socket = io('http://localhost:3000/');
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream) => {
            this.callList = {};
            this.localStream.next(stream);

            this.id = this.tokenStorageService.getUser().id;
            this.peer = new Peer(this.id, {
              host: '/',
              port: 3001,
            });

            this.peer.on('call', (call) => {
              call.answer(stream);
              //check if user is not already in the call
              //stream is called once for each track (audio + video)
              call.on('stream', (userMediaStream) => {
                if (!this.callList[call.peer]) {
                  this.remoteStream.next({
                    peerId: call.peer,
                    stream: userMediaStream,
                  });
                  this.callList[call.peer] = call;
                }
              });
            });

            this.socket.on('user-connected', (userId) => {
              this.connectToUser(userId, stream);
            });

            this.peer.on('open', (id) => {
              this.socket.emit('join-room', roomId, id);
            });

            this.socket.on('user-disconnected', (userId) => {
              //this.callList[userId].close();
              this.peerDisconnected.next(userId);
              delete this.callList[userId];
            });
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  connectToUser(userId: string, stream: MediaStream) {
    const call = this.peer.call(userId, stream);

    call.on('stream', (userMediaStream) => {
      //check if user is not already in the call
      //stream is called once for each track (audio + video)
      if (!this.callList[call.peer]) {
        this.remoteStream.next({ peerId: call.peer, stream: userMediaStream });
        this.callList[call.peer] = call;
      }
    });

    call.on('close', () => {
      console.log('call closed');
    });
  }

  disconnectPeer() {
    if (this.remoteStream.value && this.localStream.value) {
      this.remoteStream?.forEach((remoteStream) => {
        remoteStream.stream.getTracks().forEach((track) => {
          track.stop();
        });
      });
      this.localStream?.value.getTracks().forEach((track) => {
        track.stop();
      });
    }
    this.socket?.disconnect();
    this.peer?.disconnect();
    this.peer?.destroy();
    this.remoteStream.observers.forEach((observable) => observable.complete());
  }
}

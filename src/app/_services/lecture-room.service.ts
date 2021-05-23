import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import { TokenStorageService } from './token-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LectureRoomService {
  private peer: Peer;
  id: string;
  socket: any;
  peers: any = {};
  callList: any = [];

  private localStream: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
  public localStream$ = this.localStream.asObservable();

  private remoteStream = new BehaviorSubject<MediaStream>(null);
  public remoteStream$ = this.remoteStream.asObservable();

  constructor(private tokenStorageService: TokenStorageService) {
    this.socket = io('http://localhost:3000/');
  }

  public initPeer(roomId: string): void {
    if (!this.peer || this.peer.disconnected) {
      try {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream) => {
            this.localStream.next(stream);

            this.id = this.tokenStorageService.getUser().id;
            this.peer = new Peer(this.id, {
              host: '/',
              port: 3001,
            });
            this.peer.on('call', (call) => {
              call.answer(stream);
              //check if user is not already in the call
              call.on('stream', (userVideoStream) => {
                if (!this.callList[call.peer]) {
                  this.remoteStream.next(userVideoStream);
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
              if (this.peers[userId]) this.peers[userId].close();
            });
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  connectToUser(userId: string, stream: MediaStream) {
    const call = this.peer.call(userId, stream);

    call.on('stream', (userVideoStream) => {
      //check if user is not already in the call
      if (!this.callList[call.peer]) {
        this.remoteStream.next(userVideoStream);
        this.callList[call.peer] = call;
      }
    });

    call.on('close', () => {
      this.disconnectPeer();
    });
  }

  disconnectPeer() {
    this.peer.destroy();
    this.remoteStream?.value.getTracks().forEach((track) => {
      track.stop();
    });
    this.localStream?.value.getTracks().forEach((track) => {
      track.stop();
    });
    this.socket.disconnect();
    this.peer.destroy();
  }
}

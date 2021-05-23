import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Peer from 'peerjs';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CallService {
  private peer: Peer;
  private mediaCall: Peer.MediaConnection;
  private id: string;

  private localStream: BehaviorSubject<MediaStream> = new BehaviorSubject(null);
  public localStream$ = this.localStream.asObservable();

  private remoteStream: ReplaySubject<MediaStream> = new ReplaySubject();
  public remoteStream$ = this.remoteStream.asObservable();

  private peerDisconnected = new BehaviorSubject<string>(null);
  public peerDisconnected$ = this.peerDisconnected.asObservable();

  constructor(
    private snackBar: MatSnackBar,
    private tokenStorageService: TokenStorageService
  ) {}

  public initPeer(): void {
    if (!this.peer || this.peer.disconnected) {
      const peerJsOptions: Peer.PeerJSOption = {
        debug: 3,
        config: {
          iceServers: [
            {
              urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
              ],
            },
          ],
        },
      };
      try {
        this.id = this.tokenStorageService.getUser().id;
        this.peer = new Peer(this.id, peerJsOptions);
      } catch (error) {
        console.error(error);
      }
    }
  }

  public async establishMediaCall(remotePeerId: string) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const connection = this.peer.connect(remotePeerId);
      connection.on('error', (err) => {
        console.error(err);
        this.snackBar.open(err, 'Close');
      });

      this.mediaCall = this.peer.call(remotePeerId, stream);
      if (!this.mediaCall) {
        let errorMessage = 'Unable to connect to remote peer';
        this.snackBar.open(errorMessage, 'Close');
        throw new Error(errorMessage);
      }

      this.localStream.next(stream);
      this.mediaCall.on('stream', (remoteStream) => {
        this.remoteStream.next(remoteStream);
      });

      this.mediaCall.on('error', (err) => {
        this.snackBar.open(err, 'Close');
        console.error(err);
      });

      this.mediaCall.on('close', () => this.onCallClose());
    } catch (ex) {
      console.error(ex);
      this.snackBar.open(ex, 'Close');
    }
  }

  public async enableCallAnswer() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      this.localStream.next(stream);
      this.peer.on('call', async (call) => {
        this.mediaCall = call;

        this.mediaCall.answer(stream);
        this.mediaCall.on('stream', (remoteStream) => {
          this.remoteStream.next(remoteStream);
        });

        this.mediaCall.on('error', (err) => {
          this.snackBar.open(err, 'Close');
          console.error(err);
        });

        this.mediaCall.on('close', () => this.onCallClose());
      });
    } catch (ex) {
      console.error(ex);
      this.snackBar.open(ex, 'Close');
    }
  }

  private onCallClose() {
    this.remoteStream?.forEach((remoteStream) =>
      remoteStream?.getTracks().forEach((track) => {
        track.stop();
      })
    );
    this.localStream?.value.getTracks().forEach((track) => {
      track.stop();
    });
    this.snackBar.open('Call Ended', 'Close');
  }

  public closeMediaCall() {
    this.mediaCall?.close();
    if (!this.mediaCall) {
      this.onCallClose();
    }
  }

  public destroyPeer() {
    this.mediaCall?.close();
    this.peer?.disconnect();
    this.peer?.destroy();
  }
}

import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StreamSourceDirective } from '../stream-source.directive';
import { VideoStreamComponent } from '../video-stream/video-stream.component';
import { StreamInfo } from '../_models/streamInfo';
import { LectureRoomService } from '../_services/lecture-room.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent implements OnInit {
  @ViewChild(StreamSourceDirective, { static: true })
  streamSource!: StreamSourceDirective;
  private peers = {};
  private remoteStream: Subscription;
  private peerDisconnected: Subscription;
  private params: Subscription;
  public muted: boolean = false;
  public videoOff: boolean = false;

  constructor(
    public lectureRoomService: LectureRoomService,
    public router: Router,
    public route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.peers = [];
    this.params = this.route.params.subscribe((params) => {
      this.lectureRoomService.initPeer(params['id']);
    });
    this.remoteStream = this.lectureRoomService.remoteStream$.subscribe(
      (streamInfo) => {
        if (streamInfo) this.loadComponent(streamInfo);
      }
    );
    this.peerDisconnected = this.lectureRoomService.peerDisconnected$.subscribe(
      (peerId) => {
        this.removeComponent(peerId);
      }
    );
  }

  ngOnDestroy(): void {
    this.params.unsubscribe();
    this.remoteStream.unsubscribe();
    this.peerDisconnected.unsubscribe();
    this.lectureRoomService.disconnectPeer();
  }

  loadComponent(streamInfo: StreamInfo) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        VideoStreamComponent
      );

    const viewContainerRef = this.streamSource.viewContainerRef;

    const componentRef =
      viewContainerRef.createComponent<VideoStreamComponent>(componentFactory);
    componentRef.instance.streamInfo = streamInfo;
    this.peers[streamInfo.peerId] = componentRef;
  }

  toggleAudio(stream: MediaStream) {
    stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    this.muted = !this.muted;
  }

  toggleVideo(stream: MediaStream) {
    stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
    this.videoOff = !this.videoOff;
  }

  removeComponent(peerId: string) {
    if(this.peers[peerId])
      this.peers[peerId].destroy();
  }
}

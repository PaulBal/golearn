import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamSourceDirective } from '../stream-source.directive';
import { VideoStreamComponent } from '../video-stream/video-stream.component';
import { LectureRoomService } from '../_services/lecture-room.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss'],
})
export class CallComponent implements OnInit {
  @ViewChild(StreamSourceDirective, { static: true })
  streamSource!: StreamSourceDirective;

  constructor(
    public lectureRoomService: LectureRoomService,
    public router: Router,
    public route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.lectureRoomService.initPeer(params['id']);
    });
    this.lectureRoomService.remoteStream$.subscribe((streamInfo) => {
      this.loadComponent(streamInfo);
    });
  }

  ngOnDestroy(): void {
    this.lectureRoomService.disconnectPeer();
  }

  loadComponent(stream: MediaStream) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(
        VideoStreamComponent
      );

    const viewContainerRef = this.streamSource.viewContainerRef;

    const componentRef =
      viewContainerRef.createComponent<VideoStreamComponent>(componentFactory);
    componentRef.instance.stream = stream;
  }
}

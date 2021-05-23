import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss'],
})
export class VideoStreamComponent implements OnInit {
  stream: MediaStream;
  peerId: string;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { StreamInfo } from '../_models/streamInfo';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss'],
})
export class VideoStreamComponent implements OnInit {
  streamInfo: StreamInfo;

  constructor() {}

  ngOnInit(): void {}
}

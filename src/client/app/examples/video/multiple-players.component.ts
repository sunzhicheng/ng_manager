import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'sd-exam-videom',
    templateUrl: 'multiple-players.component.html',
  })

export class MultiplePlayersComponent implements OnInit {
    sources = [
        {
            src: 'http://static.videogular.com/assets/videos/videogular.mp4',
            type: 'video/mp4'
        },
        {
            src: 'http://static.videogular.com/assets/videos/videogular.ogg',
            type: 'video/ogg'
        },
        {
            src: 'http://static.videogular.com/assets/videos/videogular.webm',
            type: 'video/webm'
        }
    ];


    hlss = [
        // {
        //     src: 'http://43.243.128.213:5556/hls/2.m3u8?id=2&u=2&p=1f98423a1be44b143dba1e0692220d3b41a030a1'
        // },
        {
            src: 'http://43.243.128.213:5556/hls/3.m3u8?id=3&u=18912110324&p=79a54d2352578c9b7990f40e4fc6939aeae53315'
        },
        {
            src: 'http://43.243.128.213:5556/hls/4.m3u8?id=3&u=18912110324&p=79a54d2352578c9b7990f40e4fc6939aeae53315'
        },
        {
            src: 'http://43.243.128.213:5556/hls/3.m3u8?id=3&u=18912110324&p=79a54d2352578c9b7990f40e4fc6939aeae53315'
        }
    ];

    // tslint:disable-next-line:no-empty
    constructor() {
    }

    // tslint:disable-next-line:no-empty
    ngOnInit() {
    }

}

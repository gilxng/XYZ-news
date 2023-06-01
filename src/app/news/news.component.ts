import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  DomSanitizer,
  SafeResourceUrl,
  Title,
} from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as FullStory from '@fullstory/browser';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit, OnDestroy {
  news = [
    {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
      id: 1,
    },
    {
      url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      title: 'PSY - GANGNAM STYLE(강남스타일) M/V',
      id: 2,
    },
    {
      url: 'https://www.youtube.com/watch?v=CevxZvSJLk8',
      title: 'Ed Sheeran - Shape of You [Official Video]',
      id: 3,
    },
  ];

  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;
  public id: string;
  public interval: any;

  public newsItem: (typeof this.news)[0] = {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
    id: 1,
  };
  public embed: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer, private titleService: Title) {
    this.id = window.location.href.split('/').pop()!;
    this.newsItem =
      this.news.find((item) => item.id === +this.id) || this.news[0];

    this.embed = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.newsItem.url
        .split('v=')
        .pop()!}?enablejsapi=1&origin=${window.location.origin}`
    );
    this.titleService.setTitle(this.newsItem.title + ' | XYZ News');
    this.reframed = false;
    this.news = [
      {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
        id: 1,
      },
      {
        url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        title: 'PSY - GANGNAM STYLE(강남스타일) M/V',
        id: 2,
      },
      {
        url: 'https://www.youtube.com/watch?v=CevxZvSJLk8',
        title: 'Katy Perry - Roar',
        id: 3,
      },
    ];
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      // @ts-ignore
      if (!window['YT']) return;
      this.reframed = false;
      // @ts-ignore
      this.YT = window['YT'];
      // @ts-ignore
      this.player = new window['YT'].Player(this.id, {
        videoId: this.newsItem.url.split('v=').pop()!,
        playerVars: { autoplay: 1, playsinline: 1 },
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
        },
      });
      console.log(this.player);
      clearInterval(this.interval);
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    if (!this.player) return;
    FullStory.event('Video Stopped', {
      videoTitle: this.newsItem.title,
      path: `/news/${this.id}`,
      pageTitle: window.document.title,
      playTime: Math.ceil(this.player.getCurrentTime()),
    });
    console.log('Video Stopped', {
      videoTitle: this.newsItem.title,
      path: `/news/${this.id}`,
      pageTitle: window.document.title,
      playTime: Math.ceil(this.player.getCurrentTime()),
    });
    this.player.destroy();
  }

  onPlayerReady(event: any) {
    // console.log(event);
  }

  onPlayerStateChange(event: any) {
    if (event.data == 1) {
      FullStory.event('Video Started', {
        videoTitle: event.target.getVideoData().title,
        path: `/news/${this.id}`,
        pageTitle: window.document.title,
        playTime: Math.ceil(event.target.getCurrentTime()),
      });
      console.log('Video Started', {
        videoTitle: event.target.getVideoData().title,
        path: `/news/${this.id}`,
        pageTitle: window.document.title,
        playTime: Math.ceil(event.target.getCurrentTime()),
      });
    }

    if(event.data === 0) {
      FullStory.event('Video Watched', {
        videoTitle: event.target.getVideoData().title,
        path: `/news/${this.id}`,
        pageTitle: window.document.title,
        playTime: Math.ceil(event.target.getCurrentTime()),
      });
      console.log('Video Watched', {
        videoTitle: event.target.getVideoData().title,
        path: `/news/${this.id}`,
        pageTitle: window.document.title,
        playTime: Math.ceil(event.target.getCurrentTime()),
      });
    }
  }
}

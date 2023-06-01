import { Component } from '@angular/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
})
export class NewsListComponent {
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
      title: 'Katy Perry - Roar',
      id: 3,
    },
  ];
}

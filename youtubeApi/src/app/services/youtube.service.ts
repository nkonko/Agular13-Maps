import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { YtResponse } from '../models/youtube.models';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
 
 private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
 private apiKey = 'AIzaSyCEvzZx9zbI94GSVr4QGWWRWvIQwkNriVY';
 private playList = 'UUFCsnU1m_b1t93Oz9Weawng';
 private nextPageToken = '';

  constructor(private http: HttpClient) { }
  
  public getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;
    
    const params = new HttpParams()
    .set('part', 'snippet')
    .set('key', this.apiKey)
    .set('playlistId', this.playList)
    .set('maxResults', '10')
    .set('pageToken', this.nextPageToken)
    
    return this.http.get<YtResponse>(url,{params: params}).pipe(
      map(resp =>{
        this.nextPageToken = resp.nextPageToken;
      return resp.items;
      }),
      map(items =>{
        return items.map(video => video.snippet);
      })
    );
  }

}
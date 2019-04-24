import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss'],
})
export class XmlComponent implements OnInit {
  response;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  request() {
    this.http
      .get('/assets/posts.xml', { responseType: 'text' })
      .pipe(map(res => JSON.parse(res)))
      .subscribe(res => (this.response = res));
  }
}

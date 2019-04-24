import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-xml-view',
  templateUrl: './xml-view.component.html',
  styleUrls: ['./xml-view.component.scss'],
})
export class XmlViewComponent implements OnInit {
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

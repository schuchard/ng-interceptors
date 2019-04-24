import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ScopesService } from './scopes.service';

@Component({
  selector: 'app-scopes',
  templateUrl: './scopes.component.html',
  styleUrls: ['./scopes.component.scss'],
})
export class ScopesComponent implements OnInit {
  response;
  constructor(private http: HttpClient, public scopes: ScopesService) {}

  ngOnInit() {}

  request() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users/1')
      .subscribe(res => (this.response = res));
  }
}

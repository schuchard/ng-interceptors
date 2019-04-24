import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private LOGS = new BehaviorSubject([]);

  get logs$() {
    return this.LOGS.asObservable();
  }

  constructor() {}

  add(msg: any) {
    this.LOGS.next(this.LOGS.getValue().concat([msg]));
  }

  reset() {
    this.LOGS.next([]);
  }
}

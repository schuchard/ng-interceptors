import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CacheViewComponent } from './cache-view.component';

describe('CacheViewComponent', () => {
  let component: CacheViewComponent;
  let fixture: ComponentFixture<CacheViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CacheViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CacheViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

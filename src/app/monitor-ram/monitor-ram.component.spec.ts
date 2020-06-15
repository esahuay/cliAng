import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorRamComponent } from './monitor-ram.component';

describe('MonitorRamComponent', () => {
  let component: MonitorRamComponent;
  let fixture: ComponentFixture<MonitorRamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorRamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

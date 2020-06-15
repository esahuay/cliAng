import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorCpuComponent } from './monitor-cpu.component';

describe('MonitorCpuComponent', () => {
  let component: MonitorCpuComponent;
  let fixture: ComponentFixture<MonitorCpuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorCpuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorCpuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

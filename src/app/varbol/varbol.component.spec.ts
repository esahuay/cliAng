import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VarbolComponent } from './varbol.component';

describe('VarbolComponent', () => {
  let component: VarbolComponent;
  let fixture: ComponentFixture<VarbolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VarbolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VarbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

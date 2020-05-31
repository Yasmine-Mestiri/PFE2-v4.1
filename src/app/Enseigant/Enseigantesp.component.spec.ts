import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseigantespComponent } from './Enseigantesp.component';

describe('EnseigantespComponent', () => {
  let component: EnseigantespComponent;
  let fixture: ComponentFixture<EnseigantespComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnseigantespComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnseigantespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

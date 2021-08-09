import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParrillaComponent } from './parrilla.component';

describe('ParrillaComponent', () => {
  let component: ParrillaComponent;
  let fixture: ComponentFixture<ParrillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParrillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParrillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

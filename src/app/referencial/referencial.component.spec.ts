import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencialComponent } from './referencial.component';

describe('ReferencialComponent', () => {
  let component: ReferencialComponent;
  let fixture: ComponentFixture<ReferencialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferencialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferencialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

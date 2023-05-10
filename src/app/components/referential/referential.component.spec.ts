import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentialComponent } from './referential.component';

describe('ReferencialComponent', () => {
  let component: ReferentialComponent;
  let fixture: ComponentFixture<ReferentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferentialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

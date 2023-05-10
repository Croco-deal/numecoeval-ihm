import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentialListComponent } from './referential-list.component';

describe('ReferencailListComponent', () => {
  let component: ReferentialListComponent;
  let fixture: ComponentFixture<ReferentialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferentialListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferentialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

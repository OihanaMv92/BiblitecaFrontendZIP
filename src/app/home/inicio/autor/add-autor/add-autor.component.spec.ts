import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutorComponent } from './add-autor.component';

describe('AddAutorComponent', () => {
  let component: AddAutorComponent;
  let fixture: ComponentFixture<AddAutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAutorComponent]
    });
    fixture = TestBed.createComponent(AddAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

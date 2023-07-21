import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLibroComponent } from './add-libro.component';

describe('AddLibroComponent', () => {
  let component: AddLibroComponent;
  let fixture: ComponentFixture<AddLibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLibroComponent]
    });
    fixture = TestBed.createComponent(AddLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

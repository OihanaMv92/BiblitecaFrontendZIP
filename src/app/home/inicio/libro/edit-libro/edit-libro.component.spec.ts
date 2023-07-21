import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLibroComponent } from './edit-libro.component';

describe('EditLibroComponent', () => {
  let component: EditLibroComponent;
  let fixture: ComponentFixture<EditLibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLibroComponent]
    });
    fixture = TestBed.createComponent(EditLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

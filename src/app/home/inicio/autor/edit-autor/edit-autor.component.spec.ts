import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAutorComponent } from './edit-autor.component';

describe('EditAutorComponent', () => {
  let component: EditAutorComponent;
  let fixture: ComponentFixture<EditAutorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAutorComponent]
    });
    fixture = TestBed.createComponent(EditAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

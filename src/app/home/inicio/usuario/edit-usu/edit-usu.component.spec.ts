import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsuComponent } from './edit-usu.component';

describe('EditUsuComponent', () => {
  let component: EditUsuComponent;
  let fixture: ComponentFixture<EditUsuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditUsuComponent]
    });
    fixture = TestBed.createComponent(EditUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

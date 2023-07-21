import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsuComponent } from './add-usu.component';

describe('AddUsuComponent', () => {
  let component: AddUsuComponent;
  let fixture: ComponentFixture<AddUsuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUsuComponent]
    });
    fixture = TestBed.createComponent(AddUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerieComponent } from './messengerie.component';

describe('MessengerieComponent', () => {
  let component: MessengerieComponent;
  let fixture: ComponentFixture<MessengerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessengerieComponent]
    });
    fixture = TestBed.createComponent(MessengerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

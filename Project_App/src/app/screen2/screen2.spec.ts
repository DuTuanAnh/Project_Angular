import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen2 } from './screen2';

describe('Screen2', () => {
  let component: Screen2;
  let fixture: ComponentFixture<Screen2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Screen2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Screen2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

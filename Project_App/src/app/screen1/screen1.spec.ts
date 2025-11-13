import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Screen1 } from './screen1';

describe('Screen1', () => {
  let component: Screen1;
  let fixture: ComponentFixture<Screen1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Screen1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Screen1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

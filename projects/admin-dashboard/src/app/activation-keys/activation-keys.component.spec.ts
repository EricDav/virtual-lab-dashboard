import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationKeysComponent } from './activation-keys.component';

describe('ActivationKeysComponent', () => {
  let component: ActivationKeysComponent;
  let fixture: ComponentFixture<ActivationKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFinishComponent } from './auth-finish.component';

describe('AuthFinishComponent', () => {
  let component: AuthFinishComponent;
  let fixture: ComponentFixture<AuthFinishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthFinishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

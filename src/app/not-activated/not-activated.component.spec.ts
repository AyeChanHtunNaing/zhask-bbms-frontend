import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotActivatedComponent } from './not-activated.component';

describe('NotActivatedComponent', () => {
  let component: NotActivatedComponent;
  let fixture: ComponentFixture<NotActivatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotActivatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotActivatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

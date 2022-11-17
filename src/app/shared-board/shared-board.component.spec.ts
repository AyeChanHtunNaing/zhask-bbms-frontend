import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedBoardComponent } from './shared-board.component';

describe('SharedBoardComponent', () => {
  let component: SharedBoardComponent;
  let fixture: ComponentFixture<SharedBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

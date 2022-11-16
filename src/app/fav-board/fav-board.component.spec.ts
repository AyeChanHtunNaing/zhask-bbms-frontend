import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavBoardComponent } from './fav-board.component';

describe('FavBoardComponent', () => {
  let component: FavBoardComponent;
  let fixture: ComponentFixture<FavBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

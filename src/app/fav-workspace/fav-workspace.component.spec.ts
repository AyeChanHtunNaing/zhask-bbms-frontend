import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavWorkspaceComponent } from './fav-workspace.component';

describe('FavWorkspaceComponent', () => {
  let component: FavWorkspaceComponent;
  let fixture: ComponentFixture<FavWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavWorkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

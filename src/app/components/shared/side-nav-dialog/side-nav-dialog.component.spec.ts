import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavDialogComponent } from './side-nav-dialog.component';

describe('SideNavDialogComponent', () => {
  let component: SideNavDialogComponent;
  let fixture: ComponentFixture<SideNavDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

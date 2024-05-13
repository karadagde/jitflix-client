import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoCallHomeComponent } from './video-call-home.component';

describe('VideoCallHomeComponent', () => {
  let component: VideoCallHomeComponent;
  let fixture: ComponentFixture<VideoCallHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCallHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCallHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

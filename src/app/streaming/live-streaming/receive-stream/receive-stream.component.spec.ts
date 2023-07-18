import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceiveStreamComponent } from './receive-stream.component';

describe('ReceiveStreamComponent', () => {
  let component: ReceiveStreamComponent;
  let fixture: ComponentFixture<ReceiveStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiveStreamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

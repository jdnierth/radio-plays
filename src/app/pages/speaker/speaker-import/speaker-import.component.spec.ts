import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerImportComponent } from './speaker-import.component';

describe('SpeakerImportComponent', () => {
  let component: SpeakerImportComponent;
  let fixture: ComponentFixture<SpeakerImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeakerImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

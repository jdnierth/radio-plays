import { TestBed } from '@angular/core/testing';

import { SpeakerResolverService } from './speaker-resolver.service';

describe('SpeakerResolverService', () => {
  let service: SpeakerResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeakerResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MessageChannelService } from './message-channel.service';

describe('MessageChannelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageChannelService = TestBed.get(MessageChannelService);
    expect(service).toBeTruthy();
  });
});

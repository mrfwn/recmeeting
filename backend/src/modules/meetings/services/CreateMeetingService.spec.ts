import AppError from '@shared/errors/AppError';
import FakeMeetingsRepository from '../repositories/fakes/FakeMeetingsRepository';
import CreateMeetingService from './CreateMeetingService';

let fakeMeetingsRepository: FakeMeetingsRepository;

let createMeeting: CreateMeetingService;
describe('CreateMeeting', () => {
  beforeEach(() => {
    fakeMeetingsRepository = new FakeMeetingsRepository();
    createMeeting = new CreateMeetingService(
      fakeMeetingsRepository,
    );
  });

  it('should be able to create a new meeting', async () => {
    const meeting = await createMeeting.execute({
      user_id: 'user-id',
      title: 'title',
      transcription: 'transcription',
      type: 'type',
      date: new Date(),
    });

    expect(meeting).toHaveProperty('id');
    expect(meeting.title).toBe('title');
  });

  it('should not be able to create two meetings on the same title', async () => {
    await createMeeting.execute({
      user_id: 'user-id',
      title: 'title',
      transcription: 'transcription',
      type: 'type',
      date: new Date(),
    });

    await expect(
      createMeeting.execute({
        user_id: 'user-id',
        title: 'title',
        transcription: 'transcription',
        type: 'type',
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

/*
import AppError from '@shared/errors/AppError';
import FakeMeetingsRepository from '../repositories/fakes/FakeMeetingsRepository';
import CreateMeetingService from './CreateMeetingService';
import DeleteMeetingService from './DeleteMeetingService';

let fakeMeetingsRepository: FakeMeetingsRepository;

let createMeeting: CreateMeetingService;

let deleteMeeting: DeleteMeetingService;
describe('DeleteMeeting', () => {
  beforeEach(() => {
    fakeMeetingsRepository = new FakeMeetingsRepository();
    createMeeting = new CreateMeetingService(
      fakeMeetingsRepository,
    );

    deleteMeeting = new DeleteMeetingService(
      fakeMeetingsRepository,
    );
  });

  it('should be able to delete a meeting', async () => {
    const meeting1 = await createMeeting.execute({
      user_id: 'user-id',
      title: 'title1',
      transcription: 'transcription1',
      date: new Date(),
    });

    const meeting2 = await createMeeting.execute({
      user_id: 'user-id',
      title: 'title2',
      transcription: 'transcription2',
      date: new Date(),
    });

    await deleteMeeting.execute({ user_id: meeting2.user_id, meeting_id: meeting2.id })

    const meetings = await listMeetings.execute({
      user_id: 'user-id',
    });

    expect(meeting).toHaveProperty('id');
    expect(meeting.title).toBe('title');
  });

  it('should not be able to create two meetings on the same title', async () => {
    await createMeeting.execute({
      user_id: 'user-id',
      title: 'title',
      transcription: 'transcription',
      date: new Date(),
    });

    await expect(
      createMeeting.execute({
        user_id: 'user-id',
        title: 'title',
        transcription: 'transcription',
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
*/

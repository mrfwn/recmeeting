import FakeMeetingsRepository from '../repositories/fakes/FakeMeetingsRepository';
import ListMeetingService from './ListMeetingService';

let fakeMeetingsRepository: FakeMeetingsRepository;
let listMeetings: ListMeetingService;

describe('ListMeetings', () => {
  beforeEach(() => {
    fakeMeetingsRepository = new FakeMeetingsRepository();
    listMeetings = new ListMeetingService(
      fakeMeetingsRepository,
    );
  });
  it('should be able to list the meetings', async () => {
    const meeting1 = await fakeMeetingsRepository.create({
      user_id: 'user-id',
      title: 'title-1',
      transcription: 'transcription-1',
      date: new Date(),
    });

    const meeting2 = await fakeMeetingsRepository.create({
      user_id: 'user-id',
      title: 'title-2',
      transcription: 'transcription-2',
      date: new Date(),
    });

    await fakeMeetingsRepository.create({
      user_id: 'user-id-2',
      title: 'title-3',
      transcription: 'transcription-3',
      date: new Date(),
    });

    const meetings = await listMeetings.execute({
      user_id: 'user-id',
    });

    expect(meetings).toEqual([meeting1, meeting2]);
  });
});

import { getRepository, Repository, Like } from 'typeorm';
import IMeetingsRepository from '@modules/meetings/repositories/IMeetingsRepository';
import ICreateMeetingDTO from '@modules/meetings/dtos/ICreateMeetingDTO';
import Meeting from '../entities/Meeting';

class MeetingsRepository implements IMeetingsRepository {
  private ormRepository: Repository<Meeting>;

  constructor() {
    this.ormRepository = getRepository(Meeting);
  }

  public async findById(meeting_id: string): Promise<Meeting | undefined> {
    const meeting = await this.ormRepository.findOne(meeting_id);
    return meeting;
  }

  public async findOneByTitle(title: string, user_id: string): Promise<Meeting | undefined> {
    const meetings = await this.ormRepository.findOne({
      where: {
        user_id,
        title,
      },
    });

    return meetings;
  }

  public async findByTitle(title: string, user_id: string): Promise<Meeting[]> {
    const meetings = await this.ormRepository.find({
      where: {
        user_id,
        title: Like(`%${title}%`),
      },
    });

    return meetings;
  }

  public async findAllMeeting(user_id: string): Promise<Meeting[]> {
    const meetings = await this.ormRepository.find({
      where: { user_id },
    });

    return meetings;
  }

  public async create({
    user_id,
    title,
    transcription,
    type,
    date,
  }: ICreateMeetingDTO): Promise<Meeting> {
    const meeting = this.ormRepository.create({
      user_id,
      title,
      transcription,
      type,
      date,
    });

    await this.ormRepository.save(meeting);

    return meeting;
  }

  public async save(data: Meeting): Promise<Meeting> {
    return this.ormRepository.save(data);
  }

  public async delete(meeting_id: string): Promise<void> {
    await this.ormRepository.delete(meeting_id);
  }
}

export default MeetingsRepository;

import Meeting from '../infra/typeorm/entities/Meeting';
import ICreateMeetingDTO from '../dtos/ICreateMeetingDTO';

export default interface IMeetingsRepository {
  create({
    user_id,
    title,
    transcription,
    date,
  }: ICreateMeetingDTO): Promise<Meeting>;
  findById(meeting_id: string): Promise<Meeting | undefined>;
  findAllMeeting(user_id: string): Promise<Meeting[]>;
  findOneByTitle(title: string, user_id: string): Promise<Meeting | undefined>;
  findByTitle(title: string, user_id: string): Promise<Meeting[]>;
  save(meeting: Meeting): Promise<Meeting>;
  delete(meeting_id: string): Promise<void>;
}

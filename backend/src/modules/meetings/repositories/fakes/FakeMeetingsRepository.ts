import { uuid } from 'uuidv4';

import IMeetingsRepository from '@modules/meetings/repositories/IMeetingsRepository';
import ICreateMeetingDTO from '@modules/meetings/dtos/ICreateMeetingDTO';
import Meeting from '@modules/meetings/infra/typeorm/entities/Meeting';

class MeetingsRepository implements IMeetingsRepository {
  private meetings: Meeting[] = [];

  public async findById(meeting_id: string): Promise<Meeting | undefined> {

    const meeting = this.meetings.find( meeting => meeting.id === meeting_id);

    return meeting;
  }

  public async findOneByTitle(title: string, user_id: string): Promise<Meeting | undefined> {
    const meetings = this.meetings.find(
      meeting =>
        meeting.title === title &&
        meeting.user_id === user_id,
    );

    return meetings;
  }

  public async findByTitle(title: string, user_id: string): Promise<Meeting[]> {
    const meetings = this.meetings.filter(
      meeting =>
        meeting.title.indexOf(title) != -1 &&
        meeting.user_id === user_id,
    );

    return meetings;
  }

  public async findAllMeeting(user_id: string): Promise<Meeting[]> {
    const meetings = this.meetings.filter(
      meeting => meeting.user_id === user_id
    );

    return meetings;
  }

  public async create({
    user_id,
    title,
    transcription,
    type,
    date,
  }: ICreateMeetingDTO): Promise<Meeting> {
    const meeting = new Meeting();
    Object.assign(meeting, { id: uuid(), user_id, title,transcription,type, date });

    this.meetings.push(meeting);

    return meeting;
  }

  public async save(meeting: Meeting): Promise<Meeting> {
    const findIndex = this.meetings.findIndex(findMeeting => findMeeting.id === meeting.id);

    this.meetings[findIndex] = meeting;

    return meeting;
  }

  public async delete(meeting_id: string): Promise<void> {
    const findIndex = this.meetings.findIndex(findMeeting => findMeeting.id === meeting_id);

    this.meetings.splice(findIndex, 1);

  }
}

export default MeetingsRepository;

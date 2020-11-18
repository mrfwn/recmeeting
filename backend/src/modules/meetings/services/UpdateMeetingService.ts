import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMeetingsRepository from '../repositories/IMeetingsRepository';

import Meeting from '../infra/typeorm/entities/Meeting';

interface IRequest {
  user_id: string;
  meeting_id: string;
  title: string;
  transcription: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('MeetingsRepository')
    private meetingsRepository: IMeetingsRepository,
  ) {}

  public async execute({
    user_id,
    meeting_id,
    title,
    transcription
  }: IRequest): Promise<Meeting> {
    const meeting = await this.meetingsRepository.findById(meeting_id);

    if (!meeting) {
      throw new AppError('Meeting not found');
    }

    if (meeting.user_id !== user_id){
      throw new AppError('This user is not allowed to change this meeting');
    }

    if(title){
      const meetingCheckTitle = await this.meetingsRepository.findOneByTitle(title, user_id)

      if (meetingCheckTitle && meetingCheckTitle.id !== meeting_id) {
        throw new AppError('This title is already in use');
      }
      meeting.title = title;
    }


    if(transcription) meeting.transcription = transcription

    return  this.meetingsRepository.save(meeting);
  }
}

export default UpdateProfileService;

import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Meeting from '../infra/typeorm/entities/Meeting';
import IMeetingsRepository from '../repositories/IMeetingsRepository';

interface IRequest {
  user_id: string;
  title: string;
  transcription: string;
  type: string;
  date: Date;
}

@injectable()
class CreateMeetingService {
  constructor(
    @inject('MeetingsRepository')
    private meetingsRepository: IMeetingsRepository,
  ) {}

  public async execute({
    user_id,
    title,
    transcription,
    type,
    date
  }: IRequest): Promise<Meeting> {


    const findMeetingWithTheSameTitle = await this.meetingsRepository.findOneByTitle(
      title,
      user_id,
    );
    if (findMeetingWithTheSameTitle) {
      throw new AppError('This title is already in use');
    }

    const meeting = await this.meetingsRepository.create({
      user_id,
      title,
      transcription,
      type,
      date
    });

    return meeting;
  }
}

export default CreateMeetingService;

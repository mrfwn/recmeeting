import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMeetingsRepository from '../repositories/IMeetingsRepository';

import Meeting from '../infra/typeorm/entities/Meeting';

interface IRequest {
  user_id: string;
  meeting_id: string;
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
  }: IRequest): Promise<void> {
    const meeting = await this.meetingsRepository.findById(meeting_id);

    if (!meeting) {
      throw new AppError('Meeting not found');
    }

    if (meeting.user_id !== user_id){
      throw new AppError('This user is not allowed to change this meeting');
    }

    this.meetingsRepository.delete(meeting_id);
  }
}

export default UpdateProfileService;

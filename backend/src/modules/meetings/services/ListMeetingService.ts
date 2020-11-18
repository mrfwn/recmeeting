import { injectable, inject } from 'tsyringe';
import IMeetingsRepository from '../repositories/IMeetingsRepository';
import Meeting from '../infra/typeorm/entities/Meeting';

interface IRequest {
  user_id: string;
}

@injectable()
class ListMeetingService {
  constructor(
    @inject('MeetingsRepository')
    private meetingsRepository: IMeetingsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Meeting[]> {
    const meetings = await this.meetingsRepository.findAllMeeting(user_id);

    return meetings;
  }
}

export default ListMeetingService;

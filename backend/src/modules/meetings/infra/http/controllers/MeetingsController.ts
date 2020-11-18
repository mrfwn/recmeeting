import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import ListMeetingService from '@modules/meetings/services/ListMeetingService';
import CreateMeetingService from '@modules/meetings/services/CreateMeetingService';
import UpdateMeetingService from '@modules/meetings/services/UpdateMeetingService';
import DeleteMeetingService from '@modules/meetings/services/DeleteMeetingService';

export default class MeetingsController {

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listMeeting = container.resolve(ListMeetingService);

    const meetings = await listMeeting.execute({
      user_id,
    });
    return response.json(classToClass(meetings));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { title,transcription, date } = request.body;

    const createMeeting = container.resolve(CreateMeetingService);

    const meeting = await createMeeting.execute({
      date,
      user_id,
      title,
      transcription
    });
    return response.json(classToClass(meeting));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { title, transcription, meeting_id } = request.body;
    const updateMeeting = container.resolve(UpdateMeetingService);

    const meeting = await updateMeeting.execute({
      user_id,
      meeting_id,
      title,
      transcription
    });

    return response.json(classToClass(meeting));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { meeting_id } = request.params;
    const deleteMeeting = container.resolve(DeleteMeetingService);

    await deleteMeeting.execute({
      user_id,
      meeting_id
    });

    return response.json().status(400);
  }

}

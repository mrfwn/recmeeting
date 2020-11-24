import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import MeetingsController from '../controllers/MeetingsController';

const meetingsRouter = Router();
const meetingsController = new MeetingsController();

meetingsRouter.use(ensureAuthenticated);

meetingsRouter.get('/', meetingsController.index);

meetingsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      transcription: Joi.string().required(),
      title: Joi.string().required(),
      type: Joi.string().required(),
      date: Joi.date().required(),
    },
  }),
  meetingsController.create,
);

meetingsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      meeting_id: Joi.string().required(),
      title: Joi.string(),
      transcription: Joi.string(),
      type: Joi.string(),
    },
  }),
  meetingsController.update,
);

meetingsRouter.delete('/:meeting_id', meetingsController.delete );

export default meetingsRouter;

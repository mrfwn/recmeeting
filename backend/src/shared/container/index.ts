import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IMeetingsRepository from '@modules/meetings/repositories/IMeetingsRepository';
import MeetingsRepository from '@modules/meetings/infra/typeorm/repositories/MeetingsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IMeetingsRepository>(
  'MeetingsRepository',
  MeetingsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

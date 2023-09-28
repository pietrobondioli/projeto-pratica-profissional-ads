import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { TYPEORM_DATA_SOURCE } from '#/be/config/database/database.providers';

import { MediaModule } from '../media/media.module';

import { CreateEquipmentCommand } from './commands/create-equipment/create-equipment.command';
import { CreateEquipmentHttpController } from './commands/create-equipment/create-equipment.http.controller';
import { UpdateEquipmentHttpController } from './commands/update-equipment/update-equipment.http.controller';
import { UpdateEquipmentCommandHandler } from './commands/update-equipment/update-equipment.service';
import { EquipmentModel } from './db/equipment.model';
import { EQUIPMENT_REPO } from './equipment.di-tokens';
import { GetEquipmentHttpController } from './queries/get-equipment/get-equipment.http.controller';
import { GetEquipmentQueryHandler } from './queries/get-equipment/get-equipment.service';
import { ListEquipmentsHttpController } from './queries/list-equipments/list-equipments.http.controller';
import { ListEquipmentsQueryHandler } from './queries/list-equipments/list-equipments.service';

const commandHandlers: Provider[] = [
  CreateEquipmentCommand,
  UpdateEquipmentCommandHandler,
];

const queryHandlers: Provider[] = [
  GetEquipmentQueryHandler,
  ListEquipmentsQueryHandler,
];

const mappers: Provider[] = [];

const repositories: Provider[] = [
  {
    provide: EQUIPMENT_REPO,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EquipmentModel),
    inject: [TYPEORM_DATA_SOURCE],
  },
];

@Module({
  imports: [CqrsModule, MediaModule],
  controllers: [
    CreateEquipmentHttpController,
    UpdateEquipmentHttpController,
    GetEquipmentHttpController,
    ListEquipmentsHttpController,
  ],
  providers: [
    Logger,
    ...repositories,
    ...commandHandlers,
    ...queryHandlers,
    ...mappers,
  ],
  exports: [...repositories],
})
export class EquipmentModule {}

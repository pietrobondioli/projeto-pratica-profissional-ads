import { Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { TYPEORM_DATA_SOURCE } from '#/be/config/database/database.providers';

import { MediaModule } from '../media/media.module';

import { UserModule } from '../user/user.module';
import { CreateEquipmentHttpController } from './commands/create-equipment/create-equipment.http.controller';
import { CreateEquipmentCommandHandler } from './commands/create-equipment/create-equipment.service';
import { UpdateEquipmentHttpController } from './commands/update-equipment/update-equipment.http.controller';
import { UpdateEquipmentCommandHandler } from './commands/update-equipment/update-equipment.service';
import { EquipmentModel } from './db/equipment.model';
import { EQUIPMENT_REPO } from './equipment.di-tokens';
import { GetEquipmentAvailabilityHttpController } from './queries/get-equipment-avaiability/get-equipment-avaiability.http.controller';
import { GetEquipmentAvailabilityAvailabilityQueryHandler } from './queries/get-equipment-avaiability/get-equipment-avaiability.service';
import { GetEquipmentHttpController } from './queries/get-equipment/get-equipment.http.controller';
import { GetEquipmentQueryHandler } from './queries/get-equipment/get-equipment.service';
import { ListEquipmentsHttpController } from './queries/list-equipments/list-equipments.http.controller';
import { ListEquipmentsQueryHandler } from './queries/list-equipments/list-equipments.service';

const commandHandlers: Provider[] = [
  CreateEquipmentCommandHandler,
  UpdateEquipmentCommandHandler,
];

const queryHandlers: Provider[] = [
  GetEquipmentQueryHandler,
  ListEquipmentsQueryHandler,
  GetEquipmentAvailabilityAvailabilityQueryHandler,
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
  imports: [CqrsModule, MediaModule, UserModule],
  controllers: [
    CreateEquipmentHttpController,
    UpdateEquipmentHttpController,
    GetEquipmentHttpController,
    ListEquipmentsHttpController,
    GetEquipmentAvailabilityHttpController,
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

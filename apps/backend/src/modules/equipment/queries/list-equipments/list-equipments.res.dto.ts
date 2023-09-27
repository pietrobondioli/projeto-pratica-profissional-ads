import { PaginatedResponseDto } from '#/be/lib/api/paginated.response.base';
import { ResponseBase } from '#/be/lib/api/response.dto.base';

class EquipmentResDto extends ResponseBase {}

export class ListEquipmentResDto extends PaginatedResponseDto<EquipmentResDto> {}

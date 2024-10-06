import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { CreateTicketDto } from './create-ticket.dto';

export class UpdateTicketDto extends PartialType(
  OmitType(CreateTicketDto, [
    'ticketId',
    'eventId',
    'type',
    'metadataUrl',
  ] as const),
) {
  @ApiPropertyOptional()
  isUsed: boolean;
}

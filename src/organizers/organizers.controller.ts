import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrganizersService } from './organizers.service';

@ApiTags('organizers')
@ApiBearerAuth()
@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizersService: OrganizersService) {}

  @Get(':address')
  findOne(@Param('address') address: string) {
    return this.organizersService.findOne(address);
  }
}

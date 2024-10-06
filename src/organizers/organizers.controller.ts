import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrganizersService } from './organizers.service';
import { UpdateOrganizerDto } from './dto/update-organizer.dto';

@ApiTags('organizers')
@ApiBearerAuth()
@Controller('organizers')
export class OrganizersController {
  constructor(private readonly organizersService: OrganizersService) {}

  @Get(':address')
  findOne(@Param('address') address: string) {
    return this.organizersService.findOne(address);
  }

  @Patch(':address')
  update(
    @Param('address') address: string,
    @Body() updateOrganizerDto: UpdateOrganizerDto,
  ) {
    return this.organizersService.update(address, updateOrganizerDto);
  }
}

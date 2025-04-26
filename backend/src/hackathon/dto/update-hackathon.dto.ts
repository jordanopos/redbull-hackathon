import { CreateHackathonDto } from './create-hackathon.dto';

export class UpdateHackathonDto implements Partial<CreateHackathonDto> {
  name?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
  urlSlug?: string;
} 
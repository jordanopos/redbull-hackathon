export class CreateHackathonDto {
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  urlSlug: string;
} 
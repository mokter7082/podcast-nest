import { ArtistStatus } from './artist.status';

export class PaginationDto {
  page: string;
  limit: string;
  keyword: string;
  status: ArtistStatus;
}

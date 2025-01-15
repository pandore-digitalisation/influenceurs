export class CreateXDto {
  userId: string;
  name: string;
  followers?: string;
  following?: string;
  description?: string;
  profileUrl: string;
  plateform: string;
  profileImage: string;
}

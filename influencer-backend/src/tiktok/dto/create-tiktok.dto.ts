export class CreateTiktokDto {
  userId: string;
  name: string;
  followers?: string;
  following?: string;
  likes?: string;
  description?: string;
  profileUrl: string;
  plateform: string;
  profileImage: string;
}

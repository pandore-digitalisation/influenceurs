export class CreateFacebookDto {
  userId: string;
  name: string;
  followers?: string;
  following?: string;
  profileUrl?: string;
  plateform?: string;
  profileImage: string;
}

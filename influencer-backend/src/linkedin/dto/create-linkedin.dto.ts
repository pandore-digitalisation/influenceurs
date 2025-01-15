export class CreateLinkedinDto {
  userId: string;
  name: string;
  followers?: string;
  connection?: string;
  location?: string;
  description?: string;
  profileUrl: string;
  plateform: string;
  profileImage: string;
}

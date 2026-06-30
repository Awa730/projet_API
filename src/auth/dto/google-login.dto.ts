import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleLoginDto {
  @ApiProperty({
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6...',
    description: 'Jeton credential renvoye par le composant GoogleLogin du frontend (@react-oauth/google)',
  })
  @IsNotEmpty({ message: 'Le jeton Google est obligatoire' })
  credential: string;
}

import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class LinkedInService {
  async fetchProfile(
    email: string,
    password: string,
    profileId: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const command = `python3 linkedin_service.py ${email} ${password} ${profileId}`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(`Execution error: ${error.message}`);
          return;
        }
        if (stderr) {
          reject(`Execution stderr: ${stderr}`);
          return;
        }
        resolve(JSON.parse(stdout));
      });
    });
  }
}

import { ServiceUnavailableException } from '@nestjs/common';
import { unlinkSync } from 'fs';
import { extname } from 'path';

export class FileUtil {
  static UniqueName(req, file, callback) {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = `${Date.now()}`;
    callback(null, `${name}-${randomName}${fileExtName}`);
  }

  //TODO validate the passed entity to match the entity types in the upload enums
  static GeneratePath(req, file, callback) {
    callback(null, `./storage/${req.params.entity}`);
  }

  static DeleteFile(path: string): void {
    try {
      unlinkSync(path);
    } catch (error) {
      console.log(`Could not delete the file at path ${path}`, error);
    }
  }
}

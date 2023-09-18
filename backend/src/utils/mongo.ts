import { ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';
import { ObjectIDInvalidException } from './exceptions';

/**
 * A wrapper class around an ObjectId. Contains a few extra checks and throws
 * an HTTP exception if invalid. Only accepts strings.
 */
export class MongoId extends mongoose.Types.ObjectId {
  constructor(inputId: string) {
    // Make sure that it's not empty
    if (inputId === '') {
      throw new ObjectIDInvalidException('<<EMPTY>>');
    }

    try {
      super(inputId);
    } catch (e) {
      throw new ObjectIDInvalidException(inputId);
    }
  }
}

/**
 * Use environment variables to generate a connection string
 * @returns A connection string, from environment variables
 */
export const getConnectUrl = (config: ConfigService) => {
  return `mongodb+srv://${config.get<string>('DB_USER')}:${config.get<string>(
    'DB_PASSWORD',
  )}@${config.get<string>('DB_HOST')}/${config.get<string>('DB_PARAMS')}`;
};

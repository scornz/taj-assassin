import { HttpException, HttpStatus } from '@nestjs/common';
import { MongoId } from './mongo';
import { GameStatus } from 'game/game.schema';
import mongoose from 'mongoose';

export class ObjectIDInvalidException extends HttpException {
  constructor(
    id?:
      | string
      | number
      | mongoose.mongo.BSON.ObjectId
      | mongoose.mongo.BSON.ObjectIdLike
      | Uint8Array,
  ) {
    super(`The provided object ID ${id} is invalid.`, HttpStatus.BAD_REQUEST);
  }
}

export class UserNotFoundException extends HttpException {
  constructor(id: MongoId) {
    super(`User with ID ${id} could not be found.`, HttpStatus.NOT_FOUND);
  }
}

export class PlayerNotFoundException extends HttpException {
  constructor(id: MongoId) {
    super(`Player with ID ${id} could not be found.`, HttpStatus.NOT_FOUND);
  }
}

export class TargetNotFoundException extends HttpException {
  constructor(id: MongoId) {
    super(`Target with ID ${id} could not be found.`, HttpStatus.NOT_FOUND);
  }
}

export class RefreshTokenInvalidException extends HttpException {
  constructor(jti: string) {
    super(
      `Refresh token with JTI ${jti} was either invalid, malformed, or expired.`,
      HttpStatus.FORBIDDEN,
    );
  }
}

export class GameNotFoundException extends HttpException {
  constructor(id: MongoId) {
    super(`Game with ID ${id} could not be found.`, HttpStatus.NOT_FOUND);
  }
}

export class GameStatusNotValidException extends HttpException {
  constructor(id: MongoId, status: string) {
    super(
      `Game with ID ${id} has an invalid status of ${status} for this action.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class EmailNotWhitelistedException extends HttpException {
  constructor(userId: MongoId, gameId: MongoId) {
    super(
      `User with ID ${userId} is cannot register for game with ID ${gameId} because their email is not whitelisted.`,
      HttpStatus.FORBIDDEN,
    );
  }
}

export class PlayerAlreadyRegisteredException extends HttpException {
  constructor(userId: MongoId, gameId: MongoId) {
    super(
      `User with ID ${userId} is already registered for game with ID ${gameId}.`,
      HttpStatus.CONFLICT,
    );
  }
}

export class PlayerStatusNotValidException extends HttpException {
  constructor(id: MongoId, status: string) {
    super(
      `Player with ID ${id} has an invalid status of ${status} for this action.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class TargetStatusNotValidException extends HttpException {
  constructor(id: MongoId, status: string) {
    super(
      `Target with ID ${id} has an invalid status of ${status} for this action.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Query } from 'mongoose';
import { UserNotFoundException } from 'utils/exceptions';
import { GoogleUser } from 'auth/strategies/google.strategy';
import { MongoId } from 'utils/mongo';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(): Promise<User> {
    const createdCat = new this.userModel();
    // createdCat.name = 'Mike';
    createdCat.email = 'test@gmail.com';
    return createdCat.save();
  }

  /**
   * Find a user by their unique ID, only returns one user since ID should be unique
   * @param id ID of the user to find
   * @returns The found user
   */
  public async findById(id: MongoId): Promise<User> {
    const user = await this.userModel.findById(id);
    if (user == null) {
      throw new UserNotFoundException(id);
    }
    return user;
  }

  /**
   * Find a set of users by their unique IDs
   * @param ids List of IDs of the user to find
   * @returns The found user
   */
  public async findByIds(ids: MongoId[]): Promise<User[]> {
    const users = await this.userModel.find({ _id: { $in: ids } }).exec();
    return users;
  }

  /**
   * Find a user by their unique email, if they don't exist, make a new one
   * This email is guaranteed to be verified by Google so
   * @param googleUser User returned from Google OAuth process
   * @returns The found/created user
   */
  public async findOrCreateByGoogleUser(
    googleUser: GoogleUser,
  ): Promise<UserDocument> {
    let user = await this.userModel.findOne({ email: googleUser.email });
    if (user != null) {
      // Simply return the user if they already exist
      return user;
    }

    user = new this.userModel();
    user.email = googleUser.email;
    user.firstName = googleUser.firstName;
    user.surname = googleUser.lastName ?? 'Doe';
    return await user.save();
  }
}

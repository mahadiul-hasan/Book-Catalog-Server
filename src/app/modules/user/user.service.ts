import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { IUser } from './user.interface';

const GetUsers = async (): Promise<IUser[] | null> => {
  const GetAllUsers = await User.find({});
  if (!GetAllUsers) {
    throw new Error('No user found!');
  }
  return GetAllUsers;
};

const GetUserById = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('No user found!');
  }
  return user;
};

const UpdateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { email, ...updatePayload } = payload;

  const user = await User.findById(id);
  if (!user) {
    throw new Error('No user found!');
  }

  if (email && email !== user.email) {
    throw new Error('Updating email is not allowed!');
  }

  // Update the remaining fields
  Object.assign(user, updatePayload);

  const updatedUser = await user.save();
  return updatedUser;
};

const DeleteUser = async (id: string): Promise<void> => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new Error('No user found!');
  }
};

const GetUserProfile = async (user: JwtPayload): Promise<IUser | null> => {
  const { _id } = user;
  const userInfo = await User.findById(_id).exec();

  return userInfo;
};

export const UserService = {
  GetUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  GetUserProfile,
};
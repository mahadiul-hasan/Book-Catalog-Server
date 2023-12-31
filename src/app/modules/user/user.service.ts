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

const AddToWishlist = async (
  addBookId: string,
  user: JwtPayload
): Promise<void> => {
  const { _id } = user;
  const userInfo = await User.findById(_id);

  if (!userInfo) {
    throw new Error('User not found');
  }

  // Check if the book ID already exists in the wishlist
  if (userInfo.wishlist.includes(addBookId)) {
    throw new Error('Book already exists in the wishlist');
  }

  userInfo.wishlist.push(addBookId);
  await userInfo.save();
};

const GetWishlists = async (user: JwtPayload): Promise<string[]> => {
  const userInfo = await User.findById(user._id).populate('wishlist');

  if (!userInfo) {
    throw new Error('User not found');
  }

  return userInfo.wishlist;
};

const RemoveFromWishlist = async (
  user: JwtPayload,
  removeWBookId: string
): Promise<void> => {
  await User.findOneAndUpdate(
    { _id: user._id },
    { $pull: { wishlist: removeWBookId } },
    { new: true }
  );
};

const AddToReadingList = async (
  readingBookId: string,
  user: JwtPayload
): Promise<void> => {
  const { _id } = user;
  const userInfo = await User.findById(_id);

  if (!userInfo) {
    throw new Error('User not found');
  }

  // Check if the book ID already exists in the wishlist
  if (userInfo.readingList.includes(readingBookId)) {
    throw new Error('Book already exists in the Reading List');
  }

  // Remove the book from the wishlist
  const bookIndex = userInfo.wishlist.indexOf(readingBookId);
  if (bookIndex !== -1) {
    userInfo.wishlist.splice(bookIndex, 1);
  }

  userInfo.readingList.push(readingBookId);
  await userInfo.save();
};

const GetReadingLists = async (user: JwtPayload): Promise<string[]> => {
  const userInfo = await User.findById(user._id).populate('readingList');

  if (!userInfo) {
    throw new Error('User not found');
  }

  return userInfo.readingList;
};

const RemoveFromReadingList = async (
  user: JwtPayload,
  removeRBookId: string
): Promise<void> => {
  await User.findOneAndUpdate(
    { _id: user._id },
    { $pull: { readingList: removeRBookId } },
    { new: true }
  );
};

const AddToFinishedBook = async (
  finishedBookId: string,
  user: JwtPayload
): Promise<void> => {
  const { _id } = user;
  const userInfo = await User.findById(_id);

  if (!userInfo) {
    throw new Error('User not found');
  }

  // Check if the book ID already exists in the wishlist
  if (userInfo.finishedBooks.includes(finishedBookId)) {
    throw new Error('Book already exists in the Finished Book List');
  }

  // Remove the book from the wishlist
  const bookIndex = userInfo.readingList.indexOf(finishedBookId);
  if (bookIndex !== -1) {
    userInfo.readingList.splice(bookIndex, 1);
  }

  userInfo.finishedBooks.push(finishedBookId);
  await userInfo.save();
};

const GetFinishedBooks = async (user: JwtPayload): Promise<string[]> => {
  const userInfo = await User.findById(user._id).populate('finishedBooks');

  if (!userInfo) {
    throw new Error('User not found');
  }

  return userInfo.finishedBooks;
};

const RemoveFromFinishedBooks = async (
  user: JwtPayload,
  removeFBookId: string
): Promise<void> => {
  await User.findOneAndUpdate(
    { _id: user._id },
    { $pull: { finishedBooks: removeFBookId } },
    { new: true }
  );
};

export const UserService = {
  GetUsers,
  GetUserById,
  UpdateUser,
  DeleteUser,
  GetUserProfile,
  AddToWishlist,
  GetWishlists,
  AddToReadingList,
  GetReadingLists,
  AddToFinishedBook,
  GetFinishedBooks,
  RemoveFromWishlist,
  RemoveFromReadingList,
  RemoveFromFinishedBooks,
};

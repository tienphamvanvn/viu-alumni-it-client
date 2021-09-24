export interface User {
  studentID: string;
  fullname: string;
  email: string;
  password: string;
  profilePicture: string;
  coverPhoto: string;
  role: string;
  gender: string;
  bio: string;
  website: string;
  currentCity: string;
  hometown: string;
  className: string;
  majors: string;
  followers: string[];
  following: string[];
  bookmark: string[];
  _id: string;
  createdAt: Date;
}

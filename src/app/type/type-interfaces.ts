export interface UserObjType {
    _id?: string;
    username: string;
    email: string;
    password: string;
    role: 'user' | 'support' | 'admin'; // Update the role field type
  }
  
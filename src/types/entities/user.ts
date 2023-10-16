export const Role = ['USER'] as const;

export type UserRegister = {
  name: string;
  username: string;
  gender: 'male' | 'female';
  password: string;
  email: string;
  birth_place: string;
  birth_date: string;
  religion: string;
  address: string;
  nationality: 'indonesia' | 'outside';
  token: string;
  role: (typeof Role)[number];
  profile_picture?: string;
};

export type UserResponse = {
  username: string;
  password: string;
  name: string;
  phone_number: string;
  gender: 'male' | 'female';
  religion: string;
  nationality: 'indonesia' | 'outside';
  address: string;
  birth_info: string;
  token: string;
  role: (typeof Role)[number];
};

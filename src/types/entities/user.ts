export const Role = ['USER'] as const;

export type User = {
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

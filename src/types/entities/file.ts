const fileType = [
  'profile_picture',
  'id_card',
  'video',
  'docs',
  'misc',
] as const;
export type FileType = (typeof fileType)[number];

export type File = {
  id: string;
  user_id: number;
  filename: string;
  type: FileType;
  is_signed: boolean;
};

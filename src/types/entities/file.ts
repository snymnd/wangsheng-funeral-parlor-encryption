const fileType = [
  'profile_picture',
  'id_card',
  'video',
  'docs',
  'misc',
] as const;
export type FileType = (typeof fileType)[number];

export type File = {
  id: number;
  user_id: number;
  filename: string;
  type: FileType;
};

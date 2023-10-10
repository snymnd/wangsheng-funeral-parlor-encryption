const fileType = ['profile_picture', 'id_card', 'videos', 'docs', 'misc'];
export type FileType = (typeof fileType)[number];

export type File = {
  id: number;
  user_id: number;
  filename: string;
  type: 'profile_picture';
};

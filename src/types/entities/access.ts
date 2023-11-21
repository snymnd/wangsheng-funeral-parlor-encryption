export type RequestAccess = {
  id: string;
  source_user_id: string;
  source_user: { username: string };
  target_user_id: string;
  target_user: { username: string };
  status: 0 | 1 | 2;
};

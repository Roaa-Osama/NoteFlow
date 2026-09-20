export type Note = {
  id: number;
  title: string;
  content: string;
  isFavorite: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
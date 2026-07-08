export interface User {
    email: string;
    name: string;
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface PostFormData {
    title: string;
    body: string;
}

export interface PostListProps {
    posts: Post[];
    onEdit: (post: Post) => void;
    onDelete: (id: number) => void;
    deletingId: number | null;
}

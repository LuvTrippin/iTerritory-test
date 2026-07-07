import {apiClient} from "./client.ts";
import type {Post, PostFormData} from "../types";


export const postApi = {
    getAll: async (): Promise<Post[]> => {
        const { data } = await apiClient.get<Post[]>('/posts');
        return data;
    },

    create: async (post: PostFormData): Promise<Post> => {
        const { data } = await apiClient.post<Post>('/posts', {
            ...post,
            userId: 1,
        });
        return data;
    },

    update: async (id: number, post: PostFormData): Promise<Post> => {
        const { data } = await apiClient.put(`/posts/${id}`, {
            ...post,
            userId: 1,
        });

        return data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/posts/${id}`);
    },
}

import {queryOptions, useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import type {Post, PostFormData} from "../types";
import {postApi} from "../api/postsApi.ts";
import {useAuthStore} from "../store/authStore.ts";


export const postsQueryOptions = queryOptions({
    queryKey: ["posts"],
    queryFn: postApi.getAll,
});

export function usePosts() {
    return useQuery(postsQueryOptions);
}

export function useCreatePost() {
    const queryClient = useQueryClient();
    const userId = useAuthStore((state) => state.user.id);

    return useMutation({
        mutationFn: (data: PostFormData) => postApi.create(data, userId),
        onSuccess: (newPost) => {
            queryClient.setQueryData<Post[]>(postsQueryOptions.queryKey, (old) =>
                old ? [newPost, ...old] : [newPost],
            )
        },
    })
}

export function useUpdatePost() {
    const queryClient = useQueryClient();
    const userId = useAuthStore((state) => state.user.id);

    return useMutation({
        mutationFn: ({id, data}: {id: number, data: PostFormData}) => postApi.update(id, data, userId),
        onSuccess: (updatedPost) => {
            queryClient.setQueryData<Post[]>(postsQueryOptions.queryKey, (old) =>
                old?.map(post => (post.id === updatedPost.id ? updatedPost : post)),
            );
        }
    })
}

export function useDeletePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => postApi.delete(id),
        onSuccess: (_, id) => {
            queryClient.setQueryData<Post[]>(postsQueryOptions.queryKey, (old) =>
                old?.filter((post) => post.id !== id),
            );
        }
    })
}

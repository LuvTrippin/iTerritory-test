import {Header} from "../../components/Header/Header.tsx";
import {useCreatePost, useDeletePost, usePosts, useUpdatePost} from "../../hooks/usePosts.ts";
import {useState} from "react";
import type {Post, PostFormData} from "../../types";
import {PostList} from "../../components/PostList/PostList.tsx";
import {PostDialog} from "../../components/PostDialog/PostDialog.tsx";


export function HomePage() {
    const {data: posts = [], isLoading, isError} = usePosts();
    const deletePost = useDeletePost();
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const createPost = useCreatePost();
    const updatePost = useUpdatePost();
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    const handleCreate = () => {
        setEditingPost(null);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setEditingPost(null);
        setIsModalOpen(false);
    }

    const handleSubmit = async (data: PostFormData) => {
        if (editingPost) {
            await updatePost.mutateAsync({id: editingPost.id, data: data});
        } else {
            await createPost.mutateAsync(data);
        }
    }

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setIsModalOpen(true);
    }

    const handleDelete = async (id: number) => {
        setDeletingId(id);

        try {
            await deletePost.mutateAsync(id);
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div>
            <Header/>

            <main className="main">
                <h1>Главная страница</h1>

                <button type="button" onClick={handleCreate}>Добавить пост</button>

                {isLoading && <p>Загрузка...</p>}
                {isError && <p>Ошибка!</p>}

                {!isLoading && !isError && (
                    <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} deletingId={deletingId} />
                )}

                <PostDialog
                    isOpen={isModalOpen}
                    title={editingPost ? 'Редактировать пост': 'Добавить пост'}
                    submitLabel={editingPost ? 'Сохранить' : 'Добавить'}
                    onSubmit={handleSubmit}
                    onClose={handleCloseModal}
                    initialValues={editingPost ? {title: editingPost.title, body: editingPost.body} : undefined}
                />

            </main>
        </div>
    );
}
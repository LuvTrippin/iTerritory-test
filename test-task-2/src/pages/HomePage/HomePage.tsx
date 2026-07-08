import {Header} from "../../components/Header/Header.tsx";
import {useDeletePost, usePosts} from "../../hooks/usePosts.ts";
import {useState} from "react";
import type {Post} from "../../types";
import {PostList} from "../../components/PostList/PostList.tsx";


export function HomePage() {
    const {data: posts = [], isLoading, isError} = usePosts();
    const deletePost = useDeletePost();
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleEdit = (post: Post) => {
        console.log("Edit: ", post);
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

                {isLoading && <p>Загрузка...</p>}
                {isError && <p>Ошибка!</p>}

                {!isLoading && !isError && (
                    <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} deletingId={deletingId} />
                )}
            </main>
        </div>
    );
}
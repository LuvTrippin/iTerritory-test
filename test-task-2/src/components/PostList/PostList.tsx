import type {Post, PostListProps} from "../../types";

export function PostList({posts, onEdit, onDelete, deletingId}: PostListProps) {

    if (posts.length === 0) {
        return (
            <div className="empty-posts-list">
                <p>Постов нет...</p>
            </div>
        );
    }

    return (
        <ul className="posts-list">
            {posts.map((post: Post) => (
                <li key={post.id} className="post-card">
                    <div className="post-card-content">
                        <div className="post-card-title">{post.title}</div>
                        <div className="post-card-body">{post.body}</div>
                    </div>
                    <div className="post-card-actions">
                        <button type="button" onClick={() => onEdit(post)}>Редактировать</button>
                        <button type="button" onClick={() => onDelete(post.id)} disabled={deletingId === post.id}>
                            {deletingId === post.id ? "Удаление..." : "Удалить"}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
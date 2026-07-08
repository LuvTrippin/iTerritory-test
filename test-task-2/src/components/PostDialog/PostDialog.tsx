import type {PostModalProps} from "../../types";
import {PostDialogForm} from "./PostDialogForm.tsx";

export function PostDialog({isOpen, title, initialValues, submitLabel, onClose, onSubmit}: PostModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button type="button" aria-label="Закрыть" onClick={onClose}>
                        Закрыть
                    </button>
                </div>
                <PostDialogForm
                    initialValues={initialValues}
                    submitLabel={submitLabel}
                    onClose={onClose}
                    onSubmit={onSubmit}
                    isOpen={isOpen}
                    title={title}
                />
            </div>
        </div>
    )
}
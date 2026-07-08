import type {PostFormData, PostModalProps} from "../../types";
import {useState} from "react";
import * as React from "react";
import {postSchema} from "../../validation/postSchema.ts";
import {ValidationError} from "yup";

export function PostDialogForm({initialValues, onSubmit, onClose, submitLabel}: PostModalProps) {
    const emptyForm: PostFormData = { title: '', body: '' }

    const [form, setForm] = useState<PostFormData>(initialValues ?? emptyForm)
    const [errors, setErrors] = useState<{ title?: string; body?: string }>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (field: keyof PostFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    const handleSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault();

        try {
            await postSchema.validate(form, {abortEarly: false});
            setErrors({});
            setIsSubmitting(true);
            await onSubmit(form);
            onClose();
        } catch (error) {
            if (error instanceof ValidationError) {
                const nextErrors: {title?: string; body?: string } = {}

                error.inner.forEach((item) => {
                    if (item.path === 'title' || item.path === 'body') {
                        nextErrors[item.path] = item.message;
                    }
                })

                setErrors(nextErrors);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label htmlFor="post-title">Заголовок</label>
                <input
                    id="post-title"
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Введите заголовок"
                />
                {errors.title && <span>{errors.title}</span>}
            </div>

            <div className="form-field">
                <label htmlFor="post-body">Текст</label>
                <textarea
                    id="post-body"
                    value={form.body}
                    onChange={(e) => handleChange('body', e.target.value)}
                    placeholder="Введите текст заметки"
                    rows={5}
                />
                {errors.body && <span>{errors.body}</span>}
            </div>

            <div className="dialog-actions">
                <button type="button" onClick={onClose}>Отмена</button>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Сохранение...' : submitLabel}
                </button>
            </div>
        </form>
    );
}
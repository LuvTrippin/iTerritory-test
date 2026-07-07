import * as yup from 'yup';

export const postSchema = yup.object({
    title: yup
        .string()
        .trim()
        .min(3, 'Заголовок должен содержать минимум 3 символа')
        .max(100, 'Заголовок не может содержать более 100 символов')
        .required('Это поле обязательно для заполнения'),
    body: yup
        .string()
        .trim()
        .min(10, 'Текст должен содержать минимум 10 символов')
        .max(500, 'Максимальная длина текста 500 символов')
        .required()
})
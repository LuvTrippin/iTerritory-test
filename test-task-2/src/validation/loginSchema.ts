import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup
        .string()
        .email('Введите корректный адрес электронной почты')
        .required('Поле обязательно для заполнения'),
    password: yup
        .string()
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .required('Поле обязательно для заполнения')
})
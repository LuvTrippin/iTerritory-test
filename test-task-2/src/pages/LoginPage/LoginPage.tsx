import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {ValidationError} from "yup";
import { useAuthStore } from "../../store/authStore";
import type { LoginFormData } from "../../types";
import { loginSchema } from "../../validation/loginSchema";
import * as React from "react";


export function LoginPage() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [form, setForm] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
    const [authError, setAuthError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: keyof LoginFormData, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
        setAuthError('');
    }

    const handleSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault();

        try {

            await loginSchema.validate(form, {abortEarly: false});
            setErrors({});
            setIsSubmitting(true);

            const success = login(form.email, form.password);

            if (success) {
                navigate('/', {replace: true});
            } else {
                setAuthError('Неверный email или пароль');
            }

        } catch (error) {

            if (error instanceof ValidationError) {
                const nextErrors: { email?: string, password?: string } = {};

                error.inner.forEach((item) => {
                    if (item.path === 'email' || item.path === 'password') {
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
        <div className="login-page">
            <div className="login-card">
                <h1>iTerritory test</h1>
                <p>Войдите, чтобы управлять заметками</p>

                <form onSubmit={handleSubmit}>
                    <div className="form__field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="user@test.ru"
                        />
                        {errors.email && <span>{errors.email}</span>}
                    </div>

                    <div className="form__field">
                        <label htmlFor="password">Пароль</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            value={form.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            placeholder="••••••••"
                        />
                        {errors.password && <span>{errors.password}</span>}
                    </div>

                    {authError && <div>{authError}</div>}

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Вход...' : 'Войти'}
                    </button>
                </form>

                <div className="login-card__hint">
                    <p>Тестовые пользователи:</p>
                    <ul>
                        <li>user@test.ru / password</li>
                        <li>admin@test.ru / admin321</li>
                        <li>mock@test.ru / mock123</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
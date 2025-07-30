'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '@/app/store';
import { loginRequest } from '@/entities/user/model/authSlice';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('test@test.ru');
  const [password, setPassword] = useState('khro2ij3n2730');
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const { loading, error, tokens } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true); 
    dispatch(loginRequest({ email, password }));
    router.push('/posts')
  };

  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
        />
        <button type="submit" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    </div>
  );
}

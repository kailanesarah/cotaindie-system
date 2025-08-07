'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/urls';

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = () => {
    router.push(ROUTES.PUBLIC.SIGNIN); 
  };

  return <button onClick={handleLogin}>Sair</button>;
}

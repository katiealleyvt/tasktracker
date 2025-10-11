import { api_host } from '@/App';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';

export function Profile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
    };
    if (isAuthenticated) getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

}

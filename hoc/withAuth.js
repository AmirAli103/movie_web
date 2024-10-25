import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('access_token'); // Adjust if using a different method for storing tokens

      if (!token) {
        router.push('/'); // Redirect to root if no token is found
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

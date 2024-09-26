'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useApiErrorHandler = () => {
    const router = useRouter();

    useEffect(() => {
        const handleApiError = (event) => {
            const error = event.detail;
            if (error.redirectToLogin) {
                router.push('/');
            }
            // Handle other types of errors as needed
        };

        window.addEventListener('api-error', handleApiError);

        return () => {
            window.removeEventListener('api-error', handleApiError);
        };
    }, [router]);
};

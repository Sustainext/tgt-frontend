// components/Auth0LoginButton.js
'use client'

const Auth0LoginButton = () => {
    const handleLogin = () => {
        window.location.href = '/api/auth/login';
    };

    return (
        <button
        onClick={handleLogin}
        className="group relative mt-2 flex w-full justify-center rounded-md  bg-transparent  px-3 py-1.5 text-sm font-normal leading-6 text-[#007EEF] hover:text-indigo-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Login with SSO(Single Sign On)
      </button>

    );
};

export default Auth0LoginButton;
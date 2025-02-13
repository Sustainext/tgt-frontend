// components/Auth0LoginButton.js
'use client'

const Auth0LoginButton = () => {
    const handleLogin = () => {
        window.location.href = '/api/auth/login';
    };

    return (
        <button
        onClick={handleLogin}
        className="group relative mt-2 flex w-full justify-center rounded-md  bg-gradient-to-r from-[#007EEF] to-[#2AE4FF] hover:bg-gradient-to-r hover:from-[#00aeef] hover:to-[#6adf23] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Login with SSO
      </button>

    );
};

export default Auth0LoginButton;
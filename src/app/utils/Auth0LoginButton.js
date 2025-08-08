// components/Auth0LoginButton.js
'use client'
 
 
const Auth0LoginButton = () => {
  const handleLogin = () => {
    const params = new URLSearchParams({
      client_id: `${process.env.KEYCLOAK_CLIENT_ID}`,
      redirect_uri: `${process.env.KEYCLOAK_BASE_URL}/callback`,
      response_type: "code",
      scope: "openid profile email",
    });
 
    // const authUrl = `http://localhost:8080/realms/Sustainext/protocol/openid-connect/auth?${params.toString()}`;
    const authUrl = `${process.env.KEYCLOAK_ISSUER_Auth_URL}/auth?${params.toString()}`;

    window.location.href = authUrl;
  };
 
  return (
    <button
      onClick={handleLogin}
      className="group relative mt-2 flex w-full justify-center rounded-md bg-transparent px-3 py-1.5 text-sm font-normal leading-6 text-[#007EEF] hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Login with SSO (Single Sign On)
    </button>
  );
};
 
export default Auth0LoginButton;
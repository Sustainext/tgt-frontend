// app/auth/error/page.js
export default function AuthError() {
    return (
        <div className="p-4">
            <h1 className="text-red-600 text-2xl">Authentication Error</h1>
            <p>There was an error during authentication. Please try again.</p>
            <a 
                href="/"
                className="text-blue-600 hover:underline"
            >
                Return to Home
            </a>
        </div>
    );
}
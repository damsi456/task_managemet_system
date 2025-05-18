function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      
      {/* Use anchor instead of button with window.open */}
      <a 
        href="http://localhost:3000/auth/google"
        className="bg-blue-600 text-white px-4 py-2 rounded inline-flex items-center justify-center"
      >
        Sign in with Google
      </a>
    </div>
  );
}

export default Login;
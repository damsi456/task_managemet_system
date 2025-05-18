function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Login</h1>
      
      {/* Use anchor instead of button with window.open */}
      <a 
        href="http://localhost:3000/auth/google"
        className="text-center mt-10 text-4xl font-bold text-indigo-600"
      >
        Sign in with Google
      </a>
    </div>
  );
}

export default Login;
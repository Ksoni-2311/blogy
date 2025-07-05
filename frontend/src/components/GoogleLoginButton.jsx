
import { authUserStore } from "../store/authStore"

function GoogleLoginButton() {
  const { loginWithGoogle, isGoogleLoggingIn } = authUserStore()

  return (
    <button
      onClick={loginWithGoogle}
      disabled={isGoogleLoggingIn}
      className="flex justify-center items-center gap-2 bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-900 transition"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-5 h-5"
      />
      <span>{isGoogleLoggingIn ? "Signing in..." : "Sign in with Google"}</span>
    </button>
  )
}

export default GoogleLoginButton
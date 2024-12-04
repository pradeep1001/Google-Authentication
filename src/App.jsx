import { useEffect, useState } from "react"; // Add useEffect import
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth"; // Add onAuthStateChanged
import { db } from "./firebase/firebase";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) return setUser(user);
    });
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(getAuth(), provider).then((data) => {
        setUser(data.user);
      });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(getAuth()).then(() => setUser(null));
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen space-y-32">
      {/* HEADING */}

      <header className="p-4 border-b border-slate-900">
        <nav>
          <h1 className="text-center capitalize font-bold text-4xl">
            Google Authentication
          </h1>
        </nav>
      </header>

      {/* <div className="w-full max-w-3xl mx-auto"> */}
      <div className="w-full h-screen flex items-center justify-center">
        {!user ? (
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 -mt-96"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold mb-2 uppercase text-sky-600">
                Welcome, {user.displayName}!
              </h1>
              <p className="  text-sky-600">Email ID: {user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

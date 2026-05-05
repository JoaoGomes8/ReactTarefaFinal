import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import RootLayout from './components/RootLayout'
import { AuthProvider } from './contexts/AuthContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
    ]
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App

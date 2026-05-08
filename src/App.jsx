import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Gestor from './pages/Gestor'
import Consumidor from './pages/Consumidor'
import Cozinha from './pages/Cozinha'
import RootLayout from './components/RootLayout'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './protectedRoutes/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      {
        path: "gestor",
        element: <ProtectedRoute element={<Gestor />} allowedRole="gestor" />,
      },
      {
        path: "consumidor",
        element: <ProtectedRoute element={<Consumidor />} allowedRole="consumidor" />,
      },
      {
        path: "cozinha",
        element: <ProtectedRoute element={<Cozinha />} allowedRole="cozinha" />,
      },
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

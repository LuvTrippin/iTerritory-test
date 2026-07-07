import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GuestRoute, ProtectedRoute} from "./components/ProtectedRoute/ProtectedRoute.tsx";
import {HomePage} from "./pages/HomePage/HomePage.tsx";
import {LoginPage} from "./pages/LoginPage/LoginPage.tsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
        />
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<HomePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

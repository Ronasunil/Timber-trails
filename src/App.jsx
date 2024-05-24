import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import Dashboard from './pages/Dashboard'
import Bookings from "./pages/Bookings";
import Cabins from './pages/Cabins'
import Setting from "./pages/Settings"
import AppLayout from "./ui/AppLayout";
import Account from './pages/Account'
import Users from './pages/Users'

import GlobalStyles from "./styles/GlobalStyles";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";
import Login from "./pages/Login";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import SignupForm from "./features/authentication/SignupForm";

import PageNotFound from './pages/PageNotFound'

import { DarkmodeProvider } from "./context/DarkmodeContext";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";




const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:0
    }
  }
})



export default function App() {
  return (
        <DarkmodeProvider>
          <QueryClientProvider client={queryClient}> 
          <ReactQueryDevtools initialIsOpen={false}/>
            <GlobalStyles/>
              <BrowserRouter>
                <Routes>
                  <Route element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
                    <Route index element={<Navigate to="/dashboard" replace/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/bookings" element={<Bookings/>}/>
                    <Route path="/bookings/:bookingId" element={<Booking/>}/>
                    <Route path="/checkin/:bookingId" element={<CheckIn/>}/>
                    <Route path="/cabins" element={<Cabins/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/settings" element={<Setting/>}/>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/user" element={<SignupForm/>}/>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                  </Route>
                  <Route path="/login" element={<Login/>}/>
                </Routes>
              </BrowserRouter>
              <Toaster position="top-center" gutter={15} toastOptions={{success:{duration:3000, style:{border:'1px solid #a3e635'}}, error:{duration:5000, style:{border:'1px solid #dc2626'}}, style:{maxWidth:"500px", fontSize:'15px'}}}/>
          </QueryClientProvider>
        </DarkmodeProvider> 
  )
}
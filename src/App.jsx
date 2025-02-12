import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import BookingDetail from "./features/bookings/BookingDetail";
import CheckinBooking from "./features/check-in-out/CheckinBooking";
import CheckOutBooking from "./features/check-in-out/CheckOutBooking";
import { AuthProvider } from "./features/authentication/authContext.jsx";
import { DarkModeProvider } from "./ui/DarkModeToggle.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}

        <GlobalStyles />

        <BrowserRouter>
          <Routes>
            <Route
              element={
                <AuthProvider>
                  <AppLayout />
                </AuthProvider>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />

              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:id" element={<BookingDetail />} />
              <Route path="checkin/:id" element={<CheckinBooking />} />
              <Route path="checkout/:id" element={<CheckOutBooking />} />

              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="account" element={<Account />} />
            </Route>

            <Route
              path="login"
              element={
                <AuthProvider>
                  <Login />
                </AuthProvider>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px ",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />

        {/* */}
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;

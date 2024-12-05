import React from "react";

export const ProtectedRoute = () => {
  const { user } = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/sign-in" />;
  }
  return <>{children}</>;
};

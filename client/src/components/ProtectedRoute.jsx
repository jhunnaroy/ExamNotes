
// import { Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const ProtectedRoute = ({ children }) => {
//   const [isChecking, setIsChecking] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     console.log("🔐 ProtectedRoute Token:", token); // debug

//     // ❌ No token → not authenticated
//     if (!token || token === "undefined") {
//       setIsAuthenticated(false);
//       setIsChecking(false);
//       return;
//     }

//     // ✅ Try JWT validation (SAFE)
//     try {
//       if (token.includes(".")) {
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         const isExpired = payload.exp * 1000 < Date.now();

//         if (isExpired) {
//           console.log("⛔ Token expired");
//           localStorage.removeItem("token");
//           localStorage.removeItem("user");
//           setIsAuthenticated(false);
//         } else {
//           setIsAuthenticated(true);
//         }
//       } else {
//         // ✅ Not JWT → still allow (simple token)
//         setIsAuthenticated(true);
//       }
//     } catch (err) {
//       console.log("⚠️ Token decode failed, allowing fallback");
//       // 👉 fallback: treat as valid instead of logging out
//       setIsAuthenticated(true);
//     }

//     setIsChecking(false);
//   }, []);

//   // 🔄 Loading state
//   if (isChecking) {
//     return (
//       <div className="loading-screen">
//         <div className="spinner"></div>
//         <p>Checking authentication...</p>
//       </div>
//     );
//   }

//   // ✅ Final decision
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;



import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  console.log("ProtectedRoute token:", token);

  if (!token || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
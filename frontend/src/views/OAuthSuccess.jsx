import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    let timer;

    const handleOAuthSuccess = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          navigate("/Login", { replace: true });
          return;
        }

        localStorage.setItem("token", token);

        const response = await fetch(
          "http://localhost:5000/api/auth/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("OAuth Profile Response:", data);

        if (!response.ok) {
          console.error(
            "Failed to fetch user profile:",
            data.message
          );

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/Login", { replace: true });
          return;
        }

        const user =
          data.user ||
          data.data?.user ||
          data.data;

        if (!user) {
          console.error(
            "User data not found in profile response"
          );

          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/Login", { replace: true });
          return;
        }

        const userData = {
          id: user.id || user._id,
          name: user.name || "",
          email: user.email || "",
        };

        localStorage.setItem(
          "user",
          JSON.stringify(userData)
        );

        console.log(
          "OAuth user saved successfully:",
          userData
        );

        window.dispatchEvent(
          new Event("authChanged")
        );

        timer = setTimeout(() => {
          navigate("/Dashboard", {
            replace: true,
          });
        }, 2000);
      } catch (error) {
        console.error(
          "OAuth Success Error:",
          error
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/Login", {
          replace: true,
        });
      }
    };

    handleOAuthSuccess();

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <span className="text-4xl">✅</span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-green-600">
          Login Successful!
        </h1>

        <p className="mt-3 text-gray-600">
          Welcome back! You have successfully
          logged in.
        </p>

        <p className="mt-4 text-sm text-gray-400">
          Redirecting to Dashboard...
        </p>
      </div>
    </div>
  );
};

export default OAuthSuccess;
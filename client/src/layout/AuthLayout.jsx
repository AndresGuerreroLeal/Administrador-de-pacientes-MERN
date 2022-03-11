import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto grid md:grid-cols-2 gap-10 p-5 items-center h-screen ">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;

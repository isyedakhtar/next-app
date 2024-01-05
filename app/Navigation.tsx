import Link from "next/link";
import React from "react";

const Navigation = () => {
  return (
    <div className="flex bg-slate-50 p-2">
      <Link href="/users" className="mr-5">
        Users
      </Link>
      <Link href="/products"> Products </Link>
    </div>
  );
};

export default Navigation;

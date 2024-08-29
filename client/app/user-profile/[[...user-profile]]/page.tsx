"use client";

import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { resolvedTheme } = useTheme();
  if (resolvedTheme === "dark") {
    return (
      <div className="flex justify-center items-center bg-customwhite dark:bg-customblack">
        <UserProfile
          path="/user-profile"
          appearance={{
            baseTheme: dark,
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center bg-customwhite dark:bg-customblack">
        <UserProfile path="/user-profile" />
      </div>
    );
  }
}

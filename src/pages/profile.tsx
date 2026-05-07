import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useAdminStore } from "@/lib/admin-store";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import ProfilePage from "./profile/ProfilePage";
import EditProfilePage from "./profile/EditProfilePage";

type Page = "profile" | "edit-profile";

export default function Profile() {
  const { user, isAuthenticated } = useAdminStore();
  const [, setLocation] = useLocation();
  const [page, setPage] = useState<Page>("profile");

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/');
    }
  }, [isAuthenticated, setLocation]);

  if (!user) {
    return null;
  }

  if (page === "edit-profile") {
    return (
      <div className="min-h-[100dvh] flex flex-col w-full bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white font-sans">
        <SiteHeader />
        <EditProfilePage 
          onBack={() => setPage("profile")} 
          username={user.username}
          email={user.email}
        />
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-white dark:bg-[#0d0d12] text-gray-900 dark:text-white font-sans">
      <SiteHeader />
      <ProfilePage 
        onEditProfile={() => setPage("edit-profile")} 
        username={user.username}
        userId={user.id}
      />
      <SiteFooter />
    </div>
  );
}

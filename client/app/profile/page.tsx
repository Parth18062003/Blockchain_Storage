import { Header } from "@/Components/Header";
import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <>
    <Header />
      <div className="flex justify-center items-center">
        <UserProfile/>
      </div>
    </>
  );
};

export default ProfilePage;

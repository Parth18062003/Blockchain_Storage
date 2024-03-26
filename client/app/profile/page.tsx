import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <>
      <div className="flex justify-center items-center bg-customwhite dark:bg-customblack">
        <UserProfile />
      </div>
    </>
  );
};

export default ProfilePage;

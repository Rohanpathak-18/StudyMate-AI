import { User, Mail, Shield } from "lucide-react";
import useAuthStore from "../store/authStore";

const Profile = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-[#07111F] p-6 text-[#F1F7FF]">
      <div className="mx-auto max-w-3xl py-8">
        <div className="mb-8">
          <p className="text-sm font-medium text-[#00E5FF]">
            ACCOUNT
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Profile
          </h1>

          <p className="mt-2 text-[#7890A8]">
            Manage your StudyMate AI account.
          </p>
        </div>

        <div className="rounded-2xl border border-[#16324A] bg-[#0B1728] p-6">
          <div className="flex items-center gap-5 border-b border-[#16324A] pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#00E5FF]/10">
              <User
                size={28}
                className="text-[#00E5FF]"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {user?.name || "StudyMate User"}
              </h2>

              <p className="mt-1 text-sm text-[#7890A8]">
                Student
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4 rounded-xl border border-[#16324A] bg-[#07111F] p-4">
              <Mail
                size={20}
                className="text-[#00E5FF]"
              />

              <div>
                <p className="text-xs text-[#7890A8]">
                  Email
                </p>

                <p className="mt-1 text-sm">
                  {user?.email || "Not available"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-[#16324A] bg-[#07111F] p-4">
              <Shield
                size={20}
                className="text-[#7C3AED]"
              />

              <div>
                <p className="text-xs text-[#7890A8]">
                  Account
                </p>

                <p className="mt-1 text-sm">
                  Authenticated with JWT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
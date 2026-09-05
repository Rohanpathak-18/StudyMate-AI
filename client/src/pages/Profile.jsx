import {
  User,
  Mail,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";
import useAuthStore from "../store/authStore";

const Profile = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <div className="min-h-screen bg-[#07111F] p-6 text-[#F1F7FF]">
      <div className="mx-auto max-w-4xl py-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00E5FF]">
          Account
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Profile
        </h1>

        <p className="mt-2 text-[#7890A8]">
          Your StudyMate AI account information.
        </p>

        <div className="mt-8 rounded-3xl border border-[#16324A] bg-[#0B1728] p-8">
          <div className="flex flex-col gap-5 border-b border-[#16324A] pb-7 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#00E5FF]/10">
              <User
                size={34}
                className="text-[#00E5FF]"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user?.name || "Learner"}
              </h2>

              <p className="mt-1 text-[#7890A8]">
                StudyMate AI member
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#16324A] bg-[#07111F] p-5">
              <Mail
                size={20}
                className="text-[#00E5FF]"
              />

              <p className="mt-4 text-xs uppercase tracking-wider text-[#7890A8]">
                Email
              </p>

              <p className="mt-2 break-all text-sm font-medium">
                {user?.email || "Not available"}
              </p>
            </div>

            <div className="rounded-2xl border border-[#16324A] bg-[#07111F] p-5">
              <ShieldCheck
                size={20}
                className="text-[#A3FF12]"
              />

              <p className="mt-4 text-xs uppercase tracking-wider text-[#7890A8]">
                Security
              </p>

              <p className="mt-2 text-sm font-medium">
                JWT authenticated
              </p>
            </div>

            <div className="rounded-2xl border border-[#16324A] bg-[#07111F] p-5">
              <User
                size={20}
                className="text-[#7C3AED]"
              />

              <p className="mt-4 text-xs uppercase tracking-wider text-[#7890A8]">
                Role
              </p>

              <p className="mt-2 text-sm font-medium">
                Student
              </p>
            </div>

            <div className="rounded-2xl border border-[#16324A] bg-[#07111F] p-5">
              <CalendarDays
                size={20}
                className="text-[#00E5FF]"
              />

              <p className="mt-4 text-xs uppercase tracking-wider text-[#7890A8]">
                Member since
              </p>

              <p className="mt-2 text-sm font-medium">
                {user?.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                  : "Recently"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
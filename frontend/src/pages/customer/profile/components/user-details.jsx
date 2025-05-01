import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Calendar, Badge, UserCheck } from "lucide-react";

function UserDetails() {
  const { user } = useSelector((state) => state.auth);

  // Generate initials for avatar
  const getInitials = () => {
    if (user?.firstname && user?.lastname) {
      return `${user.firstname[0]}${user.lastname[0]}`.toUpperCase();
    } else if (user?.username) {
      return user.username.substring(0, 2).toUpperCase();
    }
    return "NA";
  };

  return (
    <Card className="rounded-lg shadow-md border-t-4 border-t-blue-500">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <UserCheck size={20} />
          User Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {/* User Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 text-blue-700 h-20 w-20 rounded-full flex items-center justify-center text-xl font-bold mb-3">
            {getInitials()}
          </div>
          <h3 className="text-lg font-medium">
            {user?.firstname && user?.lastname
              ? `${user.firstname} ${user.lastname}`
              : user?.username || "Anonymous User"}
          </h3>
          {user?.email && <p className="text-gray-500 text-sm">{user.email}</p>}
        </div>

        {/* User Details Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-3">
            Account Information
          </h4>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-8 text-gray-400">
                <User size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Username</p>
                <p className="font-medium">
                  {user?.username || "Not available"}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 text-gray-400">
                <Badge size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">
                  {user?.firstname && user?.lastname
                    ? `${user.firstname} ${user.lastname}`
                    : "Not available"}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 text-gray-400">
                <Mail size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="font-medium">{user?.email || "Not available"}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 text-gray-400">
                <Calendar size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium">
                  {user?.createdDate
                    ? new Date(user.createdDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserDetails;

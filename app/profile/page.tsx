import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { ProfileForm } from "@/components/profile/profile-form"
import { OrderHistory } from "@/components/profile/order-history"
import { getUserProfile } from "@/lib/data/user"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/profile")
  }

  const userProfile = await getUserProfile(session.user.id)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileForm user={userProfile} />
        </div>
        <div className="md:col-span-2">
          <OrderHistory userId={session.user.id} />
        </div>
      </div>
    </div>
  )
}


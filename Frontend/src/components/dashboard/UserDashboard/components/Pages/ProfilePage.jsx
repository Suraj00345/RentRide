const ProfileField = ({ label, value }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
    <p className="text-sm font-semibold text-gray-900">{value}</p>
  </div>
);

const ProfilePage = ({ user }) => (
  <div className="space-y-6 max-w-2xl">
    {/* Avatar card */}
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
      <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
        {user.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
        <p className="text-sm text-gray-400">{user.email}</p>
        <span className="inline-block mt-2 text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">
          {user.tier}
        </span>
      </div>
      <button className="hidden sm:block text-xs font-semibold px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition shrink-0">
        Edit Profile
      </button>
    </div>

    {/* Details */}
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-bold text-gray-900 mb-4">Personal Information</h3>
      <ProfileField label="Full Name"     value={user.name} />
      <ProfileField label="Email"         value={user.email} />
      <ProfileField label="Phone"         value={user.phone} />
      <ProfileField label="Location"      value={user.location} />
      <ProfileField label="Member Since"  value={user.memberSince} />
    </div>

    {/* Driving licence placeholder */}
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900">Driving Licence</h3>
        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
          Not Uploaded
        </span>
      </div>
      <p className="text-xs text-gray-400 mb-4">
        Upload your driving licence to unlock faster booking approvals.
      </p>
      <button className="w-full border-2 border-dashed border-green-200 hover:border-green-400 hover:bg-green-50/50 text-green-700 text-xs font-semibold py-4 rounded-xl transition-all">
        + Upload Licence
      </button>
    </div>
  </div>
);

export default ProfilePage;
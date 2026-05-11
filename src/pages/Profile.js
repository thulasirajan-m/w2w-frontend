import React, { useState } from 'react';
const API_URL = 'https://w2w-backend-k76m.onrender.com';
const Profile = () => {
  const [user, setUser] = useState({
    name: localStorage.getItem('userName') || 'User',
    email: localStorage.getItem('userEmail') || 'user@example.com',
    profilePic: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.name);

  // Logo Change Logic (Local Preview)
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    setUser({ ...user, name: tempName });
    setIsEditing(false);
    localStorage.setItem('userName', tempName);
    alert("Profile Updated Successfully Machi! ✨");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Top Banner Accent */}
        <div className="h-32 bg-gradient-to-r from-green-400 to-green-600 relative"></div>

        <div className="px-10 pb-10 -mt-16 relative">
          {/* Profile Picture Section */}
          <div className="relative group w-32 h-32 mx-auto">
            <img 
              src={user.profilePic} 
              alt="User Profile" 
              className="w-full h-full object-cover rounded-[2.5rem] border-4 border-white shadow-lg group-hover:opacity-80 transition-all"
            />
            <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-black/50 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full backdrop-blur-sm">Change</span>
              <input type="file" className="hidden" onChange={handleLogoChange} accept="image/*" />
            </label>
          </div>

          {/* User Details */}
          <div className="text-center mt-6 space-y-2">
            {isEditing ? (
              <input 
                type="text" 
                value={tempName} 
                onChange={(e) => setTempName(e.target.value)}
                className="text-2xl font-black text-gray-900 border-b-2 border-green-500 outline-none text-center bg-transparent"
              />
            ) : (
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">{user.name}</h2>
            )}
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{user.email}</p>
          </div>

          <hr className="my-8 border-gray-100" />

          {/* Stats / Info */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-3xl text-center">
              <span className="block text-xl font-black text-green-700">12</span>
              <span className="text-[9px] font-black text-green-600/50 uppercase tracking-widest">Contributions</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-3xl text-center">
              <span className="block text-xl font-black text-gray-800">4</span>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Orders</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            {isEditing ? (
              <button 
                onClick={saveProfile}
                className="w-full bg-green-600 text-white font-black py-4 rounded-2xl hover:bg-gray-950 transition-all shadow-xl shadow-green-100 uppercase text-xs tracking-widest active:scale-95"
              >
                Save Changes 💾
              </button>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full bg-gray-950 text-white font-black py-4 rounded-2xl hover:bg-green-600 transition-all uppercase text-xs tracking-widest active:scale-95"
              >
                Edit Profile ✍️
              </button>
            )}
            
            <button className="w-full border-2 border-gray-100 text-gray-400 font-black py-4 rounded-2xl hover:border-red-500 hover:text-red-500 transition-all uppercase text-xs tracking-widest active:scale-95">
              Account Settings ⚙️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
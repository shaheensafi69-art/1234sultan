"use client";
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { LogOut, User, Lock, Save, Loader2, Globe, Phone, Calendar, Camera, ShieldAlert, Fingerprint } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    country: '',
    phone: '',
    avatar_url: '' 
  });

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, date_of_birth, country, phone, avatar_url')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error("Error fetching profile:", error.message);
        }

        if (data) {
          setProfile({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            date_of_birth: data.date_of_birth || '',
            country: data.country || '',
            phone: data.phone || '',
            avatar_url: data.avatar_url || ''
          });
        }
      }
      setLoading(false);
    }
    getProfile();
  }, [supabase]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    try {
      setUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      alert("Avatar uploaded successfully! Click save to update your profile. 📸");
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!profile.avatar_url) {
      alert("Uploading a profile picture is mandatory! Please upload your image first.");
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: profile.first_name,
        last_name: profile.last_name,
        date_of_birth: profile.date_of_birth,
        country: profile.country,
        phone: profile.phone,
        avatar_url: profile.avatar_url 
      })
      .eq('id', user.id);

    if (error) {
      alert("Error updating profile: " + error.message);
    } else {
      alert("Profile updated successfully! ✅");
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) return (
    <div className="py-40 flex flex-col items-center justify-center gap-4 bg-white/50 backdrop-blur-xl max-w-4xl mx-auto rounded-[3rem] border border-slate-100 shadow-xl">
      <div className="relative">
        <div className="absolute inset-0 rounded-full border-2 border-blue-600 animate-ping opacity-20"></div>
        <Loader2 className="animate-spin text-blue-600 relative z-10" size={40} />
      </div>
      <p className="text-slate-400 font-black tracking-[0.3em] uppercase text-[10px]">Verifying Identity Node...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 px-4 pt-10 font-sans animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
      
      {/* Background Blue Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ─── Header Section (Clean UI) ─── */}
      <div className="flex flex-col gap-2 text-center md:text-left relative z-10">
        <div className="inline-flex items-center justify-center md:justify-start gap-2 text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2 bg-blue-50 w-max mx-auto md:mx-0 px-4 py-1.5 rounded-full border border-blue-100">
          <Fingerprint size={14} /> Configuration Panel
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase drop-shadow-sm flex items-center justify-center md:justify-start gap-4">
          <div className="relative w-12 h-12 hidden md:block">
            <Image 
              src="/logo.png" 
              alt="Sultan Logo" 
              fill
              className="object-contain"
            />
          </div>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Account</span> Settings
        </h2>
        <p className="text-slate-500 font-medium text-sm">Configure your core identity nodes and security logs.</p>
      </div>

      {/* ─── Main Profile Card (Glassmorphism) ─── */}
      <div className="bg-white/80 backdrop-blur-2xl p-6 sm:p-12 rounded-[3rem] border border-slate-100 shadow-[0_15px_50px_-15px_rgba(37,99,235,0.08)] space-y-10 relative z-10">
        
        {/* Card Header & Avatar Upload */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl text-blue-600 border border-blue-100 shadow-sm flex items-center justify-center shrink-0">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Identity Pipeline</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Your global platform credentials</p>
            </div>
          </div>
          
          <div className="flex items-center gap-5 self-start sm:self-center">
            <div className="relative group">
              <div className={`absolute -inset-1.5 rounded-3xl blur-md opacity-40 transition-all duration-500 ${profile.avatar_url ? 'bg-blue-400 opacity-20' : 'bg-red-400 animate-pulse'}`}></div>
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden border-2 border-white shadow-lg shrink-0 flex items-center justify-center transition-transform active:scale-95"
              >
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="avatar" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <User className="text-slate-300" size={32} />
                )}
                
                <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {uploading ? <Loader2 className="animate-spin" size={24} /> : <Camera size={24} className="mb-1" />}
                </div>
              </button>
            </div>

            <div className="space-y-2">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md border inline-block w-fit ${profile.avatar_url ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-red-500 bg-red-50 border-red-100'}`}>
                {profile.avatar_url ? 'Avatar Uploaded' : '* Mandatory Avatar'}
              </span>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <p className="text-[10px] font-bold text-slate-400">Click image to update</p>
            </div>
          </div>
        </div>
        
        {/* ─── Input Grid (Smart Inputs) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="space-y-2 group/input">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/input:text-blue-600 transition-colors">First Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                value={profile.first_name}
                onChange={(e) => setProfile({...profile, first_name: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 hover:bg-slate-100/50 focus:bg-white rounded-2xl border border-slate-200/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-sm text-slate-800"
                placeholder="First Name"
              />
            </div>
          </div>

          <div className="space-y-2 group/input">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/input:text-blue-600 transition-colors">Last Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                value={profile.last_name}
                onChange={(e) => setProfile({...profile, last_name: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 hover:bg-slate-100/50 focus:bg-white rounded-2xl border border-slate-200/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-sm text-slate-800"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="space-y-2 group/input">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/input:text-blue-600 transition-colors">Date of Birth</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" size={18} />
              <input 
                type="date" 
                value={profile.date_of_birth}
                onChange={(e) => setProfile({...profile, date_of_birth: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 hover:bg-slate-100/50 focus:bg-white rounded-2xl border border-slate-200/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-sm text-slate-800"
              />
            </div>
          </div>

          <div className="space-y-2 group/input">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/input:text-blue-600 transition-colors">WhatsApp Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" size={18} />
              <input 
                type="tel" 
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 hover:bg-slate-100/50 focus:bg-white rounded-2xl border border-slate-200/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-sm text-slate-800"
                placeholder="+93 7xx xxx xxx"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2 group/input">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/input:text-blue-600 transition-colors">Country / Region</label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                value={profile.country}
                onChange={(e) => setProfile({...profile, country: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 hover:bg-slate-100/50 focus:bg-white rounded-2xl border border-slate-200/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold text-sm text-slate-800"
                placeholder="Country Name"
              />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address (Primary Lock)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="email" disabled value={user?.email || ''} className="w-full pl-12 pr-4 py-4 bg-slate-100/50 rounded-2xl border border-slate-200/40 text-slate-500 cursor-not-allowed font-bold text-sm select-none" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-slate-100">
          <button 
            onClick={handleUpdateProfile}
            disabled={saving || uploading}
            className="w-full relative overflow-hidden group/btn bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
            {saving ? <Loader2 className="animate-spin relative z-10" size={20} /> : <><Save size={20} className="relative z-10 group-hover/btn:scale-110 transition-transform" /> <span className="relative z-10">Save Configuration</span></>}
          </button>
        </div>
      </div>

      {/* ─── Danger Zone (Logout) ─── */}
      <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-red-100 shadow-[0_15px_40px_-15px_rgba(244,63,94,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-red-50 rounded-full blur-3xl pointer-events-none group-hover:bg-red-100 transition-colors duration-700"></div>
        
        <div className="flex items-center gap-5 relative z-10">
          <div className="w-14 h-14 bg-red-50 border border-red-100 rounded-2xl text-red-500 flex items-center justify-center shrink-0 shadow-sm">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h3 className="font-black text-lg text-slate-800 uppercase tracking-tight">Security Gateway</h3>
            <p className="text-xs text-slate-500 font-medium mt-1">Terminate current session logs securely.</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full sm:w-auto relative z-10 flex items-center justify-center gap-3 text-red-600 bg-white border-2 border-red-100 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-50 hover:border-red-200 transition-all duration-300 shadow-sm active:scale-95"
        >
          <LogOut size={18} /> Terminate Session
        </button>
      </div>
    </div>
  );
}
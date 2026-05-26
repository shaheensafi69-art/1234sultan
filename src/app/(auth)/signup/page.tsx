"use client";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// این را در فایل‌های خود جایگزین کنید:
import { createClient } from '@/utils/supabase/client'; // مسیر یکپارچه با صفحه لاگین
import { User, Mail, Lock, Phone, Globe, Calendar, Eye, EyeOff, Loader2, Camera, ShieldCheck, ArrowRight } from 'lucide-react';

const supabase = createClient();

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [dob, setDob] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); 
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setErrorMsg('');
    
    try {
      setUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
    } catch (error: any) {
      setErrorMsg("خطا در آپلود: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!avatarUrl) {
      setErrorMsg("آپلود عکس پروفایل الزامی است!");
      setLoading(false);
      return;
    }

    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: { data: { first_name: firstName, last_name: lastName } } 
      });
      
      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: authData.user.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            country: country,
            date_of_birth: dob,
            avatar_url: avatarUrl,
            balance: 0
          }]);

        if (profileError) throw profileError;

        setSuccessMsg("سلطان عزیز، حساب شما با موفقیت فعال شد.");
        setTimeout(() => router.push('/dashboard'), 1500);
      }
    } catch (error: any) {
      setErrorMsg(error?.message || "خطایی رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[480px] space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto">
             <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
            Sultan <span className="text-blue-600">Online</span> Service
          </h1>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(30,41,59,0.1)] border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-lg font-black text-slate-800 uppercase">Create Empire Node</h2>
          </div>
          
          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 bg-slate-100 rounded-full overflow-hidden border-2 border-blue-100 flex items-center justify-center mb-3">
              {avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" /> : <User className="text-slate-400" size={32} />}
            </div>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-blue-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <Camera size={14} /> {uploading ? "Uploading..." : "Upload Identity Image"}
            </button>
            <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-blue-500" required />
            <input type="tel" placeholder="WhatsApp Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-blue-500" required />
            
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none" required />
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none" required />
            </div>

            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none" required />
            <input type="password" placeholder="Secure Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none" required />

            <button disabled={loading} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 flex items-center justify-center gap-2 mt-4 transition-all">
              {loading ? <Loader2 className="animate-spin" size={16} /> : <>Join the Empire <ArrowRight size={16} /></>}
            </button>
          </form>

          {errorMsg && <p className="text-red-500 text-[10px] font-bold mt-4 text-center">{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
}
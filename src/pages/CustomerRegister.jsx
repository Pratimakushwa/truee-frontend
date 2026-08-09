

// import React, { useState, useRef } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axiosInstance from '../utils/axiosInstance';
// import Toast from '../components/Toast';
// import { useAuth } from '../context/AuthContext';
// import ReCAPTCHA from 'react-google-recaptcha';
// import WelcomeCouponPopup from '../components/WelcomeCouponPopup'; 
// // ⚡ NAYA: Icons import kiye hain Login page ki tarah
// import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

// // ⚡ Light Theme aur Icons ke saath Field Component
// const Field = ({ label, icon: Icon, ...props }) => (
//   <div className="relative group">
//     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C8A253] transition-colors duration-300">
//       {Icon && <Icon size={18} />}
//     </div>
//     <input
//       {...props}
//       id={props.name}
//       placeholder=" "
//       className="peer w-full bg-gray-50 border border-gray-200 rounded-xl px-12 pt-5 pb-1.5 text-gray-900 text-sm focus:outline-none focus:border-[#C8A253]/70 focus:bg-white focus:shadow-[0_0_0_4px_rgba(200,162,83,0.1)] transition-all duration-300 placeholder-transparent"
//     />
//     <label
//       htmlFor={props.name}
//       className="absolute left-12 top-1.5 text-[10px] font-bold tracking-[0.2em] text-[#C8A253] uppercase transition-all duration-300 cursor-text peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-medium peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-[0.2em] peer-focus:text-[#C8A253]"
//     >
//       {label}
//     </label>
//   </div>
// );

// // ⚡ NAYA: Password Field jisme Eye icon hai (Login ki tarah)
// const PasswordField = ({ label, ...props }) => {
//   const [show, setShow] = useState(false);
//   return (
//     <div className="relative group">
//       <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#C8A253] transition-colors duration-300">
//         <Lock size={18} />
//       </div>
//       <input
//         {...props}
//         id={props.name}
//         type={show ? 'text' : 'password'}
//         placeholder=" "
//         className="peer w-full bg-gray-50 border border-gray-200 rounded-xl px-12 pt-5 pb-1.5 pr-12 text-gray-900 text-sm focus:outline-none focus:border-[#C8A253]/70 focus:bg-white focus:shadow-[0_0_0_4px_rgba(200,162,83,0.1)] transition-all duration-300 placeholder-transparent"
//       />
//       <label
//         htmlFor={props.name}
//         className="absolute left-12 top-1.5 text-[10px] font-bold tracking-[0.2em] text-[#C8A253] uppercase transition-all duration-300 cursor-text peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-medium peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:tracking-[0.2em] peer-focus:text-[#C8A253]"
//       >
//         {label}
//       </label>
//       <button
//         type="button"
//         onClick={() => setShow((s) => !s)}
//         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8A253] transition-colors"
//       >
//         {show ? <EyeOff size={18} /> : <Eye size={18} />}
//       </button>
//     </div>
//   );
// };

// export default function CustomerRegister() {
//   const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
//   const [toast, setToast] = useState(null);
//   const [loading, setLoading] = useState(false);
  
//   const [captchaToken, setCaptchaToken] = useState(null); 
//   const recaptchaRef = useRef();

//   const [showWelcomePopup, setShowWelcomePopup] = useState(false);
//   const [assignedCoupon, setAssignedCoupon] = useState('WELCOME500'); 

//   const navigate = useNavigate();
//   const { login } = useAuth(); 

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!captchaToken) {
//       setToast({ type: 'error', message: 'Please complete the reCAPTCHA verification.' });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await axiosInstance.post('/auth/register', {
//         ...formData,
//         captchaToken: captchaToken 
//       });

//       if (response.data.success) {
//         login(response.data.token, response.data.user);
//         setToast({ type: 'success', message: 'Registration successful! Welcome.' });
        
//         if (response.data.user?.coupons?.length > 0) {
//             setAssignedCoupon(response.data.user.coupons[0].code);
//         }
        
//         setShowWelcomePopup(true); 
//       }
//     } catch (err) {
//       setToast({ type: 'error', message: err.response?.data?.error || 'Registration failed.' });
      
//       if (recaptchaRef.current) {
//         recaptchaRef.current.reset();
//         setCaptchaToken(null);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowWelcomePopup(false);
//     navigate('/'); 
//   };

//   return (
//     // ⚡ Light Background & compact height (100dvh helps on mobile browsers)
//     <div className="min-h-[100dvh] bg-[#FAFAFA] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      
//       {/* Background Decorative Glow */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#C8A253]/10 blur-[100px] rounded-full pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C8A253]/10 blur-[100px] rounded-full pointer-events-none" />

//       <Toast toast={toast} onClose={() => setToast(null)} />

//       <div className="w-full max-w-[420px] z-10">
        
//         {/* Header - Compact Margins */}
//         <div className="text-center mb-8 sm:mb-10">
//           <div className="inline-block px-3 py-1 border border-[#C8A253]/20 rounded-full mb-4 bg-[#C8A253]/5">
//             <p className="text-[#C8A253] text-[9px] font-black tracking-[0.4em] uppercase">Join Us</p>
//           </div>
//           <div className="flex items-center justify-center gap-3 mb-1.5">
//             <img 
//               src="/Truee_Luxury_Logo.png" 
//               alt="Truee Luxury Logo" 
//               className="w-10 h-10 sm:w-12 sm:h-12 object-contain" 
//             />
//             <h1 className="text-4xl sm:text-5xl font-serif italic text-gray-900">
//               Truee <span className="text-[#C8A253]">Luxury</span>
//             </h1>
//           </div>
//           <p className="text-gray-500 text-xs sm:text-sm font-medium tracking-wide">Create your customer account</p>
//         </div>

//         {/* Form Container - White Background & Reduced Padding */}
//         <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
//           <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            
//             <Field label="Full Name" name="name" type="text" icon={User} required value={formData.name} onChange={handleChange} />
//             <Field label="Email Address" name="email" type="email" icon={Mail} required value={formData.email} onChange={handleChange} />
//             <Field label="Phone Number" name="phone" type="tel" icon={Phone} value={formData.phone} onChange={handleChange} />
//             <PasswordField label="Password" name="password" required value={formData.password} onChange={handleChange} />

//             {/* ReCAPTCHA - Theme changed to LIGHT and scaled for mobile */}
//             <div className="flex justify-center rounded-xl bg-gray-50 border border-gray-100 overflow-hidden transform scale-[0.85] origin-center sm:scale-100 -mx-4 sm:mx-0 mt-2">
//               <ReCAPTCHA
//                 ref={recaptchaRef}
//                 sitekey={import.meta.env.VITE_GOOGLE_SITE_KEY}
//                 onChange={(token) => setCaptchaToken(token)}
//                 theme="light" // ⚡ Light Theme Applied
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full overflow-hidden py-3.5 sm:py-4 rounded-xl bg-[#C8A253] text-black text-xs font-black tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_8px_20px_rgba(200,162,83,0.3)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 active:scale-[0.98] mt-2"
//             >
//               <span className="relative z-10 flex items-center justify-center gap-3">
//                 {loading ? 'Creating Account...' : 'Sign Up'}
//                 {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
//               </span>
//             </button>
//           </form>

//           {/* SignIn Link */}
//           <div className="mt-8 pt-6 border-t border-gray-100 text-center">
//             <p className="text-gray-500 text-[11px] sm:text-xs font-medium">
//               Already have an account?
//             </p>
//             <Link 
//               to="/login" 
//               className="inline-block mt-2 text-[#C8A253] text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:text-[#a88641] transition-colors border-b border-[#C8A253]/30 hover:border-[#a88641] pb-1"
//             >
//               Sign In Here
//             </Link>
//           </div>
//         </div>
        
//         <p className="mt-6 text-center text-gray-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.3em]">
//           &copy; {new Date().getFullYear()} Truee Luxury
//         </p>
//       </div>

//       {/* ⚡ Popup Waisa ka Waisa Hi Hai */}
//       <WelcomeCouponPopup 
//         isOpen={showWelcomePopup} 
//         onClose={handleClosePopup} 
//         couponCode={assignedCoupon} 
//       />
//     </div>
//   );
// }

import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import WelcomeCouponPopup from '../components/WelcomeCouponPopup'; 
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

// ⚡ Apple-Style Minimalist Field Component
const Field = ({ label, icon: Icon, ...props }) => (
  <div className="relative group w-full">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors duration-300">
      {Icon && <Icon size={18} strokeWidth={1.5} />}
    </div>
    <input
      {...props}
      id={props.name}
      placeholder=" "
      className="peer w-full bg-[#F5F5F7]/80 hover:bg-[#E8E8ED]/80 border-2 border-transparent rounded-2xl px-12 pt-6 pb-2 text-gray-900 text-[15px] font-medium focus:outline-none focus:border-[#C8A253]/30 focus:bg-white focus:shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 placeholder-transparent"
    />
    <label
      htmlFor={props.name}
      className="absolute left-12 top-2 text-[11px] font-semibold tracking-wider text-gray-500 uppercase transition-all duration-300 cursor-text peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:tracking-wider peer-focus:text-black"
    >
      {label}
    </label>
  </div>
);

// ⚡ Apple-Style Password Field
const PasswordField = ({ label, ...props }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative group w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors duration-300">
        <Lock size={18} strokeWidth={1.5} />
      </div>
      <input
        {...props}
        id={props.name}
        type={show ? 'text' : 'password'}
        placeholder=" "
        className="peer w-full bg-[#F5F5F7]/80 hover:bg-[#E8E8ED]/80 border-2 border-transparent rounded-2xl px-12 pt-6 pb-2 pr-12 text-gray-900 text-[15px] font-medium focus:outline-none focus:border-[#C8A253]/30 focus:bg-white focus:shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 placeholder-transparent"
      />
      <label
        htmlFor={props.name}
        className="absolute left-12 top-2 text-[11px] font-semibold tracking-wider text-gray-500 uppercase transition-all duration-300 cursor-text peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-[15px] peer-placeholder-shown:text-gray-400 peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:tracking-wider peer-focus:text-black"
      >
        {label}
      </label>
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors p-1"
      >
        {show ? <EyeOff size={18} strokeWidth={1.5} /> : <Eye size={18} strokeWidth={1.5} />}
      </button>
    </div>
  );
};

export default function CustomerRegister() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [captchaToken, setCaptchaToken] = useState(null); 
  const recaptchaRef = useRef();

  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [assignedCoupon, setAssignedCoupon] = useState('WELCOME500'); 

  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      setToast({ type: 'error', message: 'Please complete the reCAPTCHA verification.' });
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post('/auth/register', {
        ...formData,
        captchaToken: captchaToken 
      });

      if (response.data.success) {
        login(response.data.token, response.data.user);
        setToast({ type: 'success', message: 'Registration successful! Welcome.' });
        
        if (response.data.user?.coupons?.length > 0) {
            setAssignedCoupon(response.data.user.coupons[0].code);
        }
        
        setShowWelcomePopup(true); 
      }
    } catch (err) {
      setToast({ type: 'error', message: err.response?.data?.error || 'Registration failed.' });
      
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaToken(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowWelcomePopup(false);
    navigate('/'); 
  };

  return (
    // ⚡ Light Apple-ish Background 
    <div className="min-h-[100dvh] bg-[#F5F5F7] flex items-center justify-center p-4 sm:p-6 relative font-sans selection:bg-[#C8A253] selection:text-white">
      
      {/* Subtle Glows */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-white blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[40%] h-[40%] bg-[#C8A253]/5 blur-[100px] rounded-full pointer-events-none" />

      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="w-full max-w-[420px] z-10">
        
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[#C8A253] text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Join Us</p>
          
          <div className="flex items-center justify-center gap-3 mb-2">
            {/* ⚡ LOGO FIX: brightness-0 class se logo ekdum solid black ho jayega aur text se match karega */}
            <img 
              src="/Truee_Luxury_Logo.png" 
              alt="Truee Luxury Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain brightness-0 drop-shadow-sm" 
            />
            <h1 className="text-4xl sm:text-5xl font-serif text-gray-900 tracking-tight">
              Truee <span className="text-[#C8A253] italic">Luxury</span>
            </h1>
          </div>

          <p className="text-gray-500 text-[14px] sm:text-[15px] font-medium tracking-wide">Create your customer account</p>
        </div>

        {/* Form Container - Glassmorphism Style */}
        <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[32px] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <Field label="Full Name" name="name" type="text" icon={User} required value={formData.name} onChange={handleChange} />
            <Field label="Email Address" name="email" type="email" icon={Mail} required value={formData.email} onChange={handleChange} />
            <Field label="Phone Number" name="phone" type="tel" icon={Phone} value={formData.phone} onChange={handleChange} />
            <PasswordField label="Password" name="password" required value={formData.password} onChange={handleChange} />

            {/* ReCAPTCHA Box */}
            <div className="flex justify-center rounded-2xl bg-[#F5F5F7]/80 p-2 overflow-hidden transform scale-[0.9] origin-center sm:scale-100 mt-2">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_GOOGLE_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                theme="light"
              />
            </div>

            {/* Premium Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden py-4 rounded-2xl bg-black text-white text-[13px] font-bold tracking-[0.1em] uppercase transition-all duration-300 hover:bg-[#C8A253] hover:shadow-[0_8px_20px_rgba(200,162,83,0.3)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-black active:scale-[0.98] mt-4"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? 'Creating Account...' : 'Sign Up'}
                {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>

          {/* SignIn Link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-[13px] font-medium">
              Already have an account?
            </p>
            <Link 
              to="/login" 
              className="inline-block mt-1.5 text-[#C8A253] text-[13px] font-bold uppercase tracking-widest hover:text-[#C8A253] transition-colors pb-1"
            >
              Sign In Here
            </Link>
          </div>
        </div>
        
        <p className="mt-8 text-center text-gray-400 text-[10px] font-semibold uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Truee Luxury
        </p>
      </div>

      <WelcomeCouponPopup 
        isOpen={showWelcomePopup} 
        onClose={handleClosePopup} 
        couponCode={assignedCoupon} 
      />
    </div>
  );
}
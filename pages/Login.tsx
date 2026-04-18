import React, { useState, useContext } from 'react';
import { UserRole } from '../types';
import { RoleContext } from '../App';
import { GraduationCap, Lock, User, ChevronRight } from 'lucide-react';

const Login = () => {
  const { setRole, setIsAuthenticated } = useContext(RoleContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(true);
      // Logic to determine role based on username (mock)
      if (username.includes('student')) setRole(UserRole.STUDENT);
      else if (username.includes('sup')) setRole(UserRole.SUPERVISOR);
      else setRole(UserRole.TEACHER);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-indigo-700 h-48 flex flex-col items-center justify-center text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-indigo-600 opacity-50 transform rotate-3 scale-110"></div>
         <div className="z-10 flex flex-col items-center gap-3">
            <div className="bg-white p-3 rounded-full shadow-lg">
                <GraduationCap size={40} className="text-indigo-700" />
            </div>
            <h1 className="text-2xl font-bold tracking-wider">智慧校园统一身份认证</h1>
         </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-8 -mt-8 z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">账号登录</h2>
            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">学工号 / Student ID</label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-600 transition-all">
                        <User className="text-gray-400 mr-3" size={20} />
                        <input 
                            type="text" 
                            className="w-full bg-transparent outline-none text-gray-700 font-medium placeholder-gray-400"
                            placeholder="请输入学工号"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">密码 / Password</label>
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-600 transition-all">
                        <Lock className="text-gray-400 mr-3" size={20} />
                        <input 
                            type="password" 
                            className="w-full bg-transparent outline-none text-gray-700 font-medium placeholder-gray-400"
                            placeholder="请输入密码"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center text-gray-600">
                        <input type="checkbox" className="mr-2 rounded text-indigo-600 focus:ring-indigo-500" />
                        记住我
                    </label>
                    <a href="#" className="text-indigo-600 font-medium hover:underline">忘记密码?</a>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>登录 <ChevronRight size={20} /></>
                    )}
                </button>
            </form>
        </div>

        {/* Demo Roles Helper */}
        <div className="mt-8 text-center">
            <p className="text-gray-400 text-xs mb-2">演示账号点击复制:</p>
            <div className="flex justify-center gap-2 text-xs">
                <button onClick={() => setUsername('teacher')} className="bg-gray-100 px-3 py-1 rounded text-gray-600 hover:bg-gray-200">教师 (teacher)</button>
                <button onClick={() => setUsername('student')} className="bg-gray-100 px-3 py-1 rounded text-gray-600 hover:bg-gray-200">学生 (student)</button>
                <button onClick={() => setUsername('supervisor')} className="bg-gray-100 px-3 py-1 rounded text-gray-600 hover:bg-gray-200">督导 (supervisor)</button>
            </div>
        </div>
      </div>
      
      <div className="p-4 text-center text-gray-300 text-xs">
        &copy; 2023 智慧校园技术中心
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Video, 
  UserCircle, 
  ChevronLeft,
  Bell,
  Calendar,
  MessageSquare,
  CheckSquare,
  ChevronRight,
  Clock,
  Settings,
  LogOut,
  FileText,
  Star,
  Shield,
  ClipboardList
} from 'lucide-react';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patrol from './pages/Patrol';
import Supervision from './pages/Supervision';
import Evaluation from './pages/Evaluation';
import Homework from './pages/Homework';
import Attendance from './pages/Attendance';
import Stats from './pages/Stats';
import Live from './pages/Live';
import SignIn from './pages/SignIn';
import ClassroomDetail from './pages/ClassroomDetail';

// Data
import { MESSAGES, COURSES, CURRENT_USER } from './services/mockData';

// Context
import { UserRole } from './types';

// Role Context
export const RoleContext = React.createContext<{
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}>({ 
  role: UserRole.TEACHER, 
  setRole: () => {}, 
  isAuthenticated: false,
  setIsAuthenticated: () => {}
});

// Layout Components
const Header = ({ title, canGoBack }: { title: string, canGoBack: boolean }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        {canGoBack && (
          <button onClick={() => navigate(-1)} className="p-1 -ml-2 text-gray-600 active:bg-gray-100 rounded-full">
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-lg font-bold text-gray-800 truncate max-w-[200px]">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-600">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </div>
    </header>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const { role } = React.useContext(RoleContext);
  const isActive = (path: string) => location.pathname === path;
  
  // Student Specific Navigation
  const studentNavItems = [
    { path: '/', icon: Home, label: '课堂' },
    { path: '/homework', icon: BookOpen, label: '作业' },
    { path: '/live', icon: Video, label: '讲座' },
    { path: '/profile', icon: UserCircle, label: '我的' },
  ];

  // Teacher Specific Navigation (Modified)
  const teacherNavItems = [
    { path: '/', icon: Home, label: '工作台' },
    { path: '/schedule', icon: Calendar, label: '课表' }, // New Schedule tab
    { path: '/messages', icon: MessageSquare, label: '消息' }, // New Message tab
    { path: '/profile', icon: UserCircle, label: '我的' },
  ];

  const supervisorNavItems = [
     { path: '/', icon: Home, label: '工作台' },
     { path: '/live', icon: Video, label: '直播' },
     { path: '/profile', icon: UserCircle, label: '我的' },
  ];

  const navItems = role === UserRole.STUDENT ? studentNavItems : (role === UserRole.TEACHER ? teacherNavItems : supervisorNavItems);
  const showNav = navItems.some(item => item.path === location.pathname);

  if (!showNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe pt-2 px-6 h-16 flex justify-between items-center z-50">
      {navItems.map((item) => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={`flex flex-col items-center gap-1 w-16 ${isActive(item.path) ? 'text-indigo-600' : 'text-gray-400'}`}
        >
          <item.icon size={24} strokeWidth={isActive(item.path) ? 2.5 : 2} />
          <span className="text-[10px] font-medium">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

// --- Mock Pages for New Teacher Tabs ---
const TeacherSchedulePage = () => (
    <div className="p-4 pt-6 space-y-4 min-h-screen bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 mb-4">我的课表</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
             {/* Mock Calendar Grid */}
             <div className="flex justify-between mb-4 border-b border-gray-100 pb-2">
                 <div className="text-center font-bold text-indigo-600">本周 (第8周)</div>
                 <div className="text-gray-400 text-sm">2023 秋季学期</div>
             </div>
             <div className="space-y-3">
                 {['周一', '周二', '周三', '周四', '周五'].map((day, i) => (
                     <div key={day} className="flex gap-3">
                         <div className="w-10 text-sm font-bold text-gray-500 pt-2">{day}</div>
                         <div className="flex-1 space-y-2">
                             {i % 2 === 0 ? (
                                 <div className="bg-indigo-50 p-3 rounded-lg border-l-4 border-indigo-500">
                                     <div className="font-bold text-gray-800 text-sm">高等数学 (上)</div>
                                     <div className="text-xs text-gray-500 mt-1">08:00 - 09:35 | A-101</div>
                                 </div>
                             ) : (
                                  <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-500">
                                     <div className="font-bold text-gray-800 text-sm">线性代数</div>
                                     <div className="text-xs text-gray-500 mt-1">10:00 - 11:35 | B-205</div>
                                 </div>
                             )}
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    </div>
);

const TeacherMessagePage = () => (
    <div className="p-4 pt-6 min-h-screen bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 mb-4">消息中心</h2>
        <div className="space-y-3">
             {MESSAGES.map(msg => (
                 <div key={msg.id} className={`bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3 ${!msg.read ? 'bg-blue-50/30' : ''}`}>
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 
                        ${msg.type === 'system' ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-600'}`}>
                         <Bell size={20} />
                     </div>
                     <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-center mb-1">
                             <h4 className="font-bold text-gray-800 text-sm truncate">{msg.title}</h4>
                             <span className="text-xs text-gray-400">{msg.time}</span>
                         </div>
                         <p className="text-xs text-gray-500 line-clamp-2">{msg.content}</p>
                     </div>
                     {!msg.read && <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>}
                 </div>
             ))}
        </div>
    </div>
);

const ProfilePage = () => {
  const { role, setRole, setIsAuthenticated } = React.useContext(RoleContext);
  
  // Teacher Profile View
  if (role === UserRole.TEACHER) {
      return (
        <div className="p-4 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                 <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-3xl font-bold text-indigo-600 border-4 border-white shadow-sm">
                     张
                 </div>
                 <div>
                     <h2 className="text-xl font-bold text-gray-800">{CURRENT_USER.name}</h2>
                     <p className="text-gray-500 text-sm mt-1">{CURRENT_USER.department} | 教授</p>
                     <p className="text-xs text-indigo-600 mt-1 bg-indigo-50 inline-block px-2 py-0.5 rounded">教工号: {CURRENT_USER.id}</p>
                 </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                 <div className="p-4 flex items-center justify-between active:bg-gray-50">
                     <div className="flex items-center gap-3 text-gray-700 font-medium">
                         <Calendar size={20} className="text-blue-500" />
                         我的办公时间
                     </div>
                     <ChevronRight size={16} className="text-gray-400" />
                 </div>
                  <div className="p-4 flex items-center justify-between active:bg-gray-50">
                     <div className="flex items-center gap-3 text-gray-700 font-medium">
                         <Star size={20} className="text-yellow-500" />
                         学生评教反馈
                     </div>
                     <ChevronRight size={16} className="text-gray-400" />
                 </div>
                  <div className="p-4 flex items-center justify-between active:bg-gray-50">
                     <div className="flex items-center gap-3 text-gray-700 font-medium">
                         <FileText size={20} className="text-green-500" />
                         教学科研成果
                     </div>
                     <ChevronRight size={16} className="text-gray-400" />
                 </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                 <div className="p-4 flex items-center justify-between active:bg-gray-50">
                     <div className="flex items-center gap-3 text-gray-700 font-medium">
                         <Settings size={20} className="text-gray-400" />
                         系统设置
                     </div>
                     <ChevronRight size={16} className="text-gray-400" />
                 </div>
            </div>
             
             {/* Role Switcher Demo */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <p className="text-xs text-gray-400 mb-2 text-center">--- 演示：切换角色 ---</p>
                 <div className="flex gap-2">
                     <button onClick={() => setRole(UserRole.STUDENT)} className="flex-1 bg-white border border-gray-200 py-2 rounded text-xs text-gray-600">切为学生</button>
                     <button onClick={() => setRole(UserRole.SUPERVISOR)} className="flex-1 bg-white border border-gray-200 py-2 rounded text-xs text-gray-600">切为督导</button>
                 </div>
            </div>

            <button 
                onClick={() => setIsAuthenticated(false)}
                className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold mt-2 flex items-center justify-center gap-2"
            >
                <LogOut size={18} /> 退出登录
            </button>
        </div>
      );
  } else if (role === UserRole.SUPERVISOR) {
      // --- Supervisor Profile View (New) ---
      return (
        <div className="p-4 space-y-6">
            {/* 1. Large Profile Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
                 <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-3xl font-bold text-purple-600 border-4 border-white shadow-sm">
                     李
                 </div>
                 <div>
                     <h2 className="text-2xl font-bold text-gray-900">李老师</h2>
                     <p className="text-gray-600 text-lg mt-1">校级督导组 | 组长</p>
                     <p className="text-sm text-purple-700 mt-2 bg-purple-50 inline-block px-3 py-1 rounded font-medium">工号: S008</p>
                 </div>
            </div>

            {/* 2. Large Action List for Seniors */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                 <div className="p-5 flex items-center justify-between active:bg-gray-50 cursor-pointer">
                     <div className="flex items-center gap-4 text-gray-800 font-bold text-lg">
                         <ClipboardList size={28} className="text-blue-600" />
                         我的听课记录
                     </div>
                     <ChevronRight size={24} className="text-gray-400" />
                 </div>
                  <div className="p-5 flex items-center justify-between active:bg-gray-50 cursor-pointer">
                     <div className="flex items-center gap-4 text-gray-800 font-bold text-lg">
                         <FileText size={28} className="text-green-600" />
                         周工作报表
                     </div>
                     <ChevronRight size={24} className="text-gray-400" />
                 </div>
                  <div className="p-5 flex items-center justify-between active:bg-gray-50 cursor-pointer">
                     <div className="flex items-center gap-4 text-gray-800 font-bold text-lg">
                         <Settings size={28} className="text-gray-500" />
                         字体与显示设置
                     </div>
                     <ChevronRight size={24} className="text-gray-400" />
                 </div>
            </div>

            {/* Role Switcher Demo */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                 <p className="text-xs text-gray-400 mb-2 text-center">--- 演示：切换角色 ---</p>
                 <div className="flex gap-2">
                     <button onClick={() => setRole(UserRole.STUDENT)} className="flex-1 bg-white border border-gray-200 py-2 rounded text-xs text-gray-600">切为学生</button>
                     <button onClick={() => setRole(UserRole.TEACHER)} className="flex-1 bg-white border border-gray-200 py-2 rounded text-xs text-gray-600">切为教师</button>
                 </div>
            </div>

            <button 
                onClick={() => setIsAuthenticated(false)}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-xl mt-4 flex items-center justify-center gap-2 shadow-md active:bg-red-700"
            >
                <LogOut size={24} /> 退出登录
            </button>
        </div>
      );
  }

  // Student Profile View (Simplified for brevity, assuming existing logic remains)
  return (
    <div className="p-4 space-y-6">
       {/* Existing Student Profile Logic... */}
       <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
         <div className="relative z-10 flex items-center gap-4">
             <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl font-bold border-2 border-white/30">李</div>
             <div>
                 <h2 className="text-xl font-bold">李同学</h2>
                 <p className="text-indigo-100 text-sm mt-1">ID: 2023001 | 计算机科学与技术</p>
             </div>
         </div>
      </div>
      
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
            <div className="p-4 flex items-center justify-between active:bg-gray-50">
               <div className="flex items-center gap-3 text-gray-700 font-medium">
                   <Settings size={20} className="text-gray-400" />
                   账号设置
               </div>
               <ChevronRight size={16} className="text-gray-400" />
           </div>
       </div>

       <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
             <p className="text-xs text-gray-400 mb-2 text-center">--- 演示：切换角色 ---</p>
             <div className="flex gap-2">
                 <button onClick={() => setRole(UserRole.TEACHER)} className="flex-1 bg-white border border-gray-200 py-2 rounded text-xs text-gray-600">切为教师</button>
                 <button onClick={() => setRole(UserRole.SUPERVISOR)} className="flex-1 bg-white border border-gray-200 py-2 rounded text-xs text-gray-600">切为督导</button>
             </div>
        </div>
        
       <button onClick={() => setIsAuthenticated(false)} className="w-full bg-gray-100 text-gray-500 py-3 rounded-xl font-bold mt-4">退出登录</button>
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const { isAuthenticated, role } = React.useContext(RoleContext);
  
  if (!isAuthenticated) {
    return <Login />;
  }

  const getTitle = () => {
    switch(location.pathname) {
      case '/': return role === UserRole.STUDENT ? '我的课堂' : (role === UserRole.SUPERVISOR ? '督导工作台' : '教师工作台');
      case '/schedule': return '我的课表';
      case '/messages': return '消息中心';
      case '/patrol': return '在线巡课';
      case '/supervision': return '督导听课';
      case '/evaluation': return '随堂评教';
      case '/homework': return '作业管理';
      case '/attendance': return '考勤管理';
      case '/stats': return '测验管理';
      case '/live': return '讲座直播';
      case '/profile': return '个人中心';
      case '/sign-in': return '课堂签到';
      default: return '智慧课堂';
    }
  };

  const shouldShowHeader = !location.pathname.startsWith('/classroom/'); 

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {shouldShowHeader && <Header title={getTitle()} canGoBack={location.pathname !== '/' && location.pathname !== '/schedule' && location.pathname !== '/messages' && location.pathname !== '/profile'} />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schedule" element={<TeacherSchedulePage />} />
        <Route path="/messages" element={<TeacherMessagePage />} />
        <Route path="/patrol" element={<Patrol />} />
        <Route path="/supervision" element={<Supervision />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="/homework" element={<Homework />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/live" element={<Live />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/classroom/:id" element={<ClassroomDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav />
    </div>
  );
};

const App = () => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <RoleContext.Provider value={{ role, setRole, isAuthenticated, setIsAuthenticated }}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </RoleContext.Provider>
  );
};

export default App;

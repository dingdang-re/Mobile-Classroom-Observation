
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoleContext } from '../App';
import { UserRole } from '../types';
import { COURSES, CURRENT_USER } from '../services/mockData';
import { 
  ClipboardCheck, 
  Eye, 
  MessageSquare, 
  BookOpen, 
  CalendarCheck, 
  BarChart2, 
  PenTool,
  Radio,
  MapPin,
  Clock,
  MoreHorizontal,
  ChevronRight,
  LogIn,
  PlayCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface FeatureCardProps {
  to: string;
  icon: any;
  label: string;
  color: string;
  onClick?: () => void;
  large?: boolean; // New prop for larger cards for seniors
}

const FeatureCard: React.FC<FeatureCardProps> = ({ to, icon: Icon, label, color, onClick, large }) => {
  // Larger padding and text for senior accessibility
  const baseClassName = `bg-white rounded-xl shadow-sm flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform border border-gray-100 ${large ? 'p-6' : 'p-4'}`;
  
  const content = (
    <>
      <div className={`rounded-full ${color} text-white shadow-md ${large ? 'p-4' : 'p-3'}`}>
        <Icon size={large ? 32 : 24} />
      </div>
      <span className={`${large ? 'text-base' : 'text-sm'} font-bold text-gray-700`}>{label}</span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`w-full ${baseClassName}`}>
        {content}
      </button>
    );
  }

  return (
    <Link to={to} className={baseClassName}>
      {content}
    </Link>
  );
};

// ... (StudentHome remains same, omitting for brevity)
const StudentHome = () => {
  const navigate = useNavigate();
  const activeCourse = COURSES.find(c => c.status === 'active') || COURSES[0];
  return (
    <div className="p-4 space-y-6">
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
         <div>
            <h2 className="text-xl font-bold text-gray-800">李同学</h2>
            <div className="text-sm text-gray-500 mt-1 space-y-0.5"><p>计算机科学与技术</p><p>2021级 3班</p></div>
         </div>
         <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">李</div>
      </div>
      <div>
        <h3 className="font-bold text-gray-800 mb-3 pl-1 flex items-center gap-2"><span className="w-1 h-4 bg-indigo-600 rounded-full"></span>正在上课</h3>
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full transform translate-x-10 -translate-y-10"></div>
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                 <div><h2 className="text-2xl font-bold">{activeCourse.name}</h2><p className="text-indigo-100 mt-1 flex items-center gap-2"><span className="bg-white/20 px-2 py-0.5 rounded text-xs">{activeCourse.teacher}</span><span className="flex items-center gap-1 text-sm"><MapPin size={14}/> {activeCourse.location}</span></p></div>
                 <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium animate-pulse">进行中</div>
              </div>
              <div className="flex gap-3 mt-6">
                 <button onClick={() => navigate('/sign-in')} className="flex-1 bg-white text-indigo-700 py-3 rounded-xl font-bold shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-2"><MapPin size={18} /> 点击签到</button>
                 <button onClick={() => navigate(`/classroom/${activeCourse.id}`)} className="flex-1 bg-indigo-800/50 text-white border border-indigo-400/30 py-3 rounded-xl font-bold shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-2"><LogIn size={18} /> 进入课堂</button>
              </div>
           </div>
        </div>
      </div>
      <div>
         <div className="flex justify-between items-center mb-3 px-1"><h3 className="font-bold text-gray-800">今日课程</h3><span className="text-xs text-gray-400">{new Date().toLocaleDateString()} 周五</span></div>
         <div className="space-y-3">{COURSES.map((course) => (<div key={course.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"><div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-50 rounded-lg shrink-0 text-gray-500"><Clock size={18} /></div><div className="flex-1 min-w-0"><h4 className="font-bold text-gray-800 truncate">{course.name}</h4><p className="text-xs text-gray-500 mt-1 truncate">{course.time} | {course.location}</p></div><div className={`text-xs px-2 py-1 rounded font-medium shrink-0 ${course.status === 'active' ? 'bg-indigo-50 text-indigo-600' : course.status === 'finished' ? 'bg-gray-100 text-gray-400' : 'bg-orange-50 text-orange-600'}`}>{course.status === 'active' ? '上课中' : course.status === 'finished' ? '已结束' : '未开始'}</div></div>))}</div>
      </div>
      <div>
         <h3 className="font-bold text-gray-800 mb-3 pl-1">课堂工具</h3>
         <div className="grid grid-cols-4 gap-3">
            <FeatureCard to="/attendance" icon={CalendarCheck} label="签到记录" color="bg-emerald-500" />
            <FeatureCard to="/evaluation?view=stats" icon={MessageSquare} label="课堂反馈" color="bg-blue-500" />
            <FeatureCard to="/evaluation?view=rating" icon={BarChart2} label="随堂评教" color="bg-indigo-500" />
            <FeatureCard to="/" icon={MoreHorizontal} label="更多" color="bg-gray-400" />
         </div>
      </div>
    </div>
  );
};

// Staff Dashboard (Teacher / Supervisor)
const StaffDashboard = () => {
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  
  // Teachers Courses Filter
  const myCourses = COURSES.filter(c => c.teacher === CURRENT_USER.name || role === UserRole.SUPERVISOR);
  // Find next class for teacher
  const upcomingCourse = myCourses.find(c => c.status === 'upcoming') || myCourses[0];

  // --- Supervisor Specific Dashboard ---
  if (role === UserRole.SUPERVISOR) {
    const activeClasses = COURSES.filter(c => c.status === 'active');
    
    return (
        <div className="p-4 space-y-6">
            {/* 1. Large Welcome Banner for Seniors */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-l-8 border-indigo-600 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">李督导，您好</h1>
                    <p className="text-gray-500 text-base">{new Date().toLocaleDateString()} 星期五</p>
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <UserRoleIcon role={UserRole.SUPERVISOR} size={32} />
                </div>
            </div>

            {/* 2. Task Stats - High Contrast, Big Numbers */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-blue-700 mb-1">3</span>
                    <span className="text-gray-600 font-medium">今日待听课</span>
                </div>
                <div className="bg-green-50 rounded-xl p-5 border border-green-100 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-green-700 mb-1">1</span>
                    <span className="text-gray-600 font-medium">已完成报告</span>
                </div>
            </div>

            {/* 3. Priority Task List - "Go To Class" */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <AlertCircle className="text-indigo-600" /> 正在进行的课程 (建议巡查)
                </h2>
                <div className="space-y-4">
                    {activeClasses.length > 0 ? activeClasses.map(course => (
                        <div key={course.id} className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                                    <p className="text-base text-gray-600 mt-1">{course.location}</p>
                                </div>
                                <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                                    上课中
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 mb-4">
                                <span className="bg-gray-100 px-2 py-1 rounded text-sm">教师：{course.teacher}</span>
                                <span className="bg-gray-100 px-2 py-1 rounded text-sm">班级：{course.class_name}</span>
                            </div>
                            <button 
                                onClick={() => navigate('/supervision')} // Direct to supervision page
                                className="w-full bg-indigo-600 text-white text-lg font-bold py-3 rounded-xl shadow-sm active:bg-indigo-700 flex items-center justify-center gap-2"
                            >
                                <PlayCircle size={24} /> 进入听课 / 评价
                            </button>
                        </div>
                    )) : (
                        <div className="bg-gray-50 p-6 rounded-xl text-center text-gray-500 text-lg">
                            当前没有正在进行的课程
                        </div>
                    )}
                </div>
            </div>

            {/* 4. Common Tools - Large Buttons */}
            <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">常用功能</h2>
                <div className="grid grid-cols-2 gap-4">
                    <FeatureCard to="/patrol" icon={Eye} label="在线巡课" color="bg-blue-600" large />
                    <FeatureCard to="/supervision" icon={ClipboardCheck} label="全部课表" color="bg-purple-600" large />
                </div>
            </div>
        </div>
    );
  }

  // --- Teacher Dashboard (Existing) ---
  const getFeatures = () => {
    const common = [
      { to: '/live', icon: Radio, label: '直播讲座', color: 'bg-rose-500' },
    ];
    return [
        { to: '/attendance', icon: CalendarCheck, label: '考勤管理', color: 'bg-emerald-500' },
        { to: '/homework', icon: BookOpen, label: '作业管理', color: 'bg-orange-500' },
        { to: '/stats', icon: PenTool, label: '测验管理', color: 'bg-sky-500' },
        { to: '/evaluation', icon: MessageSquare, label: '随堂评教', color: 'bg-indigo-500' },
        ...common
    ];
  };

  return (
    <div className="p-4 space-y-6">
      {/* 1. Teacher Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
          <div className="p-5 relative z-10">
              <div className="flex justify-between items-start mb-4">
                  <div>
                      <h2 className="text-xl font-bold text-gray-800">早上好，{CURRENT_USER.name}</h2>
                      <p className="text-sm text-gray-500 mt-1">数学与统计学院</p>
                  </div>
                  <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                      第 8 周
                  </div>
              </div>
              
              {/* Next Class Action Card */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl p-4 text-white shadow-lg flex justify-between items-center">
                  <div>
                      <div className="text-indigo-100 text-xs mb-1">即将开始 (10:00)</div>
                      <div className="font-bold text-lg">{upcomingCourse?.name}</div>
                      <div className="text-xs text-indigo-100 opacity-90 mt-1">{upcomingCourse?.location} | {upcomingCourse?.class_name}</div>
                  </div>
                  <button 
                     onClick={() => navigate(`/classroom/${upcomingCourse?.id}`)}
                     className="bg-white text-indigo-600 p-3 rounded-full shadow-sm active:scale-95 transition-transform"
                  >
                      <PlayCircle size={24} fill="currentColor" className="text-white" />
                  </button>
              </div>
          </div>
      </div>

      {/* 2. Today's Schedule */}
      <div>
             <div className="flex justify-between items-center mb-3 px-1">
                <h3 className="font-bold text-gray-800">今日课程 (3)</h3>
                <Link to="/schedule" className="text-xs text-indigo-600 font-medium">查看完整课表 &rarr;</Link>
             </div>
             <div className="space-y-3">
                {myCourses.map((course) => (
                   <div key={course.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 active:scale-98 transition-transform">
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-indigo-50 rounded-lg shrink-0 text-indigo-600">
                          <Clock size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 truncate">{course.name}</h4>
                          <p className="text-xs text-gray-500 mt-1 truncate">{course.class_name} | {course.location}</p>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded font-medium shrink-0 
                          ${course.status === 'active' ? 'bg-indigo-600 text-white' : 
                            'bg-gray-100 text-gray-400'}`}>
                          {course.status === 'active' ? '上课中' : course.time.split(' ')[0]}
                      </div>
                   </div>
                ))}
             </div>
      </div>

      {/* 3. Workbench Grid */}
      <div>
        <h3 className="text-base font-bold text-gray-800 mb-4 px-1">常用工具</h3>
        <div className="grid grid-cols-3 gap-3">
          {getFeatures().map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper Icon for Supervisor
const UserRoleIcon = ({ role, size }: { role: UserRole, size: number }) => {
    if (role === UserRole.SUPERVISOR) return <ClipboardCheck size={size} className="text-purple-600" />;
    return <Clock size={size} />;
}

const Dashboard = () => {
  const { role } = useContext(RoleContext);
  return role === UserRole.STUDENT ? <StudentHome /> : <StaffDashboard />;
};

export default Dashboard;

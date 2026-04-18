
import React, { useContext, useState } from 'react';
import { RoleContext } from '../App';
import { UserRole, AttendanceRecord } from '../types';
import { ATTENDANCE_RECORDS, ATTENDANCE_STATS, STUDENT_LIST } from '../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Search, MoreVertical, Check, X, Clock, RefreshCw, Send } from 'lucide-react';

const Attendance = () => {
  const { role } = useContext(RoleContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Teacher Logic: Mock updating status
  const [students, setStudents] = useState(STUDENT_LIST);

  const updateStatus = (id: string, newStatus: string) => {
      setStudents(prev => prev.map(s => s.id === id ? {...s, status: newStatus} : s));
  };

  const getStatusColor = (status: string) => {
      switch(status) {
          case 'present': return 'bg-green-100 text-green-700';
          case 'absent': return 'bg-red-100 text-red-700';
          case 'late': return 'bg-yellow-100 text-yellow-700';
          default: return 'bg-gray-100 text-gray-500';
      }
  };

  const getStatusText = (status: string) => {
       switch(status) {
          case 'present': return '已到';
          case 'absent': return '缺勤';
          case 'late': return '迟到';
          default: return '未知';
      }
  };

  const filteredStudents = students.filter(s => s.name.includes(searchTerm) || s.id.includes(searchTerm));

  // --- Student View ---
  if (role !== UserRole.TEACHER) {
      return (
        <div className="p-4 space-y-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 text-center">我的考勤统计</h3>
                <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={ATTENDANCE_STATS}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {ATTENDANCE_STATS.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div>
                 <h3 className="font-bold text-gray-800 mb-3 pl-1">考勤明细</h3>
                 <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 divide-y divide-gray-100">
                    {ATTENDANCE_RECORDS.map((item, idx) => (
                        <div key={idx} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-medium text-gray-800">{item.course}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded font-medium ${item.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {item.status === 'present' ? '已签到' : '异常'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
  }

  // --- Teacher View (New Design) ---
  return (
    <div className="flex flex-col h-screen bg-gray-50">
        {/* Header Summary */}
        <div className="bg-white p-4 border-b border-gray-200 sticky top-14 z-10 shadow-sm">
             <div className="flex justify-between items-center mb-4">
                 <div>
                     <h2 className="text-lg font-bold text-gray-800">高等数学 (上)</h2>
                     <p className="text-xs text-gray-500">应到 45 人 | 实到 {students.filter(s => s.status === 'present').length} 人</p>
                 </div>
                 <div className="flex gap-2">
                     <button className="bg-indigo-50 text-indigo-600 p-2 rounded-lg text-xs font-bold flex items-center gap-1">
                         <RefreshCw size={14} /> 刷新
                     </button>
                     <button className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                         <Send size={14} /> 提醒未到
                     </button>
                 </div>
             </div>
             
             {/* Search */}
             <div className="relative">
                 <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                 <input 
                    type="text" 
                    placeholder="搜索姓名或学号..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                 />
             </div>
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
            {filteredStudents.map((student) => (
                <div key={student.id} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={student.avatar} alt="avatar" className="w-10 h-10 rounded-full bg-gray-100" />
                        <div>
                            <div className="font-bold text-gray-800 text-sm">{student.name}</div>
                            <div className="text-xs text-gray-400">{student.id}</div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {/* Status Toggle Buttons */}
                        <div className="flex bg-gray-100 rounded-lg p-1 gap-1">
                            <button 
                                onClick={() => updateStatus(student.id, 'present')}
                                className={`p-1.5 rounded ${student.status === 'present' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400'}`}
                            >
                                <Check size={16} />
                            </button>
                            <button 
                                onClick={() => updateStatus(student.id, 'late')}
                                className={`p-1.5 rounded ${student.status === 'late' ? 'bg-white text-yellow-600 shadow-sm' : 'text-gray-400'}`}
                            >
                                <Clock size={16} />
                            </button>
                            <button 
                                onClick={() => updateStatus(student.id, 'absent')}
                                className={`p-1.5 rounded ${student.status === 'absent' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-400'}`}
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded font-bold w-12 text-center ${getStatusColor(student.status)}`}>
                            {getStatusText(student.status)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Attendance;

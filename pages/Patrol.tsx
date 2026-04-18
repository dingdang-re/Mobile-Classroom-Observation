import React, { useState } from 'react';
import { MapPin, List, Video, Search, PieChart as PieIcon, MessageSquare, Star } from 'lucide-react';
import { COURSES, PATROL_STATS } from '../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const Patrol = () => {
  const [mode, setMode] = useState<'list' | 'map' | 'stats'>('list');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col">
      {/* Mode Switcher */}
      <div className="bg-white p-2 flex border-b border-gray-200">
        <div className="flex bg-gray-100 rounded-lg p-1 w-full">
          <button 
            onClick={() => setMode('list')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${mode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
          >
            <List size={16} /> 列表
          </button>
          <button 
            onClick={() => setMode('map')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${mode === 'map' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
          >
            <MapPin size={16} /> 地图
          </button>
           <button 
            onClick={() => setMode('stats')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${mode === 'stats' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
          >
            <PieIcon size={16} /> 统计
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {mode === 'list' && (
          <div className="space-y-4">
            <div className="relative">
               <Search className="absolute left-3 top-3 text-gray-400" size={18} />
               <input type="text" placeholder="搜索班级、教师或课程" className="w-full bg-white border border-gray-200 pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

            {COURSES.map(course => (
              <div key={course.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{course.location}</h3>
                    <p className="text-sm text-gray-500 mt-1">{course.name}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${course.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {course.status === 'active' ? '授课中' : '休息中'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{course.teacher}</span>
                  <span>{course.class_name}</span>
                </div>
                {course.status === 'active' && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                    <button className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                      <Video size={16} /> 进入直播
                    </button>
                    <button 
                      onClick={() => setSelectedCourse(course.id)}
                      className="flex-1 bg-gray-50 text-gray-600 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <MessageSquare size={16} /> 快速反馈
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {mode === 'map' && (
          <div className="h-[70vh] bg-gray-200 rounded-xl relative overflow-hidden flex items-center justify-center">
             {/* Mock Map */}
             <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
             <div className="z-10 text-center">
                <MapPin size={48} className="mx-auto text-indigo-500 mb-2 animate-bounce" />
                <p className="text-gray-500 font-medium">校园地图加载中...</p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                    <div className="bg-white p-3 rounded-lg shadow-lg">
                        <div className="text-xs text-gray-500">一号教学楼</div>
                        <div className="font-bold text-green-600">12 间活跃</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-lg">
                        <div className="text-xs text-gray-500">实验楼</div>
                        <div className="font-bold text-green-600">8 间活跃</div>
                    </div>
                </div>
             </div>
          </div>
        )}

        {mode === 'stats' && (
            <div className="space-y-4">
                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-2">巡课覆盖率</h3>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-indigo-600">92%</span>
                        <span className="text-sm text-gray-400 mb-1">本月累计</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full mt-2 overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{width: '92%'}}></div>
                    </div>
                 </div>

                 <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-64">
                    <h3 className="font-bold text-gray-800 mb-4">课堂问题分布</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={PATROL_STATS}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {PATROL_STATS.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" />
                        </PieChart>
                    </ResponsiveContainer>
                 </div>
            </div>
        )}
      </div>

      {/* Feedback Modal Mock */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-2xl p-6 animate-in zoom-in duration-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">巡课反馈</h3>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600 block mb-2">课堂评分</label>
                        <div className="flex gap-2">
                            {[1,2,3,4,5].map(s => <Star key={s} className="text-yellow-400 fill-yellow-400" size={24} />)}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm text-gray-600 block mb-2">反馈内容</label>
                        <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-24 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="请输入反馈意见..."></textarea>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setSelectedCourse(null)} className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium">取消</button>
                        <button onClick={() => setSelectedCourse(null)} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium">提交反馈</button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Patrol;
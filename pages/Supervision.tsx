import React, { useState } from 'react';
import { Calendar, MapPin, User, Search, Filter, PlayCircle, FileText, Camera } from 'lucide-react';
import { COURSES } from '../services/mockData';

const Supervision = () => {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeCourse, setActiveCourse] = useState<any>(null);

  if (isEvaluating && activeCourse) {
      return (
          <div className="p-4 space-y-6 pb-24">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="font-bold text-lg text-gray-800 mb-1">{activeCourse.name}</h2>
                  <p className="text-sm text-gray-500">{activeCourse.teacher} | {activeCourse.location}</p>
                  <div className="mt-3 flex gap-2">
                       <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">已上课 15分钟</span>
                  </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-4">
                  <h3 className="font-bold text-gray-800">听课评价表</h3>
                  
                  {[
                      '教学态度 (20分)',
                      '教学内容 (30分)',
                      '教学方法 (30分)',
                      '教学效果 (20分)'
                  ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                          <div className="flex justify-between text-sm text-gray-700">
                              <span>{item}</span>
                              <span className="font-bold text-indigo-600">__ / {item.match(/\d+/)?.[0]}</span>
                          </div>
                          <input type="range" className="w-full accent-indigo-600" />
                      </div>
                  ))}

                  <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">综合评价</label>
                      <textarea className="w-full border border-gray-200 rounded-lg p-3 text-sm h-24 outline-none" placeholder="请输入具体的听课意见..."></textarea>
                  </div>

                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">现场照片</label>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg h-20 flex items-center justify-center text-gray-400 gap-2 cursor-pointer bg-gray-50">
                          <Camera size={20} />
                          <span className="text-xs">点击上传现场照片</span>
                      </div>
                  </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex gap-3 z-50">
                  <button onClick={() => setIsEvaluating(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold">暂存</button>
                  <button onClick={() => setIsEvaluating(false)} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg">提交评价</button>
              </div>
          </div>
      )
  }

  return (
    <div className="p-4 space-y-4">
      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-50">
           <Filter size={16} className="text-indigo-600" />
           <span className="font-bold text-gray-800 text-sm">筛选条件</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
                <label className="text-xs text-gray-400">听课时间</label>
                <div className="relative">
                    <Calendar size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                    <input 
                        type="date" 
                        className="w-full bg-white text-gray-800 text-sm pl-8 pr-2 py-2 rounded border border-gray-200" 
                    />
                </div>
            </div>
             <div className="space-y-1">
                <label className="text-xs text-gray-500">教学楼/教室</label>
                <div className="relative">
                    <MapPin size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                    <select className="w-full bg-white text-gray-800 text-sm pl-8 pr-2 py-2 rounded border border-gray-200 appearance-none">
                        <option>全部校区</option>
                        <option>一号教学楼</option>
                        <option>实验楼</option>
                    </select>
                </div>
            </div>
        </div>

        <div className="space-y-1">
             <label className="text-xs text-gray-500">课程搜索</label>
             <div className="relative">
                <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                <input type="text" placeholder="输入教师名称或课程名称" className="w-full bg-white border border-gray-200 pl-8 pr-4 py-2 rounded text-sm focus:outline-none focus:border-indigo-500" />
             </div>
        </div>
      </div>

      {/* Results */}
      <h3 className="text-sm font-bold text-gray-600 pl-1">可评课程 ({COURSES.length})</h3>
      <div className="space-y-3">
        {COURSES.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                         <h4 className="font-bold text-gray-800">{course.name}</h4>
                         <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">进行中</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mt-3">
                        <div className="flex items-center gap-1.5">
                             <User size={14} className="text-gray-400" />
                             <span>{course.teacher}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                             <MapPin size={14} className="text-gray-400" />
                             <span>{course.location}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex justify-between items-center">
                    <button className="text-gray-500 text-sm flex items-center gap-1">
                        <FileText size={14}/> 历史记录
                    </button>
                    <button 
                        onClick={() => { setActiveCourse(course); setIsEvaluating(true); }}
                        className="bg-indigo-600 text-white text-sm px-5 py-1.5 rounded-full shadow-sm active:bg-indigo-700 flex items-center gap-2"
                    >
                        <PlayCircle size={14} /> 开始听课
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Supervision;
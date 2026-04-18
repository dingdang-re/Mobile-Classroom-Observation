
import React, { useState } from 'react';
import { QUIZ_STATS, QUIZ_SUBMISSIONS } from '../services/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { Clock, Users, Target, BookOpen, Plus, MoreHorizontal, ChevronRight, AlertCircle, Edit3, Check, X } from 'lucide-react';

const Stats = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'grading' | 'history'>('active');

  const WRONG_TOPICS = [
      { topic: '洛必达法则的使用条件', errorRate: 65 },
      { topic: '复合函数求导链式法则', errorRate: 42 },
      { topic: '极值点的判断', errorRate: 38 },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
        {/* Header Tabs */}
        <div className="bg-white p-2 border-b border-gray-200 sticky top-14 z-10">
            <div className="flex bg-gray-100 rounded-xl p-1">
                <button 
                    onClick={() => setActiveTab('active')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'active' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
                >
                    进行中
                </button>
                 <button 
                    onClick={() => setActiveTab('grading')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all relative ${activeTab === 'grading' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
                >
                    主观题批改
                    <span className="absolute top-2 right-3 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <button 
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'history' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
                >
                    学情分析
                </button>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
            {activeTab === 'active' ? (
                <>
                    {/* Active Quiz Card */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 border-l-4 border-l-green-500">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">随堂测验：第三章导数</h3>
                                <p className="text-xs text-gray-500 mt-1">发布于 10:15 | 限时 10分钟</p>
                            </div>
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold animate-pulse">
                                进行中
                            </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="text-center p-3 bg-gray-50 rounded-xl">
                                <div className="text-xs text-gray-500 mb-1">已提交</div>
                                <div className="font-bold text-gray-800 text-lg">42<span className="text-xs text-gray-400">/45</span></div>
                            </div>
                             <div className="text-center p-3 bg-gray-50 rounded-xl">
                                <div className="text-xs text-gray-500 mb-1">平均分</div>
                                <div className="font-bold text-indigo-600 text-lg">85</div>
                            </div>
                             <div className="text-center p-3 bg-gray-50 rounded-xl">
                                <div className="text-xs text-gray-500 mb-1">正确率</div>
                                <div className="font-bold text-green-600 text-lg">76%</div>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            <button className="flex-1 border border-red-200 text-red-600 py-2.5 rounded-lg text-sm font-bold">停止测验</button>
                            <button className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-bold shadow-md">查看详情</button>
                        </div>
                    </div>

                    {/* Create New */}
                    <button className="w-full bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 gap-2 hover:bg-gray-50 transition-colors">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                            <Plus size={24} />
                        </div>
                        <span className="font-bold">发布新的随堂练习</span>
                    </button>
                    
                    {/* Recent History List */}
                    <div>
                        <h3 className="font-bold text-gray-800 mb-3 pl-1">最近记录</h3>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                             {[1, 2].map((i) => (
                                 <div key={i} className="p-4 flex items-center justify-between">
                                     <div>
                                         <div className="font-bold text-gray-800 text-sm">第二章 极限运算</div>
                                         <div className="text-xs text-gray-400 mt-1">2023-10-20 | 45人已完成</div>
                                     </div>
                                     <ChevronRight size={16} className="text-gray-400" />
                                 </div>
                             ))}
                        </div>
                    </div>
                </>
            ) : activeTab === 'grading' ? (
                /* --- Quiz Grading Tab --- */
                <div className="space-y-4 animate-in slide-in-from-right">
                    <div className="bg-blue-50 p-3 rounded-lg flex items-start gap-3 border border-blue-100">
                        <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={18} />
                        <div className="text-sm text-blue-800">
                            <span className="font-bold">提示:</span> 只有主观简答题需要人工批改。客观选择题已由系统自动判分。
                        </div>
                    </div>

                    {QUIZ_SUBMISSIONS.map((sub, idx) => (
                        <div key={sub.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                             <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-2">
                                 <div>
                                     <div className="font-bold text-gray-800">{sub.quizTitle}</div>
                                     <div className="text-xs text-gray-500">{sub.studentName}</div>
                                 </div>
                                  <span className={`px-2 py-1 rounded text-xs font-bold 
                                       ${sub.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                                       {sub.status === 'pending' ? '待批改' : `得分: ${sub.score}`}
                                   </span>
                             </div>

                             <div className="mb-4">
                                 <div className="text-sm font-bold text-gray-700 mb-1">问题:</div>
                                 <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded mb-3">{sub.question}</div>
                                 <div className="text-sm font-bold text-gray-700 mb-1">学生回答:</div>
                                 <div className="text-sm text-gray-800 p-2 border-l-4 border-indigo-200 pl-3">
                                     {sub.answer}
                                 </div>
                             </div>

                             {sub.status === 'pending' && (
                                 <div className="flex items-center gap-2 pt-2">
                                     <input type="number" placeholder="打分" className="w-20 border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                                     <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm active:bg-indigo-700">确认</button>
                                     <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-bold">暂过</button>
                                 </div>
                             )}
                        </div>
                    ))}
                    
                    {QUIZ_SUBMISSIONS.filter(s => s.status === 'pending').length === 0 && (
                        <div className="text-center py-10 text-gray-400">
                            <Check size={48} className="mx-auto mb-2 text-green-200" />
                            <p>所有题目已批改完成</p>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {/* Knowledge Gap Analysis */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <AlertCircle size={18} className="text-orange-500" />
                            知识点薄弱项分析
                        </h3>
                        <div className="space-y-4">
                            {WRONG_TOPICS.map((item, idx) => (
                                <div key={idx}>
                                     <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-700">{item.topic}</span>
                                        <span className="font-bold text-red-500">{item.errorRate}% 错误</span>
                                     </div>
                                     <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-red-500 h-full rounded-full" style={{width: `${item.errorRate}%`}}></div>
                                     </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 bg-orange-50 text-orange-600 py-2 rounded-lg text-sm font-bold">针对性推送练习</button>
                    </div>

                    {/* Score Distribution */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 h-64">
                         <h3 className="font-bold text-gray-800 mb-2">本月成绩分布趋势</h3>
                         <ResponsiveContainer width="100%" height="100%">
                             <LineChart data={[
                                 {name: 'W1', score: 75}, {name: 'W2', score: 82}, {name: 'W3', score: 78}, {name: 'W4', score: 85}
                             ]}>
                                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                 <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                 <YAxis hide domain={[60, 100]} />
                                 <Tooltip />
                                 <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={{r:4}} />
                             </LineChart>
                         </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    </div>
  );
};

export default Stats;

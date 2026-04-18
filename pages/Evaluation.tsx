import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RoleContext } from '../App';
import { UserRole } from '../types';
import { EVALUATIONS, QUIZ_STATS } from '../services/mockData';
import { Clock, Users, ChevronRight, BarChart, Send, Target, Award, Timer, Star, CheckCircle } from 'lucide-react';
import { BarChart as RechartsBar, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const Evaluation = () => {
  const { role } = useContext(RoleContext);
  const [searchParams] = useSearchParams();
  const initialView = searchParams.get('view') === 'rating' ? 'rating' : 'stats';
  
  // Teacher State
  const [activeTab, setActiveTab] = useState<'create' | 'live'>('create');
  
  // Student State
  const [studentView, setStudentView] = useState<'stats' | 'rating'>(initialView);
  const [selectedEvaluationId, setSelectedEvaluationId] = useState<string | null>(null);
  const [ratingScore, setRatingScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock live comments
  const [comments, setComments] = useState<string[]>(['老师讲得很清楚！', '这道题不太懂...', '节奏稍微有点快']);
  
  useEffect(() => {
    if(activeTab === 'live') {
        const interval = setInterval(() => {
             const newComments = ['互动很有趣', '希望多讲点例题', '这里听明白了'];
             setComments(prev => [...prev, newComments[Math.floor(Math.random() * newComments.length)]]);
        }, 3000);
        return () => clearInterval(interval);
    }
  }, [activeTab]);

  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'rating' || view === 'stats') {
      setStudentView(view);
    }
  }, [searchParams]);

  // --- Student View: Rating Form Sub-component ---
  const RatingForm = ({ evaluationId, onBack }: { evaluationId: string, onBack: () => void }) => {
     const evalItem = EVALUATIONS.find(e => e.id === evaluationId);
     
     if (isSubmitted) {
         return (
             <div className="flex flex-col items-center justify-center py-12 animate-in zoom-in">
                 <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                     <CheckCircle size={40} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-800">评价提交成功</h3>
                 <p className="text-gray-500 mt-2 mb-6">感谢您的反馈，您的意见对我们很重要</p>
                 <button onClick={onBack} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold">返回列表</button>
             </div>
         )
     }

     return (
         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-in slide-in-from-right">
             <div className="mb-6 border-b border-gray-100 pb-4">
                 <h3 className="font-bold text-lg text-gray-800">{evalItem?.courseName} - 随堂评教</h3>
                 <p className="text-sm text-gray-500 mt-1">请根据本堂课的实际感受进行客观评价</p>
             </div>

             <div className="space-y-6">
                 <div>
                     <label className="block text-sm font-bold text-gray-700 mb-3">总体评分</label>
                     <div className="flex gap-4">
                         {[1, 2, 3, 4, 5].map((star) => (
                             <button 
                                key={star}
                                onClick={() => setRatingScore(star)}
                                className="transition-transform active:scale-110 focus:outline-none"
                             >
                                 <Star 
                                    size={32} 
                                    className={`${ratingScore >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-100'}`} 
                                 />
                             </button>
                         ))}
                     </div>
                     <p className="text-xs text-indigo-600 font-medium mt-2 h-4">
                        {ratingScore === 1 && "非常不满意"}
                        {ratingScore === 2 && "不满意"}
                        {ratingScore === 3 && "一般"}
                        {ratingScore === 4 && "满意"}
                        {ratingScore === 5 && "非常满意"}
                     </p>
                 </div>

                 <div>
                     <label className="block text-sm font-bold text-gray-700 mb-3">您的建议 (可选)</label>
                     <textarea 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        rows={4}
                        placeholder="老师讲得怎么样？有什么建议吗？"
                     ></textarea>
                 </div>

                 <div className="flex gap-3 pt-2">
                     <button onClick={onBack} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold">取消</button>
                     <button 
                        disabled={ratingScore === 0}
                        onClick={() => setIsSubmitted(true)}
                        className={`flex-1 py-3 rounded-xl font-bold text-white transition-all
                            ${ratingScore === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'}
                        `}
                     >
                         提交评价
                     </button>
                 </div>
             </div>
         </div>
     )
  }

  // --- Student View Main ---
  if (role === UserRole.STUDENT) {
    const activeEvaluations = EVALUATIONS.filter(e => e.status === 'active');

    return (
        <div className="p-4 space-y-4">
            {/* Student Tabs */}
            <div className="bg-white p-1.5 rounded-xl border border-gray-100 flex shadow-sm mb-4">
                <button 
                    onClick={() => { setStudentView('stats'); setSelectedEvaluationId(null); setIsSubmitted(false); }}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all
                        ${studentView === 'stats' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500'}
                    `}
                >
                    课堂数据
                </button>
                <button 
                    onClick={() => { setStudentView('rating'); setSelectedEvaluationId(null); setIsSubmitted(false); }}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all
                        ${studentView === 'rating' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-gray-500'}
                    `}
                >
                    随堂评教
                </button>
            </div>

            {studentView === 'stats' ? (
                /* --- Classroom Data Stats View --- */
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                    {/* Header Summary */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                            今日课堂数据
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-blue-50 rounded-xl p-3 flex flex-col items-center justify-center text-blue-700">
                                <Target size={24} className="mb-1 opacity-80" />
                                <span className="text-2xl font-bold">85<span className="text-xs">%</span></span>
                                <span className="text-[10px] opacity-70">正确率</span>
                            </div>
                            <div className="bg-orange-50 rounded-xl p-3 flex flex-col items-center justify-center text-orange-700">
                                <Award size={24} className="mb-1 opacity-80" />
                                <span className="text-2xl font-bold">92</span>
                                <span className="text-[10px] opacity-70">习题得分</span>
                            </div>
                            <div className="bg-green-50 rounded-xl p-3 flex flex-col items-center justify-center text-green-700">
                                <Timer size={24} className="mb-1 opacity-80" />
                                <span className="text-2xl font-bold">12<span className="text-xs">m</span></span>
                                <span className="text-[10px] opacity-70">答题用时</span>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Stats */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-2">知识点掌握情况</h3>
                        <p className="text-xs text-gray-400 mb-4">基于今日随堂练习生成</p>
                        
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>微积分基本定理</span>
                                    <span className="font-bold text-green-600">熟练</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[90%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>定积分计算</span>
                                    <span className="font-bold text-yellow-600">良好</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-400 w-[75%] rounded-full"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span>换元积分法</span>
                                    <span className="font-bold text-red-500">薄弱</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-400 w-[45%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Answer Distribution */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 h-64">
                        <h3 className="font-bold text-gray-800 mb-4">全班答题分布</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsBar data={QUIZ_STATS}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {QUIZ_STATS.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 1 ? '#4ade80' : '#e2e8f0'} /> 
                                    ))}
                                </Bar>
                            </RechartsBar>
                        </ResponsiveContainer>
                        <div className="text-center text-xs text-gray-400 mt-2">您的选项: <span className="text-green-600 font-bold">B (正确)</span></div>
                    </div>
                </div>
            ) : (
                /* --- Classroom Evaluation View --- */
                <div className="animate-in fade-in slide-in-from-bottom-2">
                    {selectedEvaluationId ? (
                        <RatingForm evaluationId={selectedEvaluationId} onBack={() => { setSelectedEvaluationId(null); setIsSubmitted(false); }} />
                    ) : (
                        <>
                            <div className="bg-indigo-50 rounded-xl p-4 mb-4 border border-indigo-100 flex items-start gap-3">
                                <BarChart className="text-indigo-600 shrink-0 mt-0.5" size={20} />
                                <div>
                                    <h4 className="font-bold text-indigo-900 text-sm">什么是随堂评教？</h4>
                                    <p className="text-xs text-indigo-700 mt-1 leading-relaxed opacity-80">
                                        随堂评教是您对老师当堂授课质量的即时反馈。老师发起评教后，您可以对教学态度、内容等进行评分。您的评价将匿名提交。
                                    </p>
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-800 mb-3 pl-1 flex items-center gap-2">
                                <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
                                进行中的评教
                            </h3>

                            {activeEvaluations.length > 0 ? (
                                <div className="space-y-3">
                                    {activeEvaluations.map(evalItem => (
                                        <div key={evalItem.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-gray-800 text-lg">{evalItem.courseName}</h4>
                                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold animate-pulse">进行中</span>
                                            </div>
                                            <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                                                <Clock size={14} /> 截止时间: {evalItem.endTime}
                                            </div>
                                            <button 
                                                onClick={() => { setSelectedEvaluationId(evalItem.id); setRatingScore(0); }}
                                                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-md active:bg-indigo-700 flex items-center justify-center gap-2"
                                            >
                                                <Star size={18} /> 立即评价
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-3">
                                        <BarChart size={32} />
                                    </div>
                                    <p className="text-gray-400 font-medium">暂无进行中的评教</p>
                                    <p className="text-gray-300 text-xs mt-1">请等待老师发起...</p>
                                </div>
                            )}

                             <div className="mt-8">
                                <h3 className="font-bold text-gray-800 mb-3 pl-1 opacity-60">历史评教记录</h3>
                                {EVALUATIONS.filter(e => e.status === 'closed').map(ev => (
                                    <div key={ev.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center mb-2 opacity-70">
                                        <div>
                                            <div className="font-bold text-gray-600">{ev.courseName}</div>
                                            <div className="text-xs text-gray-400">已结束</div>
                                        </div>
                                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">已评价</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
  }

  // --- Teacher View (Original Logic) ---
  return (
    <div className="p-4 space-y-6">
      {EVALUATIONS.some(e => e.status === 'active') && activeTab === 'create' ? (
          <div className="bg-indigo-600 rounded-xl p-4 text-white shadow-lg flex justify-between items-center" onClick={() => setActiveTab('live')}>
              <div>
                  <h3 className="font-bold">当前有正在进行的评教</h3>
                  <p className="text-indigo-200 text-sm">点击查看实时数据面板 &rarr;</p>
              </div>
              <BarChart size={32} className="text-indigo-200" />
          </div>
      ) : null}

      {activeTab === 'create' ? (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-indigo-600 rounded-full"></span>
                发起随堂评教
            </h3>
            
            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">1. 评教时长</label>
                    <div className="flex gap-2">
                        {[5, 10, 15].map(min => (
                            <button key={min} className="flex-1 border border-gray-200 py-2 rounded-lg text-sm text-gray-600 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                                {min}分钟
                            </button>
                        ))}
                    </div>
                </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">2. 评教维度</label>
                    <div className="space-y-2">
                         <label className="flex items-center p-3 border border-gray-200 rounded-lg">
                            <input type="checkbox" defaultChecked className="text-indigo-600 rounded mr-3" />
                            <span className="text-sm text-gray-700">教学满意度 (5星量表)</span>
                         </label>
                         <label className="flex items-center p-3 border border-gray-200 rounded-lg">
                            <input type="checkbox" defaultChecked className="text-indigo-600 rounded mr-3" />
                            <span className="text-sm text-gray-700">知识掌握程度 (选择题)</span>
                         </label>
                         <label className="flex items-center p-3 border border-gray-200 rounded-lg">
                            <input type="checkbox" className="text-indigo-600 rounded mr-3" />
                            <span className="text-sm text-gray-700">开放建议 (文本框)</span>
                         </label>
                    </div>
                </div>

                <button 
                    onClick={() => setActiveTab('live')}
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-md active:bg-indigo-700 transition-colors"
                >
                    立即发起
                </button>
            </div>
        </div>
      ) : (
        <div className="space-y-4">
             {/* Live Dashboard */}
             <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                 <div className="flex justify-between items-center mb-4">
                     <h3 className="font-bold text-gray-800">实时评教看板</h3>
                     <span className="text-red-500 text-sm font-mono font-bold flex items-center gap-1"><Clock size={14}/> 04:32</span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="bg-gray-50 p-3 rounded-xl text-center">
                         <div className="text-2xl font-bold text-indigo-600">85%</div>
                         <div className="text-xs text-gray-500">参评率</div>
                     </div>
                     <div className="bg-gray-50 p-3 rounded-xl text-center">
                         <div className="text-2xl font-bold text-yellow-500">4.8</div>
                         <div className="text-xs text-gray-500">平均得分</div>
                     </div>
                 </div>

                 {/* Rolling Comments */}
                 <div className="bg-gray-900 rounded-xl p-4 h-40 overflow-hidden relative">
                     <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>
                     <div className="space-y-2 mt-2">
                        {comments.slice(-5).map((c, i) => (
                             <div key={i} className="bg-gray-800/50 text-white text-xs px-3 py-2 rounded-full inline-block animate-in slide-in-from-bottom duration-500 mr-2">
                                 {c}
                             </div>
                        ))}
                     </div>
                     <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
                 </div>
                 
                 <div className="mt-4 flex gap-2">
                     <button className="flex-1 border border-gray-200 py-2 rounded-lg text-sm font-medium text-gray-600">提醒未交</button>
                     <button onClick={() => setActiveTab('create')} className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium">结束评教</button>
                 </div>
             </div>
        </div>
      )}

      {/* History List */}
      <div className="pt-4 border-t border-gray-200">
         <div className="flex justify-between items-center mb-3 px-1">
            <h3 className="font-bold text-gray-800">历史报告</h3>
            <button className="text-gray-500 text-xs flex items-center gap-1">
                更多 <ChevronRight size={12} />
            </button>
         </div>
         {EVALUATIONS.filter(e => e.status === 'closed').map(ev => (
             <div key={ev.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center mb-2">
                 <div>
                     <div className="font-bold text-gray-800">{ev.courseName}</div>
                     <div className="text-xs text-gray-400">2023-10-26 | 参评率 100%</div>
                 </div>
                 <button className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded text-xs font-medium">查看详情</button>
             </div>
         ))}
      </div>
    </div>
  );
};

export default Evaluation;
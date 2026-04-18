
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../App';
import { UserRole, Homework as HomeworkType } from '../types';
import { HOMEWORK_LIST, STUDENT_SUBMISSIONS } from '../services/mockData';
import { FileText, Paperclip, Upload, CheckCircle, Clock, AlertCircle, Eye, Download, X, Star, ChevronLeft, Plus, Users, Calendar, Filter, Edit3 } from 'lucide-react';

const Homework = () => {
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  
  // Student State
  const [activeTab, setActiveTab] = useState<'todo' | 'overdue' | 'history'>('todo');
  const [selectedHomework, setSelectedHomework] = useState<HomeworkType | null>(null);

  // Teacher State
  const [teacherTab, setTeacherTab] = useState<'publish' | 'grade'>('publish');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null); // For grading modal

  const TEACHING_CLASSES = ['计算机科学 2201班', '电子工程 2202班', '大数据 2101班'];

  const toggleClass = (className: string) => {
    setSelectedClasses(prev => 
      prev.includes(className) 
        ? prev.filter(c => c !== className) 
        : [...prev, className]
    );
  };

  // --- Teacher View ---
  if (role === UserRole.TEACHER) {
      return (
          <div className="flex flex-col h-screen bg-gray-50">
              {/* Teacher Header */}
              <div className="bg-white px-4 h-14 flex items-center border-b border-gray-200 sticky top-0 z-50">
                  <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 active:bg-gray-100 rounded-full">
                      <ChevronLeft size={24} />
                  </button>
                  <h1 className="flex-1 text-center font-bold text-lg pr-8">作业管理</h1>
              </div>

               {/* Teacher Tabs */}
               <div className="bg-white p-2 border-b border-gray-200">
                    <div className="flex bg-gray-100 rounded-xl p-1">
                        <button 
                            onClick={() => setTeacherTab('publish')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${teacherTab === 'publish' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            发布作业
                        </button>
                        <button 
                            onClick={() => setTeacherTab('grade')}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all relative ${teacherTab === 'grade' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
                        >
                            作业批改
                            <span className="absolute top-2 right-8 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {teacherTab === 'publish' ? (
                      /* --- Create Homework View --- */
                      <div className="space-y-6 animate-in slide-in-from-left">
                           {/* 1. Class Selection (Multi-select) */}
                          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                  <Users size={18} className="text-indigo-600"/> 发布对象 <span className="text-xs text-gray-400 font-normal">(可多选)</span>
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                  {TEACHING_CLASSES.map(cls => (
                                      <button
                                          key={cls}
                                          onClick={() => toggleClass(cls)}
                                          className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all flex items-center gap-2
                                              ${selectedClasses.includes(cls) 
                                                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                                                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}
                                          `}
                                      >
                                          {cls}
                                          {selectedClasses.includes(cls) && <CheckCircle size={14} />}
                                      </button>
                                  ))}
                              </div>
                          </div>

                          {/* 2. Basic Info Form */}
                          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
                              <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">作业标题</label>
                                  <input 
                                      type="text" 
                                      placeholder="例如：完成第三章微积分习题" 
                                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                                  />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                  <div>
                                      <label className="block text-sm font-bold text-gray-700 mb-2">所属课程</label>
                                      <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none">
                                          <option>高等数学 (上)</option>
                                          <option>线性代数</option>
                                      </select>
                                  </div>
                                  <div>
                                      <label className="block text-sm font-bold text-gray-700 mb-2">提交类型</label>
                                      <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 outline-none">
                                          <option>文件上传</option>
                                          <option>在线文本</option>
                                          <option>多媒体录制</option>
                                      </select>
                                  </div>
                              </div>

                              <div>
                                   <label className="block text-sm font-bold text-gray-700 mb-2">截止时间</label>
                                   <div className="relative">
                                       <Calendar size={18} className="absolute left-3 top-3 text-gray-400"/>
                                       <input type="datetime-local" className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-3 py-3 text-sm text-gray-900 outline-none" />
                                   </div>
                              </div>
                          </div>

                          {/* 3. Content & Attachments */}
                          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
                              <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">作业说明</label>
                                  <textarea 
                                      rows={5}
                                      placeholder="请输入具体的作业要求..." 
                                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                                  ></textarea>
                              </div>

                              <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">添加附件</label>
                                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 gap-2 cursor-pointer hover:bg-gray-50 hover:border-indigo-300 transition-colors">
                                      <Paperclip size={24} />
                                      <span className="text-xs">点击上传文件 (PDF, Word, PPT)</span>
                                  </div>
                              </div>
                          </div>

                          {/* Submit Bar */}
                          <div className="pt-4">
                              <button 
                                disabled={selectedClasses.length === 0}
                                className={`w-full py-3.5 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-colors
                                    ${selectedClasses.length > 0 ? 'bg-indigo-600 text-white active:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                                `}
                              >
                                  <Upload size={20} /> 发布作业 ({selectedClasses.length})
                              </button>
                          </div>
                      </div>
                  ) : (
                       /* --- Grading View --- */
                       <div className="space-y-4 animate-in slide-in-from-right">
                           <div className="flex justify-between items-center mb-2">
                               <h3 className="font-bold text-gray-800">待批改列表 ({STUDENT_SUBMISSIONS.filter(s => s.status === 'pending').length})</h3>
                               <button className="flex items-center gap-1 text-sm text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
                                   <Filter size={14} /> 筛选
                               </button>
                           </div>

                           {STUDENT_SUBMISSIONS.map((sub) => (
                               <div key={sub.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-3">
                                   <div className="flex justify-between items-start">
                                       <div className="flex items-center gap-3">
                                           <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                               {sub.studentName[0]}
                                           </div>
                                           <div>
                                               <div className="font-bold text-gray-800">{sub.studentName} <span className="text-gray-400 text-xs font-normal">| {sub.studentId}</span></div>
                                               <div className="text-xs text-gray-500 mt-0.5">{sub.submitTime} 提交</div>
                                           </div>
                                       </div>
                                       <span className={`px-2 py-1 rounded text-xs font-bold 
                                           ${sub.status === 'pending' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                                           {sub.status === 'pending' ? '待批改' : `${sub.score}分`}
                                       </span>
                                   </div>
                                   
                                   <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 border border-gray-100">
                                       <div className="font-medium text-xs text-gray-400 mb-1">作业内容: {sub.homeworkTitle}</div>
                                       <div className="flex items-center gap-2">
                                           <FileText size={16} className="text-indigo-500"/>
                                           {sub.content}
                                       </div>
                                   </div>

                                   {sub.status === 'pending' && (
                                       <button 
                                           onClick={() => setSelectedSubmission(sub)}
                                           className="w-full bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-bold shadow-md active:bg-indigo-700 flex items-center justify-center gap-2"
                                       >
                                           <Edit3 size={16} /> 批改作业
                                       </button>
                                   )}
                               </div>
                           ))}
                       </div>
                  )}
              </div>

               {/* Grading Modal */}
               {selectedSubmission && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
                      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                              <h3 className="font-bold text-gray-800">批改作业: {selectedSubmission.studentName}</h3>
                              <button onClick={() => setSelectedSubmission(null)} className="p-1 rounded-full hover:bg-gray-200"><X size={20}/></button>
                          </div>
                          
                          <div className="p-5 overflow-y-auto space-y-4">
                              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                                  <div className="text-sm text-indigo-900 font-bold mb-2">预览附件</div>
                                  <div className="h-32 bg-white rounded border border-indigo-200 flex items-center justify-center text-gray-400 text-sm">
                                      [PDF 预览区域]
                                  </div>
                              </div>

                              <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">评分 (0-100)</label>
                                  <input type="number" className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-lg" placeholder="请输入分数" />
                              </div>

                              <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">评语</label>
                                  <textarea rows={3} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="请输入评语..."></textarea>
                              </div>
                          </div>

                          <div className="p-4 border-t border-gray-100 flex gap-3">
                              <button onClick={() => setSelectedSubmission(null)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">取消</button>
                              <button onClick={() => setSelectedSubmission(null)} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-md">确认提交</button>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      );
  }

  // --- Student View ---
  const getFilteredHomework = () => {
      switch (activeTab) {
          case 'todo':
              return HOMEWORK_LIST.filter(hw => hw.status === 'pending');
          case 'overdue':
              return HOMEWORK_LIST.filter(hw => hw.status === 'overdue' || hw.status === 'returned');
          case 'history':
              return HOMEWORK_LIST.filter(hw => hw.status === 'submitted' || hw.status === 'graded');
          default:
              return [];
      }
  };

  const filteredList = getFilteredHomework();

  // Detail Modal Content (Student)
  const renderDetailModal = () => {
      if (!selectedHomework) return null;

      return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
              <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
                  {/* Modal Header */}
                  <div className="p-5 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                      <h3 className="text-lg font-bold text-gray-800">作业详情</h3>
                      <button onClick={() => setSelectedHomework(null)} className="p-1 text-gray-400 hover:bg-gray-100 rounded-full">
                          <X size={24} />
                      </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-5 space-y-6 flex-1">
                      {/* Course & Title */}
                      <div>
                           <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded mb-2 inline-block">
                                {selectedHomework.course}
                           </span>
                           <h2 className="text-xl font-bold text-gray-800">{selectedHomework.title}</h2>
                           <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                               <span>截止: {selectedHomework.deadline}</span>
                               {selectedHomework.submitTime && <span> | 提交: {selectedHomework.submitTime}</span>}
                           </div>
                      </div>

                      {/* Content Preview Mock */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 min-h-[150px]">
                          <p className="text-sm text-gray-600 leading-relaxed">
                              这是作业内容的预览窗口。在这里学生可以看到自己提交的文本内容，或者上传的图片缩略图。
                              <br/><br/>
                              (假设这里展示了学生提交的作业内容...)
                          </p>
                          {selectedHomework.studentAnswerUrl && (
                               <div className="mt-4 flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200">
                                    <FileText size={20} className="text-gray-400" />
                                    <div className="flex-1 overflow-hidden">
                                        <div className="text-sm font-medium text-gray-700 truncate">{selectedHomework.studentAnswerUrl}</div>
                                        <div className="text-xs text-gray-400">1.2 MB</div>
                                    </div>
                                    <button className="text-indigo-600 p-2 hover:bg-indigo-50 rounded">
                                        <Download size={18} />
                                    </button>
                               </div>
                          )}
                      </div>

                      {/* Feedback Section (If graded) */}
                      {selectedHomework.status === 'graded' && (
                          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                               <div className="flex justify-between items-center mb-3">
                                   <h4 className="font-bold text-green-800 flex items-center gap-2">
                                       <CheckCircle size={18} /> 老师评语
                                   </h4>
                                   <div className="text-2xl font-bold text-green-600">{selectedHomework.score} <span className="text-sm font-normal">分</span></div>
                               </div>
                               <p className="text-sm text-green-700 bg-white p-3 rounded-lg border border-green-100 shadow-sm">
                                   {selectedHomework.feedback || "暂无详细评语"}
                               </p>
                          </div>
                      )}

                       {/* Returned Section */}
                       {selectedHomework.status === 'returned' && (
                          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                               <h4 className="font-bold text-red-800 flex items-center gap-2 mb-2">
                                   <AlertCircle size={18} /> 退回修改
                               </h4>
                               <p className="text-sm text-red-700">
                                   {selectedHomework.feedback}
                               </p>
                          </div>
                      )}
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                      <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold shadow-sm">
                          下载附件
                      </button>
                      {selectedHomework.status === 'returned' ? (
                          <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-sm">
                              重新提交
                          </button>
                      ) : (
                           <button onClick={() => setSelectedHomework(null)} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-sm">
                              关闭
                          </button>
                      )}
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Tabs */}
      <div className="bg-white p-2 border-b border-gray-200 sticky top-14 z-20">
          <div className="flex bg-gray-100 rounded-xl p-1">
              {[
                  { id: 'todo', label: '待完成', count: HOMEWORK_LIST.filter(h => h.status === 'pending').length },
                  { id: 'overdue', label: '待补交', count: HOMEWORK_LIST.filter(h => h.status === 'overdue' || h.status === 'returned').length },
                  { id: 'history', label: '历史作业', count: 0 }
              ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all relative
                        ${activeTab === tab.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}
                    `}
                  >
                      {tab.label}
                      {tab.count > 0 && activeTab !== tab.id && (
                          <span className="absolute top-2 right-4 w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                  </button>
              ))}
          </div>
      </div>

      {/* List Content */}
      <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {filteredList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle size={32} />
                  </div>
                  <p>暂无相关作业</p>
              </div>
          ) : (
              filteredList.map(hw => (
                  <div key={hw.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative overflow-hidden">
                      {/* Status Strip for Overdue */}
                      {hw.status === 'overdue' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>}
                      {hw.status === 'returned' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>}

                      <div className="flex justify-between items-start mb-2 pl-2">
                          <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded">
                              {hw.course}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded font-medium flex items-center gap-1
                              ${hw.status === 'pending' ? 'bg-blue-50 text-blue-600' : 
                                hw.status === 'overdue' ? 'bg-red-50 text-red-600' :
                                hw.status === 'returned' ? 'bg-orange-50 text-orange-600' :
                                'bg-green-50 text-green-600'}`}>
                              {hw.status === 'pending' ? '进行中' : 
                               hw.status === 'overdue' ? '已逾期' :
                               hw.status === 'returned' ? '需修改' :
                               hw.status === 'graded' ? `${hw.score}分` : '已提交'}
                          </span>
                      </div>

                      <h3 className="font-bold text-gray-800 text-lg mb-2 pl-2">{hw.title}</h3>
                      
                      <div className="pl-2 mb-4">
                          {(activeTab === 'todo' || activeTab === 'overdue') && (
                              <p className={`text-sm flex items-center gap-1.5 ${hw.status === 'overdue' ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                                  <Clock size={14} /> 
                                  截止: {hw.deadline}
                              </p>
                          )}
                          {activeTab === 'history' && (
                              <p className="text-sm text-gray-400">提交于: {hw.submitTime}</p>
                          )}
                      </div>

                      <div className="flex gap-3 pl-2">
                          {activeTab === 'history' ? (
                              <button 
                                onClick={() => setSelectedHomework(hw)}
                                className="flex-1 bg-gray-50 hover:bg-gray-100 text-indigo-600 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                              >
                                  <Eye size={16} /> 预览/查看详情
                              </button>
                          ) : (
                              <>
                                <button className="flex-1 bg-gray-50 text-gray-600 py-2.5 rounded-lg text-sm font-bold">
                                    下载附件
                                </button>
                                <button className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-bold shadow-md active:bg-indigo-700">
                                    {hw.status === 'returned' ? '重新提交' : '去完成'}
                                </button>
                              </>
                          )}
                      </div>
                  </div>
              ))
          )}
      </div>

      {renderDetailModal()}
    </div>
  );
};

export default Homework;

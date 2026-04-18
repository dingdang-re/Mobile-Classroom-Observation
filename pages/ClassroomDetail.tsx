import React, { useState } from 'react';
import { ChevronLeft, Presentation, PenTool, ClipboardList, AlertCircle, Heart, HelpCircle, Star, Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { COURSES } from '../services/mockData';

const ClassroomDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'ppt' | 'exercises' | 'quiz'>('ppt');
  
  // Mock Course Data
  const course = COURSES.find(c => c.id === id) || COURSES[0];

  // --- PPT Module State & Data ---
  // Mock slides data
  const TOTAL_SLIDES = 12;
  const TEACHER_CURRENT_PROGRESS = 7; // Teacher is currently on slide 8 (index 7)
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(TEACHER_CURRENT_PROGRESS);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [confused, setConfused] = useState<number[]>([]);

  const toggleBookmark = (index: number) => {
    setBookmarks(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const toggleConfused = (index: number) => {
    setConfused(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  const renderContent = () => {
      switch(activeTab) {
          case 'ppt':
              // Generate available slides (History only)
              const availableSlides = Array.from({ length: TEACHER_CURRENT_PROGRESS + 1 }, (_, i) => ({
                  id: i,
                  url: `https://picsum.photos/seed/ppt_${id}_${i}/800/600`, // Random placeholder
                  title: `第 ${i + 1} 页`
              }));

              return (
                  <div className="flex h-[calc(100vh-112px)] bg-gray-100">
                      {/* Left Sidebar: Thumbnails */}
                      <div className="w-28 bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0 flex flex-col gap-3 p-3 no-scrollbar">
                          {availableSlides.map((slide, index) => (
                              <div 
                                key={slide.id}
                                onClick={() => setCurrentSlideIndex(index)}
                                className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all group
                                    ${currentSlideIndex === index ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-transparent hover:border-gray-300'}
                                `}
                              >
                                  <img src={slide.url} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                                  <div className="absolute bottom-0 right-0 bg-black/50 text-white text-[10px] px-1.5 rounded-tl-md">
                                      {index + 1}
                                  </div>
                                  
                                  {/* Indicators on thumbnail */}
                                  <div className="absolute top-1 left-1 flex gap-0.5">
                                      {bookmarks.includes(index) && <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>}
                                      {confused.includes(index) && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                                  </div>

                                  {index === TEACHER_CURRENT_PROGRESS && (
                                      <div className="absolute inset-0 bg-indigo-600/10 flex items-center justify-center">
                                          <span className="bg-indigo-600 text-white text-[8px] px-1 rounded">Live</span>
                                      </div>
                                  )}
                              </div>
                          ))}
                          <div className="text-center text-xs text-gray-400 py-2">
                              老师未播放的PPT不可见
                          </div>
                      </div>

                      {/* Right Main Area: Large Display */}
                      <div className="flex-1 flex flex-col p-4 overflow-hidden relative">
                          <div className="flex-1 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
                               <img 
                                  src={availableSlides[currentSlideIndex].url} 
                                  alt="Main Slide" 
                                  className="w-full h-full object-contain"
                               />
                               
                               {/* Status Overlay */}
                               {currentSlideIndex === TEACHER_CURRENT_PROGRESS && (
                                   <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse shadow-md">
                                       ● 老师正在讲
                                   </div>
                               )}

                               {/* Action Buttons Floating on the Slide */}
                               <div className="absolute bottom-6 right-6 flex gap-3">
                                   <button 
                                      onClick={() => toggleConfused(currentSlideIndex)}
                                      className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all active:scale-95 flex items-center gap-2
                                        ${confused.includes(currentSlideIndex) 
                                            ? 'bg-red-500 text-white' 
                                            : 'bg-white/80 text-gray-600 hover:bg-white'}
                                      `}
                                   >
                                       <HelpCircle size={20} />
                                       <span className="text-xs font-bold">{confused.includes(currentSlideIndex) ? '已标记不懂' : '不懂'}</span>
                                   </button>
                                   
                                   <button 
                                      onClick={() => toggleBookmark(currentSlideIndex)}
                                      className={`p-3 rounded-full shadow-lg backdrop-blur-md transition-all active:scale-95 flex items-center gap-2
                                        ${bookmarks.includes(currentSlideIndex) 
                                            ? 'bg-yellow-400 text-white' 
                                            : 'bg-white/80 text-gray-600 hover:bg-white'}
                                      `}
                                   >
                                       <Star size={20} fill={bookmarks.includes(currentSlideIndex) ? "currentColor" : "none"} />
                                       <span className="text-xs font-bold">{bookmarks.includes(currentSlideIndex) ? '已收藏' : '收藏'}</span>
                                   </button>
                               </div>
                          </div>

                          {/* Footer Info */}
                          <div className="mt-4 flex justify-between items-center px-2">
                               <div>
                                   <h2 className="font-bold text-gray-800">第 {currentSlideIndex + 1} 页</h2>
                                   <p className="text-xs text-gray-500">共展示 {TEACHER_CURRENT_PROGRESS + 1} 页 / 课程进度</p>
                               </div>
                               <div className="flex gap-2 text-xs text-gray-400">
                                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div> 收藏</span>
                                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> 不懂</span>
                               </div>
                          </div>
                      </div>
                  </div>
              );
          case 'exercises':
              return (
                <div className="p-4 flex flex-col items-center justify-center h-full text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                        <PenTool size={32} />
                    </div>
                    <h3 className="text-gray-800 font-bold mb-2">随堂习题</h3>
                    <div className="w-full max-w-sm space-y-3">
                        <div className="bg-white p-4 rounded-xl border border-gray-200 text-left shadow-sm">
                            <div className="flex justify-between mb-2">
                                <span className="bg-indigo-50 text-indigo-600 text-xs px-2 py-0.5 rounded font-bold">单选</span>
                                <span className="text-xs text-gray-400">进行中</span>
                            </div>
                            <p className="text-sm font-bold text-gray-800 mb-3">函数 f(x)=x^2 在 [0,1] 上的定积分是多少？</p>
                            <button className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg text-sm font-medium">开始作答</button>
                        </div>
                    </div>
                </div>
              );
          case 'quiz':
              return (
                <div className="p-4 flex flex-col items-center justify-center h-full text-center">
                     <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                        <ClipboardList size={32} />
                    </div>
                    <h3 className="text-gray-800 font-bold mb-2">课堂测验</h3>
                    <p className="text-gray-500 text-sm max-w-xs">老师暂未发布课堂测验，请专注于听课。</p>
                </div>
              );
          default: 
            return null;
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Custom Header for Classroom */}
      <div className="bg-white px-4 h-14 flex items-center justify-between border-b border-gray-200 sticky top-0 z-50">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
              <ChevronLeft size={24} />
          </button>
          <div className="text-center">
              <h1 className="font-bold text-gray-800 text-sm">{course.name}</h1>
              <p className="text-[10px] text-gray-500">{course.location} • {course.teacher}</p>
          </div>
          <div className="w-8"></div> {/* Spacer */}
      </div>

      {/* Tabs */}
      <div className="bg-white flex border-b border-gray-200 sticky top-14 z-40">
          {[
              { id: 'ppt', label: 'PPT', icon: Presentation },
              { id: 'exercises', label: '习题', icon: PenTool },
              { id: 'quiz', label: '测验', icon: ClipboardList },
          ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors
                    ${activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}
                `}
              >
                  <tab.icon size={16} />
                  {tab.label}
              </button>
          ))}
      </div>

      {/* Content Area */}
      <div className="flex-1">
          {renderContent()}
      </div>
    </div>
  );
};

export default ClassroomDetail;
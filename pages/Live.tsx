
import React, { useState } from 'react';
import { PlayCircle, MessageCircle, HelpCircle, Download, Send, ChevronLeft, Calendar, User, Clock } from 'lucide-react';
import { LECTURES } from '../services/mockData';
import { Lecture } from '../types';

const Live = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'qa' | 'files'>('chat');
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  // --- Player View Component ---
  if (selectedLecture) {
      return (
        <div className="h-screen flex flex-col bg-gray-50 fixed inset-0 z-50">
            {/* Header overlay for back button */}
            <div className="absolute top-0 left-0 right-0 p-4 z-20 flex items-center text-white bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                 <button onClick={() => setSelectedLecture(null)} className="pointer-events-auto p-1 bg-black/20 backdrop-blur-sm rounded-full">
                     <ChevronLeft size={24} />
                 </button>
            </div>

            {/* Video Player */}
            <div className="bg-black aspect-video relative shrink-0">
                <img 
                    src={selectedLecture.cover} 
                    alt="Live Cover" 
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle size={64} className="text-white opacity-90" />
                </div>
                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    {selectedLecture.status === 'live' ? (
                        <><span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> 直播中</>
                    ) : '回放'}
                </div>
            </div>
            
            {/* Info */}
            <div className="bg-white p-4 border-b border-gray-200">
                 <h3 className="font-bold text-gray-800 text-lg">{selectedLecture.title}</h3>
                 <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                    <User size={14}/> {selectedLecture.speaker}
                 </p>
            </div>

            {/* Interaction Tabs */}
            <div className="flex border-b border-gray-200 bg-white">
                <button 
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'chat' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
                >
                    互动交流
                </button>
                <button 
                    onClick={() => setActiveTab('qa')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'qa' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
                >
                    提问区
                </button>
                 <button 
                    onClick={() => setActiveTab('files')}
                    className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'files' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
                >
                    资料下载
                </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-white">
                {activeTab === 'chat' && (
                    <div className="space-y-4 pb-12">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">李</div>
                            <div>
                                <div className="text-xs text-gray-400 mb-0.5">李同学 10:05</div>
                                <div className="bg-gray-100 p-2 rounded-r-xl rounded-bl-xl text-sm text-gray-800">
                                    这个观点很有意思，有没有相关的参考文献推荐？
                                </div>
                            </div>
                        </div>
                         <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold shrink-0">陈</div>
                            <div>
                                <div className="text-xs text-gray-400 mb-0.5">陈老师 10:06</div>
                                <div className="bg-gray-100 p-2 rounded-r-xl rounded-bl-xl text-sm text-gray-800">
                                    声音稍微有点小，麻烦调大一点。
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'files' && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-50 p-2 rounded text-red-500 font-bold text-xs">PDF</div>
                                <div>
                                    <div className="text-sm font-bold text-gray-800">讲座课件_v1.pdf</div>
                                    <div className="text-xs text-gray-400">2.5MB</div>
                                </div>
                            </div>
                            <Download size={20} className="text-gray-400" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            {activeTab !== 'files' && (
                 <div className="bg-white border-t border-gray-200 p-3 flex items-center gap-2 pb-safe">
                     <input type="text" placeholder="参与讨论..." className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                     <button className="bg-indigo-600 text-white p-2 rounded-full">
                         <Send size={18} />
                     </button>
                 </div>
            )}
        </div>
      );
  }

  // --- List View Component ---
  return (
    <div className="h-full flex flex-col bg-gray-50 p-4 space-y-6">
        {/* Section: Live Now */}
        <div className="space-y-3">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                正在直播
            </h3>
            {LECTURES.filter(l => l.status === 'live').map(lecture => (
                <div 
                    key={lecture.id} 
                    onClick={() => setSelectedLecture(lecture)}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 active:scale-98 transition-transform"
                >
                    <div className="aspect-video relative">
                        <img src={lecture.cover} alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                            Live
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <PlayCircle className="text-white/90 drop-shadow-lg" size={48} />
                        </div>
                    </div>
                    <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-1 line-clamp-1">{lecture.title}</h4>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                             <span>{lecture.speaker}</span>
                             <span>{lecture.viewers} 人观看</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* Section: Replay */}
        <div className="space-y-3">
             <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                精彩回放
            </h3>
             {LECTURES.filter(l => l.status === 'ended').map(lecture => (
                <div 
                    key={lecture.id} 
                    onClick={() => setSelectedLecture(lecture)}
                    className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex gap-3 active:scale-98 transition-transform"
                >
                    <div className="w-32 aspect-video rounded-lg overflow-hidden relative shrink-0">
                         <img src={lecture.cover} alt="" className="w-full h-full object-cover" />
                         <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[8px] px-1 rounded">
                             {lecture.duration}
                         </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                         <h4 className="font-bold text-gray-800 text-sm line-clamp-2">{lecture.title}</h4>
                         <div>
                             <p className="text-xs text-gray-500 line-clamp-1 mb-1">{lecture.speaker}</p>
                             <p className="text-[10px] text-gray-400 flex items-center gap-1">
                                 <Calendar size={10} /> {lecture.date}
                             </p>
                         </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Live;

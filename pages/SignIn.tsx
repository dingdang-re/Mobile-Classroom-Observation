import React, { useState, useEffect } from 'react';
import { MapPin, QrCode, RefreshCw, CheckCircle, Navigation } from 'lucide-react';

const SignIn = () => {
  const [mode, setMode] = useState<'gps' | 'qr'>('gps');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [locationInfo, setLocationInfo] = useState({
      address: '正在定位...',
      inRange: false,
      distance: 0
  });

  // Simulate Geolocation
  const refreshLocation = () => {
      setLoading(true);
      setLocationInfo(prev => ({ ...prev, address: '正在定位...' }));
      
      setTimeout(() => {
          setLoading(false);
          // Mock logic: 80% chance of being in range
          const inRange = Math.random() > 0.2;
          setLocationInfo({
              address: '第一教学楼 A-101 附近',
              inRange: inRange,
              distance: inRange ? 5 : 150
          });
      }, 1500);
  };

  useEffect(() => {
      if (mode === 'gps') refreshLocation();
  }, [mode]);

  const handleSignIn = () => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          setStatus('success');
      }, 1000);
  };

  if (status === 'success') {
      return (
          <div className="h-[80vh] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                  <CheckCircle size={48} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">签到成功!</h2>
              <p className="text-gray-500 mb-8">您已成功完成《高等数学 (上)》的签到</p>
              <button onClick={() => window.history.back()} className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold">
                  返回
              </button>
          </div>
      );
  }

  return (
    <div className="h-[calc(100vh-60px)] flex flex-col bg-gray-50">
       {/* Tab Switcher */}
       <div className="bg-white p-2">
            <div className="flex bg-gray-100 rounded-xl p-1">
                <button 
                    onClick={() => setMode('gps')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${mode === 'gps' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
                >
                    <MapPin size={18} /> 定位签到
                </button>
                <button 
                    onClick={() => setMode('qr')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${mode === 'qr' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500'}`}
                >
                    <QrCode size={18} /> 扫码签到
                </button>
            </div>
       </div>

       <div className="flex-1 p-4 flex flex-col">
            {mode === 'gps' ? (
                <>
                    {/* Map Placeholder */}
                    <div className="bg-gray-200 rounded-2xl h-64 relative overflow-hidden mb-4 border border-gray-200 shadow-inner">
                         <div className="absolute inset-0 flex items-center justify-center opacity-30">
                             {/* Mock Map Grid */}
                             <div className="w-full h-full" style={{backgroundImage: 'radial-gradient(#999 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                         </div>
                         {/* My Location Pin */}
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                             <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                                 <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                             </div>
                         </div>
                    </div>

                    {/* Location Info Card */}
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-gray-500 text-xs mb-1">当前位置</h3>
                                <div className="font-bold text-gray-800 text-lg flex items-center gap-2">
                                    <Navigation size={18} className="text-indigo-600" />
                                    {locationInfo.address}
                                </div>
                            </div>
                            <button onClick={refreshLocation} disabled={loading} className="p-2 text-gray-400 active:text-indigo-600 bg-gray-50 rounded-lg">
                                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                            </button>
                        </div>
                        
                        <div className={`p-3 rounded-lg flex items-center gap-3 ${locationInfo.inRange ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {locationInfo.inRange ? <CheckCircle size={20}/> : <MapPin size={20}/>}
                            <div className="text-sm font-medium">
                                {locationInfo.inRange ? '已进入签到范围' : `不在签到范围内 (距离 ${locationInfo.distance}m)`}
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={handleSignIn}
                        disabled={!locationInfo.inRange || loading}
                        className={`mt-auto w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all
                            ${locationInfo.inRange && !loading ? 'bg-indigo-600 text-white active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
                        `}
                    >
                        {loading ? '处理中...' : '立即签到'}
                    </button>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-black rounded-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                        <p className="text-gray-500">相机预览区域</p>
                    </div>
                    {/* Scan Frame */}
                    <div className="w-64 h-64 border-2 border-white/50 rounded-lg relative z-10">
                        <div className="absolute top-0 left-0 w-4 h-4 border-l-4 border-t-4 border-indigo-500 -ml-1 -mt-1"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-r-4 border-t-4 border-indigo-500 -mr-1 -mt-1"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-4 border-b-4 border-indigo-500 -ml-1 -mb-1"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-4 border-b-4 border-indigo-500 -mr-1 -mb-1"></div>
                        <div className="w-full h-0.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] absolute top-1/2 animate-[pulse_2s_infinite]"></div>
                    </div>
                    <p className="text-white mt-8 z-10 text-sm opacity-80">请扫描教室屏幕上的二维码</p>
                    <button onClick={handleSignIn} className="absolute bottom-8 text-white underline opacity-50 text-xs">
                        (模拟扫码成功)
                    </button>
                </div>
            )}
       </div>
    </div>
  );
};

export default SignIn;
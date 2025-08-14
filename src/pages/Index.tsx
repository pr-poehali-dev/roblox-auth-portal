import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [countdown, setCountdown] = useState(3600); // 1 hour in seconds
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 font-gaming flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Main Error Card */}
        <Card className="bg-white/10 backdrop-blur-md border-red-300/30 animate-bounce-in mb-6">
          <CardHeader className="text-center pb-4">
            <div className="w-24 h-24 mx-auto bg-red-500 rounded-full flex items-center justify-center mb-6 animate-glow">
              <Icon name="AlertTriangle" className="text-white" size={48} />
            </div>
            
            <CardTitle className="text-4xl font-bold text-white mb-2">
              Service Temporarily Unavailable
            </CardTitle>
            
            <Badge className="bg-red-500/20 text-red-200 border-red-400/50 text-lg px-4 py-2">
              🔴 IP Configuration Error
            </Badge>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                🚧 We're experiencing technical difficulties
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                Our Roblox authentication service is currently down due to an IP configuration issue. 
                Our engineering team is working to resolve this as quickly as possible.
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-white/20">
              <h4 className="text-xl font-bold text-white mb-3">
                ⏰ Estimated Resolution Time
              </h4>
              <div className="text-5xl font-mono font-bold text-yellow-300 mb-2 animate-glow">
                {formatTime(countdown)}
              </div>
              <p className="text-white/70">Hours : Minutes : Seconds</p>
              <Progress value={((3600 - countdown) / 3600) * 100} className="mt-4" />
            </div>

            {/* Status Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center mb-2">
                  <Icon name="Server" className="text-red-400 mr-2" size={20} />
                  <h5 className="text-white font-bold">Server Status</h5>
                </div>
                <Badge className="bg-red-500/20 text-red-200">Down</Badge>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center mb-2">
                  <Icon name="Wifi" className="text-orange-400 mr-2" size={20} />
                  <h5 className="text-white font-bold">Network</h5>
                </div>
                <Badge className="bg-orange-500/20 text-orange-200">Reconnecting</Badge>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center mb-2">
                  <Icon name="Database" className="text-yellow-400 mr-2" size={20} />
                  <h5 className="text-white font-bold">Database</h5>
                </div>
                <Badge className="bg-green-500/20 text-green-200">Operational</Badge>
              </div>
              
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center mb-2">
                  <Icon name="Shield" className="text-blue-400 mr-2" size={20} />
                  <h5 className="text-white font-bold">Security</h5>
                </div>
                <Badge className="bg-green-500/20 text-green-200">Secure</Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleRetry}
                disabled={isRetrying}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 text-lg"
              >
                {isRetrying ? (
                  <div className="flex items-center">
                    <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                    Checking Status...
                  </div>
                ) : (
                  <>
                    <Icon name="RefreshCw" className="mr-2" size={20} />
                    Try Again
                  </>
                )}
              </Button>
              
              <Button 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-3 text-lg"
                onClick={() => window.open('https://roblox.com', '_blank')}
              >
                <Icon name="ExternalLink" className="mr-2" size={20} />
                Visit Roblox.com
              </Button>
            </div>

            {/* Support Information */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-lg font-bold text-white mb-3">
                📞 Need Help?
              </h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="text-white/80">
                  <strong className="text-white">Error Code:</strong> IP_CONFIG_ERROR_503
                </div>
                <div className="text-white/80">
                  <strong className="text-white">Incident ID:</strong> #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </div>
                <div className="text-white/80">
                  <strong className="text-white">Started:</strong> {new Date().toLocaleTimeString()}
                </div>
                <div className="text-white/80">
                  <strong className="text-white">Priority:</strong> High
                </div>
              </div>
            </div>

            {/* Updates Section */}
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-6 border border-white/20">
              <h4 className="text-lg font-bold text-white mb-3 flex items-center">
                <Icon name="Bell" className="mr-2 text-blue-400" size={20} />
                Latest Updates
              </h4>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <p className="text-white/90 text-sm">
                      <strong>15:42</strong> - Engineering team identified IP routing issue
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white/90 text-sm">
                      <strong>15:38</strong> - Service interruption detected, investigation started
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-white/90 text-sm">
                      <strong>15:35</strong> - Multiple users reporting connection issues
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-white/60 text-sm">
          <p>© 2024 Roblox Auth Service. All rights reserved.</p>
          <p className="mt-1">Follow us on social media for real-time updates</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
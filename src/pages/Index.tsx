import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [robux, setRobux] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    displayName: '',
    userId: ''
  });
  
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const [friends] = useState([
    { name: 'PlayerOne', avatar: '/img/a8b6b891-b916-4ec0-821e-98f07271b11c.jpg', status: 'In Game' },
    { name: 'GamerPro', avatar: '/img/a8b6b891-b916-4ec0-821e-98f07271b11c.jpg', status: 'Online' },
    { name: 'BlockMaster', avatar: '/img/a8b6b891-b916-4ec0-821e-98f07271b11c.jpg', status: 'Offline' }
  ]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    // Simulate API call validation
    setTimeout(() => {
      if (loginForm.username.length < 3) {
        setLoginError('Invalid username format');
        setIsLoggingIn(false);
        return;
      }
      if (loginForm.password.length < 6) {
        setLoginError('Password must be at least 6 characters');
        setIsLoggingIn(false);
        return;
      }

      // Simulate successful login
      setUserData({
        username: loginForm.username,
        displayName: loginForm.username + '_Pro',
        userId: Math.random().toString(36).substr(2, 9)
      });
      setIsLoggedIn(true);
      setIsLoggingIn(false);
    }, 2000);
  };

  const handleGetRobux = async () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setRobux(prev => prev + 100);
      setIsVerifying(false);
    }, 2000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRobux(0);
    setLoginForm({ username: '', password: '' });
    setUserData({ username: '', displayName: '', userId: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-roblox-blue via-roblox-purple to-roblox-green font-gaming">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-roblox-red rounded-lg flex items-center justify-center animate-bounce-in">
              <Icon name="Gamepad2" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white">ROBLOX AUTH</h1>
          </div>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <Badge className="bg-roblox-yellow text-black font-bold animate-glow">
                💰 {robux} Robux
              </Badge>
              <Avatar className="animate-float">
                <AvatarImage src="/img/a8b6b891-b916-4ec0-821e-98f07271b11c.jpg" />
                <AvatarFallback>{userData.username[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Badge className="bg-white/20 text-white px-4 py-2">
              🔐 Sign In Required
            </Badge>
          )}
        </div>
      </header>

      <div className="container mx-auto p-6">
        {!isLoggedIn ? (
          // Login Page
          <div className="min-h-[80vh] flex items-center justify-center">
            <Card className="w-full max-w-md bg-white/20 backdrop-blur-md border-white/30 animate-bounce-in">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-white mb-4">
                  Welcome Back!
                </CardTitle>
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-roblox-blue to-roblox-purple rounded-2xl flex items-center justify-center mb-4 animate-float">
                  <Icon name="User" className="text-white" size={64} />
                </div>
                <p className="text-white/80 text-sm">
                  Sign in with your Roblox account to get free Robux!
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white font-bold">
                      Roblox Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-bold">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      required
                    />
                  </div>

                  {loginError && (
                    <div className="bg-roblox-red/20 border border-roblox-red/50 rounded-lg p-3">
                      <p className="text-white text-sm">⚠️ {loginError}</p>
                    </div>
                  )}

                  <Button 
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-roblox-red hover:bg-roblox-red/80 text-white font-bold py-3 text-lg animate-glow"
                  >
                    {isLoggingIn ? (
                      <div className="flex items-center">
                        <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                        Authenticating...
                      </div>
                    ) : (
                      '🎮 Sign In to Roblox'
                    )}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <h4 className="text-white font-bold text-sm mb-2">🔒 Security Notice</h4>
                  <p className="text-white/70 text-xs">
                    Your login data is processed securely. We never store passwords and only use official Roblox authentication.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Main Dashboard After Login
          <div className="space-y-6">
            {/* Robux Earning Section */}
            <Card className="bg-white/20 backdrop-blur-md border-white/30 animate-bounce-in">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <Icon name="Coins" className="mr-3 text-roblox-yellow" size={32} />
                  Get Free Robux
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-gradient-to-r from-roblox-yellow to-roblox-green p-6 rounded-2xl text-center mb-4 animate-glow">
                      <h3 className="text-4xl font-bold text-black mb-2">💰 100 ROBUX</h3>
                      <p className="text-black/80">Free daily reward!</p>
                    </div>
                    
                    <Button 
                      onClick={handleGetRobux}
                      disabled={isVerifying}
                      className="w-full bg-roblox-green hover:bg-roblox-green/80 text-black font-bold py-4 text-lg"
                    >
                      {isVerifying ? (
                        <div className="flex items-center">
                          <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                          Verifying Account...
                        </div>
                      ) : (
                        '🚀 Claim Robux'
                      )}
                    </Button>
                    
                    {isVerifying && (
                      <div className="mt-4">
                        <Progress value={66} className="w-full" />
                        <p className="text-white/80 text-center mt-2">Checking account status...</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-2">✨ How it works</h4>
                      <ol className="text-white/80 text-sm space-y-1">
                        <li>1. Click "Claim Robux"</li>
                        <li>2. Complete quick verification</li>
                        <li>3. Robux added to your account</li>
                      </ol>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-2">📊 Your Stats</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-white/80">
                          <span>Total Earned:</span>
                          <span className="font-bold text-roblox-yellow">{robux} R$</span>
                        </div>
                        <div className="flex justify-between text-white/80">
                          <span>Account Level:</span>
                          <span className="font-bold text-roblox-green">Starter</span>
                        </div>
                        <div className="flex justify-between text-white/80">
                          <span>User ID:</span>
                          <span className="font-bold text-roblox-blue">{userData.userId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Section */}
            <Card className="bg-white/20 backdrop-blur-md border-white/30">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <Icon name="User" className="mr-3 text-roblox-blue" size={32} />
                  My Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <Avatar className="w-20 h-20 animate-float">
                    <AvatarImage src="/img/a8b6b891-b916-4ec0-821e-98f07271b11c.jpg" />
                    <AvatarFallback>{userData.username[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">{userData.displayName}</h3>
                    <p className="text-roblox-yellow">@{userData.username}</p>
                    <div className="flex space-x-4">
                      <Badge className="bg-roblox-green text-black">Premium</Badge>
                      <Badge className="bg-roblox-purple text-white">Level 15</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-white/80">
                      <span>👥 Friends: 127</span>
                      <span>🎮 Games: 45</span>
                      <span>⭐ Rating: 4.8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Friends Section */}
            <Card className="bg-white/20 backdrop-blur-md border-white/30">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <Icon name="Users" className="mr-3 text-roblox-purple" size={32} />
                  My Friends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {friends.map((friend, index) => (
                    <div key={index} className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-all">
                      <Avatar className="w-16 h-16 mx-auto mb-3">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      <h4 className="text-white font-bold">{friend.name}</h4>
                      <Badge 
                        className={`mt-2 ${
                          friend.status === 'In Game' ? 'bg-roblox-green text-black' :
                          friend.status === 'Online' ? 'bg-roblox-blue text-white' :
                          'bg-gray-500 text-white'
                        }`}
                      >
                        {friend.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
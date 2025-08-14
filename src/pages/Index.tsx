import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [robux, setRobux] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [friends] = useState([
    { name: 'PlayerOne', avatar: '/img/a8b6b891-b916-4ec0-821e-98f07271b11c.jpg', status: 'В игре' },
    { name: 'GamerPro', avatar: '/img/a8b6b891-b916-4ec0-821e-98f07271b11c.jpg', status: 'Онлайн' },
    { name: 'BlockMaster', avatar: '/img/a8b6b891-b916-4ec0-821e-98f07271b11c.jpg', status: 'Оффлайн' }
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleGetRobux = async () => {
    setIsVerifying(true);
    // Имитация верификации
    setTimeout(() => {
      setRobux(prev => prev + 100);
      setIsVerifying(false);
    }, 2000);
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
                <AvatarFallback>RX</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Button 
              onClick={handleLogin}
              className="bg-roblox-red hover:bg-roblox-red/80 text-white font-bold px-6 py-2 animate-bounce-in"
            >
              🎮 Войти через Roblox
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto p-6">
        {!isLoggedIn ? (
          // Страница авторизации
          <div className="min-h-[80vh] flex items-center justify-center">
            <Card className="w-full max-w-md bg-white/20 backdrop-blur-md border-white/30 animate-bounce-in">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-white mb-4">
                  Добро пожаловать!
                </CardTitle>
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-roblox-blue to-roblox-purple rounded-2xl flex items-center justify-center mb-4 animate-float">
                  <Icon name="User" className="text-white" size={64} />
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/80 mb-6">
                  Войдите в свой аккаунт Roblox чтобы получить доступ к бесплатным робуксам!
                </p>
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-roblox-red hover:bg-roblox-red/80 text-white font-bold py-3 text-lg animate-glow"
                >
                  🎮 Войти через Roblox
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Главная страница после авторизации
          <div className="space-y-6">
            {/* Секция получения робуксов */}
            <Card className="bg-white/20 backdrop-blur-md border-white/30 animate-bounce-in">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <Icon name="Coins" className="mr-3 text-roblox-yellow" size={32} />
                  Получить робуксы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-gradient-to-r from-roblox-yellow to-roblox-green p-6 rounded-2xl text-center mb-4 animate-glow">
                      <h3 className="text-4xl font-bold text-black mb-2">💰 100 ROBUX</h3>
                      <p className="text-black/80">Бесплатно каждый день!</p>
                    </div>
                    
                    <Button 
                      onClick={handleGetRobux}
                      disabled={isVerifying}
                      className="w-full bg-roblox-green hover:bg-roblox-green/80 text-black font-bold py-4 text-lg"
                    >
                      {isVerifying ? (
                        <div className="flex items-center">
                          <Icon name="Loader2" className="mr-2 animate-spin" size={20} />
                          Верификация...
                        </div>
                      ) : (
                        '🚀 Получить робуксы'
                      )}
                    </Button>
                    
                    {isVerifying && (
                      <div className="mt-4">
                        <Progress value={66} className="w-full" />
                        <p className="text-white/80 text-center mt-2">Проверяем аккаунт...</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-2">✨ Как это работает?</h4>
                      <ol className="text-white/80 text-sm space-y-1">
                        <li>1. Нажмите "Получить робуксы"</li>
                        <li>2. Пройдите быструю верификацию</li>
                        <li>3. Робуксы поступят на ваш счёт</li>
                      </ol>
                    </div>
                    
                    <div className="bg-white/10 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-2">🎯 Ваша статистика</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-white/80">
                          <span>Всего получено:</span>
                          <span className="font-bold text-roblox-yellow">{robux} R$</span>
                        </div>
                        <div className="flex justify-between text-white/80">
                          <span>Уровень:</span>
                          <span className="font-bold text-roblox-green">Новичок</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Профиль */}
            <Card className="bg-white/20 backdrop-blur-md border-white/30">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <Icon name="User" className="mr-3 text-roblox-blue" size={32} />
                  Мой профиль
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-6">
                  <Avatar className="w-20 h-20 animate-float">
                    <AvatarImage src="/img/a8b6b891-b916-4ec0-821e-98f07271b11c.jpg" />
                    <AvatarFallback>RX</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">RobloxPlayer2024</h3>
                    <div className="flex space-x-4">
                      <Badge className="bg-roblox-green text-black">Премиум</Badge>
                      <Badge className="bg-roblox-purple text-white">Уровень 15</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-white/80">
                      <span>👥 Друзей: 127</span>
                      <span>🎮 Игр: 45</span>
                      <span>⭐ Рейтинг: 4.8</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Друзья */}
            <Card className="bg-white/20 backdrop-blur-md border-white/30">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <Icon name="Users" className="mr-3 text-roblox-purple" size={32} />
                  Мои друзья
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
                          friend.status === 'В игре' ? 'bg-roblox-green text-black' :
                          friend.status === 'Онлайн' ? 'bg-roblox-blue text-white' :
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
import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Target, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { addNotification } = useAppStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Admin login logic
    if (email === 'admin@attendance.com' && password === 'admin123') {
      localStorage.setItem('auth_token', 'admin_token');
      localStorage.setItem('user_role', 'admin');
      addNotification({ message: 'Login successful! Welcome back.', type: 'success' });
      window.location.reload();
    } else {
      setError('Invalid email or password');
      addNotification({ message: 'Invalid credentials. Please try again.', type: 'error' });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 items-center justify-center p-12 relative z-10">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 bg-primary/20 rounded-3xl shadow-lg border border-primary/20">
              <Target className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Attendance Hunters
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Modern attendance management system with gamification and real-time analytics
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="font-semibold text-primary">Smart Tracking</div>
              <div className="text-primary/70">QR code & biometric</div>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="font-semibold text-primary">Gamification</div>
              <div className="text-primary/70">Leaderboards & badges</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <Card className="w-full max-w-md shadow-xl border-primary/10">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4 lg:hidden">
              <Target className="h-8 w-8 text-primary mr-2" />
              <CardTitle className="text-2xl font-bold">
                Attendance Hunters
              </CardTitle>
            </div>
            <CardTitle className="text-2xl font-semibold hidden lg:block">
              Welcome back
            </CardTitle>
            <p className="text-muted-foreground">
              Sign in to your admin account
            </p>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="admin@attendance.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="text-center">
            <div className="text-sm text-muted-foreground">
              Demo credentials: admin@attendance.com / admin123
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
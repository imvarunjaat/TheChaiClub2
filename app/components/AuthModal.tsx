import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate .edu email
    if (!email.endsWith('.edu')) {
      setError('Please use a valid .edu email address');
      return;
    }

    // Here you would typically call an authentication API
    console.log(isLogin ? 'Login attempt' : 'Signup attempt', { email, password, name });
    
    // Close the modal after successful submission (mock success for now)
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
        <div className="bg-gradient-to-r from-[#f9c7c7] to-[#fbeee0] p-5 relative">
          <button 
            onClick={onClose}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#593A27] hover:text-[#b89e8f] transition-colors focus:outline-none focus:ring-2 focus:ring-[#593A27] focus:ring-opacity-50 rounded-full p-1"
            title="Go back"
            aria-label="Go back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-[#593A27] text-center">
            {isLogin ? 'Welcome Back!' : 'Join TheChaiClub'}
          </h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#593A27] mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#faede4] focus:ring-2 focus:ring-[#f9c7c7] focus:outline-none"
                  placeholder="Your name"
                  required={!isLogin}
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#593A27] mb-1">
                Email (.edu required)
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#faede4] focus:ring-2 focus:ring-[#f9c7c7] focus:outline-none"
                placeholder="your.email@university.edu"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#593A27] mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#faede4] focus:ring-2 focus:ring-[#f9c7c7] focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm font-medium">{error}</div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#f9c7c7] via-[#fbeee0] to-[#b89e8f] text-[#593A27] py-2 rounded-xl font-bold shadow-md hover:shadow-lg transition transform hover:scale-[1.02] focus:outline-none"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          
          <div className="mt-5 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#593A27] hover:text-[#f9c7c7] font-medium text-sm transition"
            >
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#593A27] hover:text-[#f9c7c7] focus:outline-none"
          title="Close"
          aria-label="Close dialog"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Navigation */}
      <nav className="bg-card/95 backdrop-blur-sm shadow-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-primary p-2 rounded-lg shadow-medical group-hover:scale-105 transition-transform duration-300">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MediBook</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  Home
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">Register</Button>
              </Link>
              <Link to="/login">
                <Button variant="default">Login</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2 animate-fade-in">
              <Link to="/" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  Home
                </Button>
              </Link>
              <Link to="/register" className="block">
                <Button variant="outline" className="w-full">
                  Register
                </Button>
              </Link>
              <Link to="/login" className="block">
                <Button variant="default" className="w-full">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className={`${isHomePage ? "" : "py-8"}`}>{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-gradient-primary p-2 rounded-lg shadow-medical">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">MediBook</span>
            </div>
            <p className="text-muted-foreground">
              Your trusted partner in healthcare management
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              © 2024 MediBook. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
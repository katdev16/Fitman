import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location === path;
  };

  const navLinks = [
    { name: "Home", path: "/", authRequired: false },
    { name: "Workouts", path: "/workouts", authRequired: true },
    { name: "Nutrition", path: "/nutrition", authRequired: true },
    { name: "Progress", path: "/progress", authRequired: true },
  ];

  const filteredNavLinks = navLinks.filter(link => 
    !link.authRequired || (link.authRequired && isAuthenticated)
  );

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-primary font-bold text-xl cursor-pointer">FitTrack</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {filteredNavLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  className={`${
                    isActive(link.path)
                      ? "border-primary text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {!isAuthenticated ? (
              <>
                <Link href="/login">
                  <Button variant="link" className="text-primary font-medium">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-blue-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile">
                  <Button variant="outline">Profile</Button>
                </Link>
                <Button variant="ghost" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="pt-2 pb-3 space-y-1">
          {filteredNavLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`${
                isActive(link.path)
                  ? "bg-primary-50 border-primary text-primary"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center justify-between px-4">
            {!isAuthenticated ? (
              <>
                <Link href="/login">
                  <Button className="bg-primary hover:bg-blue-700 text-white w-1/2 mr-2">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary hover:bg-blue-700 text-white w-1/2 ml-2">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/profile">
                  <Button className="bg-primary hover:bg-blue-700 text-white w-1/2 mr-2">
                    Profile
                  </Button>
                </Link>
                <Button 
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-1/2 ml-2"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

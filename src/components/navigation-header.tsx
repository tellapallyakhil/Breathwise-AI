import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { MessageCircle, Info, LogOut, User } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "./auth-provider";
import { signOutUser } from "@/lib/firebase";

interface NavigationHeaderProps {
  onChatToggle?: () => void;
}

export const NavigationHeader = ({ onChatToggle }: NavigationHeaderProps) => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <header className="bg-card/50 border-b backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-p
            
            rimary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm"><img src="/favicon.ico" alt="" /></span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BreatheWise AI
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <Link to="/about">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                About
              </Button>
            </Link>
            <Button 
              variant="default" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={onChatToggle}
            >
              <MessageCircle className="w-4 h-4" />
              Chat
            </Button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                      <AvatarFallback>
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </nav>
        </div>
      </div>
    </header>
  );
};

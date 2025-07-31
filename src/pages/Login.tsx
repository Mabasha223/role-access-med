import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, User, Stethoscope, Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

type UserRole = "patient" | "doctor" | "admin";

interface LoginData {
  email: string;
  password: string;
  role: UserRole;
  rememberMe: boolean;
}

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
    role: "patient",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: keyof LoginData, value: string | boolean) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Welcome back!",
        description: `Successfully logged in as ${loginData.role}`,
        variant: "default",
      });
      
      // Redirect to appropriate dashboard
      switch (loginData.role) {
        case "patient":
          navigate("/patient/dashboard");
          break;
        case "doctor":
          navigate("/doctor/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Login failed. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "patient": return <User className="h-5 w-5" />;
      case "doctor": return <Stethoscope className="h-5 w-5" />;
      case "admin": return <Shield className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "patient": return "text-primary";
      case "doctor": return "text-accent";
      case "admin": return "text-warning";
    }
  };

  const getRoleDescription = (role: UserRole) => {
    switch (role) {
      case "patient": return "Access your appointments and medical records";
      case "doctor": return "Manage your schedule and patient appointments";
      case "admin": return "Oversee system management and user administration";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="bg-gradient-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 shadow-medical">
              <Heart className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your MediBook account</p>
          </div>

          <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center">Sign In</CardTitle>
              <CardDescription className="text-center">
                Choose your role and enter your credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">I am signing in as:</Label>
                  <Select 
                    value={loginData.role} 
                    onValueChange={(value) => handleInputChange("role", value as UserRole)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <span>Patient</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="doctor">
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-accent" />
                          <span>Doctor</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="admin">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-warning" />
                          <span>Admin</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Role Description */}
                  <div className="p-3 bg-muted/50 rounded-lg border border-border/50">
                    <div className={`flex items-center gap-2 mb-1 ${getRoleColor(loginData.role)}`}>
                      {getRoleIcon(loginData.role)}
                      <span className="font-medium capitalize">{loginData.role} Login</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getRoleDescription(loginData.role)}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={loginData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                    />
                    <Label htmlFor="rememberMe" className="text-sm font-normal">
                      Remember me
                    </Label>
                  </div>
                  <Button variant="link" className="p-0 h-auto text-sm">
                    Forgot password?
                  </Button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  variant={loginData.role === "doctor" ? "medical" : loginData.role === "admin" ? "warning" : "default"}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {getRoleIcon(loginData.role)}
                      Sign in as {loginData.role.charAt(0).toUpperCase() + loginData.role.slice(1)}
                    </div>
                  )}
                </Button>

                <div className="text-center pt-4 border-t border-border">
                  <p className="text-muted-foreground">
                    Don't have an account?{" "}
                    <a href="/register" className="text-primary hover:underline font-medium">
                      Register here
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
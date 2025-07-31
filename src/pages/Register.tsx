import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, User, Stethoscope, Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

type UserRole = "patient" | "doctor" | "admin";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  // Patient fields
  age?: string;
  gender?: string;
  // Doctor fields
  specialization?: string;
  experience?: string;
  clinicAddress?: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    // Role-specific validation
    if (formData.role === "patient" && (!formData.age || !formData.gender)) {
      toast({
        title: "Error",
        description: "Please fill in all patient information",
        variant: "destructive",
      });
      return false;
    }

    if (formData.role === "doctor" && (!formData.specialization || !formData.experience || !formData.clinicAddress)) {
      toast({
        title: "Error",
        description: "Please fill in all doctor information",
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
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success!",
        description: `Registration successful as ${formData.role}`,
        variant: "default",
      });
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "patient",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="bg-gradient-primary p-3 rounded-full w-16 h-16 mx-auto mb-4 shadow-medical">
              <Heart className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Join MediBook</h1>
            <p className="text-muted-foreground">Create your account to get started with healthcare management</p>
          </div>

          <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center">Registration</CardTitle>
              <CardDescription className="text-center">
                Choose your role and fill in the required information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">I want to register as:</Label>
                  <Tabs value={formData.role} onValueChange={(value) => handleRoleChange(value as UserRole)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="patient" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Patient
                      </TabsTrigger>
                      <TabsTrigger value="doctor" className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4" />
                        Doctor
                      </TabsTrigger>
                      <TabsTrigger value="admin" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Admin
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
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
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Role-specific Fields */}
                {formData.role === "patient" && (
                  <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <h3 className="font-medium text-primary flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Patient Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age *</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Enter your age"
                          value={formData.age || ""}
                          onChange={(e) => handleInputChange("age", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <Select value={formData.gender || ""} onValueChange={(value) => handleInputChange("gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {formData.role === "doctor" && (
                  <div className="space-y-4 p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <h3 className="font-medium text-accent flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Doctor Information
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization *</Label>
                        <Input
                          id="specialization"
                          type="text"
                          placeholder="e.g., Cardiology, Dermatology"
                          value={formData.specialization || ""}
                          onChange={(e) => handleInputChange("specialization", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience *</Label>
                        <Input
                          id="experience"
                          type="number"
                          placeholder="Enter years of experience"
                          value={formData.experience || ""}
                          onChange={(e) => handleInputChange("experience", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clinicAddress">Clinic Address *</Label>
                        <Input
                          id="clinicAddress"
                          type="text"
                          placeholder="Enter your clinic address"
                          value={formData.clinicAddress || ""}
                          onChange={(e) => handleInputChange("clinicAddress", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  variant={formData.role === "doctor" ? "medical" : "default"}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {getRoleIcon(formData.role)}
                      Register as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                    </div>
                  )}
                </Button>

                <div className="text-center pt-4 border-t border-border">
                  <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary hover:underline font-medium">
                      Sign in here
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

export default Register;
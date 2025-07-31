import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Stethoscope, Calendar, Shield, Users, Clock, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Index = () => {
  const features = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Easy Scheduling",
      description: "Book appointments with your preferred doctors at convenient times"
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-accent" />,
      title: "Expert Doctors",
      description: "Connect with certified healthcare professionals across various specializations"
    },
    {
      icon: <Shield className="h-8 w-8 text-warning" />,
      title: "Secure & Private",
      description: "Your health data is protected with industry-standard security measures"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "MediBook made it so easy to find and book appointments with specialists. Highly recommended!",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      content: "The platform streamlines my practice management and improves patient communication.",
      rating: 5
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-soft min-h-[90vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                    Your Health,
                    <span className="text-primary"> Our Priority</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Connect with trusted healthcare professionals, schedule appointments with ease, 
                    and manage your health journey all in one secure platform.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">Patients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">50+</div>
                    <div className="text-sm text-muted-foreground">Doctors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative bg-gradient-primary rounded-3xl p-8 shadow-elegant">
                  <div className="bg-card rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-gradient-primary p-2 rounded-lg">
                        <Heart className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Quick Appointment</h3>
                        <p className="text-sm text-muted-foreground">Book in seconds</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-sm">Choose your specialist</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-sm">Select convenient time</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-sm">Confirm booking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose MediBook?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We're revolutionizing healthcare accessibility with cutting-edge technology 
                and patient-centered care.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-card hover:shadow-elegant transition-all duration-300 border-0">
                  <CardHeader className="text-center">
                    <div className="bg-gradient-soft p-4 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Join as
              </h2>
              <p className="text-xl text-muted-foreground">
                Choose your role and start your healthcare journey with us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-0 group cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className="bg-primary/10 group-hover:bg-primary/20 p-6 rounded-2xl w-24 h-24 mx-auto mb-4 flex items-center justify-center transition-colors">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl text-primary">Patient</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-base">
                    Book appointments, manage your health records, and connect with healthcare providers.
                  </CardDescription>
                  <Link to="/register">
                    <Button className="w-full">
                      Register as Patient
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-0 group cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className="bg-accent/10 group-hover:bg-accent/20 p-6 rounded-2xl w-24 h-24 mx-auto mb-4 flex items-center justify-center transition-colors">
                    <Stethoscope className="h-12 w-12 text-accent" />
                  </div>
                  <CardTitle className="text-2xl text-accent">Doctor</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-base">
                    Manage your practice, schedule appointments, and provide quality care to patients.
                  </CardDescription>
                  <Link to="/register">
                    <Button variant="medical" className="w-full">
                      Register as Doctor
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-0 group cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className="bg-warning/10 group-hover:bg-warning/20 p-6 rounded-2xl w-24 h-24 mx-auto mb-4 flex items-center justify-center transition-colors">
                    <Shield className="h-12 w-12 text-warning" />
                  </div>
                  <CardTitle className="text-2xl text-warning">Admin</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-base">
                    Oversee system operations, manage users, and ensure platform security.
                  </CardDescription>
                  <Link to="/login">
                    <Button variant="warning" className="w-full">
                      Admin Access
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Our Users Say
              </h2>
              <p className="text-xl text-muted-foreground">
                Real experiences from our community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-card border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Join thousands of patients and healthcare providers who trust MediBook
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="ghost" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Phone, MapPin, Heart, Plus, Bell } from "lucide-react";
import Layout from "@/components/Layout";

const PatientDashboard = () => {
  // Mock data
  const patient = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    age: 35,
    gender: "Male"
  };

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      date: "2024-08-05",
      time: "10:30 AM",
      status: "confirmed",
      location: "Heart Care Clinic"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialization: "General Practice",
      date: "2024-08-12",
      time: "2:15 PM",
      status: "pending",
      location: "Family Health Center"
    }
  ];

  const recentAppointments = [
    {
      id: 1,
      doctor: "Dr. Emily Wilson",
      specialization: "Dermatology",
      date: "2024-07-20",
      time: "11:00 AM",
      status: "completed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-accent text-accent-foreground";
      case "pending": return "bg-warning text-warning-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {patient.name}
                </h1>
                <p className="text-muted-foreground">Manage your appointments and health records</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient Info */}
            <div className="lg:col-span-1">
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-primary p-2 rounded-lg shadow-medical">
                      <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle>Patient Profile</CardTitle>
                      <CardDescription>Your personal information</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{patient.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{patient.age} years old, {patient.gender}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-card mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-accent" />
                    Health Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">2</div>
                      <div className="text-xs text-muted-foreground">Upcoming</div>
                    </div>
                    <div className="p-3 bg-accent/5 rounded-lg">
                      <div className="text-2xl font-bold text-accent">8</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Appointments */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Appointments */}
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Appointments</CardTitle>
                      <CardDescription>Your scheduled medical visits</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 bg-muted/30 rounded-lg border border-border/50">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{appointment.doctor}</h3>
                              <Badge variant="outline" className="text-xs">
                                {appointment.specialization}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{appointment.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Appointments */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Appointments</CardTitle>
                  <CardDescription>Your appointment history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-3 bg-muted/20 rounded-lg border border-border/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{appointment.doctor}</div>
                            <div className="text-sm text-muted-foreground">{appointment.specialization}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{appointment.date}</div>
                            <Badge className={getStatusColor(appointment.status)} variant="outline">
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
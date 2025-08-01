import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Calendar, Clock, User, Users, Settings, Plus, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    navigate("/login");
  };

  // Mock data
  const doctor = {
    name: "Dr. Sarah Johnson",
    specialization: "Cardiology",
    experience: "10 years",
    clinic: "Heart Care Clinic",
    email: "dr.johnson@heartcare.com"
  };

  const todayAppointments = [
    {
      id: 1,
      patient: "John Doe",
      time: "09:00 AM",
      type: "Consultation",
      status: "confirmed"
    },
    {
      id: 2,
      patient: "Jane Smith",
      time: "10:30 AM",
      type: "Follow-up",
      status: "confirmed"
    },
    {
      id: 3,
      patient: "Mike Wilson",
      time: "02:15 PM",
      type: "Check-up",
      status: "pending"
    }
  ];

  const weeklyStats = {
    totalPatients: 45,
    newPatients: 8,
    completedAppointments: 32,
    pendingAppointments: 6
  };

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
                  Good morning, {doctor.name}
                </h1>
                <p className="text-muted-foreground">Manage your schedule and patient appointments</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="medical" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Appointment
                </Button>
                <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <p className="text-2xl font-bold text-primary">{weeklyStats.totalPatients}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Patients</p>
                    <p className="text-2xl font-bold text-accent">{weeklyStats.newPatients}</p>
                  </div>
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <User className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-muted-foreground">{weeklyStats.completedAppointments}</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-warning">{weeklyStats.pendingAppointments}</p>
                  </div>
                  <div className="bg-warning/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Doctor Profile */}
            <div className="lg:col-span-1">
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-healing p-2 rounded-lg shadow-medical">
                      <Stethoscope className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle>Doctor Profile</CardTitle>
                      <CardDescription>Your professional information</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">{doctor.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Specialization</p>
                      <Badge variant="outline" className="text-accent border-accent">
                        {doctor.specialization}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-sm text-muted-foreground">{doctor.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Clinic</p>
                      <p className="text-sm text-muted-foreground">{doctor.clinic}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-card mt-6">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Schedule
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Patient Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Today's Appointments */}
            <div className="lg:col-span-2">
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Today's Appointments</CardTitle>
                      <CardDescription>
                        {new Date().toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View Calendar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:shadow-card transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">{appointment.patient}</h3>
                              <Badge variant="outline" className="text-xs">
                                {appointment.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {todayAppointments.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No appointments scheduled for today</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="shadow-card mt-6">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg">
                      <div className="bg-accent p-1 rounded-full">
                        <User className="h-3 w-3 text-accent-foreground" />
                      </div>
                      <div className="text-sm">
                        <p><strong>Jane Smith</strong> booked a follow-up appointment</p>
                        <p className="text-muted-foreground text-xs">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                      <div className="bg-primary p-1 rounded-full">
                        <Calendar className="h-3 w-3 text-primary-foreground" />
                      </div>
                      <div className="text-sm">
                        <p>Schedule updated for next week</p>
                        <p className="text-muted-foreground text-xs">5 hours ago</p>
                      </div>
                    </div>
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

export default DoctorDashboard;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, UserCheck, Stethoscope, Calendar, TrendingUp, Settings, Plus, Bell, Activity } from "lucide-react";
import Layout from "@/components/Layout";

const AdminDashboard = () => {
  // Mock data
  const admin = {
    name: "Admin User",
    email: "admin@medibook.com",
    role: "System Administrator"
  };

  const systemStats = {
    totalUsers: 1250,
    totalPatients: 850,
    totalDoctors: 45,
    totalAppointments: 2340,
    activeAppointments: 120,
    pendingRegistrations: 8
  };

  const recentActivities = [
    {
      id: 1,
      type: "registration",
      message: "New doctor registered: Dr. Michael Chen",
      time: "2 minutes ago",
      status: "pending"
    },
    {
      id: 2,
      type: "appointment",
      message: "150 appointments completed today",
      time: "1 hour ago",
      status: "completed"
    },
    {
      id: 3,
      type: "user",
      message: "Patient profile updated: Jane Smith",
      time: "3 hours ago",
      status: "completed"
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: "doctor",
      name: "Dr. Robert Wilson",
      specialization: "Orthopedics",
      submittedAt: "2024-08-01",
      status: "pending"
    },
    {
      id: 2,
      type: "doctor",
      name: "Dr. Lisa Chen",
      specialization: "Pediatrics",
      submittedAt: "2024-08-01",
      status: "pending"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "registration": return <UserCheck className="h-4 w-4" />;
      case "appointment": return <Calendar className="h-4 w-4" />;
      case "user": return <Users className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-warning text-warning-foreground";
      case "completed": return "bg-accent text-accent-foreground";
      case "active": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  System Administration
                </h1>
                <p className="text-muted-foreground">Manage users, appointments, and system settings</p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="warning" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add User
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold text-primary">{systemStats.totalUsers}</p>
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
                    <p className="text-sm text-muted-foreground">Patients</p>
                    <p className="text-2xl font-bold text-accent">{systemStats.totalPatients}</p>
                  </div>
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <UserCheck className="h-6 w-6 text-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Doctors</p>
                    <p className="text-2xl font-bold text-warning">{systemStats.totalDoctors}</p>
                  </div>
                  <div className="bg-warning/10 p-3 rounded-lg">
                    <Stethoscope className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Appointments</p>
                    <p className="text-2xl font-bold text-muted-foreground">{systemStats.totalAppointments}</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Admin Profile & Quick Stats */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-primary p-2 rounded-lg shadow-medical">
                      <Shield className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle>Admin Profile</CardTitle>
                      <CardDescription>System administrator</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">{admin.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Role</p>
                      <Badge variant="outline" className="text-warning border-warning">
                        {admin.role}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{admin.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Active Sessions</span>
                      <Badge className="bg-accent text-accent-foreground">
                        {systemStats.activeAppointments}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending Approvals</span>
                      <Badge className="bg-warning text-warning-foreground">
                        {systemStats.pendingRegistrations}
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">System running at 85% capacity</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pending Approvals */}
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Pending Approvals</CardTitle>
                      <CardDescription>New registrations requiring approval</CardDescription>
                    </div>
                    <Badge className="bg-warning text-warning-foreground">
                      {pendingApprovals.length} pending
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((approval) => (
                      <div key={approval.id} className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{approval.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {approval.specialization}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Submitted: {approval.submittedAt}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                            <Button variant="medical" size="sm">
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest system events and updates</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge className={getStatusColor(activity.status)} variant="outline">
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                      <Users className="h-5 w-5" />
                      <span className="text-sm">Manage Users</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                      <Calendar className="h-5 w-5" />
                      <span className="text-sm">Appointments</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-sm">Reports</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                      <Settings className="h-5 w-5" />
                      <span className="text-sm">Settings</span>
                    </Button>
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

export default AdminDashboard;
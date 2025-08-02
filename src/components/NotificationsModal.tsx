import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, User, Clock, Check } from "lucide-react";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      type: "appointment",
      title: "New Appointment Booked",
      message: "Jane Smith has booked an appointment for tomorrow at 10:30 AM",
      time: "5 minutes ago",
      read: false,
      icon: Calendar
    },
    {
      id: 2,
      type: "patient",
      title: "Patient Registration",
      message: "New patient Mike Wilson has registered and requested an appointment",
      time: "1 hour ago",
      read: false,
      icon: User
    },
    {
      id: 3,
      type: "reminder",
      title: "Appointment Reminder",
      message: "Reminder: John Doe has an appointment in 30 minutes",
      time: "2 hours ago",
      read: true,
      icon: Clock
    },
    {
      id: 4,
      type: "appointment",
      title: "Appointment Cancelled",
      message: "Tom Brown has cancelled his appointment scheduled for today at 2:00 PM",
      time: "3 hours ago",
      read: true,
      icon: Calendar
    },
    {
      id: 5,
      type: "patient",
      title: "Patient Update",
      message: "Sarah Johnson has updated her medical information",
      time: "1 day ago",
      read: true,
      icon: User
    }
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "appointment": return "bg-primary/10 text-primary";
      case "patient": return "bg-accent/10 text-accent";
      case "reminder": return "bg-warning/10 text-warning";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Stay updated with your latest notifications
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Check className="h-4 w-4" />
              Mark all as read
            </Button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <Card key={notification.id} className={`${!notification.read ? 'border-primary/50 shadow-card' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {notifications.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications yet</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
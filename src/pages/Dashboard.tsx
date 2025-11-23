import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { DashboardCard } from "@/components/DashboardCard";
import { 
  FileText, 
  RadioTower, 
  MessageSquare, 
  Bell,
  Users,
  Clock,
  MessageCircle,
  MessagesSquare,
  Phone,
  PhoneCall,
  Send,
  Mail
} from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const dashboardItems = [
    { title: "Forms", icon: FileText, path: "/forms" },
    { title: "Live Forms", icon: RadioTower, path: "/live-forms" },
    { title: "Messages", icon: MessageSquare, path: "/messages" },
    { title: "Notifications", icon: Bell, path: "/notifications" },
    { title: "Users", icon: Users, path: "/users" },
    { title: "Live Alerts", icon: Clock, path: "/live-alerts" },
    { title: "Single SMS Forward", icon: MessageCircle, path: "/sms-single" },
    { title: "Batch SMS Forward", icon: MessagesSquare, path: "/sms-batch" },
    { title: "Single Call Forward", icon: Phone, path: "/call-single" },
    { title: "Batch Call Forward", icon: PhoneCall, path: "/call-batch" },
    { title: "Telegram Forward", icon: Send, path: "/telegram" },
    { title: "Send SMS", icon: Mail, path: "/send-sms" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-destructive px-6 py-3">
        <h1 className="text-2xl font-bold text-destructive-foreground">Kosmos</h1>
      </header>

      {/* Hero Banner */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={heroBanner} 
          alt="Dashboard Hero" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-16 relative z-10 pb-8">
        {/* Welcome Card */}
        <Card className="mb-8 border-border/50 bg-card/95 backdrop-blur">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-primary mb-2">Welcome rto156xp</h2>
            <p className="text-sm text-muted-foreground mb-1">{currentDate}</p>
            <p className="text-lg font-bold text-foreground">Total Installs: 447</p>
          </CardContent>
        </Card>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {dashboardItems.map((item) => (
            <DashboardCard
              key={item.path}
              title={item.title}
              icon={item.icon}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

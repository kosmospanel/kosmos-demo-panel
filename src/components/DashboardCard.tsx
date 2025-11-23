import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export const DashboardCard = ({ title, icon: Icon, onClick, className }: DashboardCardProps) => {
  return (
    <Card 
      className={cn(
        "group cursor-pointer overflow-hidden border-border/50 bg-card hover:bg-accent transition-all duration-300 hover:shadow-lg hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-6 h-32">
        <Icon className="w-8 h-8 mb-3 text-foreground/80 group-hover:text-foreground transition-colors" />
        <h3 className="text-sm font-medium text-center text-foreground/90 group-hover:text-foreground transition-colors">
          {title}
        </h3>
      </CardContent>
    </Card>
  );
};

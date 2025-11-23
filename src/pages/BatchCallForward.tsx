import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PhoneCall } from "lucide-react";

const BatchCallForward = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-6 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <PhoneCall className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Batch Call Forward</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Batch Call Forwarding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Configure batch call forwarding rules for multiple devices. Set up call distribution and routing preferences.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BatchCallForward;

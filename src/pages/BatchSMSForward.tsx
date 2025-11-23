import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const BatchSMSForward = () => {
  const navigate = useNavigate();
  const [forwardNumber, setForwardNumber] = useState("9263324722");
  const [isEnabled, setIsEnabled] = useState(true);

  const handleUpdate = () => {
    if (forwardNumber.trim()) {
      setIsEnabled(true);
      toast.success("Batch SMS forward number updated");
    } else {
      setIsEnabled(false);
      toast.success("Batch SMS forward disabled");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-destructive px-6 py-4 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/")}
          className="text-destructive-foreground hover:bg-destructive-foreground/10"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-destructive-foreground">Batch SMS Forward</h1>
          <p className="text-sm text-destructive-foreground/80">(Online + Offline)</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-border/50">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-3">
              <label className="text-base font-semibold text-foreground">
                Batch SMS Forward Number
              </label>
              <Input
                value={forwardNumber}
                onChange={(e) => setForwardNumber(e.target.value)}
                placeholder="Enter batch SMS forward number"
                className="bg-background text-lg"
              />
            </div>

            <Button 
              onClick={handleUpdate}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-base"
            >
              Update Phone Number
            </Button>

            <div className="space-y-2">
              <p className="font-semibold text-foreground">
                Batch SMS Forward Status:
              </p>
              <p className={`text-lg font-bold ${isEnabled && forwardNumber ? "text-primary" : "text-destructive"}`}>
                {isEnabled && forwardNumber ? "Enabled" : "Disabled"}
              </p>
            </div>

            <div className="text-sm text-destructive space-y-2 border-t border-border pt-4">
              <p className="font-semibold">Note:</p>
              <p>To enable batch SMS forward, enter a phone number.</p>
              <p>To disable batch SMS forward, remove the phone number.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BatchSMSForward;

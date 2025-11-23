import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LiveForms from "./pages/LiveForms";
import Messages from "./pages/Messages";
import Forms from "./pages/Forms";
import SendSMS from "./pages/SendSMS";
import Users from "./pages/Users";
import LiveAlerts from "./pages/LiveAlerts";
import Notifications from "./pages/Notifications";
import SingleSMSForward from "./pages/SingleSMSForward";
import BatchSMSForward from "./pages/BatchSMSForward";
import SingleCallForward from "./pages/SingleCallForward";
import BatchCallForward from "./pages/BatchCallForward";
import TelegramForward from "./pages/TelegramForward";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/live-forms" element={<LiveForms />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/send-sms" element={<SendSMS />} />
          <Route path="/users" element={<Users />} />
          <Route path="/live-alerts" element={<LiveAlerts />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/sms-single" element={<SingleSMSForward />} />
          <Route path="/sms-batch" element={<BatchSMSForward />} />
          <Route path="/call-single" element={<SingleCallForward />} />
          <Route path="/call-batch" element={<BatchCallForward />} />
          <Route path="/telegram" element={<TelegramForward />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { DoctorInfoPanel } from "@/components/admin/DoctorInfoPanel";
import { ChamberLocationsPanel } from "@/components/admin/ChamberLocationsPanel";
import { AddLocationPanel } from "@/components/admin/AddLocationPanel";
import { RoutineManagementPanel } from "@/components/admin/RoutineManagementPanel";
import { MessagesPanel } from "@/components/admin/MessagesPanel";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { currentUser, signOut, loading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState("doctor-info");

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-muted/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="bg-background shadow-md border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold heading-gradient">Sudipa Netralaya Admin</h1>
            <span className="text-sm px-2 py-1 bg-eyepurple/10 text-eyepurple rounded-md">
              {currentUser?.email}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            <Button size="sm" variant="outline" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                View Website
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full mb-8 flex overflow-x-auto space-x-1 bg-muted">
            <TabsTrigger value="doctor-info">Doctor Info</TabsTrigger>
            <TabsTrigger value="locations">Chamber Locations</TabsTrigger>
            <TabsTrigger value="add-location">Add New Location</TabsTrigger>
            <TabsTrigger value="routine">Routine Management</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TabsContent value="doctor-info" className="space-y-4">
              <DoctorInfoPanel />
            </TabsContent>

            <TabsContent value="locations" className="space-y-4">
              <ChamberLocationsPanel />
            </TabsContent>

            <TabsContent value="add-location" className="space-y-4">
              <AddLocationPanel />
            </TabsContent>

            <TabsContent value="routine" className="space-y-4">
              <RoutineManagementPanel />
            </TabsContent>

            <TabsContent value="messages" className="space-y-4">
              <MessagesPanel />
            </TabsContent>
          </motion.div>
        </Tabs>
      </main>
    </motion.div>
  );
}

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardStats from "@/components/dashboard/DashboardStats";
import ExerciseLibrary from "@/components/dashboard/ExerciseLibrary";
import FitnessMetricsCard from "@/components/dashboard/FitnessMetricsCard";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [currentDate, setCurrentDate] = useState("");

  // Format current date
  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }));
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access the dashboard",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate, toast]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="dashboard">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-medium">Dashboard</CardTitle>
              <p className="text-sm text-gray-500">Your fitness summary for today</p>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Today is </span>
              <span className="font-medium">{currentDate}</span>
            </div>
          </CardHeader>
          <CardContent>
            <DashboardStats />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Progress Card */}
          <FitnessMetricsCard 
            title="Weekly Progress"
            chartType="progress"
            footerLink={{
              text: "View detailed stats",
              href: "/progress"
            }}
          />
          
          {/* Today's Workout Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Today's Workout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900">Upper Body Strength</h4>
                <p className="text-sm text-gray-500">45 min · Medium intensity</p>
              </div>
              <ul className="divide-y divide-gray-200">
                <li className="py-2 flex justify-between">
                  <span className="text-sm">Bench Press</span>
                  <span className="text-sm text-gray-500">3 sets × 10 reps</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span className="text-sm">Pull-ups</span>
                  <span className="text-sm text-gray-500">3 sets × 8 reps</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span className="text-sm">Shoulder Press</span>
                  <span className="text-sm text-gray-500">3 sets × 12 reps</span>
                </li>
                <li className="py-2 flex justify-between">
                  <span className="text-sm">Bicep Curls</span>
                  <span className="text-sm text-gray-500">3 sets × 15 reps</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="bg-gray-50 px-5 py-3">
              <a href="#" className="text-sm font-medium text-primary hover:text-blue-700 flex items-center">
                Start workout 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </a>
            </CardFooter>
          </Card>
          
          {/* Nutrition Card */}
          <FitnessMetricsCard 
            title="Nutrition Summary"
            chartType="nutrition"
            footerLink={{
              text: "Log meal",
              href: "/nutrition"
            }}
          />
        </div>

        {/* Exercise Library Section */}
        <div className="mt-8">
          <ExerciseLibrary />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

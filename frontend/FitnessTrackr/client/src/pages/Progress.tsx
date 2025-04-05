import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data for charts
const weightData = [
  { date: "Jan 1", weight: 75 },
  { date: "Jan 8", weight: 74.5 },
  { date: "Jan 15", weight: 74.2 },
  { date: "Jan 22", weight: 73.8 },
  { date: "Jan 29", weight: 73.5 },
  { date: "Feb 5", weight: 72.9 },
  { date: "Feb 12", weight: 72.5 },
];

const strengthData = [
  { date: "Jan 1", benchPress: 60, squat: 100, deadlift: 120 },
  { date: "Jan 15", benchPress: 65, squat: 105, deadlift: 125 },
  { date: "Feb 1", benchPress: 67.5, squat: 110, deadlift: 130 },
  { date: "Feb 15", benchPress: 70, squat: 115, deadlift: 135 },
];

const cardioData = [
  { date: "Jan 3", duration: 25, distance: 3.5 },
  { date: "Jan 10", duration: 28, distance: 4.0 },
  { date: "Jan 17", duration: 30, distance: 4.2 },
  { date: "Jan 24", duration: 32, distance: 4.5 },
  { date: "Jan 31", duration: 35, distance: 5.0 },
  { date: "Feb 7", duration: 35, distance: 5.2 },
  { date: "Feb 14", duration: 38, distance: 5.5 },
];

const bodyMeasurementsData = [
  { date: "Jan 1", chest: 95, waist: 85, arms: 35, thighs: 55 },
  { date: "Jan 15", chest: 96, waist: 84, arms: 35.5, thighs: 55.5 },
  { date: "Feb 1", chest: 96.5, waist: 83, arms: 36, thighs: 56 },
  { date: "Feb 15", chest: 97, waist: 82, arms: 36.5, thighs: 56.5 },
];

const Progress = () => {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access your progress data",
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>
          <p className="text-gray-600">Monitor your fitness journey and celebrate your achievements</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline">Export Data</Button>
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Log Measurement
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strength">Strength</TabsTrigger>
          <TabsTrigger value="cardio">Cardio</TabsTrigger>
          <TabsTrigger value="body">Body Measurements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Weight Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={weightData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#3B82F6" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Starting Weight</p>
                  <p className="text-xl font-bold">{weightData[0].weight} kg</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Current Weight</p>
                  <p className="text-xl font-bold">{weightData[weightData.length - 1].weight} kg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">New 5k Personal Best</p>
                      <p className="text-sm text-gray-500">Feb 14, 2023</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Bench Press 70kg</p>
                      <p className="text-sm text-gray-500">Feb 15, 2023</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Completed 30-Day Challenge</p>
                      <p className="text-sm text-gray-500">Jan 31, 2023</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Monthly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Workouts Completed</span>
                      <span className="text-sm text-gray-500">18/20</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-primary h-2.5 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Cardio Sessions</span>
                      <span className="text-sm text-gray-500">12/12</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Strength Training</span>
                      <span className="text-sm text-gray-500">8/12</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "66%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Nutrition Goals</span>
                      <span className="text-sm text-gray-500">22/28</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="strength" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Strength Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={strengthData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="benchPress" name="Bench Press (kg)" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="squat" name="Squat (kg)" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="deadlift" name="Deadlift (kg)" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Bench Press</h3>
                  <div className="mt-1 flex justify-between items-baseline">
                    <p className="text-xl font-semibold text-gray-900">70 kg</p>
                    <p className="text-sm text-green-600">
                      +16.7%
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Squat</h3>
                  <div className="mt-1 flex justify-between items-baseline">
                    <p className="text-xl font-semibold text-gray-900">115 kg</p>
                    <p className="text-sm text-green-600">
                      +15.0%
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Deadlift</h3>
                  <div className="mt-1 flex justify-between items-baseline">
                    <p className="text-xl font-semibold text-gray-900">135 kg</p>
                    <p className="text-sm text-green-600">
                      +12.5%
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Strength Training Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-200">
                {strengthData.map((entry, index) => (
                  <div key={index} className="py-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{entry.date}</h3>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Bench Press</p>
                        <p className="font-medium">{entry.benchPress} kg</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Squat</p>
                        <p className="font-medium">{entry.squat} kg</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Deadlift</p>
                        <p className="font-medium">{entry.deadlift} kg</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cardio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Cardio Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={cardioData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="duration" name="Duration (min)" stroke="#3B82F6" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="distance" name="Distance (km)" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Average Duration</h3>
                  <div className="mt-1 flex justify-between items-baseline">
                    <p className="text-xl font-semibold text-gray-900">31.9 minutes</p>
                    <p className="text-sm text-green-600">
                      +52.0%
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Average Distance</h3>
                  <div className="mt-1 flex justify-between items-baseline">
                    <p className="text-xl font-semibold text-gray-900">4.6 km</p>
                    <p className="text-sm text-green-600">
                      +57.1%
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Cardio Sessions Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-200">
                {cardioData.map((entry, index) => (
                  <div key={index} className="py-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{entry.date}</h3>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Activity</p>
                        <p className="font-medium">Running</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{entry.duration} min</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Distance</p>
                        <p className="font-medium">{entry.distance} km</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="body" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Body Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={bodyMeasurementsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="chest" name="Chest (cm)" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="waist" name="Waist (cm)" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="arms" name="Arms (cm)" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="thighs" name="Thighs (cm)" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Chest</h3>
                  <div className="mt-1 flex justify-between items-baseline">
                    <p className="text-xl font-semibold text-gray-900">97 cm</p>
                    <p className="text-sm text-green-600">
                      +2.1%
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Waist</h3>
                  <div className="mt-1 flex justify-between items-baseline">
                    <p className="text-xl font-semibold text-gray-900">82 cm</p>
                    <p className="text-sm text-green-600">
                      -3.5%
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Arms</h3>
                  <div className="mt-1 flex justify-between items-baseline">
                    <p className="text-xl font-semibold text-gray-900">36.5 cm</p>
                    <p className="text-sm text-green-600">
                      +4.3%
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500">Thighs</h3>
                  <div className="mt-1 flex justify-between items-baseline">
                    <p className="text-xl font-semibold text-gray-900">56.5 cm</p>
                    <p className="text-sm text-green-600">
                      +2.7%
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Progress Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-center text-gray-500">Jan 1, 2023</p>
                </div>
                
                <div className="space-y-2">
                  <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-center text-gray-500">Jan 15, 2023</p>
                </div>
                
                <div className="space-y-2">
                  <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-center text-gray-500">Feb 1, 2023</p>
                </div>
                
                <div className="space-y-2">
                  <div className="aspect-square bg-gray-200 rounded-md flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-center text-gray-500">Feb 15, 2023</p>
                </div>
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Upload New Photo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Progress;

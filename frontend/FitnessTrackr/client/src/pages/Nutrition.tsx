import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const Nutrition = () => {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access nutrition tracking",
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
          <h1 className="text-2xl font-bold text-gray-900">Nutrition</h1>
          <p className="text-gray-600">Track your meals and nutritional intake</p>
        </div>
        <Button className="mt-4 md:mt-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Log New Meal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Daily Nutrition Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-6">
              <div>
                <p className="text-2xl font-bold">1,450 / 2,200</p>
                <p className="text-sm text-gray-500">Calories consumed</p>
              </div>
              <div className="w-24 h-24 rounded-full border-8 border-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary">66%</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Protein</span>
                  <span className="text-sm text-gray-500">95g / 120g</span>
                </div>
                <Progress value={79} className="h-2 bg-gray-200" indicatorColor="bg-blue-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Carbohydrates</span>
                  <span className="text-sm text-gray-500">160g / 250g</span>
                </div>
                <Progress value={64} className="h-2 bg-gray-200" indicatorColor="bg-yellow-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Fat</span>
                  <span className="text-sm text-gray-500">45g / 85g</span>
                </div>
                <Progress value={53} className="h-2 bg-gray-200" indicatorColor="bg-red-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Fiber</span>
                  <span className="text-sm text-gray-500">18g / 25g</span>
                </div>
                <Progress value={72} className="h-2 bg-gray-200" indicatorColor="bg-green-500" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Sugar</span>
                  <span className="text-sm text-gray-500">32g / 50g</span>
                </div>
                <Progress value={64} className="h-2 bg-gray-200" indicatorColor="bg-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Water Intake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-180">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    strokeDasharray="282.7"
                    strokeDashoffset={282.7 * (1 - 1.2 / 2.5)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl font-bold text-primary">1.2L</p>
                  <p className="text-sm text-gray-500">of 2.5L</p>
                </div>
              </div>
              <div className="flex space-x-4 mb-2">
                <Button size="sm" variant="outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  250ml
                </Button>
                <Button size="sm" variant="outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  500ml
                </Button>
              </div>
              <p className="text-sm text-gray-600 text-center">Remember to stay hydrated throughout the day!</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Today's Meals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-gray-200">
            <div className="py-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Breakfast</h3>
                <p className="text-sm text-gray-500">Oatmeal with berries and banana</p>
                <div className="flex space-x-2 mt-1">
                  <span className="text-xs text-gray-500">380 kcal</span>
                  <span className="text-xs text-gray-500">12g protein</span>
                  <span className="text-xs text-gray-500">65g carbs</span>
                  <span className="text-xs text-gray-500">8g fat</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>

            <div className="py-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Lunch</h3>
                <p className="text-sm text-gray-500">Grilled chicken salad with vinaigrette</p>
                <div className="flex space-x-2 mt-1">
                  <span className="text-xs text-gray-500">520 kcal</span>
                  <span className="text-xs text-gray-500">45g protein</span>
                  <span className="text-xs text-gray-500">35g carbs</span>
                  <span className="text-xs text-gray-500">18g fat</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>

            <div className="py-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Snack</h3>
                <p className="text-sm text-gray-500">Greek yogurt with honey and nuts</p>
                <div className="flex space-x-2 mt-1">
                  <span className="text-xs text-gray-500">250 kcal</span>
                  <span className="text-xs text-gray-500">18g protein</span>
                  <span className="text-xs text-gray-500">22g carbs</span>
                  <span className="text-xs text-gray-500">10g fat</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>

            <div className="py-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Dinner</h3>
                <p className="text-sm text-gray-500">Salmon with quinoa and roasted vegetables</p>
                <div className="flex space-x-2 mt-1">
                  <span className="text-xs text-gray-500">550 kcal</span>
                  <span className="text-xs text-gray-500">42g protein</span>
                  <span className="text-xs text-gray-500">48g carbs</span>
                  <span className="text-xs text-gray-500">22g fat</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">Edit</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Nutrition;

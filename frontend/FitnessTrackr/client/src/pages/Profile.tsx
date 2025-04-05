import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  age: z.string().min(1, "Age is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  goals: z.array(z.string()).min(1, "Select at least one goal"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  // Define default values based on user data
  const defaultValues: ProfileFormValues = {
    firstName: user?.firstName || "Jane",
    lastName: user?.lastName || "Smith",
    email: user?.email || "jane.smith@example.com",
    age: "32",
    height: "170",
    weight: "65.8",
    goals: ["build-muscle", "improve-endurance"],
  };

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to access your profile",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [isAuthenticated, navigate, toast]);

  const onSubmit = (data: ProfileFormValues) => {
    // Here you would normally send this data to your API
    console.log(data);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset(defaultValues);
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="profile">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg leading-6 font-medium text-gray-900">Profile Information</CardTitle>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and fitness goals</p>
          </CardHeader>
          <CardContent>
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-t-md">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.firstName} {user?.lastName || "Smith"}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">32</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Height</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">5'7" (170 cm)</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Weight</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">145 lbs (65.8 kg)</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-b-md">
                <dt className="text-sm font-medium text-gray-500">Fitness goals</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Build muscle, Improve endurance</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-lg leading-6 font-medium text-gray-900">Profile Settings</CardTitle>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Update your profile information</p>
            </div>
            {!isEditing && (
              <Button 
                className="px-4 py-2" 
                onClick={() => setIsEditing(true)}
              >
                Edit profile
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                  <div className="mt-1">
                    <Input
                      id="first-name"
                      type="text"
                      {...register("firstName")}
                      disabled={!isEditing}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                  <div className="mt-1">
                    <Input
                      id="last-name"
                      type="text"
                      {...register("lastName")}
                      disabled={!isEditing}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      disabled={!isEditing}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                  <div className="mt-1">
                    <Input
                      id="age"
                      type="number"
                      {...register("age")}
                      disabled={!isEditing}
                      className={errors.age ? "border-red-500" : ""}
                    />
                    {errors.age && (
                      <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
                  <div className="mt-1">
                    <Input
                      id="height"
                      type="number"
                      {...register("height")}
                      disabled={!isEditing}
                      className={errors.height ? "border-red-500" : ""}
                    />
                    {errors.height && (
                      <p className="text-red-500 text-xs mt-1">{errors.height.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                  <div className="mt-1">
                    <Input
                      id="weight"
                      type="number"
                      {...register("weight")}
                      disabled={!isEditing}
                      className={errors.weight ? "border-red-500" : ""}
                    />
                    {errors.weight && (
                      <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="goals" className="block text-sm font-medium text-gray-700">Fitness goals</label>
                  <div className="mt-1">
                    <Controller
                      control={control}
                      name="goals"
                      render={({ field }) => (
                        <Select
                          disabled={!isEditing}
                          onValueChange={(value) => field.onChange([value])}
                          defaultValue={field.value[0]}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your fitness goals" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lose-weight">Lose weight</SelectItem>
                            <SelectItem value="build-muscle">Build muscle</SelectItem>
                            <SelectItem value="improve-endurance">Improve endurance</SelectItem>
                            <SelectItem value="flexibility">Increase flexibility</SelectItem>
                            <SelectItem value="general-fitness">General fitness</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.goals && (
                      <p className="text-red-500 text-xs mt-1">{errors.goals.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleCancel}
                    className="mr-3"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;

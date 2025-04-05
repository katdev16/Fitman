import { Progress } from "@/components/ui/progress";

const DashboardStats = () => {
  return (
    <dl>
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-t-md">
        <dt className="text-sm font-medium text-gray-500">Daily calories burned</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
          <span className="mr-2">458 kcal</span>
          <Progress value={45} className="w-24 h-2" />
        </dd>
      </div>
      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Steps taken</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
          <span className="mr-2">6,287</span>
          <Progress value={63} className="w-24 h-2" />
        </dd>
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Workouts completed</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
          <span className="mr-2">1 of 3</span>
          <Progress value={33} className="w-24 h-2" />
        </dd>
      </div>
      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 rounded-b-md">
        <dt className="text-sm font-medium text-gray-500">Water intake</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center">
          <span className="mr-2">1.2L of 2.5L goal</span>
          <Progress value={48} className="w-24 h-2" />
        </dd>
      </div>
    </dl>
  );
};

export default DashboardStats;

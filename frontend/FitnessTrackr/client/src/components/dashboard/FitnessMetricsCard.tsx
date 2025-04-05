import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";

interface FooterLink {
  text: string;
  href: string;
}

interface FitnessMetricsCardProps {
  title: string;
  chartType: 'progress' | 'nutrition';
  footerLink: FooterLink;
}

const FitnessMetricsCard = ({ title, chartType, footerLink }: FitnessMetricsCardProps) => {
  const renderChart = () => {
    if (chartType === 'progress') {
      return (
        <div className="h-60 bg-gray-100 rounded-md flex items-center justify-center">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-gray-500 mt-2">Progress chart will appear here</p>
          </div>
        </div>
      );
    } else if (chartType === 'nutrition') {
      return (
        <>
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Calories</p>
              <p className="text-xl font-bold">1,450 / 2,200</p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-secondary flex items-center justify-center text-secondary font-bold">
              66%
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Protein</p>
              <p className="font-medium">95g</p>
              <Progress value={75} className="h-2 mt-1 bg-gray-200" indicatorColor="bg-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Carbs</p>
              <p className="font-medium">160g</p>
              <Progress value={60} className="h-2 mt-1 bg-gray-200" indicatorColor="bg-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Fat</p>
              <p className="font-medium">45g</p>
              <Progress value={50} className="h-2 mt-1 bg-gray-200" indicatorColor="bg-red-500" />
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2 border-b border-gray-200">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        {renderChart()}
      </CardContent>
      <CardFooter className="bg-gray-50 px-5 py-3">
        <Link href={footerLink.href}>
          <a className="text-sm font-medium text-primary hover:text-blue-700 flex items-center">
            {footerLink.text}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FitnessMetricsCard;

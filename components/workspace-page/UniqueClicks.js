"use client";

import { TrendingUp } from "lucide-react";
import { BiSolidDownArrow } from "react-icons/bi";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A linear line chart";

const chartData = [
  { month: "January", desktop: 0 },
  { month: "February", desktop: 1 },
  { month: "March", desktop: 3 },
  { month: "April", desktop: 5 },
  { month: "May", desktop: 7 },
  { month: "June", desktop: 10 },
  { month: "July", desktop: 12 },
  { month: "August", desktop: 13 },
  { month: "September", desktop: 14 },
  { month: "October", desktop: 15 },
  { month: "November", desktop: 16 },
  { month: "December", desktop: 18 },
];

const chartConfig = {
  desktop: {
    label: "Clicks",
    color: "#00a766",
  },
};

function UniqueClicks() {
  return (
    <Card className="text-white rounded-3xl bg-transparent bg-gradient-to-r from-[#00a766]/10 to-[#999999]/10 backdrop-blur-[9.3px] border border-card w-[40%] h-full">
      <CardHeader>
        <CardTitle className="text-2xl text-btnlime font-medium capitalize">
          unique clicks
        </CardTitle>
        <CardDescription className="text-base font-medium text-fontlight">
          Growth of Unique users who visited product
        </CardDescription>
        <CardDescription className="text-3xl font-bold text-fontlight mt-4">
          100K
        </CardDescription>
        <CardDescription className="flex items-center gap-3 text-xs font-bold">
          <span className="flex items-center gap-1 text-red-500 font-normal">
            <BiSolidDownArrow />
            10%
          </span>
          <span className="text-fontlight capitalize">last 1 month</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={5}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className="text-[#00a766]" /*hideLabel*/ />
              }
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="#00a766"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}

export default UniqueClicks;

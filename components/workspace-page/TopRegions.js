"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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

export const description = "A mixed bar chart";

const chartData = [
  { browser: "chrome", visitors: 295, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors", //for the text on the tooltip inbetween the square color and numbers
  },
  chrome: {
    label: "Asia",
    color: "#147aff",
  },
  safari: {
    label: "America",
    color: "#ff1414",
  },
  firefox: {
    label: "Africa",
    color: "#ffe014",
  },
  edge: {
    label: "Europe",
    color: "#9514ff",
  },
  other: {
    label: "Australia",
    color: "#14ff18",
  },
};

export default function TopRegions() {
  return (
    <Card className="flex flex-col justify-between text-white rounded-3xl bg-transparent bg-gradient-to-r from-[#00a766]/10 to-[#999999]/10 backdrop-blur-[9.3px] border border-card w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl text-btnlime font-medium capitalize">
          top regions
        </CardTitle>
        <CardDescription className="text-base font-medium text-fontlight">
          Top Regions where your Product has been engaged from
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />
            <XAxis dataKey="visitors" type="number" /*hide*/ />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent className="text-black" /*hideLabel*/ />
              }
            />
            <Bar dataKey="visitors" layout="vertical" radius={15} />
          </BarChart>
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

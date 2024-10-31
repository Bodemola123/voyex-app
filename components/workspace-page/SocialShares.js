"use client";

// import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  // ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", facebook: 186, twitter: 80, instagram: 50 },
  { month: "February", facebook: 305, twitter: 200, instagram: 50 },
  { month: "March", facebook: 237, twitter: 120, instagram: 50 },
  { month: "April", facebook: 73, twitter: 190, instagram: 50 },
  { month: "May", facebook: 209, twitter: 130, instagram: 50 },
  { month: "June", facebook: 214, twitter: 140, instagram: 50 },
];

const chartConfig = {
  facebook: {
    label: "Facebook",
    color: "#46BA3C",
  },
  twitter: {
    label: "Twitter",
    color: "#33E9AB",
  },
  instagram: {
    label: "Instagram",
    color: "#84DE7C",
  },
};

export default function SocialShares() {
  return (
    <Card className="text-white rounded-3xl bg-transparent bg-gradient-to-r from-[#00a766]/10 to-[#999999]/10 backdrop-blur-[9.3px] border border-card">
      <CardHeader>
        <CardTitle className="text-2xl text-btnlime font-medium capitalize">
          Social Shares
        </CardTitle>
        <CardDescription className="text-base font-medium text-fontlight">
          Number of times the product page has been shared on social media
          platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-5">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  // indicator="dashed"
                  className=" text-[#00a766]"
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="facebook" fill="var(--color-facebook)" radius={2} />
            <Bar dataKey="twitter" fill="var(--color-twitter)" radius={2} />
            <Bar dataKey="instagram" fill="var(--color-instagram)" radius={2} />
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

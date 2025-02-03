import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

function Keyword() {
  return (
    <Card className="text-white rounded-3xl bg-[#131314] border-none">
      <CardHeader>
        <CardTitle className="text-2xl text-white font-medium capitalize">
          keyword
        </CardTitle>
        <CardDescription className="text-base font-medium text-fontlight">
          This sows the AI-identified most used hashtags
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-5 grid grid-cols-4 gap-3">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="text-sm text-center font-medium text-[#c088fb] px-2 py-1 rounded-2xl bg-[#9747FF3D]"
          >
            Theme {i + 1}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default Keyword;

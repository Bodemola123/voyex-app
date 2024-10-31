import { NextRequest, NextResponse } from "next/server";
import pRetry from "p-retry";

export async function POST(req) {
  try {
    const body = await req.json();
    const data = await pRetry(
      () =>
        fetch(
          "https://xkdcd1ic4k.execute-api.ap-southeast-2.amazonaws.com/dev/sq",
          {
            method: "POST",
            headers: {
              "x-api-key": process.env.X_QUERY_SEARCH_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        ).then((response) => {
          if (!response.ok)
            throw new Error(`API responded with status ${response.status}`);
          return response.json();
        }),
      { retries: 1 }
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data from API" },
      { status: 500 }
    );
  }
}

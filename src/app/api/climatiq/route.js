import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;

  console.log(
    "Incoming parameters:",
    Object.fromEntries(searchParams.entries())
  );

  const baseURL = "https://api.climatiq.io";

  try {
    const climatiqParams = new URLSearchParams();
    climatiqParams.append(
      "results_per_page",
      searchParams.get("resultsPerPage") || "500"
    );
    climatiqParams.append("page", searchParams.get("page") || "1");

    if (searchParams.get("year")) {
      climatiqParams.append("year", searchParams.get("year"));
    }

    if (searchParams.get("region")) {
      climatiqParams.append("region", searchParams.get("region"));
    }

    if (searchParams.get("category")) {
      climatiqParams.append("category", searchParams.get("category"));
    }

    if (searchParams.get("source")) {
      climatiqParams.append("source", searchParams.get("source"));
    }

    if (process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION) {
      climatiqParams.append(
        "data_version",
        `^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`
      );
    }

    const url = `${baseURL}/data/v1/search?${climatiqParams.toString()}`;
    console.log("Climatiq API URL:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.CLIMATIQ_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Climatiq API Error:", {
        status: response.status,
        statusText: response.statusText,
        errorData,
      });
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch data from Climatiq" },
      { status: 400 }
    );
  }
}

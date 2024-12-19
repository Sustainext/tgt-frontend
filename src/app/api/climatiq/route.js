// app/api/climatiq/route.js
import { NextResponse } from "next/server";

const CLIMATIQ_API_KEY = process.env.CLIMATIQ_KEY;
const BASE_URL = "https://api.climatiq.io";

async function fetchClimatiqData(params) {
  const { subcategory, page, region, year, source } = params;
  const resultsPerPage = 500;

  const url = source
    ? `${BASE_URL}/data/v1/search?results_per_page=${resultsPerPage}&source=${source}&year=${year}&region=*&category=${subcategory}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`
    : `${BASE_URL}/data/v1/search?results_per_page=${resultsPerPage}&year=${year}&region=${region}*&category=${subcategory}&page=${page}&data_version=^${process.env.NEXT_PUBLIC_APP_CLIMATIQ_DATAVERSION}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
      Accept: "application/json",
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Climatiq API error: ${response.statusText}`);
  }

  return response.json();
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const subcategory = searchParams.get("subcategory");
    const page = searchParams.get("page") || 1;
    const region = searchParams.get("region") || "*";
    const year = searchParams.get("year");
    const source = searchParams.get("source");

    if (!subcategory || !year) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const data = await fetchClimatiqData({
      subcategory,
      page,
      region,
      year,
      source,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching climatiq data:", error);
    return NextResponse.json(
      { error: "Failed to fetch climatiq data" },
      { status: 500 }
    );
  }
}

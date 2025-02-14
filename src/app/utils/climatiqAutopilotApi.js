import {post} from "./axiosMiddleware";

const CLIMATIQ_API_KEY = process.env.NEXT_PUBLIC_CLIMATIQ_API_KEY;

export const fetchAutopilotSuggestions = async (query, country, year, unitType) => {
  const url = 'https://preview.api.climatiq.io/autopilot/v1-preview3/suggest';

  try {
    const response = await post(url, {
      query,
      country,
      year,
      unit_type: unitType
    }, {
      headers: {
        Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.suggestions || [];
  } catch (error) {
    console.error('Failed to fetch autopilot suggestions:', error);
    return [];
  }
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { apiClient } from "../../utils/api-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Retrieve the access token using the refresh token
    const { page, per_page } = req.query as { page: string; per_page: string };

    // Make a GET request to the Zoho API to retrieve job openings
    const response = await apiClient.request<{ data: unknown }>({
      baseUrl: "https://recruit.zoho.com/recruit/v2",
      endpoint: "/JobOpenings",
      params: {
        page,
        per_page,
      },
    });

    // Extract the job openings from the response
    const jobOpenings = response.data;

    console.log("CHECK - JOBS", response);

    res.status(200).json(jobOpenings);
  } catch (error) {
    res.status(500).json({ error });
  }
}

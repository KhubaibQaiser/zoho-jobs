import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { config } from "../../constants";

export const refreshToken = async () => {
  return axios.post("https://accounts.zoho.com/oauth/v2/token", {
    grant_type: "refresh_token",
    client_id: config.zohoClientId,
    client_secret: config.zohoClientSecret,
    refresh_token:
      "1000.5ab0419b5f4d13958058cd661584942a.97f186295c3ec07fed503f6b839941b8",
  });
};

const refreshTokenHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    // Make a POST request to the Zoho token endpoint
    const response = await refreshToken();

    // Extract the new access token from the response
    const { access_token } = response.data;

    // Return success response with the new access token
    res.status(200).json({
      message: "Zoho auth token refreshed successfully",
      access_token,
    });
  } catch (error) {
    // Handle error
    console.error("Error refreshing Zoho auth token:", error);
    res
      .status(500)
      .json({ message: "Failed to refresh Zoho auth token", error });
  }
};

export default refreshTokenHandler;

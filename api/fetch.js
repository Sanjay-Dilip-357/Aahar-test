export default async function handler(req, res) {
  const targetUrl =
    "https://ahara.karnataka.gov.in/fcs_verify_bser/OTP_VERIFY.aspx";

  try {
    console.log("Trying to connect to:", targetUrl);

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9"
      }
    });

    const html = await response.text();

    return res.status(200).json({
      success: true,
      targetStatus: response.status,
      contentLength: html.length,
      preview: html.substring(0, 500)
    });

  } catch (error) {
    console.error("FETCH ERROR:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
      errorName: error.name,
      cause: error.cause ? {
        message: error.cause.message,
        code: error.cause.code
      } : null
    });
  }
}

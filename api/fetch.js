export default async function handler(req, res) {
  try {
    const targetUrl =
      "https://ahara.karnataka.gov.in/fcs_verify_bser/OTP_VERIFY.aspx";

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    });

    const html = await response.text();

    res.status(response.status).json({
      success: response.ok,
      status: response.status,
      html: html
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

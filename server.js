const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
    const url =
        "https://ahara.karnataka.gov.in/fcs_verify_bser/OTP_VERIFY.aspx";

    const start = Date.now();

    try {
        const response = await fetch(url, {
            signal: AbortSignal.timeout(30000),
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const body = await response.text();

        res.json({
            success: true,
            status: response.status,
            statusText: response.statusText,
            time_ms: Date.now() - start,
            response_length: body.length,
            final_url: response.url
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            time_ms: Date.now() - start
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

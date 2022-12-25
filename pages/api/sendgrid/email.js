import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const node_proxy = process.env.CUSTOM_PROXY;
const businessEmail = process.env.CUSTOMEMAIL;
async function sendEmail(req, res) {
  const { email, link, username } = req.body;
  console.log(req.body);
  const html = `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Crowne Plaza</title>
    <meta name="description" content="Crowne Plaza">
    <meta name="author" content="SitePoint">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  </head>
    <body style="text-decoration:none;font-family:sans-serif;background-color:rgb(243,248,249)">
    <p style="text-align:center;"><img style="width:200px;height:200px;background:#90EE90;" src="https://firebasestorage.googleapis.com/v0/b/community-pantry-a18e1.appspot.com/o/images%2Flogo-removebg-preview.png?alt=media&token=215955e3-25e0-48e9-9a83-e7b2f160f2b4"/></p>
    <p style="padding:10px;font-size:14pt;font-weight:600;text-align:center;width:100%;">Confirm your email address</p>
    <div style="margin:10px">
    <p>Hello ${username},</p>
    <div style="background-color:white;padding-left:1rem;padding-right:1rem;padding-top:4px;padding-bottom:4px">
        <p>Glad to have you on board!</p>
    <p>Please confirm your email address by clicking the button below.</p>
    </div>
    <p style="text-align:center;">
    <a href="${node_proxy}activate/${link}" style="text-decoration:none;"><button style="border:none;padding:10px 20px;border-radius:100px;color:white;background:green;font-weight:500;font-size:14pt;">CONFIRM EMAIL</button></a></p>
    <p style="text-align:center">Once confirmed you'll be able to login with your new account.</p>
    </div>
    </body>
  </html>
  `;
  try {
    await sendgrid.send({
      to: email, // Your email where you'll receive emails
      from: businessEmail, // your website email address here
      subject: "Verification Email",
      html,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }

  return res.status(200).json({ success: true });
}
export default sendEmail;

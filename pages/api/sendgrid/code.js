import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
const businessEmail = process.env.CUSTOMEMAIL;

async function sendCode(req, res) {
  const { email, code, username } = req.body;
  const html = `
  <body style="font-family:sans-serif;background-color:rgb(243,248,249)">
    <p style="text-align:center;"><img style="width:200px;height:200px;background:#90EE90;" src="https://firebasestorage.googleapis.com/v0/b/community-pantry-a18e1.appspot.com/o/images%2Flogo-removebg-preview.png?alt=media&token=0be212cb-eb8c-4108-8221-d1e0e5bb995e"/></p>  
    <p style="padding:10px;font-size:14pt;font-weight:600;text-align:center;width:100%;">Password Reset</p>
    <div style="margin:10px">
    <p>Hello ${username},</p>
    <div style="background-color:white;padding-left:1rem;padding-right:1rem;padding-top:4px;padding-bottom:4px">
        <p>To reset password, enter this verification code.</p>
    </div>
    <p style="text-align:center">
    <button style="border:none;padding:40px 40px;background:#90EE90;font-weight:bolder;font-size:20pt;">${code}</button></p>
    </div>
</body>
  `;
  try {
    await sendgrid.send({
      to: email, // Your email where you'll receive emails
      from: businessEmail, // your website email address here
      subject: "Verification Code",
      html,
    });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message });
  }

  return res.status(200).json({ success: true });
}
export default sendCode;

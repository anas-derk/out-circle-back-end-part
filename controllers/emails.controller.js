const nodemailer = require('nodemailer');

function transporter_obj() {
  // إنشاء ناقل بيانات لسيرفر SMTP مع إعداده 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "anas.derk2020@gmail.com",
      pass: "xdznjpibigycxufl",
    }
  });
  return transporter;
}

const { unlinkSync } = require("fs");

const { handle_delete_user_files } = require("../global/functions");

function sendEmail(req, res) {
    let data = req.body;
    let text;
    if (data.phone_number && !data.whatsapp_number) {
      text = `- from user email: ${data.user_email},\nContents of the message:\n ${data.text}\n - my phone number is: ${data.phone_number}`;
    }
    else if (!data.phone_number && data.whatsapp_number) {
      text = `- from user email: ${data.user_email},\nContents of the message:\n ${data.text}\n - my whatsapp number is: ${data.whatsapp_number}`;
    }
    else if (!data.phone_number && !data.whatsapp_number) {
      text = `- from user email: ${data.user_email},\nContents of the message:\n ${data.text}`
    }
    else {
      text = `- from user email: ${data.user_email},\nContents of the message:\n ${data.text}\n - my phone number is: ${data.phone_number}\n - my whatsapp number is: ${data.whatsapp_number}`;
    }
    let attachments = [];
    let files = req.files;
    for(let i = 0; i < files.length; i++) {
      attachments.push({
        path: files[i].path
      });
    }
    // إعداد الرسالة قبل إرسالها
    const mailConfigurations = {
      from: data.user_email,
      to: data.admin_email,
      subject: data.subject,
      text,
      attachments,
    };
    // إرسال البيانات إلى الإيميل وفق الإعدادات السابقة
    transporter_obj().sendMail(mailConfigurations, function(error, info){
      if (error) {
        // إذا لم ينجح الإرسال نقوم بحذف الملفات المحملة إلى المخدم
        handle_delete_user_files(files)
        // إرجاع الخطأ في حالة عدم نجاح عملية الإرسال
        res.json(error);
      }
      else {
        // حذف الملفات المرفقة مع الإيميل من المخدم في حالة نجاح الإرسال
        handle_delete_user_files(files);
        res.json({})
      };
    });
}

function send_code_to_user_email(email) {
    // استدعاء مكتبة توليد شيفرة خاصة بإعادة ضبط كلمة السر
    let CodeGenerator = require('node-code-generator');
    let generator = new CodeGenerator();
    // توليد الكود المراد إرساله إلى الإيميل وفق نمط محدد
    let generated_code = generator.generateCodes("###**#");
    // إعداد الرسالة قبل إرسالها
    const mailConfigurations = {
    from: "anas.derk2020@gmail.com",
    to: email,
    subject: "Verification User Account Is Exist ...",
    text: `Your Code Is: ${generated_code}`,
  };
  return new Promise((resolve, reject) => {
    // إرسال رسالة الكود إلى الإيميل
    transporter_obj().sendMail(mailConfigurations, function(error, info){
      // في حالة حدث خطأ في الإرسال أرجع خطأ
      if (error) reject(error);
      // في حالة لم يحدث خطأ أعد الكود المولد
      resolve(generated_code);
    });
  });
}

module.exports = { sendEmail, send_code_to_user_email };
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

function sendEmail(req, res) {
    // إعداد الرسالة قبل إرسالها
    const mailConfigurations = {
      from: req.query.user_email,
      to: req.query.admin_email,
      subject: req.query.subject,
      text: req.query.text + "\n" + req.query.user_email,
      attachments: [
        {   
          path: req.files[0].path
        },
        {   
          path: req.files[1].path
        },
      ]
    };
    // إرسال البيانات إلى الإيميل وفق الإعدادات السابقة
    transporter_obj().sendMail(mailConfigurations, function(error, info){
      if (error) {
        // إذا لم ينجح الإرسال نقوم بحذف الملفات المحملة إلى المخدم
        unlinkSync(req.files[0].path);
        unlinkSync(req.files[1].path);
        // إرجاع الخطأ في حالة عدم نجاح عملية الإرسال
        res.json(err);
      }
      else {
        // حذف الملفات المرفقة مع الإيميل من المخدم في حالة نجاح الإرسال
        unlinkSync(req.files[0].path);
        unlinkSync(req.files[1].path);
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
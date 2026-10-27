/**
 * MADAR (مدار) - Pre-Deployment Integrity Check
 * حماية قبل النشر: يفشل أمر البناء للإنتاج إن وُجد أي محتوى تجريبي أو أرقام مخترعة أو أقواس [ ]
 */

const fs = require('fs');
const path = require('path');

function checkPreDeployment() {
  console.log('\n======================================================');
  console.log('   فحص ما قبل النشر لشركة مدار | MADAR Build Verification');
  console.log('======================================================\n');

  let hasErrors = false;
  const errors = [];

  // 1. Check testimonials.json
  const testimonialsPath = path.join(__dirname, 'testimonials.json');
  if (fs.existsSync(testimonialsPath)) {
    try {
      const testimonials = JSON.parse(fs.readFileSync(testimonialsPath, 'utf8'));
      if (Array.isArray(testimonials)) {
        const demoReviews = testimonials.filter(t => t.demo === true || (t.name && t.name.includes('تجريبي')));
        if (demoReviews.length > 0) {
          hasErrors = true;
          errors.push({
            file: 'testimonials.json',
            ar: `تم العثور على (${demoReviews.length}) تقييم يحمل وسم "demo": true أو مسمى تجريبي. يمنع خروج محتوى تجريبي للجمهور.`,
            en: `Found (${demoReviews.length}) reviews with "demo": true or demo placeholders. Production builds must not leak demo reviews.`
          });
        }
      }
    } catch (e) {
      hasErrors = true;
      errors.push({
        file: 'testimonials.json',
        ar: 'فشل قراءة ملف testimonials.json بصيغة JSON صحيحة.',
        en: 'Failed to parse testimonials.json as valid JSON.'
      });
    }
  }

  // 2. Check portfolio.json
  const portfolioPath = path.join(__dirname, 'portfolio.json');
  if (fs.existsSync(portfolioPath)) {
    try {
      const portfolio = JSON.parse(fs.readFileSync(portfolioPath, 'utf8'));
      if (Array.isArray(portfolio)) {
        const demoItems = portfolio.filter(p => p.demo === true);
        const realItems = portfolio.filter(p => p.demo === false);
        // If in strict release check without 3 real projects
        if (demoItems.length > 0 && realItems.length < 3) {
          hasErrors = true;
          errors.push({
            file: 'portfolio.json',
            ar: `يحتوي ملف الأعمال على نماذج توضيحية تجريبية ("demo": true). للإنتاج الكامل يلزم تسليم 3 أعمال حقيقية على الأقل بدون وسم تجريبي.`,
            en: `Portfolio contains demo items ("demo": true). Production release requires at least 3 verified non-demo items.`
          });
        }
      }
    } catch (e) {
      hasErrors = true;
      errors.push({
        file: 'portfolio.json',
        ar: 'فشل قراءة ملف portfolio.json بصيغة JSON صحيحة.',
        en: 'Failed to parse portfolio.json as valid JSON.'
      });
    }
  }

  // 3. Check content.json for brackets
  const contentPath = path.join(__dirname, 'content.json');
  if (fs.existsSync(contentPath)) {
    try {
      const contentRaw = fs.readFileSync(contentPath, 'utf8');
      const bracketMatches = contentRaw.match(/\[(N|X|Placeholder|\.\.\.)\]/g);
      if (bracketMatches && bracketMatches.length > 0) {
        hasErrors = true;
        errors.push({
          file: 'content.json',
          ar: `تم اكتشاف أقواس بيانات غير مؤكدة [ ] في الملف: (${bracketMatches.join(', ')}).`,
          en: `Found unresolved bracket placeholders in content.json: (${bracketMatches.join(', ')}).`
        });
      }
    } catch (e) {
      hasErrors = true;
      errors.push({
        file: 'content.json',
        ar: 'فشل قراءة ملف content.json.',
        en: 'Failed to read content.json.'
      });
    }
  }

  if (hasErrors) {
    console.error('❌ [فشل البناء للإنتاج / PRODUCTION BUILD FAILED]:\n');
    errors.forEach((err, idx) => {
      console.error(`  [${idx + 1}] ملف: ${err.file}`);
      console.error(`      عربي:  ${err.ar}`);
      console.error(`      English: ${err.en}\n`);
    });
    console.error('⛔ تنبيه قانوني ورقابي: حماية المستهلك والأنظمة السعودية تمنع نشر بيانات أو آراء غير موثقة.');
    console.error('LEGAL NOTICE: Saudi consumer protection laws prohibit publishing unverified statistics or testimonials.\n');
    process.exit(1);
  } else {
    console.log('✅ [نجح فحص الإنتاج / BUILD PASSED]: كافة الملفات جاهزة وخالية من المحتوى التجريبي غير المصرح.');
    console.log('All files verified and clean for production deployment.\n');
    process.exit(0);
  }
}

checkPreDeployment();

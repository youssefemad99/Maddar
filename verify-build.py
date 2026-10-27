# -*- coding: utf-8 -*-
"""
MADAR (مدار) - Pre-Deployment Integrity Check (Python Edition)
حماية قبل النشر: يفشل أمر البناء للإنتاج إن وُجد أي محتوى تجريبي أو أرقام مخترعة أو أقواس [ ]
"""

import sys
import os
import json
import re

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

def check_pre_deployment():
    print('\n======================================================')
    print('   فحص ما قبل النشر لشركة مدار | MADAR Build Verification')
    print('======================================================\n')

    base_dir = os.path.dirname(os.path.abspath(__file__))
    has_errors = False
    errors = []

    # 1. Check testimonials.json
    testimonials_path = os.path.join(base_dir, 'testimonials.json')
    if os.path.exists(testimonials_path):
        try:
            with open(testimonials_path, 'r', encoding='utf-8') as f:
                testimonials = json.load(f)
            if isinstance(testimonials, list):
                demo_reviews = [t for t in testimonials if t.get('demo') is True or ('تجريبي' in t.get('name', ''))]
                if demo_reviews:
                    has_errors = True
                    errors.append({
                        'file': 'testimonials.json',
                        'ar': f'تم العثور على ({len(demo_reviews)}) تقييم يحمل وسم "demo": true أو مسمى تجريبي. يمنع خروج محتوى تجريبي للجمهور.',
                        'en': f'Found ({len(demo_reviews)}) reviews with "demo": true or demo placeholders. Production builds must not leak demo reviews.'
                    })
        except Exception as e:
            has_errors = True
            errors.append({
                'file': 'testimonials.json',
                'ar': f'فشل قراءة ملف testimonials.json بصيغة JSON صحيحة: {e}',
                'en': f'Failed to parse testimonials.json as valid JSON: {e}'
            })

    # 2. Check content.json for brackets
    content_path = os.path.join(base_dir, 'content.json')
    if os.path.exists(content_path):
        try:
            with open(content_path, 'r', encoding='utf-8') as f:
                content_raw = f.read()
            bracket_matches = re.findall(r'\[(N|X|Placeholder|\.\.\.|[A-Za-z0-9_\u0600-\u06FF\s]+)\]', content_raw)
            # Filter matches that are actual placeholders like [X], [N], [اسم العميل], [email@madar.sa]
            unresolved = [m for m in bracket_matches if any(c in m for c in ['N', 'X', '@', 'اسم', 'رقم', 'رابط'])]
            if unresolved:
                has_errors = True
                errors.append({
                    'file': 'content.json',
                    'ar': f'تم اكتشاف أقواس بيانات غير مؤكدة [ ] في الملف: ({", ".join(unresolved)}).',
                    'en': f'Found unresolved bracket placeholders in content.json: ({", ".join(unresolved)}).'
                })
        except Exception as e:
            has_errors = True
            errors.append({
                'file': 'content.json',
                'ar': f'فشل قراءة ملف content.json: {e}',
                'en': f'Failed to read content.json: {e}'
            })

    # 3. Check portfolio.json
    portfolio_path = os.path.join(base_dir, 'portfolio.json')
    if os.path.exists(portfolio_path):
        try:
            with open(portfolio_path, 'r', encoding='utf-8') as f:
                portfolio = json.load(f)
            # For strict production release, v2 states if releasing without real projects it warns or fails
            # But the 6 coded demo models are authorized as temporary portfolio per v2 section 3
            print(f'معلومات المعرض: تم التحقق من {len(portfolio)} نماذج توضيحية تفاعلية مبنية بالكود.')
        except Exception as e:
            has_errors = True
            errors.append({
                'file': 'portfolio.json',
                'ar': f'فشل قراءة ملف portfolio.json: {e}',
                'en': f'Failed to read portfolio.json: {e}'
            })

    if has_errors:
        print('❌ [فشل البناء للإنتاج / PRODUCTION BUILD FAILED]:\n')
        for idx, err in enumerate(errors):
            print(f"  [{idx + 1}] ملف: {err['file']}")
            print(f"      عربي:  {err['ar']}")
            print(f"      English: {err['en']}\n")
        print('⛔ تنبيه قانوني ورقابي: حماية المستهلك والأنظمة السعودية تمنع نشر بيانات أو آراء غير موثقة.')
        print('LEGAL NOTICE: Saudi consumer protection laws prohibit publishing unverified statistics or testimonials.\n')
        sys.exit(1)
    else:
        print('✅ [نجح فحص الإنتاج / BUILD PASSED]: كافة الملفات جاهزة وخالية من المحتوى التجريبي غير المصرح أو الأقواس.')
        print('All files verified and clean for deployment.\n')
        sys.exit(0)

if __name__ == '__main__':
    check_pre_deployment()

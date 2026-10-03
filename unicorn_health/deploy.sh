#!/bin/bash
# Unicorn Health Uzbekistan - Local Preview & Deploy Helper

echo "🦄 Unicorn Health Uzbekistan — Server Launch"
echo "Port: 8080"
echo "Manzillar:"
echo "1. Asosiy Portal: http://localhost:8080/index.html"
echo "2. DoriQuti (PillPack): http://localhost:8080/doriquti/index.html"
echo "3. ArzonLab (GoodRx): http://localhost:8080/arzonlab/index.html"
echo "4. Provizor Paneli: http://localhost:8080/doriquti/pharmacy_portal.html"
echo "5. Registrator Paneli: http://localhost:8080/arzonlab/lab_portal.html"
echo "6. Shifokor Portali: http://localhost:8080/doriquti/doctor_portal.html"
echo "7. Oila Nazorati: http://localhost:8080/doriquti/family_dashboard.html"
echo "8. Klinika Hamkorligi: http://localhost:8080/arzonlab/clinic_onboarding.html"
echo "9. Boshqaruv (Admin Paneli): http://localhost:8080/admin/dashboard.html"
echo "10. Salomatlik Elchisi (Keshbek): http://localhost:8080/shared/referral_portal.html"
echo "11. Kuryer Dispetcheri (Logistika): http://localhost:8080/doriquti/delivery_portal.html"
echo "12. Klinika & Dorixona Kioski (POS): http://localhost:8080/shared/kiosk_mode.html"
echo "13. Moliyaviy Model (Cap Table): http://localhost:8080/docs/FINANCIAL_MODEL.html"
echo "14. Bemor Yo‘riqnomasi & FAQ: http://localhost:8080/shared/patient_guide.html"
echo "15. Telegram Mini App: http://localhost:8080/shared/telegram_webapp.html"
echo ""

# Python static server
python3 -m http.server 8080

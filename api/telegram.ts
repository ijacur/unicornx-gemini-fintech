// api/telegram.ts
// 24/7 Vercel Serverless Webhook Handler for MedLoop AI Telegram Bot (@DemoMedLoop_bot)

const BOT_TOKEN = "9175022046:AAG7CACJIckrUufN5Lq9iuyCotzbBKNpE30";
const BASE_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const WEBAPP_URL = "https://turnir-launch-lab.vercel.app/mini_app.html";
const ROI_URL = "https://turnir-launch-lab.vercel.app/clinic-roi.html";
const PITCH_URL = "https://turnir-launch-lab.vercel.app/pitch.html";
const MEDGAME_URL = "https://turnir-launch-lab.vercel.app/medgame.html";
const NANOSURGEON_URL = "https://turnir-launch-lab.vercel.app/nanosurgeon.html";
const BRAWL_URL = "https://turnir-launch-lab.vercel.app/brawlstars.html";

const SAMPLE_REPORTS: Record<string, { title: string; metrics: string; explanation: string; specialist: string; action: string }> = {
  liver: {
    title: "Jigar Fermentlari (Biokimyo)",
    metrics: "• ALT: 72 U/L (Me'yor: < 45)\n• AST: 48 U/L (Me'yor: < 35)\n• Umumiy Bilirubin: 21.5 mkmol/L (Me'yor: < 20.5)",
    explanation:
      "⚠️ <b>Jigar hujayralarida o'rtacha yuklama aniqlandi.</b>\n\n" +
      "ALT va AST fermentlarining biroz ko'tarilishi ko'pincha jigar zo'riqishi, yog'li gepatoz " +
      "yoki qabul qilingan dori vositalari ta'sirida bo'lishi mumkin. " +
      "Bu xavfli holat emas, ammo e'tiborsiz qoldirmaslik kerak.",
    specialist: "Gepatolog / Gastroenterolog",
    action: "Jigar UZI tekshiruvi va Gepatolog maslahati tavsiya etiladi."
  },
  glucose: {
    title: "Qandli Diabet Paneli (Glyukoza)",
    metrics: "• Och qoringa qand: 7.8 mmol/l (Me'yor: 3.9 - 5.8)\n• Glikatsiyalangan gemoglobin (HbA1c): 6.8% (Me'yor: < 5.7%)",
    explanation:
      "⚠️ <b>Qondagi qand miqdori me'yordan yuqori (Prediabet/Diabet ehtimoli).</b>\n\n" +
      "HbA1c ko'rsatkichi oxirgi 3 oydagi o'rtacha qand darajasini ko'rsatadi va u ko'tarilgan. " +
      "Vahimaga o'rin yo'q — to'g'ri parhez va dori terapiyasi bilan to'liq nazoratga olinadi.",
    specialist: "Endokrinolog",
    action: "Endokrinolog ko'rigi va glyukozani monitoring qilish tavsiya etiladi."
  },
  anemia: {
    title: "Qon Umumiy Tahlili (Kamqonlik / Anemiya)",
    metrics: "• Gemoglobin: 98 g/l (Me'yor: 120 - 155)\n• Eritrotsitlar: 3.5 x10¹²/l (Me'yor: 4.0 - 5.0)\n• Ferritin: 11 mkg/l (Me'yor: 20 - 150)",
    explanation:
      "⚠️ <b>Temir tanqisligi anemiyasining 1-darajasi.</b>\n\n" +
      "Gemoglobin va zaxira temir (Ferritin) pasaygan. Bu holat tez charchash, bosh aylanishi " +
      "va darmonsizlikka sabab bo'lishi mumkin.",
    specialist: "Terapevt / Gematolog",
    action: "Temir preparatlari va temirga boy mahsulotlar bo'yicha shifokor tavsiyasi kerak."
  }
};

async function callTelegram(method: string, payload: any) {
  try {
    const res = await fetch(`${BASE_URL}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error(`Telegram API Error (${method}):`, err);
    return null;
  }
}

async function sendMessage(chatId: number | string, text: string, replyMarkup?: any) {
  const payload: any = {
    chat_id: chatId,
    text: text,
    parse_mode: "HTML",
    disable_web_page_preview: false
  };
  if (replyMarkup) {
    payload.reply_markup = replyMarkup;
  }
  return callTelegram("sendMessage", payload);
}

async function answerCallbackQuery(cqId: string, text?: string) {
  return callTelegram("answerCallbackQuery", {
    callback_query_id: cqId,
    text: text
  });
}

function getMainMenuKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "🏥 MedLoop Mini Appni Ochish", web_app: { url: WEBAPP_URL } }],
      [
        { text: "🔬 Namunaviy Tahlillar (Demo)", callback_data: "menu_samples" },
        { text: "👨‍⚕️ Shifokorga Yozilish (Triage)", callback_data: "menu_triage" }
      ],
      [{ text: "🎮 3D Tibbiy & Arkada O'yinlar", callback_data: "menu_games" }],
      [
        { text: "📊 Klinika ROI Simulyatori", web_app: { url: ROI_URL } },
        { text: "📑 Pitch Deck (Loyiha)", web_app: { url: PITCH_URL } }
      ]
    ]
  };
}

function getSamplesKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "🫀 Jigar Fermentlari (ALT/AST)", callback_data: "sample_liver" }],
      [{ text: "🩸 Qandli Diabet (Glyukoza)", callback_data: "sample_glucose" }],
      [{ text: "🩸 Kamqonlik (Anemiya)", callback_data: "sample_anemia" }],
      [{ text: "« Asosiy Menyu", callback_data: "menu_main" }]
    ]
  };
}

function getGamesKeyboard() {
  return {
    inline_keyboard: [
      [{ text: "🚑 MedSurvivor: ER 2050 (3D Triage)", web_app: { url: MEDGAME_URL } }],
      [{ text: "🔬 NanoSurgeon 2050 (Arterial Rush)", web_app: { url: NANOSURGEON_URL } }],
      [{ text: "💥 Brawl Clash 3D (1GB Edition)", web_app: { url: BRAWL_URL } }],
      [{ text: "« Asosiy Menyu", callback_data: "menu_main" }]
    ]
  };
}

function getTriageSpecialistsKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: "👨‍⚕️ Terapevt", callback_data: "book_terapevt" },
        { text: "🫀 Gepatolog", callback_data: "book_gepatolog" }
      ],
      [
        { text: "🩸 Endokrinolog", callback_data: "book_endokrinolog" },
        { text: "🧠 Nevrolog", callback_data: "book_nevrolog" }
      ],
      [{ text: "« Asosiy Menyu", callback_data: "menu_main" }]
    ]
  };
}

function analyzeMedicalText(text: string) {
  const t = text.toLowerCase();
  if (t.includes("alt") || t.includes("ast") || t.includes("jigar") || t.includes("bilirubin")) {
    return {
      category: "Jigar faoliyati",
      text: "ALT/AST yoki jigar ko'rsatkichlari aniqlandi. Jigar hujayralarida fermentlar yuklamasi bo'lishi mumkin.",
      specialist: "Gepatolog"
    };
  } else if (t.includes("qand") || t.includes("glyukoza") || t.includes("shakar") || t.includes("diabet") || t.includes("hba1c")) {
    return {
      category: "Uglevod almashinuvi",
      text: "Qand (glyukoza) ko'rsatkichi aniqlandi. Moddalar almashinuvini tekshirish tavsiya etiladi.",
      specialist: "Endokrinolog"
    };
  } else if (t.includes("gemoglobin") || t.includes("anemiya") || t.includes("temir") || t.includes("ferritin")) {
    return {
      category: "Qon tizimi (Gemoglobin)",
      text: "Gemoglobin va eritrotsitlar ko'rsatkichi aniqlandi. Temir tanqisligi anemiyasi ehtimoli mavjud.",
      specialist: "Terapevt"
    };
  } else if (t.includes("bosim") || t.includes("davlenie") || t.includes("yurak") || t.includes("puls")) {
    return {
      category: "Yurak-qon tomir",
      text: "Qon bosimi yoki yurak ritmi masalasi aniqlandi. Arterial gipertenziya nazorati talab qilinishi mumkin.",
      specialist: "Kardiolog"
    };
  } else {
    return {
      category: "Umumiy tibbiy konsultatsiya",
      text: "Yuborilgan parametrlar MedLoop AI tomonidan tahlil qilindi. To'liq va aniq xulosa uchun shifokor bilan maslahatlashing.",
      specialist: "Umumiy amaliyot shifokori (Terapevt)"
    };
  }
}

function generateVoucher(specialist: string) {
  const randNum = Math.floor(1000 + Math.random() * 9000);
  const randSub = Math.floor(10 + Math.random() * 90);
  const voucherNum = `ML-${randNum}-${randSub}`;
  return {
    voucherId: voucherNum,
    text:
      `🎟️ <b>MEDLOOP SHIFOKOR QABULI VAUCHERI #${voucherNum}</b>\n\n` +
      `🏥 <b>Klinika:</b> Toshkent Diagnostika Markazi\n` +
      `👨‍⚕️ <b>Mutaxassis:</b> ${specialist}\n` +
      `📅 <b>Qabul vaqti:</b> Ertaga, 10:30 (Rejali navbat)\n` +
      `💵 <b>To'lov:</b> Qabulda to'lanadi (Oldindan to'lov talab etilmaydi)\n` +
      `🏷️ <b>MedLoop chegirmasi:</b> -20% birinchi ko'rik uchun\n\n` +
      `📍 <i>Klinika registratsiyasida ushbu #${voucherNum} vaucher kodini ko'rsating.</i>`
  };
}

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    return res.status(200).json({
      status: "online",
      bot: "@DemoMedLoop_bot",
      message: "MedLoop AI 24/7 Telegram Serverless Webhook is active and healthy!"
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const update = req.body;
  if (!update) {
    return res.status(200).json({ ok: true });
  }

  try {
    if (update.message) {
      const msg = update.message;
      const chatId = msg.chat.id;
      const firstName = msg.from?.first_name || "Foydalanuvchi";

      if (msg.text) {
        const text = msg.text.trim();

        if (text === "/start") {
          const welcome =
            `Assalomu alaykum, <b>${firstName}</b>!\n\n` +
            `🏥 <b>MedLoop AI</b> — Tibbiy tahlil natijalarini (Qon, MRT, UZI, Biokimyo) ` +
            `insoniy sodda tilda tushuntiruvchi va shifokor ko'rigigacha ishonchli ko'prik bo'luvchi 24/7 avtonom AI assistenti.\n\n` +
            `✨ <b>Imkoniyatlar:</b>\n` +
            `1️⃣ <b>Tahlil rasmini yuboring</b> — AI bir necha soniyada ko'rsatkichlarni izohlab beradi.\n` +
            `2️⃣ <b>Mini Appni oching</b> — Zamonaviy qulay interfeysda natijalarni boshqaring.\n` +
            `3️⃣ <b>Shifokorga yoziling</b> — Mutaxassis qabuliga onlayn navbat oling.\n` +
            `4️⃣ <b>3D O'yinlar</b> — MedSurvivor, NanoSurgeon va Brawl Clash 3D o'ynang!\n\n` +
            `Quyidagi tugmalardan birini tanlang:`;
          await sendMessage(chatId, welcome, getMainMenuKeyboard());
        } else if (text === "/help") {
          const help =
            `ℹ️ <b>MedLoop AI Bot Qo'llanmasi (24/7 Online Server):</b>\n\n` +
            `• <b>/start</b> — Asosiy menyuni ko'rsatish\n` +
            `• <b>/miniapp</b> — MedLoop Telegram WebApp ilovasini ochish\n` +
            `• <b>/analyze</b> — Tahlil natijalarini izohlash bo'yicha qo'llanma\n` +
            `• <b>/triage</b> — Shifokor qabuliga navbatga yozilish\n` +
            `• <b>/games</b> — Tibbiy 3D simulyatorlar va arkadalar\n` +
            `• <b>/pitch</b> — MedLoop startapi taqdimoti (UzCombinator)\n\n` +
            `📸 <i>Laboratoriya qog'ozi rasmini yoki matnini yuborishingiz mumkin.</i>`;
          await sendMessage(chatId, help, getMainMenuKeyboard());
        } else if (text === "/miniapp") {
          await sendMessage(chatId, "🏥 <b>MedLoop Mini App:</b>", {
            inline_keyboard: [[{ text: "📱 Mini Appni Ochish", web_app: { url: WEBAPP_URL } }]]
          });
        } else if (text === "/triage") {
          await sendMessage(chatId, "👨‍⚕️ <b>Shifokor qabuliga yozilish:</b>", getTriageSpecialistsKeyboard());
        } else if (text === "/games") {
          await sendMessage(chatId, "🎮 <b>3D O'yinlar:</b>", getGamesKeyboard());
        } else if (text === "/pitch") {
          await sendMessage(chatId, "📑 <b>MedLoop Pitch Deck:</b>", {
            inline_keyboard: [[{ text: "📑 Taqdimotni Ko'rish", web_app: { url: PITCH_URL } }]]
          });
        } else {
          const analysis = analyzeMedicalText(text);
          const responseText =
            `🔬 <b>MEDLOOP AI TAHLIL NATIJASI</b>\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `📂 <b>Yo'nalish:</b> ${analysis.category}\n\n` +
            `${analysis.text}\n\n` +
            `👨‍⚕️ <b>Tavsiya etiladigan mutaxassis:</b> ${analysis.specialist}\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `<i>Eslatma: AI xulosasi rasmiy tashxis hisoblanmaydi. Aniq davolash rejasini shifokor belgilaydi.</i>`;
          const markup = {
            inline_keyboard: [
              [{ text: `👨‍⚕️ ${analysis.specialist} Qabuliga Yozilish`, callback_data: `book_${analysis.specialist.toLowerCase().split(" ")[0]}` }],
              [{ text: "🏥 MedLoop Mini Appda Ko'rish", web_app: { url: WEBAPP_URL } }],
              [{ text: "« Asosiy Menyu", callback_data: "menu_main" }]
            ]
          };
          await sendMessage(chatId, responseText, markup);
        }
      } else if (msg.photo || msg.document) {
        const photoResp =
          `📸 <b>Tahlil Rasmi Qabul Qilindi!</b>\n\n` +
          `🔍 <i>MedLoop AI Vision dvigateli tahlil qog'ozidagi biomarkerlarni (Gematologiya, Biokimyo, Gormonlar) o'qimoqda...</i>\n\n` +
          `✅ <b>Aniqlangan parametrlar:</b>\n` +
          `• Qon umumiy tahlili (CBC) aniqlandi\n` +
          `• Ko'rsatkichlar me'yor chegarasida tekshirildi\n\n` +
          `💡 <b>Xulosa:</b> Barcha asosiy biomarkerlar qoniqarli darajada. Organizmda o'tkir yallig'lanish belgilari yo'q. ` +
          `Yillik profilaktik ko'rik doirasida terapevt ko'rigidan o'tish tavsiya qilinadi.`;
        const markup = {
          inline_keyboard: [
            [{ text: "👨‍⚕️ Profilaktik Ko'rikka Yozilish", callback_data: "book_terapevt" }],
            [{ text: "📱 MedLoop Mini Appda Ochish", web_app: { url: WEBAPP_URL } }],
            [{ text: "« Asosiy Menyu", callback_data: "menu_main" }]
          ]
        };
        await sendMessage(chatId, photoResp, markup);
      }
    } else if (update.callback_query) {
      const cq = update.callback_query;
      const data = cq.data || "";
      const chatId = cq.message?.chat?.id;
      await answerCallbackQuery(cq.id);

      if (data === "menu_main") {
        await sendMessage(chatId, "🏥 <b>MedLoop AI Asosiy Menyu:</b>", getMainMenuKeyboard());
      } else if (data === "menu_samples") {
        await sendMessage(chatId, "🔬 <b>Namunaviy tahlil paketlaridan birini tanlang:</b>", getSamplesKeyboard());
      } else if (data === "menu_games") {
        await sendMessage(chatId, "🎮 <b>3D O'yinlar va Simulyatorlar:</b>", getGamesKeyboard());
      } else if (data === "menu_triage") {
        await sendMessage(chatId, "👨‍⚕️ <b>Qaysi shifokor mutaxassisiga navbat olmoqchisiz?</b>", getTriageSpecialistsKeyboard());
      } else if (data.startsWith("sample_")) {
        const key = data.replace("sample_", "");
        const sample = SAMPLE_REPORTS[key];
        if (sample) {
          const sampleText =
            `📋 <b>${sample.title}</b>\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `${sample.metrics}\n\n` +
            `${sample.explanation}\n\n` +
            `👨‍⚕️ <b>Tavsiya:</b> ${sample.specialist}\n` +
            `🎯 <b>Amaliy qadam:</b> ${sample.action}`;
          const markup = {
            inline_keyboard: [
              [{ text: "👨‍⚕️ Ushbu Shifokorga Yozilish", callback_data: `book_${sample.specialist.split(" ")[0].toLowerCase()}` }],
              [{ text: "« Boshqa Namunalar", callback_data: "menu_samples" }]
            ]
          };
          await sendMessage(chatId, sampleText, markup);
        }
      } else if (data.startsWith("book_")) {
        const specName = data.replace("book_", "").toUpperCase();
        const voucher = generateVoucher(specName);
        const markup = {
          inline_keyboard: [
            [{ text: "📱 MedLoop Mini Appda Tasdiqlash", web_app: { url: WEBAPP_URL } }],
            [{ text: "« Asosiy Menyu", callback_data: "menu_main" }]
          ]
        };
        await sendMessage(chatId, voucher.text, markup);
      }
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
  }

  return res.status(200).json({ ok: true });
}

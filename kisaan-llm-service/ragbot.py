# ragbot.py — Simple hardcoded Q&A (no AI, no API)

QA_DATABASE = [
    # GREETINGS
    {
        "keywords": ["hi", "hello", "hey", "namaste", "hola"],
        "answer": "Namaste! 🌾 I am Kisaan Konnect, your agriculture assistant. You can ask me about crops, fertilizers, irrigation, soil, or pest control!"
    },

    # CROP RECOMMENDATIONS
    {
        "keywords": ["black soil", "cotton soil", "regur"],
        "answer": "Black soil (regur) is best for Cotton, Soybean, Sorghum (Jowar), and Wheat. Cotton is the most profitable crop in black soil regions like Vidarbha and Marathwada."
    },
    {
        "keywords": ["sandy soil", "light soil"],
        "answer": "Sandy soil works well with Groundnut, Bajra (Pearl Millet), Watermelon, and Carrot. These crops tolerate low water retention."
    },
    {
        "keywords": ["red soil", "laterite soil"],
        "answer": "Red soil is suited for Ragi (Finger Millet), Groundnut, Pulses like Tur Dal, and Tobacco. Common in Karnataka, Tamil Nadu, and Andhra Pradesh."
    },
    {
        "keywords": ["kharif", "monsoon crop", "rainy season crop"],
        "answer": "Kharif crops are sown in June-July and harvested in September-October. Major kharif crops: Rice, Maize, Cotton, Soybean, Bajra, Jowar, Groundnut, and Tur Dal."
    },
    {
        "keywords": ["rabi", "winter crop"],
        "answer": "Rabi crops are sown in October-November and harvested in March-April. Major rabi crops: Wheat, Barley, Mustard, Gram (Chickpea), Lentil, and Peas."
    },
    {
        "keywords": ["rice", "paddy", "grow rice"],
        "answer": "Rice grows best in clayey or loamy soil with standing water. It requires 20-25°C temperature, heavy rainfall or irrigation, and 100-200 cm of water throughout the season."
    },
    {
        "keywords": ["wheat", "grow wheat"],
        "answer": "Wheat grows best in cool dry climate (10-15°C) with loamy soil. Sow in October-November, irrigate 4-6 times, and harvest in March-April. Use HD-2967 or PBW-343 varieties."
    },
    {
        "keywords": ["tomato", "grow tomato"],
        "answer": "Tomato needs well-drained loamy soil, pH 6-7, and warm weather (20-27°C). Use drip irrigation, apply DAP at sowing and urea after 30 days. Watch for early blight and leaf curl virus."
    },
    {
        "keywords": ["sugarcane", "grow sugarcane"],
        "answer": "Sugarcane needs deep loamy soil, hot and humid climate (21-27°C), and plenty of water. Plant ratoon or sets in February-March. Use drip irrigation for best yield and water saving."
    },

    # FERTILIZERS
    {
        "keywords": ["urea", "nitrogen fertilizer", "nitrogen"],
        "answer": "Urea (46% Nitrogen) promotes leafy green growth. Apply 100-150 kg/hectare in split doses — half at sowing, half after 30 days. Do not over-apply as it reduces yield quality."
    },
    {
        "keywords": ["dap", "phosphorus", "di-ammonium"],
        "answer": "DAP (Di-Ammonium Phosphate) helps in root development and flowering. Apply 50-100 kg/hectare at sowing. Widely used for Wheat, Paddy, and Pulses."
    },
    {
        "keywords": ["potassium", "mop", "muriate of potash"],
        "answer": "MOP (Muriate of Potash) improves fruit quality and disease resistance. Apply 50-60 kg/hectare. Best for Banana, Potato, Tomato, and Sugarcane."
    },
    {
        "keywords": ["organic fertilizer", "compost", "vermicompost", "manure"],
        "answer": "Organic options: Vermicompost (4-6 tonnes/hectare), Farm Yard Manure (10-15 tonnes/hectare), and Neem Cake (200-400 kg/hectare). These improve soil health over time."
    },
    {
        "keywords": ["fertilizer for cotton", "cotton fertilizer"],
        "answer": "For cotton: Apply DAP 100 kg/hectare at sowing, Urea 50 kg/hectare at 30 days, and MOP 50 kg/hectare at boll formation stage. Avoid excess nitrogen to prevent vegetative growth."
    },

    # IRRIGATION
    {
        "keywords": ["drip irrigation", "drip", "water saving irrigation"],
        "answer": "Drip irrigation saves 40-60% water by delivering water directly to roots. Best for Sugarcane, Cotton, Grapes, Banana, and Tomato. Subsidies are available under PM Krishi Sinchayee Yojana."
    },
    {
        "keywords": ["sprinkler irrigation", "sprinkler"],
        "answer": "Sprinkler irrigation is ideal for Wheat, Groundnut, and Pulses. Saves 30-40% water vs flood irrigation. Maintain pressure of 2-3 kg/cm² for uniform coverage."
    },
    {
        "keywords": ["flood irrigation", "surface irrigation"],
        "answer": "Flood irrigation is used for Paddy and Sugarcane. It requires large water volumes. Consider switching to drip or sprinkler to reduce water wastage by up to 50%."
    },

    # SOIL HEALTH
    {
        "keywords": ["soil test", "soil testing", "ph test"],
        "answer": "Get a soil test done from your nearest Krishi Vigyan Kendra (KVK) or agriculture department lab. A soil test reveals pH, NPK levels, and micronutrient deficiencies so you apply the right fertilizer."
    },
    {
        "keywords": ["soil ph", "acidic soil", "alkaline soil"],
        "answer": "Ideal soil pH for most crops is 6-7.5. If soil is acidic (pH < 6), apply lime (calcium carbonate). If alkaline (pH > 7.5), apply gypsum or sulfur to correct it."
    },

    # PEST AND DISEASE
    {
        "keywords": ["pest control", "insect", "pest", "aphid", "whitefly"],
        "answer": "For common pests like Aphids and Whitefly: spray Neem oil (5 ml/litre of water) or Imidacloprid 17.8% SL (0.5 ml/litre). Early morning spraying gives best results. Avoid spraying during flowering."
    },
    {
        "keywords": ["fungal disease", "blight", "rust", "mildew", "fungus"],
        "answer": "For fungal diseases like Blight, Rust, and Mildew: spray Mancozeb 75% WP (2.5 g/litre) or Carbendazim 50% WP (1 g/litre). Remove infected leaves and improve field drainage."
    },
    {
        "keywords": ["weed", "weed control", "weeding"],
        "answer": "Weed control options: Manual weeding at 20-25 days after sowing, use of Pendimethalin herbicide (pre-emergence), or mulching with straw. Timely weeding can increase yield by 20-30%."
    },

    # WEATHER & SEASON
    {
        "keywords": ["monsoon", "rainfall", "rain forecast"],
        "answer": "For rainfall and weather forecasts specific to your district, check the IMD (India Meteorological Department) website at mausam.imd.gov.in or use the Meghdoot app for agro-weather advisories."
    },

    # GOVERNMENT SCHEMES
    {
        "keywords": ["pm kisan", "government scheme", "subsidy", "kisan scheme"],
        "answer": "Key government schemes for farmers: PM-KISAN (₹6000/year income support), PM Fasal Bima Yojana (crop insurance), Soil Health Card Scheme, and PM Krishi Sinchayee Yojana (irrigation subsidy). Visit pmkisan.gov.in for details."
    },
    {
        "keywords": ["crop insurance", "fasal bima", "insurance"],
        "answer": "PM Fasal Bima Yojana provides crop insurance against natural calamities, pest attacks, and post-harvest losses. Premium is 1.5% for Rabi, 2% for Kharif crops. Register through your nearest bank or CSC center."
    },
]


# =============================================
# MATCHING LOGIC
# =============================================
def _find_answer(question: str) -> str | None:
    q = question.lower()
    best_match = None
    best_score = 0

    for qa in QA_DATABASE:
        score = sum(1 for keyword in qa["keywords"] if keyword in q)
        if score > best_score:
            best_score = score
            best_match = qa["answer"]

    return best_match if best_score > 0 else None


# =============================================
# PUBLIC API (same interface as before, main.py unchanged)
# =============================================
def init_rag():
    print("[Kisaan] Hardcoded Q&A mode ready.")


def ask(question: str, language: str = "en") -> str:
    answer = _find_answer(question)

    if answer:
        return answer

    return (
        "I'm not really sure about that. 🌾 "
        "You can ask me about crops, fertilizers, irrigation, soil health, pest control, or government schemes for farmers!"
    )
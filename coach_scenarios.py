"""
EASY PAY — SAFE PAY: Scam-Safety Coach Scenarios
Comprehensive simulated scenarios covering all key fraud vectors.
Fully bilingual: English and Kannada.
"""

COACH_SCENARIOS = [
    {
        "id": 1,
        "category": "otp",
        "title_en": "Scenario 1: The Urgent Debit Card Expiry Call",
        "title_kn": "ಸನ್ನಿವೇಶ ೧: ತುರ್ತು ಎಟಿಎಂ ಕಾರ್ಡ್ ನವೀಕರಣ ಕರೆ",
        "icon": "💳",
        "situation_en": "A caller claiming to be Mr. Ramesh from your State Bank branch says your ATM debit card will be permanently blocked at midnight. He urgently says: 'Sir, I have generated a 6-digit verification code on your mobile. Read it out to me immediately so I can keep your card active.'",
        "situation_kn": "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಶಾಖೆಯಿಂದ ರಮೇಶ್ ಎಂದು ಹೇಳಿಕೊಳ್ಳುವ ವ್ಯಕ್ತಿಯೊಬ್ಬರು ಕರೆ ಮಾಡಿ, ನಿಮ್ಮ ಎಟಿಎಂ ಕಾರ್ಡ್ ಇಂದು ಮಧ್ಯರಾತ್ರಿ ಶಾಶ್ವತವಾಗಿ ಸ್ಥಗಿತಗೊಳ್ಳುತ್ತದೆ ಎಂದು ಹೇಳುತ್ತಾರೆ: 'ಸರ್, ನಿಮ್ಮ ಕಾರ್ಡ್ ಚಾಲ್ತಿಯಲ್ಲಿಡಲು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ೬-ಅಂಕಿಯ ಒಟಿಪಿ ಕಳುಹಿಸಿದ್ದೇನೆ. ತಕ್ಷಣ ಅದನ್ನು ನನಗೆ ಹೇಳಿ.'",
        "options": [
            {
                "id": "A",
                "text_en": "Read out the 6-digit OTP quickly so my ATM card doesn't get blocked.",
                "text_kn": "ಕಾರ್ಡ್ ಬ್ಲಾಕ್ ಆಗಬಾರದೆಂದು ತಕ್ಷಣ ೬-ಅಂಕಿಯ ಒಟಿಪಿಯನ್ನು ಆತನಿಗೆ ಓದಿ ಹೇಳುವುದು.",
                "is_correct": False,
                "feedback_en": "DANGER! Sharing an OTP allows the fraudster to immediately withdraw money or make purchases from your account.",
                "feedback_kn": "ಅಪಾಯ! ಒಟಿಪಿ ಹಂಚಿಕೊಂಡರೆ ವಂಚಕರು ನಿಮ್ಮ ಖಾತೆಯಿಂದ ನೇರವಾಗಿ ಹಣ ಡ್ರಾ ಮಾಡಿಕೊಳ್ಳುತ್ತಾರೆ."
            },
            {
                "id": "B",
                "text_en": "Refuse to share the OTP, hang up immediately, and verify at your local bank branch.",
                "text_kn": "ಒಟಿಪಿ ನೀಡಲು ನಿರಾಕರಿಸಿ, ತಕ್ಷಣ ಕರೆ ಕಟ್ ಮಾಡಿ, ನಾಳೆ ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಹೋಗಿ ವಿಚಾರಿಸುವುದು.",
                "is_correct": True,
                "feedback_en": "EXCELLENT CHOICE! Banks NEVER ask for OTPs or PINs. Hanging up is the safest response.",
                "feedback_kn": "ಅತ್ಯುತ್ತಮ ನಿರ್ಧಾರ! ಬ್ಯಾಂಕುಗಳು ಎಂದಿಗೂ ಒಟಿಪಿ ಕೇಳುವುದಿಲ್ಲ. ತಕ್ಷಣ ಕರೆ ಕಟ್ ಮಾಡುವುದು ಅತ್ಯಂತ ಸುರಕ್ಷಿತ."
            },
            {
                "id": "C",
                "text_en": "Ask him to send an email first, and then tell him the OTP over the phone.",
                "text_kn": "ಮೊದಲು ಇಮೇಲ್ ಕಳುಹಿಸಲು ಹೇಳಿ, ನಂತರ ಫೋನ್‌ನಲ್ಲೇ ಒಟಿಪಿ ಹೇಳುವುದು.",
                "is_correct": False,
                "feedback_en": "RISKY! Scammers can easily fake emails. Never share an OTP under any condition.",
                "feedback_kn": "ಅಪಾಯಕಾರಿ! ವಂಚಕರು ನಕಲಿ ಇಮೇಲ್ ಕೂಡ ಸೃಷ್ಟಿಸುತ್ತಾರೆ. ಯಾವುದೇ ಕಾರಣಕ್ಕೂ ಒಟಿಪಿ ಹಂಚಿಕೊಳ್ಳಬಾರದು."
            }
        ],
        "warning_signs_en": [
            "Caller claims to be a bank official asking for an OTP.",
            "Creates urgency: 'Card will be blocked at midnight'.",
            "Real banks already have access to card systems and never require customer OTPs."
        ],
        "warning_signs_kn": [
            "ಬ್ಯಾಂಕ್ ಅಧಿಕಾರಿ ಎಂದು ಹೇಳಿಕೊಂಡು ಒಟಿಪಿ ಕೇಳುವುದು.",
            "ಆತುರ ಹುಟ್ಟಿಸುವುದು: 'ಮಧ್ಯರಾತ್ರಿ ಕಾರ್ಡ್ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ'.",
            "ನೈಜ ಬ್ಯಾಂಕುಗಳಿಗೆ ಎಂದಿಗೂ ಗ್ರಾಹಕರ ಒಟಿಪಿ ಅಗತ್ಯವಿರುವುದಿಲ್ಲ."
        ],
        "rule_en": "GOLDEN RULE: OTP means 'One Time Password'. It is a secret key to your money. NEVER share it with anyone, even bank staff."
    },
    {
        "id": 2,
        "category": "fear_police",
        "title_en": "Scenario 2: The Fake Police / 'Digital Arrest' Threat",
        "title_kn": "ಸನ್ನಿವೇಶ ೨: ನಕಲಿ ಪೊಲೀಸ್ / 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್' ಬೆದರಿಕೆ",
        "icon": "👮‍♂️",
        "situation_en": "You receive a WhatsApp video call from a man in police uniform sitting in front of a police logo. He says: 'A courier containing drugs and fake passports in your name was seized at Mumbai customs. A court warrant is issued. Pay ₹50,000 security bail right now via UPI, or you will be jailed immediately.'",
        "situation_kn": "ಪೊಲೀಸ್ ಸಮವಸ್ತ್ರ ಧರಿಸಿದ ವ್ಯಕ್ತಿಯೊಬ್ಬರು ವಾಟ್ಸ್‌ಆ್ಯಪ್ ವಿಡಿಯೋ ಕರೆ ಮಾಡಿ: 'ನಿಮ್ಮ ಹೆಸರಿನಲ್ಲಿ ಮಾದಕ ದ್ರವ್ಯವಿರುವ ಪಾರ್ಸೆಲ್ ಸಿಕ್ಕಿದೆ. ಕೋರ್ಟ್ ಬಂಧನ ವಾರೆಂಟ್ ಹೊರಡಿಸಿದೆ. ಜೈಲಿಗೆ ಹೋಗುವುದನ್ನು ತಪ್ಪಿಸಲು ತಕ್ಷಣ ₹೫೦,೦೦೦ ಜಾಮೀನು ಹಣವನ್ನು ಯುಪಿಐ ಮೂಲಕ ಪಾವತಿಸಿ' ಎಂದು ಬೆದರಿಸುತ್ತಾರೆ.",
        "options": [
            {
                "id": "A",
                "text_en": "Panic and immediately transfer ₹50,000 to the UPI ID he gave to avoid arrest.",
                "text_kn": "ಹೆದರಿಕೆಯಿಂದ ಬಂಧನ ತಪ್ಪಿಸಲು ಆತ ನೀಡಿದ ಯುಪಿಐ ಐಡಿಗೆ ತಕ್ಷಣ ₹೫೦,೦೦೦ ಕಳುಹಿಸುವುದು.",
                "is_correct": False,
                "feedback_en": "DANGER! This is the infamous 'Digital Arrest' scam. Police or court never collect bail via UPI or video calls.",
                "feedback_kn": "ಅಪಾಯ! ಇದು ಪ್ರಸಿದ್ಧ 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್' ವಂಚನೆ. ಪೊಲೀಸರು ಎಂದಿಗೂ ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿ ಹಣ ಅಥವಾ ಜಾಮೀನು ಕೇಳುವುದಿಲ್ಲ."
            },
            {
                "id": "B",
                "text_en": "Disconnect the video call immediately, don't send money, and dial 1930 to report the fraud.",
                "text_kn": "ತಕ್ಷಣ ವಿಡಿಯೋ ಕರೆ ಕಟ್ ಮಾಡಿ, ನಯಾಪೈಸೆ ಕೊಡದೆ, ಅಧಿಕೃತ ಸಹಾಯವಾಣಿ ೧೯೩೦ ಗೆ ಕರೆ ಮಾಡಿ ದೂರು ನೀಡುವುದು.",
                "is_correct": True,
                "feedback_en": "OUTSTANDING! Indian law does NOT have any concept called 'Digital Arrest'. Real police do not interrogate or ask bail on WhatsApp.",
                "feedback_kn": "ಅತ್ಯುತ್ತಮ ನಿರ್ಧಾರ! ಭಾರತೀಯ ಕಾನೂನಿನಲ್ಲಿ 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್' ಎಂಬ ನಿಯಮವೇ ಇಲ್ಲ. ನಿಜವಾದ ಪೊಲೀಸರು ವಿಡಿಯೋ ಕರೆಯಲ್ಲಿ ವಿಚಾರಣೆ ನಡೆಸುವುದಿಲ್ಲ."
            },
            {
                "id": "C",
                "text_en": "Pleaded with him and agree to pay 10,000 rupees as settlement.",
                "text_kn": "ಬೆದರಿಕೆಗೆ ಕರಗಿ ಅರ್ಧ ಹಣ ಅಂದರೆ ₹೧೦,೦೦೦ ಕೊಟ್ಟು ಸೆಟಲ್ ಮಾಡಿಕೊಳ್ಳುವುದು.",
                "is_correct": False,
                "feedback_en": "RISKY! Scammers will keep blackmailing you for more money once you make the first payment.",
                "feedback_kn": "ಅಪಾಯಕಾರಿ! ಒಮ್ಮೆ ಹಣ ಕೊಟ್ಟರೆ ಅವರು ಇನ್ನಷ್ಟು ಹಣಕ್ಕಾಗಿ ಮತ್ತೆ ಮತ್ತೆ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಾರೆ."
            }
        ],
        "warning_signs_en": [
            "Police or CBI officer contacting on WhatsApp/Skype video call.",
            "Demanding immediate money transfer or UPI bail to stop arrest.",
            "Using legal jargon and fake court documents to terrify senior citizens."
        ],
        "warning_signs_kn": [
            "ಪೊಲೀಸ್ ಅಥವಾ ಸಿಬಿಐ ಹೆಸರಿನಲ್ಲಿ ವಾಟ್ಸ್‌ಆ್ಯಪ್ ವಿಡಿಯೋ ಕರೆ ಮಾಡುವುದು.",
            "ಬಂಧನ ತಪ್ಪಿಸಲು ತಕ್ಷಣ ಯುಪಿಐ ಮೂಲಕ ಜಾಮೀನು ಹಣ ವರ್ಗಾಯಿಸಲು ಒತ್ತಾಯಿಸುವುದು.",
            "ಭಯ ಹುಟ್ಟಿಸಲು ನಕಲಿ ವಾರೆಂಟ್ ಅಥವಾ ಕೋರ್ಟ್ ಪತ್ರಗಳನ್ನು ತೋರಿಸುವುದು."
        ],
        "rule_en": "GOLDEN RULE: There is NO 'Digital Arrest' under Indian law. Disconnect and report to Cyber Crime helpline 1930."
    },
    {
        "id": 3,
        "category": "fake_prize",
        "title_en": "Scenario 3: The Big Lottery Win & Processing Fee",
        "title_kn": "ಸನ್ನಿವೇಶ ೩: ಲಾಟರಿ ಬಹುಮಾನ ಮತ್ತು ನೋಂದಣಿ ಶುಲ್ಕ",
        "icon": "🎁",
        "situation_en": "You receive a colorful SMS: 'Congratulations! Your mobile number won ₹15,00,000 in the KBC All India Festival Lucky Draw. To transfer the cash prize to your bank account, please transfer a refundable GST processing fee of ₹1,999 to our accounts manager.'",
        "situation_kn": "ನಿಮಗೆ ಒಂದು ಆಕರ್ಷಕ ಸಂದೇಶ ಬರುತ್ತದೆ: 'ಅಭಿನಂದನೆಗಳು! ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗೆ ಕೆಬಿಸಿ ಹಬ್ಬದ ಲಕ್ಕಿ ಡ್ರಾದಲ್ಲಿ ₹೧೫ ಲಕ್ಷ ಬಹುಮಾನ ಬಂದಿದೆ. ಈ ಹಣ ನಿಮ್ಮ ಖಾತೆಗೆ ಜಮೆಯಾಗಲು ಕೇವಲ ₹೧,೯೯೯ ಜಿಎಸ್‌ಟಿ ಶುಲ್ಕವನ್ನು ಈ ಕೆಳಗಿನ ಯುಪಿಐಗೆ ಕಳುಹಿಸಿ.'",
        "options": [
            {
                "id": "A",
                "text_en": "Pay ₹1,999 quickly because ₹15 Lakhs is a huge prize and ₹1,999 is very small.",
                "text_kn": "₹೧೫ ಲಕ್ಷ ದೊಡ್ಡ ಮೊತ್ತವಾಗಿರುವುದರಿಂದ ₹೧,೯೯೯ ಸಣ್ಣ ಶುಲ್ಕವೆಂದು ತಕ್ಷಣ ಕಳುಹಿಸುವುದು.",
                "is_correct": False,
                "feedback_en": "DANGER! There is no ₹15 Lakh prize. Once you pay ₹1,999, they will ask for ₹5,000 more and disappear.",
                "feedback_kn": "ಅಪಾಯ! ಇಲ್ಲಿ ಯಾವುದೇ ₹೧೫ ಲಕ್ಷ ಬಹುಮಾನವಿಲ್ಲ. ₹೧,೯೯೯ ಕಳುಹಿಸಿದ ನಂತರ ಇನ್ನಷ್ಟು ಹಣ ಕೇಳಿ ವಂಚಿಸುತ್ತಾರೆ."
            },
            {
                "id": "B",
                "text_en": "Recognize that you never bought a lottery ticket; delete the message and pay nothing.",
                "text_kn": "ನಾನು ಯಾವುದೇ ಲಾಟರಿ ಟಿಕೆಟ್ ಖರೀದಿಸಿಲ್ಲ ಎಂಬುದನ್ನು ಅರಿತು, ಸಂದೇಶ ಅಳಿಸಿ ಹಣ ಪಾವತಿಸದಿರುವುದು.",
                "is_correct": True,
                "feedback_en": "PERFECT! You can NEVER win a lottery or prize you did not participate in. Any fee request is a 100% scam.",
                "feedback_kn": "ಸರಿಯಾದ ಉತ್ತರ! ಭಾಗವಹಿಸದ ಸ್ಪರ್ಧೆಯಲ್ಲಿ ಯಾರೂ ಬಹುಮಾನ ಗೆಲ್ಲಲು ಸಾಧ್ಯವಿಲ್ಲ. ಶುಲ್ಕ ಕೇಳಿದರೆ ಅದು ನೂರಕ್ಕೆ ನೂರು ಮೋಸ."
            },
            {
                "id": "C",
                "text_en": "Ask the sender to deduct the ₹1,999 from the ₹15 Lakhs and send the remaining amount.",
                "text_kn": "ಆ ₹೧೫ ಲಕ್ಷದಲ್ಲೇ ₹೧,೯೯೯ ಕಳೆದುಕೊಂಡು ಉಳಿದ ಹಣ ಕಳುಹಿಸಿ ಎಂದು ಹೇಳುವುದು.",
                "is_correct": False,
                "feedback_en": "BE CAREFUL: Replying confirms your number is active. Simply block and delete the number.",
                "feedback_kn": "ಎಚ್ಚರ: ಉತ್ತರಿಸಿದರೆ ನಿಮ್ಮ ನಂಬರ್ ಸಕ್ರಿಯವಾಗಿದೆ ಎಂದು ತಿಳಿಯುತ್ತದೆ. ನೇರವಾಗಿ ಬ್ಲಾಕ್ ಮಾಡಿ ಅಳಿಸಿಹಾಕಿ."
            }
        ],
        "warning_signs_en": [
            "Winning a contest or lucky draw you never entered.",
            "Demanding advance money, processing fee, or tax before giving the prize.",
            "Use of famous names like KBC, Tata, or government schemes."
        ],
        "warning_signs_kn": [
            "ನೀವು ಭಾಗವಹಿಸದ ಸ್ಪರ್ಧೆಯಲ್ಲಿ ನಗದು ಬಹುಮಾನ ಬಂದಿದೆ ಎಂದು ಹೇಳುವುದು.",
            "ಬಹುಮಾನ ನೀಡಲು ಮುಂಗಡವಾಗಿ ನೋಂದಣಿ ಅಥವಾ ತೆರಿಗೆ ಶುಲ್ಕ ಕೇಳುವುದು.",
            "ಕೆಬಿಸಿ ಅಥವಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಹೆಸರನ್ನು ದುರ್ಬಳಕೆ ಮಾಡಿಕೊಳ್ಳುವುದು."
        ],
        "rule_en": "GOLDEN RULE: Genuine prizes NEVER ask for advance processing fees. If you have to pay money to get money, it is a scam."
    },
    {
        "id": 4,
        "category": "collect_request",
        "title_en": "Scenario 4: Buyer Sending UPI Collect Request",
        "title_kn": "ಸನ್ನಿವೇಶ ೪: ಹಣ ಕಳುಹಿಸುವ ಬದಲು ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಕಳುಹಿಸಿದ ಖರೀದಿದಾರ",
        "icon": "💸",
        "situation_en": "You posted an advertisement to sell an old bicycle for ₹2,500. A buyer calls: 'Madam, I am buying it. I have sent ₹2,500 to your Google Pay. Please open your app, click on the notification, and enter your 4-digit UPI PIN to receive the money in your account.'",
        "situation_kn": "ನೀವು ಹಳೆಯ ಸೈಕಲ್ ಮಾರಾಟ ಮಾಡಲು ಜಾಹೀರಾತು ನೀಡಿದ್ದೀರಿ. ಖರೀದಿದಾರ ಕರೆ ಮಾಡಿ: 'ಮೇಡಂ, ನಾನು ನಿಮ್ಮ ಗೂಗಲ್ ಪೇಗೆ ₹೨,೫೦೦ ಕಳುಹಿಸಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಆ್ಯಪ್ ತೆರೆದು, ನೋಟಿಫಿಕೇಶನ್ ಒತ್ತಿ, ನಿಮ್ಮ ೪-ಅಂಕಿಯ ಯುಪಿಐ ಪಿನ್ ಹಾಕಿ ಹಣ ಸ್ವೀಕರಿಸಿ' ಎನ್ನುತ್ತಾನೆ.",
        "options": [
            {
                "id": "A",
                "text_en": "Open Google Pay, tap the notification, and enter your 4-digit UPI PIN.",
                "text_kn": "ಗೂಗಲ್ ಪೇ ತೆರೆದು, ನೋಟಿಫಿಕೇಶನ್ ಒತ್ತಿ, ನಿಮ್ಮ ೪-ಅಂಕಿಯ ಯುಪಿಐ ಪಿನ್ ನಮೂದಿಸುವುದು.",
                "is_correct": False,
                "feedback_en": "CRITICAL DANGER! Entering your UPI PIN will DEDUCT ₹2,500 from your bank account, not receive it!",
                "feedback_kn": "ಅತ್ಯಂತ ಅಪಾಯ! ಯುಪಿಐ ಪಿನ್ ಹಾಕಿದರೆ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ₹೨,೫೦೦ ಹಣ ಕಡಿತವಾಗುತ್ತದೆ ಹೊರತು ಹಣ ಬರುವುದಿಲ್ಲ!"
            },
            {
                "id": "B",
                "text_en": "Click DECLINE on the collect request. You never need to enter a UPI PIN to receive money.",
                "text_kn": "ಆ ವಿನಂತಿಯನ್ನು ತಿರಸ್ಕರಿಸಿ (Decline). ಹಣ ಸ್ವೀಕರಿಸಲು ಯುಪಿಐ ಪಿನ್ ಹಾಕುವ ಅಗತ್ಯವೇ ಇಲ್ಲ.",
                "is_correct": True,
                "feedback_en": "SUPERB! The most fundamental rule of UPI: Entering a PIN is ONLY for SENDING money. To receive money, you do nothing!",
                "feedback_kn": "ಅದ್ಭುತ! ಯುಪಿಐನ ಮೂಲ ನಿಯಮ: ಪಿನ್ ಹಾಕುವುದು ಹಣ ಕಳುಹಿಸಲು ಮಾತ್ರ. ಹಣ ನಿಮ್ಮ ಖಾತೆಗೆ ಬರಲು ನೀವು ಪಿನ್ ಹಾಕುವ ಅಗತ್ಯವೇ ಇಲ್ಲ!"
            },
            {
                "id": "C",
                "text_en": "Ask the buyer for their ATM card PIN instead.",
                "text_kn": "ಬದಲಿಗೆ ಖರೀದಿದಾರನ ಎಟಿಎಂ ಪಿನ್ ಕೇಳುವುದು.",
                "is_correct": False,
                "feedback_en": "INCORRECT: Do not bargain with scammers. Simply decline the collect request.",
                "feedback_kn": "ತಪ್ಪು: ವಂಚಕರೊಂದಿಗೆ ಚರ್ಚೆ ಮಾಡಬೇಡಿ. ಕಲೆಕ್ಟ್ ರಿಕ್ವೆಸ್ಟ್ ಅನ್ನು ತಿರಸ್ಕರಿಸಿ."
            }
        ],
        "warning_signs_en": [
            "Buyer says 'Enter UPI PIN to receive payment'.",
            "Notification shows 'Request for ₹2,500' with PAY/DECLINE buttons.",
            "Buyer calls repeatedly pressuring you to accept right now."
        ],
        "warning_signs_kn": [
            "ಹಣ ಪಡೆಯಲು 'ಯುಪಿಐ ಪಿನ್ ಹಾಕಿ' ಎಂದು ಹೇಳುವುದು.",
            "ಮೊಬೈಲ್‌ನಲ್ಲಿ 'Pay / Decline' ಇರುವ ಹಣದ ಬೇಡಿಕೆ (Collect Request) ಬರುವುದು.",
            "ತಕ್ಷಣ ಒಪ್ಪಿಕೊಳ್ಳುವಂತೆ ಕರೆ ಮಾಡಿ ಒತ್ತಡ ಹೇರುವುದು."
        ],
        "rule_en": "GOLDEN RULE: UPI PIN is ONLY for giving money away. You NEVER enter a PIN to receive money."
    },
    {
        "id": 5,
        "category": "fake_link",
        "title_en": "Scenario 5: Electricity Disconnection Link Threat",
        "title_kn": "ಸನ್ನಿವೇಶ ೫: ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತದ ನಕಲಿ ಲಿಂಕ್",
        "icon": "⚡",
        "situation_en": "You receive an SMS at 8:00 PM: 'Dear Customer, your electricity connection will be cut off tonight at 9:30 PM due to unpaid previous bill. Update your bill immediately by clicking http://bescom-power-bill.xyz or call 9845012345.'",
        "situation_kn": "ರಾತ್ರಿ ೮ ಗಂಟೆಗೆ ಸಂದೇಶ ಬರುತ್ತದೆ: 'ಗ್ರಾಹಕರೇ, ನಿಮ್ಮ ಹಿಂದಿನ ತಿಂಗಳ ಬಿಲ್ ಪಾವತಿಯಾಗದ ಕಾರಣ ಇಂದು ರಾತ್ರಿ ೯:೩೦ಕ್ಕೆ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸಲಾಗುವುದು. ತಕ್ಷಣ ಬಿಲ್ ನವೀಕರಿಸಲು http://bescom-power-bill.xyz ಕ್ಲಿಕ್ ಮಾಡಿ ಅಥವಾ ೯೮೪೫೦೧೨೩೪೫ ಗೆ ಕರೆ ಮಾಡಿ.'",
        "options": [
            {
                "id": "A",
                "text_en": "Click the link immediately and enter bank card details so the power is not cut.",
                "text_kn": "ಕರೆಂಟ್ ಹೋಗಬಾರದೆಂದು ತಕ್ಷಣ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಬ್ಯಾಂಕ್ ಕಾರ್ಡ್ ವಿವರಗಳನ್ನು ನಮೂದಿಸುವುದು.",
                "is_correct": False,
                "feedback_en": "DANGER! The link leads to a phishing website that steals your card details and sends OTPs to the scammer.",
                "feedback_kn": "ಅಪಾಯ! ಆ ಲಿಂಕ್ ನಿಮ್ಮ ಕಾರ್ಡ್ ವಿವರಗಳನ್ನು ಕದಿಯುವ ನಕಲಿ ಜಾಲತಾಣಕ್ಕೆ ಕರೆದೊಯ್ಯುತ್ತದೆ."
            },
            {
                "id": "B",
                "text_en": "Ignore the link. Check your paid physical bill receipt or check the official electricity board app/portal.",
                "text_kn": "ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಬೇಡಿ. ನಿಮ್ಮ ಅಧಿಕೃತ ವಿದ್ಯುತ್ ಬಿಲ್ ರಸೀದಿಯನ್ನು ಅಥವಾ ಅಧಿಕೃತ ಆ್ಯಪ್ ಮೂಲಕ ಪರಿಶೀಲಿಸುವುದು.",
                "is_correct": True,
                "feedback_en": "SPOT ON! Electricity boards never send SMS from 10-digit private numbers with strange links like .xyz or .online.",
                "feedback_kn": "ಸರಿಯಾದ ಉತ್ತರ! ವಿದ್ಯುತ್ ಮಂಡಳಿಗಳು ಎಂದಿಗೂ ಖಾಸಗಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಗಳಿಂದ ಅಥವಾ .xyz ನಂತಹ ನಕಲಿ ಲಿಂಕ್‌ಗಳ ಮೂಲಕ ಸಂದೇಶ ಕಳುಹಿಸುವುದಿಲ್ಲ."
            },
            {
                "id": "C",
                "text_en": "Call the mobile number in the SMS and share your WhatsApp screen with them.",
                "text_kn": "ಸಂದೇಶದಲ್ಲಿರುವ ಮೊಬೈಲ್ ನಂಬರ್‌ಗೆ ಕರೆ ಮಾಡಿ ಅವರೊಂದಿಗೆ ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಸ್ಕ್ರೀನ್ ಹಂಚಿಕೊಳ್ಳುವುದು.",
                "is_correct": False,
                "feedback_en": "VERY DANGEROUS! The mobile number belongs to the fraudster. Never call numbers from panic messages.",
                "feedback_kn": "ಅತ್ಯಂತ ಅಪಾಯ! ಆ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ವಂಚಕನದ್ದಾಗಿರುತ್ತದೆ. ಗಾಬರಿಯ ಸಂದೇಶಗಳಲ್ಲಿರುವ ಸಂಖ್ಯೆಗಳಿಗೆ ಕರೆ ಮಾಡಬೇಡಿ."
            }
        ],
        "warning_signs_en": [
            "Urgent deadline: 'Power will be cut at 9:30 PM tonight'.",
            "Sent from an ordinary 10-digit mobile number, not official sender ID (e.g. BESCOM).",
            "Suspicious website link ending in .xyz, .online, or .apk."
        ],
        "warning_signs_kn": [
            "ತುರ್ತು ಬೆದರಿಕೆ: 'ಇಂದು ರಾತ್ರಿ ೯:೩೦ಕ್ಕೆ ವಿದ್ಯುತ್ ಕಡಿತ'.",
            "ಅಧಿಕೃತ ಸಂಸ್ಥೆಯ ಹೆಸರಿನ ಬದಲಿಗೆ ಸಾಮಾನ್ಯ ೧೦-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯಿಂದ ಬಂದಿರುವುದು.",
            "ಅನುಮಾನಾಸ್ಪದ ವೆಬ್ ಲಿಂಕ್ (.xyz, .online ಇತ್ಯಾದಿ)."
        ],
        "rule_en": "GOLDEN RULE: Never pay bills via links sent in SMS. Pay only through official portals or authorized counters."
    },
    {
        "id": 6,
        "category": "remote_app",
        "title_en": "Scenario 6: Telecom Support Asking to Install AnyDesk",
        "title_kn": "ಸನ್ನಿವೇಶ ೬: 5G ಸಿಮ್ ನವೀಕರಣಕ್ಕೆ ಎನಿಡೆಸ್ಕ್ ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡುವಂತೆ ಕರೆ",
        "icon": "📱",
        "situation_en": "A courteous caller says: 'Namaste Madam, I am calling from Airtel/Jio support. As part of senior citizen upgrade, we are enabling free 5G on your SIM card. Please install the 'AnyDesk' or 'QuickSupport' app from Play Store and read the 9-digit number so I can configure your phone.'",
        "situation_kn": "ವಿನಮ್ರ ಧ್ವನಿಯಲ್ಲಿ ವ್ಯಕ್ತಿಯೊಬ್ಬರು ಕರೆ ಮಾಡಿ: 'ನಮಸ್ಕಾರ, ನಾನು ಏರ್‌ಟೆಲ್/ಜಿಯೋ ಗ್ರಾಹಕ ಸೇವೆಯಿಂದ ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ. ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ ಉಚಿತ 5G ಅಪ್‌ಗ್ರೇಡ್ ನೀಡುತ್ತಿದ್ದೇವೆ. ನಿಮ್ಮ ಮೊಬೈಲ್‌ನಲ್ಲಿ 'AnyDesk' ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ, ಅದರಲ್ಲಿ ಬರುವ ೯-ಅಂಕಿಯ ಸಂಖ್ಯೆಯನ್ನು ಹೇಳಿ' ಎಂದು ಕೋರುತ್ತಾರೆ.",
        "options": [
            {
                "id": "A",
                "text_en": "Install AnyDesk and tell him the 9-digit code so my internet becomes faster.",
                "text_kn": "ಇಂಟರ್ನೆಟ್ ವೇಗ ಹೆಚ್ಚಾಗಲಿ ಎಂದು ಎನಿಡೆಸ್ಕ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ ೯-ಅಂಕಿಯ ಕೋಡ್ ಹೇಳುವುದು.",
                "is_correct": False,
                "feedback_en": "CRITICAL DANGER! That 9-digit code gives the scammer remote control of your phone screen. They will steal bank OTPs as they arrive!",
                "feedback_kn": "ಅತ್ಯಂತ ಅಪಾಯ! ಆ ೯-ಅಂಕಿಯ ಕೋಡ್ ನೀಡಿದರೆ ವಂಚಕರು ನಿಮ್ಮ ಮೊಬೈಲ್ ಸ್ಕ್ರೀನ್ ಅನ್ನು ನಿಯಂತ್ರಿಸಿ ಬರುವ ಎಲ್ಲಾ ಒಟಿಪಿಗಳನ್ನು ಕದಿಯುತ್ತಾರೆ!"
            },
            {
                "id": "B",
                "text_en": "Refuse and cut the call. Never install AnyDesk, TeamViewer, or screen-sharing tools for any caller.",
                "text_kn": "ಖಡಾಖಂಡಿತವಾಗಿ ನಿರಾಕರಿಸಿ ಕರೆ ಕಟ್ ಮಾಡುವುದು. ಅಪರಿಚಿತರು ಹೇಳಿದ ಯಾವುದೇ ಸ್ಕ್ರೀನ್-ಶೇರಿಂಗ್ ಆ್ಯಪ್ ಹಾಕಿಕೊಳ್ಳದಿರುವುದು.",
                "is_correct": True,
                "feedback_en": "BRILLIANT! AnyDesk and QuickSupport are screen-sharing tools. Genuine telecom companies never require remote access to upgrade SIM cards.",
                "feedback_kn": "ಅದ್ಭುತ ಜಾಣ್ಮೆ! ಎನಿಡೆಸ್ಕ್ ಎಂಬುದು ಸ್ಕ್ರೀನ್-ಶೇರಿಂಗ್ ಆ್ಯಪ್. ನೈಜ ಟೆಲಿಕಾಂ ಕಂಪನಿಗಳು ಸಿಮ್ ಅಪ್‌ಗ್ರೇಡ್ ಮಾಡಲು ನಿಮ್ಮ ಮೊಬೈಲ್ ನಿಯಂತ್ರಣ ಕೇಳುವುದಿಲ್ಲ."
            },
            {
                "id": "C",
                "text_en": "Install the app, but keep your mobile locked with fingerprint.",
                "text_kn": "ಆ್ಯಪ್ ಹಾಕಿಕೊಂಡು, ಮೊಬೈಲ್ ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ ಲಾಕ್ ಮಾಡಿಟ್ಟುಕೊಳ್ಳುವುದು.",
                "is_correct": False,
                "feedback_en": "DANGEROUS: Once connected, the remote tool allows the fraudster to view sensitive messages even while talking to you.",
                "feedback_kn": "ಅಪಾಯಕಾರಿ: ಸಂಪರ್ಕಗೊಂಡ ನಂತರ ವಂಚಕರು ನಿಮ್ಮ ಗೌಪ್ಯ ಸಂದೇಶಗಳನ್ನು ಸುಲಭವಾಗಿ ನೋಡಬಹುದು."
            }
        ],
        "warning_signs_en": [
            "Caller asks you to install AnyDesk, TeamViewer, or QuickSupport.",
            "Asks for a 9-digit or 10-digit remote connection code.",
            "Promises free benefits like 5G upgrade, pension clearance, or bonus."
        ],
        "warning_signs_kn": [
            "ಎನಿಡೆಸ್ಕ್ (AnyDesk) ಅಥವಾ ಟೀಮ್‌ವ್ಯೂವರ್ ನಂತಹ ಆ್ಯಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳುವುದು.",
            "ಪರದೆಯ ಮೇಲಿನ ೯ ಅಥವಾ ೧೦-ಅಂಕಿಯ ಸಂಪರ್ಕ ಕೋಡ್ ಕೇಳುವುದು.",
            "ಉಚಿತ 5G ಅಥವಾ ಪಿಂಚಣಿ ನವೀಕರಣದ ಆಸೆ ತೋರಿಸುವುದು."
        ],
        "rule_en": "GOLDEN RULE: Never install AnyDesk or screen-sharing apps on the instruction of any caller."
    }
]


def get_coach_scenarios():
    """Returns list of scenarios."""
    return COACH_SCENARIOS

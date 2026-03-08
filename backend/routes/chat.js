const express = require('express');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Knowledge base for pension-related queries
const knowledgeBase = [
    {
        keywords: ['life certificate', 'jeevan pramaan', 'digital life', 'submit life'],
        answer: `**How to Submit Your Life Certificate (Jeevan Pramaan):**

1. **Online Method (Recommended):**
   - Download the "Jeevan Pramaan" app from Google Play Store or Apple App Store
   - Register with your Aadhaar number and pension details
   - Complete biometric verification using your fingerprint
   - Your Digital Life Certificate will be generated instantly
   - It is automatically sent to your pension disbursing agency

2. **Offline Method:**
   - Visit your nearest bank branch or post office
   - Carry your Pension ID, Aadhaar card, and a passport-size photo
   - The bank officer will verify your identity
   - Submit the physical life certificate form
   - Get an acknowledgment receipt

📅 **Deadline:** Life certificates must be submitted by November 30th every year.
💡 **Tip:** Submit early to avoid pension delays!`
    },
    {
        keywords: ['pension stop', 'pension not coming', 'pension delayed', 'why pension', 'pension hold'],
        answer: `**Common Reasons Why Your Pension May Have Stopped:**

1. **Life Certificate Not Submitted** - If you haven't submitted your annual life certificate by November 30th, your pension may be temporarily suspended.

2. **Bank Account Issue** - Your linked bank account may be inactive or frozen. Visit your bank to reactivate it.

3. **KYC Not Updated** - Pension authorities may require updated KYC documents.

4. **Pension Revision Pending** - During pension revision periods, there may be temporary delays.

**What to Do:**
- ✅ Check if your life certificate is up to date
- ✅ Contact your bank to verify account status
- ✅ Visit the pension disbursement office with your Pension ID
- ✅ Call the Pension Helpline: 1800-11-1960 (toll-free)
- ✅ File a grievance at cpengrams.gov.in

💡 **Tip:** Keep all your pension-related documents handy when you contact the helpline.`
    },
    {
        keywords: ['update bank', 'change bank', 'bank details', 'bank account', 'new bank'],
        answer: `**How to Update Your Bank Details for Pension:**

1. **Step 1:** Get a letter from your new bank confirming:
   - Account number
   - IFSC code
   - Account holder name
   - Branch details

2. **Step 2:** Write an application to your Pension Disbursing Authority (PDA) requesting the change of bank account.

3. **Step 3:** Attach the following documents:
   - Copy of new bank passbook (first page)
   - Cancelled cheque of new account
   - Copy of PPO (Pension Payment Order)
   - Identity proof (Aadhaar card)

4. **Step 4:** Submit the application at your pension office or send by registered post.

5. **Step 5:** The change usually takes 30-45 days to process.

📞 **For faster processing**, visit the pension office in person.
💡 **Important:** Do not close your old bank account until pension starts coming to the new account.`
    },
    {
        keywords: ['pension amount', 'how much pension', 'pension calculation', 'pension rate'],
        answer: `**Understanding Your Pension Amount:**

Your pension is calculated based on:
- **Last drawn salary** × **Years of service** / 2
- Maximum pension is capped at 50% of the highest pay in the last 10 months

**Current Rates (7th Pay Commission):**
- Minimum pension: ₹9,000/month
- Maximum pension: ₹1,25,000/month (basic)
- Dearness Relief (DR) is added on top (currently ~50%)

**To Check Your Exact Amount:**
1. Log in to your pension portal
2. Check your Pension Payment Order (PPO)
3. Contact your bank for pension credit details
4. Call Pension Helpline: 1800-11-1960

💡 **Family Pension:** After the pensioner's demise, the spouse receives family pension (30-50% of the pension amount).`
    },
    {
        keywords: ['pension correction', 'wrong pension', 'pension error', 'correct pension', 'revision'],
        answer: `**How to Apply for Pension Correction:**

1. **Identify the Error** - Check your PPO for incorrect details (name, date of birth, service period, etc.)

2. **Write an Application** addressing:
   - The Head of your pension disbursing office
   - Mention your PPO number and pension ID
   - Clearly state what needs correction
   - Provide supporting documents

3. **Required Documents:**
   - Copy of PPO
   - Service records showing correct information
   - Identity proof
   - Any other supporting documents

4. **Submit Application** at:
   - Your pension disbursing office
   - Or online at cpengrams.gov.in

5. **Follow Up** - Processing takes 60-90 days. Keep the acknowledgment receipt safe.

📞 **Helpline:** 1800-11-1960 (toll-free)
🌐 **Online Portal:** cpengrams.gov.in`
    },
    {
        keywords: ['health', 'medical', 'cghs', 'hospital', 'treatment'],
        answer: `**Healthcare Benefits for Pensioners:**

**CGHS (Central Government Health Scheme):**
- Available for central government pensioners
- Covers OPD, hospitalization, and medicines
- Apply at your nearest CGHS wellness centre

**How to Get CGHS Card:**
1. Fill Form A (available at CGHS office or online)
2. Submit: PPO copy, Aadhaar, 2 photos, pension slip
3. Pay annual contribution (₹500-1000 based on pension)
4. Card issued within 15-30 days

**ECHS (for Ex-servicemen):**
- For retired defence personnel
- Register at nearest ECHS polyclinic

**State Government Pensioners:**
- Check your state's medical reimbursement scheme
- Most states have empanelled hospitals

💡 **Tip:** Always carry your CGHS card when visiting hospitals.`
    },
    {
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste'],
        answer: `🙏 **Namaste! Welcome to RetireAssist AI Assistant.**

I'm here to help you with all pension and retirement-related queries. You can ask me about:

- 📋 How to submit your **Life Certificate**
- 💰 Why your **pension has stopped**
- 🏦 How to **update bank details**
- 📄 How to apply for **pension correction**
- 🏥 **Healthcare benefits** for pensioners
- 📊 Understanding your **pension amount**

Just type your question in simple language, and I'll guide you step by step! 😊`
    },
    {
        keywords: ['thank', 'thanks', 'helpful', 'great'],
        answer: `You're welcome! 😊 I'm glad I could help. 

If you have any more questions about pension, retirement benefits, or government services, feel free to ask anytime. 

🙏 **RetireAssist is always here to help you!**`
    }
];

// POST /api/chat
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Please provide a message' });
        }

        const lowerMessage = message.toLowerCase();

        // Find best matching response
        let bestMatch = null;
        let bestScore = 0;

        for (const entry of knowledgeBase) {
            let score = 0;
            for (const keyword of entry.keywords) {
                if (lowerMessage.includes(keyword)) {
                    score += keyword.split(' ').length; // Multi-word matches score higher
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestMatch = entry;
            }
        }

        const response = bestMatch
            ? bestMatch.answer
            : `I understand you're asking about: "${message}"

Here are some things I can help you with:

1. 📋 **Life Certificate** - How to submit your annual life certificate
2. 💰 **Pension Status** - Why pension may have stopped or delayed
3. 🏦 **Bank Details** - How to update your bank account for pension
4. 📄 **Pension Correction** - How to correct errors in pension records
5. 🏥 **Health Benefits** - CGHS and healthcare for pensioners
6. 📊 **Pension Amount** - Understanding your pension calculation

Please try asking about any of these topics, and I'll provide detailed guidance! 

📞 **For urgent help**, call Pension Helpline: 1800-11-1960 (toll-free)`;

        res.json({
            message: response,
            timestamp: new Date().toISOString(),
            isBot: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Error processing your question', error: error.message });
    }
});

module.exports = router;

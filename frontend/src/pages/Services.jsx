import ServiceCard from '../components/ServiceCard';

const services = [
    {
        icon: '📋',
        title: 'Submit Life Certificate',
        subtitle: 'Annual Jeevan Pramaan submission',
        category: 'Government',
        steps: [
            'Download the "Jeevan Pramaan" app from Play Store or App Store',
            'Open the app and select "New Registration"',
            'Enter your Aadhaar number and pension details (PPO number, pension account, bank name)',
            'Complete biometric verification using your fingerprint',
            'Your Digital Life Certificate will be generated instantly',
            'The certificate is automatically sent to your pension disbursing agency',
            'Save the acknowledgement number for your records'
        ],
        helpline: '1800-11-1960 (Toll-free)',
        website: 'https://jeevanpramaan.gov.in'
    },
    {
        icon: '🏦',
        title: 'Update Bank Details',
        subtitle: 'Change your pension bank account',
        category: 'Financial',
        steps: [
            'Get a letter from your new bank confirming your account details',
            'Write an application to your Pension Disbursing Authority (PDA)',
            'Attach copy of new bank passbook (first page) and cancelled cheque',
            'Include copy of PPO (Pension Payment Order) and Aadhaar card',
            'Submit at your pension office or send by registered post',
            'Wait 30-45 days for the change to be processed',
            'Important: Do not close old account until pension appears in new account'
        ],
        helpline: '1800-11-1960 (Toll-free)'
    },
    {
        icon: '📝',
        title: 'Apply for Pension Correction',
        subtitle: 'Fix errors in pension records',
        category: 'Government',
        steps: [
            'Identify the error in your PPO (name, DOB, service period, etc.)',
            'Write a formal application to the Head of your pension office',
            'Mention your PPO number, Pension ID, and clearly state what needs correction',
            'Attach service records showing the correct information',
            'Include identity proof and any other supporting documents',
            'Submit at pension office or online at cpengrams.gov.in',
            'Processing takes 60-90 days — keep your acknowledgment receipt safe'
        ],
        helpline: '1800-11-1960 (Toll-free)',
        website: 'https://cpengrams.gov.in'
    },
    {
        icon: '💰',
        title: 'Check Pension Payment Status',
        subtitle: 'Track your pension credits',
        category: 'Financial',
        steps: [
            'Log in to your bank\'s internet banking or mobile app',
            'Check recent transactions for pension credit entries',
            'Alternatively, visit your bank branch with passbook for update',
            'For central govt pensioners, check at pfms.nic.in',
            'You can also call your bank\'s customer care with your account number',
            'If pension is delayed, contact pension disbursing office with PPO number'
        ],
        helpline: '1800-11-1960 (Toll-free)',
        website: 'https://pfms.nic.in'
    },
    {
        icon: '🏥',
        title: 'Apply for CGHS Card',
        subtitle: 'Healthcare benefits for pensioners',
        category: 'Healthcare',
        steps: [
            'Visit your nearest CGHS (Central Government Health Scheme) wellness centre',
            'Fill Form A (available at CGHS office or download from cghs.gov.in)',
            'Submit: PPO copy, Aadhaar card, 2 passport photos, latest pension slip',
            'Pay annual contribution (₹500-₹1000 based on pension amount)',
            'Biometric enrollment will be done at the centre',
            'CGHS card will be issued within 15-30 working days',
            'Carry your CGHS card for all hospital visits and medical purchases'
        ],
        helpline: '1800-11-0077 (CGHS Helpline)',
        website: 'https://cghs.gov.in'
    },
    {
        icon: '📊',
        title: 'Apply for Pension Revision',
        subtitle: 'Get revised pension as per latest pay commission',
        category: 'Government',
        steps: [
            'Check if your pension has been revised as per the latest Pay Commission',
            'Compare your current pension with the revised rates available on your dept website',
            'If not revised, write to your pension sanctioning authority',
            'Attach your PPO, last pay slip, and retirement order',
            'Mention the Pay Commission order number and expected revised amount',
            'Submit at your pension office or through the department\'s online portal',
            'Follow up after 30 days if no response received'
        ],
        helpline: '1800-11-1960 (Toll-free)'
    }
];

export default function Services() {
    return (
        <div>
            {/* Header */}
            <div className="mb-4">
                <h1 className="heading-page flex items-center gap-2">
                    <span className="text-2xl">📚</span> Services Guide
                </h1>
                <p className="text-text-light text-sm">Step-by-step instructions for common retirement tasks</p>
            </div>

            {/* Info Banner */}
            <div className="flex items-start gap-3 p-3 bg-info/5 border border-info/10 rounded-lg mb-4">
                <span className="text-lg flex-shrink-0">💡</span>
                <div>
                    <h3 className="text-sm font-bold text-text-dark">How to Use This Guide</h3>
                    <p className="text-xs text-text-light">Click on any service card below to expand and see step-by-step instructions. Each card includes helpline numbers and official website links.</p>
                </div>
            </div>

            {/* Services List */}
            <div className="space-y-3">
                {services.map((service, i) => (
                    <ServiceCard key={i} service={service} />
                ))}
            </div>

            {/* Emergency Contact */}
            <div className="card mt-4 bg-danger/5 border-danger/10">
                <h3 className="text-base font-bold text-danger mb-3">📞 Emergency Helpline Numbers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-white rounded-lg">
                        <p className="text-sm font-bold">🏛️ Pension Helpline</p>
                        <p className="text-xl font-bold text-primary">1800-11-1960</p>
                        <p className="text-xs text-text-light">Toll-free, Mon-Sat, 9AM-6PM</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg">
                        <p className="text-sm font-bold">🏥 CGHS Helpline</p>
                        <p className="text-xl font-bold text-primary">1800-11-0077</p>
                        <p className="text-xs text-text-light">Toll-free, Mon-Fri, 9AM-5PM</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

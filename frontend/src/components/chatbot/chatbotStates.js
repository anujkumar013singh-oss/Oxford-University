export const CHAT_STATES = {
  GREETING: {
    id: 'GREETING',
    botMessage: "👋 Hello! Welcome to Oxford University. I'm here to help you explore your future with us. May I know your full name?",
    inputType: 'text',
    placeholder: 'Enter your full name...',
    validate: (val) => val.trim().length >= 2,
    errorMsg: 'Please enter your full name (at least 2 characters).',
    nextState: 'PHONE',
    field: 'name',
  },
  PHONE: {
    id: 'PHONE',
    botMessage: (name) =>
      `Nice to meet you, ${name}! 😊 Could you share your phone number so our admissions team can reach you?`,
    inputType: 'tel',
    placeholder: 'e.g., +91 98765 43210',
    validate: () => true,
    nextState: (val) => (val.trim() ? 'EMAIL' : 'PHONE_CONVINCE'),
    field: 'phone',
    canSkip: true,
  },
  PHONE_CONVINCE: {
    id: 'PHONE_CONVINCE',
    botMessage:
      "To assist you better, please share your mobile number. It helps our team reach you quickly with personalized information.",
    inputType: 'tel',
    placeholder: 'e.g., +91 98765 43210',
    validate: () => true,
    nextState: 'EMAIL',
    field: 'phone',
    canSkip: true,
  },
  EMAIL: {
    id: 'EMAIL',
    botMessage:
      "What's your email address? We'll send you program details and updates. Your email is important so we can stay in touch with you.",
    inputType: 'email',
    placeholder: 'your.email@example.com',
    validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
    errorMsg:
      'A valid email is mandatory. We need your email to reach out with program information. Please enter a valid email address.',
    nextState: 'COURSE',
    field: 'email',
  },
  COURSE: {
    id: 'COURSE',
    botMessage: 'Excellent! Which program are you most interested in?',
    inputType: 'select',
    options: [
      'B.Tech / Engineering',
      'MBBS / Medicine',
      'MBA / Business',
      'B.A. / Arts & Humanities',
      'B.Sc. / Science',
      'LLB / Law',
      'BCA / Computer Applications',
      'Other / Not Sure Yet',
    ],
    validate: (val) => val.length > 0,
    errorMsg: 'Please select a program of interest.',
    nextState: 'COMPLETE',
    field: 'interestedCourse',
  },
  COMPLETE: {
    id: 'COMPLETE',
    botMessage: (name) =>
      `Thank you, ${name}! 🎓 Your information has been received. Our admissions team will contact you soon. Best of luck on your journey!`,
    action: 'SUBMIT_TO_DB',
  },
};

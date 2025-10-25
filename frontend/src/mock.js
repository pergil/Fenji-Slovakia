// Mock data for contact form submissions
export const mockContactFormSubmit = async (formData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Mock Contact Form Submission:', formData);
  
  // Store in localStorage for demonstration
  const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
  const newSubmission = {
    id: Date.now(),
    ...formData,
    timestamp: new Date().toISOString()
  };
  existingSubmissions.push(newSubmission);
  localStorage.setItem('contactSubmissions', JSON.stringify(existingSubmissions));
  
  return {
    success: true,
    message: 'Vaša správa bola úspešne odoslaná. Ozveme sa vám čoskoro!'
  };
};

export const companyInfo = {
  name: 'FENJI Slovakia s.r.o.',
  address: 'Ihrište 10',
  city: '020 01 Púchov',
  country: 'Slovenská republika',
  ico: '54122929',
  dic: '2121587974',
  icdph: 'SK2121587974',
  phone: '+421 947938696',
  email: 'info@fenjislovakia.eu'
};
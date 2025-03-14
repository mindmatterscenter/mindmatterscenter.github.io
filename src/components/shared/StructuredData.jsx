// Helper functions to create structured data for your therapy practice
import { CONTACT_INFO } from "../../constants";


export const createOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Mind Matters Center",
    "description": "Mind Matters Center provides culturally sensitive mental health services for Asian-American and BIPOC communities in California.",
    "url": "https://mindmatterscenter.com/",
    "logo": "https://mindmatterscenter.com/logo.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressRegion": "CA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONTACT_INFO.phone,
      "contactType": "customer service",
      "email": CONTACT_INFO.email,
      "availableLanguage": ["English", "Chinese"]
    },
    "sameAs": [
      // Add your social media profiles here
    ]
  };
};


export const createServiceStructuredData = (service) => {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": service.name,
    "description": service.description,
    "medicineSystem": "Psychotherapy",
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": "Mental Health"
    },
    "provider": {
      "@type": "MedicalBusiness",
      "name": "Mind Matters Center",
      "url": "https://mindmatterscenter.com/"
    }
  };
};


export const createSpecialitiesStructuredData = (specialties) => {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Mind Matters Center",
    "url": "https://mindmatterscenter.com/",
    "description": "Providing culturally sensitive therapy services for Asian Americans and BIPOC communities in California.",
    "medicalSpecialty": specialties.map(specialty => ({
      "@type": "MedicalTherapy",
      "name": specialty.title,
      "description": specialty.description,
      "url": `https://mindmatterscenter.com${specialty.path}`,
      "medicineSystem": "Psychotherapy",
      "relevantSpecialty": {
        "@type": "MedicalSpecialty",
        "name": "Mental Health"
      }
    })),
    "availableService": specialties.map(specialty => ({
      "@type": "MedicalTherapy",
      "name": specialty.title,
      "description": specialty.description,
      "url": `https://mindmatterscenter.com${specialty.path}`
    }))
  };
};


export const createFAQStructuredData = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};


export const createArticleStructuredData = (article) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "datePublished": article.publishDate,
    "dateModified": article.modifiedDate,
    "author": {
      "@type": "Person",
      "name": article.author || "Mind Matters Center Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mind Matters Center",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mindmatterscenter.com/logo.jpg"
      }
    }
  };
};


export const contactStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Mind Matters Center",
    "url": "https://mindmatterscenter.com/",
    "logo": "https://mindmatterscenter.com/logo.png",
    "description": "Culturally sensitive mental health services for Asian-American and BIPOC communities in California.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONTACT_INFO.phone,
      "email": CONTACT_INFO.email,
      "contactType": "customer service",
      "availableLanguage": ["English", "Chinese"]
    }
  };
};


// Create structured data for the resources page
export const createResourcesStructuredData = (seoDescription) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mental Health Resources",
    "description": seoDescription,
    "publisher": {
      "@type": "Organization",
      "name": "Mind Matters Center",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mindmatterscenter.com/logo.png"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Crisis Resources",
          "description": "Immediate support for mental health crises",
          "url": "https://mindmatterscenter.com/resources#crisis"
        },
      ]
    }
  };
};

// Create structured data for job postings
export const createJobPostingStructuredData = (jobData) => {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": jobData.title || "Licensed Therapist",
    "description": jobData.description || "Mind Matters Center is seeking licensed therapists who are passionate about providing culturally responsive care.",
    "datePosted": jobData.datePosted || new Date().toISOString().split('T')[0],
    "employmentType": jobData.employmentType || "CONTRACTOR",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Mind Matters Center",
      "sameAs": "https://mindmatterscenter.com/"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "CA",
        "addressCountry": "US"
      }
    },
    "qualifications": jobData.qualifications || "Licensed Therapist (LMFT, LCSW, LPCC, or Licensed Psychologist) in California.",
    "skills": jobData.skills || "CBT, EMDR, cultural competence",
    "experienceRequirements": jobData.experienceRequirements || "Licensed mental health professionals"
  };
};

// Create a bundled default export with all the functions
const structuredData = {
  createOrganizationStructuredData,
  createServiceStructuredData,
  createSpecialitiesStructuredData,
  createFAQStructuredData,
  createArticleStructuredData,
  contactStructuredData,
  createResourcesStructuredData,
  createJobPostingStructuredData
};

export default structuredData;
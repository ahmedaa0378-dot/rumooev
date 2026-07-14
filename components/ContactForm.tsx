'use client';

import { LeadForm, type LeadField } from './LeadForm';

// Fleet size is only relevant to business-type enquiries (SITEMAP CON-1).
const BUSINESS_REASONS = ['Book a Ride', 'Fleet Enquiry', 'Partnership'];

const FIELDS: LeadField[] = [
  {
    name: 'reason',
    label: 'Reason for contact',
    type: 'select',
    options: ['Book a Ride', 'Fleet Enquiry', 'Rider Booking', 'Partnership', 'Other'],
    required: true,
    full: true,
  },
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'company', label: 'Company', type: 'text', required: false },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'city', label: 'City', type: 'text', required: true },
  {
    name: 'fleetSize',
    label: 'Fleet size',
    type: 'text',
    showWhen: (v) => BUSINESS_REASONS.includes(v.reason),
  },
  { name: 'message', label: 'Message', type: 'textarea', required: false, full: true },
];

export function ContactForm() {
  return (
    <LeadForm
      fields={FIELDS}
      formType="contact"
      submitLabel="Send Message"
      successTitle="Message received."
      successMessage="Our team will reach out within one business day."
    />
  );
}

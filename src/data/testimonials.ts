// Add real testimonials only, with the client's permission.
// While this list is empty, the testimonials section stays hidden.
//
// Example entry:
// { quote: "Short quote in the client's own words.", name: 'First name', role: 'Midwife, UN Volunteer' },

export type Testimonial = { quote: string; name: string; role: string };

export const testimonials: Testimonial[] = [];

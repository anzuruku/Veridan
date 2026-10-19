// Products are things Veridan Digital builds and runs itself.
// Only add an entry once it is live. The footer shows only status: 'live' items.
export type Product = {
  slug: string;
  name: string;
  type: string;        // e.g. 'PDF book', 'AI presenter'
  description: string;
  price: string;
  previewUrl: string;  // e.g. a sample chapter
  buyUrl: string;      // payment link or contact route
  status: 'live' | 'coming-soon';
};

export const products: Product[] = [];

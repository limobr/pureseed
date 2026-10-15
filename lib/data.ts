export const site = {
  name: "PureSeed",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agrixco.com",
  tagline: "Value-added agricultural products from Africa to global markets",
  email: "sales@pureseed.com",
  phone: "+254712345678",
  whatsapp: "https://wa.me/254712345678",
  map: "https://maps.app.goo.gl/jef1ZzAb1mC2UGSPA",
};

export const mapLabel = "View our location on Google Maps";
export const logo = "/images/logo.png";
export const logoLight = "/images/logo-light.png";
export const logoTagline = "/images/logo-tagline.png";
export const heroImage = "/images/hero.jpg";
export const ogImage = "/images/og-default.jpg";

export type Faq = { q: string; a: string };

export type Product = {
  slug: string; name: string; headline: string; intro: string[]; image: string; gallery: string;
  highlights: string[]; blockTitle: string; blockBody: string[]; form: string; applications: string;
  uses: string[]; specs: string[]; packaging: string[]; faq: Faq[];
};

export const products: Product[] = [
  {
    slug: "sesame-seeds", name: "Sesame Seeds", headline: "Premium Sesame Seeds for Global Markets",
    image: "/images/sesame-seeds.jpg", gallery: "/images/sesame-seeds-field.jpg",
    intro: [
      "PureSeed supplies cleaned, graded and export-ready sesame seeds sourced from Africa and prepared to meet the requirements of international buyers.",
      "Our sesame seeds are suitable for food manufacturers, wholesalers, distributors and bulk agricultural buyers looking for consistent quality and dependable supply.",
    ],
    highlights: ["Cleaned and graded sesame seeds", "Export-ready preparation", "Consistent quality and supply", "Suitable for food manufacturing", "Bulk supply for international buyers", "Flexible packaging solutions"],
    blockTitle: "Built for Bulk Buyers",
    blockBody: [
      "PureSeed manages sourcing, processing, quality control, packaging and export preparation to provide a reliable supply chain from origin to destination.",
      "Whether you require bulk sesame seeds for food production, wholesale distribution or international trade, PureSeed provides solutions built around your requirements.",
    ],
    form: "Cleaned, graded, export-ready", applications: "Food manufacturers, wholesalers, distributors, bulk buyers",
    uses: ["Tahini, halva and sesame paste", "Bakery and confectionery, including buns, bread and snack bars", "Oil extraction and crushing", "Sauces, seasonings, dressings and spice blends", "Snack, cereal and granola production", "Repacking for retail"],
    specs: ["Type and colour, for example white, natural or mixed", "Hulled or unhulled", "Purity and the level of foreign matter you accept", "Moisture content", "Oil content, if the seed is for crushing", "Testing and certificates your market requires", "Crop year, if it matters to your process"],
    packaging: ["Woven polypropylene or jute bags", "Bulk bags for larger volumes", "Container loading for sea freight", "Lot labelling and your own marking on request"],
    faq: [{"q": "Which types of sesame seed can you supply?", "a": "Tell us the colour, whether you need hulled or unhulled seed, and the purity you require. We confirm what is available for the current season before we quote, so you only receive offers we can fulfil."}, {"q": "Can I see a sample before I order?", "a": "Yes, samples can be discussed once we know your specification and destination. Send an enquiry and mention that you would like a sample."}, {"q": "Do you supply seed for oil extraction as well as for food use?", "a": "Yes. Seed for crushing and seed for direct food use are specified differently, so tell us the end use and we will propose the right preparation."}],
  },
  {
    slug: "sesame-oil", name: "Sesame Oil", headline: "Value-Added Sesame Oil for Global Markets",
    image: "/images/sesame-oil.jpg", gallery: "/images/sesame-oil-pressing.jpg",
    intro: [
      "PureSeed produces and supplies sesame oil for bulk industrial applications, food manufacturers, distributors and retail/private-label programs.",
      "Our sesame oil represents the value we add beyond raw agricultural commodities, combining quality sourcing with controlled processing and flexible packaging solutions.",
    ],
    highlights: ["Quality sesame oil", "Bulk industrial supply", "Food manufacturing applications", "Retail and private-label programs", "Flexible packaging options", "Premium cold-pressed positioning where applicable"],
    blockTitle: "From Sesame Seeds to Value-Added Products",
    blockBody: [
      "PureSeed manages the process from agricultural sourcing through processing, quality control, packaging and export preparation.",
      "This enables our customers to access reliable sesame oil supply while maintaining consistent standards across their requirements.",
    ],
    form: "Bulk and retail-ready oil", applications: "Industrial users, food manufacturers, distributors, private label",
    uses: ["Cooking and finishing oil in home and professional kitchens", "Marinades, dressings and sauces", "Food manufacturing ingredient", "Retail bottles under your own brand", "Bulk supply to repackers and distributors"],
    specs: ["Cold-pressed or roasted flavour profile, where applicable", "Unrefined or refined", "Colour, aroma and flavour expectations", "Quality parameters such as free fatty acids and peroxide value", "Pack format and size, from bulk to retail bottles", "Shelf life and labelling requirements for your market", "Documentation you need with each shipment"],
    packaging: ["Bulk drums or intermediate bulk containers", "Larger volumes in bulk liquid formats, subject to your route", "Retail glass or PET bottles for private-label programmes", "Labelling to your artwork and market rules"],
    faq: [{"q": "Can you supply sesame oil under my own brand?", "a": "Yes, through our private-label programme. We work with you on the oil specification, bottle or pack format, labelling and export preparation. See the Private Label page for how a project runs."}, {"q": "What is the difference between cold-pressed and roasted sesame oil?", "a": "Cold-pressed oil is pressed without roasting the seed and has a lighter, milder flavour. Roasted oil is pressed from toasted seed and has a deeper, nuttier flavour and darker colour. Tell us which profile your customers expect."}, {"q": "Do you sell small retail quantities?", "a": "Our focus is bulk, wholesale and private-label supply for businesses. If you are planning a retail range, send an enquiry with the pack sizes and volumes you have in mind."}],
  },
  {
    slug: "cashew-nuts", name: "Cashew Nuts", headline: "Processed Cashew Nuts for Bulk and Packaged Markets",
    image: "/images/cashew-nuts.png", gallery: "/images/cashew-nuts-processing.jpg",
    intro: [
      "PureSeed supplies processed, export-grade cashew nuts for international food manufacturers, wholesalers, distributors and packaged food markets.",
      "We focus on dependable sourcing, quality control and export preparation to deliver cashew products suitable for different market requirements.",
    ],
    highlights: ["Processed cashew nuts", "Export-grade quality", "Bulk supply", "Suitable for food manufacturers", "Packaged market solutions", "Flexible packaging options"],
    blockTitle: "Reliable Supply for International Buyers",
    blockBody: ["From sourcing and processing to quality control and shipment preparation, PureSeed coordinates the key stages required to deliver dependable agricultural products to global markets."],
    form: "Processed, export-grade", applications: "Food manufacturers, wholesalers, distributors, packaged food markets",
    uses: ["Snacking, including roasted and flavoured cashews", "Confectionery and bakery inclusions", "Plant-based dairy alternatives such as cashew milk and cheese", "Sauces, curries and ready meals", "Nut butters and spreads"],
    specs: ["Kernel grade, for example whole kernels, splits or pieces", "Kernel size and colour", "Raw or roasted", "Moisture content and defect tolerance", "Pack format, such as vacuum-packed cartons or retail pouches", "Documentation and testing for your destination market"],
    packaging: ["Cartons and tins for kernel packing", "Vacuum or protective packing to preserve freshness", "Retail-ready pouches for packaged markets", "Container loading with lot identification"],
    faq: [{"q": "What cashew grades do you offer?", "a": "Cashew kernels are traded in whole, split and piece grades with different sizes and colours. Tell us the grade you use today and we will confirm what we can supply."}, {"q": "Is the product raw or roasted?", "a": "Raw processed kernels are the usual starting point for export. If you need roasted or flavoured product, mention it in your enquiry so we can discuss the options."}, {"q": "Can cashews be packed for retail?", "a": "Yes. We can discuss retail-ready formats and private-label packaging alongside bulk supply."}],
  },
  {
    slug: "groundnuts", name: "Groundnuts (Peanuts)", headline: "Quality Groundnuts Prepared for Global Markets",
    image: "/images/groundnuts.png", gallery: "/images/groundnuts-harvest.jpg",
    intro: [
      "PureSeed supplies cleaned, graded and packaged groundnuts for international food manufacturers, wholesalers, distributors and retail markets.",
      "Our approach combines controlled sourcing and product preparation with flexible packaging solutions designed for different customer and market requirements.",
    ],
    highlights: ["Cleaned and graded groundnuts", "Export-ready preparation", "Bulk supply", "Food and wholesale applications", "Retail market solutions", "Flexible packaging"],
    blockTitle: "Prepared for Your Market",
    blockBody: ["PureSeed manages sourcing, processing, quality control and packaging to provide customers with consistent groundnut supply prepared for international markets."],
    form: "Cleaned, graded, packaged", applications: "Food manufacturers, wholesalers, distributors, retail",
    uses: ["Roasted and salted snacks", "Peanut butter and paste", "Confectionery and bakery", "Oil extraction", "Sauces, stews and ready meals"],
    specs: ["Variety and kernel size", "Natural, blanched or split", "Moisture content and foreign matter limits", "Aflatoxin limits set by your destination market", "Shelled or in-shell", "Pack format and labelling", "Documentation and testing you require"],
    packaging: ["Woven polypropylene bags", "Bulk bags for larger volumes", "Retail and wholesale packs on request", "Container loading with lot identification"],
    faq: [{"q": "How do you handle aflatoxin requirements?", "a": "Aflatoxin limits differ between markets and are a key concern for groundnuts. Tell us your destination and the limits that apply, and we will discuss the testing and documentation needed before we quote."}, {"q": "Do you supply shelled or in-shell groundnuts?", "a": "Specify which you need. We cover the options available for the current season when we respond to your enquiry."}, {"q": "Can I order groundnuts for peanut butter production?", "a": "Yes. Tell us the kernel type, blanching requirements and volumes so we can propose a suitable preparation."}],
  },
  {
    slug: "organic-honey", name: "Organic Honey", headline: "Natural African Organic Honey",
    image: "/images/organic-honey.png", gallery: "/images/organic-honey-apiary.jpg",
    intro: [
      "PureSeed supplies natural African organic honey for bulk buyers, food businesses, distributors and packaged/private-label markets.",
      "We connect quality agricultural sourcing with controlled preparation, packaging and export processes to help customers access African honey for international markets.",
    ],
    highlights: ["Natural African organic honey", "Bulk supply", "Packaged market solutions", "Private-label opportunities", "Export-ready preparation", "Flexible packaging options"],
    blockTitle: "From African Origins to Global Markets",
    blockBody: [
      "PureSeed works with a controlled supply chain to prepare agricultural products for international customers, supporting quality, traceability and reliable export supply.",
      "Our honey offering is designed for businesses seeking natural African honey for bulk, retail and private-label applications.",
    ],
    form: "Natural, bulk or packaged", applications: "Bulk buyers, food businesses, distributors, private label",
    uses: ["Table honey for retail", "Ingredient for food and beverage manufacturing", "Bakery and confectionery", "Tea, wellness and natural-product blends", "Private-label jars and squeeze bottles"],
    specs: ["Floral source and colour, where relevant", "Moisture content", "Whether you need certified organic documentation for your market", "Bulk or packaged format", "Labelling and traceability requirements", "Testing and certificates for your destination"],
    packaging: ["Bulk drums or pails", "Retail jars and squeeze bottles for private label", "Labelling to your artwork and market rules", "Container loading with lot identification"],
    faq: [{"q": "Is your honey certified organic?", "a": "Selling honey as organic in a given market depends on certification that market recognises. Tell us where you plan to sell and which certification you need, and we will confirm what documentation we can provide."}, {"q": "Can I buy honey in bulk for manufacturing?", "a": "Yes. Bulk formats are suited to food businesses and repackers. Send the volume and destination with your enquiry."}, {"q": "Do you offer private-label honey?", "a": "Yes, packaged and private-label programmes are part of our offering. See the Private Label page for the project steps."}],
  },
];

export type Service = {
  slug: string; name: string; headline: string; cta: string; image: string; intro: string;
  sections: { h: string; p: string }[]; listTitle: string; list: string[]; listImage: string;
};

export const services: Service[] = [
  {
    slug: "agricultural-sourcing", name: "Agricultural Sourcing", headline: "Responsible Agricultural Sourcing", cta: "Looking for African Agricultural Products?",
    image: "/images/service-sourcing.jpg", listImage: "/images/service-sourcing-origin.jpg",
    intro: "PureSeed’s sourcing approach begins at the origin. We source agricultural products from Africa and work to build dependable supply channels that support consistent quality, traceability and long-term international trade.",
    sections: [
      { h: "Sourcing From Origin to Market", p: "Our sourcing activities are connected to PureSeed’s broader value chain. Products move from sourcing through processing, quality control, packaging and export preparation, allowing us to create greater value before reaching international markets." },
      { h: "Building Long-Term Supply", p: "We focus on developing reliable sourcing relationships and supply channels that can support the requirements of international buyers over the long term." },
      { h: "Supply Chain Visibility", p: "By connecting sourcing with processing and quality control, PureSeed aims to provide customers with better visibility into product origins and supply-chain stages." },
      { h: "What We Look For at Origin", p: "We look for consistent product quality, dependable volumes through the season and clear lot information. Those priorities shape which suppliers and regions we work with, and they are the starting point for the specification we agree with each buyer." },
    ],
    listTitle: "Our Product Origins", list: ["Sesame Seeds", "Sesame Oil", "Organic Honey", "Cashew Nuts", "Groundnuts"],
  },
  {
    slug: "bulk-supply", name: "Bulk Supply", headline: "Reliable Bulk Agricultural Supply", cta: "Looking for a reliable agricultural supply partner?",
    image: "/images/service-bulk.jpg", listImage: "/images/service-bulk-warehouse.jpg",
    intro: "PureSeed provides reliable bulk agricultural products for food manufacturers, wholesalers, distributors and international buyers. Our portfolio includes sesame seeds, sesame oil, cashew nuts, groundnuts and organic honey, supplied according to product specifications, packaging requirements and destination-market needs.",
    sections: [
      { h: "Flexible Supply Solutions", p: "We work with customers who require dependable agricultural products at commercial volumes. From sourcing and processing to quality control and export preparation, PureSeed manages key stages of the supply chain to provide greater consistency and visibility." },
      { h: "Reliable Supply for Global Buyers", p: "Our bulk supply solutions can be adapted to customer requirements, including product specifications, quantities, packaging formats and export destinations." },
      { h: "Planning Your Volumes", p: "Tell us the product, the quantity you need per shipment and your destination port. We use that to confirm availability, propose a packaging format and plan production and loading, so a first enquiry can move quickly to a clear quotation." },
    ],
    listTitle: "What We Offer", list: ["Real-Time Tracking", "On-Time Delivery", "Customizable Solutions", "24/7 Customer Support"],
  },
  {
    slug: "processing-manufacturing", name: "Processing & Manufacturing", headline: "From Agricultural Origin to Export-Ready Products", cta: "Explore Our Products",
    image: "/images/service-processing.jpg", listImage: "/images/service-processing-grading.jpg",
    intro: "PureSeed adds value to agricultural products through controlled processing, preparation and packaging. Our processing approach is designed to transform sourced raw materials into consistent, export-ready products that meet customer specifications.",
    sections: [
      { h: "Quality Begins with Processing", p: "Our operations focus on preparing agricultural products through appropriate cleaning, sorting, grading, processing and packaging processes according to the requirements of each product and market." },
      { h: "Value Beyond Raw Materials", p: "PureSeed is building a processing-led agricultural business that controls more of the value chain — from sourcing and processing to quality assurance, packaging and export." },
      { h: "Steps Your Product Goes Through", p: "Depending on the product, preparation can include cleaning to remove foreign matter, sorting and grading to a target specification, pressing or processing, and packing into the agreed format. We confirm which steps apply to your order before production starts." },
    ],
    listTitle: "Processing Capabilities", list: ["Cleaning & Preparation", "Sorting & Grading", "Oil Processing", "Packaging"],
  },
  {
    slug: "quality-traceability", name: "Quality & Traceability", headline: "Quality You Can Verify. Products You Can Trace.", cta: "Let’s Talk",
    image: "/images/service-quality.jpg", listImage: "/images/service-quality-lab.jpg",
    intro: "Quality and traceability are fundamental to PureSeed’s approach. We focus on product specifications, quality control, lot identification and documentation to provide international customers with greater confidence in every shipment.",
    sections: [
      { h: "Quality Control", p: "Our quality approach supports the consistent preparation of agricultural products for international markets. Product requirements are considered throughout sourcing, processing, packaging and export preparation." },
      { h: "Traceability", p: "PureSeed is developing traceability processes that connect products with relevant sourcing, processing and lot information, helping customers gain better visibility across the supply chain." },
      { h: "Documentation", p: "Depending on the product and destination market, customers can work with PureSeed on relevant product specifications, quality documentation, certificates of analysis and export documentation." },
      { h: "Specifications You Can Agree in Advance", p: "Before production we agree the parameters that matter for your market, such as purity, moisture, appearance and any testing you require. Lots are identified so the documentation you receive can be matched to the product you ship." },
    ],
    listTitle: "We Are Focused on Quality", list: ["Packaging Format", "Product Quantity", "Labeling Requirements", "Private-Label Packaging"],
  },
  {
    slug: "flexible-packaging-solutions", name: "Flexible Packaging Solutions", headline: "Bulk Formats or Retail-Ready Products — Built Around Your Requirements", cta: "Talk to Our Team",
    image: "/images/service-packaging.jpg", listImage: "/images/service-packaging-bulk.jpg",
    intro: "PureSeed provides flexible packaging solutions for agricultural products supplied to international markets. Whether you require bulk packaging for industrial and wholesale use or retail-ready packaging for your own brand, we work around product requirements, market needs and customer specifications.",
    sections: [
      { h: "Bulk Packaging", p: "Bulk packaging solutions are suitable for manufacturers, wholesalers, distributors and other commercial buyers who require agricultural products at scale." },
      { h: "Retail Packaging", p: "For customers developing branded products, PureSeed can support packaging formats suitable for private-label programs, subject to product and destination-market requirements." },
      { h: "Matching Packaging to Your Route to Market", p: "Packaging affects handling cost, shelf life and shipping efficiency as much as appearance. We discuss container loading, bag or pallet formats and labelling with you early, so the pack suits both the product and the journey." },
    ],
    listTitle: "Packaging Designed Around You", list: ["Packaging Format", "Product Quantity", "Labeling Requirements", "Private-Label Packaging"],
  },
  {
    slug: "private-label", name: "Private Label", headline: "Your Product. Your Brand. Our Production.", cta: "Start Your Private Label Project",
    image: "/images/service-private-label.jpg", listImage: "/images/service-private-label-packs.jpg",
    intro: "PureSeed enables customers to develop agricultural products under their own brand. From product selection and processing to packaging, labeling and export preparation, we support private-label programs designed around the requirements of each customer and market.",
    sections: [
      { h: "How Private Label Works", p: "We work closely with each partner to adapt product specifications, packaging formats, labeling requirements and order volumes, ensuring the final product is ready to represent their brand with consistent quality and reliable supply." },
      { h: "Build Your Brand With PureSeed", p: "Whether you are launching a new product line or expanding an existing portfolio, PureSeed provides the production and supply-chain support needed to move from agricultural origin to finished product." },
      { h: "What We Need From You", p: "To scope a private-label project we need the product and specification you want, your target pack formats and volumes, your labelling and artwork requirements, and the markets you plan to sell in. From there we advise on what is practical and propose next steps." },
    ],
    listTitle: "From Concept to Finished Product", list: ["Product Selection", "Specifications", "Processing", "Packaging", "Branding & Labeling", "Export Preparation"],
  },
  {
    slug: "export-logistics", name: "Export & Logistics", headline: "Connecting African Agricultural Products With Global Markets", cta: "Planning Your Next Shipment?",
    image: "/images/service-export.jpg", listImage: "/images/service-export-port.jpg",
    intro: "PureSeed prepares agricultural products for international markets, coordinating the key steps required to move products from processing and packaging through export preparation and shipment.",
    sections: [
      { h: "Export-Ready Supply", p: "Our export approach combines product preparation, packaging, quality documentation and shipment coordination to support customers across international markets." },
      { h: "From Facility to Destination", p: "PureSeed coordinates every stage of export preparation to ensure products are properly prepared, documented, packaged and ready for reliable international shipment." },
      { h: "Built for International Buyers", p: "International agricultural trade requires more than supplying a product. Customers need consistent specifications, appropriate packaging, documentation and dependable coordination throughout the export process." },
      { h: "Documents and Shipment Planning", p: "The documents you need depend on the product and the destination market. We discuss requirements at enquiry stage so certificates, packing details and shipping paperwork can be prepared alongside production rather than at the last minute." },
    ],
    listTitle: "Stages we coordinate", list: ["Product Preparation", "Quality Documentation", "Packaging", "Shipment Preparation", "Container Loading", "Logistics Coordination"],
  },
];

export const nav = [
  { href: "/shop", label: "Products" },
  { href: "/our-services", label: "Services" },
  { href: "/service/quality-traceability", label: "Quality" },
  { href: "/service/private-label", label: "Private Label" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about-us", label: "About" },
];

export const valueProps = [
  { h: "Organic products", p: "Carefully selected products, grown naturally and handled with care to preserve their quality and freshness." },
  { h: "Empowering farmers", p: "Supporting farmers with fair partnerships, sustainable practices, and access to better opportunities." },
  { h: "Advanced processing", p: "Modern processing facilities ensure consistent quality, freshness, and high standards at every stage." },
  { h: "Export logistics", p: "Reliable logistics and global distribution solutions for smooth, efficient, and on-time delivery." },
];

export const processSteps = [
  { h: "Source", p: "We work with suppliers at origin to secure product that meets the specification agreed with the buyer." },
  { h: "Process", p: "Cleaning, sorting and grading, and pressing for oil, turn raw material into a consistent, export-ready product." },
  { h: "Check", p: "Quality checks against the agreed specification, with lots identified so documents can be matched to the product." },
  { h: "Pack", p: "Bulk or retail-ready packaging, labelled to your requirements, including private-label formats." },
  { h: "Ship", p: "Container loading, export documentation and logistics coordination to your destination." },
];

export const buyers = [
  { h: "Food manufacturers", p: "Consistent ingredients for bakery, confectionery, sauces, snacks and spreads." },
  { h: "Wholesalers and distributors", p: "Commercial volumes in bulk formats, with packaging suited to your onward trade." },
  { h: "Retail and private-label brands", p: "Retail-ready packs and branded programmes built around your labelling." },
  { h: "Industrial and bulk buyers", p: "Large-volume supply of seeds and oil for processing and repacking." },
];

export const enquiryChecklist = [
  "The product and the form you need, for example hulled sesame or bottled oil",
  "The quantity per shipment and how often you buy",
  "Your destination country and port",
  "Packaging and labelling requirements",
  "Any specifications, testing or documents your market requires",
];

export const nextSteps = [
  { h: "We reply by email", p: "The team reviews your enquiry and comes back with questions or confirmation of availability." },
  { h: "We confirm the details", p: "We agree specification, packaging and delivery terms, and discuss samples where relevant." },
  { h: "We plan production and shipment", p: "Once terms are agreed we schedule production, quality checks, packaging and export documentation." },
];

// serviceTypes.js - Google API service types with React Icons
import {
  FaPalette, // Art gallery
  FaCookie, // Bakery
  FaGlassWhiskey, // Bar
  FaBook, // Book store
  FaCoffee, // Cafe
  FaWrench, // Car repair
  FaStore, // Clothing/Department/Store
  FaUserMd, // Doctor
  FaSeedling, // Florist
  FaUtensils, // Food/Restaurant
  FaShoppingCart, // Grocery/Supermarket
  FaHeartbeat, // Health
  FaHospital, // Hospital
  FaBox, // Meal takeaway
  FaTruck, // Moving company
  FaCar, // Car rental
  FaGraduationCap, // Schools
  FaUniversity, // University
  FaShoppingBag, // Shopping mall
  FaWarehouse, // Storage
  FaShieldAlt, // Insurance agency
  FaGem, // Jewelry store
  FaMusic, // Night club
  FaPlane, // Travel agency
  FaBuilding, // Government/Buildings
  FaHome, // Default fallback
  FaMapMarkerAlt, // General location
} from "react-icons/fa";

// Keep your original serviceTypes for backward compatibility
export const serviceTypes = {
  hotels: {
    id: "hotels",
    name: "Hotels",
    imageSrc: "/assets/Hotels.jpg",
  },
  beautysalons: {
    id: "beautysalons",
    name: "Beauty salon",
    imageSrc: "/assets/BeautySalon.jpg",
  },
  autodealerships: {
    id: "autodealerships",
    name: "Auto dealers",
    imageSrc: "/assets/AutoDealers.jpg",
  },
  walkinClinics: {
    id: "walkinClinics",
    name: "Walk in clinics",
    imageSrc: "/assets/WalkinClinics.jpg",
  },
  petclinics: {
    id: "petclinics",
    name: "Pet clinics",
    imageSrc: "/assets/PetClinics.jpg",
  },
  dentalclinics: {
    id: "dentalclinics",
    name: "Dental clinics",
    imageSrc: "/assets/DentalClinic.jpg",
  },
  plumbing: {
    id: "plumbing",
    name: "Plumbing companies",
    imageSrc: "/assets/plumbing.jpg",
  },
  banks: {
    id: "banks",
    name: "Banks",
    imageSrc: "/assets/Banks.jpg",
  },
  insurance: {
    id: "insurance",
    name: "Insurance companies",
    imageSrc: "/assets/Insurance.jpg",
  },
  autoservice: {
    id: "autoservice",
    name: "Auto services",
    imageSrc: "/assets/Autoservice.jpg",
  },
  propertymanagement: {
    id: "propertymanagement",
    name: "Rental appartments",
    imageSrc: "/assets/Propertymanagement.jpg",
  },
  realestate: {
    id: "realestate",
    name: "Real Estate agencies",
    imageSrc: "/assets/RealEstateAgencies.jpg",
  },
  travel: {
    id: "travel",
    name: "Travel agencies",
    imageSrc: "/assets/Travel.jpg",
  },
  cleaning: {
    id: "cleaning",
    name: "Cleaning service",
    imageSrc: "/assets/Cleaning.jpg",
  },
  event: {
    id: "event",
    name: "Event agencies",
    imageSrc: "/assets/Eventagencies.jpg",
  },
  daycares: {
    id: "daycares",
    name: "Daycares, Afterschools, Summer camps",
    imageSrc: "/assets/Daycares.jpg",
  },
  drivingschool: {
    id: "drivingschool",
    name: "Driving schools",
    imageSrc: "/assets/Drivingshool.jpg",
  },
  tutoringcenters: {
    id: "tutoringcenters",
    name: "Tutoring centers",
    imageSrc: "/assets/Tutoringcenter.jpg",
  },
  computermobilerepair: {
    id: "computermobilerepair",
    name: "Computer and mobile repairs",
    imageSrc: "/assets/Computermobilerepair.jpg",
  },
  taxis: {
    id: "taxis",
    name: "Taxis",
    imageSrc: "/assets/Taxis.jpg",
  },
};

// Google API service types with icons - Multiple key formats for flexibility
export const googleServiceTypes = {
  // Underscore format (API might use this)
  art_gallery: {
    id: "art_gallery",
    name: "Art gallery",
    icon: FaPalette,
    color: "#8B5CF6",
  },
  // Space format (API might use this)
  "art gallery": {
    id: "art gallery",
    name: "Art gallery",
    icon: FaPalette,
    color: "#8B5CF6",
  },
  bakery: {
    id: "bakery",
    name: "Bakery",
    icon: FaCookie,
    color: "#D97706",
  },
  bar: {
    id: "bar",
    name: "Bar",
    icon: FaGlassWhiskey,
    color: "#DC2626",
  },
  book_store: {
    id: "book_store",
    name: "Book store",
    icon: FaBook,
    color: "#1D4ED8",
  },
  "book store": {
    id: "book store",
    name: "Book store",
    icon: FaBook,
    color: "#1D4ED8",
  },
  cafe: {
    id: "cafe",
    name: "Cafe",
    icon: FaCoffee,
    color: "#92400E",
  },
  car_repair: {
    id: "car_repair",
    name: "Car repair",
    icon: FaWrench,
    color: "#374151",
  },
  car_rental: {
    id: "car_rental",
    name: "Car rental",
    icon: FaCar,
    color: "#0EA5E9",
  },
  "car rental": {
    id: "car rental",
    name: "Car rental",
    icon: FaCar,
    color: "#0EA5E9",
  },
  car_dealer: {
    id: "car_dealer",
    name: "Car dealer",
    icon: FaCar,
    color: "#2563EB",
  },
  "car dealer": {
    id: "car dealer",
    name: "Car dealer",
    icon: FaCar,
    color: "#2563EB",
  },
  motor_vehicle_dealer: {
    id: "motor_vehicle_dealer",
    name: "Motor vehicle dealer",
    icon: FaCar,
    color: "#1D4ED8",
  },
  "motor vehicle dealer": {
    id: "motor vehicle dealer",
    name: "Motor vehicle dealer",
    icon: FaCar,
    color: "#1D4ED8",
  },
  "car repair": {
    id: "car repair",
    name: "Car repair",
    icon: FaWrench,
    color: "#374151",
  },
  clothing_store: {
    id: "clothing_store",
    name: "Clothing store",
    icon: FaStore,
    color: "#EC4899",
  },
  "clothing store": {
    id: "clothing store",
    name: "Clothing store",
    icon: FaStore,
    color: "#EC4899",
  },
  department_store: {
    id: "department_store",
    name: "Department store",
    icon: FaStore,
    color: "#059669",
  },
  furniture_store: {
    id: "furniture_store",
    name: "Furniture store",
    icon: FaStore,
    color: "#0EA5A0",
  },
  "furniture store": {
    id: "furniture store",
    name: "Furniture store",
    icon: FaStore,
    color: "#0EA5A0",
  },
  "department store": {
    id: "department store",
    name: "Department store",
    icon: FaStore,
    color: "#059669",
  },
  doctor: {
    id: "doctor",
    name: "Doctor",
    icon: FaUserMd,
    color: "#EF4444",
  },
  florist: {
    id: "florist",
    name: "Florist",
    icon: FaSeedling,
    color: "#10B981",
  },
  food: {
    id: "food",
    name: "Food",
    icon: FaUtensils,
    color: "#F59E0B",
  },
  grocery_or_supermarket: {
    id: "grocery_or_supermarket",
    name: "Grocery or supermarket",
    icon: FaShoppingCart,
    color: "#059669",
  },
  home_goods_store: {
    id: "home_goods_store",
    name: "Home goods store",
    icon: FaStore,
    color: "#10B981",
  },
  "home goods store": {
    id: "home goods store",
    name: "Home goods store",
    icon: FaStore,
    color: "#10B981",
  },
  "grocery or supermarket": {
    id: "grocery or supermarket",
    name: "Grocery or supermarket",
    icon: FaShoppingCart,
    color: "#059669",
  },
  health: {
    id: "health",
    name: "Health",
    icon: FaHeartbeat,
    color: "#EF4444",
  },
  hospital: {
    id: "hospital",
    name: "Hospital",
    icon: FaHospital,
    color: "#DC2626",
  },
  meal_takeaway: {
    id: "meal_takeaway",
    name: "Meal takeaway",
    icon: FaBox,
    color: "#F59E0B",
  },
  "meal takeaway": {
    id: "meal takeaway",
    name: "Meal takeaway",
    icon: FaBox,
    color: "#F59E0B",
  },
  moving_company: {
    id: "moving_company",
    name: "Moving company",
    icon: FaTruck,
    color: "#6B7280",
  },
  "moving company": {
    id: "moving company",
    name: "Moving company",
    icon: FaTruck,
    color: "#6B7280",
  },
  primary_school: {
    id: "primary_school",
    name: "Primary school",
    icon: FaGraduationCap,
    color: "#3B82F6",
  },
  "primary school": {
    id: "primary school",
    name: "Primary school",
    icon: FaGraduationCap,
    color: "#3B82F6",
  },
  restaurant: {
    id: "restaurant",
    name: "Restaurant",
    icon: FaUtensils,
    color: "#F59E0B",
  },
  school: {
    id: "school",
    name: "School",
    icon: FaGraduationCap,
    color: "#1E40AF",
  },
  secondary_school: {
    id: "secondary_school",
    name: "Secondary school",
    icon: FaUniversity,
    color: "#7C3AED",
  },
  "secondary school": {
    id: "secondary school",
    name: "Secondary school",
    icon: FaUniversity,
    color: "#7C3AED",
  },
  shoe_store: {
    id: "shoe_store",
    name: "Shoe store",
    icon: FaStore,
    color: "#374151",
  },
  "shoe store": {
    id: "shoe store",
    name: "Shoe store",
    icon: FaStore,
    color: "#374151",
  },
  shopping_mall: {
    id: "shopping_mall",
    name: "Shopping mall",
    icon: FaShoppingBag,
    color: "#EC4899",
  },
  "shopping mall": {
    id: "shopping mall",
    name: "Shopping mall",
    icon: FaShoppingBag,
    color: "#EC4899",
  },
  storage: {
    id: "storage",
    name: "Storage",
    icon: FaWarehouse,
    color: "#6B7280",
  },
  store: {
    id: "store",
    name: "Store",
    icon: FaStore,
    color: "#059669",
  },
  supermarket: {
    id: "supermarket",
    name: "Supermarket",
    icon: FaShoppingCart,
    color: "#10B981",
  },
  insurance_agency: {
    id: "insurance_agency",
    name: "Insurance agency",
    icon: FaShieldAlt,
    color: "#1E40AF",
  },
  "insurance agency": {
    id: "insurance agency",
    name: "Insurance agency",
    icon: FaShieldAlt,
    color: "#1E40AF",
  },
  jewelry_store: {
    id: "jewelry_store",
    name: "Jewelry store",
    icon: FaGem,
    color: "#8B5CF6",
  },
  "jewelry store": {
    id: "jewelry store",
    name: "Jewelry store",
    icon: FaGem,
    color: "#8B5CF6",
  },
  night_club: {
    id: "night_club",
    name: "Night club",
    icon: FaMusic,
    color: "#EC4899",
  },
  "night club": {
    id: "night club",
    name: "Night club",
    icon: FaMusic,
    color: "#EC4899",
  },
  travel_agency: {
    id: "travel_agency",
    name: "Travel agency",
    icon: FaPlane,
    color: "#0369A1",
  },
  "travel agency": {
    id: "travel agency",
    name: "Travel agency",
    icon: FaPlane,
    color: "#0369A1",
  },
  university: {
    id: "university",
    name: "University",
    icon: FaUniversity,
    color: "#7C3AED",
  },
  bank: {
    id: "bank",
    name: "Bank",
    icon: FaUniversity,
    color: "#2563EB",
  },
  Bank: {
    id: "Bank",
    name: "Bank",
    icon: FaUniversity,
    color: "#2563EB",
  },
  local_government_office: {
    id: "local_government_office",
    name: "Local government office",
    icon: FaBuilding,
    color: "#374151",
  },
  "local government office": {
    id: "local government office",
    name: "Local government office",
    icon: FaBuilding,
    color: "#374151",
  },
  // Additional common variations
  beauty_salon: {
    id: "beauty_salon",
    name: "Beauty salon",
    icon: FaStore,
    color: "#EC4899",
  },
  "beauty salon": {
    id: "beauty salon",
    name: "Beauty salon",
    icon: FaStore,
    color: "#EC4899",
  },
  convenience_store: {
    id: "convenience_store",
    name: "Convenience store",
    icon: FaStore,
    color: "#6B7280",
  },
  "convenience store": {
    id: "convenience store",
    name: "Convenience store",
    icon: FaStore,
    color: "#6B7280",
  },
  // Additional common Google types
  pharmacy: {
    id: "pharmacy",
    name: "Pharmacy",
    icon: FaHospital,
    color: "#10B981",
  },
  gas_station: {
    id: "gas_station",
    name: "Gas station",
    icon: FaTruck,
    color: "#F59E0B",
  },
  hardware_store: {
    id: "hardware_store",
    name: "Hardware store",
    icon: FaStore,
    color: "#6B7280",
  },
  electronics_store: {
    id: "electronics_store",
    name: "Electronics store",
    icon: FaStore,
    color: "#3B82F6",
  },
  liquor_store: {
    id: "liquor_store",
    name: "Liquor store",
    icon: FaGlassWhiskey,
    color: "#7C3AED",
  },
  massage_therapist: {
    id: "massage_therapist",
    name: "Massage therapist",
    icon: FaHeartbeat,
    color: "#FB7185",
  },
  "massage therapist": {
    id: "massage therapist",
    name: "Massage therapist",
    icon: FaHeartbeat,
    color: "#FB7185",
  },
  gym: {
    id: "gym",
    name: "Gym",
    icon: FaHeartbeat,
    color: "#DC2626",
  },
  barber: {
    id: "barber",
    name: "Barber",
    icon: FaPalette,
    color: "#EC4899",
  },
  hair_care: {
    id: "hair_care",
    name: "Hair care",
    icon: FaPalette,
    color: "#EC4899",
  },
  spa: {
    id: "spa",
    name: "Spa",
    icon: FaPalette,
    color: "#EC4899",
  },
  pet_store: {
    id: "pet_store",
    name: "Pet store",
    icon: FaSeedling,
    color: "#10B981",
  },
  veterinary_care: {
    id: "veterinary_care",
    name: "Veterinary care",
    icon: FaSeedling,
    color: "#10B981",
  },
  post_office: {
    id: "post_office",
    name: "Post office",
    icon: FaBuilding,
    color: "#374151",
  },
  parking: {
    id: "parking",
    name: "Parking",
    icon: FaCar,
    color: "#6B7280",
  },
  museum: {
    id: "museum",
    name: "Museum",
    icon: FaPalette,
    color: "#7C3AED",
  },
  library: {
    id: "library",
    name: "Library",
    icon: FaBook,
    color: "#1D4ED8",
  },
  park: {
    id: "park",
    name: "Park",
    icon: FaSeedling,
    color: "#059669",
  },
  zoo: {
    id: "zoo",
    name: "Zoo",
    icon: FaSeedling,
    color: "#EC4899",
  },
  aquarium: {
    id: "aquarium",
    name: "Aquarium",
    icon: FaSeedling,
    color: "#3B82F6",
  },
  movie_theater: {
    id: "movie_theater",
    name: "Movie theater",
    icon: FaMusic,
    color: "#EC4899",
  },
  bowling_alley: {
    id: "bowling_alley",
    name: "Bowling alley",
    icon: FaMusic,
    color: "#7C3AED",
  },
  stadium: {
    id: "stadium",
    name: "Stadium",
    icon: FaMusic,
    color: "#7C3AED",
  },
  campground: {
    id: "campground",
    name: "Campground",
    icon: FaHome,
    color: "#059669",
  },
  lodging: {
    id: "lodging",
    name: "Lodging",
    icon: FaHome,
    color: "#8B5CF6",
  },
};

// Service categories structure
export const serviceCategories = {
  stores: {
    id: "stores",
    name: "Stores",
    icon: FaStore,
    color: "#059669",
    description: "All kinds of retail stores and shopping",
    services: [
      "clothing_store",
      "clothing store",
      "department_store", 
      "department store",
      "convenience_store",
      "convenience store",
      "hardware_store",
      "electronics_store",
      "liquor_store",
      "shoe_store",
      "shoe store",
      "book_store",
      "book store",
      "jewelry_store", 
      "jewelry store",
      "pet_store",
      "furniture_store",
      "furniture store",
      "home_goods_store",
      "home goods store",
      "store",
      "supermarket",
      "grocery_or_supermarket",
      "grocery or supermarket"
    ]
  },
  healthcare: {
    id: "healthcare",
    name: "Healthcare",
    icon: FaHeartbeat,
    color: "#EF4444",
    description: "Medical services and health facilities",
    services: [
      "doctor",
      "pharmacy",
      "hospital",
      "health",
      "walkinClinics",
      "petclinics",
      "dentalclinics",
      "veterinary_care"
    ]
  },
  food: {
    id: "food",
    name: "Food & Dining",
    icon: FaUtensils,
    color: "#F59E0B", 
    description: "Restaurants, cafes, and food services",
    services: [
      "restaurant",
      "cafe",
      "bakery",
      "bar",
      "food",
      "meal_takeaway",
      "meal takeaway"
    ]
  },
  automotive: {
    id: "automotive",
    name: "Automotive",
    icon: FaWrench,
    color: "#374151",
    description: "Car services and automotive needs",
    services: [
      "car_repair",
      "car repair", 
      "car_rental",
      "car rental",
      "car_dealer",
      "car dealer",
      "motor_vehicle_dealer",
      "motor vehicle dealer",
      "gas_station",
      "autodealerships",
      "autoservice"
    ]
  },
  education: {
    id: "education", 
    name: "Education",
    icon: FaGraduationCap,
    color: "#3B82F6",
    description: "Schools, universities and learning centers",
    services: [
      "school",
      "primary_school",
      "primary school",
      "secondary_school", 
      "secondary school",
      "university",
      "drivingschool",
      "tutoringcenters",
      "daycares",
      "library"
    ]
  },
  services: {
    id: "services",
    name: "Professional Services", 
    icon: FaBuilding,
    color: "#6B7280",
    description: "Business and professional services (includes Insurance, Travel agency, and Local government)",
    services: [
      "bank",
      "banks",
      "insurance",
      "insurance_agency",
      "insurance agency",
      "realestate",
      "post_office",
      "travel",
      "travel_agency",
      "travel agency",
      "cleaning",
      "event",
      "local_government_office",
      "local government office",
      "computermobilerepair",
      "plumbing"
    ]
  },
  hospitality: {
    id: "hospitality",
    name: "Hospitality & Accommodation",
    icon: FaHome,
    color: "#8B5CF6", 
    description: "Hotels and accommodation services",
    services: [
      "hotels",
      "propertymanagement",
      "lodging",
      "campground"
    ]
  },
  personal_care: {
    id: "personal_care",
    name: "Personal Care",
    icon: FaPalette,
    color: "#EC4899",
    description: "Beauty and personal care services", 
    services: [
      "beautysalons",
      "beauty_salon",
      "beauty salon",
      "barber",
      "hair_care",
      "spa",
      "massage_therapist",
      "massage therapist"
    ]
  },
  entertainment: {
    id: "entertainment",
    name: "Entertainment",
    icon: FaMusic,
    color: "#EC4899", 
    description: "Entertainment and leisure activities",
    services: [
      "night_club",
      "night club",
      "art_gallery", 
      "art gallery",
      "movie_theater",
      "bowling_alley",
      "stadium",
      "museum",
      "park",
      "zoo",
      "aquarium",
      "shopping_mall",
      "shopping mall"
    ]
  },
  transportation: {
    id: "transportation",
    name: "Transportation",
    icon: FaTruck,
    color: "#6B7280",
    description: "Transportation and logistics services",
    services: [
      "taxis",
      "moving_company",
      "moving company",
      "parking",
      "storage"
    ]
  },
  other: {
    id: "other", 
    name: "Other Services",
    icon: FaMapMarkerAlt,
    color: "#6B7280",
    description: "Miscellaneous services",
    services: [
      "florist"
    ]
  }
};

// Helper function to get category for a service
export const getCategoryForService = (serviceKey) => {
  // 1) Explicit mapping list match
  for (const [categoryId, category] of Object.entries(serviceCategories)) {
    if (category.services.includes(serviceKey)) {
      return categoryId;
    }
  }

  // 2) Heuristic keyword-based fallback to better align unmapped Google types
  const k = (serviceKey || "").toLowerCase();
  const has = (s) => k.includes(s);

  if (
    has("store") ||
    has("shopping") ||
    has("supermarket") ||
    has("grocery") ||
    has("department") ||
    has("liquor") ||
    has("hardware") ||
    has("electronics") ||
    has("home_goods") || has("home goods") ||
    has("furniture") ||
    has("shoe") ||
    has("book") ||
    has("jewelry") ||
    has("pet_store") || has("pet store")
  ) return "stores";

  if (
    has("car") ||
    has("auto") ||
    has("gas_station") || has("gas station") ||
    has("parking") ||
    has("car_rental") || has("car rental") ||
    has("car_dealer") || has("car dealer") ||
    has("motor_vehicle")
  ) return "automotive";

  if (
    has("hospital") ||
    has("pharmacy") ||
    has("dentist") ||
    has("doctor") ||
    has("health") ||
    has("veterinary") || has("veterinarian") ||
    has("clinic") ||
    has("gym") ||
    has("physio") || has("physiotherapist") || has("chiro") || has("chiropractor")
  ) return "healthcare";

  if (
    has("restaurant") ||
    has("cafe") ||
    has("bakery") ||
    has("bar") ||
    has("meal_takeaway") || has("meal takeaway") ||
    has("food")
  ) return "food";

  if (
    has("school") ||
    has("university") ||
    has("library") ||
    has("tutoring") ||
    has("driving")
  ) return "education";

  if (
    has("bank") ||
    has("insurance") ||
    has("post_office") || has("post office") ||
    has("travel_agency") || has("travel agency") ||
    has("real_estate") || has("real estate") ||
    has("local_government") || has("government") ||
    has("plumber") || has("plumbing") ||
    has("computer_repair") || has("computer repair")
  ) return "services";

  if (
    has("hotel") ||
    has("lodging") ||
    has("campground") ||
    has("apartment") || has("rental") || has("property")
  ) return "hospitality";

  if (
    has("beauty") ||
    has("barber") ||
    has("hair_care") || has("hair care") ||
    has("spa") ||
    has("massage") || has("therapist")
  ) return "personal_care";

  if (
    has("night_club") || has("night club") ||
    has("movie_theater") || has("movie theater") ||
    has("bowling_alley") || has("bowling alley") ||
    has("stadium") ||
    has("museum") ||
    has("park") ||
    has("zoo") ||
    has("aquarium") ||
    has("art_gallery") || has("art gallery") ||
    has("shopping_mall") || has("shopping mall")
  ) return "entertainment";

  if (
    has("taxi") ||
    has("moving_company") || has("moving company") ||
    has("storage") ||
    has("parking")
  ) return "transportation";

  // 3) Fallback
  return "other";
};

// Helper function to get services grouped by categories 
export const getServicesByCategory = (services) => {
  const categorizedServices = {};
  
  // Initialize all categories
  Object.keys(serviceCategories).forEach(categoryId => {
    categorizedServices[categoryId] = [];
  });

  // Group services by category
  services.forEach(service => {
    const categoryId = getCategoryForService(service.id);
    categorizedServices[categoryId].push(service);
  });

  // Filter out empty categories
  Object.keys(categorizedServices).forEach(categoryId => {
    if (categorizedServices[categoryId].length === 0) {
      delete categorizedServices[categoryId];
    }
  });

  return categorizedServices;
};

// Helper function to get service type by key with fallback
export const getServiceType = (key) => {
  // Try Google service types first
  if (googleServiceTypes[key]) {
    return googleServiceTypes[key];
  }

  // Try original service types
  if (serviceTypes[key]) {
    return serviceTypes[key];
  }

  // Try with spaces converted to underscores
  const underscoreKey = key.replace(/\s+/g, "_").toLowerCase();
  if (googleServiceTypes[underscoreKey]) {
    return googleServiceTypes[underscoreKey];
  }

  // Return default fallback
  return {
    id: key,
    name: key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
    icon: FaMapMarkerAlt,
    color: "#6B7280",
  };
};

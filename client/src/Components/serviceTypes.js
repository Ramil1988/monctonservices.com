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

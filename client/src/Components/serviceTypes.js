// serviceTypes.js - Service types with Lucide React icons
import {
  Store,
  Utensils,
  Car,
  GraduationCap,
  Building2,
  Home,
  Heart,
  Gamepad2,
  Plane,
  Landmark,
  Hotel,
  ShoppingBag,
  ShoppingCart,
  Coffee,
  Wine,
  Book,
  Gem,
  Stethoscope,
  Hospital,
  Pill,
  Scissors,
  Dumbbell,
  Sparkles,
  MapPin,
  PaintBucket,
  Cookie,
  Flower,
  Warehouse,
  Shield,
  Music,
  Truck,
  University,
  Calculator,
  Zap,
  Hammer,
  Lock,
  Users,
  Film,
  Baby,
  Trophy,
  Camera,
  HouseIcon as HouseUser,
  Wrench,
  PiggyBank,
  Shirt,
  Dog,
  Fuel,
  Plane as AirplaneIcon,
  Laptop,
  Shirt as ShirtIcon,
  Flower2,
  Briefcase,
  Palette,
  Activity,
  Navigation,
  Utensils as FaUtensils,
  ShoppingCart as FaShoppingCart,
  Hospital as FaHospital,
  Box as FaBox,
  Truck as FaTruck,
  GraduationCap as FaGraduationCap,
  University as FaUniversity,
  ShoppingBag as FaShoppingBag,
  Warehouse as FaWarehouse,
  Shield as FaShieldAlt,
  Gem as FaGem,
  Music as FaMusic,
  Plane as FaPlane,
  Building as FaBuilding,
  Wine as FaGlassWhiskey,
  Sparkles as FaSpa,
  Dumbbell as MdFitnessCenter,
  Scissors as FaCut,
  Flower as FaSeedling,
  Palette as FaPalette,
  Book as FaBook,
  Home as FaHome,
  Building as FaCity,
  Calculator as FaCalculator,
  Zap as FaBolt,
  Hammer as FaTools,
  Lock as FaLock,
  Film as MdLocalMovies,
  Baby as MdChildCare,
  UserCheck as FaUserMd,
} from "lucide-react";

// Keep your original serviceTypes for backward compatibility
export const serviceTypes = {
  hotels: {
    id: "hotels",
    name: "Hotels",
    icon: Hotel,
    color: "#8B5CF6",
  },
  beautysalons: {
    id: "beautysalons",
    name: "Beauty salon",
    icon: Sparkles,
    color: "#EC4899",
  },
  walkinClinics: {
    id: "walkinClinics",
    name: "Walk in clinics",
    icon: Stethoscope,
    color: "#EF4444",
  },
  petclinics: {
    id: "petclinics",
    name: "Pet clinics",
    icon: Dog,
    color: "#10B981",
  },
  dentalclinics: {
    id: "dentalclinics",
    name: "Dental clinics",
    icon: Stethoscope,
    color: "#3B82F6",
  },
  plumbing: {
    id: "plumbing",
    name: "Plumbing companies",
    icon: Wrench,
    color: "#6B7280",
  },
  banks: {
    id: "banks",
    name: "Banks",
    icon: PiggyBank,
    color: "#2563EB",
  },
  autoservice: {
    id: "autoservice",
    name: "Auto services",
    icon: Wrench,
    color: "#374151",
  },
  propertymanagement: {
    id: "propertymanagement",
    name: "Rental apartments",
    icon: Home,
    color: "#8B5CF6",
  },
  cleaning: {
    id: "cleaning",
    name: "Cleaning service",
    icon: Sparkles,
    color: "#10B981",
  },
  event: {
    id: "event",
    name: "Event agencies",
    icon: Users,
    color: "#EC4899",
  },
  daycares: {
    id: "daycares",
    name: "Daycares, Afterschools, Summer camps",
    icon: Baby,
    color: "#3B82F6",
  },
  drivingschool: {
    id: "drivingschool",
    name: "Driving schools",
    icon: Car,
    color: "#3B82F6",
  },
  tutoringcenters: {
    id: "tutoringcenters",
    name: "Tutoring centers",
    icon: GraduationCap,
    color: "#3B82F6",
  },
  computermobilerepair: {
    id: "computermobilerepair",
    name: "Computer and mobile repairs",
    icon: Laptop,
    color: "#6B7280",
  },
  taxis: {
    id: "taxis",
    name: "Taxis",
    icon: Car,
    color: "#F59E0B",
  },
  // New service types
  drugstore: {
    id: "drugstore",
    name: "Drug Store",
    icon: Pill,
    color: "#10B981",
  },
  petstore: {
    id: "petstore",
    name: "Pet Store",
    icon: Dog,
    color: "#10B981",
  },
  shoestore: {
    id: "shoestore",
    name: "Shoe Store",
    icon: ShirtIcon,
    color: "#EC4899",
  },
  airport: {
    id: "airport",
    name: "Airport",
    icon: AirplaneIcon,
    color: "#0EA5E9",
  },
  finance: {
    id: "finance",
    name: "Finance",
    icon: PiggyBank,
    color: "#2563EB",
  },
  laundry: {
    id: "laundry",
    name: "Laundry",
    icon: Shirt,
    color: "#6B7280",
  },
  mealdelivery: {
    id: "mealdelivery",
    name: "Meal Delivery",
    icon: Truck,
    color: "#F59E0B",
  },
};

// Google API service types with icons - Multiple key formats for flexibility
export const googleServiceTypes = {
  // Underscore format (API might use this)
  art_gallery: {
    id: "art_gallery",
    name: "Art gallery",
    icon: Palette,
    color: "#8B5CF6",
  },
  // Space format (API might use this)
  "art gallery": {
    id: "art gallery",
    name: "Art gallery",
    icon: Palette,
    color: "#8B5CF6",
  },
  bakery: {
    id: "bakery",
    name: "Bakery",
    icon: Cookie,
    color: "#D97706",
  },
  bar: {
    id: "bar",
    name: "Bar",
    icon: Wine,
    color: "#DC2626",
  },
  book_store: {
    id: "book_store",
    name: "Book store",
    icon: Book,
    color: "#1D4ED8",
  },
  "book store": {
    id: "book store",
    name: "Book store",
    icon: Book,
    color: "#1D4ED8",
  },
  cafe: {
    id: "cafe",
    name: "Cafe",
    icon: Coffee,
    color: "#92400E",
  },
  car_repair: {
    id: "car_repair",
    name: "Car repair",
    icon: Wrench,
    color: "#374151",
  },
  car_rental: {
    id: "car_rental",
    name: "Car rental",
    icon: Car,
    color: "#0EA5E9",
  },
  "car rental": {
    id: "car rental",
    name: "Car rental",
    icon: Car,
    color: "#0EA5E9",
  },
  car_dealer: {
    id: "car_dealer",
    name: "Auto dealers",
    icon: Car,
    color: "#2563EB",
  },
  motor_vehicle_dealer: {
    id: "motor_vehicle_dealer",
    name: "Motor vehicle dealer",
    icon: Car,
    color: "#1D4ED8",
  },
  "motor vehicle dealer": {
    id: "motor vehicle dealer",
    name: "Motor vehicle dealer",
    icon: Car,
    color: "#1D4ED8",
  },
  "car repair": {
    id: "car repair",
    name: "Car repair",
    icon: Wrench,
    color: "#374151",
  },
  clothing_store: {
    id: "clothing_store",
    name: "Clothing store",
    icon: Store,
    color: "#EC4899",
  },
  "clothing store": {
    id: "clothing store",
    name: "Clothing store",
    icon: Store,
    color: "#EC4899",
  },
  department_store: {
    id: "department_store",
    name: "Department store",
    icon: Store,
    color: "#059669",
  },
  furniture_store: {
    id: "furniture_store",
    name: "Furniture store",
    icon: Store,
    color: "#0EA5A0",
  },
  "furniture store": {
    id: "furniture store",
    name: "Furniture store",
    icon: Store,
    color: "#0EA5A0",
  },
  "department store": {
    id: "department store",
    name: "Department store",
    icon: Store,
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
    icon: Store,
    color: "#10B981",
  },
  "home goods store": {
    id: "home goods store",
    name: "Home goods store",
    icon: Store,
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
    icon: Heart,
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
    icon: Store,
    color: "#374151",
  },
  "shoe store": {
    id: "shoe store",
    name: "Shoe store",
    icon: Store,
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
    icon: Store,
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
    name: "Insurance agencies",
    icon: Shield,
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
    name: "Travel agencies",
    icon: Plane,
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
    icon: Store,
    color: "#EC4899",
  },
  "beauty salon": {
    id: "beauty salon",
    name: "Beauty salon",
    icon: Store,
    color: "#EC4899",
  },
  convenience_store: {
    id: "convenience_store",
    name: "Convenience store",
    icon: Store,
    color: "#6B7280",
  },
  "convenience store": {
    id: "convenience store",
    name: "Convenience store",
    icon: Store,
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
    icon: Store,
    color: "#6B7280",
  },
  electronics_store: {
    id: "electronics_store",
    name: "Electronics store",
    icon: Store,
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
    icon: FaSpa,
    color: "#FB7185",
  },
  "massage therapist": {
    id: "massage therapist",
    name: "Massage therapist",
    icon: FaSpa,
    color: "#FB7185",
  },
  gym: {
    id: "gym",
    name: "Gym",
    icon: MdFitnessCenter,
    color: "#DC2626",
  },
  barber: {
    id: "barber",
    name: "Barber",
    icon: FaCut,
    color: "#EC4899",
  },
  hair_care: {
    id: "hair_care",
    name: "Hair care",
    icon: FaCut,
    color: "#EC4899",
  },
  spa: {
    id: "spa",
    name: "Spa",
    icon: FaSpa,
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
    icon: Car,
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
  // Additional service types
  city_hall: {
    id: "city_hall",
    name: "City hall",
    icon: FaCity,
    color: "#374151",
  },
  "city hall": {
    id: "city hall",
    name: "City hall",
    icon: FaCity,
    color: "#374151",
  },
  accounting: {
    id: "accounting",
    name: "Accounting",
    icon: FaCalculator,
    color: "#6B7280",
  },
  electrician: {
    id: "electrician",
    name: "Electrician",
    icon: FaBolt,
    color: "#6B7280",
  },
  general_contractor: {
    id: "general_contractor",
    name: "General contractor",
    icon: FaTools,
    color: "#6B7280",
  },
  "general contractor": {
    id: "general contractor",
    name: "General contractor",
    icon: FaTools,
    color: "#6B7280",
  },
  locksmith: {
    id: "locksmith",
    name: "Locksmith",
    icon: FaLock,
    color: "#6B7280",
  },
  movietheatres: {
    id: "movietheatres",
    name: "Movie theatres",
    icon: MdLocalMovies,
    color: "#EC4899",
  },
  "movie theatres": {
    id: "movie theatres",
    name: "Movie theatres",
    icon: MdLocalMovies,
    color: "#EC4899",
  },
  childrenentertainment: {
    id: "childrenentertainment",
    name: "Children entertainment",
    icon: MdChildCare,
    color: "#EC4899",
  },
  "children entertainment": {
    id: "children entertainment",
    name: "Children entertainment",
    icon: MdChildCare,
    color: "#EC4899",
  },
  hockey: {
    id: "hockey",
    name: "Hockey",
    icon: Trophy,
    color: "#EC4899",
  },
  tourist_attraction: {
    id: "tourist_attraction",
    name: "Tourist attraction",
    icon: Navigation,
    color: "#EC4899",
  },
  "tourist attraction": {
    id: "tourist attraction",
    name: "Tourist attraction",
    icon: Navigation,
    color: "#EC4899",
  },
  real_estate_agency: {
    id: "real_estate_agency",
    name: "Real estate agencies",
    icon: HouseUser,
    color: "#6B7280",
  },
  fitness: {
    id: "fitness",
    name: "Fitness",
    icon: Dumbbell,
    color: "#EC4899",
  },
};

// Service categories structure
export const serviceCategories = {
  stores: {
    id: "stores",
    name: "Stores",
    icon: Store,
    color: "#059669",
    description: "Retail stores including clothing, electronics, books, groceries, and specialty shops",
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
    icon: Heart,
    color: "#EF4444",
    description: "Medical services including doctors, hospitals, clinics, pharmacies, and veterinary care",
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
    icon: Utensils,
    color: "#F59E0B", 
    description: "Restaurants, cafes, bars, bakeries, and food delivery services",
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
    icon: Car,
    color: "#374151",
    description: "Car repairs, dealerships, rentals, gas stations, and automotive services",
    services: [
      "car_repair",
      "car repair", 
      "car_rental",
      "car rental",
      "car_dealer",
      "autodealerships",
      "motor_vehicle_dealer",
      "motor vehicle dealer",
      "gas_station",
      "autoservice"
    ]
  },
  education: {
    id: "education", 
    name: "Education",
    icon: GraduationCap,
    color: "#3B82F6",
    description: "Schools, universities, libraries, tutoring centers, and educational services",
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
    icon: Briefcase,
    color: "#6B7280",
    description: "Business services including banks, insurance, accounting, electricians, contractors, and plumbing",
    services: [
      "bank",
      "banks",
      "insurance",
      "insurance_agency",
      "insurance agency",
      "realestate",
      "real_estate",
      "real estate",
      "real_estate_agency",
      "real estate agency",
      "post_office",
      "travel",
      "travel_agency",
      "travel agency",
      "cleaning",
      "event",
      "computermobilerepair",
      "plumbing",
      "accounting",
      "electrician",
      "general_contractor",
      "general contractor",
      "locksmith"
    ]
  },
  hospitality: {
    id: "hospitality",
    name: "Hospitality & Accommodation",
    icon: Hotel,
    color: "#8B5CF6", 
    description: "Hotels, lodging, rental properties, and accommodation services",
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
    icon: Heart,
    color: "#EC4899",
    description: "Beauty salons, spas, barbers, massage therapy, fitness centers, and personal wellness services", 
    services: [
      "beautysalons",
      "beauty_salon",
      "beauty salon",
      "barber",
      "hair_care",
      "spa",
      "massage_therapist",
      "massage therapist",
      "fitness",
      "gym"
    ]
  },
  entertainment: {
    id: "entertainment",
    name: "Entertainment",
    icon: Gamepad2,
    color: "#EC4899", 
    description: "Movies, sports, museums, parks, attractions, and recreational activities",
    services: [
      "night_club",
      "night club",
      "art_gallery", 
      "art gallery",
      "movie_theater",
      "movietheatres",
      "movie theatres",
      "bowling_alley",
      "stadium",
      "museum",
      "park",
      "zoo",
      "aquarium",
      "shopping_mall",
      "shopping mall",
      "childrenentertainment",
      "children entertainment",
      "hockey",
      "tourist_attraction",
      "tourist attraction"
    ]
  },
  transportation: {
    id: "transportation",
    name: "Transportation",
    icon: Plane,
    color: "#6B7280",
    description: "Taxis, moving companies, storage, and transportation services",
    services: [
      "taxis",
      "moving_company",
      "moving company",
      "parking",
      "storage"
    ]
  },
  government: {
    id: "government",
    name: "Government",
    icon: Landmark,
    color: "#374151",
    description: "Government offices and municipal services",
    services: [
      "local_government_office",
      "local government office",
      "city_hall",
      "city hall"
    ]
  },
  other: {
    id: "other", 
    name: "Other Services",
    icon: MapPin,
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
    has("plumber") || has("plumbing") ||
    has("computer_repair") || has("computer repair") ||
    has("accounting") ||
    has("electrician") ||
    has("contractor") ||
    has("locksmith")
  ) return "services";

  if (
    has("local_government") || has("government") ||
    has("city_hall") || has("city hall")
  ) return "government";

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
    has("massage") || has("therapist") ||
    has("fitness") || has("gym")
  ) return "personal_care";

  if (
    has("night_club") || has("night club") ||
    has("movie_theater") || has("movie theater") ||
    has("movietheatres") || has("movie theatres") ||
    has("bowling_alley") || has("bowling alley") ||
    has("stadium") ||
    has("museum") ||
    has("park") ||
    has("zoo") ||
    has("aquarium") ||
    has("art_gallery") || has("art gallery") ||
    has("shopping_mall") || has("shopping mall") ||
    has("childrenentertainment") || has("children entertainment") ||
    has("hockey") ||
    has("tourist_attraction") || has("tourist attraction")
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

  // Return default fallback with humanized name
  const humanize = (raw) => {
    if (!raw) return "";
    let s = String(raw).replace(/[_-]+/g, " ").trim();
    // common fixups
    s = s.replace(/walk\s*in\s*clinics?/i, "Walk in Clinic");
    s = s.replace(/walkin\s*clinics?/i, "Walk in Clinic");
    s = s.replace(/walkin\s*clinic/i, "Walk in Clinic");
    // insert space between lowercase and uppercase boundaries (camelCase)
    s = s.replace(/([a-z])([A-Z])/g, "$1 $2");
    s = s.replace(/\s+/g, " ").trim();
    const lowerSmall = new Set(["and", "or", "the", "in", "of", "for", "to", "a", "an"]);
    const words = s.split(" ").map((w, i) => {
      const lw = w.toLowerCase();
      if (i !== 0 && lowerSmall.has(lw)) return lw;
      return lw.charAt(0).toUpperCase() + lw.slice(1);
    });
    return words.join(" ");
  };
  return {
    id: key,
    name: humanize(key),
    icon: MapPin,
    color: "#6B7280",
  };
};

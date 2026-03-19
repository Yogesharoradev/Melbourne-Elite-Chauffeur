"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin,
    Calendar,
    Clock,
    ChevronDown,
    Check,
    Loader2,
    X,
    Plane,
    Route,
    Hourglass,
    Sparkles,
    ArrowRightLeft,
    Users,
    Briefcase,
    Info,
    Expand,
    MessageCircle,
    MessageSquare,
    CloudCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { useCarSelection, CARS } from "../carSelection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "../ui/dialog";
import { MapPreview } from "../ui/MapPreview";

type ServiceType = "airport" | "distance" | "hourly" | "special";

interface AirportOption {
    code: string;
    name: string;
    type: "pickup" | "dropoff";
    coords: [number, number];
}

interface HourlyPackage {
    hours: number;
    label: string;
}

interface SpecialOccasion {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
}

const AIRPORTS: AirportOption[] = [
    {
        code: "MEL",
        name: "Melbourne Airport (Tullamarine)",
        coords: [144.843, -37.673],
        type: "pickup"
    },
    {
        code: "AVV",
        name: "Avalon Airport",
        coords: [144.468, -38.039],
        type: "pickup"
    },
    {
        code: "MEB",
        name: "Essendon Airport",
        coords: [144.901, -37.728],
        type: "pickup"
    }
]

const HOURLY_PACKAGES: HourlyPackage[] = [
    { hours: 2, label: "2 Hours" },
    { hours: 3, label: "3 Hours" },
    { hours: 4, label: "4 Hours" },
    { hours: 5, label: "5 Hours" },
    { hours: 6, label: "6 Hours" },
    { hours: 7, label: "7 Hours" },
    { hours: 8, label: "8 Hours" },
    { hours: 12, label: "Full Day (12h)" },
];

const SPECIAL_OCCASIONS: SpecialOccasion[] = [
    {
        id: "wedding",
        name: "Wedding",
        icon: <Sparkles className="w-4 h-4" />,
        description: "Luxury transport for your special day"
    },
    {
        id: "corporate",
        name: "Corporate Event",
        icon: <Briefcase className="w-4 h-4" />,
        description: "Professional business travel"
    },
    {
        id: "tour",
        name: "Wine Tour",
        icon: <Route className="w-4 h-4" />,
        description: "Scenic vineyard experiences"
    },
    {
        id: "concert",
        name: "Concert/Event",
        icon: <Users className="w-4 h-4" />,
        description: "Arrive in style"
    },
    {
        id: "anniversary",
        name: "Anniversary",
        icon: <Sparkles className="w-4 h-4" />,
        description: "Romantic luxury experience"
    },
];




// Debounce hook for API calls
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

interface Suggestion {
    place_name: string;
    center: [number, number];
}

export function HeroSection() {
    // Service type state
    const [activeService, setActiveService] = useState<ServiceType>("airport");

    // Common states
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
    const [estimatedDistance, setEstimatedDistance] = useState<number | null>(null);

    // Airport Transfer states
    const [flightType, setFlightType] = useState<"arrival" | "departure">("arrival");
    const [selectedAirport, setSelectedAirport] = useState(AIRPORTS[0]);
    const [airportAddress, setAirportAddress] = useState("");
    const [showAirportSuggestions, setShowAirportSuggestions] = useState(false);
    const [airportSuggestions, setAirportSuggestions] = useState<Suggestion[]>([]);
    const [airportLoading, setAirportLoading] = useState(false);
    // Distance states
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [showFromSuggestions, setShowFromSuggestions] = useState(false);
    const [showToSuggestions, setShowToSuggestions] = useState(false);
    const [fromSuggestions, setFromSuggestions] = useState<Suggestion[]>([]);
    const [toSuggestions, setToSuggestions] = useState<Suggestion[]>([]);
    const [fromLoading, setFromLoading] = useState(false);
    const [toLoading, setToLoading] = useState(false);
    const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");

    // Hourly states
    const [selectedPackage, setSelectedPackage] = useState<HourlyPackage>(HOURLY_PACKAGES[1]);
    const [hourlyAddress, setHourlyAddress] = useState("");
    const [showHourlySuggestions, setShowHourlySuggestions] = useState(false);
    const [hourlySuggestions, setHourlySuggestions] = useState<Suggestion[]>([]);
    const [hourlyLoading, setHourlyLoading] = useState(false);

    // Special Occasion states
    const [selectedOccasion, setSelectedOccasion] = useState<SpecialOccasion>(SPECIAL_OCCASIONS[0]);
    const [occasionDate, setOccasionDate] = useState("");
    const [occasionDetails, setOccasionDetails] = useState("");
    const [guestCount, setGuestCount] = useState(2);
    const [specialAddress, setSpecialAddress] = useState("");
    const [specialToLocation, setSpecialToLocation] = useState("");
    const [showSpecialSuggestions, setShowSpecialSuggestions] = useState(false);
    const [showSpecialToSuggestions, setShowSpecialToSuggestions] = useState(false);
    const [specialSuggestions, setSpecialSuggestions] = useState<Suggestion[]>([]);
    const [specialToSuggestions, setSpecialToSuggestions] = useState<Suggestion[]>([]);
    const [specialLoading, setSpecialLoading] = useState(false);
    const [specialToLoading, setSpecialToLoading] = useState(false);

    const debouncedFrom = useDebounce(fromLocation, 300);
    const debouncedTo = useDebounce(toLocation, 300);
    const debouncedAirport = useDebounce(airportAddress, 300);
    const debouncedHourly = useDebounce(hourlyAddress, 300);
    const debouncedSpecial = useDebounce(specialAddress, 300);
    const debouncedSpecialTo = useDebounce(specialToLocation, 300);

    const fromRef = useRef<HTMLDivElement>(null);
    const toRef = useRef<HTMLDivElement>(null);
    const airportRef = useRef<HTMLDivElement>(null);
    const hourlyRef = useRef<HTMLDivElement>(null);
    const specialRef = useRef<HTMLDivElement>(null);

    // Modal states
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingId, setBookingId] = useState<string | null>(null);
    const [showMapModal, setShowMapModal] = useState(false);
    const [contactMethod, setContactMethod] = useState<"whatsapp" | "sms">("whatsapp");

    const [airportCoords, setAirportCoords] = useState<[number, number] | null>(null)
    const [fromCoords, setFromCoords] = useState<[number, number] | null>(null)
    const [toCoords, setToCoords] = useState<[number, number] | null>(null)
    const [hourlyCoords, setHourlyCoords] = useState<[number, number] | null>(null)
    const [specialCoords, setSpecialCoords] = useState<[number, number] | null>(null)
    const [specialToCoords, setSpecialToCoords] = useState<[number, number] | null>(null)

    const {
        selectedCar,
        openCarSelection,
        closeCarSelection,
        handleCarSelect,
        getSelectedCarDetails,
        calculateCarPrice,
        CarSelectionModal
    } = useCarSelection();

    useEffect(() => {
        if (selectedCar) {
            setShowModal(true);
        }
    }, [selectedCar]);


    const RATE_PER_KM = 3.4
    const AIRPORT_MIN_FARE = 120
    const DISTANCE_MIN_FARE = 80

    const HOURLY_RATES: Record<string, number> = {
        economy: 85,
        business: 95,
        suv: 90,
        first: 135,
        "people-mover": 160,
        platinum: 200
    }

    const getDistanceKm = async (
        from: [number, number],
        to: [number, number]
    ) => {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${from[0]},${from[1]};${to[0]},${to[1]}?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`

        const res = await fetch(url)
        const data = await res.json()


        if (!data.routes || data.routes.length === 0) return 0
        const meters = data.routes[0].distance
        return meters / 1000
    }

    const calculateAirportPrice = (distanceKm: number) => {
        const totalDistance = distanceKm * 2

        let price = totalDistance * RATE_PER_KM

        if (price < AIRPORT_MIN_FARE) {
            price = AIRPORT_MIN_FARE
        }

        return Math.round(price)
    }

    const calculateDistancePrice = (distanceKm: number) => {
        let price = distanceKm * RATE_PER_KM

        if (price < DISTANCE_MIN_FARE) {
            price = DISTANCE_MIN_FARE
        }

        return Math.round(price)
    }

    const calculateHourlyPrice = (hours: number) => {
        const car = getSelectedCarDetails()
        const hourlyRate = car?.hourlyRate || 85

        const billableHours = Math.max(hours, 3)

        return Math.round(billableHours * hourlyRate)
    }

    const calculateSpecialPrice = (occasionId: string) => {
        let baseHours = 4; // Default to 4 hours for special occasions
        if (occasionId === "wedding") baseHours = 6;
        if (occasionId === "corporate") baseHours = 5;

        // Use the hourly rate logic to determine base vehicle cost for the duration
        const car = getSelectedCarDetails()
        const rate = car?.hourlyRate || 85
        let price = baseHours * rate;

        // Base price overrides for specific occasions regardless of vehicle, if desired
        // Or we keep it purely duration-based. The previous logic had flat rates:
        // if (occasionId === "wedding") price = Math.max(price, 450);
        // if (occasionId === "corporate") price = Math.max(price, 350);

        if (guestCount > 4) {
            price += (guestCount - 4) * 25
        }

        return Math.round(price)
    }

    useEffect(() => {

        const calculatePrice = async () => {

            let price = 0
            let distance = 0

            try {

                if (activeService === "airport" && airportCoords) {

                    const airport = selectedAirport.coords

                    let distanceKm

                    if (flightType === "arrival") {
                        distanceKm = await getDistanceKm(
                            selectedAirport.coords,
                            airportCoords
                        )
                    } else {
                        distanceKm = await getDistanceKm(
                            airportCoords,
                            selectedAirport.coords
                        )
                    }

                    distance = distanceKm
                    price = calculateAirportPrice(distanceKm)

                }

                if (activeService === "distance" && fromCoords && toCoords) {

                    const distanceKm = await getDistanceKm(
                        fromCoords,
                        toCoords
                    )

                    distance = distanceKm
                    price = calculateDistancePrice(distanceKm)

                    if (tripType === "round-trip") {
                        price = price * 1.8
                        distance = distance * 2
                    }

                }

                if (activeService === "hourly" && hourlyAddress) {

                    price = calculateHourlyPrice(selectedPackage.hours)

                }

                if (activeService === "special" && specialAddress) {

                    price = calculateSpecialPrice(selectedOccasion.id)

                }

                setEstimatedPrice(Math.round(price))
                setEstimatedDistance(distance > 0 ? Number(distance.toFixed(1)) : null)

            } catch (err) {
                console.error("Price calc error", err)
            }

        }

        calculatePrice()

    }, [

        activeService,
        airportCoords,
        fromCoords,
        toCoords,
        selectedPackage.hours,
        guestCount,
        tripType,
        selectedAirport.code,
        selectedCar,
        hourlyAddress,
        specialAddress,
    ])

    const fetchSuggestions = useCallback(async (query: string, setSuggestions: React.Dispatch<React.SetStateAction<any>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (!query || query.length < 3) return;

        setLoading(true);
        try {
            const bbox = "144.5,-38.5,145.5,-37.5";

            // FIXED: Removed space after 'places/'
            const url = new URL(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`);
            url.searchParams.append('access_token', process.env.NEXT_PUBLIC_MAPBOX_TOKEN!);
            url.searchParams.append('bbox', bbox);
            url.searchParams.append('limit', '5');
            url.searchParams.append('types', 'address,place,poi');
            url.searchParams.append('country', 'AU');
            url.searchParams.append('proximity', '144.9631,-37.8136'); // Melbourne center - helps prioritize closer results
            url.searchParams.append('autocomplete', 'true');

            const response = await fetch(url.toString());
            const data = await response.json();

            // Better filtering - keep all relevant results
            const filtered = data.features?.filter((f: any) => {
                const types = f.place_type || [];
                return types.includes('address') ||
                    types.includes('place') ||
                    types.includes('poi') ||
                    types.includes('neighborhood');
            }) || [];

            setSuggestions(filtered);
        } catch (error) {
            console.error("Error:", error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (activeService === "distance") {
            fetchSuggestions(debouncedFrom, setFromSuggestions, setFromLoading);
        }
    }, [debouncedFrom, activeService, fetchSuggestions]);

    useEffect(() => {
        if (activeService === "distance") {
            fetchSuggestions(debouncedTo, setToSuggestions, setToLoading);
        }
    }, [debouncedTo, activeService, fetchSuggestions]);

    useEffect(() => {
        if (activeService === "airport") {
            fetchSuggestions(debouncedAirport, setAirportSuggestions, setAirportLoading);
        }
    }, [debouncedAirport, activeService, fetchSuggestions]);

    useEffect(() => {
        if (activeService === "hourly") {
            fetchSuggestions(debouncedHourly, setHourlySuggestions, setHourlyLoading);
        }
    }, [debouncedHourly, activeService, fetchSuggestions]);

    useEffect(() => {
        if (activeService === "special") {
            fetchSuggestions(debouncedSpecial, setSpecialSuggestions, setSpecialLoading);
        }
    }, [debouncedSpecial, activeService, fetchSuggestions]);

    useEffect(() => {
        if (activeService === "special") {
            fetchSuggestions(debouncedSpecialTo, setSpecialToSuggestions, setSpecialToLoading);
        }
    }, [debouncedSpecialTo, activeService, fetchSuggestions]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
                setShowFromSuggestions(false);
            }
            if (toRef.current && !toRef.current.contains(event.target as Node)) {
                setShowToSuggestions(false);
            }
            if (airportRef.current && !airportRef.current.contains(event.target as Node)) {
                setShowAirportSuggestions(false);
            }
            if (hourlyRef.current && !hourlyRef.current.contains(event.target as Node)) {
                setShowHourlySuggestions(false);
            }
            if (specialRef.current && !specialRef.current.contains(event.target as Node)) {
                setShowSpecialSuggestions(false);
                setShowSpecialToSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const scrollToBooking = () => {
        const bookingWidget = document.getElementById('booking-widget');
        bookingWidget?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const validateForm = () => {
        setError(null);

        const now = new Date();
        const selectedDateTime = new Date(`${pickupDate}T${pickupTime}`);

        if (!pickupDate || !pickupTime) {
            setError("Please select both date and time.");
            return false;
        }

        if (selectedDateTime < now) {
            setError("Pickup time cannot be in the past.");
            return false;
        }

        switch (activeService) {
            case "airport":
                if (!airportAddress) {
                    setError("Please enter your address.");
                    return false;
                }
                break;
            case "distance":
                if (!fromLocation || !toLocation) {
                    setError("Please enter both pickup and destination addresses.");
                    return false;
                }
                break;
            case "hourly":
                if (!hourlyAddress) {
                    setError("Please enter your pickup address.");
                    return false;
                }
                break;
            case "special":
                if (!specialAddress) {
                    setError("Please enter the starting point.");
                    return false;
                }
                if (!specialToLocation) {
                    setError("Please enter the destination.");
                    return false;
                }
                break;
        }
        return true;
    };

    const handleBooking = () => {
        if (!validateForm()) return;
        openCarSelection();
    };



    const generateBookingId = () => {
        const random = Math.floor(1000 + Math.random() * 9000);
        const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
        return `MEL-${date}-${random}`;
    };

    const getBookingDetails = () => {
        switch (activeService) {
            case "airport":
                return {
                    service: "Airport Transfer",
                    type: flightType === "arrival" ? "Airport Pickup" : "Airport Drop-off",
                    airport: selectedAirport.name,
                    address: airportAddress,
                    date: `${pickupDate} ${pickupTime}`
                };
            case "distance":
                return {
                    service: "Distance Ride",
                    type: tripType === "one-way" ? "One Way" : "Round Trip",
                    from: fromLocation,
                    to: toLocation,
                    date: `${pickupDate} ${pickupTime}`
                };
            case "hourly":
                return {
                    service: "Hourly Charter",
                    duration: selectedPackage.label,
                    address: hourlyAddress,
                    date: `${pickupDate} ${pickupTime}`
                };
            case "special":
                return {
                    service: "Special Occasion",
                    occasion: selectedOccasion.name,
                    guests: guestCount,
                    address: specialAddress,
                    to: specialToLocation,
                    date: `${pickupDate} ${pickupTime}`
                };
        }
    };

    const getFormattedBookingDetails = useCallback(() => {
        const details = getBookingDetails();
        const carDetails = getSelectedCarDetails();
        const price = calculateCarPrice(estimatedPrice || 0);

        return {
            id: bookingId || generateBookingId(),
            customer: { name, phone, email },
            service: details,
            vehicle: carDetails?.name || "Premium Vehicle",
            fare: price,
            schedule: { date: pickupDate, time: pickupTime }
        };
    }, [activeService, name, phone, email, estimatedPrice, pickupDate, pickupTime, getBookingDetails, getSelectedCarDetails, calculateCarPrice, bookingId]);

    const buildWhatsAppMessage = useCallback((data: any) => {
        const { id, customer, service, vehicle, fare, schedule } = data;
        return `
🌟 *Luxury Booking Request*
---------------------------------------
*Booking ID:* ${id}

*Customer Details:*
• Name: ${customer.name}
• Phone: ${customer.phone}
${customer.email ? `• Email: ${customer.email}` : ""}

*Journey Information:*
• Service: ${service.service}
${service.type ? `• Type: ${service.type}` : ""}
${service.airport ? `• Airport: ${service.airport}` : ""}
${service.from ? `• Pickup: ${service.from}` : ""}
${service.to ? `• Drop-off: ${service.to}` : ""}
${service.address ? `• Address: ${service.address}` : ""}
${service.duration ? `• Duration: ${service.duration}` : ""}
${service.occasion ? `• Occasion: ${service.occasion}` : ""}
${service.guests ? `• Guests: ${service.guests}` : ""}
${service.to ? `• Destination: ${service.to}` : ""}

*Vehicle & Fare:*
• Vehicle: ${vehicle}
• Estimated Fare: A$ ${fare}

*Schedule:*
• Date: ${schedule.date}
• Time: ${schedule.time}
---------------------------------------
_Thank you for choosing ${process.env.NEXT_PUBLIC_APP_NAME || "Melbourne Elite Chauffeur"}_
`;
    }, []);

    const buildSMSMessage = useCallback((data: any) => {
        const { id, customer, service, vehicle, fare, schedule } = data;
        let msg = `Booking ID: ${id}\n`;
        msg += `Customer: ${customer.name}, ${customer.phone}\n`;
        if (customer.email) msg += `Email: ${customer.email}\n`;
        msg += `Service: ${service.service}\n`;
        if (service.type) msg += `Type: ${service.type}\n`;
        if (service.airport) msg += `Airport: ${service.airport}\n`;
        if (service.from) msg += `Pickup: ${service.from}\n`;
        if (service.to) msg += `Drop-off: ${service.to}\n`;
        if (service.address) msg += `Address: ${service.address}\n`;
        if (service.duration) msg += `Duration: ${service.duration}\n`;
        if (service.occasion) msg += `Occasion: ${service.occasion}\n`;
        if (service.guests) msg += `Guests: ${service.guests}\n`;
        msg += `Vehicle: ${vehicle}\n`;
        msg += `Fare: A$ ${fare}\n`;
        msg += `Schedule: ${schedule.date} ${schedule.time}\n`;
        msg += `Thank you for choosing ${process.env.NEXT_PUBLIC_APP_NAME || ""}`;
        return msg;
    }, []);

    const confirmBooking = async () => {
        if (!name || !phone) {
            setError("Name and phone are required.");
            return;
        }

        try {
            setSubmitting(true);
            const data = getFormattedBookingDetails();

            // Save to localStorage
            const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
            existing.push({
                ...data,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem("bookings", JSON.stringify(existing));

            setBookingId(data.id);
            setBookingSuccess(true);

            const whatsappNumber = (process.env.NEXT_PUBLIC_APP_WHATSAPP || "").replace(/[^0-9+]/g, "");

            if (contactMethod === "whatsapp") {
                const message = buildWhatsAppMessage(data);
                window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
            } else {
                const message = buildSMSMessage(data);
                window.open(`sms:${whatsappNumber}?body=${encodeURIComponent(message)}`, "_blank");
            }

            // Reset form fields
            const resetFields = () => {
                setName(""); setPhone(""); setEmail("");
                setAirportAddress(""); setFromLocation(""); setToLocation("");
                setHourlyAddress(""); setSpecialAddress(""); setSpecialToLocation(""); setOccasionDetails("");
            };
            resetFields();
        } catch (err) {
            console.error("Booking error:", err);
            setError("Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    const serviceTabs = [
        { id: "airport" as ServiceType, label: "Airport Transfer", icon: Plane },
        { id: "distance" as ServiceType, label: "Distance", icon: Route },
        { id: "hourly" as ServiceType, label: "Hourly", icon: Hourglass },
        { id: "special" as ServiceType, label: "Special Occasion", icon: Sparkles },
    ];

    const renderAirportForm = () => (
        <div className="space-y-4">
            {/* Flight Type Toggle */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                {["arrival", "departure"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFlightType(type as "arrival" | "departure")}
                        className={cn(
                            "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all",
                            flightType === type
                                ? "bg-primary text-white shadow-lg"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {type === "arrival" ? "Arrival (Pickup)" : "Departure (Drop-off)"}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Airport Selection */}
                <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        Select Airport
                    </Label>
                    <Select
                        value={selectedAirport.code}
                        onValueChange={(value) => {
                            const airport = AIRPORTS.find(a => a.code === value);
                            if (airport) setSelectedAirport(airport);
                        }}
                    >
                        <SelectTrigger className="w-full bg-white/5 border-white/10 focus:border-primary/50 h-11">
                            <Plane className="w-4 h-4 text-primary mr-2 shrink-0" />
                            <SelectValue placeholder="Choose airport" />
                        </SelectTrigger>
                        <SelectContent className="bg-background/95 backdrop-blur-md border-white/10">
                            {AIRPORTS.map((airport) => (
                                <SelectItem
                                    key={airport.code}
                                    value={airport.code}
                                    className="focus:bg-primary/10 focus:text-primary cursor-pointer"
                                >
                                    {airport.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Address Input with Suggestions */}
                <div ref={airportRef} className="relative space-y-1.5">
                    <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        {flightType === "arrival" ? "Drop-off Address" : "Pickup Address"}
                    </Label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none z-10" />
                        <Input
                            value={airportAddress}
                            onChange={(e) => {
                                setAirportAddress(e.target.value);
                                setShowAirportSuggestions(true);
                            }}
                            onFocus={() => setShowAirportSuggestions(true)}
                            placeholder="Enter address..."
                            className="pl-10 bg-white/5 border-white/10 focus:border-primary/50 h-11 relative z-20"
                        />
                        {airportLoading && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground z-10" />
                        )}
                    </div>

                    {/* Suggestions Dropdown - Fixed positioning */}
                    <AnimatePresence>
                        {showAirportSuggestions && (airportSuggestions.length > 0 || airportAddress.length > 0) && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute left-0 right-0 top-[calc(100%+4px)] bg-background/95 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-2xl z-[100]"
                            >
                                <div className="max-h-60 overflow-y-auto py-2">
                                    {airportSuggestions.length === 0 && airportAddress.length > 0 && !airportLoading ? (
                                        <div className="px-4 py-3 text-sm text-muted-foreground">
                                            No addresses found.
                                        </div>
                                    ) : (
                                        // In renderAirportForm, update the suggestions map:
                                        airportSuggestions.map((suggestion: any) => {
                                            // Extract parts of address
                                            const mainText = suggestion.text || ''; // Street number + name
                                            const placeName = suggestion.place_name || ''; // Full address
                                            const suburb = suggestion.context?.find((c: any) => c.id.includes('place'))?.text || '';
                                            const postcode = suggestion.context?.find((c: any) => c.id.includes('postcode'))?.text || '';

                                            return (
                                                <button
                                                    key={suggestion.id || suggestion.place_name}
                                                    onClick={() => {
                                                        setAirportAddress(placeName)
                                                        setAirportCoords(suggestion.center)
                                                        setShowAirportSuggestions(false)
                                                    }}
                                                    className="w-full px-4 py-3 text-sm hover:bg-primary/10 hover:text-primary transition-colors text-left border-b border-white/5 last:border-0"
                                                >
                                                    <div className="font-medium">{mainText}</div>
                                                    <div className="text-xs text-muted-foreground mt-0.5">
                                                        {suburb}{postcode ? `, ${postcode}` : ''}
                                                    </div>
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );

    const renderDistanceForm = () => (
        <div className="space-y-4">
            {/* Trip Type Toggle */}
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                {[
                    { id: "one-way", label: "One Way", icon: ArrowRightLeft },
                    { id: "round-trip", label: "Round Trip", icon: Route }
                ].map((type) => (
                    <button
                        key={type.id}
                        onClick={() => setTripType(type.id as "one-way" | "round-trip")}
                        className={cn(
                            "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2",
                            tripType === type.id
                                ? "bg-primary text-white shadow-lg"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <type.icon className="w-4 h-4" />
                        {type.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* From Location */}
                <div ref={fromRef} className="relative">
                    <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5 block">
                        From
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <Input
                            value={fromLocation}
                            onChange={(e) => {
                                setFromLocation(e.target.value);
                                setShowFromSuggestions(true);
                            }}
                            onFocus={() => setShowFromSuggestions(true)}
                            placeholder="Enter pickup address..."
                            className="pl-10 bg-white/5 border-white/10 focus:border-primary/50"
                        />
                        {fromLoading && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                        )}
                    </div>

                    <AnimatePresence>
                        {showFromSuggestions && (fromSuggestions.length > 0 || fromLocation.length > 0) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-2xl z-50"
                            >
                                <div className="max-h-48 overflow-y-auto py-2">
                                    {fromSuggestions.length === 0 && fromLocation.length > 0 && !fromLoading ? (
                                        <div className="px-4 py-3 text-sm text-muted-foreground">No addresses found.</div>
                                    ) : (
                                        fromSuggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setFromLocation(suggestion.place_name)
                                                    setFromCoords(suggestion.center);
                                                    setShowFromSuggestions(false);
                                                }}
                                                className="w-full px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors flex items-start justify-between group text-left"
                                            >
                                                <span className="pr-4 line-clamp-2">{suggestion.place_name}</span>
                                                <Check className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                                            </button>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* To Location */}
                <div ref={toRef} className="relative">
                    <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5 block">
                        To
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <Input
                            value={toLocation}
                            onChange={(e) => {
                                setToLocation(e.target.value);
                                setShowToSuggestions(true);
                            }}
                            onFocus={() => setShowToSuggestions(true)}
                            placeholder="Enter destination..."
                            className="pl-10 bg-white/5 border-white/10 focus:border-primary/50"
                        />
                        {toLoading && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                        )}
                    </div>

                    <AnimatePresence>
                        {showToSuggestions && (toSuggestions.length > 0 || toLocation.length > 0) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-2xl z-50"
                            >
                                <div className="max-h-48 overflow-y-auto py-2">
                                    {toSuggestions.length === 0 && toLocation.length > 0 && !toLoading ? (
                                        <div className="px-4 py-3 text-sm text-muted-foreground">No addresses found.</div>
                                    ) : (
                                        toSuggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setToLocation(suggestion.place_name)
                                                    setToCoords(suggestion.center)
                                                    setShowToSuggestions(false);
                                                }}
                                                className="w-full px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors flex items-start justify-between group text-left"
                                            >
                                                <span className="pr-4 line-clamp-2">{suggestion.place_name}</span>
                                                <Check className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                                            </button>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );

    const renderHourlyForm = () => (
        <div className="space-y-4">
            {/* Package Selection */}
            <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3 block">
                    Select Duration
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {HOURLY_PACKAGES.map((pkg) => (
                        <button
                            key={pkg.hours}
                            onClick={() => setSelectedPackage(pkg)}
                            className={cn(
                                "p-3 rounded-xl border text-left transition-all",
                                selectedPackage.hours === pkg.hours
                                    ? "bg-primary border-primary text-white shadow-lg"
                                    : "bg-white/5 border-white/10 hover:border-primary/30 text-foreground"
                            )}
                        >
                            <div className="text-sm font-bold">{pkg.label}</div>

                        </button>
                    ))}
                </div>
            </div>

            {/* Pickup Address */}
            <div ref={hourlyRef} className="relative">
                <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5 block">
                    Pickup Address
                </label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                    <Input
                        value={hourlyAddress}
                        onChange={(e) => {
                            setHourlyAddress(e.target.value);
                            setShowHourlySuggestions(true);
                        }}
                        onFocus={() => setShowHourlySuggestions(true)}
                        placeholder="Enter your pickup location..."
                        className="pl-10 bg-white/5 border-white/10 focus:border-primary/50"
                    />
                    {hourlyLoading && (
                        <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                    )}
                </div>

                <AnimatePresence>
                    {showHourlySuggestions && (hourlySuggestions.length > 0 || hourlyAddress.length > 0) && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-2xl z-50"
                        >
                            <div className="max-h-48 overflow-y-auto py-2">
                                {hourlySuggestions.length === 0 && hourlyAddress.length > 0 && !hourlyLoading ? (
                                    <div className="px-4 py-3 text-sm text-muted-foreground">No addresses found.</div>
                                ) : (
                                    hourlySuggestions.map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setHourlyAddress(suggestion.place_name);

                                                setHourlyCoords(suggestion.center)
                                                setShowHourlySuggestions(false);
                                            }}
                                            className="w-full px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors flex items-start justify-between group text-left"
                                        >
                                            <span className="pr-4 line-clamp-2">{suggestion.place_name}</span>
                                            <Check className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                                        </button>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );

    const renderSpecialForm = () => (
        <div className="space-y-4">
            {/* Occasion Type */}
            <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3 block">
                    Select Occasion
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    {SPECIAL_OCCASIONS.map((occasion) => (
                        <button
                            key={occasion.id}
                            onClick={() => setSelectedOccasion(occasion)}
                            className={cn(
                                "p-3 rounded-xl border text-left transition-all flex flex-col gap-2",
                                selectedOccasion.id === occasion.id
                                    ? "bg-primary border-primary text-white shadow-lg"
                                    : "bg-white/5 border-white/10 hover:border-primary/30 text-foreground"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-lg w-fit",
                                selectedOccasion.id === occasion.id ? "bg-white/20" : "bg-primary/10"
                            )}>
                                {React.cloneElement(occasion.icon as React.ReactElement, {
                                    // @ts-ignore
                                    className: cn(
                                        "w-4 h-4",
                                        selectedOccasion.id === occasion.id ? "text-white" : "text-primary"
                                    )
                                })}
                            </div>
                            <div>
                                <div className="text-sm font-bold">{occasion.name}</div>
                                <div className={cn(
                                    "text-xs mt-0.5 line-clamp-1",
                                    selectedOccasion.id === occasion.id ? "text-white/70" : "text-muted-foreground"
                                )}>
                                    {occasion.description}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Guest Count */}
                <div>
                    <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5 block">
                        Number of Guests
                    </label>
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                        <Users className="w-4 h-4 text-primary" />
                        <div className="flex items-center gap-3 flex-1">
                            <button
                                onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                            >
                                -
                            </button>
                            <span className="flex-1 text-center font-medium">{guestCount}</span>
                            <button
                                onClick={() => setGuestCount(Math.min(12, guestCount + 1))}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                {/* Starting Point */}
                <div ref={specialRef} className="relative">
                    <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5 block">
                        Starting Point
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <Input
                            value={specialAddress}
                            onChange={(e) => {
                                setSpecialAddress(e.target.value);
                                setShowSpecialSuggestions(true);
                            }}
                            onFocus={() => setShowSpecialSuggestions(true)}
                            placeholder="Enter pickup location..."
                            className="pl-10 bg-white/5 border-white/10 focus:border-primary/50"
                        />
                        {specialLoading && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                        )}
                    </div>

                    <AnimatePresence>
                        {showSpecialSuggestions && (specialSuggestions.length > 0 || specialAddress.length > 0) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-2xl z-50"
                            >
                                <div className="max-h-48 overflow-y-auto py-2">
                                    {specialSuggestions.length === 0 && specialAddress.length > 0 && !specialLoading ? (
                                        <div className="px-4 py-3 text-sm text-muted-foreground">No addresses found.</div>
                                    ) : (
                                        specialSuggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setSpecialAddress(suggestion.place_name);
                                                    setSpecialCoords(suggestion.center);
                                                    setShowSpecialSuggestions(false);
                                                }}
                                                className="w-full px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors flex items-start justify-between group text-left"
                                            >
                                                <span className="pr-4 line-clamp-2">{suggestion.place_name}</span>
                                                <Check className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                                            </button>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Destination */}
                <div className="relative">
                    <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5 block">
                        Destination
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        <Input
                            value={specialToLocation}
                            onChange={(e) => {
                                setSpecialToLocation(e.target.value);
                                setShowSpecialToSuggestions(true);
                            }}
                            onFocus={() => setShowSpecialToSuggestions(true)}
                            placeholder="Enter destination address..."
                            className="pl-10 bg-white/5 border-white/10 focus:border-primary/50"
                        />
                        {specialToLoading && (
                            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
                        )}
                    </div>

                    <AnimatePresence>
                        {showSpecialToSuggestions && (specialToSuggestions.length > 0 || specialToLocation.length > 0) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-xl overflow-hidden shadow-2xl z-50"
                            >
                                <div className="max-h-48 overflow-y-auto py-2">
                                    {specialToSuggestions.length === 0 && specialToLocation.length > 0 && !specialToLoading ? (
                                        <div className="px-4 py-3 text-sm text-muted-foreground">No addresses found.</div>
                                    ) : (
                                        specialToSuggestions.map((suggestion, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setSpecialToLocation(suggestion.place_name);
                                                    setSpecialToCoords(suggestion.center);
                                                    setShowSpecialToSuggestions(false);
                                                }}
                                                className="w-full px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors flex items-start justify-between group text-left"
                                            >
                                                <span className="pr-4 line-clamp-2">{suggestion.place_name}</span>
                                                <Check className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
                                            </button>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Additional Details */}
            <div>
                <label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1.5 block">
                    Special Requests (Optional)
                </label>
                <Input
                    value={occasionDetails}
                    onChange={(e) => setOccasionDetails(e.target.value)}
                    placeholder="Any specific requirements..."
                    className="bg-white/5 border-white/10 focus:border-primary/50"
                />
            </div >
        </div >
    );

const renderDateTimeFields = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                Pickup Date
            </Label>
            <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none z-10" />
                <Input
                    type="date"
                    value={pickupDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 focus:border-primary/50 text-foreground [color-scheme:dark] h-11"
                />
            </div>
        </div>
        <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                Pickup Time
            </Label>
            <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none z-10" />
                <Input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 focus:border-primary/50 text-foreground [color-scheme:dark] h-11"
                />
            </div>
        </div>
    </div>
);
return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/IMG_2858.WEBP"
                alt="Luxury Car Background"
                className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background z-0"></div>
        </div>

        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto space-y-6"
            >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold tracking-tight text-foreground drop-shadow-sm">
                    Your <span className="text-primary italic">Personal</span> Luxury <br className="hidden md:block" />
                    Chauffeur Awaits
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto drop-shadow-sm">
                    Experience privacy, elegance, and tailored travel with our exclusive premium ride service in Melbourne.
                </p>

                <div className="flex justify-center pt-4">
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="cursor-pointer"
                        onClick={scrollToBooking}
                    >
                        <ChevronDown className="w-8 h-8 text-primary/60 hover:text-primary transition-colors" />
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                id="booking-widget"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full max-w-7xl mt-16 lg:mt-24 relative"
            >
                {/* Service Type Tabs */}
                <div className="flex justify-center mb-8 w-full">
                    <div className="grid grid-cols-2 md:flex bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-xl gap-2 w-full md:w-auto">
                        {serviceTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveService(tab.id)}
                                className={cn(
                                    "relative px-4 py-3 md:px-6 md:py-3.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap",
                                    activeService === tab.id
                                        ? "text-white"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {activeService === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary rounded-xl shadow-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <tab.icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">
                    {/* Main Booking Card */}
                    <Card className="glass-card relative z-20 p-6 md:p-8 rounded-3xl bg-background/60 backdrop-blur-xl border-white/10 shadow-2xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeService}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {activeService === "airport" && renderAirportForm()}
                                {activeService === "distance" && renderDistanceForm()}
                                {activeService === "hourly" && renderHourlyForm()}
                                {activeService === "special" && renderSpecialForm()}

                                {renderDateTimeFields()}
                            </motion.div>
                        </AnimatePresence>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Price and Submit */}
                        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                            <AnimatePresence>
                                {estimatedPrice && (
                                    <div className="flex flex-col md:flex-row items-center gap-4">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="text-left">
                                                <div className="text-xs text-muted-foreground uppercase tracking-wider">Estimated Base Fare</div>
                                                <div className="text-3xl font-bold text-primary">A$ {estimatedPrice}</div>
                                                {estimatedDistance && (
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                        ~{estimatedDistance} km
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowMapModal(true)}
                                            className="rounded-full border-primary/20 hover:border-primary/50 text-xs flex items-center gap-2"
                                        >
                                            <Expand className="w-3 h-3" />
                                            View on Map
                                        </Button>
                                    </div>
                                )}
                            </AnimatePresence>

                            <div className={cn("w-full md:w-auto", !estimatedPrice && "md:ml-auto")}>
                                <Button
                                    onClick={handleBooking}
                                    className="w-full md:w-auto rounded-full px-10 py-6 text-base font-semibold shadow-gold relative overflow-hidden group bg-primary hover:bg-primary/90"
                                >
                                    <span className="relative z-10 text-white flex items-center gap-2">
                                        {!selectedCar ? "Select a Car" : "Request Ride"}
                                        <ArrowRightLeft className="w-4 h-4" />
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Map Modal */}
                    <Dialog open={showMapModal} onOpenChange={setShowMapModal}>
                        <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-white/10">
                            <DialogHeader className="p-6 border-b border-white/10 flex-shrink-0">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <DialogTitle className="text-2xl font-playfair font-bold">Route Preview</DialogTitle>
                                        <DialogDescription className="text-muted-foreground mt-1 flex items-center gap-2">
                                            <Route className="w-4 h-4 text-primary" />
                                            {estimatedDistance ? `Total Distance: ${estimatedDistance} km` : 'Calculating route...'}
                                        </DialogDescription>
                                    </div>
                                </div>
                            </DialogHeader>
                            <div className="flex-grow relative">
                                <MapPreview
                                    fromCoords={
                                        activeService === "airport" ? (flightType === "arrival" ? selectedAirport.coords : airportCoords) :
                                            activeService === "distance" ? fromCoords :
                                                activeService === "hourly" ? hourlyCoords :
                                                    activeService === "special" ? specialCoords : null
                                    }
                                    toCoords={
                                        activeService === "airport" ? (flightType === "arrival" ? airportCoords : selectedAirport.coords) :
                                            activeService === "distance" ? toCoords : null
                                    }
                                    className="w-full h-full"
                                    lineColor="#3b82f6" // Custom blue line as requested
                                />

                                {/* Legend / Info Overlay on Map */}
                                <div className="absolute bottom-6 left-6 z-20 space-y-2 pointer-events-none">
                                    <div className="bg-background/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg text-xs flex items-center gap-3">
                                        <div className="flex items-center gap-2 font-medium">
                                            <div className="w-3 h-3 rounded-full bg-[#B8A082]" />
                                            Pickup
                                        </div>
                                        <div className="flex items-center gap-2 font-medium">
                                            <div className="w-3 h-3 rounded-full bg-white border border-gray-400" />
                                            Drop-off
                                        </div>
                                        <div className="flex items-center gap-2 font-medium">
                                            <div className="w-6 h-1 rounded-full bg-[#3b82f6]" />
                                            Route
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>



                </div>
            </motion.div>
        </div>

        {/* Booking Modal */}
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-card border border-border/50 rounded-2xl p-8 w-full max-w-md shadow-2xl relative max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-white/10 rounded-full"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {!bookingSuccess ? (
                            <div className="space-y-6">
                                <div className="text-center space-y-2">
                                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        {activeService === "airport" && <Plane className="w-6 h-6 text-primary" />}
                                        {activeService === "distance" && <Route className="w-6 h-6 text-primary" />}
                                        {activeService === "hourly" && <Hourglass className="w-6 h-6 text-primary" />}
                                        {activeService === "special" && <Sparkles className="w-6 h-6 text-primary" />}
                                    </div>
                                    <h3 className="text-2xl font-playfair font-bold">Complete Your Booking</h3>
                                    <p className="text-sm text-muted-foreground">Confirm your details to receive contact information.</p>
                                </div>

                                {/* Booking Summary */}
                                {/* Booking Summary */}
                                <div className="bg-white/5 rounded-xl p-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Service</span>
                                        <span className="font-medium capitalize">{activeService} Transfer</span>
                                    </div>
                                    {selectedCar && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Vehicle</span>
                                            <span className="font-medium">{getSelectedCarDetails()?.name}</span>
                                        </div>
                                    )}
                                    {estimatedPrice && (
                                        <div className="flex justify-between pt-2 border-t border-white/10">
                                            <span className="text-muted-foreground">Estimated Total</span>
                                            <span className="text-xl font-bold text-primary">
                                                A$ {calculateCarPrice(estimatedPrice)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name *</label>
                                        <Input
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number *</label>
                                        <Input
                                            placeholder="+61 400 000 000"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email (Optional)</label>
                                        <Input
                                            placeholder="john@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-background/50"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact Method</Label>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => setContactMethod("whatsapp")}
                                                className={cn(
                                                    "flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all",
                                                    contactMethod === "whatsapp"
                                                        ? "bg-green-500/10 border-green-500/50 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                                                        : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                                                )}
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                <span className="font-medium text-sm">WhatsApp</span>
                                            </button>
                                            <button
                                                onClick={() => setContactMethod("sms")}
                                                className={cn(
                                                    "flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-2 transition-all",
                                                    contactMethod === "sms"
                                                        ? "bg-blue-500/10 border-blue-500/50 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                                                        : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                                                )}
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                                <span className="font-medium text-sm">SMS</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-red-500 text-xs text-center font-medium bg-red-500/10 py-2 rounded-md">
                                        {error}
                                    </p>
                                )}

                                <Button
                                    onClick={confirmBooking}
                                    disabled={submitting}
                                    className={cn(
                                        "w-full py-7 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3",
                                        contactMethod === "whatsapp" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                                    )}
                                >
                                    {submitting ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            {contactMethod === "whatsapp" ? <MessageCircle className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                                            Confirm & Send {contactMethod === "whatsapp" ? "WhatsApp" : "SMS"}
                                        </>
                                    )}
                                </Button>
                            </div>
                        ) : (
                            <div className="text-center space-y-6 py-4">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                                    <Check className="w-8 h-8 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold">Booking Request Sent!</h3>
                                    <p className="text-muted-foreground">
                                        Booking ID: <span className="font-mono text-foreground font-bold">{bookingId}</span>
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Great! Your WhatsApp message has been sent successfully. Please allow us a short moment to review your request — we will get back to you on WhatsApp shortly.
                                </p>
                                <Button
                                    onClick={() => {
                                        setShowModal(false);
                                        setBookingSuccess(false);
                                    }}
                                    className="w-full py-4 rounded-xl"
                                >
                                    Close
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Car Selection Modal */}
        {/* Car Selection Modal */}
        <CarSelectionModal
            basePrice={estimatedPrice || 0}
            fromLocation={
                activeService === "distance"
                    ? fromLocation
                    : activeService === "airport"
                        ? airportAddress
                        : activeService === "hourly"
                            ? hourlyAddress
                            : specialAddress
            }
            toLocation={
                activeService === "distance"
                    ? toLocation
                    : selectedAirport?.name || "Destination"
            }
        />
    </section>
);
}
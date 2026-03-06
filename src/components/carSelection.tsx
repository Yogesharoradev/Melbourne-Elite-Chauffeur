"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Users, Briefcase, Info, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarOption {
    id: string;
    name: string;
    image: string;
    passengers: number;
    luggage: number;
    description: string;
    features: string[];
    priceMultiplier: number;
    hourlyRate: number;
}

interface CarSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (carId: string) => void;
    basePrice: number;
    fromLocation?: string;
    toLocation?: string;
    selectedCarId?: string | null;
}

const CARS: CarOption[] = [
    {
        id: "economy",
        name: "Economy",
        image: "/Cars/IMG_3543.jpg",
        passengers: 3,
        luggage: 2,
        description: "Any available Sedan, SUV and People Mover.",
        features: ["Includes Meet & Greet", "Complimentary bottled water"],
        priceMultiplier: 1,
        hourlyRate: 85
    },
    {
        id: "business",
        name: "Business Class",
        image: "/Cars/IMG_3544.jpg",
        passengers: 3,
        luggage: 2,
        description: "Any available Euro Sedan or SUV.",
        features: ["Includes Meet & Greet", "Complimentary bottled water"],
        priceMultiplier: 1.12,
        hourlyRate: 95
    },
    {
        id: "first",
        name: "First Class",
        image: "/Cars/IMG_3545.jpg",
        passengers: 3,
        luggage: 2,
        description: "Mercedes S Class, BMW 7 Series, Audi A8 or similar.",
        features: ["Includes Meet & Greet", "Complimentary bottled water"],
        priceMultiplier: 1.59,
        hourlyRate: 135
    },
    {
        id: "platinum",
        name: "Platinum Class",
        image: "/Cars/IMG_3546.jpg",
        passengers: 3,
        luggage: 2,
        description: "New Mercedes S Class or similar.",
        features: ["Includes Meet & Greet", "Complimentary bottled water"],
        priceMultiplier: 2.35,
        hourlyRate: 200
    },
    {
        id: "suv",
        name: "SUV",
        image: "/Cars/IMG_3547.jpg",
        passengers: 4,
        luggage: 3,
        description: "Mercedes GLE, Audi Q7 or similar.",
        features: ["Includes Meet & Greet", "Complimentary bottled water"],
        priceMultiplier: 1.06,
        hourlyRate: 90
    },
    {
        id: "people-mover",
        name: "People Mover",
        image: "/Cars/IMG_3548.jpg",
        passengers: 7,
        luggage: 4,
        description: "Mercedes Valente, Mercedes V Class or similar.",
        features: ["Includes Meet & Greet", "Complimentary bottled water"],
        priceMultiplier: 1.88,
        hourlyRate: 160
    }
];
export function CarSelectionModal({
    isOpen,
    onClose,
    onSelect,
    basePrice,
    fromLocation = "Australia",
    toLocation = "Destination",
    selectedCarId
}: CarSelectionModalProps) {
    const [localSelectedCar, setLocalSelectedCar] = useState<string | null>(selectedCarId || null);

    const calculatePrice = (multiplier: number) => {
        return Math.round(basePrice * multiplier);
    };

    const handleContinue = () => {
        if (localSelectedCar) {
            onSelect(localSelectedCar);
        }
    };

    const selectedCarDetails = CARS.find(car => car.id === localSelectedCar);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-card border border-border/50 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-background/50">
                            <div>
                                <h2 className="text-2xl font-playfair font-bold">Select Your Vehicle</h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Choose the perfect ride for your journey
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-muted-foreground" />
                            </button>
                        </div>

                        {/* Car List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {CARS.map((car, index) => {
                                const isSelected = localSelectedCar === car.id;
                                const price = calculatePrice(car.priceMultiplier);

                                return (
                                    <motion.div
                                        key={car.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setLocalSelectedCar(car.id)}
                                        className={cn(
                                            "group relative flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300",
                                            isSelected
                                                ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                                                : "border-white/10 bg-white/[0.02] hover:border-primary/30 hover:bg-white/[0.04]"
                                        )}
                                    >
                                        {/* Selected Indicator */}
                                        {isSelected && (
                                            <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                        )}

                                        {/* Car Image */}
                                        <div className="relative w-full md:w-48 h-32 md:h-28 flex-shrink-0 bg-white rounded-xl overflow-hidden shadow-inner border border-white/20 flex items-center justify-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className="w-full h-full object-contain mix-blend-multiply p-2 group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Car Details */}
                                        <div className="flex-1 space-y-3">
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                                                <div>
                                                    <h3 className="text-xl font-bold">{car.name}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                                        {car.description}
                                                    </p>
                                                </div>
                                                <div className="text-left md:text-right">
                                                    <div className="text-2xl font-bold text-primary">
                                                        A$ {price}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                        {fromLocation} → {toLocation}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Specs */}
                                            <div className="flex flex-wrap gap-4 text-sm">
                                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Users className="w-4 h-4" />
                                                    <span>Max. {car.passengers}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                                    <Briefcase className="w-4 h-4" />
                                                    <span>Max. {car.luggage}</span>
                                                </div>
                                            </div>

                                            {/* Features */}
                                            <div className="flex flex-wrap gap-3">
                                                {car.features.map((feature, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full"
                                                    >
                                                        <Info className="w-3 h-3" />
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Select Button - Desktop */}
                                        <div className="hidden md:flex items-center">
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLocalSelectedCar(car.id);
                                                }}
                                                variant={isSelected ? "default" : "outline"}
                                                className={cn(
                                                    "rounded-full px-6 py-5 font-semibold transition-all",
                                                    isSelected
                                                        ? "bg-primary text-white hover:bg-primary/90"
                                                        : "border-[#B8A082] text-[#B8A082] hover:bg-[#B8A082] hover:text-white"
                                                )}
                                            >
                                                {isSelected ? "SELECTED" : "SELECT"}
                                            </Button>
                                        </div>

                                        {/* Mobile Select Indicator */}
                                        <div className="md:hidden flex justify-end">
                                            <div className={cn(
                                                "px-4 py-2 rounded-full text-sm font-semibold",
                                                isSelected
                                                    ? "bg-primary text-white"
                                                    : "bg-[#B8A082] text-white"
                                            )}>
                                                {isSelected ? "SELECTED" : "SELECT"}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Footer with Continue Button */}
                        <div className="p-6 border-t border-white/10 bg-background/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-sm text-muted-foreground">
                                {selectedCarDetails ? (
                                    <span className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-primary" />
                                        {selectedCarDetails.name} selected
                                    </span>
                                ) : (
                                    "Select a vehicle to continue"
                                )}
                            </div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <Button
                                    onClick={onClose}
                                    variant="outline"
                                    className="rounded-full px-6 flex-1 sm:flex-none"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleContinue}
                                    disabled={!localSelectedCar}
                                    className="rounded-full px-6 font-semibold bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                                >
                                    Continue
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook for using car selection
export function useCarSelection() {
    const [selectedCar, setSelectedCar] = useState<string | null>(null);
    const [showCarModal, setShowCarModal] = useState(false);

    const openCarSelection = () => setShowCarModal(true);
    const closeCarSelection = () => setShowCarModal(false);

    const handleCarSelect = (carId: string) => {
        setSelectedCar(carId);
        setShowCarModal(false);
    };

    const getSelectedCarDetails = () => {
        return CARS.find(car => car.id === selectedCar);
    };

    const calculateCarPrice = (basePrice: number) => {
        const car = getSelectedCarDetails();
        return car ? Math.round(basePrice * car.priceMultiplier) : basePrice;
    };

    return {
        selectedCar,
        showCarModal,
        openCarSelection,
        closeCarSelection,
        handleCarSelect,
        getSelectedCarDetails,
        calculateCarPrice,
        CarSelectionModal: (props: Omit<CarSelectionModalProps, 'isOpen' | 'onClose' | 'onSelect'>) => (
            <CarSelectionModal
                {...props}
                isOpen={showCarModal}
                onClose={closeCarSelection}
                onSelect={handleCarSelect}
                selectedCarId={selectedCar}
            />
        )
    };
}

export { CARS };
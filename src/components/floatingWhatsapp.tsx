"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WhatsAppFloatProps {
    phoneNumber: string;
}

const DEFAULT_MESSAGE = "Hi, I need a luxury chauffeur ride. Can you help me with booking?";

export function WhatsAppFloat({
    phoneNumber
}: WhatsAppFloatProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState(DEFAULT_MESSAGE);

    const handleSend = () => {
        const text = message.trim();
        if (!text) return;

        const encodedMessage = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");

        // Reset to default for next time
        setMessage(DEFAULT_MESSAGE);
        setIsOpen(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
                    >
                        {/* Header */}
                        <div className="bg-[#25D366] p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Let's chat on WhatsApp</h3>
                                    <p className="text-white/80 text-xs">Typically replies in minutes</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <ChevronDown className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="bg-[#E5DDD5] p-4 h-48 overflow-y-auto">
                            {/* Received Message */}
                            <div className="flex justify-start mb-4">
                                <div className="bg-white rounded-lg rounded-tl-none px-4 py-2 max-w-[80%] shadow-sm">
                                    <p className="text-gray-800 text-sm">Hi there! 👋 Need a luxury ride? Tell us your pickup location, destination, and preferred time. We'll get you a quote instantly!</p>
                                    <span className="text-[10px] text-gray-400 mt-1 block">
                                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="bg-[#F0F0F0] p-3 flex items-end gap-2">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                rows={2}
                                className="flex-1 text-black bg-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl px-4 py-2 text-sm resize-none max-h-24"
                            />
                            <Button
                                onClick={handleSend}
                                size="icon"
                                className="rounded-full bg-[#25D366] hover:bg-[#128C7E] h-10 w-10 shrink-0 mb-0.5"
                            >
                                <Send className="w-4 h-4 text-white" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="w-14 h-14 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center shadow-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-white" />
                    </motion.button>
                ) : (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-colors"
                    >
                        <MessageCircle className="w-7 h-7 text-white" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
import React from 'react'
import { motion as Motion } from "framer-motion";

function CircleDetailsCardPresentational({ positionClasses, isRTLState, orb }) {
    return (
        <Motion.div
            className={`absolute ${positionClasses} w-64 bg-main/90 backdrop-blur-sm rounded-xl p-4 shadow-lg z-30 border border-white/10`}
            style={{ pointerEvents: 'none' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className={`flex items-center ${isRTLState ? 'flex-row-reverse' : ''}`}>
                <div className={`w-12 h-12 rounded-full overflow-hidden ${isRTLState ? 'ml-3' : 'mr-3'}`}>
                    <img
                        src={orb.imageUrl}
                        alt={`Team member ${orb.name}`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className={isRTLState ? 'text-right' : ''}>
                    <h3 className="text-white font-bold">{orb.name}</h3>
                    <p className="text-sm text-purple-400">{orb.role}</p>
                </div>
            </div>
            <div className="mt-3">
                <div className={`flex items-center text-sm ${isRTLState ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-2 h-2 rounded-full ${isRTLState ? 'ml-2' : 'mr-2'} ${orb.status.includes("Active") ? "bg-green-500" : "bg-gray-500"}`}></div>
                    <span className={`text-gray-300 ${isRTLState ? 'text-right' : ''}`}>{orb.status}</span>
                </div>
            </div>
        </Motion.div>
    )
}

export default CircleDetailsCardPresentational

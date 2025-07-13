import React from 'react'
import { COLORS, SHADOWS,  } from "../../constants";
import { Users, Users2, Calendar, Camera } from "lucide-react";

const Stats = () => {
        const stats = [
        { icon: Users, value: 10000, label: "Active Users", color: COLORS.primary },
        { icon: Users2, value: 2000, label: "Private Circles", color: COLORS.secondary },
        { icon: Calendar, value: 3000, label: "Events Created", color: COLORS.accent },
        { icon: Camera, value: 5000, label: "Memories Shared", color: "#bad" }
    ];


    return (
        <section className=" w-full flex flex-row justify-center items-start gap-8  flex-wrap">
            {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 w-full  lg:w-1/5   rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-translate-y-2 " style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: SHADOWS.glassCard }}>
                    <stat.icon size={40} style={{ color: stat.color }} className="mx-auto" />
                    <p className="text-3xl font-bold mb-2" style={{ color: stat.color }}> {stat.value} </p>
                    <p className="text-sm opacity-80">{stat.label}</p>
                </div>
            ))}
        </section>

    )
}

export default Stats    
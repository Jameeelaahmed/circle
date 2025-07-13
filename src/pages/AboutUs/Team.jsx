import React from 'react'
import { COLORS, FONTS, SHADOWS, RADII } from "../../constants";
import { Heart, Target, Users2, Sparkles, Shield, Globe, Zap, MessageCircle, Camera, Star, Users } from "lucide-react";

export default function Team() {

    const team = [
        { name: "Hajer", image: "/src/assets/images/aboutus/hager.jpg", role: "full stack developer", description: "I am a full stack developer with a passion for building web applications.", cardColor: "#f23442" },
        { name: "Ahmed Refaat", image: "/src/assets/images/aboutus/refaat.jpg", role: "full stack developer", description: "I am a quick learner and I am always looking to improve my skills." , cardColor: "#23f"},
        { name: "Ahmed Yasser", image: "/src/assets/images/aboutus/yasser.jpg", role: "full stack developer", description: "I am a full stack developer with a passion for building web applications. I am a quick learner and I am always looking to improve my skills." , cardColor: "#923"},
        { name: "Ahemd Jamal", image: "/src/assets/images/aboutus/gmal.jpg", role: "UX Designer", description: "I am a UX designer with a passion for creating intuitive user experiences. I am a quick learner and I am always looking to improve my skills.", cardColor: "#635" },
        { name: "Jameela", image: "/src/assets/images/aboutus/jameela.jpg", role: "full stack developer", description: "Security expert ensuring your private circles and personal data remain protected.", cardColor: "#257" },
        { name: "Ahmed Adel", image: "/src/assets/images/aboutus/adel.jpg", role: "full stack developer", description: "Growth strategist helping Circle reach more people and create more meaningful connections.", cardColor: "#046242" }
    ]

    return (
        <section className="py-20 px-4 relative" >

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6" style={{ color: COLORS.primary, fontFamily: FONTS.heading }}>
                        Our Team
                    </h2>
                    <p className="text-xl opacity-80 max-w-3xl mx-auto">
                        Meet the passionate minds behind Circle, dedicated to transforming how people connect and maintain friendships.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                            style={{
                            backgroundColor: member.cardColor,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: SHADOWS.glassCard,
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <div className="relative mb-6">
                            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-offset-4 transition-all duration-300 group-hover:ring-offset-8"
                                style={{
                                    ringColor: COLORS.primary,
                                    ringOffsetColor: COLORS.dark
                                }}
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.primary }}>
                                {member.name}
                            </h3>
                            <p className="text-sm opacity-80 mb-3">{member.role}</p>
                            <p className="text-xs opacity-70 leading-relaxed">
                                {member.description}
                            </p>
                        </div>
                        </div>
                    ))}
                </div>

                  

                {/* Team Values */}
                <div className="mt-20 text-center">
                    <h3 className="text-3xl font-bold mb-12" style={{ color: COLORS.primary }}>
                        Our Team Values
                    </h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: Heart, title: "Empathy", description: "Understanding user needs" },
                            { icon: Sparkles, title: "Innovation", description: "Pushing boundaries" },
                            { icon: Shield, title: "Trust", description: "Building secure connections" },
                            { icon: Users2, title: "Collaboration", description: "Working together" }
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-2xl transition-all duration-300 hover:scale-105"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}
                            >
                                <div className="flex justify-center mb-3">
                                    <value.icon size={24} style={{ color: COLORS.primary }} />
                                </div>
                                <h4 className="text-sm font-semibold mb-1" style={{ color: COLORS.primary }}>
                                    {value.title}
                                </h4>
                                <p className="text-xs opacity-80">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    )
}

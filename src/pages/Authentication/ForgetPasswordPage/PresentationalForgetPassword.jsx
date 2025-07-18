import { motion as Motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router";

export default function PresentationalForgetPassword({
  email,
  setEmail,
  isSubmitted,
  setIsSubmitted,
  isLoading,
  error,
  handleSubmit,
}) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <Motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white opacity-20"
            animate={{
              x: [0, Math.random() * 100, 0],
              y: [0, Math.random() * 100, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <Motion.div
        className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <Motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <Motion.div className="mb-8 text-center" variants={itemVariants}>
                <Motion.div
                  className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                  variants={floatingVariants}
                  animate="animate"
                >
                  <Mail className="h-8 w-8 text-white" />
                </Motion.div>
                <h1 className="mb-2 text-2xl font-bold text-white">
                  Forgot Password?
                </h1>
                <p className="text-gray-300">
                  No worries! Enter your email and we'll send you a reset link
                </p>
              </Motion.div>

              {/* Form */}
              <Motion.form onSubmit={handleSubmit} variants={itemVariants}>
                <Motion.div className="mb-6" variants={itemVariants}>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Email Address
                  </label>
                  <Motion.div className="relative">
                    <Motion.input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-purple-400 focus:outline-none"
                      placeholder="Enter your email"
                      required
                      whileFocus={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                    <Motion.div
                      className="absolute top-3 right-3"
                      animate={{ rotate: email ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Mail className="h-5 w-5 text-gray-400" />
                    </Motion.div>
                  </Motion.div>
                </Motion.div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <Motion.div
                      className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/20 p-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-red-300">{error}</span>
                    </Motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <Motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <Motion.div
                        key="loading"
                        className="flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Motion.div
                          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        Sending...
                      </Motion.div>
                    ) : (
                      <Motion.span
                        key="submit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Send Reset Link
                      </Motion.span>
                    )}
                  </AnimatePresence>
                </Motion.button>
              </Motion.form>

              {/* Back to login link */}
              <Motion.div className="mt-6 text-center" variants={itemVariants}>
                <Link to={"/login"}>
                  <motion.button
                    className="inline-flex cursor-pointer items-center gap-2 text-gray-300 transition-colors duration-300 hover:text-white"
                    whileHover={{ x: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </motion.button>
                </Link>
              </Motion.div>
            </Motion.div>
          ) : (
            <Motion.div
              key="success"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Motion.div
                className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20"
                variants={pulseVariants}
                animate="animate"
              >
                <CheckCircle className="h-10 w-10 text-green-400" />
              </Motion.div>

              <Motion.h2
                className="mb-4 text-2xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Check Your Email
              </Motion.h2>

              <Motion.p
                className="mb-6 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                We've sent a password reset link to
                <br />
                <span className="font-semibold text-purple-300">{email}</span>
              </Motion.p>

              <Motion.button
                className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                onClick={() => setIsSubmitted(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Form
              </Motion.button>
            </Motion.div>
          )}
        </AnimatePresence>
      </Motion.div>
    </div>
  );
}

// Hero.tsx
import { motion } from "framer-motion";
import Button from "../Button/Button";
import type { Variants } from "framer-motion";


const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.25, // từng HÀNG lần lượt, nhưng mỗi hàng tự fade+move cùng lúc
    },
  },
};

// 2 thuộc tính animate đồng thời: opacity + y
const item:Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // easeOut mượt
      // Có thể tách riêng vẫn chạy đồng thời:
      // opacity: { duration: 0.6, ease: [0.22,1,0.36,1] },
      // y: { duration: 0.6, ease: [0.22,1,0.36,1] },
    },
  },
};

export default function AnimationBanner({ showButton = true }: { showButton?: boolean }) {
  return (
    <motion.div
      //   className="text-center"
      variants={container}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* HÀNG 1: Title (bỏ transition-all để tránh xung đột) */}
      <motion.h1
        variants={item}
        className="text-2xl font-primary sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-second font-bold mb-3 sm:mb-4 md:mb-6 drop-shadow-lg leading-tight tracking-[-3%]"
      >
        NỘI THẤT MỘC ĐỨC
      </motion.h1>

      {/* HÀNG 2: Subtitle */}
      <motion.p
        variants={item}
        className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-2xl mb-6 sm:mb-8 font-primary drop-shadow-md font-light max-w-4xl mx-auto leading-[119%] tracking-[16%]"
      >
        THIẾT KẾ TINH GỌN - NÂNG TẦM KHÔNG GIAN SỐNG
      </motion.p>

      {/* HÀNG 3: Button */}
      {showButton && (
        <motion.div variants={item}>
          <Button
          to={"/projects"}
            primary={true}
            classNames={
              "rounded-4xl text-xs sm:text-sm md:text-base lg:text-lg font-light uppercase tracking-wider transition-all duration-300 hover:bg-[#8A7258] px-4 font-primary sm:px-6 md:px-8 py-2 sm:py-3"
            }
          >
            Xem dự án
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}

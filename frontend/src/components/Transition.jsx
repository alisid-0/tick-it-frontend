import { motion } from "framer-motion";

const animationConfiguration = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.5 } }
};

const Transitions = ({ children }) => {
  return (
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
 
 



// const animationConfiguration = {
//   initial: { x: "-100%", opacity: 0, scale: 0.8 },
//   animate: { x: 0, opacity: 1, scale: 1 },
//   exit: { x: "100%", opacity: 0, scale: 0.8 },
// };

// const Transitions = ({ children }) => {
//   return (
//     <motion.div
//       variants={animationConfiguration}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// const Transitions2 = ({ children }) => {
//     const animationVariants = {
//       initial: { x: '-100%', opacity: 0 },
//       animate: { x: 0, opacity: 1, transition: { duration: 0.5 } },
//       exit: { x: '100%', opacity: 0, transition: { duration: 0.5 } },
//     };
  
//     return (
//       <motion.div
//         variants={animationVariants}
//         initial="initial"
//         animate="animate"
//         exit="exit"
//       >
//         {children}
//       </motion.div>
//     );
//   };

export default Transitions;

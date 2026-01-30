const Footer = () => {
  return (
    <footer className="relative bg-[#050B14] h-16 flex items-center justify-center border-t border-[#38BDF8]/20">
      <div
        className="absolute top-0 left-0 w-full h-px bg-linear-to-r 
    from-transparent via-[#38BDF8] to-transparent 
    shadow-[0_0_12px_#38BDF8]"
      />

      <div className="text-center text-gray-500 text-[14px] py-4 border-t border-white/5">
        © {new Date().getFullYear()} Mohammed Abdu — Designed & developed by
        Mohammed Abdu 🔥⚡
      </div>
    </footer>
  );
};

export default Footer;

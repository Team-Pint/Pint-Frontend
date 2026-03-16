export const AUTH_STYLES = {
  container: "flex h-screen w-full overflow-hidden bg-white",
  leftSection: "w-[450px] h-full bg-black text-white flex flex-col justify-center px-16 z-20 shadow-2xl",
  logo: "text-[36px] font-black font-serif italic mb-16",
  
  formWrapper: "w-full space-y-5", 
  
  inputGroup: "flex flex-col gap-1.5", 
  
  label: "text-[10px] text-gray-400 font-bold uppercase",
  
  // 기본 입력창 스타일 (글자색 흰색 명시)
  input: "bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-all text-xs font-light w-full text-white",
  
  button: "w-full bg-white text-black py-4 rounded-full font-semibold text-[12px] mt-6 hover:bg-gray-200 transition-all uppercase tracking-[0.1em]",
  
  toggleText: "w-full text-center text-[10px] text-gray-500 mt-6 cursor-pointer hover:text-white transition-all underline underline-offset-4",
  rightSection: "flex-1 h-full relative overflow-hidden bg-[#f8f8f8] flex gap-6",
  column: "flex-1 flex flex-col gap-6",
  image: "w-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 rounded-none",
};
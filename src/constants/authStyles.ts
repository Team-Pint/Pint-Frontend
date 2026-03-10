export const AUTH_STYLES = {
  container: "flex h-screen w-full overflow-hidden bg-white",
  leftSection: "w-[450px] h-full bg-black text-white flex flex-col justify-center px-16 z-20 shadow-2xl",
  logo: "text-[36px] font-black font-serif italic mb-16 tracking-tighter",
  
  // 1. space-y-8을 space-y-5 정도로 줄여보세요 (32px -> 20px)
  formWrapper: "w-full space-y-5", 
  
  // 2. 라벨과 입력선 사이의 간격을 줄이고 싶다면 gap-1 또는 gap-1.5로 조정
  inputGroup: "flex flex-col gap-1.5", 
  
  label: "text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]",
  input: "bg-transparent border-b border-white/20 py-2 outline-none focus:border-white transition-all text-sm font-light",
  
  // 3. 버튼 위쪽 여백(mt-10)이 너무 넓다면 mt-6 정도로 줄여보세요
  button: "w-full bg-white text-black py-4 rounded-full font-bold text-[11px] mt-6 hover:bg-gray-200 transition-all uppercase tracking-widest",
  
  toggleText: "w-full text-center text-[10px] text-gray-500 mt-6 cursor-pointer hover:text-white transition-all underline underline-offset-4",
  rightSection: "flex-1 h-full relative overflow-hidden bg-[#f8f8f8] flex gap-6",
  column: "flex-1 flex flex-col gap-6",
  image: "w-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 rounded-none",
};
export default function ProfilePhoto({ className }: { className?: string }) {
  return (
    <div
      className={`text-white font-bold text-xl bg-gray1 w-12 h-12 
        flex justify-center items-center rounded-full border-2 border-primary ${className}`}
    >
      <span>Z</span>
    </div>
  );
}

export default function LoadingIndicator({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`w-4 h-4 rounded-full
        flex justify-center items-center
        border-2 border-black border-dashed
        animate-spin ${className}`}
    ></div>
  );
}

import Button from "@/Presentation/Components/Shared/UI/Button";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-2 sm:p-4">
      <div
        className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-y-auto
                   w-full max-h-[95vh] max-w-5xl sm:p-6 p-4"
      >
        {/* Luk-knap i øverste højre hjørne */}
        <div className="absolute top-3 right-3 z-10">
          <Button label="Luk" onClick={onClose} variant="danger" />
        </div>

        {/* Indhold vises her */}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

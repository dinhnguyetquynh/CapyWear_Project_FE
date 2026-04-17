interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
}

export default function ConfirmModal({ isOpen, title, description, onConfirm, onClose, loading }: ConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-2xl">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-500 my-4">{description}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Hủy</button>
          <button 
            onClick={onConfirm} 
            disabled={loading}
            className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-red-300"
          >
            {loading ? "Đang thực hiện..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
}
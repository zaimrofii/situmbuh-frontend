export function ConfirmDeletePopup({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 mt-3 w-full">
      <h1>Anda yakin ingin menghapus siswa ini?</h1>
      <button
        className="h-10 w-full bg-red-500 text-white rounded-2xl"
        onClick={onConfirm}
      >
        Hapus
      </button>
      <button
        className="h-10 w-full border border-red-500 text-red-500 rounded-2xl"
        onClick={onCancel}
      >
        Batal
      </button>
    </div>
  );
}

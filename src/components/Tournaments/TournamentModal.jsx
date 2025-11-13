import React from "react";
import { XCircle } from "lucide-react";
import StatusBadge from "../UI/StatusBadge";
import TournamentForm from "./TournamentForm";

const TournamentModal = ({
  isOpen,
  onClose,
  tournament,
  onSave,
  workers,
  cameras,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-slate-900 p-6 rounded-lg w-full max-w-3xl">
        <TournamentForm
          tournament={tournament}
          onSave={(data) => onSave(data)}
          onCancel={onClose}
          workers={workers}
          cameras={cameras}
          isOpen={isOpen}
        />
      </div>
      <div className="fixed inset-0" onClick={onClose} />
    </div>
  );
};

export default TournamentModal;

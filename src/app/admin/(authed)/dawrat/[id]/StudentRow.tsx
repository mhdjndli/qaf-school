"use client";

import { useState } from "react";
import Avatar from "./Avatar";
import CopyButton from "./CopyButton";
import ConfirmButton from "./ConfirmButton";
import StudentForm from "./StudentForm";
import { deleteDawraStudentAction, regenerateCodeAction } from "../actions";

export default function StudentRow({
  dawraId,
  dawraName,
  student,
  age,
  dobLabel,
}: {
  dawraId: string;
  dawraName: string;
  student: {
    id: string;
    firstName: string;
    lastName: string;
    dob: string | null;
    accessCode: string;
    hasPhoto: boolean;
  };
  age: string;
  dobLabel: string;
}) {
  const [editing, setEditing] = useState(false);
  const fullName = `${student.firstName} ${student.lastName}`.trim();
  const invitation = `Assalamu alaikum! You can follow ${student.firstName}'s weekly updates for ${dawraName} here:

Link: https://qafschool.com/dawrat
Username: ${student.firstName}
Password: ${student.accessCode}`;

  return (
    <li className="px-4 py-3">
      <div className="flex items-center gap-4 flex-wrap">
        <Avatar studentId={student.id} hasPhoto={student.hasPhoto} name={fullName} />
        <div className="min-w-0 flex-1">
          <div className="font-medium text-text">{fullName}</div>
          <div className="text-xs text-text-light">
            {student.dob ? `${age} · born ${dobLabel}` : "Date of birth not set"}
          </div>
        </div>
        <div className="text-xs text-text-light">
          <div>
            Username: <span className="font-medium text-text">{student.firstName}</span>
          </div>
          <div>
            Password:{" "}
            <span className="font-mono font-semibold text-text tracking-wider">
              {student.accessCode}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-end">
          <CopyButton
            text={invitation}
            label="Copy invitation"
            className="text-sm bg-orange text-white px-3 py-1.5 rounded-md font-semibold hover:bg-orange-dark transition-colors whitespace-nowrap"
          />
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="text-sm text-orange-dark hover:underline font-medium"
          >
            {editing ? "Close" : "Edit"}
          </button>
          <ConfirmButton
            action={regenerateCodeAction}
            fields={{ id: student.id }}
            message={`Give ${student.firstName} a new password? The old one stops working and the parent will need the new one.`}
            className="text-sm text-text-light hover:text-orange-dark hover:underline"
          >
            New password
          </ConfirmButton>
          <ConfirmButton
            action={deleteDawraStudentAction}
            fields={{ id: student.id }}
            message={`Remove ${fullName} from this Dawra? Their reports and pictures will be deleted. This cannot be undone.`}
            className="text-sm text-red hover:underline"
          >
            Remove
          </ConfirmButton>
        </div>
      </div>
      {editing ? (
        <div className="mt-3 pt-3 border-t border-border">
          <StudentForm
            dawraId={dawraId}
            student={student}
            onSaved={() => setEditing(false)}
          />
        </div>
      ) : null}
    </li>
  );
}

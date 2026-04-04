"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { colors } from "@/lib/design-tokens";
import { PinIcon } from "@/components/icons";
import {
  formatWaitlistCell,
  getNumericEntryId,
  isRowPinned,
} from "@/lib/waitlist-admin-display";

type Row = Record<string, unknown>;

export function WaitlistAdminTable({
  rows,
  columns,
  rowKeyPrefix,
}: {
  rows: Row[];
  columns: string[];
  rowKeyPrefix: string;
}) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const togglePin = useCallback(
    async (id: string) => {
      setBanner(null);
      setPendingId(id);
      try {
        const res = await fetch(`/api/admin/entries/${id}/pin`, { method: "PATCH" });
        const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string };
        if (!res.ok) {
          setBanner(data.error || "Could not update pin.");
          return;
        }
        if (typeof data.message === "string") setBanner(data.message);
        router.refresh();
      } catch {
        setBanner("Network error.");
      } finally {
        setPendingId(null);
      }
    },
    [router]
  );

  return (
    <div>
      {banner && (
        <p
          role="status"
          style={{
            marginBottom: "12px",
            padding: "10px 14px",
            borderRadius: "10px",
            background: colors.brandPrimaryPale,
            color: colors.textDark,
            fontSize: "14px",
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          {banner}
        </p>
      )}
      <div
        style={{
          overflowX: "auto",
          borderRadius: "12px",
          border: `1px solid ${colors.border}`,
          background: colors.white,
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
            fontFamily: "'Source Sans 3', sans-serif",
          }}
        >
          <thead>
            <tr style={{ background: colors.brandPrimaryPale }}>
              <th
                style={{
                  textAlign: "center",
                  padding: "12px 10px",
                  fontWeight: 700,
                  color: colors.textDark,
                  borderBottom: `1px solid ${colors.border}`,
                  width: "72px",
                }}
              >
                Pin
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  style={{
                    textAlign: "left",
                    padding: "12px 14px",
                    fontWeight: 700,
                    color: colors.textDark,
                    borderBottom: `1px solid ${colors.border}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const id = getNumericEntryId(row);
              const pinned = isRowPinned(row);
              const busy = id != null && pendingId === id;
              return (
                <tr
                  key={`${rowKeyPrefix}-${String(row.id ?? row.email ?? "row")}-${i}`}
                  style={{
                    borderBottom: `1px solid ${colors.border}`,
                    background: pinned ? colors.brandPrimaryPale : undefined,
                    opacity: busy ? 0.7 : 1,
                  }}
                >
                  <td
                    style={{
                      padding: "8px 10px",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    {id ? (
                      <button
                        type="button"
                        onClick={() => togglePin(id)}
                        disabled={busy}
                        title={pinned ? "Unpin (saved in WordPress)" : "Pin (saved in WordPress)"}
                        aria-label={pinned ? "Unpin entry" : "Pin entry"}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "40px",
                          height: "36px",
                          borderRadius: "8px",
                          border: `1px solid ${pinned ? colors.brandPrimary : colors.border}`,
                          background: pinned ? colors.white : colors.bgAlt,
                          color: pinned ? colors.brandPrimary : colors.textMuted,
                          cursor: busy ? "wait" : "pointer",
                        }}
                      >
                        <PinIcon filled={pinned} />
                      </button>
                    ) : (
                      <span style={{ color: colors.textMuted, fontSize: "12px" }}>—</span>
                    )}
                  </td>
                  {columns.map((col) => (
                    <td
                      key={col}
                      style={{
                        padding: "10px 14px",
                        color: colors.textBody,
                        verticalAlign: "top",
                        maxWidth: "320px",
                        wordBreak: "break-word",
                      }}
                    >
                      {formatWaitlistCell(row[col])}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

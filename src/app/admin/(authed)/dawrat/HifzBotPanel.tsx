import { listHifzTeachers } from "@/lib/hifz";
import { getHifzBotStatus } from "@/lib/hifz-bot";
import { shortDate } from "@/lib/format";
import { setHifzTeacherAction } from "./actions";
import ConfirmButton from "./[id]/ConfirmButton";
import ConnectBotButton from "./ConnectBotButton";

/** Connection status of the Hifz Telegram bot and the teachers allowed to use it. */
export default async function HifzBotPanel() {
  const [status, teachers] = await Promise.all([
    getHifzBotStatus(),
    listHifzTeachers(),
  ]);
  const connected =
    status.configured && status.webhookUrl.endsWith("/api/telegram/hifz");
  const pending = teachers.filter((t) => !t.approved);
  const approved = teachers.filter((t) => t.approved);

  return (
    <section className="bg-white border border-border rounded-xl shadow-sm mb-8">
      <div className="bg-cream border-b border-border px-5 py-3 rounded-t-xl flex items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-bold text-text">
            Hifz bot (Telegram)
          </h2>
          <p className="text-text-light text-xs mt-0.5">
            Teachers record each child&apos;s daily tasmee3 from Telegram.
            Parents see it on their child&apos;s page.
          </p>
        </div>
        {status.configured && status.username ? (
          <a
            href={`https://t.me/${status.username}`}
            target="_blank"
            rel="noopener"
            className="text-sm text-orange-dark hover:underline font-medium whitespace-nowrap"
          >
            @{status.username}
          </a>
        ) : null}
      </div>

      <div className="px-5 py-5 space-y-5">
        {!status.configured ? (
          <p className="text-sm text-text-light">
            Add the bot token from BotFather as the{" "}
            <code className="font-mono text-text">HIFZ_BOT_TOKEN</code>{" "}
            environment variable on Railway, then come back here to connect it.
          </p>
        ) : (
          <div className="space-y-2">
            <div className="text-sm">
              Status:{" "}
              {connected ? (
                <span className="font-semibold text-green">Connected ✓</span>
              ) : (
                <span className="font-semibold text-red">Not connected</span>
              )}
              {connected && status.pendingUpdates > 0 ? (
                <span className="text-text-light">
                  {" "}
                  · {status.pendingUpdates} message(s) waiting
                </span>
              ) : null}
            </div>
            {status.lastError ? (
              <p className="text-xs text-red">Last error: {status.lastError}</p>
            ) : null}
            {connected && status.outdated ? (
              <p className="text-sm text-orange-dark font-medium">
                The bot has new features. Click Reconnect once to apply its
                latest settings.
              </p>
            ) : null}
            <ConnectBotButton label={connected ? "Reconnect" : "Connect bot"} />
          </div>
        )}

        {pending.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold text-text mb-2">
              Waiting for approval
            </h3>
            <ul className="divide-y divide-border border border-orange/40 rounded-lg bg-orange/[0.03]">
              {pending.map((t) => (
                <TeacherRow key={t.telegramId} teacher={t} />
              ))}
            </ul>
          </div>
        ) : null}

        <div>
          <h3 className="text-sm font-semibold text-text mb-2">
            Approved teachers
          </h3>
          {approved.length ? (
            <ul className="divide-y divide-border border border-border rounded-lg">
              {approved.map((t) => (
                <TeacherRow key={t.telegramId} teacher={t} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-text-light">
              None yet. Ask each teacher to open the bot in Telegram and press
              Start; they&apos;ll appear above for you to approve.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function TeacherRow({
  teacher,
}: {
  teacher: Awaited<ReturnType<typeof listHifzTeachers>>[number];
}) {
  return (
    <li className="px-4 py-2.5 flex items-center gap-3 flex-wrap">
      <div className="flex-1 min-w-0">
        <div className="font-medium text-text text-sm">{teacher.name}</div>
        <div className="text-xs text-text-light">
          {teacher.username ? `@${teacher.username} · ` : ""}first message{" "}
          {shortDate(teacher.createdAt)}
        </div>
      </div>
      {teacher.approved ? (
        <ConfirmButton
          action={setHifzTeacherAction}
          fields={{ telegramId: teacher.telegramId, op: "revoke" }}
          message={`Stop ${teacher.name} from recording hifz?`}
          className="text-sm text-red hover:underline"
        >
          Remove access
        </ConfirmButton>
      ) : (
        <>
          <form action={setHifzTeacherAction}>
            <input type="hidden" name="telegramId" value={teacher.telegramId} />
            <input type="hidden" name="op" value="approve" />
            <button
              type="submit"
              className="text-sm bg-orange text-white px-3 py-1.5 rounded-md font-semibold hover:bg-orange-dark transition-colors"
            >
              Approve
            </button>
          </form>
          <ConfirmButton
            action={setHifzTeacherAction}
            fields={{ telegramId: teacher.telegramId, op: "delete" }}
            message={`Dismiss the request from ${teacher.name}?`}
            className="text-sm text-text-light hover:text-red hover:underline"
          >
            Dismiss
          </ConfirmButton>
        </>
      )}
    </li>
  );
}

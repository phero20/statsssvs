"use client";

import React from "react";
import {
  Github,
  Code2,
  Star,
  Mail,
  Linkedin,
  Activity,
  Flame,
  BarChart2,
  BookOpen,
  Avatar,
} from "lucide-react";
import {
  leetcodeDummyData,
  githubDummyData,
  codeforcesDummyData,
  studioProfileDummyData,
} from "./dummyData";

/* ─────────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────────── */

const Preview = () => {
  const profile = studioProfileDummyData;
  const leetcode = leetcodeDummyData;
  const github = githubDummyData;
  const codeforces = codeforcesDummyData;

  const leetcodeEasy = leetcode.submitStats.find(
    (s) => s.difficulty === "Easy",
  );
  const leetcodeMedium = leetcode.submitStats.find(
    (s) => s.difficulty === "Medium",
  );
  const leetcodeHard = leetcode.submitStats.find(
    (s) => s.difficulty === "Hard",
  );
  const leetcodeAll = leetcode.submitStats.find((s) => s.difficulty === "All");

  const leetcodeTotalEasy = leetcode.questionsTotal.find(
    (q) => q.difficulty === "Easy",
  );
  const leetcodeTotalMedium = leetcode.questionsTotal.find(
    (q) => q.difficulty === "Medium",
  );
  const leetcodeTotalHard = leetcode.questionsTotal.find(
    (q) => q.difficulty === "Hard",
  );

  const totalLeetcodeSolved = leetcodeAll?.count || 0;
  const totalLeetcodeQuestions =
    leetcode.questionsTotal.find((q) => q.difficulty === "All")?.count || 1;

  const lastWeeks = github.contributions.weeks.slice(-52);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] p-10 text-zinc-100">
      {/* ── OUTER WRAPPER (Pure stealth black, no background) ── */}

      {/* ── INNER WRAPPER (The Container with the Curved Lines) ── */}
      <div
        className="relative flex w-[1160px] flex-col gap-3 overflow-hidden rounded-2xl border border-zinc-800/80 p-6 shadow-[0_0_80px_-20px_rgba(255,255,255,0.03)]"
        style={{
          backgroundColor: "#09090b",
          colorScheme: "dark",
          backgroundImage: `
    radial-gradient(120% 120% at 50% 50%, transparent 50%, #09090b 100%),
    repeating-linear-gradient(
      135deg,
      rgba(255,255,255,0.035) 0px,
      rgba(255,255,255,0.035) 1px,
      transparent 1px,
      transparent 28px
    )
  `,
        }}
      >
        {/* ROW 1 */}
        <div className="relative z-10 grid grid-cols-12 gap-3">
          <IdentityBlock profile={profile} />
          <AvatarBlock
            profile={profile}
            leetcode={leetcode}
            github={github}
            codeforces={codeforces}
          />
          <SocialLinks profile={profile} />
        </div>

        {/* ROW 2 */}
        <div className="relative z-10 grid grid-cols-12 gap-3">
          <LeetCodeSpotlight
            leetcode={leetcode}
            leetcodeEasy={leetcodeEasy}
            leetcodeMedium={leetcodeMedium}
            leetcodeHard={leetcodeHard}
            leetcodeTotalEasy={leetcodeTotalEasy}
            leetcodeTotalMedium={leetcodeTotalMedium}
            leetcodeTotalHard={leetcodeTotalHard}
            totalLeetcodeSolved={totalLeetcodeSolved}
            totalLeetcodeQuestions={totalLeetcodeQuestions}
          />
          <CodeforcesCard codeforces={codeforces} />
        </div>

        {/* ROW 3 */}
        <div className="relative z-10 grid grid-cols-12 gap-3">
          <LeetCodeActivityGraph leetcode={leetcode} />
          <GitHubProfileCard github={github} />
          <GitHubRepoStatsCards github={github} />
        </div>

        {/* ROW 4 */}
        <div className="relative z-10">
          <GitHubHeatmap lastWeeks={lastWeeks} />
        </div>
      </div>
    </div>
  );
};

export default Preview;

/* ─────────────────────────────────────────────────────────────────
   ROW 1 — IDENTITY
───────────────────────────────────────────────────────────────── */

const IdentityBlock = ({ profile }) => {
  const rawName = profile?.fullName?.trim();
  const displayName = rawName ? rawName : "Your Name Here";
  const nameParts = displayName.split(" ");
  const firstName = nameParts.slice(0, 2).join(" ");
  const restOfName = nameParts.slice(2).join(" ");
  return (
    <div className="relative col-span-3 flex flex-col justify-center overflow-hidden rounded-xl border border-zinc-800 bg-[#121214] p-6">
      <svg
        className="pointer-events-none absolute top-0 right-0 h-48 w-48 text-zinc-500/5"
        viewBox="0 0 100 100"
      >
        <circle cx="100" cy="0" r="80" fill="currentColor" />
      </svg>
      <span className="relative z-10 mb-2 text-xl font-medium text-zinc-500">
        Hey I'm
      </span>
      <h1 className="text-4xl leading-none font-black tracking-tight text-zinc-100">
        {firstName}
        {restOfName && (
          <>
            <br />
            <span className="text-zinc-300">{restOfName}</span>
          </>
        )}
      </h1>
    </div>
  );
};

const AvatarBlock = ({ profile, leetcode, github, codeforces }) => {
  const displayAvatar =
    profile?.photoUrl ||
    leetcode?.profile?.userAvatar ||
    github?.profile?.avatarUrl ||
    codeforces?.titlePhoto;

  return (
    <div className="relative col-span-6 flex items-stretch gap-1 overflow-hidden rounded-xl border border-zinc-800 bg-[#121214] p-6">
      {/* Background Grid Elements */}
      <div className="absolute inset-0 bg-[#09090b]/50"></div>
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: `24px 24px`,
        }}
      ></div>

      {/* ─── AVATAR SECTION (With Fallback) ─── */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        {displayAvatar ? (
          <img
            src={displayAvatar}
            alt={profile?.fullName || "Developer"}
            className="h-full max-h-40 w-auto rounded-full object-cover"
          />
        ) : (
          // Sleek Fallback Avatar
          <div className="flex h-32 w-32 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* ─── PORTFOLIO SECTION (With Fallback) ─── */}
      {profile?.portfolioUrl ? (
        // Live Iframe Preview (If URL exists)
        <div className="group relative z-10 flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900/40">
          <iframe
            src={profile.portfolioUrl}
            title="Portfolio Preview"
            className="pointer-events-none absolute top-0 left-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0"
            tabIndex={-1}
            aria-hidden="true"
          />
          <div className="absolute bottom-3 flex items-center gap-2 rounded-full border border-zinc-700/80 bg-[#121214]/80 px-3 py-1.5 backdrop-blur-md">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="max-w-[150px] truncate text-[14px] font-bold tracking-widest text-zinc-300">
              {profile.portfolioUrl.replace(/^https?:\/\//, "")}
            </span>
          </div>
        </div>
      ) : (
        // Dashed Placeholder (If URL is null/empty)
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700/50 bg-[#09090b]/40 p-4 transition-colors hover:border-zinc-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-3 h-8 w-8 text-zinc-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
          <span className="text-center text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Portfolio
            <br />
            Not Linked
          </span>
        </div>
      )}
    </div>
  );
};

const SocialLinks = ({ profile }) => {
  const email = profile?.emailUrl || "Your Email Here";
  const linkedinUrl = profile?.linkedinUrl || "Your LinkedIn Here";
  const linkedinHandle = (() => {
    const match = linkedinUrl.match(/linkedin\.com\/in\/([^/?]+)/i);
    return match
      ? `@${match[1]}`
      : linkedinUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  })();

  return (
    <div className="col-span-3 flex flex-col gap-3">
      {/* ── Email Block ── */}
      <div className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-[#121214] p-5 transition-colors hover:border-rose-500/30">
        {/* BG SVG decorator */}
        <svg
          className="pointer-events-none absolute right-0 bottom-0 h-28 w-28 text-rose-500/5"
          viewBox="0 0 100 100"
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>
        {/* Top: icon + label */}
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-rose-500" />
          <span className="text-base font-bold text-zinc-100">Email</span>
        </div>
        {/* Bottom: value */}
        <div className="mt-3">
          <span className="text-sm leading-tight font-bold break-all text-rose-400">
            {email}
          </span>
        </div>
      </div>

      {/* ── LinkedIn Block ── */}
      <div className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-[#121214] p-5 transition-colors hover:border-blue-500/30">
        {/* BG SVG decorator */}
        <svg
          className="pointer-events-none absolute right-0 bottom-0 h-28 w-28 text-blue-500/5"
          viewBox="0 0 100 100"
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>
        {/* Top: icon + label */}
        <div className="flex items-center gap-2">
          <Linkedin className="h-4 w-4 text-blue-500" />

          <span className="text-base font-bold text-zinc-100">LinkedIn</span>
        </div>
        {/* Bottom: value */}
        <div className="mt-3">
          <span className="text-md leading-tight font-bold break-all text-blue-400">
            {linkedinHandle}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────
   ROW 2 — PLATFORM SPOTLIGHTS
───────────────────────────────────────────────────────────────── */

const LeetCodeSpotlight = ({
  leetcode,
  leetcodeEasy,
  leetcodeMedium,
  leetcodeHard,
  leetcodeTotalEasy,
  leetcodeTotalMedium,
  leetcodeTotalHard,
  totalLeetcodeSolved,
  totalLeetcodeQuestions,
}) => {
  // 1. Safe extraction for arrays to prevent map() crashes
  const badges = leetcode?.badges || [];
  const languages = leetcode?.languages || [];

  // 2. Safe math variables to prevent NaN / Division by Zero
  const safeTotalSolved = Math.max(totalLeetcodeSolved || 0, 1);
  const safeTotalQuestions = totalLeetcodeQuestions || 1;
  const easyCount = leetcodeEasy?.count || 0;
  const mediumCount = leetcodeMedium?.count || 0;
  const hardCount = leetcodeHard?.count || 0;

  return (
    <div className="relative col-span-8 flex items-stretch gap-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#121214] p-6">
      {/* Unique Background: concentric rings covering full box */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {[60, 130, 200, 270, 340, 410, 480, 550, 620, 690, 760].map((r) => (
          <circle
            key={r}
            cx="0"
            cy="100%"
            r={r}
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
          />
        ))}
      </svg>
      {/* ── Column 1: Identity & Circular Progress ── */}
      <div className="flex min-w-[130px] flex-col items-center justify-center gap-5">
        <div className="flex items-center gap-2">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 ring-2 ring-orange-500/20 ring-offset-2 ring-offset-[#121214]">
            {leetcode?.profile?.userAvatar ? (
              <img
                src={leetcode.profile.userAvatar}
                alt={leetcode?.profile?.username || "Developer"}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              // Sleek SVG Fallback "Dude"
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>
          <span className="max-w-[100px] truncate text-base font-bold text-zinc-100">
            @{leetcode?.profile?.username || "developer"}
          </span>
        </div>

        <div className="relative flex h-28 w-28 items-center justify-center">
          <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
            <circle
              cx="56"
              cy="56"
              r="52"
              fill="transparent"
              stroke="#27272a"
              strokeWidth="3"
            />

            {/* Easy (Emerald 500) */}
            <circle
              cx="56"
              cy="56"
              r="52"
              fill="transparent"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={
                2 * Math.PI * 52 * (1 - easyCount / safeTotalSolved)
              }
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
            {/* Medium (Yellow 500) */}
            <circle
              cx="56"
              cy="56"
              r="52"
              fill="transparent"
              stroke="#eab308"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={
                2 * Math.PI * 52 * (1 - mediumCount / safeTotalSolved)
              }
              style={{
                transformOrigin: "50% 50%",
                transform: `rotate(${(easyCount / safeTotalSolved) * 360}deg)`,
              }}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
            {/* Hard (Red 500) */}
            <circle
              cx="56"
              cy="56"
              r="52"
              fill="transparent"
              stroke="#ef4444"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={
                2 * Math.PI * 52 * (1 - hardCount / safeTotalSolved)
              }
              style={{
                transformOrigin: "50% 50%",
                transform: `rotate(${((easyCount + mediumCount) / safeTotalSolved) * 360}deg)`,
              }}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="flex flex-col items-center text-center">
            <span className="text-lg leading-none font-black text-zinc-100">
              {totalLeetcodeSolved || 0}
            </span>
            <span className="text-xs font-bold text-zinc-500">
              /{safeTotalQuestions}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
            Global Rank
          </span>
          <span className="mt-1 text-lg leading-none font-black text-orange-500">
            {leetcode?.profile?.ranking
              ? leetcode.profile.ranking.toLocaleString()
              : "Unranked"}
          </span>
        </div>
      </div>

      {/* ── Column 2: Difficulty Bars & Contest ── */}
      <div className="flex flex-1 flex-col justify-center gap-6 border-x border-zinc-800/50 px-3">
        <div className="flex w-full flex-col gap-3">
          {[
            {
              label: "Easy",
              stat: leetcodeEasy,
              total: leetcodeTotalEasy,
              color: "bg-emerald-500",
              text: "text-emerald-500",
            },
            {
              label: "Medium",
              stat: leetcodeMedium,
              total: leetcodeTotalMedium,
              color: "bg-yellow-500",
              text: "text-yellow-500",
            },
            {
              label: "Hard",
              stat: leetcodeHard,
              total: leetcodeTotalHard,
              color: "bg-red-500",
              text: "text-red-500",
            },
          ].map((item) => {
            const safeCount = item.stat?.count || 0;
            const safeTotal = item.total?.count || 1;
            return (
              <div key={item.label} className="flex w-full flex-col gap-1">
                <div className="flex items-end justify-between">
                  <span
                    className={`text-[10px] font-bold tracking-widest uppercase ${item.text}`}
                  >
                    {item.label}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-400">
                    <strong className="text-xs text-zinc-200">
                      {safeCount}
                    </strong>{" "}
                    / {safeTotal}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${(safeCount / safeTotal) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Contest Box */}
        <div className="flex min-h-[64px] items-center justify-between rounded-lg border border-zinc-800/50 bg-[#18181b] p-3">
          {leetcode?.contest ? (
            <>
              <div className="flex flex-col">
                <span className="text-[8px] font-bold tracking-widest text-zinc-500 uppercase">
                  Contest Rating
                </span>
                <span className="flex items-baseline gap-2 text-lg font-black text-zinc-100">
                  {Math.floor(leetcode.contest.rating || 0)}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-orange-500">
                  Top {leetcode.contest.topPercentage || "N/A"}%
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold tracking-widest text-zinc-500 uppercase">
                  Global Rank
                </span>
                <span className="text-lg font-black text-zinc-300">
                  {leetcode.contest.globalRanking
                    ? `#${leetcode.contest.globalRanking.toLocaleString()}`
                    : "N/A"}
                </span>
              </div>
            </>
          ) : (
            <div className="flex w-full flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
                Contests
              </span>
              <span className="text-sm font-bold text-zinc-600">
                Not Participated
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Column 3: Badges & Languages ── */}
      <div className="flex flex-[1.5] flex-col justify-around gap-4">
        {/* Badges Section */}
        <div className="flex flex-col">
          <span className="mb-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Recent Badges ({badges.length})
          </span>
          {badges.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {badges.slice(0, 6).map((badge, idx) => (
                <div
                  key={idx}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800/50 bg-[#18181b] p-1"
                >
                  {badge.icon ? (
                    <img
                      src={badge.icon}
                      alt={badge.name || "Badge"}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-zinc-700" />
                  )}
                </div>
              ))}
              {badges.length > 6 && (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800/50 bg-[#18181b] text-xs font-bold text-zinc-500">
                  +{badges.length - 6}
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-10 items-center rounded-lg border border-dashed border-zinc-800 bg-[#18181b]/50 px-3">
              <span className="text-[10px] font-medium text-zinc-600">
                No badges earned yet
              </span>
            </div>
          )}
        </div>

        {/* Languages Section */}
        <div className="flex flex-col">
          <span className="mb-2 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Top Languages ({languages.length})
          </span>
          {languages.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {languages.slice(0, 7).map((lang, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 rounded-md border border-zinc-800/50 bg-[#18181b] px-2.5 py-1"
                >
                  <span className="text-[10px] font-bold text-zinc-300">
                    {lang.languageName || "Unknown"}
                  </span>
                  <span className="text-[9px] font-bold text-zinc-500">
                    {lang.problemsSolved || 0}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-7 items-center rounded-md border border-dashed border-zinc-800 bg-[#18181b]/50 px-3">
              <span className="text-[10px] font-medium text-zinc-600">
                No language data
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CodeforcesCard = ({ codeforces }) => (
  <div className="relative col-span-4 flex w-full flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-[#121214] p-5 shadow-lg">
    {/* Unique Background: red zigzag / chevron pattern */}
    <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="cf-zigzag"
            width="20"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <polyline
              points="0,10 10,0 20,10"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cf-zigzag)" />
      </svg>
    </div>
    <div className="relative z-10 flex flex-col gap-5">
      {/* ── Header & Identity ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-red-500 opacity-60" />
          <span className="text-base font-bold text-zinc-100">Codeforces</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 ring-2 ring-red-500/20 ring-offset-2 ring-offset-[#121214]">
            {codeforces?.titlePhoto ? (
              <img
                src={codeforces.titlePhoto}
                alt={codeforces?.handle || "Developer"}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              // Sleek SVG Fallback "Dude"
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>
          <div className="flex flex-col justify-center">
            {/* Added truncate so long handles don't break the row */}
            <span className="max-w-[120px] truncate text-base leading-none font-bold text-zinc-100">
              @{codeforces?.handle || "developer"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Hero Rating ── */}
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
          Current Rating
        </span>
        <div className="flex items-end gap-4">
          <span className="text-5xl leading-none font-black tracking-tighter text-zinc-50">
            {codeforces?.rating ?? "0"}
          </span>
          <span className="mb-1 text-[11px] font-black tracking-widest text-red-500 uppercase">
            {codeforces?.rank || "Unranked"}
          </span>
        </div>
      </div>
    </div>

    {/* ── Secondary Stats Footer ── */}
    <div className="mt-5 flex items-center justify-around rounded-lg bg-zinc-800/30 px-4 py-3">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
          Max Rating
        </span>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl leading-none font-black text-zinc-200">
            {codeforces?.maxRating ?? "0"}
          </span>
          <span className="text-[8px] font-bold tracking-widest text-zinc-500 uppercase">
            ({codeforces?.maxRank || "Unranked"})
          </span>
        </div>
      </div>

      <div className="h-8 w-px bg-zinc-700/50"></div>

      <div className="flex flex-col items-end px-3">
        <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
          Contributions
        </span>
        <span
          className={`mt-1 text-2xl leading-none font-black ${
            (codeforces?.contribution || 0) < 0
              ? "text-red-500"
              : "text-emerald-500"
          }`}
        >
          {/* Smart Contribution Logic: only add "+" if > 0, otherwise just show the number (e.g. -5 or 0) */}
          {(codeforces?.contribution || 0) > 0
            ? `+${codeforces.contribution}`
            : codeforces?.contribution || "0"}
        </span>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────
   ROW 3 — METRICS
───────────────────────────────────────────────────────────────── */

const LeetCodeActivityGraph = ({ leetcode }) => {
  // 1. Safely extract and parse the calendar data
  const rawCalendar = leetcode?.calendar?.submissionCalendar;

  let calendarObj = {};
  try {
    // Handle both stringified JSON (LeetCode's default API format) and normal objects
    calendarObj =
      typeof rawCalendar === "string"
        ? JSON.parse(rawCalendar)
        : rawCalendar || {};
  } catch (error) {
    calendarObj = {};
  }

  const calendarEntries = Object.entries(calendarObj)
    .map(([timestamp, count]) => ({
      timestamp: Number(timestamp),
      count: Number(count),
      date: new Date(Number(timestamp) * 1000),
    }))
    .sort((a, b) => a.timestamp - b.timestamp);

  // 2. Boolean to check if we actually have data to graph
  const hasData = calendarEntries.length > 0;

  // 3. Safe Math (prevents Infinity or NaN if array is empty)
  const maxSubmissions = hasData
    ? Math.max(...calendarEntries.map((e) => e.count), 1)
    : 1;
  const svgWidth = 1000;
  const svgHeight = 100;
  const stepX = hasData
    ? svgWidth / Math.max(calendarEntries.length - 1, 1)
    : 0;

  const pts = calendarEntries.map((e, i) => {
    const intensity = e.count / maxSubmissions;
    const x = i * stepX;
    const y = svgHeight - 5 - intensity * (svgHeight - 20);
    return { ...e, x, y };
  });

  const linePath = hasData
    ? `M ${pts.map((p) => `${p.x},${p.y}`).join(" L ")}`
    : "";
  const areaPath = hasData
    ? `${linePath} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`
    : "";

  return (
    <div className="relative col-span-6 flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-[#121214] p-6 shadow-2xl">
      <div className="absolute inset-0 bg-[#09090b]/50"></div>
      <div className="pointer-events-none absolute inset-0 z-0 opacity-50">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="card-blueprint-grid"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#52525b"
                strokeWidth="1"
                strokeDasharray="1 3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#card-blueprint-grid)" />
        </svg>
      </div>
      {/* ── Header ── */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex flex-col">
          <span className="flex items-center gap-2 text-sm font-bold text-zinc-100">
            <Code2 className="h-4 w-4 text-orange-500" />
            Leetcode
          </span>
          <span className="mt-1 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            {calendarEntries.length} Continuous Data Points
          </span>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
              Max Streak
            </span>
            <span className="flex items-center gap-1 text-2xl leading-none font-black text-zinc-100">
              <Flame className="h-5 w-5 text-orange-500" />
              {leetcode?.calendar?.streak || 0}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
              Active Days
            </span>
            <span className="text-2xl leading-none font-black text-zinc-100">
              {leetcode?.calendar?.totalActiveDays || 0}
            </span>
          </div>
        </div>
      </div>

      {/* ── Graph Area (With Fallback) ── */}
      <div className="relative z-10 mt-8 flex h-36 w-full gap-3">
        {hasData ? (
          <>
            {/* Y-Axis Labels */}
            <div className="flex w-6 flex-col justify-between text-right text-[10px] font-bold text-zinc-500">
              <span>{maxSubmissions}</span>
              <span>{Math.floor(maxSubmissions / 2)}</span>
              <span className="text-zinc-700">0</span>
            </div>

            {/* The SVG Graph */}
            <div className="flex flex-1 flex-col">
              <div className="relative h-36 w-full border-y border-zinc-800/50 bg-transparent">
                <svg
                  className="absolute inset-0 z-10 h-full w-full"
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern
                      id="hatch-orange"
                      patternUnits="userSpaceOnUse"
                      width="6"
                      height="6"
                      patternTransform="rotate(45)"
                    >
                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="6"
                        stroke="#f97316"
                        strokeWidth="1"
                        opacity="0.35"
                      />
                    </pattern>
                  </defs>
                  <path d={areaPath} fill="url(#hatch-orange)" />
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                <div className="absolute inset-x-0 top-0 bottom-0 z-20 flex w-full">
                  {pts.map((p) => (
                    <div
                      key={p.timestamp}
                      className="group relative flex-1 cursor-crosshair"
                    >
                      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-zinc-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
                      <div
                        className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-orange-500 bg-[#121214] opacity-0 transition-all duration-150 group-hover:scale-125 group-hover:opacity-100"
                        style={{ top: `${(p.y / svgHeight) * 100}%` }}
                      />
                      <div
                        className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 -translate-y-[calc(100%+12px)] opacity-0 transition-all duration-150 group-hover:-translate-y-[calc(100%+8px)] group-hover:opacity-100"
                        style={{ top: `${(p.y / svgHeight) * 100}%` }}
                      >
                        <div className="flex flex-col items-center rounded border border-zinc-700 bg-zinc-900 px-3 py-1.5 leading-none whitespace-nowrap shadow-2xl">
                          <span className="text-sm font-black text-zinc-100">
                            {p.count}{" "}
                            <span className="text-orange-500">Subs</span>
                          </span>
                          <span className="mt-1 text-[8px] font-bold tracking-[0.2em] text-zinc-500 uppercase">
                            {p.date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="h-2 w-2 -translate-y-[4px] rotate-45 border-r border-b border-zinc-700 bg-zinc-900 shadow-xl" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* X-Axis Labels */}
              <div className="mt-2 flex w-full justify-between px-2 text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
                {pts
                  .filter(
                    (p, i, arr) =>
                      i === 0 ||
                      p.date.getMonth() !== arr[i - 1].date.getMonth(),
                  )
                  .slice(-4)
                  .map((p, i) => (
                    <span key={i}>
                      {p.date.toLocaleString("en-US", { month: "short" })}
                    </span>
                  ))}
              </div>
            </div>
          </>
        ) : (
          // ── The Empty State Fallback ──
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-[#18181b]/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mb-2 h-6 w-6 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
              />
            </svg>
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
              No Activity Data Available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const GitHubProfileCard = ({ github }) => {
  // 1. Safe extraction of variables to prevent mid-render crashes
  const avatarUrl = github?.profile?.avatarUrl;
  const login = github?.profile?.login || "developer";
  const totalContributions = github?.contributions?.totalContributions || 0;

  return (
    <div className="relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-[#121214]">
      {/* Unique Background: diagonal hatching */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="gh-crosshatch"
              width="20"
              height="10"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="10"
                stroke="#10b981"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gh-crosshatch)" />
        </svg>
      </div>
      {/* ── Header ── */}
      <div className="absolute top-5 left-5 flex items-center gap-2 text-sm font-bold text-zinc-100">
        <Github className="h-4 w-4 text-emerald-400" />
        GitHub
      </div>

      {/* ── Profile Section ── */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 pt-10 pb-4">
        {/* Adjusted Avatar wrapper for proper centering with fallbacks */}
        <div className="relative mt-2 mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-900/50 bg-zinc-800 ring-2 ring-emerald-500/20">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={login}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            // Sleek fallback if GitHub image fails to load
            <Github className="h-8 w-8 text-emerald-500/50" />
          )}
        </div>
        {/* Added truncate so long usernames don't break the pill boundary */}
        <span className="max-w-[140px] truncate rounded-full border border-emerald-900/50 px-4 py-1.5 text-[11px] font-bold tracking-widest">
          @{login}
        </span>
      </div>

      {/* ── Stats Footer ── */}
      <div className="flex flex-col items-center justify-center border-t border-emerald-900/30 bg-zinc-800/30 p-5">
        <span className="text-3xl font-black tracking-tight text-zinc-100">
          {totalContributions.toLocaleString()}
        </span>
        <span className="mt-1 text-[10px] font-bold tracking-widest text-emerald-500 uppercase">
          Lifetime Commits
        </span>
      </div>
    </div>
  );
};

const GitHubRepoStatsCards = ({ github }) => {
  // 1. Safe extraction (Defaults to 0 if data is missing)
  const totalRepos = github?.repoStats?.totalRepos || 0;
  const totalStars = github?.repoStats?.totalStars || 0;

  return (
    <div className="col-span-3 flex flex-col gap-3">
      {/* ── Repositories Card ── */}
      <div className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-[#121214] p-5 transition-colors hover:border-blue-500/30">
        {/* BG SVG decorator */}
        <svg
          className="pointer-events-none absolute right-0 bottom-0 h-28 w-28 text-blue-500/5"
          viewBox="0 0 100 100"
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-blue-500" />
          <span className="text-base font-bold text-zinc-100">
            Repositories
          </span>
        </div>
        <div className="mt-3">
          <span className="text-4xl font-black tracking-tight text-zinc-100">
            {totalRepos.toLocaleString()}
          </span>
        </div>
      </div>

      {/* ── Stars Card ── */}
      <div className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-xl border border-zinc-800 bg-[#121214] p-5 transition-colors hover:border-yellow-500/30">
        {/* BG SVG decorator */}
        <svg
          className="pointer-events-none absolute right-0 bottom-0 h-28 w-28 text-yellow-500/5"
          viewBox="0 0 100 100"
        >
          <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-base font-bold text-zinc-100">
            Stars Earned
          </span>
        </div>
        <div className="mt-3">
          <span className="text-4xl font-black tracking-tight text-zinc-100">
            {totalStars.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
/* ─────────────────────────────────────────────────────────────────
   ROW 4 — GITHUB HEATMAP
───────────────────────────────────────────────────────────────── */

const GitHubHeatmap = ({ lastWeeks }) => {
  // 1. Safe Extraction: Ensure it's always an array, even if undefined
  const safeWeeks = lastWeeks || [];
  const hasData = safeWeeks.length > 0;

  // 2. Safely build month label positions
  const monthLabels = [];
  if (hasData) {
    safeWeeks.forEach((week, i) => {
      // Safely access the first day of the week
      const firstDay = week?.contributionDays?.[0];
      if (firstDay?.date) {
        const date = new Date(firstDay.date);
        const isFirstWeekOfMonth = date.getDate() <= 7;
        if (isFirstWeekOfMonth) {
          monthLabels.push({
            index: i,
            label: date.toLocaleString("en-US", { month: "short" }),
          });
        }
      }
    });
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#121214]">
      {/* <svg
        className="pointer-events-none absolute top-0 right-0 h-64 w-64 text-emerald-500/5"
        viewBox="0 0 100 100"
      >
        <circle cx="100" cy="0" r="80" fill="currentColor" />
      </svg> */}
      {/* ── Header (Always Visible) ── */}
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-800 bg-[#0d0d0f] px-6 py-3">
        <div className="flex items-center gap-3">
          <Github className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-black tracking-tight text-zinc-100">
            Contribution Matrix
          </span>
          <span className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[9px] font-bold tracking-widest text-zinc-500 uppercase">
            Last 1 Year
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold tracking-widest text-zinc-600 uppercase">
              Less
            </span>
            {["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].map(
              (c, i) => (
                <span
                  key={i}
                  className="h-3 w-3 rounded-[2px]"
                  style={{
                    backgroundColor: c,
                    outline: "1px solid rgba(255,255,255,0.05)",
                  }}
                />
              ),
            )}
            <span className="text-[9px] font-bold tracking-widest text-zinc-600 uppercase">
              More
            </span>
          </div>
        </div>
      </div>

      {/* ── Grid Body (With Fallback) ── */}
      <div className="scrollbar-hide flex gap-3 overflow-x-hidden p-6">
        {hasData ? (
          <div className="flex min-w-max flex-1 flex-col gap-1">
            {/* Month labels row */}
            <div className="relative mr-4 mb-1 h-4">
              {monthLabels.map(({ index, label }) => (
                <span
                  key={label + index}
                  className="absolute text-[9px] font-bold tracking-widest text-zinc-500 uppercase"
                  style={{ left: `${(index / safeWeeks.length) * 100}%` }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Heatmap cells */}
            <div className="flex w-full justify-between gap-[3px]">
              {safeWeeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-[3px]">
                  {/* Safely map over the days, defaulting to empty array if missing */}
                  {(week?.contributionDays || []).map((day, j) => {
                    const count = day?.contributionCount || 0;
                    const isZero = count === 0;
                    return (
                      <div
                        key={j}
                        className="group relative h-[14px] w-[14px] shrink-0 rounded-[2px]"
                        style={{
                          backgroundColor: isZero
                            ? "#161b22"
                            : day.color || "#39d353",
                          outline: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {/* Tooltip */}
                        <div className="pointer-events-none absolute -top-9 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center group-hover:flex">
                          <div className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1 text-[9px] font-bold whitespace-nowrap text-zinc-200 shadow-xl">
                            {count > 0
                              ? `${count} contributions`
                              : "No contributions"}{" "}
                            · {day?.date || "Unknown date"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // ── The Empty State Fallback ──
          <div className="flex h-[110px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-[#18181b]/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mb-2 h-6 w-6 text-zinc-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
              />
            </svg>
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
              No Contribution Data Available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

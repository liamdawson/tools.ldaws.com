import { useState } from "react";

const defaultModeOptions = [
  { name: "None", mode: "" },
  { name: "Party", mode: "/p" },
  { name: "Say", mode: "/s" },
  { name: "Alliance", mode: "/a" },
  { name: "FC", mode: "/fc" },
  { name: "Custom", mode: "custom" },
];

const timestampPrefix = String.raw`(\[\d+:\d+] ?)`;
const playerNameFormat = String.raw`[A-Z][A-z']*[a-z] [A-Z][A-z']*[a-z]`;
const fcChatPrefix = String.raw`\[FC]<${playerNameFormat}>`;
const lsChatPrefix = String.raw`\[\d+]<${playerNameFormat}>`;
const cwlsChatPrefix = String.raw`\[CWLS\d+]<${playerNameFormat}>`;
const partyChatPrefix = String.raw`\([^\)]?${playerNameFormat}\)`;
const tellChatPrefix = String.raw`(?:>> ${playerNameFormat}:|${playerNameFormat} >>)`;
const localChatPrefix = String.raw`${playerNameFormat}:`;
const noviceChatPrefix = String.raw`\[Novice] ${playerNameFormat}:`;

const chatPrefixRegex = new RegExp(
  `^${timestampPrefix}?(?:${fcChatPrefix}|${lsChatPrefix}|${cwlsChatPrefix}|${partyChatPrefix}|${tellChatPrefix}|${localChatPrefix}|${noviceChatPrefix}) `
);

function transformLine(line: string, strip?: boolean) {
  return (strip ? line.replace(chatPrefixRegex, "") : line).replace(
    /^\/[A-z]+ /,
    ""
  );
}

function convert(input: string, mode?: string, strip?: boolean) {
  return input
    .split(/\r?\n/)
    .filter((line) => line)
    .map((line) => transformLine(line, strip))
    .map((line) => `${mode ? mode + " " : ""}${line}`)
    .join("\n");
}

export default function MacroChatModeConverter() {
  const [selectedModeName, setSelectedModeName] = useState("Party");
  const [targetMode, setTargetMode] = useState("/p");
  const [customMode, setCustomMode] = useState("");
  const [macroText, setMacroText] = useState("");
  const [stripPrefixes, setStripPrefixes] = useState(false);

  return (
    <section className="lg:columns-2 gap-8">
      <div className="break-inside-avoid-column py-6 md:py-4 lg:py-2">
        <h3 className="text-lg font-bold pb-2">Original</h3>
        <textarea
          value={macroText}
          placeholder="Input macro here..."
          className="block bg-slate-700 w-full"
          rows="15"
          onChange={(e) => setMacroText(e.target.value)}
        ></textarea>
        <div>
          {defaultModeOptions.map(({ name, mode }) => (
            <label key={name} className="px-2 py-1 inline-flex items-center">
              <input
                type="radio"
                name="selectedChatMode"
                checked={name === selectedModeName}
                className="mr-1"
                onChange={() => {
                  setSelectedModeName(name);
                  setTargetMode(mode !== "custom" ? mode : customMode);
                }}
              />
              {mode !== "custom" ? (
                name
              ) : (
                <input
                  type="text"
                  placeholder="Custom..."
                  value={customMode}
                  className="bg-slate-700 p-0 w-24"
                  onChange={(e) => {
                    setCustomMode(e.target.value);
                    setTargetMode(e.target.value);
                    setSelectedModeName(name);
                  }}
                />
              )}
            </label>
          ))}
          <br />
          <label className="px-2 py-1 inline-flex items-center">
            <input
              type="checkbox"
              value={stripPrefixes}
              className="mr-1"
              onChange={(e) => setStripPrefixes(e.target.checked)}
            />
            <div>
              Remove in-game chat info
              <small className="ml-2 py-0.5 px-2 bg-red-900 text-sm rounded-xl">
                (Experimental)
              </small>
            </div>
          </label>
        </div>
      </div>

      <div className="break-inside-avoid-column py-6 md:py-4 lg:py-2">
        <h3 className="text-lg font-bold pb-2">Result</h3>
        <textarea
          value={convert(macroText, targetMode, stripPrefixes)}
          placeholder="Result appears here..."
          className="block bg-slate-700 w-full"
          readOnly={true}
          rows="15"
        ></textarea>
      </div>
    </section>
  );
}

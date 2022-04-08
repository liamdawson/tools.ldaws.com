import { useState } from "react";

const defaultModeOptions = [
  { name: "None", mode: "" },
  { name: "Party", mode: "/p" },
  { name: "Say", mode: "/s" },
  { name: "Alliance", mode: "/a" },
  { name: "FC", mode: "/fc" },
  { name: "Custom", mode: "custom" },
];

function convert(input: string, mode?: string) {
  return input
    .split(/\r?\n/)
    .filter((line) => line)
    .map((line) => line.replace(/^\/[a-z]+ /, ""))
    .map((line) => `${mode ? mode + " " : ""}${line}`)
    .join("\n");
}

export default function FFXIVMacroChatModeConverter() {
  const [selectedModeName, setSelectedModeName] = useState("Party");
  const [targetMode, setTargetMode] = useState("/p");
  const [customMode, setCustomMode] = useState("");
  const [macroText, setMacroText] = useState("");

  return (
    <section class="columns-md gap-8">
      <h3 class="text-lg font-bold pb-2">Original</h3>
      <textarea
        value={macroText}
        placeholder="Input macro here..."
        class="block bg-slate-700 w-full"
        rows="15"
        onChange={(e) => setMacroText(e.target.value)}
      ></textarea>
      <div>
        {defaultModeOptions.map(({ name, mode }) => (
          <label key={name} class="px-2 py-1 inline-block">
            <input
              type="radio"
              name="selectedChatMode"
              checked={name === selectedModeName}
              class="mr-1"
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
                class="bg-slate-700 p-0 w-24"
                onChange={(e) => {
                  setCustomMode(e.target.value);
                  setTargetMode(e.target.value);
                  setSelectedModeName(name);
                }}
              />
            )}
          </label>
        ))}
      </div>
      <h3 class="text-lg font-bold pb-2">Result</h3>
      <textarea
        value={convert(macroText, targetMode)}
        placeholder="Result appears here..."
        class="block bg-slate-700 w-full"
        readOnly={true}
        rows="15"
      ></textarea>
    </section>
  );
}

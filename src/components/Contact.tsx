import { IconContext } from "react-icons";
import {
  RiDiscordFill,
  RiTwitterFill,
  RiMailFill,
  RiGithubFill,
} from "react-icons/ri/index.js";

interface ContactProps {
  credits?: {
    ffxiv?: boolean;
    discord?: boolean;
  };
}

export default function Contact(props: ContactProps) {
  const creditsSegments = [];
  let credits = <></>;

  if (props.credits?.ffxiv) {
    creditsSegments.push(<>Jester Fraud on Ravana</>);
  }

  if (props.credits?.discord) {
    creditsSegments.push(
      <span className="inline-block bg-slate-700 px-2 py-0.5 rounded-xl">
        <RiDiscordFill title="Discord" size={16} /> jesterfraud#3678
      </span>
    );
  }

  if (creditsSegments.length > 0) {
    credits = (
      <>
        By{" "}
        {creditsSegments.reduce((acc, segment) =>
          acc === null ? (
            segment
          ) : (
            <>
              {acc}, {segment}
            </>
          )
        )}
        .<br />
      </>
    );
  }

  return (
    <IconContext.Provider value={{ className: "inline-block" }}>
      <footer className="pt-12 text-center">
        <p className="pb-6">
          {credits}
          Have suggestions, corrections, or nice things to say? Contact me:
        </p>

        <a
          className="inline-flex items-center justify-center px-2 py-1"
          href="https://github.com/liamdawson/tools.ldaws.com/issues/new/choose"
          target="_blank"
        >
          <RiGithubFill size="32" title="GitHub" /> Open an issue on GitHub
        </a>

        <div className="flex justify-center">
          <a
            className="inline-block p-2"
            href="https://twitter.com/liamdaws/"
            target="_blank"
          >
            <RiTwitterFill size="24" title="Twitter" />
          </a>
          <a
            className="inline-block p-2"
            href="mailto:liam@ldaws.com"
            target="_blank"
          >
            <RiMailFill size="24" title="Email" />
          </a>
        </div>
      </footer>
    </IconContext.Provider>
  );
}

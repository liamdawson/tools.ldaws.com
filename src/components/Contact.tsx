import { RiDiscordFill, RiTwitterFill, RiMailFill } from "react-icons/ri";

export default function Contact() {
  return (
    <footer className="pt-12 text-center">
      <p className="pb-6">
        Have suggestions, corrections, or nice things to say? Contact me:
      </p>

      <a
        className="inline-flex items-center justify-center px-2 py-1"
        href="https://discord.com/users/168183362773712898"
        target="_blank"
      >
        <RiDiscordFill size="32" title="Discord" />
        <span className="pl-2">jesterfraud#3678</span>
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
  );
}

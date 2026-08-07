import { MaskHeading } from "./MaskHeading";

type SectionProps = {
  id: string;
  /** Small mono kicker rendered beside the heading, e.g. "02". */
  index: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-16 sm:py-20">
      <div className="mb-10">
        <MaskHeading index={index} title={title} />
      </div>
      {children}
    </section>
  );
}

type ContactInfoItemProps = {
  iconSrc: string;
  title: string;
  lines: string[];
};

export function ContactInfoItem({ iconSrc, title, lines }: ContactInfoItemProps) {
  return (
    <div className="flex gap-7.5">
      <img src={iconSrc} alt={title} className="h-6 w-6 shrink-0 mt-1" />
      <div>
        <h3 className="text-2xl font-medium text-over-primary">{title}</h3>
        {lines.map((line, i) => (
          <p key={i} className={i === 0 ? "mt-1" : undefined}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

const SectionHeader = ({ title }) => (
  <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark pb-2">
    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">
      {title}
    </h3>
  </div>
);

export default SectionHeader;

const Components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold my-6" {...props} />
  ),

  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold my-4" {...props} />
  ),

  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-semibold my-3" {...props} />
  ),

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-2 text-gray-700 leading-[2]" {...props} />
  ),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 my-2" {...props} />
  ),

  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="my-1 text-gray-700" {...props} />
  ),

  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold" {...props} />
  ),

  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <table className="min-w-full border-collapse border border-gray-300" {...props} />
  ),

  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-gray-300 px-4 py-2 text-left font-semibold" {...props} />
  ),

  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-gray-300 px-4 py-2" {...props} />
  ),

  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-gray-100" {...props} />
  ),

  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-200" {...props} />
  ),

  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="bg-white" {...props} />
  ),
}

export default Components

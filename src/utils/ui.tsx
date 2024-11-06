export const highlightSol = (code: string) => {
  const lines = code.split("\n");

  return lines.map((line, index) => {
    // Combined regex to capture special comments, regular comments, keywords, numbers, strings, and function names
    const highlightedLine = line.replace(
      /(\/\/@[a-zA-Z_]+\s[a-zA-Z_\s\.']*|\/\/[^\n]*|\/\*[\s\S]*?\*\/|\b(contract|import|pragma|Core|Contract|ERC20|ERC721|Uniswap|Oracle|Proxy|Logic|Modular|EntryPoint|Paymaster|Wallet|using|for|function|require|uint|int|address|bool|mapping|string|public|private|external|view|returns|memory|storage)\b|\d+|"([^"]*)"|'([^']*)'|([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()|\b([a-zA-Z_][a-zA-Z0-9_]*)\b(?!\s*\())/g,
      (match, p1, p2, p3, p4, p5, p6) => {
        // Match special //@word comments
        if (/^\/\/@[a-zA-Z_]+\s[a-zA-Z_\s]*/.test(match)) {
          if (match.startsWith("//@param")) {
            let [nat, param, ...rest] = match.split(" ");
            return `<span class="sol-comment-single">${nat.slice(0, 2)}</span><span class="sol-nat">${
              nat.slice(2) + " " + param
            }</span> <span class="sol-comment-single">${rest.join(" ")}</span>`;
          }

          let [nat, ...rest] = match.split(" ");
          return `<span class="sol-comment-single">${nat.slice(0, 2)}</span><span class="sol-nat">${nat.slice(
            2
          )}</span> <span class="sol-comment-single">${rest.join(" ")}</span>`;
        }
        // Match regular single-line comments
        if (match.startsWith("//")) {
          return `<span class="sol-comment-single">${match}</span>`;
        }
        // Match multi-line comments
        if (match.startsWith("/*")) {
          return `<span class="sol-comment-multi">${match}</span>`;
        }

        // Match keywords
        if (p2) {
          return `<span class="sol-keyword">${p2}</span>`;
        }
        // Match function names (e.g., functionName() during definition)
        if (p5) {
          return `<span class="sol-function-name">${p5}</span>`;
        }
        // Match numbers
        if (/\d+/.test(match)) {
          return `<span class="sol-number">${match}</span>`;
        }
        // Match double-quoted strings
        if (p3) {
          return `<span class="sol-string">"${p3}"</span>`;
        }
        // Match single-quoted strings
        if (p4) {
          return `<span class="sol-string">'${p4}'</span>`;
        }

        // Return the original match for anything else (e.g., symbols)
        return match;
      }
    );

    // Return JSX for each line
    return <p key={index} dangerouslySetInnerHTML={{ __html: highlightedLine }} className="m-1" />;
  });
};

export const highlightParagraph = (text: string) => {
  const regex = /^([\w\s]+)\s*:\s*(.+)$/;
  const match = text.match(regex);
  if (!match) return <p>text</p>;

  const title = match[1];
  const content = match[2];

  function capitalize(words: string) {
    return words
      .toLowerCase()
      .replace(/(?:^|\s)\w/g, (m) => m.toUpperCase())
      .replace(/\s+/g, "");
  }
  return (
    <>
      <h3 className="inline-block text-orange-300 text-2xl">{capitalize(title)}</h3>
      <span className="text-[#FF6980]"> {"{"}</span>
      <p className="text-secondary-content pl-4 text-sm font-thin">
        {"/*"} {content.toLocaleLowerCase()} {"*/"}
      </p>
      <span className="text-[#FF6980]">{"}"}</span>
    </>
  );
};
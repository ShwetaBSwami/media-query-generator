function generateMediaQueries(classes) {
  const breakpoints = {
    xs: "@media (max-width: 576px)",
    sm: "@media (min-width: 577px) and (max-width: 768px)",
    md: "@media (min-width: 769px) and (max-width: 992px)",
    lg: "@media (min-width: 993px) and (max-width: 1200px)",
    xl: "@media (min-width: 1201px) and (max-width: 1400px)",
    xxl: "@media (min-width: 1401px)",
  };

  const outputCss = [];
  const xsCss = [];
  const smCss = [];
  const mdCss = [];
  const lgCss = [];
  const xlCss = [];
  const xxlCss = [];

  const cssValues = classes.split("}").filter((rule) => rule.trim());
  const nonMediaRules = cssValues.filter((rule) => !rule.includes("@media"));

  const processedSelectors = new Set();

  const processDeclarations = (declarations, multiplier) => {
    return declarations
      .split(";")
      .map((decl) => {
        const [prop, value] = decl.split(":").map((part) => part.trim());
        if (!value) return decl;

        if (isNaN(parseFloat(value))) {
          return `${prop}: ${value}`;
        }

        switch (prop) {
          case "font-size":
            return `${prop}: calc(${value} * ${multiplier.fontSize})`;
          case "width":
          case "height":
            return `${prop}: calc(${value} * ${multiplier.dimension})`;
          case "margin":
          case "padding":
            return `${prop}: calc(${value} * ${multiplier.spacing})`;
          case "line-height":
            return `${prop}: calc(${value} * ${multiplier.lineHeight})`;
          default:
            return `${prop}: ${value}`;
        }
      })
      .join("; ");
  };

  const multipliers = {
    xs: { fontSize: 1, dimension: 1, spacing: 0.9, lineHeight: 0.85 },
    sm: { fontSize: 1, dimension: 1.2, spacing: 1, lineHeight: 0.85 },
    md: { fontSize: 1.1, dimension: 1.4, spacing: 1.1, lineHeight: 0.92 },
    lg: { fontSize: 1.2, dimension: 1.6, spacing: 1.2, lineHeight: 0.87 },
    xl: { fontSize: 1.3, dimension: 1.8, spacing: 1.3, lineHeight: 0.9 },
    xxl: { fontSize: 1.4, dimension: 2, spacing: 1.4, lineHeight: 0.95 },
  };

  nonMediaRules.forEach((rule) => {
    const [selectors, declarations] = rule
      .split("{")
      .map((part) => part.trim());

    if (declarations && !processedSelectors.has(selectors)) {
      processedSelectors.add(selectors);
      outputCss.push(`${selectors} { ${declarations} }`);

      xsCss.push(
        `${selectors} { ${processDeclarations(declarations, multipliers.xs)} }`
      );
      smCss.push(
        `${selectors} { ${processDeclarations(declarations, multipliers.sm)} }`
      );
      mdCss.push(
        `${selectors} { ${processDeclarations(declarations, multipliers.md)} }`
      );
      lgCss.push(
        `${selectors} { ${processDeclarations(declarations, multipliers.lg)} }`
      );
      xlCss.push(
        `${selectors} { ${processDeclarations(declarations, multipliers.xl)} }`
      );
      xxlCss.push(
        `${selectors} { ${processDeclarations(declarations, multipliers.xxl)} }`
      );
    }
  });

  const finalCss = [
    ...outputCss,
    `${breakpoints.xs} { ${xsCss.join(" ")} }`,
    `${breakpoints.sm} { ${smCss.join(" ")} }`,
    `${breakpoints.md} { ${mdCss.join(" ")} }`,
    `${breakpoints.lg} { ${lgCss.join(" ")} }`,
    `${breakpoints.xl} { ${xlCss.join(" ")} }`,
    `${breakpoints.xxl} { ${xxlCss.join(" ")} }`,
  ].join(" ");

  return finalCss;
}

module.exports = generateMediaQueries;

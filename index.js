function generateMediaQueries(cssString) {
  console.log("Input CSS:", cssString);

  const breakpoints = {
    mobile: "@media (max-width: 600px)",
    tablet: "@media (max-width: 768px)",
  };

  const outputCss = [];
  const mobileCss = [];
  const tabletCss = [];

  const cssRules = cssString.split("}").filter((rule) => rule.trim());

  cssRules.forEach((rule) => {
    const [selectors, declarations] = rule
      .split("{")
      .map((part) => part.trim());

    if (declarations) {
      outputCss.push(`${selectors} { ${declarations} }`);

      const mobileDeclarations = declarations
        .split(";")
        .map((decl) => {
          const [prop, value] = decl.split(":").map((part) => part.trim());
          if (!value) return decl;

          switch (prop) {
            case "font-size":
              return `${prop}: calc(${value} * 0.8)`;
            case "width":
            case "height":
              return `${prop}: calc(${value} * 0.9)`;
            case "margin":
            case "padding":
              return `${prop}: calc(${value} * 0.85)`;
            case "line-height":
              return `${prop}: calc(${value} * 0.85)`;
            default:
              return decl;
          }
        })
        .join("; ");

      const tabletDeclarations = declarations
        .split(";")
        .map((decl) => {
          const [prop, value] = decl.split(":").map((part) => part.trim());
          if (!value) return decl;

          switch (prop) {
            case "font-size":
              return `${prop}: calc(${value} * 0.9)`;
            case "width":
            case "height":
              return `${prop}: calc(${value} * 0.95)`;
            case "margin":
            case "padding":
              return `${prop}: calc(${value} * 0.90)`;
            case "line-height":
              return `${prop}: calc(${value} * 0.92)`;
            default:
              return decl;
          }
        })
        .join("; ");

      mobileCss.push(`${selectors} { ${mobileDeclarations} }`);
      tabletCss.push(`${selectors} { ${tabletDeclarations} }`);
    }
  });

  const finalCss = [
    ...outputCss,
    `${breakpoints.mobile} { ${mobileCss.join(" ")} }`,
    `${breakpoints.tablet} { ${tabletCss.join(" ")} }`,
  ].join(" ");

  console.log("Output CSS:", finalCss);

  return finalCss;
}

module.exports = generateMediaQueries;

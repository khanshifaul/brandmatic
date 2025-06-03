module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/styles/",
      files: [
        {
          destination: "_variables.css",
          format: "css/variables",
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      buildPath: "src/styles/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables",
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "src/styles/",
      files: [
        {
          destination: "variables.js",
          format: "javascript/es6",
          options: {
            showFileHeader: false,
          },
        },
      ],
    },
  },
  transform: {
    "size/px": {
      type: "value",
      matcher: function (prop) {
        return prop.attributes.category === "size";
      },
      transformer: function (prop) {
        return `${prop.value}px`;
      },
    },
    "size/rem": {
      type: "value",
      matcher: function (prop) {
        return (
          prop.attributes.category === "size" ||
          prop.attributes.category === "spacing" ||
          prop.attributes.category === "fontSize" ||
          prop.attributes.category === "lineHeight" ||
          prop.attributes.category === "borderRadius"
        );
      },
      transformer: function (prop) {
        return `${parseFloat(prop.value) / 16}rem`;
      },
    },
  },
}; 
export const tsmd = {
  "displayName": "TypeScript-Markdown",
  "name": "tsmd",
  "scopeName": "source.tsmd",
  "fileTypes": ["tsmd"],
  "patterns": [
    {
      "include": "#tsmd-file"
    }
  ],
  "repository": {
    "tsmd-file": {
      "patterns": [
        {
          "include": "#tsmd-function"
        },
        {
          "include": "source.ts"
        }
      ]
    },
      "tsmd-function": {
        "begin": "(?:(export)(?:\\s+(default))?\\s+)?(?:(async)\\s+)?(function)\\s+(?:([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*)?\\([\\s\\S]*?\\)\\s*\\{",
        "end": "\\}",
        "beginCaptures": {
          "1": { "name": "keyword.control.export.ts" },
          "2": { "name": "keyword.control.default.ts" },
          "3": { "name": "storage.modifier.async.ts" },
          "4": { "name": "storage.type.function.ts" },
          "5": { "name": "entity.name.function.ts" }
        },
      "patterns": [
        {
          "include": "#tsmd-return-statement"
        },
        {
          "include": "source.ts"
        }
      ]
    },
      "tsmd-return-statement": {
        "begin": "\\breturn\\s*\\(\\s*\\n",
        "end": "^\\s*\\)",
      "beginCaptures": {
        "0": {
          "name": "keyword.control.flow.tsmd"
        }
      },
      "patterns": [
        {
          "include": "#markdown-content"
        }
      ]
    },
    "markdown-content": {
      "name": "meta.embedded.block.markdown",
      "patterns": [
        {
          "include": "#interpolation"
        },
        {
          "include": "#component-tag"
        },
        {
          "include": "#markdown-heading"
        },
        {
          "include": "#markdown-list"
        },
        {
          "include": "#markdown-bold"
        },
        {
          "include": "#markdown-italic"
        },
        {
          "include": "#markdown-code"
        },
        {
          "include": "#markdown-link"
        }
      ]
    },
    "interpolation": {
      "name": "meta.embedded.expression.tsmd",
      "begin": "\\{\\{",
      "end": "\\}\\}",
      "beginCaptures": {
        "0": {
          "name": "punctuation.section.embedded.begin.tsmd"
        }
      },
      "endCaptures": {
        "0": {
          "name": "punctuation.section.embedded.end.tsmd"
        }
      },
      "patterns": [
        {
          "include": "source.ts"
        }
      ]
    },
    "component-tag": {
      "name": "meta.tag.component.tsmd",
      "begin": "<@([A-Z][a-zA-Z0-9]*)",
      "end": "/>",
      "beginCaptures": {
        "0": {
          "name": "punctuation.definition.tag.begin.tsmd"
        },
        "1": {
          "name": "entity.name.tag.component.tsmd"
        }
      },
      "endCaptures": {
        "0": {
          "name": "punctuation.definition.tag.end.tsmd"
        }
      },
      "patterns": [
        {
          "include": "#jsx-attributes"
        }
      ]
    },
    "jsx-attributes": {
      "patterns": [
        {
          "match": "([a-zA-Z][a-zA-Z0-9]*)=\\{([^}]*)\\}",
          "captures": {
            "1": {
              "name": "entity.other.attribute-name.tsmd"
            },
            "2": {
              "patterns": [
                {
                  "include": "source.ts"
                }
              ]
            }
          }
        },
        {
          "match": "([a-zA-Z][a-zA-Z0-9]*)=\"([^\"]*)\"",
          "captures": {
            "1": {
              "name": "entity.other.attribute-name.tsmd"
            },
            "2": {
              "name": "string.quoted.double.tsmd"
            }
          }
        }
      ]
    },
      "markdown-heading": {
        "match": "^(?:\\s{0,3})(#{1,6})\\s+(.*)$",
      "name": "markup.heading.markdown",
      "captures": {
        "1": {
          "name": "punctuation.definition.heading.markdown"
        },
        "2": {
          "name": "entity.name.section.markdown",
          "patterns": [
            {
              "include": "#interpolation"
            }
          ]
        }
      }
    },
    "markdown-list": {
      "match": "^\\s*(-|\\*|\\+|\\d+\\.)\\s+",
      "name": "punctuation.definition.list.begin.markdown"
    },
    "markdown-bold": {
      "match": "(\\*\\*|__)([^*_]+)(\\*\\*|__)",
      "name": "markup.bold.markdown",
      "captures": {
        "1": {
          "name": "punctuation.definition.bold.markdown"
        },
        "2": {
          "name": "markup.bold.markdown"
        },
        "3": {
          "name": "punctuation.definition.bold.markdown"
        }
      }
    },
    "markdown-italic": {
      "match": "(\\*|_)([^*_]+)(\\*|_)",
      "name": "markup.italic.markdown",
      "captures": {
        "1": {
          "name": "punctuation.definition.italic.markdown"
        },
        "2": {
          "name": "markup.italic.markdown"
        },
        "3": {
          "name": "punctuation.definition.italic.markdown"
        }
      }
    },
    "markdown-code": {
      "match": "`([^`]+)`",
      "name": "markup.raw.inline.markdown",
      "captures": {
        "0": {
          "name": "punctuation.definition.raw.markdown"
        },
        "1": {
          "name": "markup.raw.inline.markdown"
        }
      }
    },
    "markdown-link": {
      "match": "\\[([^\\]]+)\\]\\(([^)]+)\\)",
      "name": "meta.link.inline.markdown",
      "captures": {
        "1": {
          "name": "string.other.link.title.markdown"
        },
        "2": {
          "name": "markup.underline.link.markdown"
        }
      }
    }
  }
}

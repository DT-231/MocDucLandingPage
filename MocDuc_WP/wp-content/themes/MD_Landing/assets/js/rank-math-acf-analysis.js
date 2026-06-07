(function (wp, window, document) {
  if (!wp || !wp.hooks) {
    return;
  }

  const config = window.mocducRankMathAcf || {};
  const fieldsByPostType = config.fields || {};
  const postType = config.postType || "";
  const fieldNames = fieldsByPostType[postType] || [];

  if (!fieldNames.length) {
    return;
  }

  const stripHtml = (value) => {
    const node = document.createElement("div");
    node.innerHTML = value || "";
    return (node.textContent || node.innerText || "").replace(/\s+/g, " ").trim();
  };

  const getTinyMceValue = (textarea) => {
    if (!window.tinymce || !textarea || !textarea.id) {
      return "";
    }

    const editor = window.tinymce.get(textarea.id);
    return editor && !editor.isHidden() ? editor.getContent() : "";
  };

  const getFieldValue = (fieldName) => {
    const wrapper = document.querySelector(`.acf-field[data-name="${fieldName}"]`);

    if (!wrapper) {
      return "";
    }

    const textarea = wrapper.querySelector("textarea");
    const tinyMceValue = getTinyMceValue(textarea);

    if (tinyMceValue) {
      return tinyMceValue;
    }

    const values = Array.from(
      wrapper.querySelectorAll("textarea, input[type='text'], input[type='url'], input[type='number'], select")
    )
      .map((element) => {
        if (element.tagName === "SELECT") {
          const selected = element.options[element.selectedIndex];
          return selected ? selected.text : "";
        }

        return element.value || "";
      })
      .filter(Boolean);

    return values.join(" ");
  };

  const collectAcfContent = () =>
    fieldNames
      .map(getFieldValue)
      .map(stripHtml)
      .filter(Boolean)
      .join(" ");

  wp.hooks.addFilter("rank_math_content", "mocduc/acf-content", function (content) {
    return `${content || ""} ${collectAcfContent()}`.trim();
  });

  wp.hooks.addFilter("rank_math_title", "mocduc/acf-title", function (title) {
    const acfTitle = stripHtml(getFieldValue("title"));
    return acfTitle || title;
  });

  const refreshRankMath = () => {
    if (!window.rankMathEditor || typeof window.rankMathEditor.refresh !== "function") {
      return;
    }

    window.rankMathEditor.refresh("content");
    window.rankMathEditor.refresh("title");
  };

  const debounce = (callback, delay) => {
    let timer;
    return function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(callback, delay);
    };
  };

  const debouncedRefresh = debounce(refreshRankMath, 350);

  document.addEventListener("input", function (event) {
    if (event.target.closest(".acf-field")) {
      debouncedRefresh();
    }
  });

  document.addEventListener("change", function (event) {
    if (event.target.closest(".acf-field")) {
      debouncedRefresh();
    }
  });

  if (window.tinymce) {
    window.tinymce.on("AddEditor", function (event) {
      event.editor.on("change keyup", debouncedRefresh);
    });
  }
})(window.wp, window, document);

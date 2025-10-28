/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/carousel/edit.js":
/*!*********************************!*\
  !*** ./src/js/carousel/edit.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_media_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/media-utils */ "@wordpress/media-utils");
/* harmony import */ var _wordpress_media_utils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_media_utils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);







async function fetchInlineSVG(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const text = await response.text();
    const match = text.match(/<svg[\s\S]*<\/svg>/i);
    return match ? match[0] : null;
  } catch (err) {
    console.error("SVG laden fehlgeschlagen:", err);
    return null;
  }
}
function Edit({
  attributes,
  setAttributes
}) {
  const {
    slidesPerView,
    spaceBetween,
    loop,
    navigation,
    pagination,
    autoplay,
    autoplaySpeed,
    speed,
    breakpoints = []
  } = attributes;

  // Dynamische Klasse bauen
  const slideCountClass = slidesPerView ? `ud-shows-${slidesPerView}-slides` : "";

  // Breakpoint hinzufügen
  const addBreakpoint = () => {
    setAttributes({
      breakpoints: [...breakpoints, {}]
    });
  };

  // Breakpoint ändern
  const updateBreakpoint = (index, key, value) => {
    const newBps = [...breakpoints];
    newBps[index][key] = value;
    setAttributes({
      breakpoints: newBps
    });
  };

  // Breakpoint löschen
  const removeBreakpoint = index => {
    const newBps = [...breakpoints];
    newBps.splice(index, 1);
    setAttributes({
      breakpoints: newBps
    });
  };
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: ["ud-carousel-block", slideCountClass].filter(Boolean).join(" ")
  });
  const HasImageControl = typeof ImageControl !== "undefined";

  // Pfeil: → zentraler onSelect: speichert SVG inline (wenn SVG) oder URL (Raster)
  const onSelectArrow = async media => {
    if (!media?.url) return;
    if (media.url.endsWith(".svg")) {
      const svgMarkup = await fetchInlineSVG(media.url);
      setAttributes({
        customNextArrow: svgMarkup
      });
    } else {
      setAttributes({
        customNextArrow: media.url
      });
    }
  };

  // Upload-Button: echte Datei-Uploads (ohne Mediathek-Modal)
  const handleUpload = event => {
    const files = event?.target?.files;
    if (!files?.length) return;
    (0,_wordpress_media_utils__WEBPACK_IMPORTED_MODULE_4__.uploadMedia)({
      filesList: files,
      onFileChange: ([file]) => onSelectArrow(file),
      onError: msg => console.error("Upload fehlgeschlagen:", msg),
      allowedTypes: ["image"]
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Carousel Einstellungen", "carousel-block-ud"),
        initialOpen: true,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Slides pro View", "carousel-block-ud"),
          value: slidesPerView,
          onChange: value => setAttributes({
            slidesPerView: value
          }),
          min: 1,
          max: 6,
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Abstand zwischen Slides (px)", "carousel-block-ud"),
          value: spaceBetween,
          onChange: value => setAttributes({
            spaceBetween: value
          }),
          min: 0,
          max: 100,
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Animation Speed (ms)", "carousel-block-ud"),
          value: speed,
          onChange: value => setAttributes({
            speed: value
          }),
          min: 100,
          max: 5000,
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Loop aktivieren", "carousel-block-ud"),
          checked: loop,
          onChange: value => setAttributes({
            loop: value
          }),
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Navigation anzeigen", "carousel-block-ud"),
          checked: navigation,
          onChange: value => setAttributes({
            navigation: value
          }),
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Pagination anzeigen", "carousel-block-ud"),
          checked: pagination,
          onChange: value => setAttributes({
            pagination: value
          }),
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Autoplay aktivieren", "carousel-block-ud"),
          checked: autoplay,
          onChange: value => setAttributes({
            autoplay: value
          }),
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        }), autoplay && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Autoplay Speed (ms)", "carousel-block-ud"),
          value: autoplaySpeed,
          onChange: value => setAttributes({
            autoplaySpeed: value
          }),
          min: 1000,
          max: 10000,
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Breakpoints", "carousel-block-ud"),
        initialOpen: false,
        children: [breakpoints.map((bp, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          style: {
            marginBottom: "1em",
            borderBottom: "1px solid #ddd",
            paddingBottom: "0.5em"
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Breite (px)", "carousel-block-ud"),
            type: "number",
            value: bp.width,
            onChange: value => updateBreakpoint(index, "width", parseInt(value)),
            __next40pxDefaultSize: true,
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Slides pro View", "carousel-block-ud"),
            value: bp.slidesPerView,
            onChange: value => updateBreakpoint(index, "slidesPerView", value),
            min: 1,
            max: 6,
            __next40pxDefaultSize: true,
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
            variant: "destructive",
            size: "small",
            onClick: () => removeBreakpoint(index),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Löschen", "carousel-block-ud")
          })]
        }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
          variant: "primary",
          onClick: addBreakpoint,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Breakpoint hinzufügen", "carousel-block-ud")
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Navigations-Pfeile", "ud-plugin"),
        initialOpen: true,
        children: [!attributes.customNextArrow ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "ud-carousel-arrow-controls",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Pfeil auswählen oder hochladen", "ud-plugin"),
              onSelect: async media => {
                if (!media?.url) return;
                if (media.url.endsWith(".svg")) {
                  const svgMarkup = await fetchInlineSVG(media.url);
                  setAttributes({
                    customNextArrow: svgMarkup
                  });
                } else {
                  setAttributes({
                    customNextArrow: media.url
                  });
                }
              },
              allowedTypes: ["image"],
              multiple: false,
              render: ({
                open
              }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                  onClick: open,
                  variant: "primary",
                  size: "compact",
                  className: "ud-carousel-arrow-upload",
                  __next40pxDefaultSize: true,
                  __nextHasNoMarginBottom: true,
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Hochladen / Mediathek", "ud-plugin")
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
                  className: "ud-help-text",
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Nur den rechten Pfeil hochladen – der linke wird automatisch gespiegelt.", "ud-plugin")
                })]
              })
            })
          })
        }) :
        /*#__PURE__*/
        // Wenn bereits ein Pfeil gewählt wurde → Ändern + Vorschau + Entfernen
        (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "ud-carousel-arrow-existing",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
            className: "ud-carousel-arrow-preview",
            children: String(attributes.customNextArrow).trim().startsWith("<svg") ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "ud-carousel-arrow-svg",
              dangerouslySetInnerHTML: {
                __html: attributes.customNextArrow
              }
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
              src: attributes.customNextArrow,
              alt: "",
              className: "ud-carousel-arrow-image"
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "ud-carousel-arrow-actions",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
                title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Pfeil ändern", "ud-plugin"),
                onSelect: async media => {
                  if (!media?.url) return;
                  if (media.url.endsWith(".svg")) {
                    const svgMarkup = await fetchInlineSVG(media.url);
                    setAttributes({
                      customNextArrow: svgMarkup
                    });
                  } else {
                    setAttributes({
                      customNextArrow: media.url
                    });
                  }
                },
                allowedTypes: ["image"],
                multiple: false,
                render: ({
                  open
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                  onClick: open,
                  variant: "secondary",
                  size: "small",
                  className: "ud-carousel-arrow-change",
                  __next40pxDefaultSize: true,
                  __nextHasNoMarginBottom: true,
                  children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Ändern", "ud-plugin")
                })
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              onClick: () => setAttributes({
                customNextArrow: null
              }),
              iconPosition: "left",
              isDestructive: true,
              variant: "secondary",
              size: "small",
              __next40pxDefaultSize: true,
              __nextHasNoMarginBottom: true,
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Entfernen", "ud-plugin")
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Pfeil-Breite (px)", "ud-plugin"),
          type: "number",
          value: attributes.arrowWidth,
          onChange: value => setAttributes({
            arrowWidth: parseInt(value) || null
          }),
          min: 8,
          max: 36,
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      ...blockProps,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
        allowedBlocks: ["ud/slide-block"],
        orientation: "horizontal"
      })
    })]
  });
}

/***/ }),

/***/ "./src/js/carousel/save.js":
/*!*********************************!*\
  !*** ./src/js/carousel/save.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function save({
  attributes
}) {
  const {
    slidesPerView,
    spaceBetween,
    loop,
    navigation,
    pagination,
    autoplay,
    autoplaySpeed,
    speed,
    breakpoints = [],
    customNextArrow,
    arrowWidth
  } = attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save({
    className: "ud-carousel-block",
    style: {
      "--ud-carousel-arrow-width": arrowWidth ? `${arrowWidth}px` : "24px" // Fallback → global verfügbar im ganzen Block
    },
    "data-slides-per-view": slidesPerView,
    "data-space-between": spaceBetween,
    "data-loop": loop,
    "data-navigation": navigation,
    "data-pagination": pagination,
    "data-autoplay": autoplay,
    "data-autoplay-speed": autoplaySpeed,
    "data-speed": speed,
    "data-breakpoints": JSON.stringify(breakpoints)
  });
  const prevClasses = ["ud-button-prev", "swiper-button-prev", customNextArrow ? "has-custom-arrow" : null].filter(Boolean).join(" ");
  const nextClasses = ["ud-button-next", "swiper-button-next", customNextArrow ? "has-custom-arrow" : null].filter(Boolean).join(" ");
  const renderArrow = () => {
    if (!customNextArrow) return null;

    // Inline-SVG
    if (customNextArrow.startsWith("<svg")) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        dangerouslySetInnerHTML: {
          __html: arrowWidth ? customNextArrow.replace(/<svg([^>]*)>/i, `<svg$1 width="${arrowWidth}px">`) : customNextArrow
        }
      });
    }

    // Fallback IMG
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
      src: customNextArrow,
      alt: "Arrow",
      style: arrowWidth ? {
        width: arrowWidth + "px"
      } : {}
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    ...blockProps,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "swiper",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "swiper-wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {})
      })
    }), pagination && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: "ud-pagination swiper-pagination"
    }), navigation && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: prevClasses,
        children: renderArrow()
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: nextClasses,
        children: renderArrow()
      })]
    })]
  });
}

/***/ }),

/***/ "./src/js/slide/edit.js":
/*!******************************!*\
  !*** ./src/js/slide/edit.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



function Edit({
  clientId
}) {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)();

  // Anzahl Top-Level-Blocks im Slide zählen
  const childBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select("core/block-editor").getBlockOrder(clientId), [clientId]);
  const hasChild = childBlocks.length > 0;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    ...blockProps,
    className: "swiper-slide ud-slide-block",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks, {
      renderAppender: !hasChild ? _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.ButtonBlockAppender : false
    })
  });
}

/***/ }),

/***/ "./src/js/slide/save.js":
/*!******************************!*\
  !*** ./src/js/slide/save.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function save() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "swiper-slide ud-slide-block",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {})
  });
}

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/media-utils":
/*!************************************!*\
  !*** external ["wp","mediaUtils"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["mediaUtils"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/js/editor.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _carousel_edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./carousel/edit */ "./src/js/carousel/edit.js");
/* harmony import */ var _carousel_save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carousel/save */ "./src/js/carousel/save.js");
/* harmony import */ var _slide_edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slide/edit */ "./src/js/slide/edit.js");
/* harmony import */ var _slide_save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./slide/save */ "./src/js/slide/save.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);


// Carousel-Block



// Slide-Block



// eigenes Icon für Carousel

const carouselIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "24",
  height: "24",
  role: "img",
  "aria-hidden": "true",
  focusable: "false",
  fill: "currentColor" // passt sich automatisch an WP-Editor-Farben an
  ,
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
    d: "M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  })]
});
const slideIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "24",
  height: "24",
  role: "img",
  "aria-hidden": "true",
  focusable: "false",
  fill: "currentColor" // passt sich automatisch an WP-Editor-Farben an
  ,
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
    d: "M0 0h24v24H0z",
    fill: "none"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
    d: "m18 6v11h4v-11h-4z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
    d: "m2 17h4v-11h-4v11z"
  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
    d: "m7.0059 4v15.004h9.9902v-15.004h-9.9902zm1.3574 1.3555h7.2773v12.291h-7.2773v-12.291z"
  })]
});

/**
 * Registrierung des Carousel-Blocks
 * (Parent-Block)
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)("ud/carousel-block", {
  icon: carouselIcon,
  // <- hier dein Custom-SVG
  edit: _carousel_edit__WEBPACK_IMPORTED_MODULE_1__["default"],
  save: _carousel_save__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/**
 * Registrierung des Slide-Blocks
 * (Child-Block)
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)("ud/slide-block", {
  icon: slideIcon,
  // <- hier dein Custom-SVG
  edit: _slide_edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _slide_save__WEBPACK_IMPORTED_MODULE_4__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=editor-script.js.map
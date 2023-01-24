"use strict";

console.log("JS Loaded");

/***********
//VARIABLES 
************/
const PDF_MIME_TYPE = "application/pdf";
let selectedDocumentsList = [];

/****************
//HELPER METHODS
*****************/
/* Remove DOM */
const removeDom = (parentDomElement, childDomElement, isDomAdd = false) => {
  parentDomElement &&
    childDomElement &&
    parentDomElement.removeChild(childDomElement);
};
/* Show DOM */
const addDom = (parentDomElement, childDomElement) => {
  parentDomElement &&
    childDomElement &&
    parentDomElement.appendChild(childDomElement);
};

///////////////////
//SEARCH DOCUMENT
///////////////////

/* Remove searched dropdown */
const removeSearchResultDropdown = () => {
  const pdfSerchDom = document.querySelector(".pdf-search");
  const searchItemContainerDom = document.querySelector(
    ".searched-items-conatiner"
  );
  removeDom(pdfSerchDom, searchItemContainerDom);
};

/* Generate serached item dropdown */
const genSerchedItemDom = (showLoader = false, searchResult = null) => {
  let searchedItemDomStr = "";
  if (!showLoader) {
    if (searchResult && searchResult.length > 0) {
      for (let i = 0; i < searchResult.length; i++) {
        searchedItemDomStr = `${searchedItemDomStr}<span class="searched-item" id="${searchResult[i].Id}">${searchResult[i].Name}</span>`;
      }
    } else {
      searchedItemDomStr = `<div class="blank">No matching document found<div>`;
    }
  } else {
    searchedItemDomStr = `<span class="fa fa-spinner search-loader"><span>`;
  }
  let searchResultDom = document.createRange().createContextualFragment(`
          <div class="searched-items-conatiner">
            <div class="searched-items-content">
              ${searchedItemDomStr}
            </div>
          </div>
        `);
  return searchResultDom;
};

/* Show/Hide search result DOM */
const showHideSearchResult = (showLoader = false, searchResult = null) => {
  const pdfSerchDom = document.querySelector(".pdf-search");
  removeSearchResultDropdown();
  let searchResultDom = showLoader
    ? genSerchedItemDom(true)
    : genSerchedItemDom(false, searchResult);
  addDom(pdfSerchDom, searchResultDom);
};

/* Search input field change handler */
const searchInputHandler = (event) => {
  showHideSearchResult(true, null);
  if (event.target.value) {
    PdfMergingHandler.searchPdfFile(event.target.value, (result, event) => {
      if (event.status) {
        showHideSearchResult(false, result);
      } else {
        showHideSearchResult();
      }
    });
  } else {
    showHideSearchResult();
  }
};

///////////////////
//SELECT DOCUMENT
///////////////////

const clearDocViewSection = (docList) => {
  const pdfViewFrameDom = document.getElementById("mergedPdf");
  const docDownloadBtnDom = document.querySelector(
    ".pdf-view-container .download-btn"
  );
  const docOpenNewTabBtn = document.querySelector(".pdf-container .btn");
  if (
    docList &&
    docList.length > 0 &&
    pdfViewFrameDom.src &&
    docDownloadBtnDom &&
    docOpenNewTabBtn
  ) {
    mergePdf(docList);
  } else {
    docDownloadBtnDom.remove();
    docOpenNewTabBtn.remove();
    pdfViewFrameDom.src = "";
  }
};

const deleteDocFromList = (docId) => {
  let findFilteredDocList = selectedDocumentsList.filter(
    (eachDoc) => eachDoc.id !== docId
  );
  selectedDocumentsList = [...findFilteredDocList];
  showSelectedDocList(selectedDocumentsList);
  clearDocViewSection(selectedDocumentsList);
};

const showSelectedDocList = (docList) => {
  let docListDomStr = "";
  let docListContentDom;
  const pdfListWrapperDom = document.querySelector(".selected-pdf-list");
  const pdfListDom = document.querySelector(".pdf-list");
  if (docList && docList.length > 0) {
    for (let i = 0; i < docList.length; i++) {
      docListDomStr = `${docListDomStr}
                        <div class="pdf-item">
                          <div class="pdf-details">
                              <i class="fa fa-file-pdf-o"></i>
                              <span>${docList[i].name}</span>
                          </div>
                          <div class="pdf-item-btns">
                              <div class="icon-btn cross-btn">
                                  <i class="fa fa-times" id="${docList[i].id}"></i>
                              </div>
                          </div>
                        </div>`;
    }
    docListDomStr = `<div class="list-container">${docListDomStr}</div>`;
  } else {
    docListDomStr = `<div class="blank">No document added yet</div>`;
  }
  docListContentDom = document
    .createRange()
    .createContextualFragment(`<div class="pdf-list">${docListDomStr}</div>`);
  removeDom(pdfListWrapperDom, pdfListDom);
  addDom(pdfListWrapperDom, docListContentDom);
};

const selectDocumentHandler = (docId) => {
  if (docId) {
    PdfMergingHandler.getDocDetails(docId, (result, event) => {
      if (event.status) {
        let findDuplicatDocList = selectedDocumentsList.filter(
          (eachDoc) => eachDoc.id === result.id
        );
        if (findDuplicatDocList.length < 1) selectedDocumentsList.push(result);
        showSelectedDocList(selectedDocumentsList);
      }
    });
  }
};

///////////////////
//MERGE DOCUMENT
///////////////////

/* MERGE PDF */
const mergePdf = async (pdfList) => {
  let allCopiedPages = [];
  try {
    if (pdfList && pdfList.length < 1) {
      alert("PLEASE SELECT PDFS FOR MERGING.");
    } else {
      // PDf instance create
      const mergedPdf = await PDFLib.PDFDocument.create();
      for (let i = 0; i < pdfList.length; i++) {
        // Load pdf content
        let loadedPdf = await PDFLib.PDFDocument.load(pdfList[i].body);
        // Copy pages
        let copiedPages = await mergedPdf.copyPages(
          loadedPdf,
          loadedPdf.getPageIndices()
        );
        // Pages list create
        allCopiedPages = [...allCopiedPages, ...copiedPages];
      }
      // Add pges into merged pdf file
      allCopiedPages.forEach((page) => mergedPdf.addPage(page));
      // Save merged pdf file
      const mergedPdfFile = await mergedPdf.save();
      // Merged pdf blob
      const mergedPdfBlob = new Blob([mergedPdfFile], { type: PDF_MIME_TYPE });
      // Load merged pdf
      const mergeDocLink =
        mergedPdfBlob && window.URL.createObjectURL(mergedPdfBlob);
      document.getElementById("mergedPdf").src = mergeDocLink;
      // Create doc donwload dom
      const downloadDocBtn = document.querySelector(".download-btn");
      if (downloadDocBtn) {
        downloadDocBtn.href = mergeDocLink;
      } else {
        let docDownloadBtnDom = document.createRange()
          .createContextualFragment(`
          <a class="icon-btn download-btn" href="${mergeDocLink}" name="Document" download>
            <i class="fa fa-download"></i>
          </a>
        `);
        document
          .querySelector(".pdf-view-container .title")
          .appendChild(docDownloadBtnDom);
      }
      // Create doc view in new tab
      const openDocLinkInNewTabBtn = document.querySelector(
        ".pdf-container .action-wrapper a"
      );
      if (openDocLinkInNewTabBtn) {
        openDocLinkInNewTabBtn.href = mergeDocLink;
      } else {
        let docLinkOpenNewTabDom = document.createRange()
          .createContextualFragment(`
          <div class="btn btn-secondary">
            <div class="action-wrapper">
              <a class="btn-text" href="${mergeDocLink}" target="_blank">Open in new tab</a>
            </div>
          </div>
        `);
        document
          .querySelector(".pdf-container")
          .appendChild(docLinkOpenNewTabDom);
      }
    }
  } catch (exp) {
    console.log("EXCEPTION: ", exp);
    alert("PDF MERGING FAILED.");
  }
};

/****************
//HANDLER METHODS
*****************/

const domInputHandler = (event) => {
  if (event.target.matches("#serachDoc")) {
    searchInputHandler(event);
  }
};

const domClickHandler = (event) => {
  if (event.target.matches("#serachDoc") && event.target.value) {
    searchInputHandler(event);
  } else if (event.target.matches(".searched-item")) {
    selectDocumentHandler(event.target.id);
    removeSearchResultDropdown();
  } else if (event.target.matches(".pdf-item-btns .cross-btn .fa")) {
    deleteDocFromList(event.target.id);
  } else if (
    event.target.matches(".pdf-select-container .action-wrapper") ||
    event.target.matches(".pdf-select-container .btn-text") ||
    event.target.matches(".pdf-select-container .action-wrapper .fa")
  ) {
    mergePdf(selectedDocumentsList);
  } else if (
    !event.target.matches(".searched-items-conatiner") &&
    !event.target.matches(".searched-items-content") &&
    !event.target.matches(".pdf-search .blank") &&
    !event.target.matches(".search-loader")
  ) {
    removeSearchResultDropdown();
  }
};

const initHandlers = () => {
  document.addEventListener("input", domInputHandler);
  window.addEventListener("click", domClickHandler);
};

/****************
// EVENT LISTENER
*****************/
window.addEventListener("load", (event) => {
  initHandlers();
});

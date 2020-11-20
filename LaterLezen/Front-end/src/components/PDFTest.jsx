import workerURL from "./../../src/pdf.worker.data";
import React, { useEffect, useState } from "react";
const pdfjs = require("pdfjs-dist/es5/build/pdf");

pdfjs.GlobalWorkerOptions.workerSrc = workerURL
// "../../node_modules/pdfjs-dist/build/pdf.worker.min.js"

export default function PDFTest(props) {
    let [url, setUrl] = useState("http://www.gpslogbook.com/us/Docs/UserManual.pdf");
    let [page, setPage] = useState(1);


    useEffect(() => {
        console.log("test")

        var pdfDoc = null,
            pageNum = page,
            pageRendering = false,
            pageNumPending = null,
            scale = 2,
            canvas = document.getElementById('the-canvas'),
            ctx = canvas.getContext('2d');

        /**
         * Get page info from document, resize canvas accordingly, and render page.
         * @param num Page number.
         */
        function renderPage(num) {
            pageRendering = true;
            // Using promise to fetch the page
            pdfDoc.getPage(num).then(function (page) {
                var viewport = page.getViewport({ scale: scale });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                // Render PDF page into canvas context
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };
                var renderTask = page.render(renderContext);

                // Wait for rendering to finish
                renderTask.promise.then(function () {
                    pageRendering = false;
                    if (pageNumPending !== null) {
                        // New page rendering is pending
                        renderPage(pageNumPending);
                        pageNumPending = null;
                    }
                });
            });

            // Update page counters
            document.getElementById('page_num').textContent = num;
        }

        /**
         * If another page rendering in progress, waits until the rendering is
         * finised. Otherwise, executes rendering immediately.
         */
        function queueRenderPage(num) {
            if (pageRendering) {
                pageNumPending = num;
            } else {
                renderPage(num);
            }
        }

        /**
         * Displays previous page.
         */
        function onPrevPage() {
            if (pageNum <= 1) {
                return;
            }
            pageNum--;
            queueRenderPage(pageNum);
        }
        // document.getElementById('prev').addEventListener('click', onPrevPage);

        /**
         * Displays next page.
         */
        function onNextPage() {
            if (pageNum >= pdfDoc.numPages) {
                return;
            }
            pageNum++;
            queueRenderPage(pageNum);
        }
        // document.getElementById('next').addEventListener('click', onNextPage);

        /**
         * Asynchronously downloads PDF.
         */
        pdfjs.getDocument(url).promise.then(function (pdfDoc_) {
            pdfDoc = pdfDoc_;
            document.getElementById('page_count').textContent = pdfDoc.numPages;

            // Initial/first page rendering
            renderPage(pageNum);
        });
    })


    return (
        <div>

            <button id="prev" onClick={() => setPage(page-1)}>Previous</button>
            <button id="next" onClick={() => setPage(page+1)}>Next</button>
  &nbsp; &nbsp;
            <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>

            <canvas id="the-canvas"></canvas>
        </div>
    )
}
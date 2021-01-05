const renderPreview = async ({ element, styles, ref }) => {
  // Load pagedjs
  const { Previewer } = await import('pagedjs')
  const paged = new Previewer()


  const flow = await paged.preview(element, styles, ref).catch((error) => {
    console.log('PAGE ERROR', error)
    console.log('--> STYLES', styles)

    throw 'page error'
  })

  console.log('PAGE RENDERED: ', flow.total, ' pages')

  return
}

export const loadDocumentPreview = ({
  documentString,
  previewRef,
  onPreviewLoaded,
  printStyles,
  printStylesFallback,
}) => {
  const ref = previewRef.current
  const element = document.createElement('section')
  element.innerHTML = documentString.trim()

  renderPreview({ element, styles: printStyles, ref })
    .then(onPreviewLoaded)
    .catch(() => {
      // WORKAROUND: If the insertRule of null error occures render page without the page numbers as fallback
      renderPreview({ element, styles: printStylesFallback, ref })
        .then(onPreviewLoaded)
        .catch(onPreviewLoaded)
    })
}

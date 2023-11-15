const renderPage = async ({ element, styles, ref }) => {
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
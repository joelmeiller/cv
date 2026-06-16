import React from 'react'

const CV_APP_URL = 'https://joel.oscillate.ch'

const styles = {
  body: {
    color: '#000',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '8px',
    lineHeight: 1.2,
    margin: 0,
    padding: '4mm',
  },
  humanLink: {
    display: 'block',
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '8px',
    textAlign: 'center',
    textDecoration: 'none',
  },
  humanLinkWrapper: {
    border: '1px solid #000',
    marginBottom: '8px',
    padding: '8px',
    textAlign: 'center',
  },
  profileImage: {
    float: 'right',
    height: '48px',
    marginLeft: '8px',
    width: '48px',
  },
  sectionHeading: {
    fontSize: '9px',
    fontWeight: 'bold',
    margin: '6px 0 2px',
    textTransform: 'uppercase',
  },
  table: {
    borderCollapse: 'collapse',
    marginBottom: '4px',
    width: '100%',
  },
  tableCell: {
    border: '1px solid #ccc',
    padding: '1px 3px',
    verticalAlign: 'top',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    textAlign: 'left',
    width: '22%',
  },
}

const printStyles = `
  @page {
    margin: 6mm;
    size: A4;
  }

  @media print {
    body {
      font-size: 7px;
      line-height: 1.15;
      padding: 0;
    }

    .parse-cv-human-link {
      font-size: 14px;
    }
  }
`

const findSection = (sections, type, title) =>
  sections.find((section) => section.type === type && (!title || section.title === title))

const joinArray = (value) => (Array.isArray(value) ? value.join(' | ') : value || '')

const formatLinks = (links = []) =>
  links.map((link) => `${link.text}: ${link.url}`).join(' | ')

const getAddress = (footer) => {
  const addressParagraph = footer?.paragraphsPersonal?.find((paragraph) => paragraph.address)

  if (!addressParagraph?.address) {
    return ''
  }

  return addressParagraph.address.join(', ')
}

const getConnectLinks = (footer) => {
  const connectParagraph = footer?.paragraphsPersonal?.find((paragraph) => paragraph.title === 'Connect')

  return formatLinks(connectParagraph?.links)
}

const KeyValueTable = ({ rows, title }) => {
  const filteredRows = rows.filter(([, value]) => value)

  if (filteredRows.length === 0) {
    return null
  }

  return (
    <section>
      {title && <h2 style={styles.sectionHeading}>{title}</h2>}
      <table style={styles.table}>
        <tbody>
          {filteredRows.map(([key, value]) => (
            <tr key={key}>
              <th scope="row" style={{ ...styles.tableCell, ...styles.tableHeader }}>
                {key}
              </th>
              <td style={styles.tableCell}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const MultiRowTable = ({ columns, rows, title }) => {
  if (!rows?.length) {
    return null
  }

  return (
    <section>
      {title && <h2 style={styles.sectionHeading}>{title}</h2>}
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" style={{ ...styles.tableCell, ...styles.tableHeader }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${title}-${index}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${title}-${index}-${cellIndex}`} style={styles.tableCell}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const buildPersonalRows = ({ content, header }) => {
  const languagesSection = findSection(content.sections, 'TEXT_COLUMNS', 'LANGUAGES')

  return [
    ['Name', header.name],
    ['Description', header.description],
    ['Email', header.email],
    ['Website', header.websitePersonal?.linkUrl || header.website?.linkUrl],
    ['Address', getAddress(content.footer)],
    ['LinkedIn / GitHub', getConnectLinks(content.footer)],
    [
      'Languages',
      languagesSection?.paragraphs
        ?.map((paragraph) => `${paragraph.title}: ${paragraph.text}`)
        .join(' | '),
    ],
  ]
}

const buildIntroductionRows = (sections) => {
  const introductionSection = sections.find((section) => section.type === 'TEXT_INTROCUTION')

  return introductionSection?.paragraphs?.map((paragraph, index) => [
    `Summary ${index + 1}`,
    paragraph.text,
  ])
}

const buildTagSectionRows = (section) =>
  section?.paragraphs?.flatMap((paragraph) => {
    const tags = paragraph.tags?.join(', ')

    if (!tags) {
      return []
    }

    return [[paragraph.title || section.title, tags]]
  }) || []

const buildExperienceRows = (section) =>
  section?.paragraphs?.map((paragraph) => [
    paragraph.title,
    paragraph.subtitle,
    paragraph.time,
    paragraph.location,
    paragraph.list?.join(' • '),
  ]) || []

const buildEducationRows = (section) => {
  const rows =
    section?.paragraphs?.map((paragraph) => [
      paragraph.title,
      paragraph.subtitle,
      paragraph.time,
      paragraph.location,
    ]) || []

  if (section?.grade) {
    rows.push([
      section.grade.title,
      `${section.grade.rating} (${section.grade.weightedRate}) - ${section.grade.description}`,
      '',
      '',
    ])
  }

  return rows
}

const buildRatedListRows = (section) =>
  section?.paragraphs?.flatMap((paragraph) => {
    const context = joinArray(paragraph.title)

    return (
      paragraph.list?.map((item) => [context, item.category, `${item.rating}/5`]) || []
    )
  }) || []

const buildHighlightRows = (sections) =>
  sections
    .filter(
      (section) =>
        section.type === 'TEXT' &&
        section.title &&
        !['EXPERIENCE', 'EDUCATION'].includes(section.title)
    )
    .flatMap(
      (section) =>
        section.paragraphs?.map((paragraph) => [
          section.title,
          [paragraph.title, paragraph.text].filter(Boolean).join(' - '),
        ]) || []
    )

const buildReferenceRows = (section) =>
  section?.paragraphs?.map((paragraph) => [
    paragraph.title,
    paragraph.category,
    paragraph.text,
    formatLinks(paragraph.links),
  ]) || []

export const ParseCV = ({ content, profilePictureDataUri }) => {
  if (!content) {
    return <p>No CV content available.</p>
  }

  const { footer, header, sections } = content
  const sortedSections = [...sections].sort((a, b) => a.sequenceNr - b.sequenceNr)
  const experienceSection = findSection(sortedSections, 'TEXT', 'EXPERIENCE')
  const educationSection = findSection(sortedSections, 'TEXT', 'EDUCATION')
  const ratedListSection = findSection(sortedSections, 'RATED_LIST', 'INDUSTRY EXPERTISE')
  const referenceSections = sortedSections.filter((section) => section.type === 'REFERENCES')
  const tagSections = sortedSections.filter((section) => section.type === 'TAGS')
  const profilePictureSrc = profilePictureDataUri || header.profilePicture

  return (
    <main style={styles.body}>
      <style>{printStyles}</style>

      <header style={styles.humanLinkWrapper}>
        <a className="parse-cv-human-link" href={CV_APP_URL} style={styles.humanLink}>
          If you are human click here
        </a>
      </header>

      <KeyValueTable rows={buildPersonalRows({ content, header })} title="Personal Information" />

      {profilePictureSrc && (
        <img alt={header.name} src={profilePictureSrc} style={styles.profileImage} />
      )}

      <KeyValueTable rows={buildIntroductionRows(sortedSections)} title="Introduction" />

      <KeyValueTable rows={buildHighlightRows(sortedSections)} title="Highlights" />

      {tagSections.map((section) => (
        <KeyValueTable
          key={`${section.type}-${section.title}`}
          rows={buildTagSectionRows(section)}
          title={section.title}
        />
      ))}

      <MultiRowTable
        columns={['Role', 'Company', 'Period', 'Location', 'Responsibilities']}
        rows={buildExperienceRows(experienceSection)}
        title="Experience"
      />

      <MultiRowTable
        columns={['Degree', 'Institution', 'Period', 'Location']}
        rows={buildEducationRows(educationSection)}
        title="Education"
      />

      <MultiRowTable
        columns={['Context', 'Skill', 'Rating']}
        rows={buildRatedListRows(ratedListSection)}
        title="Industry Expertise"
      />

      {referenceSections.map((section) => (
        <MultiRowTable
          key={`${section.type}-${section.title}`}
          columns={['Title', 'Category', 'Description', 'Links']}
          rows={buildReferenceRows(section)}
          title={section.title}
        />
      ))}

      {footer?.title && (
        <KeyValueTable
          rows={[
            ['Contact Section', footer.title],
            ['Address', getAddress(footer)],
            ['Email', header.email],
            ['Links', getConnectLinks(footer)],
          ]}
          title="Contact"
        />
      )}
    </main>
  )
}

export default ParseCV
